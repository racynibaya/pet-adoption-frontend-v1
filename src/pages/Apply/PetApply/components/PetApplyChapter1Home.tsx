import type { FormState, FormFieldErrors } from '../types'
import { chapterCard, questionLabel, helperText } from '../constants/petApply.constants'
import PetApplyChapterHead from './PetApplyChapterHead'
import PetApplyHomeTypeChoice from './PetApplyHomeTypeChoice'
import PetApplyYesNoPills from './PetApplyYesNoPills'
import PetApplyCollapsible from './PetApplyCollapsible'
import PetApplyMarginErr from './PetApplyMarginErr'

interface PetApplyChapter1HomeProps {
  form: FormState
  errors: FormFieldErrors
  set: <K extends keyof FormState>(key: K, value: FormState[K]) => void
}

export default function PetApplyChapter1Home({ form, errors, set }: PetApplyChapter1HomeProps) {
  return (
    <section style={chapterCard}>
      <PetApplyChapterHead
        num='01'
        title='Your home'
        subtitle='Where would this little one be sleeping, eating, and exploring?'
      />

      <div data-field='homeType'>
        <p style={questionLabel}>What kind of home do you live in?</p>
        <PetApplyHomeTypeChoice value={form.homeType} onChange={(v) => set('homeType', v)} />
        <PetApplyMarginErr msg={errors.homeType} />
      </div>

      <div data-field='hasYard' style={{ marginTop: 32 }}>
        <p style={questionLabel}>Do you have a yard?</p>
        <PetApplyYesNoPills
          value={form.hasYard}
          onChange={(v) => {
            set('hasYard', v)
            if (!v) set('yardFenced', null)
          }}
        />
        <PetApplyMarginErr msg={errors.hasYard} />
      </div>

      <PetApplyCollapsible open={form.hasYard === true}>
        <div data-field='yardFenced'>
          <p style={questionLabel}>Is the yard fenced?</p>
          <p style={helperText}>A safe perimeter matters more for some pets than others.</p>
          <PetApplyYesNoPills value={form.yardFenced} onChange={(v) => set('yardFenced', v)} />
          <PetApplyMarginErr msg={errors.yardFenced} />
        </div>
      </PetApplyCollapsible>

      <div data-field='ownsHome' style={{ marginTop: 32 }}>
        <p style={questionLabel}>Do you own your home?</p>
        <PetApplyYesNoPills
          value={form.ownsHome}
          onChange={(v) => {
            set('ownsHome', v)
            if (v) set('landlordAllowsPets', null)
          }}
        />
        <PetApplyMarginErr msg={errors.ownsHome} />
      </div>

      <PetApplyCollapsible open={form.ownsHome === false}>
        <div data-field='landlordAllowsPets'>
          <p style={questionLabel}>Does your landlord allow pets?</p>
          <p style={helperText}>If yes, the shelter may request written confirmation later.</p>
          <PetApplyYesNoPills value={form.landlordAllowsPets} onChange={(v) => set('landlordAllowsPets', v)} />
          <PetApplyMarginErr msg={errors.landlordAllowsPets} />
        </div>
      </PetApplyCollapsible>
    </section>
  )
}
