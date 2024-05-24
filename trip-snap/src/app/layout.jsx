import style from '@/root.module.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './root.css'
import ReactQueryProviders from '@/context/ReactQueryProvider'
import { GroupContext } from '@/app/(main)/group/[group-id]/_context/GroupContext'
import React from 'react'

export const metadata = {
  title: 'TripSnap',
  description: 'Record your travels',
  referrer: 'origin-when-cross-origin',
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
        <ReactQueryProviders>
          <GroupContext>{children}</GroupContext>
        </ReactQueryProviders>

        <script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_KEY}&libraries=services,drawing`}
        ></script>
      </body>
    </html>
  )
}
