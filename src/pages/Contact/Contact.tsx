import {
  ContactHero,
  ContactReachCards,
  ContactForm,
  ContactInfo,
  ContactFaq,
} from './components'
import { useContactForm } from './hooks/useContactForm'

export default function ContactPage() {
  const f = useContactForm()

  return (
    <>
      <ContactHero />
      <ContactReachCards />
      <div className='r-grid-side gap-16 items-start contact-form-grid'>
        <ContactForm
          activeTopic={f.activeTopic}
          submitted={f.submitted}
          formData={f.formData}
          onTopicChange={f.setActiveTopic}
          onUpdate={f.update}
          onSubmit={f.handleSubmit}
        />
        <ContactInfo />
      </div>
      <ContactFaq />
    </>
  )
}
