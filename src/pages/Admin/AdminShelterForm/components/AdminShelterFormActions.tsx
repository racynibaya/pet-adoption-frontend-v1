import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface AdminShelterFormActionsProps {
  isEdit: boolean
  loading: boolean
  saved: boolean
}

export default function AdminShelterFormActions({
  isEdit,
  loading,
  saved,
}: AdminShelterFormActionsProps) {
  const status = saved
    ? 'Saved — redirecting'
    : loading
      ? 'Saving…'
      : isEdit
        ? 'Ready · changes pending'
        : 'Ready to submit'

  const dotClass = saved
    ? 'asf-actions-status-dot is-saved'
    : loading
      ? 'asf-actions-status-dot is-busy'
      : 'asf-actions-status-dot'

  const submitLabel = saved ? (
    'Saved'
  ) : loading ? (
    'Saving…'
  ) : (
    <>
      {isEdit ? 'Save changes' : 'Create shelter'} <ArrowRight size={14} />
    </>
  )

  return (
    <section className='bento-card a-section' style={{ ['--i' as string]: 4 }}>
      <div className='asf-actions'>
        <span className='asf-actions-status'>
          <span className={dotClass} aria-hidden />
          {status}
        </span>
        <div className='asf-actions-group'>
          <Link to='/admin/shelters' className='bento-action-btn ghost'>
            Cancel
          </Link>
          <button
            type='submit'
            disabled={loading || saved}
            className='bento-action-btn primary inline-flex items-center gap-1.5'
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </section>
  )
}
