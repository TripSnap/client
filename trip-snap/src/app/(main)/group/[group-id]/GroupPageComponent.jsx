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
import { useRouter } from 'next/navigation'
import { confirmAlert, successAlert } from '@/utils/alertUtil'
import useFetch from '@/hooks/useFetch'

export default function GroupPageComponent({ group }) {
  const theme = useTheme()
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down('md'))
  const router = useRouter()
  const { fetch } = useFetch(router)

  const [anchorEl, setAnchorEl] = useState(null)
  const menuOpen = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const { groupId, setGroupId } = useGroupContext()

  useEffect(() => {
    if (group?.id) {
      setGroupId(group.id)
    } else {
      router.replace('/')
    }
  }, [])

  const leaveGroup = () =>
    confirmAlert({
      message: '그룹을 탈퇴하시겠습니까?',
      confirmCallback: async () => {
        const response = await fetch(`/group/leave/${groupId}`)
        if (response.ok) {
          const { success } = await response.json()
          if (success) {
            await successAlert({
              message: '그룹을 탈퇴했습니다.',
              callback: () => router.replace('/home'),
            })
          }
        }
      },
    })

  return (
    <>
      <Paper sx={isSmallerThanMd ? {} : { margin: '19px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <CusotmBreadcrumbs
            data={[{ name: '그룹 목록', path: '/home' }, { name: group.title }]}
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
          <MenuItem>인원 목록</MenuItem>
          <MenuItem onClick={leaveGroup}>그룹 탈퇴</MenuItem>
        </Menu>
        <Divider />
        <PlaceListProvider>
          {group?.id && <PlaceListMap isSmallerThanMd={isSmallerThanMd} />}
        </PlaceListProvider>
        {/* <EditAlbumDialog /> */}
        {/* {} */}
        {/* <EditAlbumPhotoDialog /> */}
      </Paper>
    </>
  )
}
