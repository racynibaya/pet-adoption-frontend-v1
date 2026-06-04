import type { FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import type { ContactFormData, Topic } from '../types'
import { TOPIC_BUTTONS } from '../data'
import ContactFormSuccess from './ContactFormSuccess'

interface ContactFormProps {
  activeTopic: Topic
  submitted: boolean
  formData: ContactFormData
  onTopicChange: (topic: Topic) => void
  onUpdate: <K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) => void
  onSubmit: (e: FormEvent) => void
}

export default function ContactForm({
  activeTopic,
  submitted,
  formData,
  onTopicChange,
  onUpdate,
  onSubmit,
}: ContactFormProps) {
  return (
    <form
      className='bg-(--canvas) border border-(--hairline-soft) rounded-3xl'
      style={{ padding: 40 }}
      onSubmit={onSubmit}
    >
      {submitted ? (
        <ContactFormSuccess />
      ) : (
        <div className='flex flex-col gap-4.5'>
          <div>
            <h2 style={{ fontSize: 32 }}>Tell us a bit about you</h2>
            <p className='muted mt-8'>
              Pick a topic, fill in the details, and we'll match you to the
              right counselor.
            </p>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 10 }}>
              What's it about?
            </label>
            <div className='r-grid-4 gap-2.5 contact-topic-grid'>
              {TOPIC_BUTTONS.map(({ key, label, icon }) => (
                <button
                  key={key}
                  type='button'
                  onClick={() => onTopicChange(key)}
                  className='border-[1.5px] rounded-[14px] text-center cursor-pointer text-[13px] font-medium transition-[border-color,background,transform,box-shadow] duration-200 hover:border-(--ink) hover:-translate-y-0.5 hover:[box-shadow:var(--shadow-soft)] active:scale-[0.96]'
                  style={{
                    padding: '14px 8px',
                    fontFamily: 'inherit',
                    background: activeTopic === key ? 'var(--cream)' : 'var(--canvas)',
                    borderColor: activeTopic === key ? 'var(--ink)' : 'var(--hairline)',
                  }}
                >
                  <span className='block mx-auto mb-1.5 transition-transform duration-200 hover:scale-[1.15]'>
                    {icon}
                  </span>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className='r-grid-form-2 gap-4'>
            <div className='field'>
              <label htmlFor='firstName'>First name</label>
              <input
                id='firstName'
                type='text'
                placeholder='John'
                required
                value={formData.firstName}
                onChange={(e) => onUpdate('firstName', e.target.value)}
              />
            </div>
            <div className='field'>
              <label htmlFor='lastName'>Last name</label>
              <input
                id='lastName'
                type='text'
                placeholder='Doe'
                required
                value={formData.lastName}
                onChange={(e) => onUpdate('lastName', e.target.value)}
              />
            </div>
          </div>

          <div className='r-grid-form-2 gap-4'>
            <div className='field'>
              <label htmlFor='email'>Email</label>
              <input
                id='email'
                type='email'
                placeholder='you@example.com'
                required
                value={formData.email}
                onChange={(e) => onUpdate('email', e.target.value)}
              />
            </div>
            <div className='field'>
              <label htmlFor='phone'>Phone (optional)</label>
              <input
                id='phone'
                type='tel'
                placeholder='+63 9XX XXX XXX'
                value={formData.phone}
                onChange={(e) => onUpdate('phone', e.target.value)}
              />
            </div>
          </div>

          <div className='r-grid-form-2 gap-4'>
            <div className='field'>
              <label htmlFor='city'>Where are you?</label>
              <select
                id='city'
                value={formData.city}
                onChange={(e) => onUpdate('city', e.target.value)}
              >
                <option>San Agustin, PH</option>
                <option>Port Bonifacio, MNL</option>
                <option>Siargao, AFM</option>
                <option>Other</option>
              </select>
            </div>
            <div className='field'>
              <label htmlFor='pet'>Pet (or hoping for)</label>
              <select
                id='pet'
                value={formData.pet}
                onChange={(e) => onUpdate('pet', e.target.value)}
              >
                <option>Dog</option>
                <option>Cat</option>
                <option>Rabbit</option>
                <option>Bird</option>
                <option>Reptile</option>
                <option>Not sure yet</option>
              </select>
            </div>
          </div>

          <div className='field'>
            <label htmlFor='message'>Anything else we should know?</label>
            <textarea
              id='message'
              placeholder="Tell us about your home, schedule, or the pet you're looking for…"
              value={formData.message}
              onChange={(e) => onUpdate('message', e.target.value)}
            />
          </div>

          <div
            className='flex gap-3 items-center rounded-xl'
            style={{ padding: 14, background: 'var(--soft)' }}
          >
            <input
              type='checkbox'
              id='updates'
              style={{ width: 18, height: 18, accentColor: 'var(--rausch)' }}
              checked={formData.updates}
              onChange={(e) => onUpdate('updates', e.target.checked)}
            />
            <label
              htmlFor='updates'
              style={{ fontSize: 14, color: 'var(--ink-2)', cursor: 'pointer' }}
            >
              Send me monthly stories about adoptions, foster wins, and care
              tips. No spam, no exclamation marks.
            </label>
          </div>

          <button type='submit' className='btn btn-primary btn-lg inline-flex items-center justify-center gap-2' style={{ width: '100%' }}>
            Send my message <ArrowRight size={16} />
          </button>
        </div>
      )}
    </form>
  )
}
