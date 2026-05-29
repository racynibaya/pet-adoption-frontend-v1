import { Link } from 'react-router-dom'
import {
  AdminShelterFormHeader,
  AdminShelterFormBasicInfo,
  AdminShelterFormDescription,
  AdminShelterFormImage,
  AdminShelterFormActions,
  AdminShelterFormAccessDenied,
} from './components'
import { useAdminShelterForm } from './hooks/useAdminShelterForm'
import './styles/adminShelterForm.css'

export default function AdminShelterForm() {
  const f = useAdminShelterForm()

  if (f.accessDenied) {
    return <AdminShelterFormAccessDenied />
  }

  if (f.notFound) {
    return (
      <div className='asf-page'>
        <header className='asf-head a-section' style={{ ['--i' as string]: 0 }}>
          <div>
            <div className='asf-head-crumb'>
              <Link to='/admin/shelters'>Shelters</Link>
              <span className='asf-head-crumb-sep'>›</span>
              <span>Not found</span>
            </div>
            <h1 className='asf-head-title'>Shelter not found</h1>
          </div>
        </header>
        <section className='bento-card a-section' style={{ ['--i' as string]: 1 }}>
          <div className='asf-notice'>
            <p className='asf-notice-body'>
              This shelter doesn&rsquo;t exist or hasn&rsquo;t loaded yet.
            </p>
            <div className='asf-notice-actions'>
              <Link to='/admin/shelters' className='bento-action-btn primary'>
                Back to shelters
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <form onSubmit={f.handleSubmit} noValidate className='asf-page'>
      <AdminShelterFormHeader
        isEdit={f.isEdit}
        existingName={f.existing?.name}
      />

      <AdminShelterFormBasicInfo
        form={f.form}
        errors={f.errors}
        set={f.set}
      />
      <AdminShelterFormDescription
        form={f.form}
        errors={f.errors}
        set={f.set}
      />
      <AdminShelterFormImage
        fileRef={f.fileRef}
        imagePreview={f.imagePreview}
        errorMsg={f.errors.image}
        onFileChange={f.handleFileChange}
        onRemove={f.removeImage}
      />

      {f.apiError && (
        <div role='alert' className='asf-alert'>
          <span className='asf-alert-mark' aria-hidden='true'>
            !
          </span>
          <span>{f.apiError}</span>
        </div>
      )}

      <AdminShelterFormActions
        isEdit={f.isEdit}
        loading={f.loading}
        saved={f.saved}
      />
    </form>
  )
}
