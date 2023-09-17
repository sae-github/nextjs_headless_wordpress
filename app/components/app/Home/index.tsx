import { Flex, Heading, VStack, styled } from '@kuma-ui/core'
import { format } from 'date-fns'
import Link from 'next/link'
import React from 'react'

const getPosts = async () => {
  const res = await fetch(
    'https://itosae.com/wp-json/wp/v2/posts?_embed&page=1&_fields=title,id,date,content,categories',
  )
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json()
}

const getAllCategories = async () => {
  const res = await fetch('https://itosae.com/wp-json/wp/v2/categories?_fields=name,slug,id')
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json()
}

const getCategories = (categories: Category[], ids: number[]) =>
  categories.filter((category) => ids.includes(category.id))

export const HomeContent = async () => {
  const data: Props[] = await getPosts()
  const allCategories: Category[] = await getAllCategories()
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
            {allCategories &&
              getCategories(allCategories, categories).map((category) => (
                <Tag key={category.id}>#{category.name}</Tag>
              ))}
          </Flex>
          <small>{format(new Date(date), 'yyyy/MM/dd')}</small>
        </Article>
      ))}
    </VStack>
  )
}

const Tag = styled('span')`
  text-align: center;
  color: gray;
`

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

type Category = {
  name: string
  id: number
  slug: string
}
