import { Box, Flex, Heading, Text, VStack, styled } from '@kuma-ui/core'
import { format } from 'date-fns'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { FC } from 'react'
import { Pagination } from '../../common/Pagination'
import { Tags } from '../../common/Tags'
import { postApi } from '@/apis/post/postApi'

export const HomeContent: FC<{ page: string }> = async ({ page }) => {
  if (isNaN(Number(page))) notFound()
  const result = await postApi.getPosts(page || '1')
  return result.isSuccess ? (
    <VStack justify='center' alignItems='center'>
      {result.data.map(({ id, date, title, categories }) => (
        <Article key={id}>
          <Heading as='h2' fontSize={['1.2rem', '1.5rem']} margin='0px' border='none' padding='0px'>
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
      {result.totalPageCount && (
        <Pagination totalPages={result.totalPageCount} currentPage={page || '1'} />
      )}
    </VStack>
  ) : (
    <Box textAlign='center'>
      <Text>{result.message}</Text>
      <Link href='/'>トップに戻る</Link>
    </Box>
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
