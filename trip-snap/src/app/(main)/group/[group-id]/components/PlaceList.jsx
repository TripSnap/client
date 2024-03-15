import LocationSearchingIcon from '@mui/icons-material/LocationSearching'
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'

export default function PlaceList({ handleClick }) {
  return (
    <List>
      {Array.from(Array(13)).map((e, i) => (
        <ListItem
          divider={true}
          key={i}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={(e) => {
                e.stopPropagation()
                console.log('click')
              }}
            >
              <LocationSearchingIcon />
            </IconButton>
          }
          onClick={handleClick}
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
