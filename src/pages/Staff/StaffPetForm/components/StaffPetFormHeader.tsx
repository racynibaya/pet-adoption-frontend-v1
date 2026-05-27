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
            ? "Update this pet's details below. Changes are saved immediately."
            : 'Fill in the details below to list a new pet for adoption.'}
        </p>
      </div>
    </div>
  )
}
