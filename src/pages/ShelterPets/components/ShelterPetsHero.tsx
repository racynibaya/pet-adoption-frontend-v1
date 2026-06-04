import Eyebrow from '@/components/ui/Eyebrow'

interface ShelterPetsHeroProps {
  shelterName: string
  availableCount: number
  totalCount: number
}

export default function ShelterPetsHero({
  shelterName,
  availableCount,
  totalCount,
}: ShelterPetsHeroProps) {
  return (
    <section className='section' style={{ padding: '12px 0 20px' }}>
      <div className='flex flex-col gap-3 max-w-3xl'>
        <div className='flex items-center gap-3'>
          <span
            aria-hidden='true'
            className='block h-px w-12 rounded-full'
            style={{ background: 'var(--rausch)' }}
          />
          <Eyebrow>All pets at this shelter</Eyebrow>
        </div>
        <h1
          className='text-[28px] sm:text-[34px] md:text-[40px] leading-[1.1]'
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Pets at{' '}
          <span style={{ color: 'var(--rausch)' }}>{shelterName}</span>
        </h1>
        <p className='text-(--ink-2) text-[14px] sm:text-[15px] leading-relaxed max-w-150'>
          Every pet on this page is cared for by the {shelterName} team. Tap
          any card to read their full story and start an application.
        </p>
        <div className='flex flex-wrap items-center gap-2 mt-1 text-[12px] font-bold'>
          <span
            className='px-3 py-1 rounded-full'
            style={{ background: '#e6f4f0', color: '#1D7575' }}
          >
            {availableCount} available now
          </span>
          <span
            className='px-3 py-1 rounded-full text-(--muted)'
            style={{ background: 'var(--soft)' }}
          >
            {totalCount} in our care
          </span>
        </div>
      </div>
    </section>
  )
}
