export const throwAuthenticationError = (pathname) => {
  const error = new Error(
    JSON.stringify({ pathname, type: 'AuthenticationError' })
  )
  error.name = 'AuthenticationError'
  throw error
}
