import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

interface ShelterDetailVisitCtaProps {
  shelterId: number
  shelterName: string
  shelterBg: string | null
  shelterSvg: ReactNode | null
}

export default function ShelterDetailVisitCta({
  shelterId,
  shelterName,
  shelterBg,
  shelterSvg,
}: ShelterDetailVisitCtaProps) {
  return (
    <section className='section' style={{ padding: '28px 0 24px' }}>
      <div
        className='relative overflow-hidden rounded-3xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center'
        style={{
          background: `
            radial-gradient(ellipse 50% 60% at 100% 100%, rgba(232,146,60,0.16) 0%, transparent 55%),
            radial-gradient(ellipse 55% 50% at 0% 0%, rgba(29,117,117,0.10) 0%, transparent 55%),
            linear-gradient(140deg, #FDFAF4 0%, #F6EFD9 100%)
          `,
          border: '1px solid var(--hairline-soft)',
        }}
      >
        <div className='flex items-center gap-5 md:gap-6'>
          {shelterBg && shelterSvg && (
            <div
              aria-hidden='true'
              className='hidden sm:flex shrink-0 rounded-2xl overflow-hidden border border-(--hairline-soft) items-center justify-center w-28 h-28'
              style={{
                background: shelterBg,
              }}
            >
              <div style={{ transform: 'scale(1.05)' }}>{shelterSvg}</div>
            </div>
          )}
          <div>
            <span className='inline-flex items-center gap-1 text-[11px] tracking-widest uppercase font-bold text-(--muted)'>
              Next <ArrowRight size={11} />
            </span>
            <h3
              className='mt-1.5 text-[22px] sm:text-[26px] md:text-[28px] leading-tight'
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Meet the pets at{' '}
              <span style={{ color: 'var(--rausch)' }}>{shelterName}</span>
            </h3>
            <p className='mt-2 text-(--ink-2) text-[14px] max-w-150 leading-relaxed'>
              Browse every pet currently in our care, read their stories, and
              start an application for the one you connect with.
            </p>
          </div>
        </div>
        <Link
          to={`/shelters/${shelterId}/pets`}
          className='btn btn-primary btn-lg justify-self-start md:justify-self-end whitespace-nowrap inline-flex items-center gap-2'
        >
          Meet our pets <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}
