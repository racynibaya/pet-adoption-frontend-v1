import { Link } from 'react-router-dom'

interface StaffPetFormActionsProps {
  isEdit: boolean
  loading: boolean
  saved: boolean
}

export default function StaffPetFormActions({ isEdit, loading, saved }: StaffPetFormActionsProps) {
  const submitLabel = saved
    ? '✓ Saved!'
    : loading
      ? 'Saving…'
      : isEdit
        ? 'Save changes →'
        : 'Add pet →'

  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', paddingBottom: 40, marginTop: 8 }}>
      <button
        type='submit'
        disabled={loading || saved}
        className='staff-detail-btn primary'
        style={{ minWidth: 160 }}
      >
        {submitLabel}
      </button>
      <Link to='/staff/pets' className='staff-detail-btn ghost'>
        Cancel
      </Link>
    </div>
  )
}
