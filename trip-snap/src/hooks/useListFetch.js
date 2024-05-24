import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'

export default function useListFetch({
  queryKey,
  queryFn,
  pageSize,
  fetchEnable = true,
  key,
}) {
  const queryClient = useQueryClient()
  const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      initialPageParam: 0,
      enabled: fetchEnable,
      queryFn,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (!lastPage) return 0
        if (lastPage.length === pageSize) {
          return lastPageParam + 1
        } else {
          return undefined
        }
      },
      getPreviousPageParam: (firstPage, allPages, firstPageParam) =>
        !!firstPageParam ? firstPageParam + 1 : undefined,
    })

  const removeElement = (removeKey) => {
    queryClient.setQueriesData({ queryKey }, (data) => ({
      ...data,
      pages: data.pages.map((page) =>
        page.filter((data) => data[key] === removeKey)
      ),
    }))
  }

  const removePage = (removeKey) => {
    const pageIndex = data.pages.findIndex(
      (page) => page.findIndex((el) => el[key] === removeKey) >= 0
    )

    if (pageIndex > -1) {
      queryClient.setQueriesData({ queryKey }, (data) => ({
        ...data,
        pageParams: [...data.pageParams.slice(0, pageIndex)],
        pages: [...data.pages.slice(0, pageIndex)],
      }))
    }
  }

  const removeLastPage = () => {
    queryClient.setQueriesData({ queryKey }, (data) => ({
      ...data,
      pageParams: [...data.pageParams.slice(0, -1)],
      pages: [...data.pages.slice(0, -1)],
    }))
  }

  const reset = () => {
    return queryClient.resetQueries({ queryKey, exact: true })
  }

  const refetchLastPage = async () => {
    const [queryData] = queryClient.getQueriesData({ queryKey })
    const [, data] = queryData
    if (data) {
      const [lastPage] = data.pageParams.slice(-1)
      if (lastPage >= 0) {
        const newData = await queryFn({ pageParam: lastPage })
        queryClient.setQueriesData({ queryKey }, (data) => ({
          ...data,
          pageParams: [...data.pageParams.slice(0, -1), lastPage],
          pages: [...data.pages.slice(0, -1), newData],
        }))
      }
    }
  }

  return {
    data,
    enableNextFetch: !isFetching && hasNextPage,
    fetchNextPage,
    removeElement,
    removePage,
    removeLastPage,
    refetchLastPage,
    reset,
  }
}
