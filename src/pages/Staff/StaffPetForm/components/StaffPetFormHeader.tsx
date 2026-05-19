import { Link } from 'react-router-dom'

interface StaffPetFormHeaderProps {
  isEdit: boolean
  existingName: string | undefined
}

export default function StaffPetFormHeader({ isEdit, existingName }: StaffPetFormHeaderProps) {
  const title = isEdit ? `Edit ${existingName ?? 'Pet'}` : 'Add New Pet'
  const crumb = isEdit ? `Edit ${existingName ?? ''}` : 'Add New Pet'

  return (
    <div className="staff-page-header">
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <Link to="/staff/pets" style={{ fontSize: 12.5, color: 'var(--muted)', textDecoration: 'none' }}>Pets</Link>
          <span style={{ color: 'var(--muted)', fontSize: 12 }}>›</span>
          <span style={{ fontSize: 12.5, color: 'var(--ink-2)' }}>{crumb}</span>
        </div>
        <h1 className="staff-page-title">{title}</h1>
        <p className="staff-page-sub">
          {isEdit
            ? 'Changes to species, size, and gender will sync once PATCH /pets/:id is implemented in the backend.'
            : 'Creates a record via POST /api/v1/pets. All fields are required by the backend.'}
        </p>
      </div>
    </div>
  )
}
