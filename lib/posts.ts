import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const markdownOutPutDirectoryPath = path.join(process.cwd(), 'output')

export function getPosts(): PostData[] {
  const yearsPaths = fs.readdirSync(markdownOutPutDirectoryPath)
  const allPostData = yearsPaths.flatMap((year) => {
    const yearDirPath = path.join(process.cwd(), `output/${year}`)
    const monthPaths = fs.readdirSync(yearDirPath)
    return monthPaths.flatMap((month) => {
      const monthDirPath = path.join(process.cwd(), `output/${year}/${month}`)
      const pageTitlePaths = fs.readdirSync(monthDirPath)
      return pageTitlePaths.map((title, index) => {
        const id = `${year}${month}${index + 1}`
        const markdownContentPath = path.join(
          process.cwd(),
          `output/${year}/${month}/${title}/index.md`,
        )
        const fileContents = fs.readFileSync(markdownContentPath, 'utf8')
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
export type PostData = {
  id: string
  title: string
  date: string
  content: string
}
