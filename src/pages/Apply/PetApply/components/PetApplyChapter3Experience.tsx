import type { FormState, FormFieldErrors } from '../types'
import { chapterCard, questionLabel, numberInput } from '../constants/petApply.constants'
import PetApplyChapterHead from './PetApplyChapterHead'
import PetApplyYesNoPills from './PetApplyYesNoPills'
import PetApplyCollapsible from './PetApplyCollapsible'
import PetApplyMarginErr from './PetApplyMarginErr'

interface PetApplyChapter3ExperienceProps {
  form: FormState
  errors: FormFieldErrors
  set: <K extends keyof FormState>(key: K, value: FormState[K]) => void
}

export default function PetApplyChapter3Experience({ form, errors, set }: PetApplyChapter3ExperienceProps) {
  return (
    <section style={chapterCard}>
      <PetApplyChapterHead
        num='03'
        title='Your experience'
        subtitle='Have you done this dance before?'
      />

      <div data-field='hasPreviousPetExperience'>
        <p style={questionLabel}>Have you cared for a pet before?</p>
        <PetApplyYesNoPills
          value={form.hasPreviousPetExperience}
          onChange={(v) => {
            set('hasPreviousPetExperience', v)
            if (!v) set('yearsOfPetExperience', '')
          }}
        />
        <PetApplyMarginErr msg={errors.hasPreviousPetExperience} />
      </div>

      <PetApplyCollapsible open={form.hasPreviousPetExperience === true}>
        <div data-field='yearsOfPetExperience' style={{ maxWidth: 200 }}>
          <p style={questionLabel}>How many years, roughly?</p>
          <input
            type='number'
            value={form.yearsOfPetExperience}
            onChange={(e) => set('yearsOfPetExperience', e.target.value)}
            placeholder='e.g. 5'
            min={0}
            max={100}
            style={{ ...numberInput, marginTop: 14 }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--rausch)' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--hairline)' }}
          />
          <PetApplyMarginErr msg={errors.yearsOfPetExperience} />
        </div>
      </PetApplyCollapsible>
    </section>
  )
}
