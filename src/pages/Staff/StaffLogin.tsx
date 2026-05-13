import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { useStaff } from '@/context/useStaff'
import '@/styles/staff.css'

export default function StaffLogin() {
  const { login, loginError, isAuthenticated, staffUser } = useStaff()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  if (isAuthenticated && staffUser) {
    return <Navigate to={staffUser.role === 'ADMIN' ? '/admin' : '/staff'} replace />
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    const ok = await login(email, password)
    // Role-aware redirect happens on next render via the Navigate above.
    if (!ok) setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#162424',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      fontFamily: 'var(--font-body)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 600px 400px at 30% 50%, rgba(29,117,117,0.18) 0%, transparent 70%), radial-gradient(ellipse 400px 500px at 80% 20%, rgba(232,146,60,0.1) 0%, transparent 70%)',
      }} />

      <div style={{ position: 'relative', width: '100%', maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 52, height: 52,
            background: 'linear-gradient(135deg, #E8923C 0%, #CB7730 100%)',
            borderRadius: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 8px 24px rgba(232,146,60,0.35)',
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <ellipse cx="6" cy="9" rx="2" ry="2.8" fill="white" />
              <ellipse cx="11" cy="6.5" rx="1.8" ry="2.4" fill="white" />
              <ellipse cx="16" cy="7.5" rx="1.8" ry="2.4" fill="white" />
              <ellipse cx="19" cy="11" rx="1.8" ry="2.4" fill="white" />
              <path d="M12.5 11c-3.3 0-6.5 2.5-6.5 5.5 0 1.7 1.3 3 3 3 1 0 1.8-.4 2.6-.7.6-.2 1.2-.4 1.9-.4s1.3.2 1.9.4c.8.3 1.6.7 2.6.7 1.7 0 3-1.3 3-3 0-3-3.2-5.5-6.5-5.5Z" fill="white" />
            </svg>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 26,
            fontWeight: 700,
            color: 'white',
            margin: '0 0 6px',
            letterSpacing: '-0.02em',
          }}>
            KodaNest
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 13.5, margin: 0, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>
            Staff Portal
          </p>
        </div>

        {/* Card */}
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

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="field" style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 6, letterSpacing: '0.02em' }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
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
                onFocus={e => { e.currentTarget.style.borderColor = '#E8923C' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'var(--hairline)' }}
              />
            </div>

            {/* Password */}
            <div className="field" style={{ marginBottom: 22 }}>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 6, letterSpacing: '0.02em' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
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
                  onFocus={e => { e.currentTarget.style.borderColor = '#E8923C' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--hairline)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  style={{
                    position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: 0,
                    display: 'flex', alignItems: 'center',
                  }}
                >
                  {showPass
                    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                  }
                </button>
              </div>
            </div>

            {loginError && (
              <div style={{
                padding: '10px 14px',
                background: '#fde8ec',
                borderRadius: 10,
                color: '#c0304d',
                fontSize: 13,
                marginBottom: 18,
                lineHeight: 1.45,
              }}>
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                height: 50,
                background: loading ? '#f5ae50' : '#E8923C',
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
              onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#CB7730' }}
              onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#E8923C' }}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12.5, color: 'rgba(255,255,255,0.28)' }}>
          KodaNest Staff Portal — Restricted Access
        </p>
      </div>
    </div>
  )
}
