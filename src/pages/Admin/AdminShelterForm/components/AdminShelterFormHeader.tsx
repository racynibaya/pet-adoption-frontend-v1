import { Link } from 'react-router-dom'

interface AdminShelterFormHeaderProps {
  isEdit: boolean
  existingName: string | undefined
}

export default function AdminShelterFormHeader({
  isEdit,
  existingName,
}: AdminShelterFormHeaderProps) {
  return (
    <header className='asf-head a-section' style={{ ['--i' as string]: 0 }}>
      <div>
        <div className='asf-head-crumb'>
          <Link to='/admin/shelters'>Shelters</Link>
          <span className='asf-head-crumb-sep'>›</span>
          <span>{isEdit ? 'Edit shelter' : 'New shelter'}</span>
        </div>
        <div className='asf-head-eyebrow'>
          <span className='dot' aria-hidden />
          {isEdit ? 'Edit record' : 'New record'}
        </div>
        <h1 className='asf-head-title'>
          {isEdit ? (
            <>
              Editing <em>{existingName ?? 'shelter'}</em>
            </>
          ) : (
            'Add a new shelter'
          )}
        </h1>
        <p className='asf-head-sub'>
          {isEdit
            ? "Update this shelter's details. Changes propagate to the public directory immediately."
            : 'Register a partner shelter so adopters can discover it on KodaNest. All fields except the image are required.'}
        </p>
      </div>
      <div className='asf-head-meta'>
        <span className='asf-head-meta-label'>Directory</span>
        <span className='asf-head-meta-value'>
          {isEdit ? 'Update' : 'New entry'}
        </span>
      </div>
    </header>
  )
}
