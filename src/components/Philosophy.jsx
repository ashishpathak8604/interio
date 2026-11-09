import { images } from '../data/images'

const principles = [
  {
    title: 'Light before form',
    copy: 'We begin with how a room receives the day.',
  },
  {
    title: 'Material honesty',
    copy: 'Stone, timber and linen, left to speak for themselves.',
  },
  {
    title: 'Liveable luxury',
    copy: 'Beauty that only deepens with everyday use.',
  },
]

export default function Philosophy() {
  return (
    <section id="philosophy" className="scroll-mt-24 bg-bone py-28 md:py-40">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div data-reveal className="flex items-center gap-4 text-charcoal/50">
              <span className="h-px w-10 bg-current" />
              <span className="kicker">Design Philosophy</span>
            </div>
            <h2
              data-reveal
              className="mt-8 font-display text-[clamp(2.7rem,6.4vw,7rem)] font-semibold leading-[0.98] tracking-[-0.015em]"
            >
              Designed With <em>Intention.</em>
            </h2>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <p
              data-reveal
              className="max-w-md text-[15px] font-light leading-[1.95] text-charcoal/65"
            >
              We design interiors that feel effortless — spaces shaped by natural light, honest
              materials and a quiet sense of order. Nothing superfluous. Everything considered.
            </p>
          </div>
        </div>

        <div
          data-reveal
          className="relative mt-16 aspect-[16/10] w-full overflow-hidden bg-beige md:mt-24 md:aspect-[21/9]"
        >
          <div data-parallax className="absolute inset-x-0 -top-[8%] h-[116%] will-change-transform">
            <img
              data-img-reveal
              src={images.philosophy}
              alt="Architectural detail and natural materials in a quiet interior"
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-ink/10" />
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-3 md:mt-16">
          {principles.map((principle, i) => (
            <div
              key={principle.title}
              data-reveal
              className="border-t border-charcoal/15 pt-6"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-charcoal/40">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-2xl font-medium leading-tight">
                {principle.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm font-light leading-relaxed text-charcoal/55">
                {principle.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
