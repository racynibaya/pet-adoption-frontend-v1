import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { apiVerifyEmail, ApiError } from '@/services/api'
import { VerifyEmailSpinner, VerifyEmailSuccess, VerifyEmailError } from './components'
import type { VerifyState } from './types'

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [state, setState] = useState<VerifyState>('loading')
  const [errorMsg, setErrorMsg] = useState('')

  const token = searchParams.get('token') ?? ''

  useEffect(() => {
    let cancelled = false

    if (!token) {
      setState('error')
      setErrorMsg('No verification token found in the URL.')
      return
    }

    apiVerifyEmail(token)
      .then((data) => {
        if (cancelled) return
        setState(data.success ? 'success' : 'error')
        if (!data.success) setErrorMsg(data.message)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setState('error')
        setErrorMsg(
          err instanceof ApiError
            ? err.message
            : 'Verification failed. The link may have expired.',
        )
      })

    return () => { cancelled = true }
  }, [token])

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
        {state === 'loading' && <VerifyEmailSpinner />}
        {state === 'success' && <VerifyEmailSuccess onGoHome={() => navigate('/')} />}
        {state === 'error' && <VerifyEmailError message={errorMsg} />}
      </div>
    </div>
  )
}
