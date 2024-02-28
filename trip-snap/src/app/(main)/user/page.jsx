import PaperInput from '@/components/input/PaperInput'
import { Avatar, Box, Button, Divider, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

export default function Page() {
  return (
    <>
      <Grid container justifyContent={'center'}>
        <Grid xs={12} md={8}>
          <Paper>
            <Box sx={{ p: 2 }}>
              <h2 style={{ fontWeight: 500, margin: 0 }}>회원정보 수정</h2>
            </Box>
            <Divider />
            <form>
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
                    <Button sx={{ mt: 'auto' }}>사진 변경</Button>
                  </Grid>
                </Grid>
                <Grid xs={12}>
                  <h4 style={{ margin: 0, fontWeight: 500 }}>닉네임</h4>
                  <PaperInput />
                </Grid>
                <Grid xs={12}>
                  <h4 style={{ margin: 0, fontWeight: 500 }}>이메일</h4>
                  <PaperInput readOnly />
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
                  <Button>수정하기</Button>
                  <Button color="error" variant="contained">
                    회원 탈퇴
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
