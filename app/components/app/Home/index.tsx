import { Flex, HStack, Heading, VStack, styled } from '@kuma-ui/core'
import { format } from 'date-fns'
import Link from 'next/link'
import React, { FC } from 'react'
import { Pagination } from '../../common/Pagination'
import { Tags } from '../../common/Tags'

const getPosts = async (page: string) => {
  const res = await fetch(
    `https://itosae.com/wp-json/wp/v2/posts?_embed&page=${page}&_fields=title,id,date,content,categories`,
  )
  if (!res.ok) throw new Error('Failed to fetch data')
  return {
    totalPages: res.headers.get('x-wp-totalpages'),
    posts: await res.json(),
  }
}

export const HomeContent: FC<{ page?: string }> = async ({ page }) => {
  const { posts, totalPages }: { posts: Post[]; totalPages: string | null } = await getPosts(
    page || '1',
  )
  return (
    <VStack justify='center' alignItems='center'>
      {posts.map(({ id, date, title, categories }) => (
        <Article key={id}>
          <Heading as='h2' fontSize='1.5rem' margin='0px' border='none' padding='0px'>
            <Link
              href={`/posts/${id}`}
              style={{ color: '#333', textDecoration: 'none', fontWeight: 'normal' }}
            >
              {title.rendered}
            </Link>
          </Heading>
          <Flex gap='.5rem' marginTop='.4rem'>
            <Tags categoryIds={categories} />
          </Flex>
          <small>{format(new Date(date), 'yyyy/MM/dd')}</small>
        </Article>
      ))}
      {totalPages && <Pagination totalPages={totalPages} currentPage={page || '1'} />}
    </VStack>
  )
}

const Article = styled('article')`
  padding: 1rem 0;
  width: 100%;

  & + & {
    border-top: 1px solid #ccc;
  }

  a:hover {
    opacity: 0.7;
  }
`

type Post = {
  id: number
  date: string
  title: {
    rendered: string
  }
  categories: number[]
}
