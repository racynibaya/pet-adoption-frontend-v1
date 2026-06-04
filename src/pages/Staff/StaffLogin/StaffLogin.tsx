import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { useStaffAuth } from '@/context/useStaffAuth'
import '@/styles/staff.css'
import { StaffLoginLogo, StaffLoginCard } from './components'

export default function StaffLogin() {
  const { login, loginError, isAuthenticated, staffUser } = useStaffAuth()
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
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 600px 400px at 30% 50%, rgba(29,117,117,0.18) 0%, transparent 70%), radial-gradient(ellipse 400px 500px at 80% 20%, rgba(232,146,60,0.1) 0%, transparent 70%)',
      }} />

      <div style={{ position: 'relative', width: '100%', maxWidth: 420 }}>
        <StaffLoginLogo />
        <StaffLoginCard
          email={email}
          password={password}
          showPass={showPass}
          loading={loading}
          loginError={loginError}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onToggleShowPass={() => setShowPass(v => !v)}
          onSubmit={handleSubmit}
        />
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12.5, color: 'rgba(255,255,255,0.28)' }}>
          KodaNest Staff Portal — Restricted Access
        </p>
      </div>
    </div>
  )
}
