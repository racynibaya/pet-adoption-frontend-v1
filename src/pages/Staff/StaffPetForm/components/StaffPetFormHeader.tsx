import { Link } from 'react-router-dom'

interface StaffPetFormHeaderProps {
  isEdit: boolean
  existingName: string | undefined
}

export default function StaffPetFormHeader({ isEdit, existingName }: StaffPetFormHeaderProps) {
  const titleAccent = isEdit ? (existingName ?? 'pet') : 'pet'
  const titlePrefix = isEdit ? 'Editing' : 'Listing a new'
  const crumb = isEdit ? `Edit ${existingName ?? ''}` : 'Add new pet'

  return (
    <header className='staff-subtopbar'>
      <div className='staff-subtopbar-title'>
        <span className='staff-subtopbar-crumb'>
          <Link to='/staff/pets'>Pets</Link>
          <span className='staff-subtopbar-crumb-sep'>›</span>
          <span>{crumb}</span>
        </span>
        <h1 className='staff-subtopbar-name'>
          {titlePrefix} <em>{titleAccent}</em>
        </h1>
        <p className='staff-subtopbar-sub'>
          {isEdit
            ? "Update this pet's details below. Changes are saved immediately."
            : 'Fill in the details below to list a new pet for adoption.'}
        </p>
      </div>
    </header>
  )
}
