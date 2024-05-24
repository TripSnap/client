export const throwAuthenticationError = (pathname) => {
  const error = new Error(
    JSON.stringify({ pathname, type: 'AuthenticationError' })
  )
  error.name = 'AuthenticationError'
  throw error
}

export const throwBearerError = () => {
  const error = new Error(JSON.stringify({ type: 'BearerError' }))
  error.name = 'BearerError'
  throw error
}
