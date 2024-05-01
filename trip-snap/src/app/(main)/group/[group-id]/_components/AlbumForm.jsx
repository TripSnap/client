import PaperInput from '@/components/input/PaperInput'
import { Box, Paper, styled, useMediaQuery, useTheme } from '@mui/material'
import Map from './map/Map'
import dayjs from 'dayjs'
import {
  DateTimePicker,
  LocalizationProvider,
  MobileDateTimePicker,
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import InputLabel from '@/components/input/InputLabel'

const MarginBox = styled(Box)(({ theme }) => ({
  marginTop: '0.5rem',
}))

export default function AlbumForm({ control, watch, setValue }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <MarginBox>
          <InputLabel bold name={'기록 이름'} level={4} />
          <PaperInput control={control} name={'title'} />
        </MarginBox>
        <MarginBox>
          <InputLabel bold name={'날짜'} level={4} />
          <Paper sx={{ display: 'inline-block' }}>
            {fullScreen && (
              <MobileDateTimePicker
                value={watch('date')}
                onChange={(value) => {
                  setValue('date', dayjs(value))
                }}
                format={'YYYY/MM/DD HH:mm '}
                disableFuture
              />
            )}
            {!fullScreen && (
              <DateTimePicker
                value={watch('date')}
                onChange={(value) => {
                  setValue('date', dayjs(value))
                }}
                format={'YYYY/MM/DD HH:mm '}
                disableFuture
              />
            )}
          </Paper>
        </MarginBox>
        <MarginBox>
          <InputLabel bold name={'위치'} level={4} />
          <Paper
            sx={{
              p: '2px 4px 2px 10px',
              mt: 0.8,
              display: 'flex',
              alignItems: 'center',
              height: '300px',
            }}
          >
            <Map
              useMarker
              setAddress={(address) => {
                setValue('address', address)
              }}
              setLatLng={({ lat, lng }) => {
                setValue('latitude', lat)
                setValue('longitude', lng)
              }}
            />
          </Paper>
        </MarginBox>
        <MarginBox>
          <InputLabel bold name={'주소'} level={4} />
          <PaperInput control={control} name={'address'} readOnly></PaperInput>
        </MarginBox>
      </Box>
    </LocalizationProvider>
  )
}
