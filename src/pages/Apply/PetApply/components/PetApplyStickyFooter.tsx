import { ArrowRight } from 'lucide-react'

interface PetApplyStickyFooterProps {
  loading: boolean
  answered: number
  total: number
}

export default function PetApplyStickyFooter({ loading, answered, total }: PetApplyStickyFooterProps) {
  return (
    <div className='petapply-sticky-footer' role='status' aria-live='polite'>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}
        >
          Progress
        </span>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>
          {answered} / {total} answered
        </span>
      </div>
      <button
        type='button'
        onClick={() => {
          const formEl = document.querySelector('form')
          if (formEl)
            formEl.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
        }}
        disabled={loading}
        style={{
          padding: '11px 22px',
          background: loading ? '#f5ae50' : 'var(--rausch)',
          color: 'white',
          border: 'none',
          borderRadius: 999,
          fontSize: 13.5,
          fontWeight: 700,
          cursor: loading ? 'not-allowed' : 'pointer',
          fontFamily: 'var(--font-body)',
          transition: 'background 160ms var(--ease-out)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
        }}
        onMouseEnter={(e) => {
          if (!loading) e.currentTarget.style.background = 'var(--rausch-active)'
        }}
        onMouseLeave={(e) => {
          if (!loading) e.currentTarget.style.background = 'var(--rausch)'
        }}
      >
        {loading ? 'Sending…' : <>Send <ArrowRight size={14} /></>}
      </button>
    </div>
  )
}
