import { useEffect, useMemo, useRef, useState } from 'react';
import {
  apiCreateDonation,
  apiGetShelters,
  ApiError,
  type ApiShelter,
} from '@/services/api';
import {
  DEFAULT_SELECTED_AMOUNT,
  IMPACT_TIERS,
  MOCK_SHELTER_CHOICES,
} from '../constants/donate.constants';
import {
  computeEffectiveAmount,
  isAmountValid as computeIsAmountValid,
  validateDonationForm,
} from '../utils/formatDonation';
import type {
  DonationFieldErrors,
  DonationFormComputed,
  DonationFormHandlers,
  DonationFormRefs,
  DonationFormState,
  ShelterChoice,
} from '../types/donate.types';

export type UseDonateReturn = DonationFormState &
  DonationFormComputed &
  DonationFormRefs &
  DonationFormHandlers;

export function useDonate(): UseDonateReturn {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(
    DEFAULT_SELECTED_AMOUNT,
  );
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [selectedShelterId, setSelectedShelterId] = useState<number | null>(
    null,
  );
  const [shelters, setShelters] =
    useState<ShelterChoice[]>(MOCK_SHELTER_CHOICES);
  const [formErrors, setFormErrors] = useState<DonationFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [submittedAmount, setSubmittedAmount] = useState<number | null>(null);
  const [shelterQuery, setShelterQuery] = useState('');
  const [isShelterPickerOpen, setIsShelterPickerOpen] = useState(false);
  const [shelterPickerHighlightIndex, setShelterPickerHighlightIndex] =
    useState(0);

  const formContainerRef = useRef<HTMLDivElement>(null);
  const tiersContainerRef = useRef<HTMLElement>(null);
  const shelterTriggerRef = useRef<HTMLButtonElement>(null);
  const shelterSearchRef = useRef<HTMLInputElement>(null);
  const shelterPickerRef = useRef<HTMLDivElement>(null);
  const shelterListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!isShelterPickerOpen) return;
    function handleMouseDown(event: MouseEvent) {
      if (!shelterPickerRef.current?.contains(event.target as Node)) {
        setIsShelterPickerOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsShelterPickerOpen(false);
        shelterTriggerRef.current?.focus();
      }
    }
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isShelterPickerOpen]);

  useEffect(() => {
    if (isShelterPickerOpen) {
      requestAnimationFrame(() => shelterSearchRef.current?.focus());
    }
  }, [isShelterPickerOpen]);

  useEffect(() => {
    if (!isShelterPickerOpen) return;
    const highlightedEl = shelterListRef.current?.querySelector<HTMLElement>(
      `[data-idx="${shelterPickerHighlightIndex}"]`,
    );
    highlightedEl?.scrollIntoView({ block: 'nearest' });
  }, [shelterPickerHighlightIndex, isShelterPickerOpen]);

  useEffect(() => {
    let isCancelled = false;
    apiGetShelters(1, 100)
      .then((response) => {
        if (isCancelled || !response.data?.length) return;
        setShelters(
          response.data.map((shelter: ApiShelter) => ({
            id: shelter.id,
            name: shelter.name,
            city: shelter.city,
            province: shelter.province,
          })),
        );
      })
      .catch(() => {
        // backend down — keep mock fallback in state
      });
    return () => {
      isCancelled = true;
    };
  }, []);

  const effectiveAmount = computeEffectiveAmount(customAmount, selectedAmount);
  const isAmountValidComputed = computeIsAmountValid(effectiveAmount);

  const filteredShelters = useMemo(() => {
    const query = shelterQuery.trim().toLowerCase();
    if (!query) return shelters;
    return shelters.filter(
      (shelter) =>
        shelter.name.toLowerCase().includes(query) ||
        shelter.city.toLowerCase().includes(query) ||
        shelter.province.toLowerCase().includes(query),
    );
  }, [shelters, shelterQuery]);

  const selectedShelter = useMemo(
    () => shelters.find((shelter) => shelter.id === selectedShelterId) ?? null,
    [shelters, selectedShelterId],
  );

  const selectedImpactTier = useMemo(
    () => IMPACT_TIERS.find((tier) => tier.amount === selectedAmount),
    [selectedAmount],
  );

  function handleOpenShelterPicker() {
    setShelterQuery('');
    setShelterPickerHighlightIndex(0);
    setIsShelterPickerOpen(true);
  }

  function handleCloseShelterPicker() {
    setIsShelterPickerOpen(false);
  }

  function handleSelectShelter(shelterId: number) {
    setSelectedShelterId(shelterId);
    setFormErrors((prev) => ({ ...prev, shelter: undefined }));
    setIsShelterPickerOpen(false);
    setShelterQuery('');
    setShelterPickerHighlightIndex(0);
    shelterTriggerRef.current?.focus();
  }

  function handleClearSelectedShelter() {
    formContainerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    setSelectedShelterId(null);
    handleOpenShelterPicker();
  }

  function handleShelterQueryChange(query: string) {
    setShelterQuery(query);
    setShelterPickerHighlightIndex(0);
  }

  function handleSelectImpactTier(amount: number) {
    setSelectedAmount(amount);
    setCustomAmount('');
    setFormErrors((prev) => ({ ...prev, amount: undefined }));
    requestAnimationFrame(() => {
      formContainerRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }

  function handleCustomAmountChange(rawAmount: string) {
    setCustomAmount(rawAmount);
    setSelectedAmount(null);
    setFormErrors((prev) => ({ ...prev, amount: undefined }));
  }

  function handleDonorNameChange(name: string) {
    setDonorName(name);
    setFormErrors((prev) => ({ ...prev, name: undefined }));
  }

  function handleDonorEmailChange(email: string) {
    setDonorEmail(email);
    setFormErrors((prev) => ({ ...prev, email: undefined }));
  }

  function handleDonorMessageChange(message: string) {
    setDonorMessage(message);
  }

  function handleScrollToTiers() {
    tiersContainerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  function handleResetDonationForm() {
    setSubmittedAmount(null);
    setDonorName('');
    setDonorEmail('');
    setDonorMessage('');
    setCustomAmount('');
    setSelectedAmount(DEFAULT_SELECTED_AMOUNT);
    setSelectedShelterId(null);
  }

  async function handleSubmitDonation(event: React.FormEvent) {
    event.preventDefault();
    setApiError(null);
    const errors = validateDonationForm({
      effectiveAmount,
      selectedShelterId,
      donorName,
      donorEmail,
    });
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      if (errors.shelter) {
        formContainerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        handleOpenShelterPicker();
      }
      return;
    }

    setIsSubmitting(true);
    try {
      await apiCreateDonation({
        amount: effectiveAmount,
        name: donorName.trim(),
        email: donorEmail.trim(),
        shelterId: selectedShelterId!,
        message: donorMessage.trim() || undefined,
      });
      setSubmittedAmount(effectiveAmount);
      window.scrollTo({
        top: (formContainerRef.current?.offsetTop ?? 0) - 80,
        behavior: 'smooth',
      });
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : 'Something went wrong. Please try again.';
      setApiError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    selectedAmount,
    customAmount,
    donorName,
    donorEmail,
    donorMessage,
    selectedShelterId,
    shelters,
    formErrors,
    isSubmitting,
    apiError,
    submittedAmount,
    shelterQuery,
    isShelterPickerOpen,
    shelterPickerHighlightIndex,
    effectiveAmount,
    isAmountValid: isAmountValidComputed,
    filteredShelters,
    selectedShelter,
    selectedImpactTier,
    formContainerRef,
    tiersContainerRef,
    shelterTriggerRef,
    shelterSearchRef,
    shelterPickerRef,
    shelterListRef,
    handleSelectImpactTier,
    handleCustomAmountChange,
    handleOpenShelterPicker,
    handleCloseShelterPicker,
    handleSelectShelter,
    handleClearSelectedShelter,
    handleShelterQueryChange,
    handleShelterPickerHighlight: setShelterPickerHighlightIndex,
    handleDonorNameChange,
    handleDonorEmailChange,
    handleDonorMessageChange,
    handleScrollToTiers,
    handleResetDonationForm,
    handleSubmitDonation,
  };
}
