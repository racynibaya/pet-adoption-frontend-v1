import type { FormState, FormFieldErrors } from '../types'
import { chapterCard, questionLabel, helperText, numberInput } from '../constants/petApply.constants'
import PetApplyChapterHead from './PetApplyChapterHead'
import PetApplyYesNoPills from './PetApplyYesNoPills'
import PetApplyJournalTextarea from './PetApplyJournalTextarea'
import PetApplyMarginErr from './PetApplyMarginErr'

interface PetApplyChapter4CareProps {
  form: FormState
  errors: FormFieldErrors
  petName: string
  set: <K extends keyof FormState>(key: K, value: FormState[K]) => void
}

export default function PetApplyChapter4Care({ form, errors, petName, set }: PetApplyChapter4CareProps) {
  return (
    <section style={chapterCard}>
      <PetApplyChapterHead
        num='04'
        title='Your care commitment'
        subtitle='The honest stuff — schedule, motivation, and the long view.'
      />

      <div data-field='hoursAwayPerDay' style={{ maxWidth: 200 }}>
        <p style={questionLabel}>Hours away from home each day?</p>
        <input
          type='number'
          value={form.hoursAwayPerDay}
          onChange={(e) => set('hoursAwayPerDay', e.target.value)}
          placeholder='0–24'
          min={0}
          max={24}
          style={{ ...numberInput, marginTop: 14 }}
          onFocus={(e) => { e.currentTarget.style.borderColor = '#E8923C' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--hairline)' }}
        />
        <PetApplyMarginErr msg={errors.hoursAwayPerDay} />
      </div>

      <div data-field='reasonForAdopting' style={{ marginTop: 32 }}>
        <p style={questionLabel}>Why do you want to adopt {petName}?</p>
        <p style={helperText}>
          Speak from your own life — your routine, what drew you to {petName},
          what your weeks tend to look like.
        </p>
        <PetApplyJournalTextarea
          value={form.reasonForAdopting}
          onChange={(v) => set('reasonForAdopting', v)}
          placeholder='I noticed in the listing that…'
          rows={6}
        />
        <PetApplyMarginErr msg={errors.reasonForAdopting} />
      </div>

      <div data-field='hasBackupCarePlan' style={{ marginTop: 32 }}>
        <p style={questionLabel}>Do you have a backup plan if you can't care for the pet?</p>
        <p style={helperText}>
          Travel, illness, life surprises — who steps in for the day or the week?
        </p>
        <PetApplyYesNoPills value={form.hasBackupCarePlan} onChange={(v) => set('hasBackupCarePlan', v)} />
        <PetApplyMarginErr msg={errors.hasBackupCarePlan} />
      </div>

      <div data-field='awareOfMonthlyCosts' style={{ marginTop: 32 }}>
        <p style={questionLabel}>Are you aware of the monthly costs of pet care?</p>
        <p style={helperText}>Food, vet visits, grooming, the occasional emergency.</p>
        <PetApplyYesNoPills value={form.awareOfMonthlyCosts} onChange={(v) => set('awareOfMonthlyCosts', v)} />
        <PetApplyMarginErr msg={errors.awareOfMonthlyCosts} />
      </div>

      <div data-field='message' style={{ marginTop: 32 }}>
        <p style={questionLabel}>Anything else for the shelter? (optional)</p>
        <p style={helperText}>A short note, a question, something they should know.</p>
        <PetApplyJournalTextarea
          value={form.message}
          onChange={(v) => set('message', v)}
          placeholder='Hello — '
          rows={4}
        />
        <PetApplyMarginErr msg={errors.message} />
      </div>
    </section>
  )
}
