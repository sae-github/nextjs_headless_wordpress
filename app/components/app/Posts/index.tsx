import { Box, HStack } from '@kuma-ui/core'
import { format } from 'date-fns'
import React, { FC } from 'react'
import './style.css'
import { Tags } from '@/app/components/common/Tags'

const getPost = async (id: string) => {
  const res = await fetch(
    `https://itosae.com/wp-json/wp/v2/posts/${id}?_fields=id,date,title,content,categories`,
  )
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json()
}

export const PostContent: FC<{ params: { id: string } }> = async ({ params }) => {
  const post = await getPost(params.id)

  return (
    <article>
      <h1>{post.title.rendered}</h1>
      <HStack alignItems='center' gap='8px'>
        <time dateTime={post.date} style={{ marginTop: '0px' }}>
          {format(new Date(post.date), 'yyyy/MM/dd')}
        </time>
        <Tags categoryIds={post.categories} />
      </HStack>
      <Box
        marginTop='2rem'
        padding='0 1rem'
        dangerouslySetInnerHTML={{
          __html: `${post.content.rendered}`,
        }}
      ></Box>
    </article>
  )
}
