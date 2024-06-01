import CustomResponsiveDialog from '@/components/dialog/CustomResponsiveDialog'
import { Button } from '@mui/material'
import AlbumPhotoForm from '../AlbumPhotoForm'
import { useGroupContext } from '@/app/(main)/group/[group-id]/_context/GroupContext'
import { useRouter } from 'next/navigation'
import useFetch from '@/hooks/useFetch'
import { useValidationResolver } from '@/api/scheme/useValidationResolver'
import { AddPhotoSchema } from '@/api/scheme/GroupSchema'
import { useForm } from 'react-hook-form'
import { useThrottle } from '@/hooks/useThrottle'
import { errorAlert, successAlert } from '@/utils/alertUtil'
import useImageManager from '@/hooks/useImageManager'

export default function AddAlbumPhotoDialog({ isOpen, close }) {
  const { albumId, groupId } = useGroupContext()
  const router = useRouter()
  const { fetch: apiFetch } = useFetch(router)

  const resolver = useValidationResolver(AddPhotoSchema)
  const { handleSubmit, setValue, getValues } = useForm({
    resolver,
    defaultValues: { albumId, groupId, albumPhotoList: [] },
    mode: 'all',
  })

  const {
    uploadEvent,
    dataURL: thumbnails,
    blobData,
    removeData,
  } = useImageManager({
    readDataUrlCallback: (data, setter, prevData) => {
      setter([...prevData, ...data])
    },
    readBlobCallback: (data, setter, prevData) => {
      setter([...prevData, ...data])
    },
  })

  const { callback: submit } = useThrottle(
    2000,
    async () => {
      const promiseResult = await Promise.allSettled(
        blobData.map(({ type, data }) => uploadImage(type, data))
      )
      const filenames = promiseResult
        .filter(({ status }) => status === 'fulfilled')
        .map(({ value }) => value)

      if (filenames.length > 0) {
        setValue(
          'albumPhotoList',
          filenames.map((filename) => ({ photo: filename }))
        )

        const response = await apiFetch('/album/photo', {
          method: 'POST',
          data: getValues(),
        })
        if (response.ok) {
          const { success } = await response.json()
          if (success) {
            successAlert({
              message: '사진을 추가했습니다.',
              callback: close,
            })
          }
        }
      } else {
        errorAlert({
          message: '업로드 할 사진이 없습니다.',
        })
      }
    },
    [blobData]
  )

  const uploadImage = async (type, blobData) =>
    new Promise(async (res, rej) => {
      try {
        let response = await apiFetch(`/album/${albumId}/upload-authority`, {
          method: 'POST',
          data: { type },
        })
        if (response.ok) {
          const data = await response.json()
          response = await fetch(data.uploadUrl, {
            method: 'PUT',
            body: blobData,
            headers: {
              'Content-Type': type,
            },
          })
          if (response.ok) {
            res(data.filename)
          }
        }
        rej()
      } catch (e) {
        rej()
      }
    })

  return (
    <CustomResponsiveDialog
      isOpen={isOpen}
      close={close}
      title={'사진 추가'}
      body={
        <AlbumPhotoForm
          uploadEvent={uploadEvent}
          photos={thumbnails}
          removePhoto={removeData}
        />
      }
      footer={
        <Button
          onClick={handleSubmit(submit)}
          disabled={!thumbnails || !thumbnails.length}
        >
          추가하기
        </Button>
      }
    />
  )
}
