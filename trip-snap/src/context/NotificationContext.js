'use client'
import { setBodyScroll } from '@/utils/utils'
import { createContext, useContext, useEffect, useState } from 'react'

const NotiContext = createContext(false)

const NotiProvider = ({ children }) => {
  const [notiOpen, setNotiopen] = useState(false)

  useEffect(() => {
    setBodyScroll(notiOpen)
  }, [notiOpen])

  return (
    <NotiContext.Provider
      value={{
        isOpen: notiOpen,
        open: () => setNotiopen(true),
        close: () => setNotiopen(false),
      }}
    >
      {children}
    </NotiContext.Provider>
  )
}

const useNotiContext = () => useContext(NotiContext)

export { NotiProvider, useNotiContext }
