export default function VerifyEmailSpinner() {
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
          borderTopColor: 'var(--rausch)',
          animation: 'kv-spin 0.75s linear infinite',
        }}
      />
      <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0 }}>
        Verifying your email address…
      </p>
    </div>
  )
}
