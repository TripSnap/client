import { Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import GroupItem from './GroupItem'
import { useRouter } from 'next/navigation'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchData } from '@/utils/fetch'
import { useEffect, useState } from 'react'
import { errorAlert } from '@/utils/alertUtil'
import React from 'react'
import { useInView } from 'react-intersection-observer'

export default function GroupList() {
  const router = useRouter()
  const { ref, inView } = useInView()
  const [fetchEnable, setFetchEnable] = useState(false)
  const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['group', fetchEnable],
      initialPageParam: 0,
      enabled: fetchEnable,
      queryFn: async ({ pageParam }) => {
        try {
          const response = await fetchData('/group/list', router, {
            data: { pagePerCnt: 20, page: pageParam },
          })
          if (response.ok) {
            const { data } = await response.json()
            return data
          } else {
            setFetchEnable(false)
            errorAlert({ message: '데이터를 가져오는 데 실패했습니다.' })
          }
        } catch (e) {
          setFetchEnable(false)
        }
      },
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (!lastPage) return 0
        if (!!lastPage.length) {
          return lastPageParam + 1
        } else {
          return undefined
        }
      },
      getPreviousPageParam: (firstPage, allPages, firstPageParam) =>
        !!firstPageParam ? firstPageParam + 1 : undefined,
    })

  useEffect(() => {
    setFetchEnable(true)
    return () => setFetchEnable(false)
  }, [])

  useEffect(() => {
    if (inView && !isFetching && !isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, isFetching, isFetchingNextPage, hasNextPage])
  return (
    <Box>
      <Grid container spacing={1} sx={{ position: 'relative' }}>
        {data?.pages.map((dataGroup, i) => (
          <React.Fragment key={i}>
            {dataGroup?.map((group) => (
              <Grid key={group.id} xs={12} sm={6} md={4}>
                <GroupItem data={group} router={router} />
              </Grid>
            ))}
          </React.Fragment>
        ))}
        <Grid
          sx={{
            position: 'absolute',
            bottom: 0,
          }}
          ref={ref}
        ></Grid>
      </Grid>
    </Box>
  )
}
