import { Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import GroupItem from './GroupItem'

export default function GroupList() {
  return (
    <Box>
      <Grid container spacing={1}>
        {Array.from(Array(7)).map((e, i) => (
          <Grid key={i} xs={12} sm={6} md={4}>
            <GroupItem />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
