'use client'

import { useNotiContext } from '@/context/NotificationContext'
import {
  Drawer,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material'

export default function NotiDrawer() {
  const { isOpen, close } = useNotiContext()
  return (
    <Drawer open={isOpen} onClose={close} anchor={'right'}>
      <List disablePadding={true}>
        <ListSubheader
          sx={{ fontSize: 'larger', borderBottom: 1, borderColor: 'divider' }}
        >{`알람`}</ListSubheader>
        {Array.from(Array(13)).map((e, i) => (
          <ListItem
            key={i}
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <Icon>clear</Icon>
              </IconButton>
            }
          >
            <ListItemButton disableGutters sx={{ pr: '0!important' }}>
              {/* <ListItemAvatar><Avatar>A</Avatar></ListItemAvatar> */}
              <ListItemText
                sx={{ wordBreak: 'break-all', width: 230 }}
                secondary={
                  's ddddddddddddddddddddddddddddsssssssssssssssssssssssdd'
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
