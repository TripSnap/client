import 'server-only'
import UserPageComponent from '@/app/(main)/user/UserPageComponent'
import { serverFetchData } from '@/utils/server-fetch'

const getUserData = async () => {
  const response = await serverFetchData('/account/user')

  if (response.ok) {
    return await response.json()
  } else {
    throw new Error('유저 데이터를 가져오다가 에러가 발생했어요..')
  }
}

export default async function Page() {
  const data = await getUserData()
  return <UserPageComponent user={data?.data} />
}
