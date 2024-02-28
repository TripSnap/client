import PaperInput from '@/components/input/PaperInput'
import { Box, Paper, styled } from '@mui/material'

const MarginBox = styled(Box)(({ theme }) => ({
  marginTop: '0.5rem',
}))

export default function AlbumForm() {
  return (
    <Box>
      <MarginBox>
        <h4 style={{ margin: 0 }}>그룹 이름</h4>
        <PaperInput />
      </MarginBox>
      <MarginBox>
        <h4 style={{ margin: 0 }}>날짜</h4>
        <PaperInput />
      </MarginBox>
      <MarginBox>
        <h4 style={{ margin: 0 }}>위치</h4>
        <Paper
          sx={{
            p: '2px 4px 2px 10px',
            mt: 0.8,
            display: 'flex',
            alignItems: 'center',
            height: '300px',
          }}
        >
          지도
        </Paper>
      </MarginBox>
    </Box>
  )
}
