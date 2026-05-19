import { Link } from 'react-router-dom';
import {
  HeroDogBubble,
  HeroCatBubble,
  HeroBrushStrokes,
  HeroVetIllustration,
  PawPrintsDeco,
} from '../assets';

export default function HomeHero() {
  return (
    <section
      className='home-hero r-grid-hero mt-6 rounded-[28px] overflow-hidden relative gap-8 items-end'
      style={{
        background:
          'radial-gradient(ellipse 65% 55% at 84% 16%, rgba(93,181,196,0.45) 0%, transparent 52%),' +
          'radial-gradient(ellipse 50% 60% at 16% 88%, rgba(253,224,178,0.65) 0%, transparent 55%),' +
          'radial-gradient(ellipse 38% 48% at 52% 52%, rgba(255,253,247,0.3) 0%, transparent 60%),' +
          'linear-gradient(162deg, #FDF5E2 0%, #FBEAD0 100%)',
      }}
    >
      <div className='home-hero-text'>
        <HeroDogBubble />

        <h1 className='hero-title'>
          Find your next
          <br />
          family member
        </h1>
        <p
          className='mt-6 text-[17px] max-w-115'
          style={{ color: 'var(--ink-2)' }}
        >
          Browse adoptable pets from shelters near you, submit an application,
          and bring a new companion home. Every pet on KodaNest is listed by a
          verified shelter — no middlemen, no guesswork.
        </p>
        <div className='hero-cta-row mt-9 flex gap-3.5'>
          <Link className='btn btn-primary btn-lg' to='/pets'>
            Browse Pets
          </Link>
          <Link className='btn btn-outline btn-lg' to='/shelters'>
            Find Shelters
          </Link>
        </div>

        <PawPrintsDeco />
      </div>

      <div className='home-hero-illu relative self-end'>
        <HeroBrushStrokes />
        <HeroCatBubble />
        <HeroVetIllustration />
      </div>
    </section>
  );
}
