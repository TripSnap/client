import CustomResponsiveDialog from '@/components/dialog/CustomResponsiveDialog'
import { Button } from '@mui/material'
import { errorAlert, successAlert } from '@/utils/alertUtil'
import { useEffect, useState } from 'react'
import { useGroupContext } from '@/app/(main)/group/[group-id]/_context/GroupContext'
import { useRouter } from 'next/navigation'
import useFetch from '@/hooks/useFetch'
import { useInView } from 'react-intersection-observer'
import EditableSquareImageList from '@/app/(main)/group/[group-id]/_components/EditableSquareImageList'
import { useForm } from 'react-hook-form'
import { useValidationResolver } from '@/api/scheme/useValidationResolver'
import { RemovePhotoSchema } from '@/api/scheme/GroupSchema'
import { useThrottle } from '@/hooks/useThrottle'
import useListFetch from '@/hooks/useListFetch'

export default function EditAlbumPhotoDialog({ isOpen, close }) {
  const { albumId, setAlbumId, groupId } = useGroupContext()
  const router = useRouter()
  const { fetch } = useFetch(router)
  const [fetchEnable, setFetchEnable] = useState(true)
  const { ref, inView } = useInView()

  const resolver = useValidationResolver(RemovePhotoSchema)
  const { handleSubmit, setValue, watch } = useForm({
    resolver,
    defaultValues: { albumId, groupId, removePhotoIds: [] },
    mode: 'all',
  })

  const { callback: submit } = useThrottle(2000, async (value) => {
    const response = await fetch('/album/photo/remove', {
      method: 'POST',
      data: value,
    })
    if (response.ok) {
      const { success } = await response.json()
      if (success) {
        return successAlert({
          message: '사진을 삭제했습니다.',
          callback: close,
        })
      }
    }
  })

  const { data, enableNextFetch, removePage, fetchNextPage, reset } =
    useListFetch({
      queryKey: ['/album/photo/list', albumId, 'POST'],
      queryFn: async ({ pageParam }) => {
        try {
          const response = await fetch('/album/photo/list', {
            method: 'POST',
            data: { pagePerCnt: 20, page: pageParam, groupId, albumId },
          })
          if (response.ok) {
            const { data } = await response.json()
            return data
          } else {
            setFetchEnable(false)
            errorAlert({ message: '데이터를 가져오는 데 실패했습니다.' })
          }
        } catch (e) {
          setFetchEnable(false)
        }
      },
      fetchEnable: fetchEnable && !!albumId,
      pageSize: 20,
      key: 'id',
    })

  useEffect(() => {
    if (inView && enableNextFetch) {
      fetchNextPage()
    }
  }, [inView, enableNextFetch])

  return (
    <CustomResponsiveDialog
      title={'사진 수정'}
      body={
        <EditableSquareImageList
          oldList={data?.pages?.flatMap((e) => e).filter((e) => !!e) || []}
          ref={ref}
          fetchEnable={fetchEnable}
          useCheckbox
          checkedIdList={watch('removePhotoIds')}
          setCheckedIdList={(checked, id) => {
            const ids = watch('removePhotoIds')
            if (checked) {
              setValue('removePhotoIds', [...ids, id])
            } else {
              const removeIndex = ids.indexOf(id)
              setValue('removePhotoIds', [
                ...ids.slice(0, removeIndex),
                ...ids.slice(removeIndex + 1),
              ])
            }
          }}
        />
      }
      footer={
        <Button
          onClick={handleSubmit(submit)}
          disabled={!watch('removePhotoIds').length}
        >
          삭제하기
        </Button>
      }
      isOpen={isOpen}
      close={close}
    />
  )
}
