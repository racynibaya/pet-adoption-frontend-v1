import { EMAIL_REGEX } from '../constants/donate.constants';
import type { DonationFieldErrors } from '../types/donate.types';

const pesoNumberFormatter = new Intl.NumberFormat('en-PH', {
  maximumFractionDigits: 0,
});

export const formatPesoCurrency = (amount: number): string =>
  `₱${pesoNumberFormatter.format(amount)}`;

export const getShortCity = (address: string): string => {
  const commaIndex = address.indexOf(',');
  return commaIndex > 0 ? address.slice(0, commaIndex).trim() : address;
};

export const computeEffectiveAmount = (
  customAmount: string,
  selectedAmount: number | null,
): number =>
  customAmount ? Number(customAmount) : (selectedAmount ?? 0);

export const isAmountValid = (effectiveAmount: number): boolean =>
  Number.isFinite(effectiveAmount) && effectiveAmount >= 1;

type ValidateDonationFormInput = {
  effectiveAmount: number;
  selectedShelterId: number | null;
  donorName: string;
  donorEmail: string;
};

export const validateDonationForm = ({
  effectiveAmount,
  selectedShelterId,
  donorName,
  donorEmail,
}: ValidateDonationFormInput): DonationFieldErrors => {
  const errors: DonationFieldErrors = {};
  if (!isAmountValid(effectiveAmount)) {
    errors.amount = 'Please choose an amount of ₱1 or more.';
  }
  if (selectedShelterId === null) {
    errors.shelter = 'Please choose a shelter to support.';
  }
  if (!donorName.trim()) {
    errors.name = 'Please tell us your name.';
  }
  if (!donorEmail.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!EMAIL_REGEX.test(donorEmail.trim())) {
    errors.email = 'That email looks off — double-check it?';
  }
  return errors;
};
