import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { getLenis } from '../lib/lenis'
import { images, preloadImage } from '../data/images'

const PANEL_COUNT = 12
const PANEL_OVERLAP = 2
const STAGGER = 0.035
const COVER_DURATION = 0.55
const REVEAL_DURATION = 0.55
const PANEL_OFFSET = 101
const COMMIT_TIMEOUT = 1200
const FRAME_TIMEOUT = 80
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

function locationKeyFromHref(href) {
  const { pathname, search, hash } = new URL(href, window.location.origin)
  return pathname + search + hash
}

function nextFrame() {
  return new Promise((resolve) => {
    let settled = false
    const done = () => {
      if (settled) return
      settled = true
      window.clearTimeout(timer)
      resolve()
    }
    const timer = window.setTimeout(done, FRAME_TIMEOUT)
    requestAnimationFrame(done)
  })
}

export default function PageTransition({ children }) {
  const overlayRef = useRef(null)
  const busyRef = useRef(false)
  const timelineRef = useRef(null)
  const pendingLocationRef = useRef(null)
  const pendingResolveRef = useRef(null)
  const pendingTimerRef = useRef(null)
  const previousLocationRef = useRef(null)
  const currentLocationRef = useRef(null)
  const tokenRef = useRef(0)
  const queuedPopRef = useRef(null)
  const mountedRef = useRef(true)
  const handlersRef = useRef({})

  const { pathname, search, hash } = useLocation()
  const locationKey = pathname + search + hash
  const navigate = useNavigate()

  if (previousLocationRef.current === null) previousLocationRef.current = locationKey
  if (currentLocationRef.current === null) currentLocationRef.current = locationKey

  const getPanels = () =>
    overlayRef.current
      ? Array.from(overlayRef.current.querySelectorAll('[data-transition-panel]'))
      : []

  const setPanelsWillChange = (enabled) => {
    getPanels().forEach((panel) => {
      panel.style.willChange = enabled ? 'transform' : ''
    })
  }

  const setOverlayActive = (active) => {
    if (overlayRef.current) overlayRef.current.style.pointerEvents = active ? 'auto' : 'none'
  }

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

  const clearPendingTimer = () => {
    if (pendingTimerRef.current) {
      window.clearTimeout(pendingTimerRef.current)
      pendingTimerRef.current = null
    }
  }

  const resolvePending = () => {
    const resolve = pendingResolveRef.current
    if (!resolve) return
    pendingResolveRef.current = null
    pendingLocationRef.current = null
    clearPendingTimer()
    resolve()
  }

  const armCommitTimeout = (resolve) => {
    clearPendingTimer()
    pendingTimerRef.current = window.setTimeout(() => {
      if (pendingResolveRef.current !== resolve) return
      pendingResolveRef.current = null
      pendingLocationRef.current = null
      pendingTimerRef.current = null
      resolve()
    }, COMMIT_TIMEOUT)
  }

  const navigateTo = (href, { replace = false } = {}) =>
    new Promise((resolve) => {
      let targetKey
      try {
        targetKey = locationKeyFromHref(href)
      } catch {
        resolve()
        return
      }

      pendingLocationRef.current = targetKey
      pendingResolveRef.current = resolve
      armCommitTimeout(resolve)
      navigate(targetKey, { replace })
    })

  const replayPop = () =>
    new Promise((resolve) => {
      pendingLocationRef.current = browserLocationKey()
      pendingResolveRef.current = resolve
      armCommitTimeout(resolve)
      if (popGuard) popGuard.replay = true
      window.dispatchEvent(new PopStateEvent('popstate', { state: window.history.state }))
    })

  const preloadDestination = (href) => {
    try {
      const { pathname: targetPath } = new URL(href, window.location.origin)
      preloadImage(ROUTE_HEROES[targetPath])
    } catch {
      return
    }
  }

  const cover = () =>
    new Promise((resolve) => {
      const panels = getPanels()
      const overlay = overlayRef.current
      timelineRef.current?.kill()

      if (!overlay || !panels.length) {
        resolve()
        return
      }

      if (prefersReducedMotion()) {
        gsap.set(overlay, { opacity: 1 })
        gsap.set(panels, { yPercent: 0 })
        resolve()
        return
      }

      setPanelsWillChange(true)
      gsap.set(overlay, { opacity: 1 })
      gsap.set(panels, { yPercent: -PANEL_OFFSET, force3D: true })
      timelineRef.current = gsap.to(panels, {
        yPercent: 0,
        duration: COVER_DURATION,
        ease: 'power3.out',
        stagger: { each: STAGGER, from: 'end' },
        force3D: true,
        onComplete: resolve,
      })
    })

  const reveal = () =>
    new Promise((resolve) => {
      const panels = getPanels()
      const overlay = overlayRef.current
      timelineRef.current?.kill()

      if (!overlay || !panels.length) {
        resolve()
        return
      }

      if (prefersReducedMotion()) {
        timelineRef.current = gsap.to(overlay, {
          opacity: 0,
          duration: 0.22,
          ease: 'none',
          onComplete: () => {
            gsap.set(panels, { yPercent: -PANEL_OFFSET })
            setPanelsWillChange(false)
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
        force3D: true,
        onComplete: () => {
          gsap.set(panels, { yPercent: -PANEL_OFFSET })
          setPanelsWillChange(false)
          resolve()
        },
      })
    })

  const finishTransition = () => {
    busyRef.current = false
    timelineRef.current = null
    setPanelsWillChange(false)
    setOverlayActive(false)
    unlockScroll()

    const queued = queuedPopRef.current
    queuedPopRef.current = null

    if (queued && mountedRef.current && queued !== currentLocationRef.current) {
      window.setTimeout(() => {
        handlersRef.current.transition?.(queued, () =>
          handlersRef.current.navigateTo?.(queued, { replace: true }),
        )
      }, 0)
    }
  }

  const transition = async (href, applyNavigation) => {
    if (busyRef.current) return

    busyRef.current = true
    tokenRef.current += 1
    const token = tokenRef.current
    setOverlayActive(true)
    lockScroll()
    preloadDestination(href)

    try {
      await cover()
      if (!mountedRef.current || token !== tokenRef.current) return

      lockScroll()
      await applyNavigation()
      if (!mountedRef.current || token !== tokenRef.current) return

      resetScrollPosition()
      lockScroll()
      await nextFrame()
      if (!mountedRef.current || token !== tokenRef.current) return

      await reveal()
    } catch {
      // A failed navigation must never leave the visitor behind a black overlay.
    } finally {
      if (token === tokenRef.current) finishTransition()
    }
  }

  useLayoutEffect(() => {
    handlersRef.current = { transition, navigateTo, replayPop }
  })

  useLayoutEffect(() => {
    gsap.set(getPanels(), { yPercent: -PANEL_OFFSET, force3D: true })
    if (overlayRef.current) gsap.set(overlayRef.current, { opacity: 1 })
  }, [])

  useLayoutEffect(() => {
    const previousKey = previousLocationRef.current
    previousLocationRef.current = locationKey
    currentLocationRef.current = locationKey

    if (pendingResolveRef.current && pendingLocationRef.current === locationKey) {
      resolvePending()
      return
    }

    if (previousKey === locationKey) return

    if (!busyRef.current) {
      timelineRef.current?.kill()
      timelineRef.current = null
      setPanelsWillChange(false)
      gsap.set(getPanels(), { yPercent: -PANEL_OFFSET, force3D: true })
      if (overlayRef.current) {
        gsap.set(overlayRef.current, { opacity: 1 })
        overlayRef.current.style.pointerEvents = 'none'
      }
      unlockScroll()
    }
  }, [locationKey])

  useEffect(() => {
    if (!popGuard) return undefined

    const handlePopState = () => {
      const targetKey = browserLocationKey()
      if (targetKey === currentLocationRef.current) return false

      if (busyRef.current) {
        queuedPopRef.current = targetKey
        return true
      }

      handlersRef.current.transition?.(targetKey, () => handlersRef.current.replayPop?.())
      return true
    }

    popGuard.handler = handlePopState

    return () => {
      if (popGuard.handler === handlePopState) popGuard.handler = null
    }
  }, [])

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
      if (busyRef.current) return

      const targetKey = url.pathname + url.search + url.hash
      handlersRef.current.transition?.(targetKey, () =>
        handlersRef.current.navigateTo?.(targetKey),
      )
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [pathname, search])

  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
      tokenRef.current += 1
      timelineRef.current?.kill()
      timelineRef.current = null
      clearPendingTimer()
      pendingResolveRef.current = null
      pendingLocationRef.current = null
      document.documentElement.style.overflow = ''
      document.body.style.paddingRight = ''
      getLenis()?.start()
    }
  }, [])

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
              className="absolute top-0 h-full bg-black"
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
