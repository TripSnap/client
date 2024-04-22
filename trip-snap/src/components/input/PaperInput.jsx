import { Box, FormHelperText, InputBase, Paper } from '@mui/material'
import { Controller } from 'react-hook-form'

export default function PaperInput({
  placeholder = null,
  control,
  name,
  ...props
}) {
  return (
    <Box
      sx={{
        mt: 0.8,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {control && (
        <Controller
          control={control}
          render={({ field, fieldState }) => (
            <>
              <Paper
                sx={{
                  p: '2px 4px 2px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  flexGrow: 1,
                  ...(fieldState.error ? { border: 'solid red 1.5px' } : {}),
                }}
              >
                <InputBase
                  sx={{ flex: 1 }}
                  placeholder={placeholder}
                  inputProps={props}
                  {...field}
                  value={field.value || ''}
                ></InputBase>
              </Paper>
              {fieldState.error?.message && (
                <FormHelperText
                  sx={{
                    mx: 0.3,
                    ...(fieldState.error ? { color: 'red' } : {}),
                  }}
                >
                  {fieldState.error.message}
                </FormHelperText>
              )}
            </>
          )}
          name={name}
        ></Controller>
      )}
    </Box>
  )
}
