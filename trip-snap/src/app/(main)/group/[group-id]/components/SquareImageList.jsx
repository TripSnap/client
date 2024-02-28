import {
  Checkbox,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  useTheme,
} from '@mui/material'

export default function SquareImageList({ useCheckbox = false }) {
  const theme = useTheme()
  const isSmallerThanSm = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <ImageList
      cols={isSmallerThanSm ? 3 : 4}
      sx={{
        m: 0,
      }}
    >
      {Array.from(Array(66)).map((e, i) => (
        <ImageListItem
          key={i}
          sx={{
            aspectRatio: 1,
            position: 'relative',
          }}
        >
          <img
            src={
              'https://media.istockphoto.com/id/97875216/photo/samoyed-puppy-running-in-the-snow.jpg?s=612x612&w=0&k=20&c=6OzpAULdvcJMeYdUBUC76gr2k_l1J2_tMnds4DcAwt8='
            }
          />

          {useCheckbox && (
            <ImageListItemBar
              actionIcon={<Checkbox size="small" sx={{ p: '5px' }} />}
            />
          )}
        </ImageListItem>
      ))}
    </ImageList>
  )
}
