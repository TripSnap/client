import 'server-only'
import { fetchData } from '@/utils/fetch'

export const serverFetchData = async (url, option = {}) => {
  return fetchData(url, option)
}
