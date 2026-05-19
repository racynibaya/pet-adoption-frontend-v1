import type { ChangeEvent } from 'react'

interface PetApplyJournalTextareaProps {
  value: string
  onChange: (v: string) => void
  placeholder: string
  rows?: number
  max?: number
}

export default function PetApplyJournalTextarea({
  value,
  onChange,
  placeholder,
  rows = 4,
  max = 1000,
}: PetApplyJournalTextareaProps) {
  const count = value.length
  const near = count / max > 0.85
  return (
    <div style={{ position: 'relative', marginTop: 14 }}>
      <textarea
        className='petapply-journal'
        value={value}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        maxLength={max}
        style={{
          width: '100%',
          padding: '18px 20px 30px',
          border: '1.5px solid var(--hairline)',
          borderRadius: 14,
          fontSize: 15,
          color: 'var(--ink)',
          background: 'var(--cream)',
          outline: 'none',
          resize: 'vertical',
          boxSizing: 'border-box',
          fontFamily: 'var(--font-body)',
          lineHeight: 1.7,
          transition: 'border-color 180ms var(--ease-out), background 180ms var(--ease-out)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#E8923C'
          e.currentTarget.style.background = 'white'
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--hairline)'
          e.currentTarget.style.background = 'var(--cream)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 14,
          bottom: 10,
          fontSize: 11.5,
          letterSpacing: '0.03em',
          color: near ? '#a05818' : 'var(--muted)',
          fontVariantNumeric: 'tabular-nums',
          pointerEvents: 'none',
        }}
      >
        {count} / {max}
      </div>
    </div>
  )
}
