import { images } from '../data/images'

export default function Hero({ className = '' }) {
  return (
    <section
      data-hero
      data-scene="hero"
      className={`h-[100svh] w-full overflow-hidden bg-ink text-ivory ${className}`}
    >
      <div data-scene-media className="absolute inset-0 overflow-hidden will-change-transform">
        <img
          data-hero-img
          src={images.hero}
          alt="A serene, light-filled interior designed by Interio Park"
          fetchpriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
        />
        <div className="absolute inset-0 bg-ink/35" />
      </div>

      <div
        data-scene-content
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <h1
          aria-label="Spaces That Tell Your Story."
          className="font-display text-[clamp(2.2rem,8.5vw,9rem)] font-bold leading-[0.96] tracking-[-0.02em]"
        >
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block whitespace-nowrap">Spaces That Tell</span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block whitespace-nowrap">
              Your <em>Story.</em>
            </span>
          </span>
        </h1>
      </div>

      <div
        data-hero-foot
        data-scene-content
        className="absolute bottom-0 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-4 pb-10 md:flex"
      >
        <span className="scroll-cue block h-14 w-px bg-ivory/50" />
        <span className="text-[9px] font-medium uppercase tracking-[0.42em] text-ivory/60">
          Scroll
        </span>
      </div>
    </section>
  )
}
