import { Rating, Typography } from '@mui/material'

const Index = () => {
  return (
    <>
      <Typography component="legend">Disabled</Typography>
      <Rating name="disabled" value={4.5} disabled />
    </>
  )
}

export default Index
