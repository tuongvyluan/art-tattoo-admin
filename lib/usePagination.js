import { useSWRInfinite } from "swr"
import { fetcher } from "./fetcher"

const baseUrl = ""

export const usePaginate = (path, pageSize) => {
  if (!path) {
    throw new Error("Path is required")
  }

  const url = baseUrl + path

  console.log(url)

  const { data, error, size, setSize } = useSWRInfinite(
    index => url,
    fetcher
  )

  const items = data ? [].concat(...data) : []
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined")
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < pageSize)

  return { items, error, isLoadingMore, size, setSize, isReachingEnd }
}