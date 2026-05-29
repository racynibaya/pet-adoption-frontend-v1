import type { FormState, FormFieldErrors } from '../types'

interface AdminShelterFormDescriptionProps {
  form: FormState
  errors: FormFieldErrors
  set: <K extends keyof FormState>(key: K, value: FormState[K]) => void
}

export default function AdminShelterFormDescription({
  form,
  errors,
  set,
}: AdminShelterFormDescriptionProps) {
  const trimmed = form.description.trim()
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0

  return (
    <section className='bento-card a-section' style={{ ['--i' as string]: 2 }}>
      <div className='bento-eyebrow'>
        <span className='dot' /> About
      </div>
      <h3 className='bento-h'>Description</h3>
      <p className='bento-sub' style={{ marginBottom: 18 }}>
        Mission, history, the kinds of animals cared for. Two short paragraphs
        is usually enough.
      </p>

      <div className='asf-card-body'>
        <div className='asf-field'>
          <label htmlFor='asf-desc' className='asf-label'>
            About this shelter
            <span className='asf-label-hint'>
              {wordCount === 0
                ? 'no words yet'
                : `${wordCount} word${wordCount === 1 ? '' : 's'}`}
            </span>
          </label>
          <textarea
            id='asf-desc'
            className={`asf-textarea${errors.description ? ' has-error' : ''}`}
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            placeholder='Founded in 2014 by a small group of volunteers, this shelter has placed more than 800 dogs and cats into adoring homes…'
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
