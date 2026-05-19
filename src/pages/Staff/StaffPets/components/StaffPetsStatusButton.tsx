import type { PetCard } from '@/data/pets'

interface StaffPetsStatusButtonProps {
  status: PetCard['status']
  onToggle: () => void
}

export default function StaffPetsStatusButton({ status, onToggle }: StaffPetsStatusButtonProps) {
  const cls =
    status === 'AVAILABLE' ? 's-badge-available' : status === 'PENDING' ? 's-badge-pending' : 's-badge-rejected'
  const label =
    status === 'AVAILABLE' ? '● Available' : status === 'PENDING' ? '◌ Pending' : '✓ Adopted'
  return (
    <button
      onClick={() => { if (status !== 'ADOPTED') onToggle() }}
      className={`s-badge ${cls}`}
      style={{
        cursor: status === 'ADOPTED' ? 'default' : 'pointer',
        border: 'none',
        background: undefined,
      }}
      title={status === 'ADOPTED' ? 'Adopted — cannot toggle' : 'Click to toggle status'}
    >
      {label}
    </button>
  )
}
