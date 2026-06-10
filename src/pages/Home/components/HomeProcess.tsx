import Eyebrow from '@/components/ui/Eyebrow';
import { PROCESS_STEPS } from '../data';
import type { ProcessStep } from '../types';

type ProcessCardProps = {
  step: ProcessStep;
};

function ProcessCard({ step }: ProcessCardProps) {
  const { step: stepLabel, title, description, iconBackground, Icon } = step;
  return (
    <div
      className='bg-white rounded-18 relative [box-shadow:var(--shadow-soft)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1.25 hover:[box-shadow:var(--shadow-lift)]'
      style={{ padding: '32px 28px' }}
    >
      <span
        className='absolute flex items-center text-white text-11 font-bold tracking-6 uppercase rounded-full'
        style={{
          top: -12,
          left: 24,
          height: 26,
          padding: '0 12px',
          background: 'var(--rausch)',
        }}
      >
        {stepLabel}
      </span>
      <div
        className='w-14 h-14 rounded-14 inline-flex items-center justify-center mb-4.5'
        style={{ background: iconBackground }}
      >
        <Icon />
      </div>
      <h4 style={{ fontSize: 18, marginBottom: 6 }}>{title}</h4>
      <p style={{ fontSize: 14, color: 'var(--muted)' }}>{description}</p>
    </div>
  );
}

export default function HomeProcess() {
  return (
    <section className='section'>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div
          className='home-process-card rounded-28 relative overflow-hidden border border---hairline-soft)'
          style={{
            background: 'linear-gradient(145deg, var(--soft) 0%, #eae8e2 100%)',
          }}
        >
          <div className='section-head' style={{ marginBottom: 64 }}>
            <Eyebrow
              style={{
                display: 'block',
                justifyContent: 'center',
                marginBottom: 12,
              }}
            >
              How it works
            </Eyebrow>
            <h2>
              Three steps to your
              <br />
              forever companion
            </h2>
            <p>
              From browsing available pets to bringing one home — the entire
              adoption journey in one place.
            </p>
          </div>
          <div className='r-grid-3 gap-6 max-w-270 mx-auto'>
            {PROCESS_STEPS.map((step) => (
              <ProcessCard key={step.step} step={step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
