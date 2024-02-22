import { TabContext, TabPanel } from '@mui/lab'
import { Box, Fab, Icon, Paper, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import FriendList from './FriendList'
import GroupList from './GroupList'

export default function PageTab() {
  const [value, setValue] = useState('1')
  return (
    <>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            textColor="primary"
            indicatorColor="primary"
            onChange={(d, v) => setValue(v)}
          >
            <Tab value={'1'} label="그룹 목록" />
            <Tab value={'2'} label="친구 목록" />
          </Tabs>
        </Box>

        <TabPanel value="1">
          <GroupList />
        </TabPanel>
        <TabPanel value="2" sx={{ pt: 0 }}>
          <FriendList />
        </TabPanel>
      </TabContext>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', right: 20, bottom: 20 }}
      >
        <Icon>add</Icon>
      </Fab>
    </>
  )
}
