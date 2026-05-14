import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { apiVerifyEmail, apiResendVerification, ApiError } from '@/services/api';

type VerifyState = 'loading' | 'success' | 'error';

function SpinnerState() {
  return (
    <div className='flex flex-col items-center gap-5 py-20'>
      <div
        role='status'
        aria-label='Verifying'
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: '3px solid var(--hairline)',
          borderTopColor: '#E8923C',
          animation: 'kv-spin 0.75s linear infinite',
        }}
      />
      <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0 }}>
        Verifying your email address…
      </p>
    </div>
  );
}

function SuccessState({ onGoHome }: { onGoHome: () => void }) {
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
        <svg width='44' height='44' viewBox='0 0 44 44' fill='none'>
          <path
            d='M9 23 L19 33 L35 13'
            stroke='#E8923C'
            strokeWidth='3'
            strokeLinecap='round'
            strokeLinejoin='round'
            style={{
              strokeDasharray: 52,
              strokeDashoffset: 52,
              animation: 'kv-drawCheck 0.6s 0.3s cubic-bezier(0.2,0,0,1) forwards',
            }}
          />
        </svg>
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
  );
}

interface ErrorStateProps {
  message: string;
}

function ErrorState({ message }: ErrorStateProps) {
  const [resendEmail, setResendEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [resendSent, setResendSent] = useState(false);
  const [resendError, setResendError] = useState('');

  async function handleResend() {
    if (!resendEmail.trim() || sending) return;
    setSending(true);
    setResendError('');
    setResendSent(false);
    try {
      await apiResendVerification(resendEmail.trim());
      setResendSent(true);
    } catch (err) {
      setResendError(err instanceof ApiError ? err.message : 'Failed. Please try again.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      className='flex flex-col items-center text-center gap-6 py-12'
      style={{ animation: 'kv-fadeUp 500ms cubic-bezier(0.2,0,0,1) both' }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: '#FEF2F4',
          border: '1.5px solid #F9BCC8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(217,79,104,0.1)',
          flexShrink: 0,
        }}
        aria-hidden='true'
      >
        <svg width='32' height='32' viewBox='0 0 32 32' fill='none'>
          <path d='M16 9 L16 18' stroke='#D94F68' strokeWidth='2.5' strokeLinecap='round' />
          <circle cx='16' cy='23.5' r='1.5' fill='#D94F68' />
          <path
            d='M13.5 3.8 A2.8 2.8 0 0 1 18.5 3.8 L29.2 26 A2.8 2.8 0 0 1 26.7 30 H5.3 A2.8 2.8 0 0 1 2.8 26 Z'
            stroke='#D94F68'
            strokeWidth='1.75'
            strokeLinejoin='round'
          />
        </svg>
      </div>

      <div className='flex flex-col gap-2.5'>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 28,
            fontWeight: 700,
            color: 'var(--ink)',
            letterSpacing: '-0.016em',
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          Link expired or invalid
        </h2>
        <p
          style={{
            color: 'var(--muted)',
            fontSize: 14,
            lineHeight: 1.65,
            maxWidth: 340,
            margin: '0 auto',
          }}
        >
          {message || 'This verification link has expired or already been used.'}
        </p>
      </div>

      <div
        style={{
          background: 'var(--soft)',
          borderRadius: 20,
          padding: '20px 24px 24px',
          width: '100%',
          textAlign: 'left',
        }}
      >
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', margin: '0 0 16px' }}>
          Get a new verification link
        </p>

        <div className='field' style={{ marginBottom: 12 }}>
          <label htmlFor='resend-email'>Email address</label>
          <input
            id='resend-email'
            type='email'
            placeholder='you@example.com'
            value={resendEmail}
            onChange={(e) => setResendEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { void handleResend(); }
            }}
          />
        </div>

        <button
          className='btn btn-primary'
          style={{ width: '100%' }}
          onClick={() => { void handleResend(); }}
          disabled={sending || !resendEmail.trim()}
        >
          {sending ? 'Sending…' : 'Send new link →'}
        </button>

        {resendSent && (
          <p
            style={{
              fontSize: 13,
              color: '#1D7575',
              marginTop: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
              <path d='M2 7 L6 11 L12 3' stroke='#1D7575' strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
            Check your inbox for the new link.
          </p>
        )}
        {resendError && (
          <p style={{ fontSize: 13, color: '#D94F68', marginTop: 12 }}>{resendError}</p>
        )}
      </div>

      <Link
        to='/'
        style={{ fontSize: 13.5, color: 'var(--muted)', textDecoration: 'none' }}
        className='hover:text-(--ink) hover:underline transition-colors duration-120'
      >
        ← Back to home
      </Link>
    </div>
  );
}

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useState<VerifyState>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  const token = searchParams.get('token') ?? '';

  useEffect(() => {
    let cancelled = false;

    if (!token) {
      setState('error');
      setErrorMsg('No verification token found in the URL.');
      return;
    }

    apiVerifyEmail(token)
      .then((data) => {
        if (cancelled) return;
        setState(data.success ? 'success' : 'error');
        if (!data.success) setErrorMsg(data.message);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setState('error');
        setErrorMsg(
          err instanceof ApiError
            ? err.message
            : 'Verification failed. The link may have expired.',
        );
      });

    return () => { cancelled = true; };
  }, [token]);

  return (
    <div
      className='section'
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 48,
        paddingBottom: 80,
      }}
    >
      <style>{`
        @keyframes kv-spin { to { transform: rotate(360deg); } }
        @keyframes kv-fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes kv-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
        @keyframes kv-drawCheck {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
      <div style={{ maxWidth: 480, margin: '0 auto', width: '100%', padding: '0 24px' }}>
        {state === 'loading' && <SpinnerState />}
        {state === 'success' && <SuccessState onGoHome={() => navigate('/')} />}
        {state === 'error' && <ErrorState message={errorMsg} />}
      </div>
    </div>
  );
}
