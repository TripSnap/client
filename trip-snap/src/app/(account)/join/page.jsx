import PaperInput from '@/components/input/PaperInput'
import { Box, Button, Divider, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

export default function Page() {
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
                  <h4 style={{ margin: 0, fontWeight: 500 }}>이메일</h4>
                  <PaperInput />
                </Grid>
                <Grid xs={12}>
                  <h4 style={{ margin: 0, fontWeight: 500 }}>비밀번호</h4>
                  <PaperInput type="password" />
                </Grid>
                <Grid xs={12}>
                  <h4 style={{ margin: 0, fontWeight: 500 }}>비밀번호 확인</h4>
                  <PaperInput type="password" />
                </Grid>
                <Grid
                  xs={12}
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Button sx={{ width: '100%' }} variant="contained">
                    가입하기
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
