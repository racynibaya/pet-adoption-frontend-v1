import { Link } from 'react-router-dom'
import { ageLabel, type PetCard } from '@/data/pets'

interface UserDashboardPetCardProps {
  pet: PetCard
}

export default function UserDashboardPetCard({ pet }: UserDashboardPetCardProps) {
  return (
    <Link to={`/pets/${pet.id}`} className='user-pet-card'>
      <div className='user-pet-thumb' style={{ background: pet.bg }}>
        <img src={pet.imageUrl} />
      </div>
      <div className='user-pet-body'>
        <h3 className='user-pet-name'>{pet.name}</h3>
        <div className='user-pet-meta'>
          <span>{pet.breed}</span>
          <span>·</span>
          <span>{ageLabel(pet.ageMonths)}</span>
        </div>
        {pet.shelterName && (
          <div className='user-pet-shelter'>{pet.shelterName}</div>
        )}
      </div>
    </Link>
  )
}
