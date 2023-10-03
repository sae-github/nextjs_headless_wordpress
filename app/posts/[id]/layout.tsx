import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const res = await fetch(
    `https://itosae.com/wp-json/wp/v2/posts/${params.id}?_fields=id,date,title,content`,
  )
  if (!res.ok) {
    return {
      title: `Sae/note`,
    }
  }
  const post = await res.json()
  return {
    title: `${post.title.rendered} | Sae/note`,
    openGraph: {
      title: post.title.rendered,
      images: [
        {
          url: '/ogp.png',
          width: 80,
          height: 80,
        },
      ],
    },
    twitter: {
      title: post.title.rendered,
      card: 'summary',
      images: [
        {
          url: '/ogp.png',
          width: 80,
          height: 80,
        },
      ],
    },
  }
}

export default function PostContentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
