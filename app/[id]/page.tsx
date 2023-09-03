import React from 'react'
import { BlogContent } from '@/src/components/app/[id]'

const Blog = ({ params }: { params: Props }) => {
  return <BlogContent params={params} />
}

export default Blog

type Props = {
  id: string
}
