import { IMPACT_STATS } from '../constants/donate.constants';

export default function DonationStats() {
  return (
    <section className='section-tight' aria-label='Impact this year'>
      <div
        className='grid gap-4'
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        }}
      >
        {IMPACT_STATS.map((stat, index) => (
          <div
            key={stat.label}
            className='text-center rounded-2xl'
            style={{
              padding: 'clamp(28px, 3vw, 40px) clamp(18px, 2vw, 28px)',
              background: index % 2 === 0 ? 'var(--cream)' : 'var(--mint)',
              border: '1px solid var(--hairline-soft)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 3.4vw, 40px)',
                fontWeight: 600,
                color: 'var(--ink)',
                lineHeight: 1,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 13,
                color: 'var(--ink-2)',
                letterSpacing: '0.02em',
                lineHeight: 1.4,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
