'use client'

import CusotmBreadcrumbs from '@/components/CusotmBreadcrumbs'
import { MoreVert } from '@mui/icons-material'
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useEffect, useState } from 'react'
import PlaceListMap from '@/app/(main)/group/[group-id]/_components/map/PlaceListMap'
import { PlaceListProvider } from '@/app/(main)/group/[group-id]/_components/map/PlaceListProvider'
import { useGroupContext } from '@/app/(main)/group/[group-id]/_context/GroupContext'

export default function Page({ params }) {
  const theme = useTheme()
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down('md'))

  const [anchorEl, setAnchorEl] = useState(null)
  const menuOpen = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const { setGroupId } = useGroupContext()

  useEffect(() => {
    setGroupId(params['group-id'])
  }, [])
  return (
    <>
      <Paper sx={isSmallerThanMd ? {} : { margin: '19px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <CusotmBreadcrumbs
            data={[{ name: '그룹 목록', path: '/home' }, { name: '그룹 이름' }]}
          />
          <IconButton onClick={handleClick}>
            <MoreVert />
          </IconButton>
        </Box>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={menuOpen}
          // onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          onClose={handleClose}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
        <Divider />
        <PlaceListProvider>
          <PlaceListMap isSmallerThanMd={isSmallerThanMd} />
        </PlaceListProvider>
        {/* <EditAlbumDialog /> */}
        {/* {} */}
        {/* <EditAlbumPhotoDialog /> */}
      </Paper>
    </>
  )
}
