import SectionHead from '@/components/ui/SectionHead'
import { SHELTERS } from '../data'
import UseCasesShelterCard from './UseCasesShelterCard'

interface UseCasesShelterGridProps {
  countFor: (shelterId: number) => number
}

export default function UseCasesShelterGrid({ countFor }: UseCasesShelterGridProps) {
  return (
    <section className='section'>
      <SectionHead
        heading={`${SHELTERS.length} verified shelters`}
        subheading='Each organization listed here has been reviewed by the KodaNest team. Staff manage their own pet listings and applications.'
      />
      <div
        className='grid gap-5 mt-12'
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}
      >
        {SHELTERS.map((shelter) => (
          <UseCasesShelterCard
            key={shelter.id}
            shelter={shelter}
            availableCount={countFor(shelter.id)}
          />
        ))}
      </div>
    </section>
  )
}
