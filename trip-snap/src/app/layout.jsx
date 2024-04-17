import style from '@/root.module.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './root.css'

export const metadata = {
  title: 'TripSnap',
  description: 'Record your travels',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={[style.bg]} style={{ overflowX: 'hidden' }}>
      <head>
        <meta name="referrer" content="origin-when-cross-origin" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
