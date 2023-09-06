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

export const BlogContent: FC<{ params: { id: string } }> = async ({ params }) => {
  const post = await getPost(params.id)
  return (
    <Box maxWidth='60rem' margin='0 auto' paddingX='2rem'>
      <article>
        <Box>
          <h1>{post.title.rendered}</h1>
          <time dateTime={post.date}>{format(new Date(post.date), 'yyyy/MM/dd')}</time>
        </Box>
        <Box marginTop='2rem' background='#fff' borderRadius='20px' padding='1rem 3rem'>
          <div
            dangerouslySetInnerHTML={{
              __html: `${post.content.rendered}`,
            }}
          />
        </Box>
      </article>
    </Box>
  )
}
