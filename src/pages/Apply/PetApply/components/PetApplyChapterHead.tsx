interface PetApplyChapterHeadProps {
  num: string
  title: string
  subtitle?: string
}

export default function PetApplyChapterHead({ num, title, subtitle }: PetApplyChapterHeadProps) {
  return (
    <div
      className='petapply-chapter-head'
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 18,
        marginBottom: 28,
        paddingBottom: 18,
        borderBottom: '1px solid var(--hairline-soft)',
      }}
    >
      <span
        aria-hidden
        className='petapply-chapter-num'
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 44,
          fontWeight: 300,
          letterSpacing: '-0.04em',
          color: '#E8923C',
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        {num}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h2
          className='petapply-chapter-title'
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 26,
            fontWeight: 600,
            color: 'var(--ink)',
            margin: 0,
            letterSpacing: '-0.018em',
            lineHeight: 1.2,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p style={{ fontSize: 14, color: 'var(--muted)', margin: '6px 0 0', lineHeight: 1.55 }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
