import CustomDialog from '@/components/dialog/CustomDialog'
import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { GroupInsSchema } from '@/api/scheme/GroupSchema'
import { useValidationResolver } from '@/api/scheme/useValidationResolver'
import React from 'react'
import { AddGroupForm } from '@/app/(main)/home/_components/AddGroupForm'
import { useThrottle } from '@/hooks/useThrottle'
import { fetchData } from '@/utils/fetch'
import { useRouter } from 'next/navigation'
import { errorAlert, successAlert } from '@/utils/alertUtil'

export default function AddGroupDialog({ isOpen, close }) {
  const router = useRouter()
  const resolver = useValidationResolver(GroupInsSchema)
  const { handleSubmit, control, setValue, reset } = useForm({
    resolver,
    mode: 'all',
  })

  const { callback: submit } = useThrottle(2000, async (data) => {
    const response = await fetchData('/group', router, { method: 'POST', data })
    if (response.ok) {
      const data = await response.json()
      if (data.success) {
        await successAlert({
          message: '그룹 생성을 성공했습니다.',
          callback: () => {
            reset()
            close()
          },
        })
      } else {
        errorAlert({
          message: '그룹 생성 중 문제가 발생했습니다.',
        })
      }
    }
  })

  return (
    <CustomDialog
      title={'그룹 만들기'}
      body={<AddGroupForm control={control} setValue={setValue} />}
      footer={<Button onClick={handleSubmit(submit)}>만들기</Button>}
      isOpen={isOpen}
      close={() => {
        reset()
        close()
      }}
    />
  )
}
