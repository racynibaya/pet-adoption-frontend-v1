import { TONE_INK } from '../../constants/donate.tones';
import type { DonationTone } from '../../types/donate.types';

type QuoteMarkProps = {
  tone: DonationTone;
};

export const QuoteMark = ({ tone }: QuoteMarkProps) => (
  <svg width='34' height='28' viewBox='0 0 34 28' fill='none' aria-hidden>
    <path
      d='M4 24 V14 Q4 6 14 4 V8 Q9 10 9 14 H14 V24 Z M20 24 V14 Q20 6 30 4 V8 Q25 10 25 14 H30 V24 Z'
      fill={TONE_INK[tone]}
      opacity='0.5'
    />
  </svg>
);
