import LocationSearchingIcon from '@mui/icons-material/LocationSearching'
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import { useGroupContext } from '@/app/(main)/group/[group-id]/_context/GroupContext'
import { errorAlert } from '@/utils/alertUtil'
import { useInView } from 'react-intersection-observer'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Grid from '@mui/material/Unstable_Grid2'
import { usePlaceListContext } from '@/app/(main)/group/[group-id]/_components/map/PlaceListProvider'
import { usePreviousValue } from '@/hooks/usePreviousValue'
import useFetch from '@/hooks/useFetch'
import useListFetch from '@/hooks/useListFetch'

export default function PlaceList({ openModal, focusPlace, modalIsOpen }) {
  const { setAlbumId, groupId } = useGroupContext()
  const router = useRouter()
  const { fetch } = useFetch(router)
  const { ref, inView } = useInView()
  const [fetchEnable, setFetchEnable] = useState(true)

  const { placeList, setPlaceList, selected, setSelected } =
    usePlaceListContext()
  const prevPlaceList = usePreviousValue(placeList)

  const { data, enableNextFetch, fetchNextPage, refetchLastPage } =
    useListFetch({
      queryKey: ['/album/list', groupId, 'POST'],
      queryFn: async ({ pageParam }) => {
        try {
          const response = await fetch('/album/list', {
            method: 'POST',
            data: { pagePerCnt: 10, page: pageParam, groupId },
          })
          if (response.ok) {
            const { data } = await response.json()
            return data
          } else {
            setFetchEnable(false)
            errorAlert({ message: '데이터를 가져오는 데 실패했습니다.' })
          }
        } catch (e) {
          setFetchEnable(false)
        }
      },
      fetchEnable: fetchEnable && !!groupId,
      pageSize: 10,
      key: 'id',
    })

  useEffect(() => {
    if (inView && enableNextFetch) {
      fetchNextPage()
    }
  }, [inView, enableNextFetch])

  useEffect(() => {
    if (data) {
      const { pages } = data
      setPlaceList(
        pages
          .flatMap((e) => e)
          .filter((e) => !!e)
          .map(
            ({ id, latitude, longitude, title, date, address, isOwner }) => ({
              id,
              isOwner,
              lat: latitude,
              lng: longitude,
              title,
              date,
              address,
            })
          )
      )
    }
  }, [data])

  useEffect(() => {
    if (prevPlaceList && !prevPlaceList.length && !!placeList.length) {
      const [lastPlaceList] = placeList
      setSelected(lastPlaceList.id)
    }
  }, [placeList])

  useEffect(() => {
    if (!modalIsOpen && data) {
      refetchLastPage()
    }
  }, [modalIsOpen])

  return (
    <List>
      {data?.pages.map((dataGroup, i) => (
        <React.Fragment key={i}>
          {dataGroup?.map((album) => (
            <ListItem
              divider={true}
              key={album.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  color={selected === album.id ? 'primary' : ''}
                  onClick={(e) => {
                    e.stopPropagation()
                    focusPlace(album.id)
                    setAlbumId(album.id)
                  }}
                >
                  <LocationSearchingIcon />
                </IconButton>
              }
              onClick={() => {
                focusPlace(album.id)
                setAlbumId(album.id)
                openModal()
              }}
            >
              <ListItemAvatar>
                <Avatar>A</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={album.title}
                secondary={`${album.date} / ${album.address}`}
              />
            </ListItem>
          ))}
        </React.Fragment>
      ))}
      {enableNextFetch && (
        <Grid
          sx={{
            position: 'absolute',
            bottom: 10,
          }}
          ref={ref}
        ></Grid>
      )}
    </List>
  )
}
