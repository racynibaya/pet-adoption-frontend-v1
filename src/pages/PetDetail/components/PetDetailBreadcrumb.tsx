import { Link } from 'react-router-dom'
import { BackChevronIcon } from '../assets'

interface PetDetailBreadcrumbProps {
  petName: string
}

export default function PetDetailBreadcrumb({ petName }: PetDetailBreadcrumbProps) {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '24px 0 20px',
        fontSize: 13,
        color: 'var(--muted)',
      }}
    >
      <Link
        to='/pets'
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          color: 'var(--muted)',
          textDecoration: 'none',
          fontWeight: 600,
          transition: 'color 150ms ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
      >
        <BackChevronIcon />
        All pets
      </Link>
      <span style={{ opacity: 0.4 }}>/</span>
      <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{petName}</span>
    </nav>
  )
}
