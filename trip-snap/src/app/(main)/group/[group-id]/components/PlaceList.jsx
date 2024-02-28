import LocationSearchingIcon from '@mui/icons-material/LocationSearching'
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'

export default function PlaceList() {
  return (
    <List>
      {Array.from(Array(13)).map((e, i) => (
        <ListItem
          divider={true}
          key={i}
          secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <LocationSearchingIcon />
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
