import type { PetCard } from '@/data/pets'

interface StaffPetsStatusButtonProps {
  status: PetCard['status']
  onToggle: () => void
}

export default function StaffPetsStatusButton({ status, onToggle }: StaffPetsStatusButtonProps) {
  const cls =
    status === 'AVAILABLE'
      ? 'is-available'
      : status === 'PENDING'
        ? 'is-pending'
        : 'is-adopted'
  const label =
    status === 'AVAILABLE' ? 'Available' : status === 'PENDING' ? 'In review' : 'Placed'
  const locked = status === 'ADOPTED'
  return (
    <button
      type='button'
      onClick={() => { if (!locked) onToggle() }}
      className={`staff-pill ${cls}`}
      style={{
        border: 'none',
        cursor: locked ? 'default' : 'pointer',
        appearance: 'none',
        fontFamily: 'inherit',
      }}
      title={locked ? 'Adopted — cannot toggle' : 'Click to toggle status'}
    >
      {label}
    </button>
  )
}
