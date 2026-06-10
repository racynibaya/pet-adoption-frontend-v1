import { useState } from 'react'
import { Mail, Check } from 'lucide-react'
import { apiResendVerification, ApiError } from '@/services/api'
import { chapterCard } from '../constants/petApply.constants'

interface PetApplyVerifyGateProps {
  email: string
}

export default function PetApplyVerifyGate({ email }: PetApplyVerifyGateProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState('')

  async function handleResend() {
    if (status !== 'idle') return
    setStatus('sending')
    try {
      await apiResendVerification(email)
      setStatus('sent')
    } catch (err) {
      setErrMsg(err instanceof ApiError ? err.message : 'Could not resend.')
      setStatus('error')
      setTimeout(() => {
        setStatus('idle')
        setErrMsg('')
      }, 4000)
    }
  }

  return (
    <div
      style={{
        ...chapterCard,
        textAlign: 'center',
        padding: 'clamp(36px, 6.5vw, 52px) clamp(22px, 6vw, 48px)',
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: '#e6f4f0',
          border: '1.5px solid var(--color-teal-200)',
          margin: '0 auto 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-hidden
      >
        <Mail size={26} color='var(--color-teal-500)' strokeWidth={1.8} />
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 26,
          fontWeight: 700,
          color: 'var(--ink)',
          margin: '0 0 10px',
          letterSpacing: '-0.018em',
        }}
      >
        One step left — verify your email
      </h2>
      <p style={{ fontSize: 14.5, color: 'var(--muted)', lineHeight: 1.65, margin: '0 auto 26px', maxWidth: 380 }}>
        We sent a verification link to{' '}
        <span style={{ color: 'var(--ink-2)', fontWeight: 600 }}>{email}</span>.
        Click it, then come back here to send your application.
      </p>
      <button
        type='button'
        onClick={handleResend}
        disabled={status !== 'idle'}
        style={{
          padding: '12px 26px',
          background: status === 'sent' ? 'var(--color-teal-500)' : 'white',
          color: status === 'sent' ? 'white' : 'var(--ink-2)',
          border: '1.5px solid',
          borderColor: status === 'sent' ? 'var(--color-teal-500)' : 'var(--hairline)',
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 600,
          cursor: status === 'idle' ? 'pointer' : 'default',
          fontFamily: 'var(--font-body)',
          transition: 'all 180ms var(--ease-out)',
        }}
      >
        {status === 'sending' ? (
          'Sending…'
        ) : status === 'sent' ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Check size={14} strokeWidth={2.5} /> Verification email sent
          </span>
        ) : (
          'Resend verification email'
        )}
      </button>
      {status === 'error' && (
        <p style={{ color: '#c0304d', fontSize: 13, marginTop: 12, fontStyle: 'italic' }}>{errMsg}</p>
      )}
    </div>
  )
}
