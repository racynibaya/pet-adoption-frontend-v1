import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ageLabel, genderLabel, speciesLabel, type PetCard } from '@/data/pets'
import PetStatusBadge from './PetStatusBadge'
import PetThumb from './PetThumb'
import PetSaveButton from './PetSaveButton'

interface PetCardLargeProps {
  pet: PetCard
  /**
   * Whether to render the shelter line under the meta. Defaults to true when
   * `pet.shelterName` is present.
   */
  showShelter?: boolean
}

export default function PetCardLarge({ pet, showShelter }: PetCardLargeProps) {
  const { id, name, species, breed, ageMonths, gender, size, status, shelterName, bg } = pet
  const shelterVisible =
    showShelter === undefined ? Boolean(shelterName) : showShelter
  const canApply = status === 'AVAILABLE'

  return (
    <article className='group bg-(--canvas) rounded-20 overflow-hidden border border-(--hairline-soft) flex flex-col min-w-0 transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-1 hover:shadow-(--shadow-lift)'>
      <Link
        to={`/pets/${id}`}
        className='relative flex items-center justify-center overflow-hidden'
        style={{ aspectRatio: '4 / 3', background: bg, display: 'flex' }}
        tabIndex={-1}
        aria-label={`View details for ${name}`}
      >
        <PetStatusBadge
          status={status}
          className='absolute top-3 left-3 z-2'
        />
        <PetSaveButton petId={id} petName={name} />
        <PetThumb
          pet={pet}
          imgClassName='absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.06]'
          svgClassName='transition-transform duration-300 ease-out group-hover:scale-[1.06] max-w-full h-auto'
        />
      </Link>
      <div className='p-5.5 pb-6 flex-1 flex flex-col'>
        <Link to={`/pets/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 className='text-20 hover:text-(--rausch) transition-colors duration-150'>
            {name}
          </h3>
        </Link>
        <p className='text-(--muted) text-14 mt-1.5 flex-1'>
          {breed} · {speciesLabel(species)} · {genderLabel(gender)}
        </p>
        <p className='text-13 text-(--ink-2) mt-1'>
          Age: {ageLabel(ageMonths)} · Size: {size}
        </p>
        {shelterVisible && shelterName && (
          <p className='text-13 text-(--ink-2) mt-1'>{shelterName}</p>
        )}
        <div className='mt-4.5 pt-4 border-t border-(--hairline-soft) flex justify-between items-center'>
          <Link to={`/pets/${id}`} className='btn btn-soft btn-sm'>
            View details
          </Link>
          {canApply && (
            <Link to={`/pets/${id}/apply`} className='btn btn-primary btn-sm inline-flex items-center gap-1'>
              Apply to adopt <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
