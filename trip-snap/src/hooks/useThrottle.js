import { useCallback, useState } from 'react'

export function useThrottle(t, func) {
  const [waiting, setWaiting] = useState()
  const callback = useCallback(
    (...params) => {
      if (!waiting) {
        setWaiting(
          setTimeout(() => {
            clearTimeout(waiting)
            setWaiting(waiting)
          }, t)
        )
        func(...params)
      }
    },
    [waiting]
  )
  return { callback }
}
