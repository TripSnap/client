import { Container } from '@mui/material'

export default function Layout({ children }) {
  return (
    <Container
      disableGutters
      maxWidth="lg"
      sx={{
        paddingTop: '57px',
        overflowY: 'auto',
        minHeight: 'calc(100vh)',
      }}
    >
      {children}
    </Container>
  )
}
