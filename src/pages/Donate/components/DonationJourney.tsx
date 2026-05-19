import SectionHead from '@/components/ui/SectionHead';
import { DONATION_JOURNEY } from '../constants/donate.constants';

export default function DonationJourney() {
  return (
    <section
      id='journey'
      className='section rounded-3xl'
      style={{
        padding: 'clamp(64px, 7vw, 112px) clamp(28px, 5vw, 72px)',
        background: 'var(--soft)',
      }}
    >
      <SectionHead
        eyebrow='The journey'
        heading={
          <>
            From a corner of the street, to{' '}
            <span style={{ color: 'var(--rausch)' }}>
              a corner of your couch
            </span>
          </>
        }
        subheading='Four small acts, one whole life.'
      />

      <div className='donate-journey-grid'>
        {DONATION_JOURNEY.map((journeyStep, index) => (
          <div
            key={journeyStep.step}
            className='donate-journey-step relative'
          >
            <div
              className='rounded-2xl mb-6'
              style={{
                height: 152,
                background: 'var(--canvas)',
                border: '1px solid var(--hairline-soft)',
                padding: 16,
              }}
            >
              <journeyStep.Vignette />
            </div>
            <div className='flex items-baseline gap-2'>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--rausch)',
                  letterSpacing: '0.1em',
                }}
              >
                {journeyStep.step}
              </span>
              <h3 style={{ fontSize: 22 }}>{journeyStep.title}</h3>
            </div>
            <p
              style={{
                marginTop: 10,
                fontSize: 14,
                color: 'var(--ink-2)',
                lineHeight: 1.6,
              }}
            >
              {journeyStep.body}
            </p>

            {index < DONATION_JOURNEY.length - 1 && (
              <span
                className='donate-journey-arrow absolute'
                aria-hidden
                style={{
                  top: 60,
                  right: -18,
                  color: 'var(--peach-stroke)',
                }}
              >
                <svg width='28' height='14' viewBox='0 0 28 14' fill='none'>
                  <path
                    d='M2 7 H24 M18 2 L24 7 L18 12'
                    stroke='currentColor'
                    strokeWidth='1.6'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    fill='none'
                  />
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
