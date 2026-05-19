import type { AdoptionRequest } from '@/context/useStaff'
import type { PetCard } from '@/data/pets'
import StaffAdoptionsRow from './StaffAdoptionsRow'

interface StaffAdoptionsTableProps {
  adoptions: AdoptionRequest[]
  pets: PetCard[]
  onUpdate: (id: number, status: AdoptionRequest['status']) => void
}

export default function StaffAdoptionsTable({ adoptions, pets, onUpdate }: StaffAdoptionsTableProps) {
  if (adoptions.length === 0) {
    return (
      <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>
        No applications match your filters.
      </div>
    )
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="staff-table">
        <thead>
          <tr>
            <th>Applicant</th>
            <th>Pet</th>
            <th>Contact</th>
            <th>Submitted</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {adoptions.map(a => (
            <StaffAdoptionsRow
              key={a.id}
              adoption={a}
              pet={pets.find(p => p.id === a.petId)}
              onUpdate={onUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
