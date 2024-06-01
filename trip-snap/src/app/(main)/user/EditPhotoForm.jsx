import Grid from '@mui/material/Unstable_Grid2'
import { Avatar, Button } from '@mui/material'
import { useRef, useState } from 'react'
import useImageManager from '@/hooks/useImageManager'

export default function EditPhotoForm({
  setImageBinaryData,
  user,
  removeUserPhoto,
}) {
  const inputRef = useRef(null)
  const [thumbnail, setThumbnail] = useState(
    user.photo ? process.env.NEXT_PUBLIC_PHOTO_URL + user.photo : null
  )
  const { uploadEvent } = useImageManager({
    readBlobCallback: (blobData) => {
      const [data] = blobData
      setImageBinaryData(data)
    },
    readDataUrlCallback: (dataURL) => {
      const [{ data }] = dataURL
      setThumbnail(data)
    },
  })

  const removeImage = () => {
    setImageBinaryData(null)
    setThumbnail(null)
    removeUserPhoto()
  }

  return (
    <>
      <Grid>
        <Avatar
          src={thumbnail}
          sx={{ width: 100, height: 100 }}
          variant="square"
        />
      </Grid>
      <Grid display={'flex'} sx={{ flexDirection: 'column' }}>
        <Button sx={{ mt: 'auto' }} onClick={() => inputRef.current.click()}>
          사진 변경
        </Button>
      </Grid>
      <Grid display={'flex'} sx={{ flexDirection: 'column' }}>
        <Button sx={{ mt: 'auto' }} onClick={removeImage} color={'error'}>
          사진 삭제
        </Button>
      </Grid>
      <input
        onChange={async (e) => {
          await uploadEvent(e)
          inputRef.current.value = null
        }}
        type={'file'}
        ref={inputRef}
        accept={'image/*'}
        hidden
      />
    </>
  )
}
