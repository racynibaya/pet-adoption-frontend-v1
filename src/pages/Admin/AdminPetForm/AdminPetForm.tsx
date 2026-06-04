import {
  AdminPetFormHeader,
  AdminPetFormBasicInfo,
  AdminPetFormShelter,
  AdminPetFormDescription,
  AdminPetFormPhotos,
  AdminPetFormActions,
  AdminPetFormAccessDenied,
} from './components'
import { useAdminPetForm } from './hooks/useAdminPetForm'
import '@/pages/Admin/AdminShelterForm/styles/adminShelterForm.css'

export default function AdminPetForm() {
  const f = useAdminPetForm()

  if (f.accessDenied) {
    return <AdminPetFormAccessDenied />
  }

  return (
    <form onSubmit={f.handleSubmit} noValidate className='asf-page'>
      <AdminPetFormHeader isEdit={f.isEdit} existingName={f.existing?.name} />

      <AdminPetFormBasicInfo form={f.form} errors={f.errors} set={f.set} />
      <AdminPetFormShelter
        shelters={f.shelters}
        form={f.form}
        errors={f.errors}
        set={f.set}
      />
      <AdminPetFormDescription
        form={f.form}
        errors={f.errors}
        set={f.set}
      />
      {!f.isEdit && (
        <AdminPetFormPhotos
          fileRef={f.fileRef}
          images={f.images}
          onFileChange={f.handleFileChange}
          onRemove={f.removeImage}
        />
      )}

      {f.apiError && (
        <div role='alert' className='asf-alert'>
          <span className='asf-alert-mark' aria-hidden='true'>
            !
          </span>
          <span>{f.apiError}</span>
        </div>
      )}

      <AdminPetFormActions
        isEdit={f.isEdit}
        loading={f.loading}
        saved={f.saved}
      />
    </form>
  )
}
