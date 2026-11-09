import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getLenis } from '../lib/lenis'

export const NAV_LINKS = [
  { label: 'Studio', to: '/studio' },
  { label: 'Philosophy', to: '/philosophy' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const lenis = getLenis()

    if (open) {
      lenis?.stop()
      document.documentElement.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.documentElement.style.overflow = ''
    }

    return () => {
      lenis?.start()
      document.documentElement.style.overflow = ''
    }
  }, [open])

  const handleNavigate = (event, to) => {
    setOpen(false)

    if (pathname === to) {
      event.preventDefault()
      const lenis = getLenis()
      if (lenis) lenis.scrollTo(0, { duration: 1.2 })
      else window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const isLightPage = pathname === '/studio' || pathname === '/philosophy'

  const isActive = (to) => pathname.startsWith(to)

  return (
    <>
      <header
        data-nav
        className={`fixed inset-x-0 top-0 z-50 bg-transparent transition-colors duration-500 ${
          isLightPage ? 'text-charcoal' : 'nav-shadow text-ivory'
        }`}
      >
        <div className="mx-auto flex h-20 w-full max-w-[1700px] items-center justify-between px-6 md:h-24 md:px-10 lg:px-12 xl:px-16">
          <Link
            to="/"
            aria-label="Interio Park — home"
            onClick={(event) => handleNavigate(event, '/')}
            className="font-display text-[22px] font-semibold lowercase leading-none tracking-[0.14em] transition-opacity duration-500 hover:opacity-75 md:text-[26px]"
          >
            interio
          </Link>

          <nav className="hidden items-center gap-6 lg:flex xl:gap-9">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={(event) => handleNavigate(event, link.to)}
                aria-current={isActive(link.to) ? 'page' : undefined}
                className={`link-line text-[10px] font-semibold uppercase tracking-[0.22em] transition-opacity duration-500 xl:text-[11px] xl:tracking-[0.24em] ${
                  isActive(link.to) ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] lg:hidden"
          >
            <span className="flex flex-col gap-[5px]">
              <span className="block h-px w-6 bg-current" />
              <span className="block h-px w-6 bg-current" />
            </span>
            Menu
          </button>
        </div>
      </header>

      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-[70] overflow-y-auto bg-ivory text-charcoal transition-[opacity,visibility] duration-700 ease-luxurious ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="flex min-h-full flex-col">
          <div className="flex h-20 shrink-0 items-center justify-between px-6 md:h-24 md:px-10">
            <Link
              to="/"
              onClick={(event) => handleNavigate(event, '/')}
              className="font-display text-[22px] font-semibold lowercase leading-none tracking-[0.14em]"
            >
              interio park
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="text-[10px] font-semibold uppercase tracking-[0.3em]"
            >
              Close
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center px-6 py-6 md:px-10">
            {NAV_LINKS.map((link, i) => (
              <div key={link.label} className="overflow-hidden border-b border-charcoal/10">
                <Link
                  to={link.to}
                  aria-label={link.label}
                  onClick={(event) => handleNavigate(event, link.to)}
                  className={`flex items-baseline gap-5 py-3 font-display text-[9vw] font-semibold leading-none tracking-[-0.02em] transition-transform duration-700 ease-luxurious sm:text-5xl md:py-4 md:text-6xl ${
                    open ? 'translate-y-0' : 'translate-y-full'
                  }`}
                  style={{ transitionDelay: open ? `${140 + i * 60}ms` : '0ms' }}
                >
                  <span className="font-sans text-[10px] tracking-[0.2em] opacity-40">0{i + 1}</span>
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>

          <div className="shrink-0 px-6 pb-10 md:px-10">
            <div className="flex flex-col gap-4 border-t border-charcoal/10 pt-6 text-[10px] font-medium uppercase tracking-[0.26em] text-charcoal/50 sm:flex-row sm:items-center sm:justify-between">
              <a href="mailto:hello@interiopark.com" className="link-line w-fit">
                hello@interiopark.com
              </a>
              <span>Bengaluru, India</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
