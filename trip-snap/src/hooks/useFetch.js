import { fetchRefreshToken, removeToken } from '@/utils/AuthUtil'
import { fetchData } from '@/utils/fetch'
import { useEffect } from 'react'

export default function useFetch(router) {
  useEffect(() => {}, [])
  const fetch = async (url, option = {}) => {
    const { retry } = option
    const response = await fetchData(url, option)
    if (response.status === 401) {
      const requiredAuthenticateHeader =
        response.headers.get('WWW-Authenticate')
      if (requiredAuthenticateHeader === 'Refresh-Token') {
        if (!retry) {
          if (await fetchRefreshToken()) {
            return await fetchData(url, { ...option, retry: true })
          }
        }
      }
      await fetchData('/logout', {
        method: 'GET',
      })
      removeToken()
      router.replace('/login')
    }
    return response
  }

  return { fetch }
}
