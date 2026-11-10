import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ResponsiveImage from '../components/ResponsiveImage'
import { collections } from '../data/collections'

export default function CollectionPage({ variant = 'dream' }) {
  const page = collections[variant] ?? collections.dream

  return (
    <div className="relative bg-ink text-ivory">
      <Navbar />

      <main>
        <section className="relative h-[100svh] w-full overflow-hidden bg-ink">
          <ResponsiveImage
            image={page.hero}
            sizes="100vw"
            alt={page.heroAlt}
            priority
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-ink/40" />

          <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
            <h1 className="font-display text-[clamp(2.9rem,8vw,8rem)] font-bold leading-[0.95] tracking-[-0.015em]">
              {page.title}
            </h1>
          </div>
        </section>

        <section className="relative bg-ink px-6 pb-24 pt-24 md:px-10 md:pb-32 md:pt-32 lg:px-16 lg:pb-40 lg:pt-40">
          <div className="mx-auto w-full max-w-[1700px]">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-16">
              {page.gallery.map((item) => (
                <figure key={item.alt} className={item.layout}>
                  <div className={`relative w-full overflow-hidden bg-charcoal ${item.aspect}`}>
                    <ResponsiveImage
                      image={item.src}
                      alt={item.alt}
                      sizes="(min-width: 1024px) 66vw, (min-width: 768px) 50vw, 100vw"
                      loading="lazy"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
