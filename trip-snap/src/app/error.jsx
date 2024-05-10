'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { errorAlert } from '@/utils/alertUtil'
import { fetchRefreshToken, removeToken } from '@/utils/AuthUtil'
import { fetchData } from '@/utils/fetch'

export default function Error({ error, reset }) {
  const router = useRouter()
  const alert = () => {
    errorAlert({
      message: error,
      button: true,
      callback: () => router.replace('/'),
    })
  }
  useEffect(() => {
    const func = async () => {
      try {
        const { pathname, type } = JSON.parse(error.message)
        if (type === 'AuthenticationError') {
          if (await fetchRefreshToken()) {
            location.reload()
          } else {
            await fetchData('/logout', {
              method: 'GET',
            })
            removeToken()
            router.replace('/login')
          }
        } else {
          alert()
        }
      } catch (e) {
        alert()
      }
    }
    func()
  }, [])
  return <></>
}
