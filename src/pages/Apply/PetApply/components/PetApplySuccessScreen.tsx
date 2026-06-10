import { Link } from 'react-router-dom'
import PawIcon from '@/icons/PawIcon'
import { chapterCard } from '../constants/petApply.constants'

interface PetApplySuccessScreenProps {
  petId: number
  petName: string
}

const NEXT_STEPS = [
  { n: '①', t: 'Shelter staff review', d: 'Usually within a few days.' },
  { n: '②', t: 'They reach out by email', d: 'Sometimes with a follow-up question or two.' },
  { n: '③', t: 'Meet & greet', d: 'If it feels right on both sides, you visit.' },
]

export default function PetApplySuccessScreen({ petId, petName }: PetApplySuccessScreenProps) {
  return (
    <div
      style={{
        ...chapterCard,
        padding: 'clamp(40px, 8vw, 64px) clamp(22px, 6vw, 48px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div style={{ transform: 'scale(8)' }}>
          <PawIcon width={64} height={64} />
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <p
          style={{
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-teal-500)',
            margin: '0 0 14px',
          }}
        >
          Your application
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 4.5vw, 48px)',
            fontWeight: 700,
            color: 'var(--ink)',
            margin: '0 0 14px',
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
          }}
        >
          Letter sent.
        </h2>
        <p style={{ fontSize: 15.5, color: 'var(--muted)', lineHeight: 1.7, margin: '0 auto 36px', maxWidth: 420 }}>
          Thank you for writing to us about {petName}. Here's what happens next.
        </p>
        <ol
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 auto 36px',
            maxWidth: 380,
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          {NEXT_STEPS.map((step) => (
            <li
              key={step.n}
              style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 16, alignItems: 'baseline' }}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--rausch)', fontWeight: 500 }}>
                {step.n}
              </span>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--ink)', margin: 0 }}>
                  {step.t}
                </p>
                <p style={{ fontSize: 13.5, color: 'var(--muted)', margin: '2px 0 0', lineHeight: 1.55 }}>
                  {step.d}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <Link
          to={`/pets/${petId}`}
          style={{
            display: 'inline-block',
            padding: '13px 28px',
            borderRadius: 12,
            background: 'var(--rausch)',
            color: 'white',
            fontSize: 14.5,
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 4px 16px -4px rgba(232,146,60,0.5)',
            transition: 'background 160ms var(--ease-out), transform 120ms var(--ease-out)',
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
          Back to {petName}'s page
        </Link>
      </div>
    </div>
  )
}
