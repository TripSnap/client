import CustomResponsiveDialog from '@/components/dialog/CustomResponsiveDialog'
import { Button } from '@mui/material'
import AlbumForm from '../AlbumForm'
import AlbumPhotoForm from '../AlbumPhotoForm'

export default function AddAlbumDialog({ isOpen, close }) {
  return (
    <CustomResponsiveDialog
      isOpen={isOpen}
      close={close}
      title={'기록 추가'}
      body={
        <>
          <AlbumForm />
          <div style={{ height: '1rem' }}></div>
          <AlbumPhotoForm />
        </>
      }
      footer={<Button>올리기</Button>}
    />
  )
}
