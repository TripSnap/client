import {
  Avatar,
  Button,
  ButtonGroup,
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
import { errorAlert } from '@/utils/alertUtil'
import Grid from '@mui/material/Unstable_Grid2'
import {
  allowFriendRequest,
  denyFriendRequest,
  removeFriend,
} from '@/app/(main)/group/[group-id]/_api/api'
import useFetch from '@/hooks/useFetch'

export default function FriendList() {
  const router = useRouter()
  const { fetch } = useFetch(router)
  const { ref, inView } = useInView()
  const [fetchEnable, setFetchEnable] = useState(false)
  const queryClient = useQueryClient()

  const [removeKeySet, setRemoveKeySet] = useState(new Set())
  const addRemoveKey = (key) => {
    setRemoveKeySet(new Set([...Array.from(removeKeySet), key]))
  }

  const {
    data,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    {
      queryKey: ['/friend/list'],
      initialPageParam: 0,
      enabled: fetchEnable,
      queryFn: async ({ pageParam }) => {
        try {
          const response = await fetch('/friend/list', {
            data: { pagePerCnt: 10, page: pageParam, option: 'all' },
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
          {dataGroup?.map(
            (friend) =>
              !removeKeySet.has(friend.email) && (
                <ListItem
                  divider={true}
                  key={friend.email}
                  secondaryAction={
                    friend.isWaiting ? (
                      <ButtonGroup
                        variant="outlined"
                        aria-label="Basic button group"
                      >
                        <Button
                          onClick={async () => {
                            if (await allowFriendRequest(fetch, friend.email)) {
                              addRemoveKey(friend.email)
                              refetchLastPage()
                            }
                          }}
                        >
                          수락
                        </Button>
                        <Button
                          onClick={async () => {
                            if (await denyFriendRequest(fetch, friend.email)) {
                              addRemoveKey(friend.email)
                            }
                          }}
                        >
                          거절
                        </Button>
                      </ButtonGroup>
                    ) : (
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={async () => {
                          if (await removeFriend(fetch, friend.email)) {
                            addRemoveKey(friend.email)
                          }
                        }}
                      >
                        <Icon>delete</Icon>
                      </IconButton>
                    )
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
                          <Chip
                            label="친구 신청"
                            color="primary"
                            size={'small'}
                          />
                        </>
                      ) : (
                        friend.nickname
                      )
                    }
                    secondary={friend.email}
                  />
                </ListItem>
              )
          )}
        </React.Fragment>
      ))}
      {!isFetching && !isFetchingNextPage && (
        <Grid
          sx={{
            position: 'absolute',
            bottom: 0,
          }}
          ref={ref}
        ></Grid>
      )}
    </List>
  )
}
