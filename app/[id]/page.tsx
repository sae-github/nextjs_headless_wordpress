import React from 'react'
import { BlogContent } from '@/app/components/app/[id]'

const Blog = ({ params }: { params: Props }) => {
  return <BlogContent params={params} />
}

export default Blog

type Props = {
  id: string
}
