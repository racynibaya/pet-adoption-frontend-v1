import { Link } from 'react-router-dom'

interface AdminPetFormHeaderProps {
  isEdit: boolean
  existingName: string | undefined
}

export default function AdminPetFormHeader({
  isEdit,
  existingName,
}: AdminPetFormHeaderProps) {
  return (
    <header className='asf-head a-section' style={{ ['--i' as string]: 0 }}>
      <div>
        <div className='asf-head-crumb'>
          <Link to='/admin/pets'>Pets</Link>
          <span className='asf-head-crumb-sep'>›</span>
          <span>{isEdit ? 'Edit pet' : 'New pet'}</span>
        </div>
        <div className='asf-head-eyebrow'>
          <span className='dot' aria-hidden />
          {isEdit ? 'Edit record' : 'New record'}
        </div>
        <h1 className='asf-head-title'>
          {isEdit ? (
            <>
              Editing <em>{existingName ?? 'pet'}</em>
            </>
          ) : (
            'Add a new pet'
          )}
        </h1>
        <p className='asf-head-sub'>
          {isEdit
            ? "Update this pet's listing. Changes are reflected on the public directory immediately."
            : 'Create a pet listing under any partner shelter. Photos are uploaded with the record.'}
        </p>
      </div>
      <div className='asf-head-meta'>
        <span className='asf-head-meta-label'>Roster</span>
        <span className='asf-head-meta-value'>
          {isEdit ? 'Update' : 'New entry'}
        </span>
      </div>
    </header>
  )
}
