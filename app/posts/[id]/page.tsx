import React from 'react'
import { PostContent } from '@/app/components/app/posts/[id]'

const Post = ({ params }: { params: Props }) => {
  return <PostContent params={params} />
}

export default Post

type Props = {
  id: string
}
