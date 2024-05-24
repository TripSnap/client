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
import { errorAlert } from '@/utils/alertUtil'
import { useRouter } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import Grid from '@mui/material/Unstable_Grid2'
import useFetch from '@/hooks/useFetch'
import useListFetch from '@/hooks/useListFetch'

export const AddGroupForm = ({ control, setValue }) => {
  const router = useRouter()
  const { fetch } = useFetch(router)
  const { ref, inView } = useInView()
  const [fetchEnable, setFetchEnable] = useState(true)
  const [emails, setEmails] = useState([])

  const { data, enableNextFetch, fetchNextPage } = useListFetch({
    queryKey: ['/friend/list', 'active', 'GET'],
    queryFn: async ({ pageParam }) => {
      try {
        const response = await fetch('/friend/list', {
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
    fetchEnable,
    pageSize: 10,
    key: 'email',
  })

  useEffect(() => {
    setValue('memberEmails', emails)
  }, [emails])

  useEffect(() => {
    if (inView && enableNextFetch) {
      fetchNextPage()
    }
  }, [inView, enableNextFetch])

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
            {enableNextFetch && (
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
