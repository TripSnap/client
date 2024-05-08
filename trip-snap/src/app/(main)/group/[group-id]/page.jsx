import GroupPageComponent from '@/app/(main)/group/[group-id]/GroupPageComponent'
import { serverFetchData } from '@/utils/server-fetch'

const getGroupData = async (groupId) => {
  const response = await serverFetchData(`/group/${groupId}`)

  if (response.ok) {
    return await response.json()
  } else {
    throw new Error('그룹 데이터를 가져오다가 에러가 발생했어요..')
  }
}

export default async function Page({ params }) {
  const data = await getGroupData(params['group-id'])
  return <GroupPageComponent group={data?.data} />
}
