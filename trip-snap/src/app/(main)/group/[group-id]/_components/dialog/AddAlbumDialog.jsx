import CustomResponsiveDialog from '@/components/dialog/CustomResponsiveDialog'
import { Button } from '@mui/material'
import AlbumForm from '../AlbumForm'
import AlbumPhotoForm from '../AlbumPhotoForm'
import { useValidationResolver } from '@/api/scheme/useValidationResolver'
import { AlbumInsSchema } from '@/api/scheme/GroupSchema'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { useThrottle } from '@/hooks/useThrottle'
import { useRouter } from 'next/navigation'
import { errorAlert, successAlert } from '@/utils/alertUtil'
import { useGroupContext } from '@/app/(main)/group/[group-id]/_context/GroupContext'
import useFetch from '@/hooks/useFetch'

export default function AddAlbumDialog({ isOpen, close }) {
  const router = useRouter()
  const { fetch } = useFetch(router)
  const resolver = useValidationResolver(AlbumInsSchema)
  const { groupId } = useGroupContext()
  const instance = useForm({
    resolver: resolver,
    defaultValues: { date: dayjs(), groupId },
  })

  const { callback: submit } = useThrottle(2000, async (value) => {
    const response = await fetch('/album', {
      method: 'POST',
      data: { ...value, data: dayjs(value.data).format('yyyy-MM-dd HH:mm:ss') },
    })
    if (response.ok) {
      const data = await response.json()
      if (data.success) {
        successAlert({
          message: '기록이 생성되었습니다.',
          callback: () => {
            close()
          },
        })
      } else {
        errorAlert({
          message: '생성을 실패했습니다.',
        })
      }
    }
  })
  return (
    <CustomResponsiveDialog
      isOpen={isOpen}
      close={close}
      title={'기록 추가'}
      body={
        <>
          <AlbumForm {...instance} />
          <div style={{ height: '1rem' }}></div>
          <AlbumPhotoForm />
        </>
      }
      footer={<Button onClick={instance.handleSubmit(submit)}>올리기</Button>}
    />
  )
}
