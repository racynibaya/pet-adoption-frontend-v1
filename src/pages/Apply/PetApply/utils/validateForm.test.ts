import { describe, it, expect } from 'vitest';
import { validateForm } from './validateForm';
import { EMPTY_FORM } from '../constants/petApply.constants';
import type { FormState } from '../types';

const VALID_FORM: FormState = {
  message: '',
  homeType: 'HOUSE',
  hasYard: true,
  yardFenced: true,
  ownsHome: true,
  landlordAllowsPets: null,
  householdSize: '2',
  hasChildren: false,
  hasPreviousPetExperience: false,
  yearsOfPetExperience: '',
  hoursAwayPerDay: '8',
  hasOtherPetsNow: false,
  reasonForAdopting: 'I have a stable home and love animals.',
  hasBackupCarePlan: true,
  awareOfMonthlyCosts: true,
};

describe('validateForm', () => {
  it('flags every required field on an empty form', () => {
    const errors = validateForm(EMPTY_FORM);
    expect(errors.homeType).toBeDefined();
    expect(errors.hasYard).toBeDefined();
    expect(errors.ownsHome).toBeDefined();
    expect(errors.householdSize).toBeDefined();
    expect(errors.reasonForAdopting).toBeDefined();
  });

  it('returns no errors for a fully valid form', () => {
    expect(validateForm(VALID_FORM)).toEqual({});
  });

  it('requires yardFenced only when hasYard is true', () => {
    expect(validateForm({ ...VALID_FORM, hasYard: true, yardFenced: null }))
      .toHaveProperty('yardFenced');
    expect(
      validateForm({ ...VALID_FORM, hasYard: false, yardFenced: null }),
    ).toEqual({});
  });

  it('requires landlordAllowsPets only when ownsHome is false', () => {
    expect(
      validateForm({ ...VALID_FORM, ownsHome: false, landlordAllowsPets: null }),
    ).toHaveProperty('landlordAllowsPets');
  });

  it('rejects a reason shorter than 10 characters', () => {
    expect(
      validateForm({ ...VALID_FORM, reasonForAdopting: 'short' }),
    ).toHaveProperty('reasonForAdopting');
  });

  it('rejects an out-of-range household size', () => {
    expect(validateForm({ ...VALID_FORM, householdSize: '0' })).toHaveProperty(
      'householdSize',
    );
    expect(validateForm({ ...VALID_FORM, householdSize: '51' })).toHaveProperty(
      'householdSize',
    );
  });
});
