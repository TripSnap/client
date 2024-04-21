'use client'
import PaperInput from '@/components/input/PaperInput'
import { Box, Button, Divider, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useValidationResolver } from '@/api/scheme/useValidationResolver'
import { joinSchema } from '@/api/scheme/UserSchema'
import { useForm } from 'react-hook-form'
import InputLabel from '@/components/input/InputLabel'
import { useThrottle } from '@/hooks/useThrottle'
import { fetchData } from '@/utils/fetch'
import { useRouter } from 'next/navigation'
import { errorAlert, successAlert } from '@/utils/alertUtil'
import { useEffect } from 'react'

export default function Page() {
  const router = useRouter()
  const resolver = useValidationResolver(joinSchema)
  const { handleSubmit, control, setValue, watch } = useForm({
    resolver,
    mode: 'onChange',
  })

  const { callback: submit } = useThrottle(2000, async (value) => {
    const response = await fetchData('/join', router, {
      method: 'POST',
      body: value,
    })
    const result = await response.json()
    if (result.success) {
      await successAlert({
        message:
          '회원가입을 성공했습니다. 발송된 메일을 통해 인증을 완료해 주세요.',
        button: true,
        callback: () => {
          router.replace('/login')
        },
      })
    } else {
      await errorAlert({
        message: result.message || '회원가입을 실패했습니다.',
      })
    }
  })

  useEffect(() => {
    setValue('checkEmail', false)
  }, [watch('email')])

  return (
    <>
      <Grid container justifyContent={'center'}>
        <Grid xs={12} sm={8} md={6}>
          <Paper>
            <Box sx={{ p: 2 }}>
              <h2 style={{ fontWeight: 500, margin: 0 }}>회원가입</h2>
            </Box>
            <Divider />
            <form>
              <Grid container sx={{ p: 3 }} gap={2} justifyContent={'center'}>
                <Grid xs={12}>
                  <InputLabel name={'이메일'} required level={4} />
                  <PaperInput control={control} name={'email'} />
                </Grid>
                <Grid xs={12}>
                  <InputLabel name={'닉네임'} required level={4} />
                  <PaperInput control={control} name={'nickname'} />
                </Grid>
                <Grid xs={12}>
                  <InputLabel name={'비밀번호'} required level={4} />
                  <PaperInput
                    control={control}
                    name={'password'}
                    type={'password'}
                  />
                </Grid>
                <Grid xs={12}>
                  <InputLabel name={'비밀번호 확인'} required level={4} />
                  <PaperInput
                    control={control}
                    name={'confirmPassword'}
                    type={'password'}
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
                    가입하기
                  </Button>
                </Grid>
                <Grid
                  xs={12}
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Button onClick={() => router.replace('/login')}>
                    로그인
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
