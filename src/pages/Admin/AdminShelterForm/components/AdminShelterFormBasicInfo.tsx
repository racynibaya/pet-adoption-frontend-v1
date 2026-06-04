import type { FormState, FormFieldErrors } from '../types'

interface AdminShelterFormBasicInfoProps {
  form: FormState
  errors: FormFieldErrors
  set: <K extends keyof FormState>(key: K, value: FormState[K]) => void
}

export default function AdminShelterFormBasicInfo({
  form,
  errors,
  set,
}: AdminShelterFormBasicInfoProps) {
  return (
    <section className='bento-card a-section' style={{ ['--i' as string]: 1 }}>
      <div className='bento-eyebrow'>
        <span className='dot' /> Identity
      </div>
      <h3 className='bento-h'>Basic information</h3>
      <p className='bento-sub' style={{ marginBottom: 18 }}>
        These details appear on the public shelter directory and on every pet
        listed under this shelter.
      </p>

      <div className='asf-card-body'>
        <div className='asf-field'>
          <label htmlFor='asf-name' className='asf-label'>
            Shelter name
            <span className='asf-label-hint'>min. 5 characters</span>
          </label>
          <input
            id='asf-name'
            type='text'
            className={`asf-input${errors.name ? ' has-error' : ''}`}
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder='e.g. San Agustin HQ Animal Rescue'
            required
          />
          {errors.name && <span className='asf-error'>{errors.name}</span>}
        </div>

        <div className='asf-grid-2'>
          <div className='asf-field'>
            <label htmlFor='asf-email' className='asf-label'>
              Contact email
            </label>
            <input
              id='asf-email'
              type='email'
              className={`asf-input${errors.contactEmail ? ' has-error' : ''}`}
              value={form.contactEmail}
              onChange={(e) => set('contactEmail', e.target.value)}
              placeholder='hello@shelter.org'
              required
            />
            {errors.contactEmail && (
              <span className='asf-error'>{errors.contactEmail}</span>
            )}
          </div>

          <div className='asf-field'>
            <label htmlFor='asf-phone' className='asf-label'>
              Phone number
            </label>
            <input
              id='asf-phone'
              type='tel'
              className={`asf-input${errors.phoneNumber ? ' has-error' : ''}`}
              value={form.phoneNumber}
              onChange={(e) => set('phoneNumber', e.target.value)}
              placeholder='+63 917 123 4567'
              required
            />
            {errors.phoneNumber && (
              <span className='asf-error'>{errors.phoneNumber}</span>
            )}
          </div>
        </div>

        <div className='asf-field'>
          <label htmlFor='asf-address-line' className='asf-label'>
            Street address
            <span className='asf-label-hint'>street, barangay, etc.</span>
          </label>
          <input
            id='asf-address-line'
            type='text'
            className={`asf-input${errors.addressLine ? ' has-error' : ''}`}
            value={form.addressLine}
            onChange={(e) => set('addressLine', e.target.value)}
            placeholder='102 Acacia St., Brgy. Sta. Cruz'
            required
          />
          {errors.addressLine && (
            <span className='asf-error'>{errors.addressLine}</span>
          )}
        </div>

        <div className='asf-grid-2'>
          <div className='asf-field'>
            <label htmlFor='asf-city' className='asf-label'>
              City
            </label>
            <input
              id='asf-city'
              type='text'
              className={`asf-input${errors.city ? ' has-error' : ''}`}
              value={form.city}
              onChange={(e) => set('city', e.target.value)}
              placeholder='Quezon City'
              required
            />
            {errors.city && <span className='asf-error'>{errors.city}</span>}
          </div>

          <div className='asf-field'>
            <label htmlFor='asf-province' className='asf-label'>
              Province
            </label>
            <input
              id='asf-province'
              type='text'
              className={`asf-input${errors.province ? ' has-error' : ''}`}
              value={form.province}
              onChange={(e) => set('province', e.target.value)}
              placeholder='Metro Manila'
              required
            />
            {errors.province && (
              <span className='asf-error'>{errors.province}</span>
            )}
          </div>
        </div>

        <div className='asf-field'>
          <label htmlFor='asf-region' className='asf-label'>
            Region
          </label>
          <select
            id='asf-region'
            className={`asf-input${errors.region ? ' has-error' : ''}`}
            value={form.region}
            onChange={(e) =>
              set('region', e.target.value as FormState['region'])
            }
            required
          >
            <option value='LUZON'>Luzon</option>
            <option value='VISAYAS'>Visayas</option>
            <option value='MINDANAO'>Mindanao</option>
          </select>
          {errors.region && <span className='asf-error'>{errors.region}</span>}
        </div>
      </div>
    </section>
  )
}
