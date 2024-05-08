'use client'

import { useNotiContext } from '@/context/NotificationContext'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import { Avatar, Badge, Fab, Menu, MenuItem } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { fetchData } from '@/utils/fetch'
import { removeToken } from '@/utils/AuthUtil'

export default function NavicationMenu() {
  const { open } = useNotiContext()
  const [anchorEl, setAnchorEl] = useState(null)
  const menuOpen = Boolean(anchorEl)
  const router = useRouter()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const logout = async () => {
    const response = await fetchData('/logout', {
      method: 'GET',
    })
    removeToken()
    router.replace('/login')
  }

  return (
    <>
      <Grid ml={'auto'} display={'flex'} flexGrow={'row'} alignItems={'center'}>
        <Fab sx={{ width: 40, height: 40 }} onClick={open}>
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
        <Fab
          sx={{ width: 40, height: 40 }}
          aria-controls={menuOpen ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={menuOpen ? 'true' : undefined}
          id="basic-button"
          onClick={handleClick}
        >
          <Avatar
            sx={{ margin: '3px', height: 40, width: 40 }}
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
          />
        </Fab>
      </Grid>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose()
            router.push('/user')
          }}
        >
          정보 수정
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose()
            logout()
          }}
        >
          로그아웃
        </MenuItem>
      </Menu>
    </>
  )
}
