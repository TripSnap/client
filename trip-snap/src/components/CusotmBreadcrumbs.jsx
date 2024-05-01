import { Box, Breadcrumbs, Link, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

/**
 *
 * @param {Array({path?: string, name: string})} data
 */

export default function CusotmBreadcrumbs({ data }) {
  const router = useRouter()
  return (
    <Box sx={{ m: 1, display: 'inline-block' }}>
      <Breadcrumbs aria-label="breadcrumb">
        {data.length > 1 &&
          data.slice(0, -1).map(({ path, name }, i) => (
            <Link
              key={i}
              underline="hover"
              color="inherit"
              onClick={() => router.replace(path)}
            >
              {name}
            </Link>
          ))}
        {data.slice(-1).map(({ name }, i) => (
          <Typography key={i} color="text.primary">
            {name}
          </Typography>
        ))}
      </Breadcrumbs>
    </Box>
  )
}
