import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material'

/**
 * @param {string|JSX.Element} title
 * @param {JSX.Element} body
 * @param {JSX.Element} footer
 * @param {boolean} isOpen
 * @param {Function} close
 */
export default function CustomResponsiveDialog({
  title,
  body,
  footer,
  isOpen,
  close,
  breakpoint = 'md',
}) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down(breakpoint))

  return (
    <Dialog
      open={true}
      onClose={close}
      fullWidth
      maxWidth={'sm'}
      fullScreen={fullScreen}
    >
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
    </Dialog>
  )
}
