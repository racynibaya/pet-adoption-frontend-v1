import type {
  FormState,
  FormFieldErrors,
} from '@/pages/Staff/StaffPetForm/types'

interface AdminPetFormDescriptionProps {
  form: FormState
  errors: FormFieldErrors
  set: <K extends keyof FormState>(key: K, value: FormState[K]) => void
}

export default function AdminPetFormDescription({
  form,
  errors,
  set,
}: AdminPetFormDescriptionProps) {
  const trimmed = form.description.trim()
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0

  return (
    <section className='bento-card a-section' style={{ ['--i' as string]: 3 }}>
      <div className='bento-eyebrow'>
        <span className='dot' /> About
      </div>
      <h3 className='bento-h'>Description</h3>
      <p className='bento-sub' style={{ marginBottom: 18 }}>
        Personality, history, what kind of home would suit them. Two short
        paragraphs is usually enough.
      </p>

      <div className='asf-card-body'>
        <div className='asf-field'>
          <label htmlFor='apf-desc' className='asf-label'>
            About this pet
            <span className='asf-label-hint'>
              {wordCount === 0
                ? 'no words yet'
                : `${wordCount} word${wordCount === 1 ? '' : 's'}`}
            </span>
          </label>
          <textarea
            id='apf-desc'
            className={`asf-textarea${errors.description ? ' has-error' : ''}`}
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            placeholder='Biscuit was rescued from a roadside in early 2024. She loves walks, is fully house-trained, and gets on well with other small dogs…'
            rows={6}
          />
          {errors.description && (
            <span className='asf-error'>{errors.description}</span>
          )}
        </div>
      </div>
    </section>
  )
}
