import { requestApi } from '../base'
import { Result } from '../result'

export const postApi = {
  getPosts: (page: string): Promise<Result<PostsOutput>> => {
    return requestApi('GET', `posts?_embed&page=${page}&_fields=title,id,date,content,categories`)
  },
  getPost: (id: string): Promise<Result<PostOutput>> => {
    return requestApi('GET', `posts/${id}?_fields=id,date,title,content,categories`)
  },
}

type PostsOutput = {
  id: number
  date: string
  title: { rendered: string }
  content: { rendered: string; protected: boolean }
  categories: number[]
}[]

export type PostOutput = {
  id: number
  date: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
    protected: boolean
  }
  categories: number[]
}
