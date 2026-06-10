import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import PawIcon from '@/icons/PawIcon'

/**
 * Landing page the backend redirects to after it verifies an email token
 * server-side (e.g. http://localhost:5173/email-verified). Unlike
 * /verify-email, this page does no token work — it simply celebrates the
 * confirmed account and points the new adopter toward their next step.
 */
export default function EmailVerifiedPage() {
  return (
    <div
      className='section'
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 48,
        paddingBottom: 80,
      }}
    >
      <style>{`
        @keyframes ev-pop {
          0% { opacity: 0; transform: scale(0.7); }
          60% { transform: scale(1.06); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes ev-fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ev-float {
          0%, 100% { transform: translateY(0) rotate(var(--r, 0deg)); }
          50% { transform: translateY(-9px) rotate(var(--r, 0deg)); }
        }
        @keyframes ev-ring {
          0% { opacity: 0.55; transform: scale(0.85); }
          100% { opacity: 0; transform: scale(1.5); }
        }
        @keyframes ev-drawCheck {
          to { stroke-dashoffset: 0; }
        }
        .ev-stagger { opacity: 0; animation: ev-fadeUp 520ms cubic-bezier(0.2,0,0,1) both; }
        .ev-paw { position: absolute; opacity: 0.45; animation: ev-float 4s ease-in-out infinite; }
      `}</style>

      <div
        style={{
          position: 'relative',
          maxWidth: 520,
          width: '100%',
          padding: '0 24px',
          textAlign: 'center',
        }}
      >
        {/* Floating paw accents */}
        <div
          className='ev-paw'
          aria-hidden='true'
          style={{ top: 8, left: 36, ['--r' as string]: '-18deg' }}
        >
          <PawIcon width={34} height={34} color='var(--peach-stroke)' />
        </div>
        <div
          className='ev-paw'
          aria-hidden='true'
          style={{ top: 64, right: 40, ['--r' as string]: '22deg', animationDelay: '0.8s' }}
        >
          <PawIcon width={26} height={26} color='#9FD0C7' />
        </div>
        <div
          className='ev-paw'
          aria-hidden='true'
          style={{ bottom: 18, right: 72, ['--r' as string]: '-10deg', animationDelay: '1.4s' }}
        >
          <PawIcon width={20} height={20} color='#F0B7C0' />
        </div>

        {/* Success badge */}
        <div
          className='flex items-center justify-center'
          style={{ position: 'relative', marginBottom: 32 }}
        >
          <span
            aria-hidden='true'
            style={{
              position: 'absolute',
              width: 112,
              height: 112,
              borderRadius: '50%',
              border: '2px solid var(--rausch)',
              animation: 'ev-ring 2.4s ease-out infinite',
            }}
          />
          <div
            style={{
              width: 112,
              height: 112,
              borderRadius: '50%',
              background:
                'radial-gradient(circle at 40% 38%, var(--color-amber-200) 0%, var(--cream) 100%)',
              border: '1.5px solid var(--peach-stroke)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow:
                '0 12px 40px rgba(232,146,60,0.22), 0 3px 10px rgba(232,146,60,0.1)',
              animation: 'ev-pop 620ms cubic-bezier(0.2,0,0,1) both',
            }}
            aria-hidden='true'
          >
            <svg width={52} height={52} viewBox='0 0 24 24' fill='none'>
              <path
                d='M5 12.5l4.2 4.2L19 7'
                stroke='var(--rausch)'
                strokeWidth={3}
                strokeLinecap='round'
                strokeLinejoin='round'
                style={{
                  strokeDasharray: 28,
                  strokeDashoffset: 28,
                  animation: 'ev-drawCheck 460ms 380ms cubic-bezier(0.2,0,0,1) forwards',
                }}
              />
            </svg>
          </div>
        </div>

        <p
          className='ev-stagger'
          style={{
            animationDelay: '120ms',
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            fontSize: 12,
            fontWeight: 700,
            color: 'var(--rausch)',
            margin: '0 0 12px',
          }}
        >
          Email verified
        </p>

        <h1
          className='ev-stagger'
          style={{
            animationDelay: '180ms',
            fontFamily: 'var(--font-display)',
            fontSize: 40,
            fontWeight: 700,
            color: 'var(--ink)',
            letterSpacing: '-0.022em',
            lineHeight: 1.12,
            margin: '0 0 14px',
          }}
        >
          You're all set to adopt
        </h1>

        <p
          className='ev-stagger'
          style={{
            animationDelay: '240ms',
            color: 'var(--muted)',
            fontSize: 16,
            lineHeight: 1.65,
            maxWidth: 400,
            margin: '0 auto 32px',
          }}
        >
          Your KodaNest account is now active. Sign in from the navigation bar
          and start meeting the pets waiting for a home like yours.
        </p>

        <div
          className='ev-stagger flex flex-col items-center gap-4'
          style={{ animationDelay: '300ms' }}
        >
          <Link
            to='/pets'
            className='btn btn-primary btn-lg'
            style={{
              minWidth: 240,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            Browse adoptable pets <ArrowRight size={16} />
          </Link>

          <Link
            to='/'
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--muted)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Check size={14} /> Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
