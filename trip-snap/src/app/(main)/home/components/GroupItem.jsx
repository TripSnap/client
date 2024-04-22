import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'

export default function GroupItem({ data, router }) {
  return (
    <>
      <Card>
        <CardActionArea onClick={() => router.push(`/group/${data.id}`)}>
          {/*<CardMedia*/}
          {/*  component="img"*/}
          {/*  height="140"*/}
          {/*  image="https://media.istockphoto.com/id/97875216/photo/samoyed-puppy-running-in-the-snow.jpg?s=612x612&w=0&k=20&c=6OzpAULdvcJMeYdUBUC76gr2k_l1J2_tMnds4DcAwt8="*/}
          {/*  alt="green iguana"*/}
          {/*/>*/}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.owner.nickname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              생성 날짜: {data.createdAt}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}
