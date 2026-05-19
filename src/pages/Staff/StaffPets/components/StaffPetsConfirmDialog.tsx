interface StaffPetsConfirmDialogProps {
  petName: string
  onConfirm: () => void
  onCancel: () => void
}

export default function StaffPetsConfirmDialog({ petName, onConfirm, onCancel }: StaffPetsConfirmDialogProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.42)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        padding: 16,
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: 16,
          padding: '28px 28px',
          maxWidth: 360,
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.22)',
          fontFamily: 'var(--font-body)',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 18,
            margin: '0 0 8px',
            color: 'var(--ink)',
          }}
        >
          Remove {petName}?
        </h3>
        <p style={{ fontSize: 13.5, color: 'var(--muted)', margin: '0 0 24px', lineHeight: 1.5 }}>
          This will permanently remove this pet from the listings. This action
          cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
            style={{
              padding: '9px 18px',
              borderRadius: 9,
              border: '1.5px solid var(--hairline)',
              background: 'white',
              color: 'var(--ink-2)',
              cursor: 'pointer',
              fontSize: 13.5,
              fontWeight: 500,
              fontFamily: 'var(--font-body)',
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: '9px 18px',
              borderRadius: 9,
              border: 'none',
              background: '#D94F68',
              color: 'white',
              cursor: 'pointer',
              fontSize: 13.5,
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
