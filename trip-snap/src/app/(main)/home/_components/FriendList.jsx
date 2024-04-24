import {
  Avatar,
  Chip,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import React, { useEffect, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchData } from '@/utils/fetch'
import { errorAlert } from '@/utils/alertUtil'
import Grid from '@mui/material/Unstable_Grid2'

export default function FriendList() {
  const router = useRouter()
  const { ref, inView } = useInView()
  const [fetchEnable, setFetchEnable] = useState(false)
  const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['friendList', fetchEnable],
      initialPageParam: 0,
      enabled: fetchEnable,
      queryFn: async ({ pageParam }) => {
        try {
          const response = await fetchData('/friend/list', router, {
            data: { pagePerCnt: 10, page: pageParam },
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
    <List disablePadding={true}>
      {data?.pages.map((dataGroup, i) => (
        <React.Fragment key={i}>
          {dataGroup?.map((friend) => (
            <ListItem
              divider={true}
              key={friend.email}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <Icon>delete</Icon>
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>A</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  friend.isWaiting ? (
                    <>
                      {friend.nickname}&nbsp;
                      <Chip label="수락 대기중" size={'small'} />
                    </>
                  ) : (
                    friend.nickname
                  )
                }
                secondary={friend.email}
              />
            </ListItem>
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
    </List>
  )
}
