import { Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import GroupItem from './GroupItem'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import useFetch from '@/hooks/useFetch'
import useListFetch from '@/hooks/useListFetch'
import { errorAlert } from '@/utils/alertUtil'

export default function GroupList({ modalIsOpen }) {
  const router = useRouter()
  const { fetch } = useFetch(router)
  const { ref, inView } = useInView()
  const [fetchEnable, setFetchEnable] = useState(false)

  const { data, enableNextFetch, fetchNextPage, reset, removeLastPage } =
    useListFetch({
      queryKey: ['/group/list', 'GET'],
      queryFn: async ({ pageParam }) => {
        try {
          const response = await fetch('/group/list', {
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
      fetchEnable,
      pageSize: 20,
      key: 'id',
    })

  useEffect(() => {
    setFetchEnable(true)
    return () => reset()
  }, [])

  useEffect(() => {
    if (inView && enableNextFetch) {
      fetchNextPage()
    }
  }, [inView, enableNextFetch])

  useEffect(() => {
    if (!modalIsOpen && data) {
      removeLastPage()
    }
  }, [modalIsOpen])

  return (
    <Box>
      <Grid container spacing={1} sx={{ position: 'relative' }}>
        {data?.pages.map((dataGroup, i) => (
          <React.Fragment key={i}>
            {dataGroup?.map((group) => (
              <Grid key={group.id} xs={12} sm={6} md={4}>
                <GroupItem
                  data={group}
                  router={router}
                  handleClick={() => router.push(`/group/${group.id}`)}
                />
              </Grid>
            ))}
          </React.Fragment>
        ))}
        {enableNextFetch && (
          <Grid
            sx={{
              position: 'absolute',
              bottom: 0,
            }}
            ref={ref}
          ></Grid>
        )}
      </Grid>
    </Box>
  )
}
