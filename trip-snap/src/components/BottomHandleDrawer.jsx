import { Divider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Typography from '@mui/material/Typography'
import { grey } from '@mui/material/colors'
import { styled } from '@mui/material/styles'
import * as React from 'react'

const drawerBleeding = 56

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: grey[100],
}))

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
}))

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}))

const InvisibleUpSmDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  '.MuiPaper-root': {
    height: `calc(50% - ${drawerBleeding}px)`,
    overflow: 'visible',
  },
}))

export default function BottomHandleDrawer({ title, children }) {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  return (
    <Root>
      <CssBaseline />
      <InvisibleUpSmDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        allowSwipeInChildren
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
          onClick={toggleDrawer(!open)}
        >
          <Puller />
          <Typography sx={{ p: 2, color: 'text.secondary' }}>
            {title}
          </Typography>
        </StyledBox>
        <Divider />
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          {children}
        </StyledBox>
      </InvisibleUpSmDrawer>
    </Root>
  )
}
