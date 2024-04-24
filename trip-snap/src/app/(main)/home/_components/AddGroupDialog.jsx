import CustomDialog from '@/components/dialog/CustomDialog'
import PaperInput from '@/components/input/PaperInput'
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
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
          <PaperInput />
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
