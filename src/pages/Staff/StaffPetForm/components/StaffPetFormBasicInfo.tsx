import { speciesLabel, genderLabel, sizeLabel, type Species, type Gender, type Size } from '@/data/pets'
import type { FormState, FormFieldErrors } from '../types'
import {
  SPECIES_OPTIONS,
  GENDER_OPTIONS,
  SIZE_OPTIONS,
  STATUS_OPTIONS,
} from '../constants/staffPetForm.constants'
import StaffPetFormLabel from './StaffPetFormLabel'
import StaffPetFormTextInput from './StaffPetFormTextInput'
import StaffPetFormSelect from './StaffPetFormSelect'
import StaffPetFormFieldErr from './StaffPetFormFieldErr'

interface StaffPetFormBasicInfoProps {
  form: FormState
  errors: FormFieldErrors
  set: <K extends keyof FormState>(key: K, value: FormState[K]) => void
}

export default function StaffPetFormBasicInfo({ form, errors, set }: StaffPetFormBasicInfoProps) {
  return (
    <div className='staff-form-card'>
      <div className='staff-form-card-head'>Basic information</div>
      <div className='staff-form-card-body'>
        <div className='staff-form-grid'>
          <div>
            <StaffPetFormLabel>Pet name *</StaffPetFormLabel>
            <StaffPetFormTextInput value={form.name} onChange={(e) => set('name', e.target.value)} placeholder='e.g. Biscuit' required />
            <StaffPetFormFieldErr msg={errors.name} />
          </div>
          <div>
            <StaffPetFormLabel>Species *</StaffPetFormLabel>
            <StaffPetFormSelect value={form.species} onChange={(e) => set('species', e.target.value as Species)}>
              {SPECIES_OPTIONS.map((s) => <option key={s} value={s}>{speciesLabel(s)}</option>)}
            </StaffPetFormSelect>
          </div>
          <div>
            <StaffPetFormLabel>Breed *</StaffPetFormLabel>
            <StaffPetFormTextInput value={form.breed} onChange={(e) => set('breed', e.target.value)} placeholder='e.g. Jack Russell Terrier' required />
            <StaffPetFormFieldErr msg={errors.breed} />
          </div>
          <div>
            <StaffPetFormLabel>Age (months) *</StaffPetFormLabel>
            <StaffPetFormTextInput type='number' value={form.ageMonths} onChange={(e) => set('ageMonths', e.target.value)} placeholder='e.g. 18' required />
            <StaffPetFormFieldErr msg={errors.ageMonths} />
          </div>
          <div>
            <StaffPetFormLabel>Gender *</StaffPetFormLabel>
            <StaffPetFormSelect value={form.gender} onChange={(e) => set('gender', e.target.value as Gender)}>
              {GENDER_OPTIONS.map((g) => <option key={g} value={g}>{genderLabel(g)}</option>)}
            </StaffPetFormSelect>
          </div>
          <div>
            <StaffPetFormLabel>Size *</StaffPetFormLabel>
            <StaffPetFormSelect value={form.size} onChange={(e) => set('size', e.target.value as Size)}>
              {SIZE_OPTIONS.map((s) => <option key={s} value={s}>{sizeLabel(s)}</option>)}
            </StaffPetFormSelect>
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <StaffPetFormLabel>Listing status</StaffPetFormLabel>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type='button'
                onClick={() => set('status', opt.value)}
                className={`staff-form-status-pill${form.status === opt.value ? ' is-active' : ''}`}
              >
                {opt.label.replace(/^[●◌✓]\s*/, '')}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
