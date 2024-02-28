import CustomResponsiveDialog from '@/components/dialog/CustomResponsiveDialog'
import { Button } from '@mui/material'
import AlbumPhotoForm from './AlbumPhotoForm'

export default function AddAlbumPhotoDialog({ isOpen, close }) {
  return (
    <CustomResponsiveDialog
      isOpen={isOpen}
      close={close}
      title={'사진 추가'}
      body={<AlbumPhotoForm />}
      footer={<Button>올리기</Button>}
    />
  )
}
