import {
  Checkbox,
  Icon,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'

const EditableSquareImageList = React.forwardRef(
  (
    {
      oldList, // 기존 사진 리스트
      newList, // 추가 할 사진 리스트
      checkedIdList, // 체크박스 리스트
      setCheckedIdList, // 체크박스 리스트 처리 함수
      removeNewListItem, // x버튼 눌렀을 때 처리
      fetchEnable = false,
      useCheckbox = false,
    },
    ref
  ) => {
    const theme = useTheme()
    const isSmallerThanSm = useMediaQuery(theme.breakpoints.down('sm'))
    return (
      <ImageList
        cols={isSmallerThanSm ? 3 : 4}
        sx={{
          m: 0,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {newList?.map(({ id, photo }) => (
          <ImageListItem
            key={id}
            sx={{
              aspectRatio: 1,
              position: 'relative',
            }}
          >
            <img src={photo} />
            <ImageListItemBar
              actionIcon={
                <IconButton
                  sx={{ p: 0, color: 'white' }}
                  onClick={() => removeNewListItem(id)}
                >
                  <Icon>close</Icon>
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
        {oldList?.map(({ id, photo }) => (
          <ImageListItem
            key={id}
            sx={{
              aspectRatio: 1,
              position: 'relative',
            }}
          >
            <img src={photo} />

            {useCheckbox && (
              <ImageListItemBar
                actionIcon={
                  <Checkbox
                    onChange={({ target }) => {
                      setCheckedIdList(target.checked, id)
                    }}
                    size="small"
                    sx={{ p: '5px', color: 'white' }}
                  />
                }
              />
            )}
          </ImageListItem>
        ))}
        {fetchEnable && (
          <Grid
            sx={{
              position: 'absolute',
              bottom: 10,
            }}
            ref={ref}
          ></Grid>
        )}
      </ImageList>
    )
  }
)

export default EditableSquareImageList
