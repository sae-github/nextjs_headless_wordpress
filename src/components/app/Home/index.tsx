import { Box, Flex, Heading, Text, VStack, styled } from '@kuma-ui/core'
import { format } from 'date-fns'
import Link from 'next/link'
import React from 'react'

type Props = {
  id: number
  date: string
  title: {
    rendered: string
  }
}

const getPosts = async () => {
  const res = await fetch(
    'https://itosae.com/wp-json/wp/v2/posts?_embed&page=1&_fields=title,id,date,content',
  )
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json()
}

export const HomeContent = async () => {
  const data: Props[] = await getPosts()
  return (
    <Box maxWidth='60rem' margin='0 auto' padding='2rem' backgroundColor='#fff' borderRadius='20px'>
      <VStack justify='center' alignItems='center'>
        {data.map(({ id, date, title }) => (
          <Article key={id}>
            <Heading as='h2' fontSize='1.5rem' margin='0px' border='none'>
              <Link href={`/${id}`} style={{ color: '#4848a2' }}>
                {title.rendered}
              </Link>
            </Heading>
            {/* // TODO: 動的に出力する */}
            <Flex gap='.5rem' marginTop='.5rem'>
              <Tag>振り返り</Tag>
              <Tag>JavaScript</Tag>
              <Tag>TypeScript</Tag>
            </Flex>
            <Box marginTop='.5rem'>
              <small>{format(new Date(date), 'yyyy/MM/dd')}</small>
            </Box>
          </Article>
        ))}
      </VStack>
    </Box>
  )
}

const Tag = styled('span')`
  text-align: center;
  padding: 0 8px;
  border: 1px solid #ccc;
  border-radius: 20px;
`

const Article = styled('article')`
  padding: 1rem;
  width: 100%;

  & + & {
    border-top: 1px solid #ccc;
  }
`
