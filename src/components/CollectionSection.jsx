import { Link } from 'react-router-dom'

export default function CollectionSection({ index, title, image, to, alt, scene, className = '' }) {
  return (
    <section
      data-scene={scene}
      className={`group h-[100svh] w-full overflow-hidden bg-ink text-ivory ${className}`}
    >
      <Link
        to={to}
        aria-label={`Explore the ${title}`}
        className="relative block h-full w-full"
      >
        <div data-scene-media className="absolute inset-0 overflow-hidden">
          <img
            src={image}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-[1800ms] ease-luxurious group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-ink/40 transition-colors duration-700 ease-luxurious group-hover:bg-ink/30" />
        </div>

        <div
          data-scene-content
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.42em] text-ivory/65 md:text-[11px]">
            {index}
          </span>
          <h2 className="mt-6 font-display text-[clamp(2.9rem,8.5vw,8.5rem)] font-bold leading-[0.95] tracking-[-0.015em]">
            {title}
          </h2>
          <span className="mt-10 inline-flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.38em] opacity-80 transition-all duration-700 ease-luxurious md:mt-12 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-80">
            Explore
            <span className="block h-px w-8 bg-current transition-all duration-700 ease-luxurious md:group-hover:w-14" />
          </span>
        </div>
      </Link>
    </section>
  )
}
