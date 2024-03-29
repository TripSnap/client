import style from '@/root.module.css'
import { Container } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import NavicationMenu from './NavicationMenu'

const TopNavigation = ({ menu = false }) => {
  return (
    <Container
      maxWidth={false}
      fixed={false}
      disableGutters
      sx={{
        '--Grid-borderWidth': '1px',
        borderBottom: 'var(--Grid-borderWidth) solid',
        borderColor: 'divider',
        position: 'fixed',
        zIndex: 999,
      }}
      className={[style.bg]}
    >
      <Grid container columnSpacing={1.2} py={1} px={1.5}>
        <Grid display={'flex'} flexGrow={'row'} alignItems={'center'}>
          <h2 style={{ margin: 0, fontWeight: 100 }}>TripSnap</h2>
        </Grid>
        {menu && <NavicationMenu />}
      </Grid>
    </Container>
  )
}

export default TopNavigation
