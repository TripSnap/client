import CustomDialog from '@/components/dialog/CustomDialog'
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from '@mui/material'

export default function AddGroupDialog({ isOpen, close }) {
  const AddForm = () => {
    return (
      <>
        <Box sx={{ mt: 0.5 }}>
          <h4 style={{ margin: 0 }}>그룹 이름</h4>
          <Paper
            sx={{
              p: '2px 4px 2px 10px',
              mt: 0.8,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <InputBase
              sx={{ flex: 1 }}
              placeholder="이메일 / 회원번호"
              inputProps={{ 'aria-label': 'search google maps' }}
            ></InputBase>
          </Paper>
        </Box>
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            flexFlow: 'column',
          }}
        >
          <h4 style={{ margin: 0 }}>친구 선택</h4>
          <Box
            sx={{
              mt: 0.8,
              overflowX: 'auto',
              display: 'flex',
              flexWrap: 'wrap',
              listStyle: 'none',
              flexFlow: 'row',
            }}
            className="invisible-scrollbar"
          >
            {Array.from(Array(13)).map((e, i) => (
              <Chip
                key={i}
                label="Deletable"
                variant="outlined"
                onDelete={() => {}}
                sx={{ mr: 0.5 }}
              />
            ))}
          </Box>
          <Paper
            sx={{ overflowY: 'auto', mt: 0.8, height: 400, maxHeight: 400 }}
          >
            <List>
              {Array.from(Array(13)).map((e, i) => (
                <ListItem
                  divider={true}
                  key={i}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      // onChange={handleToggle(value)}
                      // checked={checked.indexOf(value) !== -1}
                      // inputProps={{ 'aria-labelledby': labelId }}
                    />
                  }
                >
                  <ListItemAvatar>
                    <Avatar>A</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Single-line item" secondary={'s'} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </>
    )
  }
  return (
    <CustomDialog
      title={'그룹 만들기'}
      body={<AddForm />}
      footer={<Button>만들기</Button>}
      isOpen={isOpen}
      close={close}
    />
  )
}
