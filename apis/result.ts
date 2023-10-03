type Success<T> = {
  isSuccess: true
  totalPageCount: string | null
  data: T
}

type Failure = {
  isSuccess: false
  message: string
}

export type Result<T> = Success<T> | Failure
