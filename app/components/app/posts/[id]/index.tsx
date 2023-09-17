import { Box } from '@kuma-ui/core'
import { format } from 'date-fns'
import React, { FC } from 'react'
import './style.css'

const getPost = async (id: string) => {
  const res = await fetch(
    `https://itosae.com/wp-json/wp/v2/posts/${id}?_fields=id,date,title,content`,
  )
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json()
}

export const PostContent: FC<{ params: { id: string } }> = async ({ params }) => {
  const post = await getPost(params.id)
  return (
    <article>
      <Box>
        <h1>{post.title.rendered}</h1>
        <time dateTime={post.date}>{format(new Date(post.date), 'yyyy/MM/dd')}</time>
      </Box>
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
