import CustomResponsiveDialog from '@/components/dialog/CustomResponsiveDialog'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import {
  Box,
  Icon,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material'
import SquareImageList from '../SquareImageList'
import { useEffect, useState } from 'react'
import EditAlbumPhotoDialog from './EditAlbumPhotoDialog'
import EditIcon from '@mui/icons-material/Edit'
import AddAlbumPhotoDialog from './AddAlbumPhotoDialog'
import DeleteIcon from '@mui/icons-material/Delete'
import { usePlaceListContext } from '@/app/(main)/group/[group-id]/_components/map/PlaceListProvider'
import { useGroupContext } from '@/app/(main)/group/[group-id]/_context/GroupContext'
import { confirmAlert, errorAlert, successAlert } from '@/utils/alertUtil'
import { useInView } from 'react-intersection-observer'
import useFetch from '@/hooks/useFetch'
import { useRouter } from 'next/navigation'
import { debounce } from '@/utils/utils'
import useListFetch from '@/hooks/useListFetch'

export default function AlbumDetailDialog({ isOpen, close }) {
  const { placeList } = usePlaceListContext()
  const { albumId, setAlbumId, groupId } = useGroupContext()
  const [albumData, setAlbumData] = useState()
  const router = useRouter()
  const { fetch } = useFetch(router)

  const [openEditModal, setOpenEditModal] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [fetchEnable, setFetchEnable] = useState(true)
  const { ref, inView } = useInView()

  useEffect(() => {
    if (albumId && placeList) {
      const [albumData] = placeList.filter(({ id }) => id == albumId)
      setAlbumData(albumData)
    }
  }, [albumId, placeList])

  const { data, enableNextFetch, fetchNextPage, reset, refetchLastPage } =
    useListFetch({
      queryKey: ['/album/photo/list', albumId, 'POST'],
      queryFn: async ({ pageParam }) => {
        try {
          const response = await fetch('/album/photo/list', {
            method: 'POST',
            data: { pagePerCnt: 20, page: pageParam, groupId, albumId },
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
      fetchEnable: fetchEnable && !!albumId,
      pageSize: 20,
      key: 'id',
    })

  useEffect(() => {
    if (inView && enableNextFetch) {
      fetchNextPage()
    }
  }, [inView, enableNextFetch])

  const removeAlbum = debounce(1000, async () => {
    await confirmAlert({
      message: `정말로 삭제하시겠습니까?<br/>앨범 내 모든 사진이 삭제됩니다.`,
      confirmCallback: async () => {
        const response = await fetch('/album/remove', {
          method: 'POST',
          data: { groupId, albumId },
        })
        if (response.ok) {
          const { success } = await response.json()
          if (success) {
            successAlert({ message: '삭제되었습니다.', callback: close })
          }
        }
      },
    })
  })

  return (
    <>
      {albumData && (
        <CustomResponsiveDialog
          isOpen={isOpen}
          close={() => {
            close()
            setAlbumId(null)
          }}
          title={
            <>
              <Box>
                <h3 style={{ display: 'inline', marginRight: 15 }}>
                  {albumData.title}
                </h3>
                <h4
                  style={{ display: 'inline', fontWeight: 400, color: 'gray' }}
                >
                  {albumData.date}
                </h4>
                <h5
                  style={{
                    margin: 0,
                    fontWeight: 400,
                    color: 'gray',
                    display: 'flex',
                  }}
                >
                  <Icon>place</Icon>
                  {albumData.address}
                </h5>
              </Box>
            </>
          }
          body={
            <Box sx={{ minHeight: '400px' }}>
              <SquareImageList
                list={data?.pages?.flatMap((e) => e).filter((e) => !!e) || []}
                ref={ref}
                fetchEnable={enableNextFetch}
              />

              <SpeedDial
                sx={{ position: 'absolute', bottom: 20, right: 20 }}
                icon={<SpeedDialIcon />}
                ariaLabel="Album detail dialog"
              >
                <SpeedDialAction
                  icon={<AddPhotoAlternateIcon />}
                  tooltipTitle={'사진추가'}
                  tooltipOpen
                  onClick={() => setOpenAddModal(true)}
                />
                <SpeedDialAction
                  icon={<EditIcon />}
                  tooltipTitle={'사진수정'}
                  tooltipOpen
                  onClick={() => setOpenEditModal(true)}
                />
                {albumData?.isOwner && (
                  <SpeedDialAction
                    icon={<DeleteIcon color="error" />}
                    tooltipTitle={'기록삭제'}
                    tooltipOpen
                    onClick={removeAlbum}
                  />
                )}
              </SpeedDial>
            </Box>
          }
        />
      )}
      {openAddModal && (
        <AddAlbumPhotoDialog
          isOpen={openAddModal}
          close={() => {
            refetchLastPage()
            setOpenAddModal(false)
          }}
        />
      )}
      {openEditModal && (
        <EditAlbumPhotoDialog
          isOpen={openEditModal}
          close={() => {
            reset()
            setOpenEditModal(false)
          }}
        />
      )}
    </>
  )
}
