import PawIcon from '@/icons/PawIcon'
import { ArrowRight } from 'lucide-react'
import { chapterCard } from '../constants/petApply.constants'

interface PetApplySignupGateProps {
  petName: string
  onOpenSignup: () => void
  onOpenSignin: () => void
}

export default function PetApplySignupGate({ petName, onOpenSignup, onOpenSignin }: PetApplySignupGateProps) {
  return (
    <div
      style={{
        ...chapterCard,
        textAlign: 'center',
        padding: 'clamp(36px, 7vw, 56px) clamp(22px, 6vw, 48px)',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, var(--cream) 0%, white 70%)',
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: 'linear-gradient(145deg, #FDDDB0 0%, #FEF5E2 100%)',
          border: '1.5px solid #E8C28A',
          margin: '0 auto 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 18px -6px rgba(232,146,60,0.4)',
        }}
        aria-hidden
      >
        <PawIcon width={28} height={28} />
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 28,
          fontWeight: 700,
          color: 'var(--ink)',
          margin: '0 0 12px',
          letterSpacing: '-0.018em',
          lineHeight: 1.2,
        }}
      >
        First, create your account
      </h2>
      <p style={{ fontSize: 14.5, color: 'var(--muted)', lineHeight: 1.65, margin: '0 auto 28px', maxWidth: 380 }}>
        The shelter caring for {petName} will need a way to reach you. Setting
        up your KodaNest account takes about a minute.
      </p>
      <button
        type='button'
        onClick={onOpenSignup}
        style={{
          padding: '14px 32px',
          background: 'var(--rausch)',
          color: 'white',
          border: 'none',
          borderRadius: 12,
          fontSize: 15,
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          boxShadow: '0 4px 16px -4px rgba(232,146,60,0.5)',
          transition: 'background 160ms var(--ease-out), transform 120ms var(--ease-out)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
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
        Create account <ArrowRight size={15} />
      </button>
      <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 18, marginBottom: 0 }}>
        Already have one?{' '}
        <button
          type='button'
          onClick={onOpenSignin}
          style={{
            background: 'transparent',
            border: 'none',
            padding: 0,
            color: '#1D7575',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            textDecoration: 'underline',
            textUnderlineOffset: 3,
            fontFamily: 'var(--font-body)',
          }}
        >
          Sign in instead
        </button>
      </p>
    </div>
  )
}
