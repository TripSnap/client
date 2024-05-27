import { Box, Typography } from '@mui/material'
import React from 'react'

export default function EmptyContent({ message, minHeight }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        ...(minHeight ? { minHeight } : {}),
      }}
    >
      <Typography variant={'h5'} sx={{ color: 'gray' }}>
        {message}
      </Typography>
    </Box>
  )
}
