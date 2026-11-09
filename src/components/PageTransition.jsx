import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { getLenis } from '../lib/lenis'
import { images } from '../data/images'

const PANEL_COUNT = 12
const PANEL_OVERLAP = 2
const STAGGER = 0.035
const COVER_DURATION = 0.55
const REVEAL_DURATION = 0.55
const PANEL_OFFSET = 101
const READY_TIMEOUT = 1400
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const POP_GUARD_KEY = '__interioPageTransitionGuard'

function installPopGuard() {
  if (typeof window === 'undefined') return null
  if (window[POP_GUARD_KEY]) return window[POP_GUARD_KEY]

  const guard = { handler: null, replay: false }

  window.addEventListener('popstate', (event) => {
    if (guard.replay) {
      guard.replay = false
      return
    }
    if (!guard.handler) return
    if (guard.handler(event) !== false) event.stopImmediatePropagation()
  })

  window[POP_GUARD_KEY] = guard
  return guard
}

const popGuard = installPopGuard()

const ROUTE_HEROES = {
  '/': images.hero,
  '/dream-collection': images.dream,
  '/signature-collection': images.signature,
  '/studio': images.studio,
  '/philosophy': images.philosophy,
  '/contact': images.contact,
}

function prefersReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

function browserLocationKey() {
  const { pathname, search, hash } = window.location
  return pathname + search + hash
}

function waitForReady() {
  const nextFrame = new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(resolve)),
  )

  const fontsReady =
    document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()

  const visibleImages = Array.from(document.images).filter((image) => {
    const rect = image.getBoundingClientRect()
    return rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0 && rect.height > 0
  })

  const imagesReady = visibleImages.map((image) => {
    if (image.complete) {
      return image.decode ? image.decode().catch(() => {}) : Promise.resolve()
    }

    return new Promise((resolve) => {
      image.addEventListener('load', resolve, { once: true })
      image.addEventListener('error', resolve, { once: true })
    })
  })

  return Promise.race([
    Promise.all([nextFrame, fontsReady, ...imagesReady]),
    new Promise((resolve) => window.setTimeout(resolve, READY_TIMEOUT)),
  ])
}

export default function PageTransition({ children }) {
  const overlayRef = useRef(null)
  const busyRef = useRef(false)
  const timelineRef = useRef(null)
  const pendingLocationRef = useRef(null)
  const pendingResolveRef = useRef(null)
  const previousLocationRef = useRef(null)
  const currentLocationRef = useRef(null)

  const { pathname, search, hash } = useLocation()
  const locationKey = pathname + search + hash
  const navigate = useNavigate()

  if (previousLocationRef.current === null) previousLocationRef.current = locationKey
  if (currentLocationRef.current === null) currentLocationRef.current = locationKey

  const getPanels = () =>
    overlayRef.current
      ? Array.from(overlayRef.current.querySelectorAll('[data-transition-panel]'))
      : []

  const lockScroll = () => {
    const doc = document.documentElement
    const scrollbarGap = window.innerWidth - doc.clientWidth
    getLenis()?.stop()
    doc.style.overflow = 'hidden'
    if (scrollbarGap > 0) document.body.style.paddingRight = `${scrollbarGap}px`
  }

  const unlockScroll = () => {
    document.documentElement.style.overflow = ''
    document.body.style.paddingRight = ''
    getLenis()?.start()
  }

  const resetScrollPosition = () => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
  }

  const preloadDestination = (href) => {
    try {
      const url = new URL(href, window.location.origin)
      const src = ROUTE_HEROES[url.pathname]
      if (!src) return
      const image = new Image()
      image.src = src
    } catch {
      return
    }
  }

  const cover = () =>
    new Promise((resolve) => {
      const panels = getPanels()
      timelineRef.current?.kill()

      if (prefersReducedMotion()) {
        gsap.set(panels, { yPercent: 0 })
        timelineRef.current = gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.2, ease: 'none', onComplete: resolve },
        )
        return
      }

      gsap.set(overlayRef.current, { opacity: 1 })
      gsap.set(panels, { yPercent: -PANEL_OFFSET })
      timelineRef.current = gsap.to(panels, {
        yPercent: 0,
        duration: COVER_DURATION,
        ease: 'power3.out',
        stagger: { each: STAGGER, from: 'end' },
        onComplete: resolve,
      })
    })

  const reveal = () =>
    new Promise((resolve) => {
      const panels = getPanels()
      timelineRef.current?.kill()

      if (prefersReducedMotion()) {
        timelineRef.current = gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.22,
          ease: 'none',
          onComplete: () => {
            gsap.set(panels, { yPercent: -PANEL_OFFSET })
            resolve()
          },
        })
        return
      }

      timelineRef.current = gsap.to(panels, {
        yPercent: PANEL_OFFSET,
        duration: REVEAL_DURATION,
        ease: 'power3.in',
        stagger: { each: STAGGER, from: 'end' },
        onComplete: () => {
          gsap.set(panels, { yPercent: -PANEL_OFFSET })
          resolve()
        },
      })
    })

  const finishTransition = () => {
    busyRef.current = false
    timelineRef.current = null
    if (overlayRef.current) overlayRef.current.style.pointerEvents = 'none'
    unlockScroll()
  }

  const navigateTo = (href) =>
    new Promise((resolve) => {
      const url = new URL(href, window.location.origin)
      const targetKey = url.pathname + url.search + url.hash
      pendingLocationRef.current = targetKey
      pendingResolveRef.current = resolve
      navigate(url.pathname + url.search + url.hash)

      window.setTimeout(() => {
        if (pendingResolveRef.current !== resolve) return
        pendingResolveRef.current = null
        pendingLocationRef.current = null
        resolve()
      }, READY_TIMEOUT)
    })

  const replayPop = () =>
    new Promise((resolve) => {
      pendingLocationRef.current = browserLocationKey()
      pendingResolveRef.current = resolve
      if (popGuard) popGuard.replay = true
      window.dispatchEvent(new PopStateEvent('popstate', { state: window.history.state }))

      window.setTimeout(() => {
        if (pendingResolveRef.current !== resolve) return
        pendingResolveRef.current = null
        pendingLocationRef.current = null
        resolve()
      }, READY_TIMEOUT)
    })

  const performTransition = useCallback(async (href, applyNavigation) => {
    if (busyRef.current) return

    busyRef.current = true
    if (overlayRef.current) overlayRef.current.style.pointerEvents = 'auto'
    lockScroll()
    preloadDestination(href)

    try {
      await cover()
      lockScroll()
      await applyNavigation()
      resetScrollPosition()
      lockScroll()
      await waitForReady()
      await reveal()
    } finally {
      finishTransition()
    }
  }, [])

  const startPageTransition = useCallback(
    (href) => performTransition(href, () => navigateTo(href)),
    [navigate, performTransition],
  )

  useEffect(() => {
    if (!popGuard) return undefined

    const handlePopState = (event) => {
      if (busyRef.current) return false

      const targetKey = browserLocationKey()
      if (targetKey === currentLocationRef.current) return false

      performTransition(targetKey, replayPop)
      return true
    }

    popGuard.handler = handlePopState

    return () => {
      if (popGuard.handler === handlePopState) popGuard.handler = null
    }
  }, [performTransition])

  useLayoutEffect(() => {
    gsap.set(getPanels(), { yPercent: -PANEL_OFFSET })
    gsap.set(overlayRef.current, { opacity: 1 })
  }, [])

  useEffect(() => {
    if (pendingResolveRef.current && pendingLocationRef.current === locationKey) {
      const resolve = pendingResolveRef.current
      pendingResolveRef.current = null
      pendingLocationRef.current = null
      resolve()
    }
  }, [locationKey])

  useLayoutEffect(() => {
    const previousKey = previousLocationRef.current
    previousLocationRef.current = locationKey
    currentLocationRef.current = locationKey

    if (previousKey === locationKey || busyRef.current) return

    busyRef.current = true
    if (overlayRef.current) overlayRef.current.style.pointerEvents = 'auto'
    lockScroll()

    const panels = getPanels()
    timelineRef.current?.kill()
    gsap.set(overlayRef.current, { opacity: 1 })
    gsap.set(panels, { yPercent: 0 })

    waitForReady()
      .then(reveal)
      .then(finishTransition)
  }, [locationKey])

  useEffect(() => {
    const handleClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const anchor = event.target.closest ? event.target.closest('a[href]') : null
      if (!anchor) return
      if (anchor.target && anchor.target !== '_self') return
      if (anchor.hasAttribute('download')) return
      if (anchor.dataset.noTransition !== undefined) return

      let url
      try {
        url = new URL(anchor.href, window.location.href)
      } catch {
        return
      }

      if (url.origin !== window.location.origin) return
      if (url.pathname === pathname && url.search === search) return

      event.preventDefault()
      startPageTransition(url.pathname + url.search + url.hash)
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [pathname, search, startPageTransition])

  useEffect(
    () => () => {
      timelineRef.current?.kill()
      document.documentElement.style.overflow = ''
      document.body.style.paddingRight = ''
      getLenis()?.start()
    },
    [],
  )

  return (
    <>
      {children}
      <div
        ref={overlayRef}
        aria-hidden="true"
        data-page-transition
        className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
        style={{ opacity: 0 }}
      >
        <div className="relative h-full w-full overflow-hidden">
          {Array.from({ length: PANEL_COUNT }).map((_, index) => (
            <div
              key={index}
              data-transition-panel
              className="absolute top-0 h-full bg-black will-change-transform"
              style={{
                left: `${(index * 100) / PANEL_COUNT}vw`,
                width: `calc(${100 / PANEL_COUNT}vw + ${PANEL_OVERLAP}px)`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  )
}
