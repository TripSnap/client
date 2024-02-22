'use client'

import { Avatar, Badge, Fab, Icon } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'

export default function NavicationMenu() {
  return (
    <>
      <Grid ml={'auto'} display={'flex'} flexGrow={'row'} alignItems={'center'}>
        <Fab sx={{ width: 40, height: 40 }}>
          <Badge
            color="error"
            variant="dot"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            invisible={false}
          >
            <NotificationsNoneOutlinedIcon />
          </Badge>
        </Fab>
      </Grid>
      <Grid>
        <Fab sx={{ width: 40, height: 40 }}>
          <Avatar
            sx={{ margin: '3px', height: 40, width: 40 }}
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
          />
        </Fab>
      </Grid>
    </>
  )
}
