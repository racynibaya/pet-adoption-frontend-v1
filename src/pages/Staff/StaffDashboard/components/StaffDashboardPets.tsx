import { Link } from 'react-router-dom'
import { ageLabel, type PetCard } from '@/data/pets'

interface StaffDashboardPetsProps {
  pets: PetCard[]
}

export default function StaffDashboardPets({ pets }: StaffDashboardPetsProps) {
  return (
    <div className='staff-card'>
      <div className='staff-card-header'>
        <h3 className='staff-card-title'>Pets in Shelter</h3>
        <Link
          to='/staff/pets'
          style={{ fontSize: 12.5, color: '#E8923C', textDecoration: 'none', fontWeight: 500 }}
        >
          Manage →
        </Link>
      </div>
      <div style={{ padding: '8px 0' }}>
        {pets.map((pet) => (
          <div
            key={pet.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 20px',
              borderBottom: '1px solid var(--hairline-soft)',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: pet.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  transform: 'scale(0.24)',
                  transformOrigin: 'center',
                  width: 200,
                  height: 160,
                  flexShrink: 0,
                }}
              >
                <img src={pet.imageUrl} />
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 13.5, color: 'var(--ink)' }}>
                {pet.name}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 1 }}>
                {pet.breed} · {ageLabel(pet.ageMonths)}
              </div>
            </div>
            <span
              className={`s-badge ${pet.status === 'AVAILABLE' ? 's-badge-available' : 's-badge-pending'}`}
            >
              {pet.status === 'AVAILABLE' ? 'Available' : 'Pending'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
