import { Link } from 'react-router-dom'

const footerLinks = [
  { label: 'Dream Collection', to: '/dream-collection' },
  { label: 'Signature Collection', to: '/signature-collection' },
  { label: 'Studio', to: '/studio' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-ivory">
      <div className="mx-auto w-full max-w-[1700px] px-6 py-14 md:px-10 md:py-16 lg:px-16">
        <div className="flex flex-col gap-10 border-b border-ivory/15 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              to="/"
              className="font-display text-3xl font-medium lowercase leading-none tracking-[0.16em] transition-opacity duration-500 hover:opacity-70 md:text-4xl"
            >
              interio park
            </Link>
            <p className="mt-5 text-[9px] uppercase tracking-[0.3em] text-ivory/40 md:text-[10px]">
              Interior Design Studio — Est. 2013
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-10 gap-y-4">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="link-line text-[10px] font-medium uppercase tracking-[0.28em] text-ivory/70 transition-colors duration-500 hover:text-ivory"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-[9px] uppercase tracking-[0.24em] text-ivory/35 md:flex-row md:items-center md:justify-between md:text-[10px]">
          <p>© {year} Interio Park. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="link-line transition-colors duration-500 hover:text-ivory/70"
            >
              Instagram
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              className="link-line transition-colors duration-500 hover:text-ivory/70"
            >
              Pinterest
            </a>
            <span>Bengaluru, India</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
