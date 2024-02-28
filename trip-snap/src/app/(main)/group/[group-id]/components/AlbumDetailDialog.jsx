import CustomResponsiveDialog from '@/components/dialog/CustomResponsiveDialog'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { Box, Fab, Icon } from '@mui/material'
import SquareImageList from './SquareImageList'

export default function AlbumDetailDialog({ isOpen, close }) {
  return (
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
          <Fab
            color="primary"
            aria-label="add"
            sx={{ right: 20, bottom: 20, position: 'absolute' }}
            onClick={() => false}
          >
            <AddPhotoAlternateIcon />
          </Fab>
        </>
      }
    />
  )
}
