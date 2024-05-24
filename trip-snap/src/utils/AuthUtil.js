'use client'

const REFRESH_TOKEN_KEY = 'refreshToken'

export const setRefreshToken = (token) =>
  localStorage.setItem(REFRESH_TOKEN_KEY, token)

export const removeToken = () => {
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY)

export const fetchRefreshToken = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/refresh', {
    method: 'POST',
    body: JSON.stringify({
      grant_type: 'refresh_token',
      token: getRefreshToken(),
    }),
    credentials: 'include',
  })
  return response.ok
}
