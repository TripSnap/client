import BottomHandleDrawer from '@/components/BottomHandleDrawer'
import { Box, Button, Fab, Icon } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import PlaceList from '../PlaceList'
import AlbumDetailDialog from '../dialog/AlbumDetailDialog'
import Map from './Map'
import { useEffect, useState } from 'react'
import { usePlaceListContext } from './PlaceListProvider'
import AddAlbumDialog from '../dialog/AddAlbumDialog'

export default function PlaceListMap({ isSmallerThanMd }) {
  // const [openDetailModal, setOpenDetailModal] = useState(false)

  const handlePlaceItemClick = () => {
    setOpenDetailModal(true)
  }
  const [openAddModal, setOpenAddModal] = useState(false)

  const {
    placeList,
    setPlaceList,
    selected,
    setSelected,
    openDetailModal,
    setOpenDetailModal,
  } = usePlaceListContext()

  return (
    <>
      <Grid container>
        <Grid xs={12} md={6} sx={{ position: 'relative' }}>
          <Button
            sx={{
              top: 5,
              left: 5,
              position: 'absolute',
              width: 36,
              zIndex: 100,
              minWidth: 0,
              padding: 1,
            }}
            variant="contained"
            color="warning"
          >
            <Icon>sync</Icon>
          </Button>
          <Box
            sx={{
              position: 'relative',
              ...(isSmallerThanMd
                ? { height: 'calc(100vh - 95px - 56px)' }
                : { height: '100%' }),
            }}
          >
            <Map useAlbumPlaceMarker />
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
              <PlaceList
                modalIsOpen={openAddModal || openDetailModal}
                openModal={() => setOpenDetailModal(true)}
                focusPlace={(id) => setSelected(id)}
              />
            </Box>
          </Grid>
        )}
      </Grid>
      {isSmallerThanMd && (
        <BottomHandleDrawer title={'places'}>
          <PlaceList
            modalIsOpen={openAddModal || openDetailModal}
            openModal={() => setOpenDetailModal(true)}
            focusPlace={(id) => setSelected(id)}
          />
        </BottomHandleDrawer>
      )}

      {/* <MemberListDrawer /> */}
      {openDetailModal && (
        <AlbumDetailDialog
          isOpen={openDetailModal}
          close={() => setOpenDetailModal(false)}
        />
      )}
      {openAddModal && (
        <AddAlbumDialog
          isOpen={openAddModal}
          close={() => setOpenAddModal(false)}
        />
      )}
    </>
  )
}
