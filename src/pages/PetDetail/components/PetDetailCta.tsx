import { Link } from 'react-router-dom'

interface PetDetailCtaProps {
  petId: number
  petName: string
}

export default function PetDetailCta({ petId, petName }: PetDetailCtaProps) {
  return (
    <div
      style={{
        padding: '28px 30px',
        borderRadius: 22,
        background: `
          radial-gradient(ellipse 70% 60% at 100% 0%, rgba(29,117,117,0.12) 0%, transparent 55%),
          radial-gradient(ellipse 50% 60% at 0% 100%, rgba(232,146,60,0.14) 0%, transparent 55%),
          linear-gradient(135deg, #1C2C2C 0%, #2a3f3f 100%)
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
          Ready to adopt {petName}?
        </h3>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 6, marginBottom: 0 }}>
          A real shelter staff member reviews every request.
        </p>
      </div>
      <Link
        to={`/pets/${petId}/apply`}
        style={{
          display: 'inline-block',
          padding: '13px 28px',
          borderRadius: 12,
          background: 'var(--rausch)',
          color: '#fff',
          fontWeight: 700,
          fontSize: 15,
          textDecoration: 'none',
          letterSpacing: '-0.01em',
          whiteSpace: 'nowrap',
          transition: 'background 150ms ease, transform 150ms ease',
          boxShadow: '0 4px 20px rgba(232,146,60,0.4)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--rausch-active)'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--rausch)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        Apply to adopt →
      </Link>
    </div>
  )
}
