import Eyebrow from '@/components/ui/Eyebrow'

interface ShelterDetailAboutProps {
  shelterName: string
  description: string
}

export default function ShelterDetailAbout({
  shelterName,
  description,
}: ShelterDetailAboutProps) {
  if (!description) return null

  return (
    <section className='section' style={{ padding: '36px 0 28px' }}>
      <div className='grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start'>
        <div className='flex md:flex-col items-center md:items-start gap-3'>
          <span
            aria-hidden='true'
            className='block h-px w-12 md:h-10 md:w-px rounded-full'
            style={{ background: 'var(--rausch)' }}
          />
          <Eyebrow>Our story</Eyebrow>
        </div>

        <figure className='relative'>
          <span
            aria-hidden='true'
            className='absolute -top-5 -left-2 md:-top-7 md:-left-5 select-none pointer-events-none leading-none'
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '88px',
              color: 'var(--rausch)',
              opacity: 0.18,
            }}
          >
            “
          </span>
          <blockquote
            className='relative text-20 sm:text-24 md:text-26 leading-snug text-(--ink)'
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {description}
          </blockquote>
          <figcaption className='mt-4 text-12 tracking-wide font-semibold text-(--muted) uppercase'>
            — {shelterName}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
