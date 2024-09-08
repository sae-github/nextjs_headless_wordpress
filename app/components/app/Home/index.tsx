import { Flex, Heading, VStack, styled } from '@kuma-ui/core'
import { format } from 'date-fns'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { FC } from 'react'
import { getPosts } from '@/lib/posts'

export const HomeContent: FC<{ page: string }> = async ({ page }) => {
  const allPostsData = getPosts()
  if (isNaN(Number(page))) notFound()
  return (
    <VStack justify='center' alignItems='center'>
      {allPostsData.map(({ id, date, title }) => (
        <Article key={id}>
          <Heading as='h2' fontSize={['1.2rem', '1.5rem']} margin='0px' border='none' padding='0px'>
            <Link
              href={`/posts/${id}`}
              style={{ color: '#333', textDecoration: 'none', fontWeight: 'normal' }}
            >
              {title}
            </Link>
          </Heading>

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
