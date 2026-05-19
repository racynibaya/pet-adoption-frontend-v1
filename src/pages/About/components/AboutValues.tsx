import SectionHead from '@/components/ui/SectionHead'
import { VALUES } from '../data'

export default function AboutValues() {
  return (
    <section className='section-tight'>
      <SectionHead
        eyebrow='What we believe'
        heading="Six things we won't compromise on"
      />
      <div className='r-grid-3 gap-6'>
        {VALUES.map(({ bg, title, desc, icon }) => (
          <div
            key={title}
            className='bg-(--canvas) border border-(--hairline-soft) rounded-2xl flex flex-row gap-3.5 items-start transition-[transform,box-shadow] duration-200 hover:-translate-y-0.75 hover:[box-shadow:var(--shadow-lift)]'
            style={{ padding: '16px 18px' }}
          >
            <div
              className='w-9 h-9 shrink-0 rounded-[10px] flex items-center justify-center mt-0.5'
              style={{ background: bg }}
            >
              {icon}
            </div>
            <div className='flex-1 min-w-0'>
              <h3 style={{ fontSize: 14, marginBottom: 5 }}>{title}</h3>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
