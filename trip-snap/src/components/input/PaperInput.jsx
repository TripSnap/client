import { InputBase, Paper } from '@mui/material'

export default function PaperInput({ placeholder = null, ...props }) {
  return (
    <Paper
      sx={{
        p: '2px 4px 2px 10px',
        mt: 0.8,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <InputBase
        sx={{ flex: 1 }}
        placeholder={placeholder}
        inputProps={props}
      ></InputBase>
    </Paper>
  )
}
