import Eyebrow from '@/components/ui/Eyebrow'
import { PawprintDeco } from '../assets'

export default function AboutHero() {
  return (
    <section
      className='about-hero mt-6 rounded-28 text-center relative overflow-hidden'
      style={{
        background:
          'radial-gradient(ellipse 60% 50% at 20% 10%, rgba(93,181,196,0.45) 0%, transparent 55%),' +
          'radial-gradient(ellipse 45% 55% at 80% 85%, rgba(253,224,178,0.62) 0%, transparent 52%),' +
          'radial-gradient(ellipse 35% 45% at 55% 50%, rgba(255,253,247,0.25) 0%, transparent 60%),' +
          'linear-gradient(158deg, #FDF5E2 0%, #FBEAD0 100%)',
      }}
    >
      <span className='about-paw-tl'>
        <PawprintDeco />
      </span>
      <span className='about-paw-br'>
        <PawprintDeco flip />
      </span>
      <Eyebrow style={{ justifyContent: 'center' }}>About KodaNest</Eyebrow>
      <div className='flex items-center flex-col'>
        <h1 className='hero-title mt-16 max-w-220 mx-auto'>
          Built by people
          <br />
          who can't stop
          <br />
          looking at dogs
        </h1>
        <p
          className='max-w-155 mx-auto text-18'
          style={{ marginTop: 24, color: 'var(--ink-2)' }}
        >
          We started KodaNest in 2023 because finding the right home for a
          rescue pet shouldn't feel like a search engine result — it should
          feel like meeting a friend. Today we connect 12,000+ households with
          adoptable pets from verified shelters across 40 cities in the
          Philippines.
        </p>
      </div>
    </section>
  )
}
