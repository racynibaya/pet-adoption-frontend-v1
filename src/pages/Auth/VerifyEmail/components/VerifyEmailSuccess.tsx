import { BigCheckIcon } from '../assets'

interface VerifyEmailSuccessProps {
  onGoHome: () => void
}

export default function VerifyEmailSuccess({ onGoHome }: VerifyEmailSuccessProps) {
  return (
    <div
      className='flex flex-col items-center text-center gap-6 py-12'
      style={{ animation: 'kv-fadeUp 500ms cubic-bezier(0.2,0,0,1) both' }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 40%, #FDDDB0 0%, #FEF5E2 100%)',
          border: '1.5px solid #E8C28A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(232,146,60,0.18), 0 2px 8px rgba(232,146,60,0.08)',
          animation: 'kv-float 3.2s ease-in-out infinite',
          flexShrink: 0,
        }}
        aria-hidden='true'
      >
        <BigCheckIcon />
      </div>

      <div className='flex flex-col gap-2.5'>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 34,
            fontWeight: 700,
            color: 'var(--ink)',
            letterSpacing: '-0.022em',
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          You're verified!
        </h1>
        <p
          style={{
            color: 'var(--muted)',
            fontSize: 15,
            lineHeight: 1.65,
            maxWidth: 340,
            margin: '0 auto',
          }}
        >
          Your KodaNest account is now active. Sign in to start your adoption journey.
        </p>
      </div>

      <button
        className='btn btn-primary btn-lg'
        onClick={onGoHome}
        style={{ minWidth: 220 }}
      >
        Go to KodaNest →
      </button>

      <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: -8, margin: '0' }}>
        Use the Sign In button in the navigation bar.
      </p>
    </div>
  )
}
