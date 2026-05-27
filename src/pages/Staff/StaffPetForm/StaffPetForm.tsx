import {
  StaffPetFormHeader,
  StaffPetFormAccessDenied,
  StaffPetFormBasicInfo,
  StaffPetFormShelter,
  StaffPetFormDescription,
  StaffPetFormPhotos,
  StaffPetFormActions,
} from './components'
import { useStaffPetForm } from './hooks/useStaffPetForm'

export default function StaffPetForm() {
  const f = useStaffPetForm()

  if (f.accessDenied) {
    return (
      <StaffPetFormAccessDenied
        petName={f.existing?.name}
        shelterName={f.existing?.shelterName}
      />
    )
  }

  return (
    <div className='staff-page-shell'>
      <StaffPetFormHeader isEdit={f.isEdit} existingName={f.existing?.name} />

      <div style={{ maxWidth: 880 }}>
        <form onSubmit={f.handleSubmit}>
          <StaffPetFormBasicInfo form={f.form} errors={f.errors} set={f.set} />
          <StaffPetFormShelter form={f.form} errors={f.errors} set={f.set} />
          <StaffPetFormDescription form={f.form} errors={f.errors} set={f.set} />

          {!f.isEdit && (
            <StaffPetFormPhotos
              fileRef={f.fileRef}
              images={f.images}
              onFileChange={f.handleFileChange}
              onRemove={f.removeImage}
            />
          )}

          {f.apiError && (
            <div
              role='alert'
              style={{
                padding: '12px 16px',
                background: 'rgba(217, 79, 104, 0.12)',
                color: '#9e2a4a',
                border: '1px solid rgba(217, 79, 104, 0.2)',
                borderRadius: 12,
                fontSize: 13,
                marginBottom: 16,
                lineHeight: 1.5,
              }}
            >
              {f.apiError}
            </div>
          )}

          <StaffPetFormActions isEdit={f.isEdit} loading={f.loading} saved={f.saved} />
        </form>
      </div>
    </div>
  )
}
