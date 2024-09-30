import { Box, Text, styled } from '@kuma-ui/core'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { AdminsArea } from '@/app/_components/common/AdminsArea'
import { Article } from '@/app/posts/[id]/_components/Article'
import { getPosts } from '@/lib/posts'

const Post = async ({ params }: { params: Props }) => {
  if (isNaN(Number(params.id))) notFound()
  const postData = getPosts().find((post) => post.id === params.id)
  return (
    <Box display='flex' flexDirection={['column', 'column', 'row']}>
      <Main>
        {postData ? (
          <Article pageContent={postData} />
        ) : (
          <Box textAlign='center'>
            <Text>表示する記事が見つかりませんでした。</Text>
            <Link href='/'>トップに戻る</Link>
          </Box>
        )}
      </Main>
      <Aside>
        <AdminsArea />
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
    width: calc(100% - 280px);
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
    padding: 0 0 0 2rem;
    top: 80px;
  }
`
