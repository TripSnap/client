'use client'

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

export const setAccessToken = (token) =>
  localStorage.setItem(ACCESS_TOKEN_KEY, token)

export const setRefreshToken = (token) =>
  localStorage.setItem(REFRESH_TOKEN_KEY, token)

export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY)
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY)

export const fetchRefreshToken = async () => {
  const response = await fetch(process.env.API_URL + '/refresh', {
    method: 'post',
    body: JSON.stringify({
      grant_type: 'refresh_token',
      token: getRefreshToken(),
    }),
  })
  if (response.ok) {
    const token = response.headers.get('Authorization')
    setAccessToken(token)
  }
}
