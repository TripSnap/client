'use client'
import { setBodyScroll } from '@/utils/utils'
import { TabContext, TabPanel } from '@mui/lab'
import { Box, Fab, Icon, Paper, Tab, Tabs } from '@mui/material'
import { useEffect, useState } from 'react'
import AddFriendDialog from '@/app/(main)/home/_components/AddFriendDialog'
import AddGroupDialog from '@/app/(main)/home/_components/AddGroupDialog'
import FriendList from '@/app/(main)/home/_components/FriendList'
import GroupList from '@/app/(main)/home/_components/GroupList'
import FriendRequestSendList from '@/app/(main)/home/_components/FriendRequestSendList'
import GroupInviteList from '@/app/(main)/home/_components/GroupInviteList'

export default function Page() {
  const [value, setValue] = useState('group') // group, friend
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    setModalIsOpen(false)
  }, [value])
  useEffect(() => {
    setBodyScroll(modalIsOpen)
  }, [modalIsOpen])

  return (
    <>
      <Paper>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              textColor="primary"
              indicatorColor="primary"
              onChange={(d, v) => setValue(v)}
            >
              <Tab value={'group'} label="그룹 목록" />
              <Tab value={'friend'} label="친구 목록" />
              <Tab value={'friend-request-send'} label="친구신청 보낸 목록" />
              <Tab value={'group-invite'} label="그룹 초대 목록" />
            </Tabs>
          </Box>

          <TabPanel value="group">
            <GroupList />
          </TabPanel>
          <TabPanel value="friend" sx={{ pt: 0 }}>
            <FriendList />
          </TabPanel>
          <TabPanel value="friend-request-send" sx={{ pt: 0 }}>
            <FriendRequestSendList />
          </TabPanel>
          <TabPanel value="group-invite">
            <GroupInviteList />
          </TabPanel>
        </TabContext>
        {['group', 'friend'].includes(value) && (
          <Fab
            color="primary"
            aria-label="add"
            sx={{ position: 'fixed', right: 20, bottom: 20 }}
            onClick={() => setModalIsOpen(true)}
          >
            <Icon>add</Icon>
          </Fab>
        )}
        <AddGroupDialog
          isOpen={modalIsOpen && value === 'group'}
          close={() => setModalIsOpen(false)}
        />
        <AddFriendDialog
          isOpen={modalIsOpen && value === 'friend'}
          close={() => setModalIsOpen(false)}
        />
      </Paper>
    </>
  )
}
