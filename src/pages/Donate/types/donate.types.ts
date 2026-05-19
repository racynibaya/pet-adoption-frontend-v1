import type { Dispatch, RefObject, SetStateAction } from 'react';

export type DonationTone = 'amber' | 'teal' | 'rose' | 'cream';

export type ImpactTier = {
  amount: number;
  label: string;
  detail: string;
  tone: DonationTone;
  Icon: () => JSX.Element;
};

export type JourneyStep = {
  step: string;
  title: string;
  body: string;
  Vignette: () => JSX.Element;
};

export type DonorVoice = {
  name: string;
  city: string;
  quote: string;
  tone: DonationTone;
};

export type ImpactStat = {
  value: string;
  label: string;
};

export type DonationFieldErrors = {
  amount?: string;
  name?: string;
  email?: string;
  shelter?: string;
};

export type ShelterChoice = {
  id: number;
  name: string;
  address: string;
};

export type DonationFormState = {
  selectedAmount: number | null;
  customAmount: string;
  donorName: string;
  donorEmail: string;
  donorMessage: string;
  selectedShelterId: number | null;
  shelters: ShelterChoice[];
  formErrors: DonationFieldErrors;
  isSubmitting: boolean;
  apiError: string | null;
  submittedAmount: number | null;
  shelterQuery: string;
  isShelterPickerOpen: boolean;
  shelterPickerHighlightIndex: number;
};

export type DonationFormComputed = {
  effectiveAmount: number;
  isAmountValid: boolean;
  filteredShelters: ShelterChoice[];
  selectedShelter: ShelterChoice | null;
  selectedImpactTier: ImpactTier | undefined;
};

export type DonationFormRefs = {
  formContainerRef: RefObject<HTMLDivElement>;
  tiersContainerRef: RefObject<HTMLElement>;
  shelterTriggerRef: RefObject<HTMLButtonElement>;
  shelterSearchRef: RefObject<HTMLInputElement>;
  shelterPickerRef: RefObject<HTMLDivElement>;
  shelterListRef: RefObject<HTMLUListElement>;
};

export type DonationFormHandlers = {
  handleSelectImpactTier: (amount: number) => void;
  handleCustomAmountChange: (rawAmount: string) => void;
  handleOpenShelterPicker: () => void;
  handleCloseShelterPicker: () => void;
  handleSelectShelter: (shelterId: number) => void;
  handleClearSelectedShelter: () => void;
  handleShelterQueryChange: (query: string) => void;
  handleShelterPickerHighlight: Dispatch<SetStateAction<number>>;
  handleDonorNameChange: (name: string) => void;
  handleDonorEmailChange: (email: string) => void;
  handleDonorMessageChange: (message: string) => void;
  handleScrollToTiers: () => void;
  handleResetDonationForm: () => void;
  handleSubmitDonation: (event: React.FormEvent<Element>) => Promise<void>;
};
