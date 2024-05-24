import {
  Avatar,
  Chip,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { useRouter } from 'next/navigation'
import useFetch from '@/hooks/useFetch'
import { useInView } from 'react-intersection-observer'
import { confirmAlert, errorAlert, successAlert } from '@/utils/alertUtil'
import { useGroupContext } from '@/app/(main)/group/[group-id]/_context/GroupContext'
import useListFetch from '@/hooks/useListFetch'

export default function MemberDrawer({ isOpen, close }) {
  const router = useRouter()
  const { fetch } = useFetch(router)
  const { ref, inView } = useInView()
  const [fetchEnable, setFetchEnable] = useState(true)
  const { groupId } = useGroupContext()

  const { data, enableNextFetch, removePage, fetchNextPage, reset } =
    useListFetch({
      queryKey: ['/group/members', groupId, 'POST'],
      queryFn: async ({ pageParam }) => {
        try {
          const response = await fetch('/group/members', {
            method: 'POST',
            data: { pagePerCnt: 10, page: pageParam, groupId },
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
      fetchEnable: fetchEnable && !!groupId,
      pageSize: 10,
      key: 'email',
    })

  useEffect(() => {
    if (inView && enableNextFetch) {
      fetchNextPage()
    }
  }, [inView, enableNextFetch])

  const cancelInvite = (email) =>
    confirmAlert({
      message: '초대를 취소하시겠습니까?',
      confirmCallback: async () => {
        const response = await fetch('/group/cancel-invite', {
          method: 'POST',
          data: { groupId, email },
        })
        if (response.ok) {
          const { success } = await response.json()
          if (success) {
            successAlert({
              message: '취소했습니다.',
              callback: () => removePage(email),
            })
          }
        }
      },
    })

  return (
    <Drawer open={isOpen} onClose={close} anchor={'left'}>
      <List>
        <ListSubheader
          sx={{ fontSize: 'larger', borderBottom: 1, borderColor: 'divider' }}
        >{`그룹 멤버 리스트`}</ListSubheader>
        {data?.pages.map((dataGroup, i) => (
          <React.Fragment key={i}>
            {dataGroup?.map((member) => (
              <React.Fragment key={member.email}>
                <ListItem
                  secondaryAction={
                    member.isWaiting && (
                      <Chip
                        label={'초대 대기'}
                        onDelete={() => cancelInvite(member.email)}
                      />
                    )
                  }
                >
                  <ListItemAvatar>
                    <Avatar>A</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ wordBreak: 'break-all', width: 230 }}
                    secondary={member.email}
                  />
                </ListItem>
                <Divider variant="middle" component="li" />
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}

        {isOpen && enableNextFetch && (
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
