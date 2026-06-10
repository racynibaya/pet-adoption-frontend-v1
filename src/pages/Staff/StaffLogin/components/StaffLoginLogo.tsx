import { PawLogoIcon } from '../assets'

export default function StaffLoginLogo() {
  return (
    <div style={{ textAlign: 'center', marginBottom: 36 }}>
      <div style={{
        width: 52, height: 52,
        background: 'linear-gradient(135deg, var(--rausch) 0%, var(--rausch-active) 100%)',
        borderRadius: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 16px',
        boxShadow: '0 8px 24px rgba(232,146,60,0.35)',
      }}>
        <PawLogoIcon />
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
  )
}
