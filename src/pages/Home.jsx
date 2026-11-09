import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import CollectionSection from '../components/CollectionSection'
import { images } from '../data/images'

gsap.registerPlugin(ScrollTrigger)

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export default function Home() {
  const rootRef = useRef(null)
  const stackRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches,
  )

  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION_QUERY)
    const onChange = (event) => setReducedMotion(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useLayoutEffect(() => {
    if (reducedMotion) return undefined

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })

      intro
        .from('[data-nav]', { y: -24, autoAlpha: 0, duration: 1.1 }, 0.15)
        .from('[data-hero-line]', { yPercent: 118, duration: 1.5, stagger: 0.14 }, 0.45)
        .from('[data-hero-foot]', { autoAlpha: 0, duration: 1.2 }, 1.1)

      gsap.fromTo(
        '[data-hero-img]',
        { scale: 1.02 },
        {
          scale: 1.09,
          duration: 14,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        },
      )

      const stack = stackRef.current
      if (!stack) return

      const dream = stack.querySelector('[data-scene="dream"]')
      const signature = stack.querySelector('[data-scene="signature"]')

      gsap.set([dream, signature], {
        clipPath: 'inset(100% 0% 0% 0%)',
        willChange: 'clip-path',
      })

      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stack,
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        .to(dream, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, 0)
        .to(signature, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, 1)
    }, rootRef)

    const refresh = () => ScrollTrigger.refresh()
    const timer = window.setTimeout(refresh, 700)
    window.addEventListener('load', refresh)
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [reducedMotion])

  return (
    <div ref={rootRef} className="relative bg-ink">
      <div aria-hidden="true" className="fixed inset-0 -z-10 bg-ink" />
      <Navbar />
      <main>
        <div
          ref={stackRef}
          className={`relative w-full bg-ink ${
            reducedMotion ? 'flex flex-col' : 'h-[100svh] overflow-hidden'
          }`}
        >
          <Hero className={reducedMotion ? 'relative' : 'absolute inset-0 z-10'} />
          <CollectionSection
            scene="dream"
            index="01 — Dream"
            title="Dream Collection"
            image={images.dream}
            to="/dream-collection"
            alt="A cinematic, softly lit luxury interior from the Dream Collection"
            className={reducedMotion ? 'relative' : 'absolute inset-0 z-20'}
          />
          <CollectionSection
            scene="signature"
            index="02 — Signature"
            title="Signature Collection"
            image={images.signature}
            to="/signature-collection"
            alt="A refined, architectural interior from the Signature Collection"
            className={reducedMotion ? 'relative' : 'absolute inset-0 z-30'}
          />
        </div>
      </main>
    </div>
  )
}
