import type { ReactNode } from 'react'
import { House, Building, Building2 } from 'lucide-react'
import type { HomeType } from '@/services/api'

interface PetApplyHomeTypeChoiceProps {
  value: HomeType | ''
  onChange: (v: HomeType) => void
}

const OPTS: { v: HomeType; label: string; icon: ReactNode }[] = [
  { v: 'HOUSE', label: 'House', icon: <House size={26} strokeWidth={1.8} /> },
  { v: 'APARTMENT', label: 'Apartment', icon: <Building size={26} strokeWidth={1.8} /> },
  { v: 'CONDO', label: 'Condo', icon: <Building2 size={26} strokeWidth={1.8} /> },
]

export default function PetApplyHomeTypeChoice({ value, onChange }: PetApplyHomeTypeChoiceProps) {
  return (
    <div
      className='petapply-hometype-grid'
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: 12,
        marginTop: 14,
      }}
    >
      {OPTS.map((opt) => {
        const active = value === opt.v
        return (
          <button
            key={opt.v}
            type='button'
            className='petapply-hometype-btn'
            onClick={() => onChange(opt.v)}
            style={{
              minHeight: 110,
              borderRadius: 16,
              padding: '20px 12px',
              border: '1.5px solid',
              borderColor: active ? '#E8923C' : 'var(--hairline)',
              background: active ? '#fef1e1' : 'white',
              color: active ? '#a05818' : 'var(--ink-2)',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: 14.5,
              fontWeight: 600,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              transition:
                'background 180ms var(--ease-out), border-color 180ms var(--ease-out), transform 120ms var(--ease-out)',
            }}
            onMouseEnter={(e) => {
              if (!active) e.currentTarget.style.borderColor = '#FAC878'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              if (!active) e.currentTarget.style.borderColor = 'var(--hairline)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <span
              style={{
                color: active ? '#E8923C' : 'var(--muted)',
                transition: 'color 180ms var(--ease-out)',
              }}
            >
              {opt.icon}
            </span>
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
