export async function generateMetadata({ params }: { params: { id: string } }) {
  const res = await fetch(
    `https://itosae.com/wp-json/wp/v2/posts/${params.id}?_fields=id,date,title,content`,
  )
  const post = await res.json()
  return { title: `${post.title.rendered} | Sae/note` }
}

export default function BlogContentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
