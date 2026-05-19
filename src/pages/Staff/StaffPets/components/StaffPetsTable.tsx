import type { PetCard } from '@/data/pets'
import StaffPetsRow from './StaffPetsRow'

interface StaffPetsTableProps {
  pets: PetCard[]
  onToggleStatus: (id: number, current: 'AVAILABLE' | 'PENDING') => void
  onRequestDelete: (id: number) => void
}

export default function StaffPetsTable({ pets, onToggleStatus, onRequestDelete }: StaffPetsTableProps) {
  if (pets.length === 0) {
    return (
      <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>
        No pets match your search.
      </div>
    )
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className='staff-table'>
        <thead>
          <tr>
            <th>Pet</th>
            <th>Species / Breed</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Size</th>
            <th>Shelter</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <StaffPetsRow
              key={pet.id}
              pet={pet}
              onToggleStatus={onToggleStatus}
              onRequestDelete={onRequestDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
