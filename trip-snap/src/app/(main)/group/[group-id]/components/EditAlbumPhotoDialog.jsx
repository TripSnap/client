import CustomResponsiveDialog from '@/components/dialog/CustomResponsiveDialog'
import SquareImageList from './SquareImageList'
import { Button } from '@mui/material'

export default function EditAlbumPhotoDialog() {
  return (
    <CustomResponsiveDialog
      title={'사진 수정'}
      body={<SquareImageList useCheckbox />}
      footer={<Button>수정하기</Button>}
    />
  )
}
