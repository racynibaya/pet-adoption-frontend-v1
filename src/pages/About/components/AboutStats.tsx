import { ABOUT_STATS } from '../data'

export default function AboutStats() {
  return (
    <section className='about-stats-section'>
      <div
        className='r-grid-4 rounded-[28px] text-white about-stats-card'
        style={{ gap: 32, background: 'var(--ink)' }}
      >
        {ABOUT_STATS.map(({ num, lab }) => (
          <div key={lab} className='text-left'>
            <div
              className='about-stats-num text-white font-semibold tracking-tight'
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {num}
            </div>
            <div className='text-[14px] mt-2' style={{ color: '#b8cec0' }}>
              {lab}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
