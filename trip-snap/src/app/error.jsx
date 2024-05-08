'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { errorAlert } from '@/utils/alertUtil'

export default function Error({ error, reset }) {
  const router = useRouter()
  useEffect(() => {
    errorAlert({
      message: error,
      button: true,
      callback: () => router.replace('/'),
    })
  }, [])
  return <></>
}
