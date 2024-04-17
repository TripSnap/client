'use client'

export const getWindowHeight = () => window.innerHeight

export const setBodyScroll = (flag) => {
  document.documentElement.style.overflowY = flag ? 'hidden' : 'auto'
}

export const throttle = (t, func, option = {}) => {
  const { start } = option
  let waiting
  return (...param) => {
    if (!waiting) {
      start && func(...param)
      waiting = setTimeout(() => {
        !start && func(...param)
        clearTimeout(waiting)
        waiting = null
      }, t)
    }
  }
}

export const debounce = (t, func) => {
  let waiting
  return () => {
    if (waiting) {
      clearTimeout(waiting)
    }
    waiting = setTimeout(() => {
      func()
      waiting = null
    }, t)
  }
}

export const debounceAsync = (t, func) => {
  let waiting
  return (...param) =>
    new Promise((res, rej) => {
      if (waiting) {
        clearTimeout(waiting)
        res(true)
      }
      waiting = setTimeout(() => {
        waiting = null
        res(func(...param))
      }, t)
    })
}
