import Eyebrow from '@/components/ui/Eyebrow'
import { PawprintDeco } from '../assets'

export default function ContactHero() {
  return (
    <section
      className='contact-hero mt-6 rounded-28 text-center relative overflow-hidden'
      style={{
        background:
          'radial-gradient(ellipse 55% 60% at 78% 18%, rgba(93,181,196,0.45) 0%, transparent 50%),' +
          'radial-gradient(ellipse 50% 55% at 22% 82%, rgba(253,224,178,0.58) 0%, transparent 52%),' +
          'linear-gradient(155deg, #FDF5E2 0%, #F9E8CC 100%)',
      }}
    >
      <span className='contact-paw-tl'>
        <PawprintDeco />
      </span>
      <span className='contact-paw-br'>
        <PawprintDeco />
      </span>
      <Eyebrow style={{ justifyContent: 'center' }}>Get in touch</Eyebrow>
      <div className='flex items-center flex-col'>
        <h1 className='hero-title mt-16 max-w-180 mx-auto'>
          Have a question?
          <br />
          We're here to help
        </h1>
        <p
          className='max-w-140 mx-auto text-17'
          style={{ marginTop: 20, color: 'var(--ink-2)' }}
        >
          Reach out about adoption, your application status, registering a
          shelter, or anything else. A real person replies within 24 hours.
        </p>
      </div>
    </section>
  )
}
