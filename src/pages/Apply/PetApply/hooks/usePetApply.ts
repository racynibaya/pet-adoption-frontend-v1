import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { usePets } from '@/context/usePets';
import { useAdopter } from '@/context/useUser';
import { apiPetToPetCard } from '@/data/adapters';
import {
  apiCreateAdoption,
  apiGetPet,
  type HomeType,
  type CreateAdoptionInput,
} from '@/services/api';
import { getErrorMessage } from '@/services/getErrorMessage';
import { queryKeys } from '@/queries/keys';
import type { FormState, FormFieldErrors } from '../types';
import { EMPTY_FORM } from '../constants/petApply.constants';
import { validateForm } from '../utils/validateForm';
import { countProgress } from '../utils/countProgress';

export function usePetApply() {
  const { id } = useParams<{ id: string }>();
  const { pets } = usePets();
  const { adopter, isAuthenticated } = useAdopter();

  const localPet = pets.find((p) => String(p.id) === id);

  const numericId = id ? Number(id) : NaN;
  const isInvalidId = !id || !Number.isInteger(numericId) || numericId <= 0;

  const { data: fetchedPet, isError: petNotFound } = useQuery({
    queryKey: queryKeys.pets.detail(numericId),
    queryFn: () => apiGetPet(numericId).then((res) => apiPetToPetCard(res.data)),
    enabled: !localPet && !isInvalidId,
  });

  const pet = localPet ?? fetchedPet;

  const adoptionMutation = useMutation({
    mutationFn: (input: CreateAdoptionInput) => apiCreateAdoption(input),
  });

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormFieldErrors>({});
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const [showStickyFooter, setShowStickyFooter] = useState(false);

  const progress = useMemo(() => countProgress(form), [form]);

  useEffect(() => {
    const onScroll = () => {
      setShowStickyFooter(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function openSignup() {
    setAuthMode('signup');
    setAuthOpen(true);
  }

  function openSignin() {
    setAuthMode('signin');
    setAuthOpen(true);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!pet) return;

    const errs = validateForm(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const firstErrKey = Object.keys(errs)[0];
      const el = document.querySelector(`[data-field="${firstErrKey}"]`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    adoptionMutation.mutate(
      {
        petId: pet.id,
        ...(form.message.trim() ? { message: form.message.trim() } : {}),
        homeType: form.homeType as HomeType,
        hasYard: form.hasYard as boolean,
        ...(form.hasYard === true
          ? { yardFenced: form.yardFenced as boolean }
          : {}),
        ownsHome: form.ownsHome as boolean,
        ...(form.ownsHome === false
          ? { landlordAllowsPets: form.landlordAllowsPets as boolean }
          : {}),
        householdSize: Number(form.householdSize),
        hasChildren: form.hasChildren as boolean,
        hasPreviousPetExperience: form.hasPreviousPetExperience as boolean,
        ...(form.hasPreviousPetExperience === true
          ? { yearsOfPetExperience: Number(form.yearsOfPetExperience) }
          : {}),
        hoursAwayPerDay: Number(form.hoursAwayPerDay),
        hasOtherPetsNow: form.hasOtherPetsNow as boolean,
        reasonForAdopting: form.reasonForAdopting.trim(),
        hasBackupCarePlan: form.hasBackupCarePlan as boolean,
        awareOfMonthlyCosts: form.awareOfMonthlyCosts as boolean,
      },
      {
        onSuccess: () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
      },
    );
  }

  const apiError = adoptionMutation.error
    ? getErrorMessage(adoptionMutation.error, 'An unexpected error occurred.')
    : '';

  return {
    pet,
    notFound: petNotFound || (isInvalidId && !localPet),
    isAuthenticated,
    adopter,
    form,
    errors,
    apiError,
    loading: adoptionMutation.isPending,
    submitted: adoptionMutation.isSuccess,
    authOpen,
    authMode,
    showStickyFooter,
    progress,
    set,
    setAuthOpen,
    setAuthMode,
    openSignup,
    openSignin,
    handleSubmit,
  };
}
