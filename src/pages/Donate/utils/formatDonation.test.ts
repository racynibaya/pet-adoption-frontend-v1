import { describe, it, expect } from 'vitest';
import {
  computeEffectiveAmount,
  isAmountValid,
  validateDonationForm,
  getShortCity,
  formatPesoCurrency,
} from './formatDonation';

describe('computeEffectiveAmount', () => {
  it('prefers a non-empty custom amount over the selected tier', () => {
    expect(computeEffectiveAmount('750', 1500)).toBe(750);
  });

  it('falls back to the selected amount when custom is empty', () => {
    expect(computeEffectiveAmount('', 1500)).toBe(1500);
  });

  it('returns 0 when neither is set', () => {
    expect(computeEffectiveAmount('', null)).toBe(0);
  });
});

describe('isAmountValid', () => {
  it('accepts amounts of 1 or more', () => {
    expect(isAmountValid(1)).toBe(true);
    expect(isAmountValid(5000)).toBe(true);
  });

  it('rejects amounts below 1 and non-finite values', () => {
    expect(isAmountValid(0)).toBe(false);
    expect(isAmountValid(Number.NaN)).toBe(false);
  });
});

describe('getShortCity', () => {
  it('takes the text before the first comma', () => {
    expect(getShortCity('Quezon City, Metro Manila')).toBe('Quezon City');
  });

  it('returns the whole string when there is no comma', () => {
    expect(getShortCity('Cebu')).toBe('Cebu');
  });
});

describe('formatPesoCurrency', () => {
  it('prefixes the peso sign and groups thousands', () => {
    expect(formatPesoCurrency(1500)).toBe('₱1,500');
  });
});

describe('validateDonationForm', () => {
  const VALID = {
    effectiveAmount: 1500,
    selectedShelterId: 3,
    donorName: 'Maria',
    donorEmail: 'maria@example.com',
  };

  it('passes a complete, valid form', () => {
    expect(validateDonationForm(VALID)).toEqual({});
  });

  it('flags a missing shelter and amount below minimum', () => {
    const errors = validateDonationForm({
      ...VALID,
      effectiveAmount: 0,
      selectedShelterId: null,
    });
    expect(errors.amount).toBeDefined();
    expect(errors.shelter).toBeDefined();
  });

  it('flags a malformed email', () => {
    expect(
      validateDonationForm({ ...VALID, donorEmail: 'not-an-email' }),
    ).toHaveProperty('email');
  });

  it('flags an empty name', () => {
    expect(
      validateDonationForm({ ...VALID, donorName: '   ' }),
    ).toHaveProperty('name');
  });
});
