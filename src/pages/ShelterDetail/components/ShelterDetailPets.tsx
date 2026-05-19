import type { PetCard } from '@/data/pets'
import ShelterDetailPetCard from './ShelterDetailPetCard'

interface ShelterDetailPetsProps {
  shelterName: string
  pets: PetCard[]
  availableCount: number
  isSaved: (id: string) => boolean
  onToggleSave: (id: string) => void
}

export default function ShelterDetailPets({
  shelterName,
  pets,
  availableCount,
  isSaved,
  onToggleSave,
}: ShelterDetailPetsProps) {
  return (
    <section className='section'>
      <div className='flex flex-wrap items-end justify-between gap-4 mb-8'>
        <div>
          <h2
            className='text-[28px] sm:text-[34px] leading-tight'
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Meet our pets
          </h2>
          <p className='text-(--muted) text-[15px] mt-2 max-w-150'>
            Every animal here is cared for by the {shelterName} team. Click a
            pet to view their full story and start an application.
          </p>
        </div>
        <span
          className='text-[12px] font-bold px-3 py-1 rounded-full'
          style={{ background: '#e6f4f0', color: '#1D7575' }}
        >
          {availableCount} available
        </span>
      </div>

      {pets.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7'>
          {pets.map((pet) => (
            <ShelterDetailPetCard
              key={pet.id}
              pet={pet}
              isSaved={isSaved(String(pet.id))}
              onToggleSave={() => onToggleSave(String(pet.id))}
            />
          ))}
        </div>
      ) : (
        <div
          className='rounded-2xl border border-(--hairline-soft) p-10 text-center'
          style={{ background: 'var(--soft)' }}
        >
          <p
            className='text-[18px] text-(--ink) mb-2'
            style={{ fontFamily: 'var(--font-display)' }}
          >
            No pets listed right now
          </p>
          <p className='text-(--muted) text-[14px]'>
            {shelterName} doesn't have any pets in the system yet. Check back
            soon — new arrivals show up here as soon as the shelter lists them.
          </p>
        </div>
      )}
    </section>
  )
}
