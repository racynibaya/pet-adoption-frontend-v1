import type { FormState, FormFieldErrors } from '../types'
import { chapterCard, questionLabel, numberInput } from '../constants/petApply.constants'
import PetApplyChapterHead from './PetApplyChapterHead'
import PetApplyYesNoPills from './PetApplyYesNoPills'
import PetApplyMarginErr from './PetApplyMarginErr'

interface PetApplyChapter2HouseholdProps {
  form: FormState
  errors: FormFieldErrors
  set: <K extends keyof FormState>(key: K, value: FormState[K]) => void
}

export default function PetApplyChapter2Household({ form, errors, set }: PetApplyChapter2HouseholdProps) {
  return (
    <section style={chapterCard}>
      <PetApplyChapterHead
        num='02'
        title='Your household'
        subtitle='Who lives with you, and who else shares the space?'
      />

      <div data-field='householdSize' style={{ maxWidth: 200 }}>
        <p style={questionLabel}>How many people live in your home?</p>
        <input
          type='number'
          value={form.householdSize}
          onChange={(e) => set('householdSize', e.target.value)}
          placeholder='e.g. 3'
          min={1}
          max={50}
          style={{ ...numberInput, marginTop: 14 }}
          onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--rausch)' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--hairline)' }}
        />
        <PetApplyMarginErr msg={errors.householdSize} />
      </div>

      <div data-field='hasChildren' style={{ marginTop: 32 }}>
        <p style={questionLabel}>Are there children in the home?</p>
        <PetApplyYesNoPills value={form.hasChildren} onChange={(v) => set('hasChildren', v)} />
        <PetApplyMarginErr msg={errors.hasChildren} />
      </div>

      <div data-field='hasOtherPetsNow' style={{ marginTop: 32 }}>
        <p style={questionLabel}>Do you currently have other pets?</p>
        <PetApplyYesNoPills value={form.hasOtherPetsNow} onChange={(v) => set('hasOtherPetsNow', v)} />
        <PetApplyMarginErr msg={errors.hasOtherPetsNow} />
      </div>
    </section>
  )
}
