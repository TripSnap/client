import PaperInput from '@/components/input/PaperInput'
import { Box, Paper, styled, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import Map from './map/Map'
import dayjs from 'dayjs'
import {
  DateTimePicker,
  LocalizationProvider,
  MobileDateTimePicker,
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const MarginBox = styled(Box)(({ theme }) => ({
  marginTop: '0.5rem',
}))

export default function AlbumForm() {
  const [address, setAddress] = useState('')
  const [latLng, setLatLng] = useState([])
  const [date, setDate] = useState(dayjs())

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <MarginBox>
          <h4 style={{ margin: 0 }}>그룹 이름</h4>
          <PaperInput />
        </MarginBox>
        <MarginBox>
          <h4 style={{ margin: 0 }}>날짜</h4>
          <Paper sx={{ display: 'inline-block' }}>
            {fullScreen && (
              <MobileDateTimePicker value={date} onChange={setDate} />
            )}
            {!fullScreen && (
              <DateTimePicker
                value={date}
                onChange={setDate}
                format={'YYYY/MM/DD HH:mm '}
              />
            )}
          </Paper>
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
            <Map useMarker setAddress={setAddress} setLatLng={setLatLng} />
          </Paper>
        </MarginBox>
        <MarginBox>
          <h4 style={{ margin: 0 }}>주소</h4>
          <PaperInput value={address} readOnly></PaperInput>
        </MarginBox>
      </Box>
    </LocalizationProvider>
  )
}
