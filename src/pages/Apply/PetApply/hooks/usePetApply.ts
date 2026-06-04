import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { usePets } from '@/context/usePets';
import { useAdopter } from '@/context/useUser';
import { apiPetToPetCard } from '@/data/adapters';
import { PET_LISTINGS, type PetCard } from '@/data/pets';
import { apiCreateAdoption, apiGetPet, ApiError, type HomeType } from '@/services/api';
import type { FormState, FormFieldErrors } from '../types';
import { EMPTY_FORM } from '../constants/petApply.constants';
import { validateForm } from '../utils/validateForm';
import { countProgress } from '../utils/countProgress';

export function usePetApply() {
  const { id } = useParams<{ id: string }>();
  const { pets } = usePets();
  const { adopter, isAuthenticated } = useAdopter();

  const localPet =
    pets.find((p) => String(p.id) === id) ??
    PET_LISTINGS.find((p) => String(p.id) === id);

  const numericId = id ? Number(id) : NaN;
  const isInvalidId = !id || !Number.isInteger(numericId) || numericId <= 0;

  const [fetchedPet, setFetchedPet] = useState<PetCard | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (localPet || isInvalidId) return;
    let cancelled = false;
    apiGetPet(numericId)
      .then((res) => {
        if (cancelled) return;
        setFetchedPet(apiPetToPetCard(res.data));
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Failed to load pet', err);
        setNotFound(true);
      });
    return () => {
      cancelled = true;
    };
  }, [localPet, isInvalidId, numericId]);

  const pet = localPet ?? fetchedPet;

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormFieldErrors>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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

  async function handleSubmit(e: FormEvent) {
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

    setApiError('');
    setLoading(true);

    try {
      await apiCreateAdoption({
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
      });

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setApiError(
        err instanceof ApiError ? err.message : 'An unexpected error occurred.',
      );
      setLoading(false);
    }
  }

  return {
    pet,
    notFound: notFound || (isInvalidId && !localPet),
    isAuthenticated,
    adopter,
    form,
    errors,
    apiError,
    loading,
    submitted,
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
