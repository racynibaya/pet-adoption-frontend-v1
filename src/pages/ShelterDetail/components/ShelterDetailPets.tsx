import { PawPrint } from 'lucide-react'
import type { PetCard } from '@/data/pets'
import PetCardLarge from '@/components/pet/PetCardLarge'

interface ShelterDetailPetsProps {
  shelterName: string
  pets: PetCard[]
  availableCount: number
}

export default function ShelterDetailPets({
  shelterName,
  pets,
  availableCount,
}: ShelterDetailPetsProps) {
  return (
    <section className='section' style={{ padding: '20px 0 24px' }}>
      <div className='flex flex-wrap items-end justify-between gap-3 mb-5'>
        <div>
          <h2
            className='text-24 sm:text-28 leading-tight'
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Meet our pets
          </h2>
          <p className='text-(--muted) text-14 mt-1 max-w-150'>
            Every animal here is cared for by the {shelterName} team. Click a
            pet to view their full story and start an application.
          </p>
        </div>
        <span
          className='text-12 font-bold px-3 py-1 rounded-full'
          style={{ background: '#e6f4f0', color: 'var(--color-teal-500)' }}
        >
          {availableCount} available
        </span>
      </div>

      {pets.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
          {pets.map((pet) => (
            <PetCardLarge key={pet.id} pet={pet} showShelter={false} />
          ))}
        </div>
      ) : (
        <div
          className='rounded-2xl border border-(--hairline-soft) px-6 py-8 flex flex-col sm:flex-row sm:items-center gap-5'
          style={{ background: 'var(--soft)' }}
        >
          <div
            aria-hidden='true'
            className='shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center'
            style={{ background: 'rgba(232,146,60,0.12)', color: 'var(--rausch)' }}
          >
            <PawPrint size={28} strokeWidth={2} />
          </div>
          <div className='flex-1'>
            <p
              className='text-18 text-(--ink) mb-1'
              style={{ fontFamily: 'var(--font-display)' }}
            >
              No pets listed right now
            </p>
            <p className='text-(--muted) text-13 leading-relaxed'>
              {shelterName} doesn't have any pets in the system yet. Check back
              soon — new arrivals show up here as soon as the shelter lists them.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
