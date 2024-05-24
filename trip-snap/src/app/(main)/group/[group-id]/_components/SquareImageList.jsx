import {
  ImageList,
  ImageListItem,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'

const SquareImageList = React.forwardRef(
  ({ list, fetchEnable = false }, ref) => {
    const theme = useTheme()
    const isSmallerThanSm = useMediaQuery(theme.breakpoints.down('sm'))
    return (
      <ImageList
        cols={isSmallerThanSm ? 3 : 4}
        sx={{
          m: 0,
          position: 'relative',
        }}
      >
        {list.map(({ id, photo }) => (
          <ImageListItem
            key={id}
            sx={{
              aspectRatio: 1,
              position: 'relative',
            }}
          >
            <img src={photo} />
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

export default SquareImageList
