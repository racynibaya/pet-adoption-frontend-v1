import { DonationTone } from '../types/donate.types';

export const TONE_INK: Record<DonationTone, string> = {
  amber: '#A55E24',
  teal: '#1D7575',
  rose: '#BF3B5C',
  cream: '#80481A',
};

export const TONE_BG: Record<DonationTone, string> = {
  amber: 'var(--cream)',
  teal: 'var(--mint)',
  rose: 'var(--rose)',
  cream: 'var(--cream-2)',
};
