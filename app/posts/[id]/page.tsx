import React from 'react'
import { PostContent } from '@/app/components/app/Posts'

const Post = ({ params }: { params: Props }) => {
  return <PostContent params={params} />
}

export default Post

type Props = {
  id: string
}
