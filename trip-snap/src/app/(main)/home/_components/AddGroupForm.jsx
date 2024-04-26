import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from '@mui/material'
import InputLabel from '@/components/input/InputLabel'
import PaperInput from '@/components/input/PaperInput'
import React, { useEffect, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchData } from '@/utils/fetch'
import { errorAlert } from '@/utils/alertUtil'
import { useRouter } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import Grid from '@mui/material/Unstable_Grid2'

export const AddGroupForm = ({ control, setValue }) => {
  const router = useRouter()

  const [fetchEnable, setFetchEnable] = useState(true)
  const [emails, setEmails] = useState([])
  const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['friendList'],
      initialPageParam: 0,
      enabled: fetchEnable,
      queryFn: async ({ pageParam }) => {
        try {
          const response = await fetchData('/friend/list', router, {
            data: { pagePerCnt: 10, page: pageParam, option: 'active' },
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
    setValue('memberEmails', emails)
  }, [emails])
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && !isFetching && !isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, isFetching, isFetchingNextPage, hasNextPage])

  const handleCheckbox = (checked, email) => {
    if (checked) {
      setEmails([...emails, email])
    } else {
      const removeIndex = emails.indexOf(email)
      setEmails([
        ...emails.slice(0, removeIndex),
        ...emails.slice(removeIndex + 1),
      ])
    }
  }

  return (
    <>
      <Box sx={{ mt: 0.5 }}>
        <InputLabel name={'그룹 이름'} level={4} bold />
        <PaperInput name={'title'} control={control} />
      </Box>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexFlow: 'column',
        }}
      >
        <InputLabel name={'친구 선택'} level={4} bold />
        <Box
          sx={{
            mt: 0.8,
            overflowX: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            listStyle: 'none',
            flexFlow: 'row',
          }}
          className="invisible-scrollbar"
        >
          {emails.map((email) => (
            <Chip
              key={email}
              label={email}
              variant="outlined"
              onDelete={() => {
                handleCheckbox(false, email)
              }}
              sx={{ mr: 0.5 }}
            />
          ))}
        </Box>
        <Paper sx={{ overflowY: 'auto', mt: 0.8, height: 400, maxHeight: 400 }}>
          <List>
            {data?.pages.map((dataGroup, i) => (
              <React.Fragment key={i}>
                {dataGroup?.map((friend) => (
                  <ListItem
                    divider={true}
                    key={friend.email}
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        onChange={({ target }) => {
                          const { checked } = target
                          handleCheckbox(checked, friend.email)
                        }}
                        checked={emails.includes(friend.email)}
                      />
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>A</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={friend.nickname}
                      secondary={friend.email}
                    />
                  </ListItem>
                ))}
              </React.Fragment>
            ))}
            {!isFetching && !isFetchingNextPage && (
              <Grid
                sx={{
                  position: 'absolute',
                  bottom: 10,
                }}
                ref={ref}
              ></Grid>
            )}
          </List>
        </Paper>
      </Box>
    </>
  )
}
