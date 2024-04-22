import { useCallback, useState } from 'react'

export function useThrottle(t, func, deps = []) {
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
    [waiting, ...deps]
  )
  return { callback }
}
