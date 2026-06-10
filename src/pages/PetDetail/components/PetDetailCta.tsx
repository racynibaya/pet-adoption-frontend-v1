import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface PetDetailCtaProps {
  petId: number
  petName: string
  status: 'AVAILABLE' | 'PENDING' | 'ADOPTED'
}

const HEADING: Record<PetDetailCtaProps['status'], (name: string) => string> = {
  AVAILABLE: (n) => `Ready to adopt ${n}?`,
  PENDING: (n) => `${n} is in review`,
  ADOPTED: (n) => `${n} has found a home`,
}

const SUBHEADING: Record<PetDetailCtaProps['status'], string> = {
  AVAILABLE: 'A real shelter staff member reviews every request.',
  PENDING:
    'A pending application is being reviewed. Browse other pets while this one is decided.',
  ADOPTED: 'This pet has been placed. Browse others looking for a family.',
}

export default function PetDetailCta({ petId, petName, status }: PetDetailCtaProps) {
  const canApply = status === 'AVAILABLE'
  return (
    <div
      style={{
        padding: '28px 30px',
        borderRadius: 22,
        background: `
          radial-gradient(ellipse 70% 60% at 100% 0%, rgba(29,117,117,0.12) 0%, transparent 55%),
          radial-gradient(ellipse 50% 60% at 0% 100%, rgba(232,146,60,0.14) 0%, transparent 55%),
          linear-gradient(135deg, var(--ink) 0%, #2a3f3f 100%)
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        flexWrap: 'wrap',
      }}
    >
      <div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            fontWeight: 700,
            color: '#fff',
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          {HEADING[status](petName)}
        </h3>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 6, marginBottom: 0 }}>
          {SUBHEADING[status]}
        </p>
      </div>
      <Link
        to={canApply ? `/pets/${petId}/apply` : '/pets'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '13px 28px',
          borderRadius: 12,
          background: canApply ? 'var(--rausch)' : 'rgba(255,255,255,0.12)',
          color: '#fff',
          fontWeight: 700,
          fontSize: 15,
          textDecoration: 'none',
          letterSpacing: '-0.01em',
          whiteSpace: 'nowrap',
          transition: 'background 150ms ease, transform 150ms ease',
          boxShadow: canApply ? '0 4px 20px rgba(232,146,60,0.4)' : 'none',
          border: canApply ? 'none' : '1px solid rgba(255,255,255,0.18)',
        }}
        onMouseEnter={(e) => {
          if (canApply) {
            e.currentTarget.style.background = 'var(--rausch-active)'
          } else {
            e.currentTarget.style.background = 'rgba(255,255,255,0.18)'
          }
          e.currentTarget.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = canApply
            ? 'var(--rausch)'
            : 'rgba(255,255,255,0.12)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        {canApply ? 'Apply to adopt' : 'Browse other pets'} <ArrowRight size={15} />
      </Link>
    </div>
  )
}
