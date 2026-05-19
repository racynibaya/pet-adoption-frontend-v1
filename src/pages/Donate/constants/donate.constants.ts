import { SHELTERS } from '@/pages/UseCases/UseCases';

import {
  BowlIcon,
  SyringeIcon,
  BlanketIcon,
  KeyIcon,
  FoundVignette,
  SafeVignette,
  HealthyVignette,
  HomeVignette,
} from '../assets';

import {
  DonorVoice,
  ImpactStat,
  ImpactTier,
  JourneyStep,
  ShelterChoice,
} from '../types/donate.types';

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MESSAGE_MAX_LENGTH = 280;

export const DEFAULT_SELECTED_AMOUNT = 1500;

export const IMPACT_TIERS: ImpactTier[] = [
  {
    amount: 500,
    label: 'A week of meals',
    detail: 'A warm bowl of kibble and clean water for one hungry pup.',
    tone: 'amber',
    Icon: BowlIcon,
  },
  {
    amount: 1500,
    label: 'A vaccine dose',
    detail: 'One core vaccination — the door that opens to adoption.',
    tone: 'teal',
    Icon: SyringeIcon,
  },
  {
    amount: 2500,
    label: 'A vet checkup',
    detail: 'A full health workup, microchip, and basic care.',
    tone: 'rose',
    Icon: BlanketIcon,
  },
  {
    amount: 5000,
    label: 'A fresh start',
    detail: 'Spay/neuter, recovery bed, and the keys to a new life.',
    tone: 'cream',
    Icon: KeyIcon,
  },
];

export const DONATION_JOURNEY: JourneyStep[] = [
  {
    step: '01',
    title: 'Found',
    body: 'A scared little one shows up at our door, or in the back of a kind stranger’s car.',
    Vignette: FoundVignette,
  },
  {
    step: '02',
    title: 'Safe',
    body: 'Warm bed, soft food, gentle voices. The shaking stops.',
    Vignette: SafeVignette,
  },
  {
    step: '03',
    title: 'Healthy',
    body: 'Vaccines, vet care, weight gained, tail finds its wag again.',
    Vignette: HealthyVignette,
  },
  {
    step: '04',
    title: 'Home',
    body: 'A family. A couch. A forever name. A small bowl with their name on it.',
    Vignette: HomeVignette,
  },
];

export const DONOR_VOICES: DonorVoice[] = [
  {
    name: 'Maria L.',
    city: 'Manila',
    quote:
      'I couldn’t adopt right now, but I could send one meal. Then ten. Now I send a meal every month.',
    tone: 'amber',
  },
  {
    name: 'The Reyes family',
    city: 'Siargao',
    quote:
      'Two years ago, you helped us find Coco. He sleeps on my feet every night. This is our way of paying it forward.',
    tone: 'rose',
  },
  {
    name: 'Jun T.',
    city: 'San Agustin',
    quote:
      'My ₱500 felt small until I saw Pia’s photo. It wasn’t small. Not to her.',
    tone: 'teal',
  },
];

export const IMPACT_STATS: ImpactStat[] = [
  { value: '1,247', label: 'meals served this month' },
  { value: '328', label: 'vet visits funded since June' },
  { value: '412', label: 'forever homes since 2024' },
  { value: '94%', label: 'of every peso goes straight to pets' },
];

export const MOCK_SHELTER_CHOICES: ShelterChoice[] = SHELTERS.map(
  (shelter) => ({
    id: shelter.id,
    name: shelter.name,
    address: shelter.address,
  }),
);
