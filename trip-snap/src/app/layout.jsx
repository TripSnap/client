import { Inter } from 'next/font/google'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Container, Typography } from '@mui/material'
import TopNavigation from '@/components/navication/TopNavication'
import './root.css'
import style from '@/root.module.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TripSnap',
  description: 'Record your travels',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={[style.bg]} style={{ overflowX: 'hidden' }}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body style={{ margin: 0 }}>
        <Typography>
          <TopNavigation />
          <Container
            maxWidth="lg"
            className={inter.className}
            sx={{ paddingTop: 'calc(1.5rem + 52px)', overflowY: 'auto' }}
          >
            {children}
          </Container>
        </Typography>
      </body>
    </html>
  )
}
