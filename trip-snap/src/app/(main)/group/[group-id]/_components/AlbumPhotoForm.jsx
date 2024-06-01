import { Image } from '@mui/icons-material'
import { Box, Button, Paper } from '@mui/material'
import EditableSquareImageList from '@/app/(main)/group/[group-id]/_components/EditableSquareImageList'
import { useRef } from 'react'

export default function AlbumPhotoForm({ uploadEvent, photos, removePhoto }) {
  const inputRef = useRef(null)

  return (
    <>
      <Box sx={{ mt: 0.5 }}>
        <Button
          onClick={() => {
            inputRef.current.click()
          }}
          variant="contained"
          startIcon={<Image />}
        >
          사진 추가
        </Button>
        <input
          onChange={async (e) => {
            await uploadEvent(e)
            inputRef.current.value = null
          }}
          type={'file'}
          ref={inputRef}
          multiple
          accept={'image/*'}
          hidden
        />
        {photos?.length > 0 && (
          <Paper sx={{ mt: 0.5, p: 0.5 }}>
            <EditableSquareImageList
              newList={photos}
              removeNewListItem={removePhoto}
            />
          </Paper>
        )}
      </Box>
    </>
  )
}
