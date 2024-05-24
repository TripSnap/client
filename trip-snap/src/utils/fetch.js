export const fetchData = async (url, option = {}) => {
  const { method = 'GET', contentType, data, retry, cookie } = option
  const fetchOption = {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
      ...(cookie ? { Cookie: cookie } : {}),
    },
    credentials: 'include',
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

  return await fetch(fetchUrl, fetchOption)
}
