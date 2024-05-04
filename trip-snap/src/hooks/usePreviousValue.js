import { useEffect, useRef } from 'react'

export const usePreviousValue = (value, initValue) => {
  const ref = useRef(initValue ?? null)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}
