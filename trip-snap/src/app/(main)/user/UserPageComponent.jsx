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
import { Avatar, Box, Button, Divider, Paper } from '@mui/material'
import InputLabel from '@/components/input/InputLabel'
import PaperInput from '@/components/input/PaperInput'

export default function UserPageComponent({ user }) {
  const router = useRouter()
  const { fetch } = useFetch(router)
  const userDataResolver = useValidationResolver(
    updateMemberDataSchema.noUnknown()
  )
  const {
    handleSubmit: handleUserData,
    control: userDataControl,
    trigger,
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
  const { handleSubmit: handleUserPassword, control: userPasswordControl } =
    useForm({
      resolver: userPasswordResolver,
      mode: 'onChange',
    })

  const { callback: userDataSubmit } = useThrottle(
    2000,
    async (data) => {
      const body = {}
      for (const key of Object.keys(data)) {
        if (data[key] !== defaultUserData[key]) {
          body[key] = data[key]
        }
      }
      if (Object.keys(body).length > 0) {
        const response = await fetch('/account/user', {
          method: 'PATCH',
          data: body,
        })
        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            successAlert({ message: '변경이 완료되었습니다.' })
          } else {
            errorAlert({ message: data.message || '변경을 실패했습니다.' })
          }
        } else {
          errorAlert({ message: '변경을 실패했습니다.' })
        }
      } else {
        errorAlert({ message: '변경된 데이터가 없습니다.' })
      }
    },
    [defaultUserData]
  )
  const { callback: userPasswordSubmit } = useThrottle(2000, async (data) => {
    const { password, newPassword } = data
    const response = await fetch('/account/user/password', {
      method: 'PATCH',
      data: { password, newPassword },
    })
    if (response.ok) {
      const data = await response.json()
      if (data.success) {
        successAlert({ message: '변경이 완료되었습니다.' })
      } else {
        errorAlert({ message: data.message || '변경을 실패했습니다.' })
      }
    } else {
      errorAlert({ message: '변경을 실패했습니다.' })
    }
  })

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
              <Grid>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 100, height: 100 }}
                  variant="square"
                />
              </Grid>
              <Grid display={'flex'} sx={{ flexDirection: 'column' }}>
                <Button sx={{ mt: 'auto' }} disabled={isLoading}>
                  사진 변경
                </Button>
              </Grid>
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
