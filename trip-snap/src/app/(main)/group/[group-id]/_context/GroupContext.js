import { createContext, useContext, useState } from 'react'

const Context = createContext(null)

export const GroupContext = ({ children }) => {
  const [groupId, setGroupId] = useState(null)
  const [albumId, setAlbumId] = useState(null)

  return (
    <Context.Provider value={{ groupId, albumId, setGroupId, setAlbumId }}>
      {children}
    </Context.Provider>
  )
}

export const useGroupContext = () => {
  return useContext(Context)
}
