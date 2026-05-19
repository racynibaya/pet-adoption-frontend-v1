import SectionHead from '@/components/ui/SectionHead';
import { QuoteMark } from '../assets';
import { DONOR_VOICES } from '../constants/donate.constants';
import { TONE_BG, TONE_INK } from '../constants/donate.tones';

export default function DonationVoices() {
  return (
    <section className='section'>
      <SectionHead
        eyebrow='Voices'
        heading='Why people give'
        subheading='Real words from real donors who chose to step in.'
      />
      <div
        className='grid gap-6'
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}
      >
        {DONOR_VOICES.map((voice) => (
          <figure
            key={voice.name}
            className='rounded-3xl relative'
            style={{
              padding:
                'clamp(32px, 3vw, 44px) clamp(28px, 3vw, 36px) clamp(28px, 3vw, 36px)',
              background: TONE_BG[voice.tone],
              border: `1px solid ${TONE_INK[voice.tone]}22`,
              margin: 0,
            }}
          >
            <span className='absolute' style={{ top: 22, right: 24 }}>
              <QuoteMark tone={voice.tone} />
            </span>
            <blockquote
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 19,
                lineHeight: 1.55,
                color: 'var(--ink)',
                margin: 0,
                paddingRight: 40,
              }}
            >
              {voice.quote}
            </blockquote>
            <figcaption
              className='mt-7 flex items-center gap-3'
              style={{ fontSize: 13.5 }}
            >
              <span
                className='inline-flex items-center justify-center rounded-full'
                style={{
                  width: 36,
                  height: 36,
                  background: 'rgba(255,255,255,0.7)',
                  color: TONE_INK[voice.tone],
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                }}
              >
                {voice.name[0]}
              </span>
              <span>
                <strong style={{ color: 'var(--ink)' }}>{voice.name}</strong>
                <span style={{ color: 'var(--muted)', marginLeft: 6 }}>
                  · {voice.city}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
