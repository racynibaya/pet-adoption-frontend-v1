import Eyebrow from '@/components/ui/Eyebrow';
import {
  TestimonialIllustration,
  TestimonialAvatar,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '../assets';

export default function HomeTestimonial() {
  return (
    <section className='section-tight'>
      <div className='r-grid-2 gap-16 items-center home-testimonial-grid'>
        <div className='relative home-testimonial-illu' aria-hidden='true'>
          <TestimonialIllustration />
        </div>

        <div>
          <Eyebrow>Testimonials</Eyebrow>
          <h2 style={{ marginTop: 14, fontSize: 40 }}>
            Real adopters,
            <br />
            real families, real stories
          </h2>
          <p className='mt-16 muted'>
            Every adoption on KodaNest connects a pet with a home that truly
            fits. Here's what some of our adopters had to say.
          </p>

          <div className='row row-center mt-32' style={{ gap: 20 }}>
            <div className='avatar avatar-sm'>
              <TestimonialAvatar />
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>Adamon Galvez.</div>
              <div className='muted' style={{ fontSize: 13 }}>
                First-time adopter · San Agustin, SFC
              </div>
            </div>
          </div>

          <p
            className='mt-24'
            style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink)' }}
          >
            "I had no idea what I was doing. The shelter's counselor met me
            before I even saw a pet. By the time I brought Biscuit home, it felt
            like he was already mine. The application process was so
            straightforward."
          </p>

          <div className='row mt-24' style={{ gap: 12 }}>
            <button className='nav-cart' aria-label='Previous'>
              <ChevronLeftIcon />
            </button>
            <button
              className='nav-cart'
              style={{
                background: 'var(--rausch)',
                borderColor: 'var(--rausch)',
              }}
              aria-label='Next'
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
