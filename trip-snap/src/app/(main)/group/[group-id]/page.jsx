'use client'

import BottomHandleDrawer from '@/components/BottomHandleDrawer'
import CusotmBreadcrumbs from '@/components/CusotmBreadcrumbs'
import { MoreVert } from '@mui/icons-material'
import {
  Box,
  Button,
  Divider,
  Fab,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useState } from 'react'
import PlaceList from './components/PlaceList'
import AlbumDetailDialog from './components/AlbumDetailDialog'
import AddAlbumDialog from './components/AddAlbumDialog'

export default function Page() {
  const theme = useTheme()
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down('md'))

  const [openAddModal, setOpenAddModal] = useState(false)
  const [openDetailModal, setOpenDetailModal] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null)
  const menuOpen = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handlePlaceItemClick = () => {
    setOpenDetailModal(true)
  }

  return (
    <>
      <Paper sx={isSmallerThanMd ? {} : { margin: '19px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <CusotmBreadcrumbs
            data={[
              { name: '그룹 목록', path: '/home' },
              { name: '그룹 이름', path: '/sdf' },
            ]}
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
        <Grid container>
          <Grid xs={12} md={6} sx={{ position: 'relative' }}>
            <Button
              sx={{
                top: 5,
                left: 5,
                position: 'absolute',
                width: 36,
                zIndex: 100,
              }}
              variant="contained"
              color="warning"
            >
              <Icon>sync</Icon>
            </Button>
            <Box
              sx={{
                backgroundColor: 'green',
                position: 'relative',
                ...(isSmallerThanMd
                  ? { height: 'calc(100vh - 95px - 56px)' }
                  : { height: '100%' }),
              }}
            >
              지도
              <Fab
                color="primary"
                aria-label="add"
                sx={{ right: 20, bottom: 20, position: 'absolute' }}
                onClick={() => setOpenAddModal(true)}
              >
                <Icon>add</Icon>
              </Fab>
            </Box>
          </Grid>
          {!isSmallerThanMd && (
            <Grid
              xs={12}
              md={6}
              sx={{
                height: 'calc(100vh - 150px)',
                maxHeight: 'calc(100vh - 150px)',
              }}
            >
              <Box overflow={'auto'} maxHeight={'calc(100vh - 150px)'}>
                <PlaceList handleClick={handlePlaceItemClick} />
              </Box>
            </Grid>
          )}
        </Grid>
        {isSmallerThanMd && (
          <BottomHandleDrawer title={'51 results'}>
            <PlaceList handleClick={handlePlaceItemClick} />
          </BottomHandleDrawer>
        )}

        {/* <MemberListDrawer /> */}
        <AlbumDetailDialog
          isOpen={openDetailModal}
          close={() => setOpenDetailModal(false)}
        />
        <AddAlbumDialog
          isOpen={openAddModal}
          close={() => setOpenAddModal(false)}
        />
        {/* <EditAlbumDialog /> */}
        {/* {} */}
        {/* <EditAlbumPhotoDialog /> */}
      </Paper>
    </>
  )
}
