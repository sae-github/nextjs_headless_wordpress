import { Box, HStack } from '@kuma-ui/core'
import { format } from 'date-fns'
import { JSDOM } from 'jsdom'
import React, { FC } from 'react'
import './style.css'
import { PostOutput } from '@/apis/post/postApi'
import { Tags } from '@/app/components/common/Tags'

export const PostContent: FC<{ pageContent: PostOutput }> = ({ pageContent }) => {
  const jsDom = new JSDOM(pageContent.content.rendered)
  const titles = jsDom.window.document.querySelectorAll('h2')
  titles.forEach((title, i) => {
    title.id = `title-${i.toString()}`
  })
  return (
    <article>
      <h1>{pageContent.title.rendered}</h1>
      <HStack alignItems='center' gap='8px'>
        <time dateTime={pageContent.date} style={{ marginTop: '0px' }}>
          {format(new Date(pageContent.date), 'yyyy/MM/dd')}
        </time>
        <Tags categoryIds={pageContent.categories} />
      </HStack>
      <Box
        marginTop='2rem'
        padding={['0 .8rem', '0 1rem']}
        dangerouslySetInnerHTML={{
          __html: `${jsDom.serialize()}`,
        }}
      />
    </article>
  )
}
