import type { FormState, FormFieldErrors } from '../types'
import StaffPetFormLabel from './StaffPetFormLabel'
import StaffPetFormTextInput from './StaffPetFormTextInput'
import StaffPetFormFieldErr from './StaffPetFormFieldErr'

interface StaffPetFormShelterProps {
  form: FormState
  errors: FormFieldErrors
  set: <K extends keyof FormState>(key: K, value: FormState[K]) => void
}

export default function StaffPetFormShelter({ form, errors, set }: StaffPetFormShelterProps) {
  return (
    <div className="staff-form-section">
      <div className="staff-form-section-head">Shelter</div>
      <div className="staff-form-section-body">
        <div style={{ maxWidth: 200 }}>
          <StaffPetFormLabel>Shelter ID *</StaffPetFormLabel>
          <StaffPetFormTextInput
            type="number"
            value={form.shelterId}
            onChange={(e) => set('shelterId', e.target.value)}
            placeholder="e.g. 1"
            required
          />
          <StaffPetFormFieldErr msg={errors.shelterId} />
        </div>
        <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>
          The numeric ID of the shelter this pet belongs to. You can find this in the backend's shelters table.
        </p>
      </div>
    </div>
  )
}
