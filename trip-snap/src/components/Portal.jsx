'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export const Portal = ({ children, className = 'root-portal', el = 'div' }) => {
  const [container, setContainer] = useState(null)
  useEffect(() => {
    setContainer(document.createElement(el))
  }, [])

  useEffect(() => {
    if (container) {
      container.classList.add(className)
      document.body.appendChild(container)
      return () => {
        document.body.removeChild(container)
      }
    }
  }, [container])

  return container ? createPortal(children, container) : null
}
