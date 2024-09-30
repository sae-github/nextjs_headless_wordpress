import { HStack, styled } from '@kuma-ui/core'
import { format } from 'date-fns'
import React, { FC } from 'react'
import './style.css'
import ReactMarkdown from 'react-markdown'
import { TableOfContents } from '../../../../_components/common/TableOfContent'
import { PostData } from '@/lib/posts'
export const Article: FC<{ pageContent: PostData }> = ({ pageContent }) => {
  return (
    <article>
      <div>
        <h1>{pageContent.title}</h1>
        <HStack alignItems='center' gap='8px'>
          <time dateTime={pageContent.date} style={{ marginTop: '0px' }}>
            {format(new Date(pageContent.date), 'yyyy/MM/dd')}
          </time>
        </HStack>
        <TableOfContentArea>
          <details>
            <summary>目次</summary>
            <TableOfContents textHtml={pageContent.content} />
          </details>
        </TableOfContentArea>
        <ReactMarkdown>{pageContent.content}</ReactMarkdown>
      </div>
    </article>
  )
}

const TableOfContentArea = styled('div')`
  display: block;
  margin-top: 1rem;
  @media (min-width: md) {
    display: none;
  }
`
