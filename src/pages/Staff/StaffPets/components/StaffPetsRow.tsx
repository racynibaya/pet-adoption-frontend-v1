import { Link } from 'react-router-dom'
import { ageLabel, speciesLabel, genderLabel, sizeLabel, type PetCard } from '@/data/pets'
import StaffPetsStatusButton from './StaffPetsStatusButton'
import { EditIcon, TrashIcon } from '../assets'

interface StaffPetsRowProps {
  pet: PetCard
  onToggleStatus: (id: number, current: 'AVAILABLE' | 'PENDING') => void
  onRequestDelete: (id: number) => void
}

export default function StaffPetsRow({ pet, onToggleStatus, onRequestDelete }: StaffPetsRowProps) {
  return (
    <tr>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: pet.bg,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                transform: 'scale(0.22)',
                transformOrigin: 'center',
                width: 200,
                height: 160,
                flexShrink: 0,
              }}
            >
              <img src={pet.imageUrl} />
            </div>
          </div>
          <span style={{ fontWeight: 600, fontSize: 13.5 }}>{pet.name}</span>
        </div>
      </td>
      <td>
        <div style={{ fontSize: 13 }}>{speciesLabel(pet.species)}</div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 1 }}>{pet.breed}</div>
      </td>
      <td style={{ fontSize: 13.5 }}>{ageLabel(pet.ageMonths)}</td>
      <td style={{ fontSize: 13.5 }}>{genderLabel(pet.gender)}</td>
      <td style={{ fontSize: 13.5 }}>{sizeLabel(pet.size)}</td>
      <td>
        <div style={{ fontSize: 13 }}>{pet.shelterName}</div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 1 }}>{pet.shelterCity}</div>
      </td>
      <td>
        <StaffPetsStatusButton
          status={pet.status}
          onToggle={() => onToggleStatus(pet.id, pet.status as 'AVAILABLE' | 'PENDING')}
        />
      </td>
      <td>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
          <Link to={`/staff/pets/${pet.id}/edit`} className='staff-action-btn staff-btn-edit'>
            <EditIcon />
            Edit
          </Link>
          <button onClick={() => onRequestDelete(pet.id)} className='staff-action-btn staff-btn-delete'>
            <TrashIcon />
            Remove
          </button>
        </div>
      </td>
    </tr>
  )
}
