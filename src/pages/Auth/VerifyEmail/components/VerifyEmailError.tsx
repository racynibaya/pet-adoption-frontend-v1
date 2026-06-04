import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, Check, ArrowRight, ArrowLeft } from 'lucide-react'
import { apiResendVerification, ApiError } from '@/services/api'

interface VerifyEmailErrorProps {
  message: string
}

export default function VerifyEmailError({ message }: VerifyEmailErrorProps) {
  const [resendEmail, setResendEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [resendSent, setResendSent] = useState(false)
  const [resendError, setResendError] = useState('')

  async function handleResend() {
    if (!resendEmail.trim() || sending) return
    setSending(true)
    setResendError('')
    setResendSent(false)
    try {
      await apiResendVerification(resendEmail.trim())
      setResendSent(true)
    } catch (err) {
      setResendError(err instanceof ApiError ? err.message : 'Failed. Please try again.')
    } finally {
      setSending(false)
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
        <AlertTriangle size={32} color='#D94F68' strokeWidth={1.75} />
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
              if (e.key === 'Enter') { void handleResend() }
            }}
          />
        </div>

        <button
          className='btn btn-primary'
          style={{ width: '100%' }}
          onClick={() => { void handleResend() }}
          disabled={sending || !resendEmail.trim()}
        >
          {sending ? (
            'Sending…'
          ) : (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              Send new link <ArrowRight size={14} />
            </span>
          )}
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
            <Check size={14} color='#1D7575' strokeWidth={1.75} />
            Check your inbox for the new link.
          </p>
        )}
        {resendError && (
          <p style={{ fontSize: 13, color: '#D94F68', marginTop: 12 }}>{resendError}</p>
        )}
      </div>

      <Link
        to='/'
        style={{ fontSize: 13.5, color: 'var(--muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
        className='hover:text-(--ink) hover:underline transition-colors duration-120'
      >
        <ArrowLeft size={14} /> Back to home
      </Link>
    </div>
  )
}
