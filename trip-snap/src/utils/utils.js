'use client'

export const getWindowHeight = () => window.innerHeight

export const setBodyScroll = (flag) => {
  document.documentElement.style.overflowY = flag ? 'hidden' : 'auto'
}
