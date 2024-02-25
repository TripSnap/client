import CustomDialog from '@/components/dialog/CustomDialog'
import {
  Avatar,
  Box,
  Button,
  Icon,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from '@mui/material'

export default function AddFriendDialog({ isOpen, close }) {
  const AddForm = () => {
    return (
      <>
        <Paper
          component="form"
          sx={{
            p: '2px 4px 2px 10px',
            mb: 0.5,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <InputBase
            sx={{ flex: 1 }}
            placeholder="이메일 / 회원번호"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <Icon>search</Icon>
          </IconButton>
        </Paper>
        <Box sx={{ maxHeight: 500, overflowY: 'auto' }}>
          <List>
            {Array.from(Array(13)).map((e, i) => (
              <ListItem
                divider={true}
                key={i}
                secondaryAction={<Button variant="text">Text</Button>}
              >
                <ListItemAvatar>
                  <Avatar>A</Avatar>
                </ListItemAvatar>
                <ListItemText primary="Single-line item" secondary={'s'} />
              </ListItem>
            ))}
          </List>
        </Box>
      </>
    )
  }
  return (
    <CustomDialog
      title={'친구 추가'}
      body={<AddForm />}
      isOpen={isOpen}
      close={close}
    />
  )
}
