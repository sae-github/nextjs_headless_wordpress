import { Result } from './result'
const WP_URL = 'https://itosae.com/wp-json/wp/v2'

export const requestApi = async <T = void>(method: Method, path: string): Promise<Result<T>> => {
  try {
    const response = await fetch(`${WP_URL}/${path}`, {
      method: method,
    })
    const data = await response.json()
    const totalPageCount = response.headers.get('x-wp-totalpages')
    if (!response.ok) {
      if (data.data.status === 404) {
        return {
          isSuccess: false,
          message: 'お探しのページは見つかりませんでした',
        }
      }
      return {
        isSuccess: false,
        message: '何らかの原因でエラーが発生しました',
      }
    }
    return {
      isSuccess: true,
      totalPageCount: totalPageCount,
      data,
    }
  } catch (error) {
    console.error(error)
    return {
      isSuccess: false,
      message: '何らかの原因でエラーが発生しました',
    }
  }
}

type Method = 'GET'
