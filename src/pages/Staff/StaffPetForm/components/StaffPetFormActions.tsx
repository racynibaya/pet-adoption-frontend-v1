import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'

interface StaffPetFormActionsProps {
  isEdit: boolean
  loading: boolean
  saved: boolean
}

export default function StaffPetFormActions({ isEdit, loading, saved }: StaffPetFormActionsProps) {
  const submitLabel = saved ? (
    <><Check size={14} strokeWidth={2.5} /> Saved!</>
  ) : loading ? (
    'Saving…'
  ) : (
    <>{isEdit ? 'Save changes' : 'Add pet'} <ArrowRight size={14} /></>
  )

  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', paddingBottom: 40, marginTop: 8 }}>
      <button
        type='submit'
        disabled={loading || saved}
        className='staff-detail-btn primary inline-flex items-center justify-center gap-1.5'
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
