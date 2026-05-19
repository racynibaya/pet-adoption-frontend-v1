import { YesCheckIcon } from '../assets'

interface PetApplyYesNoPillsProps {
  value: boolean | null
  onChange: (v: boolean) => void
  disabled?: boolean
}

export default function PetApplyYesNoPills({ value, onChange, disabled }: PetApplyYesNoPillsProps) {
  const opts: { v: boolean; label: string }[] = [
    { v: true, label: 'Yes' },
    { v: false, label: 'No' },
  ]
  return (
    <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
      {opts.map((opt) => {
        const active = value === opt.v
        return (
          <button
            key={String(opt.v)}
            type='button'
            disabled={disabled}
            onClick={() => onChange(opt.v)}
            style={{
              flex: 1,
              maxWidth: 180,
              minHeight: 52,
              borderRadius: 14,
              padding: '12px 22px',
              border: '1.5px solid',
              borderColor: active ? '#1D7575' : 'var(--hairline)',
              background: disabled
                ? 'repeating-linear-gradient(135deg, var(--soft) 0 8px, transparent 8px 14px)'
                : active
                  ? '#e2f2ee'
                  : 'white',
              color: disabled ? 'var(--muted)' : active ? '#155e5e' : 'var(--ink-2)',
              cursor: disabled ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: 14.5,
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              opacity: disabled ? 0.5 : 1,
              transition:
                'background 180ms var(--ease-out), border-color 180ms var(--ease-out), transform 120ms var(--ease-out), color 180ms var(--ease-out)',
            }}
            onMouseEnter={(e) => {
              if (!disabled && !active) e.currentTarget.style.borderColor = '#99D0D9'
            }}
            onMouseLeave={(e) => {
              if (!disabled && !active) e.currentTarget.style.borderColor = 'var(--hairline)'
            }}
          >
            <span
              aria-hidden
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: active ? '#1D7575' : 'transparent',
                border: active ? 'none' : '1.5px solid var(--hairline)',
                transition: 'all 180ms var(--ease-out)',
                flexShrink: 0,
              }}
            >
              {active && <YesCheckIcon />}
            </span>
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
