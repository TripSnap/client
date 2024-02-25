import { Container } from '@mui/material'

export default function Layout({ children }) {
  return (
    <Container
      maxWidth="lg"
      sx={{ paddingTop: 'calc(1.5rem + 52px)', overflowY: 'auto' }}
    >
      {children}
    </Container>
  )
}
