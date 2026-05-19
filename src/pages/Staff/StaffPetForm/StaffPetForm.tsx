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
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <StaffPetFormHeader isEdit={f.isEdit} existingName={f.existing?.name} />

      <div className='staff-page-body' style={{ padding: '24px 32px', maxWidth: 800 }}>
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
            <div style={{ padding: '12px 16px', background: '#fde8ec', borderRadius: 10, color: '#c0304d', fontSize: 13, marginBottom: 16, lineHeight: 1.5 }}>
              {f.apiError}
            </div>
          )}

          <StaffPetFormActions isEdit={f.isEdit} loading={f.loading} saved={f.saved} />
        </form>
      </div>
    </div>
  )
}
