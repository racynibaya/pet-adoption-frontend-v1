import Eyebrow from '@/components/ui/Eyebrow'
import type { ShelterDetailModel } from '../types'

interface ShelterDetailHeroProps {
  shelter: ShelterDetailModel
}

export default function ShelterDetailHero({ shelter }: ShelterDetailHeroProps) {
  return (
    <section
      className='section relative overflow-hidden rounded-[28px] p-6 md:p-12 grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-10 items-center'
      style={{
        background: `
          radial-gradient(ellipse 58% 54% at 82% 14%, rgba(29,117,117,0.15) 0%, transparent 53%),
          radial-gradient(ellipse 48% 52% at 18% 86%, rgba(232,146,60,0.18) 0%, transparent 54%),
          linear-gradient(156deg, #FDFAF4 0%, #F0E8D0 100%)
        `,
      }}
    >
      <div
        className='rounded-3xl overflow-hidden border border-(--hairline-soft) flex items-center justify-center transition-transform duration-500 ease-out hover:scale-[1.02]'
        style={{
          background: shelter.bg,
          aspectRatio: '4 / 3',
          boxShadow: '0 12px 48px rgba(28,44,44,0.10), 0 2px 12px rgba(28,44,44,0.06)',
        }}
      >
        <div style={{ transform: 'scale(1.8)' }}>{shelter.svg}</div>
      </div>

      <div>
        <Eyebrow>Verified shelter</Eyebrow>
        <h1
          className='mt-4 text-[34px] sm:text-[44px] md:text-[56px] leading-[1.04]'
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {shelter.name}
        </h1>
        {shelter.description && (
          <p className='text-(--ink-2) mt-5 max-w-150 text-[16px] leading-relaxed'>
            {shelter.description}
          </p>
        )}
        <div className='mt-7 flex flex-col gap-2.5 text-[14px] text-(--ink-2)'>
          <span className='flex items-start gap-2.5'>
            <span aria-hidden='true'>📍</span>
            <span>{shelter.address}</span>
          </span>
          <a
            href={`mailto:${shelter.contactEmail}`}
            className='flex items-start gap-2.5 text-(--ink-2) no-underline hover:text-(--rausch) transition-colors'
          >
            <span aria-hidden='true'>✉️</span>
            <span>{shelter.contactEmail}</span>
          </a>
          <a
            href={`tel:${shelter.phoneNumber.replace(/\s+/g, '')}`}
            className='flex items-start gap-2.5 text-(--ink-2) no-underline hover:text-(--rausch) transition-colors'
          >
            <span aria-hidden='true'>📞</span>
            <span>{shelter.phoneNumber}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
