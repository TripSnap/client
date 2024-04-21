import {
  fetchRefreshToken,
  getAccessToken,
  removeToken,
} from '@/utils/AuthUtil'
import { errorAlert } from '@/utils/alertUtil'

export const fetchData = async (url, router, option = {}) => {
  const { method, contentType, body, retry } = option
  const fetchOption = {
    method,
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
  if (!!body) {
    if (method.toLocaleLowerCase() === 'get') {
      const _url = new URL(fetchUrl)
      for (const k in body) {
        _url.searchParams.set(k, body[k])
        fetchUrl = _url.href
      }
    } else {
      fetchOption.body = JSON.stringify(body)
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
  }
}

export const pureFetchData = async (url, option) => {
  const { method, contentType, body } = option

  let fetchUrl = process.env.NEXT_PUBLIC_API_URL + url
  const fetchOption = {
    method,
    headers: { 'Content-Type': 'application/json' },
  }

  if (!!body) {
    if (method.toLocaleLowerCase() === 'get') {
      const _url = new URL(fetchUrl)
      for (const k in body) {
        _url.searchParams.set(k, body[k])
        fetchUrl = _url.href
      }
    } else {
      fetchOption.body = JSON.stringify(body)
    }
  }

  const response = await fetch(fetchUrl, fetchOption)

  return response
}
