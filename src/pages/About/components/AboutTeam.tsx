import SectionHead from '@/components/ui/SectionHead'
import { TEAM } from '../data'

export default function AboutTeam() {
  return (
    <section className='section-tight'>
      <SectionHead eyebrow='Leadership' heading='The humans behind the haven' />
      <div className='r-grid-4 gap-6'>
        {TEAM.map(({ name, role, bg, svg }) => (
          <div
            key={name}
            className='text-center transition-transform duration-200 hover:-translate-y-1.25 group'
          >
            <div
              className='rounded-20 overflow-hidden mb-3.5 transition-shadow duration-200 group-hover:[box-shadow:0_12px_32px_rgba(18,52,64,0.14)]'
              style={{ aspectRatio: '1/1', background: bg }}
            >
              {svg}
            </div>
            <h4 style={{ fontSize: 17 }}>{name}</h4>
            <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}>
              {role}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
