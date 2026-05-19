import { Link } from 'react-router-dom'
import HeartIcon from '@/icons/HeartIcon'
import { ageLabel, genderLabel, speciesLabel, type PetCard } from '@/data/pets'
import ShelterDetailStatusBadge from './ShelterDetailStatusBadge'

interface ShelterDetailPetCardProps {
  pet: PetCard
  isSaved: boolean
  onToggleSave: () => void
}

export default function ShelterDetailPetCard({ pet, isSaved, onToggleSave }: ShelterDetailPetCardProps) {
  const { id: petId, name, species, breed, ageMonths, gender, size, status, bg, svg, imageUrl } = pet
  return (
    <article className='group bg-(--canvas) rounded-[20px] overflow-hidden border border-(--hairline-soft) flex flex-col min-w-0 transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-1 hover:shadow-(--shadow-lift)'>
      <Link
        to={`/pets/${petId}`}
        className='relative flex items-center justify-center overflow-hidden'
        style={{ aspectRatio: '4 / 3', background: bg, display: 'flex' }}
        tabIndex={-1}
        aria-label={`View details for ${name}`}
      >
        <span className='absolute top-3 left-3 z-2'>
          <ShelterDetailStatusBadge status={status} />
        </span>
        <button
          className={`absolute top-3 right-3 z-3 w-9 h-9 rounded-full border-0 flex items-center justify-center cursor-pointer backdrop-blur-sm transition-[transform,color,background,box-shadow] duration-150 ease-out hover:scale-[1.14] active:scale-[0.88] ${
            isSaved ? 'text-[#e0465a] bg-[#fff0f2]' : 'text-(--muted) bg-white/90'
          }`}
          style={{ boxShadow: '0 2px 8px rgba(18,52,64,0.14)' }}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onToggleSave()
          }}
          aria-label={isSaved ? 'Remove from saved' : 'Save pet'}
        >
          <HeartIcon width={16} height={16} filled={isSaved} />
        </button>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            loading='lazy'
            className='absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.06]'
          />
        ) : (
          <div className='transition-transform duration-300 ease-out group-hover:scale-[1.06] max-w-full h-auto'>
            {svg}
          </div>
        )}
      </Link>
      <div className='p-5.5 pb-6 flex-1 flex flex-col'>
        <Link to={`/pets/${petId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 className='text-[20px] hover:text-(--rausch) transition-colors duration-150'>
            {name}
          </h3>
        </Link>
        <p className='text-(--muted) text-[14px] mt-1.5 flex-1'>
          {breed} · {speciesLabel(species)} · {genderLabel(gender)}
        </p>
        <p className='text-[13px] text-(--ink-2) mt-1'>
          Age: {ageLabel(ageMonths)} · Size: {size}
        </p>
        <div className='mt-4.5 pt-4 border-t border-(--hairline-soft) flex justify-between items-center'>
          <Link to={`/pets/${petId}`} className='btn btn-soft btn-sm'>
            View details
          </Link>
          <Link to='/contact' className='btn btn-primary btn-sm'>
            Apply to adopt →
          </Link>
        </div>
      </div>
    </article>
  )
}
