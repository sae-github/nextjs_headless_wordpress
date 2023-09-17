import { Flex, Heading, VStack, styled } from '@kuma-ui/core'
import { format } from 'date-fns'
import Link from 'next/link'
import React from 'react'
import { Tags } from '../../common/Tags'

const getPosts = async () => {
  const res = await fetch(
    'https://itosae.com/wp-json/wp/v2/posts?_embed&page=1&_fields=title,id,date,content,categories',
  )
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json()
}

export const HomeContent = async () => {
  const data: Props[] = await getPosts()
  return (
    <VStack justify='center' alignItems='center'>
      {data.map(({ id, date, title, categories }) => (
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

type Props = {
  id: number
  date: string
  title: {
    rendered: string
  }
  categories: number[]
}
