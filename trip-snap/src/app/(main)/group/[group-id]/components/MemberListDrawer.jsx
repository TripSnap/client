'use client'

import {
  Avatar,
  Button,
  Drawer,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material'

export default function MemberListDrawer() {
  return (
    <Drawer open={false} onClose={() => {}} anchor={'left'}>
      <List disablePadding>
        <ListSubheader
          sx={{ fontSize: 'larger', borderBottom: 1, borderColor: 'divider' }}
        >{`그룹 인원`}</ListSubheader>
        {Array.from(Array(13)).map((e, i) => (
          <ListItem key={i} secondaryAction={<Button>초대 취소</Button>}>
            <ListItemAvatar>
              <Avatar>A</Avatar>
            </ListItemAvatar>
            <ListItemButton disableGutters sx={{ pr: '0!important' }}>
              {/* <ListItemAvatar><Avatar>A</Avatar></ListItemAvatar> */}
              <ListItemText
                sx={{ wordBreak: 'break-all', width: 230 }}
                secondary={'니니니니닉네이이이임'}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
