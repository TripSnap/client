import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material'
import {
  allowGroupInvite,
  denyGroupInvite,
} from '@/app/(main)/group/[group-id]/_api/api'
import React from 'react'
import useFetch from '@/hooks/useFetch'

export default function GroupItem({ data, router, handleClick, removePage }) {
  const { fetch } = useFetch(router)
  const CardArea = ({ children }) => {
    return handleClick ? (
      <CardActionArea onClick={handleClick}>{children}</CardActionArea>
    ) : (
      <>{children}</>
    )
  }
  return (
    <>
      <Card>
        <CardArea onClick={handleClick}>
          {/*<CardMedia*/}
          {/*  component="img"*/}
          {/*  height="140"*/}
          {/*  image="https://media.istockphoto.com/id/97875216/photo/samoyed-puppy-running-in-the-snow.jpg?s=612x612&w=0&k=20&c=6OzpAULdvcJMeYdUBUC76gr2k_l1J2_tMnds4DcAwt8="*/}
          {/*  alt="green iguana"*/}
          {/*/>*/}
          <CardContent sx={{ pb: '16px!important' }}>
            <Typography gutterBottom variant="h5" component="div">
              {data.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.owner.nickname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              생성 날짜: {data.createdAt}
            </Typography>
            {data.expiredAt && (
              <>
                <Typography variant="body2" color="text.secondary">
                  초대 만료 날짜: {data.expiredAt}
                </Typography>
                <Box sx={{ mt: 1, textAlign: 'right' }}>
                  <ButtonGroup
                    variant="outlined"
                    aria-label="Basic button group"
                  >
                    <Button
                      onClick={async () => {
                        if (await allowGroupInvite(fetch, data.id)) {
                          removePage && removePage(data.id)
                        }
                      }}
                    >
                      수락
                    </Button>
                    <Button
                      onClick={async () => {
                        if (await denyGroupInvite(fetch, data.id)) {
                          removePage && removePage(data.id)
                        }
                      }}
                    >
                      거절
                    </Button>
                  </ButtonGroup>
                </Box>
              </>
            )}
          </CardContent>
        </CardArea>
      </Card>
    </>
  )
}
