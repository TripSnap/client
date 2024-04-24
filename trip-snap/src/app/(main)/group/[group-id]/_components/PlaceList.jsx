import LocationSearchingIcon from '@mui/icons-material/LocationSearching'
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'

export default function PlaceList({ openModal, list, focusPlace }) {
  return (
    <List>
      {list &&
        list.map((data, i) => (
          <ListItem
            divider={true}
            key={i}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={(e) => {
                  e.stopPropagation()
                  focusPlace(data.id)
                }}
              >
                <LocationSearchingIcon />
              </IconButton>
            }
            onClick={() => {
              focusPlace(data.id)
              openModal()
            }}
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
