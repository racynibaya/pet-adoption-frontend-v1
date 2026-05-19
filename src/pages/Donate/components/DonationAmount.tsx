import type { RefObject } from 'react';
import SectionHead from '@/components/ui/SectionHead';
import { IMPACT_TIERS } from '../data';
import { TONE_INK, TONE_BG } from '../constants/donate.tones';
import { formatPesoCurrency } from '../utils/formatDonation';
import type { DonationFieldErrors } from '../types/donate.types';

type DonationAmountProps = {
  tiersContainerRef: RefObject<HTMLElement>;
  customAmount: string;
  selectedAmount: number | null;
  formErrors: DonationFieldErrors;
  onCustomAmountChange: (rawAmount: string) => void;
  onSelectImpactTier: (amount: number) => void;
};

export default function DonationAmount({
  tiersContainerRef,
  customAmount,
  selectedAmount,
  formErrors,
  onCustomAmountChange,
  onSelectImpactTier,
}: DonationAmountProps) {
  return (
    <section ref={tiersContainerRef} className='section'>
      <SectionHead
        eyebrow='Your gift, your call'
        heading={
          <>
            Give{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--rausch)' }}>
              whatever feels right
            </em>
          </>
        }
        subheading='Type any amount — or pick a meaningful preset below.'
      />

      <div
        className='rounded-3xl relative overflow-hidden mx-auto'
        style={{
          maxWidth: 640,
          marginBottom: 'clamp(32px, 4vw, 56px)',
          padding: 'clamp(32px, 4vw, 48px)',
          background:
            'radial-gradient(ellipse 80% 90% at 50% 0%, rgba(253,221,176,0.7) 0%, transparent 70%),' +
            'linear-gradient(160deg, var(--cream) 0%, var(--canvas) 100%)',
          border: '1.5px solid var(--peach-stroke)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <label
          htmlFor='hero-amount'
          style={{
            display: 'block',
            fontSize: 12,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: 14,
            textAlign: 'center',
          }}
        >
          Any amount
        </label>
        <div className='flex items-center justify-center gap-2'>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 5vw, 56px)',
              fontWeight: 600,
              color: 'var(--rausch)',
              lineHeight: 1,
            }}
          >
            ₱
          </span>

          <input
            id='hero-amount'
            type='number'
            min='1'
            step='1'
            inputMode='decimal'
            placeholder='0,000'
            value={customAmount}
            onChange={(event) => onCustomAmountChange(event.target.value)}
            className='donate-hero-amount-input'
          />
        </div>
        <p
          style={{
            marginTop: 18,
            textAlign: 'center',
            fontSize: 14,
            color: 'var(--ink-2)',
            lineHeight: 1.5,
          }}
        >
          Even <strong style={{ color: 'var(--ink)' }}>₱100</strong> buys lunch
          for a rescue pup. Give what feels right.
        </p>
        {formErrors.amount && (
          <p
            role='alert'
            style={{
              fontSize: 13,
              color: '#c0304d',
              marginTop: 10,
              textAlign: 'center',
            }}
          >
            {formErrors.amount}
          </p>
        )}
      </div>

      <div
        className='flex items-center gap-4 mx-auto'
        style={{
          maxWidth: 480,
          marginBottom: 'clamp(28px, 3vw, 44px)',
          color: 'var(--muted)',
          fontSize: 12,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        <span style={{ flex: 1, height: 1, background: 'var(--hairline)' }} />
        <span>or pick a meaningful preset</span>
        <span style={{ flex: 1, height: 1, background: 'var(--hairline)' }} />
      </div>

      <div
        className='grid gap-6 donate-tier-grid'
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        }}
      >
        {IMPACT_TIERS.map((tier) => {
          const isActive = selectedAmount === tier.amount && !customAmount;
          return (
            <button
              key={tier.amount}
              type='button'
              onClick={() => onSelectImpactTier(tier.amount)}
              className='text-left rounded-3xl relative overflow-hidden transition-[transform,box-shadow,border-color] duration-200 cursor-pointer'
              style={{
                padding: 'clamp(28px, 3vw, 40px) clamp(24px, 3vw, 32px)',
                background: 'var(--canvas)',
                border: `2px solid ${isActive ? TONE_INK[tier.tone] : 'var(--hairline-soft)'}`,
                boxShadow: isActive
                  ? 'var(--shadow-lift)'
                  : 'var(--shadow-card)',
                transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
                fontFamily: 'inherit',
              }}
            >
              {isActive && (
                <span
                  className='absolute rounded-full'
                  style={{
                    top: 18,
                    right: 18,
                    padding: '5px 12px',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    background: TONE_INK[tier.tone],
                    color: '#fff',
                  }}
                >
                  Chosen
                </span>
              )}

              <div
                className='inline-flex items-center justify-center rounded-2xl'
                style={{
                  width: 60,
                  height: 60,
                  background: TONE_BG[tier.tone],
                }}
              >
                <tier.Icon />
              </div>
              <div
                className='mt-7 flex items-baseline gap-2'
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <span
                  style={{
                    fontSize: 40,
                    fontWeight: 600,
                    color: 'var(--ink)',
                    lineHeight: 1,
                  }}
                >
                  {formatPesoCurrency(tier.amount)}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    color: 'var(--muted)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  one-time
                </span>
              </div>
              <h3
                style={{
                  marginTop: 14,
                  fontSize: 17,
                  color: TONE_INK[tier.tone],
                }}
              >
                {tier.label}
              </h3>
              <p
                style={{
                  marginTop: 10,
                  fontSize: 13.5,
                  color: 'var(--ink-2)',
                  lineHeight: 1.55,
                }}
              >
                {tier.detail}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
