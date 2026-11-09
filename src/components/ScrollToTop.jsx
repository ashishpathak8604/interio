import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getLenis } from '../lib/lenis'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const timer = window.setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          const lenis = getLenis()
          if (lenis) lenis.scrollTo(el, { offset: -96 })
          else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 180)
      return () => window.clearTimeout(timer)
    }

    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}
