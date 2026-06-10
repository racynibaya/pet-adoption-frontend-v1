import type { FormEvent } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface StaffLoginCardProps {
  email: string
  password: string
  showPass: boolean
  loading: boolean
  loginError: string | null
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onToggleShowPass: () => void
  onSubmit: (e: FormEvent) => void
}

export default function StaffLoginCard({
  email,
  password,
  showPass,
  loading,
  loginError,
  onEmailChange,
  onPasswordChange,
  onToggleShowPass,
  onSubmit,
}: StaffLoginCardProps) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.96)',
      borderRadius: 20,
      padding: '36px 32px',
      boxShadow: '0 24px 64px rgba(0,0,0,0.28), 0 4px 12px rgba(0,0,0,0.12)',
    }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--ink)', margin: '0 0 4px' }}>
        Welcome back
      </h2>
      <p style={{ fontSize: 13.5, color: 'var(--muted)', margin: '0 0 28px' }}>
        Sign in to manage your shelter's pets and adoptions.
      </p>

      <form onSubmit={onSubmit}>
        <div className="field" style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 6, letterSpacing: '0.02em' }}>
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={e => onEmailChange(e.target.value)}
            placeholder="staff@kodanest.com"
            required
            autoComplete="email"
            style={{
              width: '100%',
              height: 48,
              padding: '0 14px',
              border: '1.5px solid var(--hairline)',
              borderRadius: 12,
              fontSize: 14,
              color: 'var(--ink)',
              background: 'white',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: 'var(--font-body)',
              transition: 'border-color 0.15s',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--rausch)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'var(--hairline)' }}
          />
        </div>

        <div className="field" style={{ marginBottom: 22 }}>
          <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 6, letterSpacing: '0.02em' }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={e => onPasswordChange(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              style={{
                width: '100%',
                height: 48,
                padding: '0 48px 0 14px',
                border: '1.5px solid var(--hairline)',
                borderRadius: 12,
                fontSize: 14,
                color: 'var(--ink)',
                background: 'white',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'var(--font-body)',
                transition: 'border-color 0.15s',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--rausch)' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'var(--hairline)' }}
            />
            <button
              type="button"
              onClick={onToggleShowPass}
              style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: 0,
                display: 'flex', alignItems: 'center',
              }}
            >
              {showPass ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
            </button>
          </div>
        </div>

        <div
          role="alert"
          style={{
            minHeight: 39,
            marginBottom: 18,
          }}
        >
          {loginError && (
            <div style={{
              padding: '10px 14px',
              background: '#fde8ec',
              borderRadius: 10,
              color: '#c0304d',
              fontSize: 13,
              lineHeight: 1.45,
              animation: 'staffLoginErrorIn 220ms cubic-bezier(0.16, 1, 0.3, 1) both',
            }}>
              {loginError}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            height: 50,
            background: loading ? 'var(--color-amber-400)' : 'var(--rausch)',
            color: 'white',
            border: 'none',
            borderRadius: 12,
            fontSize: 15,
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-body)',
            transition: 'background 0.15s',
            letterSpacing: '-0.01em',
          }}
          onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = 'var(--rausch-active)' }}
          onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = 'var(--rausch)' }}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
