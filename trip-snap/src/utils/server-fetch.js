import 'server-only'
import { fetchData } from '@/utils/fetch'
import { cookies, headers } from 'next/headers'
import { errorAlert } from '@/utils/alertUtil'
import { throwAuthenticationError } from '@/errors'

export const serverFetchData = async (url, option = {}) => {
  try {
    const response = await fetchData(url, {
      ...option,
      cookie: cookies()?.toString() || '',
    })
    if (response.status === 401) {
      const requiredAuthenticateHeader =
        response.headers.get('WWW-Authenticate')
      if (requiredAuthenticateHeader === 'Refresh-Token') {
        const heads = headers()
        const pathname = heads.get('next-url')
        throwAuthenticationError(pathname)
      }
    }
    return response
  } catch (e) {
    if (e.name === 'AuthenticationError') throw e
    else await errorAlert({ message: '에러가 발생했습니다.' })
    return Response.error()
  }
}
