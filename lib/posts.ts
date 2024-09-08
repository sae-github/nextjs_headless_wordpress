import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'output')

export type PostData = {
  id: string
  title: string
  date: string
  content: string
}

export function getPosts(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostData = fileNames.flatMap((fileName) => {
    const posts = path.join(process.cwd(), `output/${fileName}`)
    const readPosts = fs.readdirSync(posts)
    return readPosts.flatMap((post) => {
      const a = path.join(process.cwd(), `output/${fileName}/${post}`)
      const b = fs.readdirSync(a)
      return b.map((c, index) => {
        const id = `${fileName}${post}${index + 1}`
        const fullPath = path.join(process.cwd(), `output/${fileName}/${post}/${c}/index.md`)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        const postData: PostData = {
          id,
          title: data.title,
          date: data.date,
          content,
        }
        return postData
      })
    })
  })
  return allPostData.sort((a, b) => (a.date < b.date ? 1 : -1))
}
