/**
 * @params
 * title string
 * body component
 * footer component
 * isOpen
 * close
 * @returns
 *
 */

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  styled,
} from '@mui/material'

const Dialog2 = styled(Dialog)(({ theme }) => ({
  '.MuiDialog-paper': {
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginRight: 0,
      width: 'calc(100% - 10px)',
    },
  },
}))

export default function CustomDialog({ title, body, footer, isOpen, close }) {
  return (
    <Dialog2 open={isOpen} onClose={close} fullWidth maxWidth={'sm'}>
      <DialogTitle>{title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={close}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Icon>close</Icon>
      </IconButton>
      <DialogContent dividers>{body}</DialogContent>
      {footer && <DialogActions>{footer}</DialogActions>}
    </Dialog2>
  )
}
