'use client'

import { useNotiContext } from '@/context/NotificationContext'
import {
  Divider,
  Drawer,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
  Popper,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import useFetch from '@/hooks/useFetch'
import { useInView } from 'react-intersection-observer'
import React, { useEffect, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { errorAlert } from '@/utils/alertUtil'
import Grid from '@mui/material/Unstable_Grid2'

export default function NotiDrawer() {
  const { isOpen, close } = useNotiContext()

  const router = useRouter()
  const { fetch } = useFetch(router)
  const { ref, inView } = useInView()
  const [fetchEnable, setFetchEnable] = useState(true)
  const [alarmDetailId, setAlarmDetailId] = useState(null)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['/notification/list', fetchEnable],
      initialPageParam: 0,
      enabled: fetchEnable && isOpen,
      queryFn: async ({ pageParam }) => {
        try {
          const response = await fetch('/notification/list', {
            data: { pagePerCnt: 10, page: pageParam },
          })
          if (response.ok) {
            if (!pageParam) {
              fetch('/notification/read')
            }
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
    if (inView && !isFetching && !isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, isFetching, isFetchingNextPage, hasNextPage])

  const remove = async (id) => {
    const response = await fetch(`/notification/${id}`, { method: 'DELETE' })
  }

  return (
    <Drawer open={isOpen} onClose={close} anchor={'right'}>
      <List disablePadding={true}>
        <ListSubheader
          sx={{ fontSize: 'larger', borderBottom: 1, borderColor: 'divider' }}
        >{`알람`}</ListSubheader>
        {data?.pages.map((dataGroup, i) => (
          <React.Fragment key={i}>
            {dataGroup?.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => remove(notification.id)}
                    >
                      <Icon>clear</Icon>
                    </IconButton>
                  }
                  sx={{ py: 0 }}
                >
                  <ListItemButton
                    disableGutters
                    sx={{ pr: '0!important' }}
                    onClick={(event) => {
                      setAnchorEl(event.currentTarget)
                      setAlarmDetailId(notification.id)
                    }}
                  >
                    {/* <ListItemAvatar><Avatar>A</Avatar></ListItemAvatar> */}

                    <ListItemText
                      sx={{
                        width: 230,
                      }}
                      primary={
                        <div
                          style={{
                            whiteSpace: 'nowrap',
                            wordBreak: 'break-all',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {notification.title}
                        </div>
                      }
                      secondary={notification.date}
                    ></ListItemText>
                  </ListItemButton>
                  <Popper
                    id={`popover-${notification.id}`}
                    open={notification.id === alarmDetailId}
                    anchorEl={anchorEl}
                    onClose={() => {
                      setAnchorEl(null)
                      setAlarmDetailId(null)
                    }}
                    placement={'left'}
                    sx={{ zIndex: 10000 }}
                  >
                    <Paper sx={{ mr: 1.5, maxWidth: '300px' }}>
                      <Typography sx={{ p: 2 }}>
                        {notification.title}
                      </Typography>
                    </Paper>
                  </Popper>
                </ListItem>
                <Divider variant="middle" component="li" />
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}

        {isOpen && !isFetching && !isFetchingNextPage && (
          <Grid
            sx={{
              position: 'absolute',
              bottom: 0,
            }}
            ref={ref}
          ></Grid>
        )}
      </List>
    </Drawer>
  )
}
