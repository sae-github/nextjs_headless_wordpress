import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const res = await fetch(
    `https://itosae.com/wp-json/wp/v2/posts/${params.id}?_fields=id,date,title,content`,
  )
  if (!res.ok) throw new Error('Failed to fetch data')
  const post = await res.json()

  return { title: `${post.title.rendered} | Sae/note` }
}

export default function PostContentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
