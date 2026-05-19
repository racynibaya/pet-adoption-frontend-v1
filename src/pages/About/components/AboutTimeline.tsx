import SectionHead from '@/components/ui/SectionHead'
import { TIMELINE } from '../data'

export default function AboutTimeline() {
  return (
    <section className='section-tight'>
      <SectionHead heading='How we got here' />
      <div className='about-timeline r-grid-4 gap-6 relative timeline-line'>
        {TIMELINE.map(({ yr, title, desc }) => (
          <div key={yr} className='relative pt-15 group'>
            <span className='tl-dot' />
            <div
              className='text-[24px] font-semibold mb-1.5'
              style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
            >
              {yr}
            </div>
            <h4>{title}</h4>
            <p style={{ fontSize: 14, color: 'var(--muted)' }}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
