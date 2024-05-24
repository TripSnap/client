'use client'
import PaperInput from '@/components/input/PaperInput'
import { Box, Button, Divider, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import InputLabel from '@/components/input/InputLabel'
import { useRouter } from 'next/navigation'
import { useValidationResolver } from '@/api/scheme/useValidationResolver'
import { loginSchema } from '@/api/scheme/UserSchema'
import { useForm } from 'react-hook-form'
import { useThrottle } from '@/hooks/useThrottle'
import { errorAlert } from '@/utils/alertUtil'
import { setRefreshToken } from '@/utils/AuthUtil'
import useFetch from '@/hooks/useFetch'

export default function Page() {
  const router = useRouter()
  const { fetch } = useFetch(router)
  const resolver = useValidationResolver(loginSchema)
  const { handleSubmit, control, setValue, watch } = useForm({
    resolver,
    mode: 'onChange',
  })
  const { callback: submit } = useThrottle(2000, async (value) => {
    const response = await fetch('/login', {
      method: 'POST',
      data: value,
    })
    if (response.ok) {
      const refreshToken = response.headers.get('Refresh-Token')
      if (!!refreshToken) {
        setRefreshToken(refreshToken)
      }
      router.replace('/home')
      return
    }
    await errorAlert({ message: '로그인을 실패했습니다.' })
  })

  return (
    <>
      <Grid container justifyContent={'center'}>
        <Grid xs={12} sm={8} md={6}>
          <Paper>
            <Box sx={{ p: 2 }}>
              <h2 style={{ fontWeight: 500, margin: 0 }}>로그인</h2>
            </Box>
            <Divider />
            <form>
              <Grid container sx={{ p: 3 }} gap={2} justifyContent={'center'}>
                <Grid xs={12}>
                  <InputLabel name={'이메일'} level={4} />
                  <PaperInput name={'email'} control={control} />
                </Grid>
                <Grid xs={12}>
                  <InputLabel name={'비밀번호'} level={4} />
                  <PaperInput
                    name={'password'}
                    control={control}
                    type="password"
                  />
                </Grid>
                <Grid
                  xs={12}
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Button
                    sx={{ width: '100%' }}
                    variant="contained"
                    onClick={handleSubmit(submit)}
                  >
                    로그인
                  </Button>
                </Grid>
                <Grid
                  xs={12}
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Button
                    sx={{ width: '100%' }}
                    variant="contained"
                    onClick={() => router.replace('/join')}
                  >
                    회원가입
                  </Button>
                </Grid>
                <Grid
                  xs={12}
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Button>계정 찾기</Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
