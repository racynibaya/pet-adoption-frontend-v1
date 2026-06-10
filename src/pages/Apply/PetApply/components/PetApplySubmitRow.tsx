import { ArrowRight } from 'lucide-react'

interface PetApplySubmitRowProps {
  loading: boolean
  answered: number
  total: number
}

export default function PetApplySubmitRow({ loading, answered, total }: PetApplySubmitRowProps) {
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', marginTop: 4 }}>
      <button
        type='submit'
        disabled={loading}
        style={{
          padding: '15px 36px',
          background: loading ? 'var(--color-amber-400)' : 'var(--rausch)',
          color: 'white',
          border: 'none',
          borderRadius: 13,
          fontSize: 15.5,
          fontWeight: 700,
          cursor: loading ? 'not-allowed' : 'pointer',
          fontFamily: 'var(--font-body)',
          boxShadow: '0 6px 20px -6px rgba(232,146,60,0.6)',
          transition: 'background 160ms var(--ease-out), transform 120ms var(--ease-out)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.background = 'var(--rausch-active)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }
        }}
        onMouseLeave={(e) => {
          if (!loading) {
            e.currentTarget.style.background = 'var(--rausch)'
            e.currentTarget.style.transform = 'translateY(0)'
          }
        }}
      >
        {loading ? 'Sending…' : <>Send application <ArrowRight size={16} /></>}
      </button>
      <span style={{ fontSize: 13, color: 'var(--muted)', fontVariantNumeric: 'tabular-nums' }}>
        {answered} of {total} answered
      </span>
    </div>
  )
}
