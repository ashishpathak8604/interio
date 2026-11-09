import { useEffect } from 'react'
import { destroyLenis, initLenis } from '../lib/lenis'

export default function SmoothScroll() {
  useEffect(() => {
    initLenis()
    return () => destroyLenis()
  }, [])

  return null
}
