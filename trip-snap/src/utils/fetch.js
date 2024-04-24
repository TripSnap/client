import {
  fetchRefreshToken,
  getAccessToken,
  removeToken,
} from '@/utils/AuthUtil'
import { errorAlert } from '@/utils/alertUtil'

export const fetchData = async (url, router, option = {}) => {
  const { method = 'GET', contentType, data, retry } = option
  const fetchOption = {
    method: method.toUpperCase(),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  }

  if (getAccessToken()) {
    fetchOption.headers = {
      ...fetchOption.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    }
  }

  let fetchUrl = process.env.NEXT_PUBLIC_API_URL + url
  if (!!data) {
    if (['GET', 'DELETE'].includes(fetchOption.method.toUpperCase())) {
      const _url = new URL(fetchUrl)
      for (const k in data) {
        _url.searchParams.set(k, data[k])
        fetchUrl = _url.href
      }
    } else {
      fetchOption.body = JSON.stringify(data)
    }
  }

  try {
    const response = await fetch(fetchUrl, fetchOption)
    if (response.status === 401) {
      const requiredAuthenticateHeader =
        response.headers.get('WWW-Authenticate')
      if (requiredAuthenticateHeader === 'Refresh-Token') {
        if (!retry) {
          await fetchRefreshToken()
          return await fetchData(url, router, { ...option, retry: true })
        } else {
          removeToken()
          router.replace('/login')
        }
      }
      if (requiredAuthenticateHeader === 'Bearer') {
        removeToken()
        router.replace('/login')
      }
    }
    return response
  } catch (e) {
    errorAlert({ message: '요청을 실패했습니다.' })
    return Response.error()
  }
}

export const pureFetchData = async (url, option = {}) => {
  const { method = 'GET', contentType, data } = option

  let fetchUrl = process.env.NEXT_PUBLIC_API_URL + url
  const fetchOption = {
    method: method.toUpperCase(),
    headers: { 'Content-Type': 'application/json' },
  }

  if (!!data) {
    if (['GET', 'DELETE'].includes(fetchOption.method.toLocaleLowerCase())) {
      const _url = new URL(fetchUrl)
      for (const k in data) {
        _url.searchParams.set(k, data[k])
        fetchUrl = _url.href
      }
    } else {
      fetchOption.body = JSON.stringify(data)
    }
  }

  const response = await fetch(fetchUrl, fetchOption)

  return response
}
