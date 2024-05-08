import { confirmAlert, errorAlert, successAlert } from '@/utils/alertUtil'

export const allowFriendRequest = async (fetch, email) => {
  const response = await fetch('/friend/allow-request', {
    method: 'POST',
    data: { email },
  })
  if (response.ok) {
    const data = await response.json()
    if (data.success) {
      successAlert({ message: data.message || '친구 요청을 수락했습니다.' })
    } else {
      errorAlert({ message: data.message || '친구 요청 수락을 실패했습니다.' })
    }
  }
}

export const denyFriendRequest = async (fetch, email) => {
  const response = await fetch('/friend/deny-request', {
    method: 'POST',
    data: { email },
  })
  if (response.ok) {
    const data = await response.json()
    if (data.success) {
      successAlert({ message: data.message || '친구 요청을 거절했습니다.' })
    } else {
      errorAlert({ message: data.message || '친구 요청 거절을 실패했습니다.' })
    }
  }
}

export const cancelFriendRequest = async (fetch, email) => {
  const response = await fetch('/friend/send-request/remove', router, {
    method: 'POST',
    data: { email },
  })

  if (response.ok) {
    const data = await response.json()
    if (data.success) {
      successAlert({ message: data.message || '친구 요청을 취소했습니다.' })
    } else {
      errorAlert({ message: data.message || '친구 요청 취소를 실패했습니다.' })
    }
  }
}

export const removeFriend = async (fetch, email) => {
  await confirmAlert({
    message: '정말로 삭제하시겠습니까?',
    confirmCallback: async () => {
      const response = await fetch('/friend/remove', router, {
        method: 'POST',
        data: { email },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          successAlert({ message: data.message || '삭제가 완료되었습니다.' })
        } else {
          errorAlert({ message: data.message || '삭제를 실패했습니다.' })
        }
      }
    },
  })
}

export const sendFriendRequest = async (fetch, email) => {
  const response = await fetch('/friend/send-request', router, {
    method: 'POST',
    data: { email },
  })

  if (response.ok) {
    const data = await response.json()
    if (data.success) {
      successAlert({ message: data.message || '친구 요청을 성공했습니다.' })
    } else {
      errorAlert({ message: data.message || '친구 요청을 실패했습니다.' })
    }
  }
}

export const allowGroupInvite = async (fetch, groupId) => {
  const response = await fetch(`/group/allow-invite/${groupId}`, router)

  if (response.ok) {
    const data = await response.json()
    if (data.success) {
      successAlert({ message: data.message || '초대를 수락했습니다.' })
    } else {
      errorAlert({ message: data.message || '실패했습니다.' })
    }
  }
}

export const denyGroupInvite = async (fetch, groupId) => {
  const response = await fetch(`/group/deny-invite/${groupId}`, router)

  if (response.ok) {
    const data = await response.json()
    if (data.success) {
      successAlert({ message: data.message || '초대를 거절했습니다.' })
    } else {
      errorAlert({ message: data.message || '실패했습니다.' })
    }
  }
}
