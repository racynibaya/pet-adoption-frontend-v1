import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'

interface StaffPetFormAccessDeniedProps {
  petName: string | undefined
  shelterName: string | undefined
}

export default function StaffPetFormAccessDenied({ petName, shelterName }: StaffPetFormAccessDeniedProps) {
  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <div className="staff-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Link to="/staff/pets" style={{ fontSize: 12.5, color: 'var(--muted)', textDecoration: 'none' }}>Pets</Link>
            <span style={{ color: 'var(--muted)', fontSize: 12 }}>›</span>
            <span style={{ fontSize: 12.5, color: 'var(--ink-2)' }}>Access restricted</span>
          </div>
          <h1 className="staff-page-title">Access restricted</h1>
        </div>
      </div>

      <div className="staff-page-body" style={{ padding: '48px 32px', display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            maxWidth: 480,
            width: '100%',
            background: 'white',
            borderRadius: 16,
            padding: '40px 36px',
            boxShadow: '0 8px 30px rgba(29,34,53,0.06)',
            border: '1.5px solid var(--hairline)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: '#fef1e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <Lock size={28} color='#a05818' strokeWidth={2} />
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ink)', margin: '0 0 10px', letterSpacing: '-0.01em' }}>
            This pet isn't yours to edit
          </h2>

          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.55, margin: '0 0 28px' }}>
            {petName ?? 'This pet'} belongs to {shelterName || 'another shelter'}.
            Only staff from that shelter — or an administrator — can edit it.
          </p>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/staff/pets"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                padding: '10px 20px',
                background: '#E8923C',
                color: 'white',
                borderRadius: 11,
                fontWeight: 600,
                fontSize: 13.5,
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(232,146,60,0.3)',
              }}
            >
              Back to pets
            </Link>
            <Link
              to="/staff/dashboard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '10px 20px',
                background: 'white',
                color: 'var(--ink-2)',
                border: '1.5px solid var(--hairline)',
                borderRadius: 11,
                fontWeight: 600,
                fontSize: 13.5,
                textDecoration: 'none',
              }}
            >
              Go to dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
