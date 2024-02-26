import {
  Avatar,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'

export default function FriendList() {
  return (
    <List disablePadding={true}>
      {Array.from(Array(13)).map((e, i) => (
        <ListItem
          divider={true}
          key={i}
          secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <Icon>delete</Icon>
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Avatar>A</Avatar>
          </ListItemAvatar>
          <ListItemText primary="Single-line item" secondary={'s'} />
        </ListItem>
      ))}
    </List>
  )
}
