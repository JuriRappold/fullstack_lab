export type responseBody<T> = {
    status: number,
    message: string
    data: T
}