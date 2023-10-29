import { Box, Text, styled } from '@kuma-ui/core'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { postApi } from '@/apis/post/postApi'
import { PostContent } from '@/app/components/app/Posts'
import { AdminsArea } from '@/app/components/common/AdminsArea'
import { TableOfContents } from '@/app/components/common/TableOfContent'

const Post = async ({ params }: { params: Props }) => {
  if (isNaN(Number(params.id))) notFound()
  const result = await postApi.getPost(params.id)
  return (
    <Box display='flex' flexDirection={['column', 'column', 'row']}>
      <Main>
        {result.isSuccess ? (
          <PostContent pageContent={result.data} />
        ) : (
          <Box textAlign='center'>
            <Text>{result.message}</Text>
            <Link href='/'>トップに戻る</Link>
          </Box>
        )}
      </Main>
      <Aside>
        <AdminsArea />
        <TableOfContentsArea>
          {result.isSuccess && <TableOfContents textHtml={result.data.content.rendered} />}
        </TableOfContentsArea>
      </Aside>
    </Box>
  )
}

export default Post

type Props = {
  id: string
}

const Main = styled('main')`
  padding-bottom: 2rem;
  flex: 1;
  width: 100%;
  @media (min-width: md) {
    width: calc(100% - 300px);
  }
`

const Aside = styled('aside')`
  width: 100%;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column-reverse;
  @media (min-width: md) {
    width: 300px;
    flex-direction: column;
  }
`

const TableOfContentsArea = styled('div')`
  display: none;
  @media (min-width: md) {
    display: block;
    margin-top: 3rem;
    position: sticky;
    padding: 0 4rem;
    top: 80px;
  }
`
