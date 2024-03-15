import CustomResponsiveDialog from '@/components/dialog/CustomResponsiveDialog'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import {
  Backdrop,
  Box,
  Fab,
  Icon,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material'
import SquareImageList from '../SquareImageList'
import { useState } from 'react'
import EditAlbumPhotoDialog from './EditAlbumPhotoDialog'
import EditIcon from '@mui/icons-material/Edit'
import AddAlbumPhotoDialog from './AddAlbumPhotoDialog'
import DeleteIcon from '@mui/icons-material/Delete'

export default function AlbumDetailDialog({ isOpen, close }) {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  return (
    <>
      <CustomResponsiveDialog
        isOpen={isOpen}
        close={close}
        title={
          <>
            <Box>
              <h3 style={{ display: 'inline', marginRight: 15 }}>#기록1</h3>
              <h4 style={{ display: 'inline', fontWeight: 400, color: 'gray' }}>
                2024.01.01
              </h4>
              <h5
                style={{
                  margin: 0,
                  fontWeight: 400,
                  color: 'gray',
                  display: 'flex',
                }}
              >
                <Icon>place</Icon>주소어쩌고
              </h5>
            </Box>
          </>
        }
        body={
          <>
            <SquareImageList />

            <SpeedDial
              sx={{ position: 'absolute', bottom: 20, right: 20 }}
              icon={<SpeedDialIcon />}
              ariaLabel="Album detail dialog"
            >
              <SpeedDialAction
                icon={<AddPhotoAlternateIcon />}
                tooltipTitle={'사진추가'}
                tooltipOpen
                onClick={() => setOpenAddModal(true)}
              />
              <SpeedDialAction
                icon={<EditIcon />}
                tooltipTitle={'사진수정'}
                tooltipOpen
                onClick={() => setOpenEditModal(true)}
              />
              <SpeedDialAction
                icon={<DeleteIcon color="error" />}
                tooltipTitle={'기록삭제'}
                tooltipOpen
                onClick={() => setOpenAddModal(true)}
              />
            </SpeedDial>
          </>
        }
      />
      <AddAlbumPhotoDialog
        isOpen={openAddModal}
        close={() => setOpenAddModal(false)}
      />
      <EditAlbumPhotoDialog
        isOpen={openEditModal}
        close={() => setOpenEditModal(false)}
      />
    </>
  )
}
