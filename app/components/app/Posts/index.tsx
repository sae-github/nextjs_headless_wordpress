import { Box, HStack, Text } from '@kuma-ui/core'
import { format } from 'date-fns'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { FC } from 'react'
import './style.css'
import { postApi } from '@/apis/post/postApi'
import { Tags } from '@/app/components/common/Tags'

export const PostContent: FC<{ params: { id: string } }> = async ({ params }) => {
  if (isNaN(Number(params.id))) notFound()
  const result = await postApi.getPost(params.id)
  return result.isSuccess ? (
    <article>
      <h1>{result.data.title.rendered}</h1>
      <HStack alignItems='center' gap='8px'>
        <time dateTime={result.data.date} style={{ marginTop: '0px' }}>
          {format(new Date(result.data.date), 'yyyy/MM/dd')}
        </time>
        <Tags categoryIds={result.data.categories} />
      </HStack>
      <Box
        marginTop='2rem'
        padding={['0 .8rem', '0 1rem']}
        dangerouslySetInnerHTML={{
          __html: `${result.data.content.rendered}`,
        }}
      ></Box>
    </article>
  ) : (
    <Box textAlign='center'>
      <Text>{result.message}</Text>
      <Link href='/'>トップに戻る</Link>
    </Box>
  )
}
