import Grid from '@mui/material/Unstable_Grid2'
import { Avatar, Button } from '@mui/material'
import { useRef, useState } from 'react'

export default function EditPhotoForm({
  setImageBinaryData,
  user,
  removeUserPhoto,
}) {
  const inputRef = useRef(null)
  const [thumbnail, setThumbnail] = useState(
    user.photo ? process.env.NEXT_PUBLIC_PHOTO_URL + user.photo : null
  )

  const uploadEvent = (event) => {
    const {
      target: { files },
    } = event

    const [file] = files
    const binaryReader = new FileReader()
    binaryReader.addEventListener('load', async (event) => {
      setImageBinaryData({ data: event.target.result, type: file.type })
    })
    binaryReader.readAsArrayBuffer(file)

    const thumbnailReader = new FileReader()
    thumbnailReader.addEventListener('load', async (event) => {
      setThumbnail(event.target.result)
    })
    thumbnailReader.readAsDataURL(file)
    inputRef.current.value = null
  }

  const removeImage = () => {
    inputRef.current.value = null
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
        onChange={uploadEvent}
        type={'file'}
        ref={inputRef}
        accept={'image/*'}
        hidden
      />
    </>
  )
}
