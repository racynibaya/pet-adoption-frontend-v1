import { Link } from 'react-router-dom'

interface StaffPetFormActionsProps {
  isEdit: boolean
  loading: boolean
  saved: boolean
}

export default function StaffPetFormActions({ isEdit, loading, saved }: StaffPetFormActionsProps) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', paddingBottom: 40 }}>
      <button
        type="submit"
        disabled={loading || saved}
        style={{
          padding: '12px 28px',
          background: saved ? '#1D7575' : loading ? '#f5ae50' : '#E8923C',
          color: 'white', border: 'none', borderRadius: 11,
          fontSize: 14, fontWeight: 600,
          cursor: loading || saved ? 'not-allowed' : 'pointer',
          fontFamily: 'var(--font-body)', transition: 'background 0.15s',
          display: 'flex', alignItems: 'center', gap: 7,
        }}
        onMouseEnter={(e) => { if (!loading && !saved) (e.currentTarget as HTMLButtonElement).style.background = '#CB7730' }}
        onMouseLeave={(e) => { if (!loading && !saved) (e.currentTarget as HTMLButtonElement).style.background = '#E8923C' }}
      >
        {saved ? '✓ Saved!' : loading ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Pet'}
      </button>
      <Link
        to="/staff/pets"
        style={{
          padding: '12px 24px', borderRadius: 11, border: '1.5px solid var(--hairline)',
          background: 'white', color: 'var(--ink-2)', fontSize: 14, fontWeight: 500,
          textDecoration: 'none',
        }}
      >
        Cancel
      </Link>
    </div>
  )
}
