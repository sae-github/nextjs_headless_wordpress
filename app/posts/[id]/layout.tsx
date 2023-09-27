import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const res = await fetch(
    `https://itosae.com/wp-json/wp/v2/posts/${params.id}?_fields=id,date,title,content`,
  )
  if (!res.ok) throw new Error('Failed to fetch data')
  const post = await res.json()
  return {
    title: `${post.title.rendered} | Sae/note`,
    openGraph: {
      images: [
        {
          url: '/ogp-image.png',
          width: 80,
          height: 80,
        },
      ],
      title: post.title.rendered,
    },
    twitter: {
      title: post.title.rendered,
    },
  }
}

export default function PostContentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
