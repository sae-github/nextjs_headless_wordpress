import { Box } from '@kuma-ui/core'
import React from 'react'
import './style.css'

export const BlogContent = () => {
  return (
    <Box maxWidth='60rem' margin='0 auto' paddingX='2rem'>
      <article>
        <Box background='#fff' borderRadius='20px' padding='1rem'>
          <h1>記事のタイトル</h1>
          <time dateTime='2023-08-24'>2023/08/24</time>
        </Box>
        <Box marginTop='2rem' background='#fff' borderRadius='20px' padding='2rem 3rem'>
          <div
            dangerouslySetInnerHTML={{
              __html: `<p></p>`,
            }}
          />
        </Box>
      </article>
    </Box>
  )
}
