'use client'
import { useRouter } from 'next/navigation'
import useFetch from '@/hooks/useFetch'
import { useValidationResolver } from '@/api/scheme/useValidationResolver'
import {
  updateMemberDataSchema,
  updatePasswordSchema,
} from '@/api/scheme/UserSchema'
import { useForm, useFormState } from 'react-hook-form'
import { errorAlert, successAlert } from '@/utils/alertUtil'
import { useThrottle } from '@/hooks/useThrottle'
import Grid from '@mui/material/Unstable_Grid2'
import { Box, Button, Divider, Paper } from '@mui/material'
import InputLabel from '@/components/input/InputLabel'
import PaperInput from '@/components/input/PaperInput'
import { useState } from 'react'
import EditPhotoForm from '@/app/(main)/user/EditPhotoForm'
import { loadingPopup } from '@/utils/loadingUtil'

export default function UserPageComponent({ user }) {
  const router = useRouter()
  const { fetch: apiFetch } = useFetch(router)
  const [imageBinaryData, setImageBinaryData] = useState(null)

  const userDataResolver = useValidationResolver(
    updateMemberDataSchema.noUnknown()
  )
  const {
    handleSubmit: handleUserData,
    control: userDataControl,
    setValue: setUserData,
    getValues: getUserData,
    reset: resetUserData,
  } = useForm({
    resolver: userDataResolver,
    mode: 'all',
    defaultValues: async () => ({
      email: user.email,
      nickname: user.nickname,
      photo: user.photo,
    }),
  })
  const { defaultValues: defaultUserData, isLoading } = useFormState({
    control: userDataControl,
  })
  const userPasswordResolver = useValidationResolver(updatePasswordSchema)
  const {
    handleSubmit: handleUserPassword,
    control: userPasswordControl,
    reset: resetUserPassword,
  } = useForm({
    resolver: userPasswordResolver,
    mode: 'onChange',
  })

  const { callback: userDataSubmit } = useThrottle(
    2000,
    async () => {
      try {
        if (imageBinaryData) {
          await loadingPopup(uploadImage, '사진을 업로드중입니다..')
        }
        const data = getUserData()
        const body = {}
        for (const key of Object.keys(data)) {
          if (data[key] !== defaultUserData[key]) {
            body[key] = data[key]
          }
        }
        if (Object.keys(body).length > 0) {
          const response = await apiFetch('/account/user', {
            method: 'PATCH',
            data: body,
          })
          if (response.ok) {
            const data = await response.json()
            if (data.success) {
              successAlert({
                message: '변경이 완료되었습니다.',
                callback: () => {
                  setImageBinaryData(null)
                  resetUserData({ ...getUserData(), ...body })
                },
              })
            } else {
              errorAlert({ message: data.message || '변경을 실패했습니다.' })
            }
          } else {
            errorAlert({ message: '변경을 실패했습니다.' })
          }
        } else {
          errorAlert({ message: '변경된 데이터가 없습니다.' })
        }
      } catch (e) {
        errorAlert({ message: e.message })
      }
    },
    [defaultUserData, imageBinaryData]
  )
  const { callback: userPasswordSubmit } = useThrottle(2000, async (data) => {
    const { password, newPassword } = data
    const response = await apiFetch('/account/user/password', {
      method: 'PATCH',
      data: { password, newPassword },
    })
    if (response.ok) {
      const data = await response.json()
      if (data.success) {
        successAlert({
          message: '변경이 완료되었습니다.',
          callback: () => resetUserPassword({}),
        })
      } else {
        errorAlert({ message: data.message || '변경을 실패했습니다.' })
      }
    } else {
      errorAlert({ message: '변경을 실패했습니다.' })
    }
  })

  const uploadImage = async () => {
    try {
      let response = await apiFetch(`/account/user/photo/upload-authority`, {
        method: 'POST',
        data: { type: imageBinaryData.type },
      })
      if (response.ok) {
        const data = await response.json()
        response = await fetch(data.uploadUrl, {
          method: 'PUT',
          body: imageBinaryData.data,
          headers: {
            'Content-Type': data.type,
          },
        })
        if (response.ok) {
          setUserData('photo', data.filename)
        } else {
          throw new Error()
        }
      }
    } catch (e) {
      throw new Error('사진 업로드를 실패했습니다.')
    }
  }

  return (
    <Grid container justifyContent={'center'} rowSpacing={2}>
      <Grid xs={12} md={8}>
        <Paper>
          <Box sx={{ p: 2 }}>
            <InputLabel name={'회원정보 수정'} level={2} />
          </Box>
          <Divider />

          <Grid container sx={{ p: 3 }} gap={2} justifyContent={'center'}>
            <Grid xs={12} sx={{ display: 'flex' }} container gap={1}>
              <EditPhotoForm
                setImageBinaryData={setImageBinaryData}
                user={user}
                removeUserPhoto={() => setUserData('photo', '')}
              />
            </Grid>
            <Grid xs={12}>
              <InputLabel name={'닉네임'} level={4} />
              <PaperInput control={userDataControl} name={'nickname'} />
            </Grid>
            <Grid xs={12}>
              <InputLabel name={'이메일'} level={4} />
              <PaperInput readOnly control={userDataControl} name={'email'} />
            </Grid>
            <Grid
              xs={12}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Button
                variant="contained"
                disabled={isLoading}
                onClick={handleUserData(userDataSubmit)}
              >
                수정하기
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid xs={12} md={8}>
        <Paper>
          <Box sx={{ p: 2 }}>
            <InputLabel name={'비밀번호 수정'} level={2} />
          </Box>
          <Divider />

          <Grid container sx={{ p: 3 }} gap={2} justifyContent={'center'}>
            <Grid xs={12}>
              <InputLabel name={'비밀번호'} level={4} required />
              <PaperInput
                type="password"
                control={userPasswordControl}
                name={'password'}
              />
            </Grid>
            <Grid xs={12}>
              <InputLabel name={'새로운 비밀번호'} level={4} required />
              <PaperInput
                type="password"
                control={userPasswordControl}
                name={'newPassword'}
              />
            </Grid>
            <Grid xs={12}>
              <InputLabel name={'새로운 비밀번호 확인'} level={4} required />
              <PaperInput
                type="password"
                control={userPasswordControl}
                name={'confirmNewPassword'}
              />
            </Grid>
            <Grid
              xs={12}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Button
                variant="contained"
                onClick={handleUserPassword(userPasswordSubmit)}
              >
                수정하기
              </Button>
              <Button color="error" variant="contained">
                회원 탈퇴
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}
