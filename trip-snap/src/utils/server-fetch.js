import 'server-only'
import { fetchData } from '@/utils/fetch'
import { cookies, headers } from 'next/headers'
import { throwAuthenticationError, throwBearerError } from '@/errors'

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
      if (requiredAuthenticateHeader === 'Bearer') {
        throwBearerError()
      }
    }
    return response
  } catch (e) {
    if (['AuthenticationError', 'BearerError'].includes(e.name)) throw e
    return Response.error()
  }
}
