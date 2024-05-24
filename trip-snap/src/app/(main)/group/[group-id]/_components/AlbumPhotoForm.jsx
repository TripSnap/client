import { Image } from '@mui/icons-material'
import { Box, Button, Paper } from '@mui/material'
import EditableSquareImageList from '@/app/(main)/group/[group-id]/_components/EditableSquareImageList'

export default function AlbumPhotoForm() {
  return (
    <>
      <Box sx={{ mt: 0.5 }}>
        <Button variant="contained" startIcon={<Image />}>
          사진 추가
        </Button>
        <Paper sx={{ mt: 0.5, p: 0.5 }}>
          <EditableSquareImageList />
        </Paper>
      </Box>
    </>
  )
}
