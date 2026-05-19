import Eyebrow from '@/components/ui/Eyebrow'
import type { SpeciesFilter } from '@/data/pets'
import { speciesFilterLabel } from '@/data/pets'
import { SPECIES_FILTERS } from '../constants/services.constants'
import { CatBubble, DogBubble, HeroIllustration } from '../assets'

interface ServicesHeroProps {
  activeSpecies: SpeciesFilter
  onSpeciesChange: (s: SpeciesFilter) => void
}

export default function ServicesHero({ activeSpecies, onSpeciesChange }: ServicesHeroProps) {
  return (
    <section
      className='relative overflow-hidden rounded-[28px] mt-6 p-6 md:p-[72px_64px] grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12 items-center'
      style={{
        background: `
          radial-gradient(ellipse 62% 52% at 88% 22%, rgba(29,117,117,0.15) 0%, transparent 54%),
          radial-gradient(ellipse 48% 58% at 12% 80%, rgba(232,146,60,0.18) 0%, transparent 53%),
          linear-gradient(160deg, #FDFAF4 0%, #F0E8D0 100%)
        `,
      }}
    >
      <div>
        <Eyebrow>Browse pets</Eyebrow>
        <h1 className='mt-4 text-[30px] sm:text-[40px] md:text-[64px] leading-[1.04]'>
          Find your perfect
          <br />
          companion
        </h1>
        <p className='text-(--ink-2) mt-4.5 max-w-120 text-[17px]'>
          Every pet listed here is available for adoption from a verified
          shelter. Filter by species, size, and gender to find the match
          that's right for your home.
        </p>
        <div className='flex flex-wrap gap-2.5 mt-8'>
          {SPECIES_FILTERS.map((s) => (
            <span
              key={s}
              className={`chip${activeSpecies === s ? ' active' : ''}`}
              onClick={() => onSpeciesChange(s)}
              role='button'
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSpeciesChange(s)}
            >
              {speciesFilterLabel(s)}
            </span>
          ))}
        </div>
      </div>

      <div className='hero-side-illu relative h-90'>
        <span
          className='absolute w-24 h-24 rounded-full overflow-hidden border-4 border-white top-15 right-[40%]'
          style={{ boxShadow: '0 12px 32px rgba(18,52,64,0.14)' }}
        >
          <CatBubble />
        </span>
        <span
          className='absolute w-20 h-20 rounded-full overflow-hidden border-4 border-white bottom-17.5 right-15'
          style={{ boxShadow: '0 12px 32px rgba(18,52,64,0.14)' }}
        >
          <DogBubble />
        </span>
        <HeroIllustration />
      </div>
    </section>
  )
}
