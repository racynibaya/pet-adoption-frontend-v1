import SectionHead from '@/components/ui/SectionHead';
import { FEATURES } from '../data';
import type { FeatureItem } from '../types';

type FeatureRowProps = {
  feature: FeatureItem;
};

function FeatureRow({ feature }: FeatureRowProps) {
  const { title, description, iconBackground, Icon } = feature;
  return (
    <div
      className='grid items-start gap-5 transition-transform duration-200 hover:-translate-y-1'
      style={{ gridTemplateColumns: '64px 1fr' }}
    >
      <div
        className='w-16 h-16 rounded-full inline-flex items-center justify-center transition-transform duration-200 hover:scale-110 hover:-rotate-6'
        style={{ background: iconBackground }}
      >
        <Icon />
      </div>
      <div>
        <h3 className='mb-2' style={{ fontSize: 19 }}>
          {title}
        </h3>
        <p
          className='text-15 leading-relaxed'
          style={{ color: 'var(--ink-2)' }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export default function HomeFeatures() {
  return (
    <section className='section'>
      <SectionHead
        heading={
          <>
            Everything you need to
            <br />
            adopt with confidence
          </>
        }
        subheading='KodaNest connects adopters directly with verified shelters. Browse available pets, submit a proof-of-care application, and track your request every step of the way.'
      />
      <div className='r-grid-2 max-w-245 mx-auto home-features-grid'>
        {FEATURES.map((feature) => (
          <FeatureRow key={feature.title} feature={feature} />
        ))}
      </div>
    </section>
  );
}
