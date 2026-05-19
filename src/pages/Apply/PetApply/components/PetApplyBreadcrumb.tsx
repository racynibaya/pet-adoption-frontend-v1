import { Link } from 'react-router-dom'

interface PetApplyBreadcrumbProps {
  petId: number
  petName: string
}

export default function PetApplyBreadcrumb({ petId, petName }: PetApplyBreadcrumbProps) {
  return (
    <nav
      style={{
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        fontSize: 13,
        color: 'var(--muted)',
        marginBottom: 24,
      }}
    >
      <Link to='/pets' style={{ color: 'var(--muted)', textDecoration: 'none', fontWeight: 600 }}>
        All pets
      </Link>
      <span style={{ opacity: 0.4 }}>/</span>
      <Link to={`/pets/${petId}`} style={{ color: 'var(--muted)', textDecoration: 'none', fontWeight: 600 }}>
        {petName}
      </Link>
      <span style={{ opacity: 0.4 }}>/</span>
      <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Apply</span>
    </nav>
  )
}
