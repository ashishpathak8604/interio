import { images } from '../data/images'
import ResponsiveImage from './ResponsiveImage'

function Stat({ value, label }) {
  return (
    <div>
      <p className="font-display text-3xl font-medium leading-none md:text-4xl">{value}</p>
      <p className="mt-3 text-[9px] uppercase leading-relaxed tracking-[0.24em] text-charcoal/45">
        {label}
      </p>
    </div>
  )
}

export default function Studio() {
  return (
    <section id="studio" className="relative scroll-mt-24 bg-ivory py-28 md:py-40 lg:py-48">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-0">
          <div className="lg:col-span-6 lg:pr-16 xl:pr-24">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-beige">
              <div data-parallax className="absolute inset-x-0 -top-[8%] h-[116%] will-change-transform">
                <ResponsiveImage
                  data-img-reveal
                  image={images.studio}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  alt="A considered living space by Interio Park"
                  loading="lazy"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between text-[9px] uppercase tracking-[0.3em] text-charcoal/40">
              <span>Private Residence, Bengaluru</span>
              <span>Interio Park</span>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div data-reveal className="flex items-center gap-4 text-charcoal/50">
              <span className="h-px w-10 bg-current" />
              <span className="kicker">The Studio</span>
            </div>

            <h2
              data-reveal
              className="mt-8 font-display text-[clamp(2.4rem,4.6vw,4.7rem)] font-semibold leading-[1.02] tracking-[-0.01em]"
            >
              Thirteen years of <em>quiet</em> intention.
            </h2>

            <p
              data-reveal
              className="mt-8 max-w-md text-[15px] font-light leading-[1.95] text-charcoal/65"
            >
              Interio Park is an interior design studio shaping homes, retreats and hospitality
              spaces across India. Since 2013, we have believed that a beautiful room is one that
              feels inevitable — calm, layered and entirely your own.
            </p>

            <div
              data-reveal
              className="mt-14 grid grid-cols-3 gap-4 border-t border-charcoal/15 pt-8 md:gap-6"
            >
              <Stat value="13" label="Years of practice" />
              <Stat value="120+" label="Projects delivered" />
              <Stat value="9" label="Cities" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
