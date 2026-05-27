import type { FormState, FormFieldErrors } from '../types'
import StaffPetFormLabel from './StaffPetFormLabel'
import StaffPetFormFieldErr from './StaffPetFormFieldErr'

interface StaffPetFormDescriptionProps {
  form: FormState
  errors: FormFieldErrors
  set: <K extends keyof FormState>(key: K, value: FormState[K]) => void
}

export default function StaffPetFormDescription({ form, errors, set }: StaffPetFormDescriptionProps) {
  return (
    <div className='staff-form-card'>
      <div className='staff-form-card-head'>Description</div>
      <div className='staff-form-card-body'>
        <StaffPetFormLabel>About this pet *</StaffPetFormLabel>
        <textarea
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="Write a warm, descriptive paragraph about this pet's personality and backstory…"
          rows={5}
          style={{
            width: '100%', padding: '11px 13px',
            border: '1.5px solid var(--hairline)', borderRadius: 11,
            fontSize: 13.5, color: 'var(--ink)', background: 'white',
            outline: 'none', resize: 'vertical', boxSizing: 'border-box',
            fontFamily: 'var(--font-body)', lineHeight: 1.6,
            transition: 'border-color 0.14s',
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = '#E8923C' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--hairline)' }}
        />
        <StaffPetFormFieldErr msg={errors.description} />
      </div>
    </div>
  )
}
