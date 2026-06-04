import type { ApiShelter } from '@/services/api'
import type {
  FormState,
  FormFieldErrors,
} from '@/pages/Staff/StaffPetForm/types'

interface AdminPetFormShelterProps {
  shelters: ApiShelter[]
  form: FormState
  errors: FormFieldErrors
  set: <K extends keyof FormState>(key: K, value: FormState[K]) => void
}

export default function AdminPetFormShelter({
  shelters,
  form,
  errors,
  set,
}: AdminPetFormShelterProps) {
  return (
    <section className='bento-card a-section' style={{ ['--i' as string]: 2 }}>
      <div className='bento-eyebrow'>
        <span className='dot' /> Shelter
      </div>
      <h3 className='bento-h'>Assigned shelter</h3>
      <p className='bento-sub' style={{ marginBottom: 18 }}>
        Which partner shelter is caring for this pet? Admins can list a pet
        under any shelter in the network.
      </p>

      <div className='asf-card-body'>
        <div className='asf-field'>
          <label htmlFor='apf-shelter' className='asf-label'>
            Shelter
            <span className='asf-label-hint'>
              {shelters.length} shelter{shelters.length === 1 ? '' : 's'} in the network
            </span>
          </label>
          <select
            id='apf-shelter'
            className={`asf-input${errors.shelterId ? ' has-error' : ''}`}
            value={form.shelterId}
            onChange={(e) => set('shelterId', e.target.value)}
            required
          >
            <option value=''>Select a shelter…</option>
            {shelters.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.shelterId && (
            <span className='asf-error'>{errors.shelterId}</span>
          )}
        </div>
      </div>
    </section>
  )
}
