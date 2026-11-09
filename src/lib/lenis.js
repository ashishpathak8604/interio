import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis = null
let tickerFn = null

export function initLenis() {
  if (lenis) return lenis
  if (typeof window === 'undefined') return null
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null

  lenis = new Lenis({
    lerp: 0.085,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.2,
    autoRaf: false,
  })

  lenis.on('scroll', ScrollTrigger.update)

  tickerFn = (time) => {
    lenis?.raf(time * 1000)
  }

  gsap.ticker.add(tickerFn)
  gsap.ticker.lagSmoothing(0)

  requestAnimationFrame(() => ScrollTrigger.refresh())

  return lenis
}

export function getLenis() {
  return lenis
}

export function destroyLenis() {
  if (tickerFn) {
    gsap.ticker.remove(tickerFn)
    tickerFn = null
  }
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
  gsap.ticker.lagSmoothing(500, 33)
}
