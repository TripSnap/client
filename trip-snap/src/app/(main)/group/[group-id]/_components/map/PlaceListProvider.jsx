import { createContext, useContext, useState } from 'react'

const PlaceListContext = createContext(null)

export const PlaceListProvider = ({ children }) => {
  const [placeList, setPlaceList] = useState([])
  const [selected, setSelected] = useState(null)
  const [openDetailModal, setOpenDetailModal] = useState(false)

  return (
    <PlaceListContext.Provider
      value={{
        placeList,
        setPlaceList,
        selected,
        setSelected,
        openDetailModal,
        setOpenDetailModal,
      }}
    >
      {children}
    </PlaceListContext.Provider>
  )
}

export const usePlaceListContext = () => {
  return useContext(PlaceListContext)
}
