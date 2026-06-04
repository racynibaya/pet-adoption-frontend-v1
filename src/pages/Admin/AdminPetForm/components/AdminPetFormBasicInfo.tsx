import {
  speciesLabel,
  genderLabel,
  sizeLabel,
  type Species,
  type Gender,
  type Size,
} from '@/data/pets'
import type {
  FormState,
  FormFieldErrors,
} from '@/pages/Staff/StaffPetForm/types'
import {
  SPECIES_OPTIONS,
  GENDER_OPTIONS,
  SIZE_OPTIONS,
  STATUS_OPTIONS,
} from '@/pages/Staff/StaffPetForm/constants/staffPetForm.constants'

interface AdminPetFormBasicInfoProps {
  form: FormState
  errors: FormFieldErrors
  set: <K extends keyof FormState>(key: K, value: FormState[K]) => void
}

export default function AdminPetFormBasicInfo({
  form,
  errors,
  set,
}: AdminPetFormBasicInfoProps) {
  return (
    <section className='bento-card a-section' style={{ ['--i' as string]: 1 }}>
      <div className='bento-eyebrow'>
        <span className='dot' /> Identity
      </div>
      <h3 className='bento-h'>Basic information</h3>
      <p className='bento-sub' style={{ marginBottom: 18 }}>
        These details appear on the public pet listing and in the adopter
        application. All required.
      </p>

      <div className='asf-card-body'>
        <div className='asf-grid-2'>
          <div className='asf-field'>
            <label htmlFor='apf-name' className='asf-label'>
              Pet name
            </label>
            <input
              id='apf-name'
              type='text'
              className={`asf-input${errors.name ? ' has-error' : ''}`}
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder='e.g. Biscuit'
              required
            />
            {errors.name && <span className='asf-error'>{errors.name}</span>}
          </div>

          <div className='asf-field'>
            <label htmlFor='apf-species' className='asf-label'>
              Species
            </label>
            <select
              id='apf-species'
              className={`asf-input${errors.species ? ' has-error' : ''}`}
              value={form.species}
              onChange={(e) => set('species', e.target.value as Species)}
            >
              {SPECIES_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {speciesLabel(s)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='asf-grid-2'>
          <div className='asf-field'>
            <label htmlFor='apf-breed' className='asf-label'>
              Breed
            </label>
            <input
              id='apf-breed'
              type='text'
              className={`asf-input${errors.breed ? ' has-error' : ''}`}
              value={form.breed}
              onChange={(e) => set('breed', e.target.value)}
              placeholder='e.g. Jack Russell Terrier'
              required
            />
            {errors.breed && <span className='asf-error'>{errors.breed}</span>}
          </div>

          <div className='asf-field'>
            <label htmlFor='apf-age' className='asf-label'>
              Age
              <span className='asf-label-hint'>months</span>
            </label>
            <input
              id='apf-age'
              type='number'
              min='0'
              max='600'
              className={`asf-input${errors.ageMonths ? ' has-error' : ''}`}
              value={form.ageMonths}
              onChange={(e) => set('ageMonths', e.target.value)}
              placeholder='24'
              required
            />
            {errors.ageMonths && (
              <span className='asf-error'>{errors.ageMonths}</span>
            )}
          </div>
        </div>

        <div className='asf-grid-2'>
          <div className='asf-field'>
            <label htmlFor='apf-gender' className='asf-label'>
              Gender
            </label>
            <select
              id='apf-gender'
              className={`asf-input${errors.gender ? ' has-error' : ''}`}
              value={form.gender}
              onChange={(e) => set('gender', e.target.value as Gender)}
            >
              {GENDER_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {genderLabel(g)}
                </option>
              ))}
            </select>
          </div>

          <div className='asf-field'>
            <label htmlFor='apf-size' className='asf-label'>
              Size
            </label>
            <select
              id='apf-size'
              className={`asf-input${errors.size ? ' has-error' : ''}`}
              value={form.size}
              onChange={(e) => set('size', e.target.value as Size)}
            >
              {SIZE_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {sizeLabel(s)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='asf-field'>
          <label htmlFor='apf-status' className='asf-label'>
            Status
            <span className='asf-label-hint'>controls public visibility</span>
          </label>
          <select
            id='apf-status'
            className={`asf-input${errors.status ? ' has-error' : ''}`}
            value={form.status}
            onChange={(e) =>
              set('status', e.target.value as FormState['status'])
            }
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  )
}
