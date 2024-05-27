import CustomDialog from '@/components/dialog/CustomDialog'
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Chip,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useValidationResolver } from '@/api/scheme/useValidationResolver'
import { searchFriendSchema } from '@/api/scheme/UserSchema'
import { useForm } from 'react-hook-form'
import PaperInput from '@/components/input/PaperInput'
import { useThrottle } from '@/hooks/useThrottle'
import { errorAlert } from '@/utils/alertUtil'
import { useState } from 'react'
import {
  allowFriendRequest,
  cancelFriendRequest,
  denyFriendRequest,
  sendFriendRequest,
} from '@/app/(main)/group/[group-id]/_api/api'
import useFetch from '@/hooks/useFetch'

export default function AddFriendDialog({ isOpen, close }) {
  const router = useRouter()
  const { fetch } = useFetch(router)
  const resolver = useValidationResolver(searchFriendSchema)
  const { handleSubmit, control, reset } = useForm({
    resolver,
    mode: 'all',
  })

  const [searchUser, setSearchUser] = useState(null)

  const { callback: search } = useThrottle(2000, async (value) => {
    const response = await fetch('/friend/search', {
      method: 'POST',
      data: value,
    })
    if (response.ok) {
      const { data } = await response.json()
      if (data) {
        setSearchUser(data)
      } else {
        setSearchUser(null)
        errorAlert({ message: '유저가 없습니다.' })
      }
    } else {
      setSearchUser(null)
      errorAlert({ message: '검색을 실패했습니다.' })
    }
  })

  const ActionButton = () => {
    if (searchUser.isFriend) return null
    if (searchUser.isReceiveRequest)
      return (
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button
            onClick={async () => {
              await allowFriendRequest(fetch, searchUser.email)
            }}
          >
            수락
          </Button>
          <Button
            onClick={async () => {
              await denyFriendRequest(fetch, searchUser.email)
            }}
          >
            거절
          </Button>
        </ButtonGroup>
      )
    if (searchUser.isSendRequest)
      return (
        <Button
          variant="text"
          onClick={async () => {
            await cancelFriendRequest(fetch, searchUser.email)
          }}
        >
          취소
        </Button>
      )

    return (
      <Button
        variant="text"
        onClick={async () => {
          if (await sendFriendRequest(fetch, searchUser.email)) {
            setSearchUser({ ...searchUser, isSendRequest: true })
          }
        }}
      >
        친구 신청
      </Button>
    )
  }

  const StateBadge = () => {
    if (searchUser.isFriend)
      return (
        <>
          &nbsp;
          <Chip color="primary" label="친구" />
        </>
      )
    if (searchUser.isReceiveRequest)
      return (
        <>
          &nbsp;
          <Chip color="primary" label="친구 신청" />
        </>
      )
    if (searchUser.isSendRequest)
      return (
        <>
          &nbsp;
          <Chip label="수락 대기중" />
        </>
      )
  }

  const AddForm = () => {
    return (
      <>
        <PaperInput
          control={control}
          name={'email'}
          placeholder={'회원 이메일'}
          appendComponent={
            <IconButton
              type="button"
              sx={{ p: '10px' }}
              aria-label="search"
              onClick={handleSubmit(search)}
            >
              <Icon>search</Icon>
            </IconButton>
          }
        />
        <Box sx={{ maxHeight: 500, overflowY: 'auto' }}>
          <List>
            {searchUser && (
              <ListItem divider={true} secondaryAction={<ActionButton />}>
                <ListItemAvatar>
                  <Avatar>A</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      {searchUser.nickname}
                      <StateBadge />
                    </>
                  }
                  secondary={searchUser.email}
                />
              </ListItem>
            )}
          </List>
        </Box>
      </>
    )
  }
  return (
    <CustomDialog
      title={'친구 추가'}
      body={<AddForm />}
      isOpen={isOpen}
      close={() => {
        setSearchUser(null)
        reset()
        close()
      }}
    />
  )
}
