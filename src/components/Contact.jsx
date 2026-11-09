import { images } from '../data/images'

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 bg-ink text-ivory">
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-between px-6 py-24 md:px-10 md:py-32 lg:px-16 lg:py-40">
          <div>
            <div data-reveal className="flex items-center gap-4 text-ivory/50">
              <span className="h-px w-10 bg-current" />
              <span className="kicker">Enquiries</span>
            </div>

            <h2
              data-reveal
              className="mt-8 max-w-xl font-display text-[clamp(2.5rem,4.6vw,4.9rem)] font-semibold leading-[1.02] tracking-[-0.01em]"
            >
              Let&rsquo;s Create Something <em>Meaningful.</em>
            </h2>

            <p
              data-reveal
              className="mt-8 max-w-md text-[15px] font-light leading-[1.95] text-ivory/55"
            >
              Tell us about your space and how you would like it to feel. We will take it from
              there.
            </p>

            <a
              data-reveal
              href="mailto:hello@interiopark.com?subject=Project%20enquiry"
              className="link-line-static mt-12 inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.36em] text-ivory/85 transition-colors duration-500 hover:text-ivory md:text-[11px]"
            >
              Begin an enquiry
              <span aria-hidden="true" className="text-base leading-none">
                &#8594;
              </span>
            </a>
          </div>

          <div
            data-reveal
            className="mt-20 grid gap-10 border-t border-ivory/15 pt-10 sm:grid-cols-2"
          >
            <div>
              <p className="kicker text-ivory/35">Studio</p>
              <p className="mt-4 text-sm font-light leading-[1.9] text-ivory/70">
                14 Lavelle Road
                <br />
                Bengaluru 560001
                <br />
                India
              </p>
            </div>
            <div>
              <p className="kicker text-ivory/35">Contact</p>
              <p className="mt-4 flex flex-col gap-2 text-sm font-light leading-[1.9] text-ivory/70">
                <a href="tel:+919845000000" className="link-line w-fit">
                  +91 98450 00000
                </a>
                <a href="mailto:hello@interiopark.com" className="link-line w-fit">
                  hello@interiopark.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="relative min-h-[60vh] overflow-hidden lg:min-h-full">
          <div data-parallax className="absolute inset-x-0 -top-[8%] h-[116%] will-change-transform">
            <img
              src={images.contact}
              alt="A calm interior detail welcoming new projects"
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-ink/20" />
          <span className="absolute bottom-8 left-8 hidden text-[9px] uppercase tracking-[0.34em] text-ivory/70 md:block">
            Interio Park — Est. 2013
          </span>
        </div>
      </div>
    </section>
  )
}
