import { Box, InputBase, Paper, Switch } from '@mui/material'

export default function PaperInput({ children, placeholder = null, ...props }) {
  return (
    <Box
      sx={{
        mt: 0.8,
        display: 'flex',
      }}
    >
      <Paper
        sx={{
          p: '2px 4px 2px 10px',
          display: 'flex',
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        <InputBase
          sx={{ flex: 1 }}
          placeholder={placeholder}
          inputProps={props}
        ></InputBase>
      </Paper>
      {children}
    </Box>
  )
}
