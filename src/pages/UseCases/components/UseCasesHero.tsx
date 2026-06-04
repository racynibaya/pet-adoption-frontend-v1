import { Link } from 'react-router-dom';
import Eyebrow from '@/components/ui/Eyebrow';
import { HeroIllustration } from '../assets';

export default function UseCasesHero() {
  return (
    <section
      className='relative overflow-hidden rounded-[28px] mt-6 p-6 md:p-[72px_64px] grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 items-center'
      style={{
        background: `
          radial-gradient(ellipse 58% 54% at 82% 14%, rgba(29,117,117,0.15) 0%, transparent 53%),
          radial-gradient(ellipse 48% 52% at 18% 86%, rgba(232,146,60,0.18) 0%, transparent 54%),
          linear-gradient(156deg, #FDFAF4 0%, #F0E8D0 100%)
        `,
      }}
    >
      <div className='flex flex-col justify-evenly gap-10'>
        <Eyebrow>Partner shelters</Eyebrow>
        <h1 className='mt-4 text-[30px] sm:text-[40px] md:text-[64px] leading-[1.04]'>
          Find a shelter
          <br />
          near you
        </h1>
        <p className='text-(--ink-2) mt-4.5 max-w-120 text-[17px]'>
          Every shelter on KodaNest is reviewed and approved before they can
          list pets. Browse our network of rescue partners — from big
          multi-species centers to specialist sanctuaries.
        </p>
        <div className='hero-cta-row flex gap-3 mt-8'>
          <Link to='/pets' className='btn btn-primary btn-lg'>
            Browse pets
          </Link>
          <Link to='/contact' className='btn btn-outline btn-lg'>
            Become a partner
          </Link>
        </div>
      </div>
      <div className='hero-side-illu relative h-90'>
        <HeroIllustration />
      </div>
    </section>
  );
}
