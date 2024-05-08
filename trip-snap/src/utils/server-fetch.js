import 'server-only'
import { fetchData } from '@/utils/fetch'
import { cookies } from 'next/headers'

export const serverFetchData = async (url, option = {}) => {
  return fetchData(url, { ...option, cookie: cookies()?.toString() || '' })
}
