import {
  ShieldCheckIcon,
  PersonIcon,
  DocumentIcon,
  FilterIcon,
  SearchIcon,
  FormIcon,
  HomeHeartIcon,
  BlogCoverFirst30Days,
  BlogCoverBodyLanguage,
  BlogCoverSeniorCat,
} from '../assets';
import type {
  StatItem,
  FeatureItem,
  ProcessStep,
  BlogPost,
  TrustPoint,
} from '../types';

export const STATS: StatItem[] = [
  { value: '12k+', label: 'Adoptions completed' },
  { value: '200+', label: 'Partner shelters' },
  { value: '98%', label: 'Happy households' },
  { value: '4.92★', label: 'Avg shelter rating' },
];

export const FEATURES: FeatureItem[] = [
  {
    title: 'Verified shelters',
    description:
      'Every shelter on KodaNest is reviewed and approved by our team. Only verified organizations can list pets and review adoption applications.',
    iconBackground: 'var(--mint)',
    Icon: ShieldCheckIcon,
  },
  {
    title: 'Proof-of-care applications',
    description:
      'Applications require an adopter profile — living situation, experience, working hours — so shelters can find the best home for each pet.',
    iconBackground: '#fde2cf',
    Icon: PersonIcon,
  },
  {
    title: 'Track your application',
    description:
      "See the real-time status of every application you've submitted — pending, reviewing, approved, or rejected — all in one place.",
    iconBackground: 'var(--sun)',
    Icon: DocumentIcon,
  },
  {
    title: 'Filter by species & size',
    description:
      'Search dogs, cats, rabbits, birds, and more. Filter by age, gender, and size to find the pet that fits your home perfectly.',
    iconBackground: 'var(--sky)',
    Icon: FilterIcon,
  },
];

export const TRUST_POINTS: TrustPoint[] = [
  'All shelters are reviewed and approved before listing pets.',
  'Shelter staff manage listings and review every application personally.',
  'Auto-rejection protects other applicants when a pet is adopted.',
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 'Step 01',
    title: 'Browse & filter pets',
    description:
      'Search available pets by species, breed, age, gender, and size. Every listing is managed by a verified shelter with real photos and descriptions.',
    iconBackground: 'var(--mint)',
    Icon: SearchIcon,
  },
  {
    step: 'Step 02',
    title: 'Submit an application',
    description:
      'Create an account and fill out your adopter profile — living situation, experience, working hours. Submit directly to the shelter with a personal message.',
    iconBackground: 'var(--rose)',
    Icon: FormIcon,
  },
  {
    step: 'Step 03',
    title: 'Bring your pet home',
    description:
      'The shelter reviews your application and notifies you of the decision. Once approved, coordinate pickup and welcome your new family member home.',
    iconBackground: 'var(--sky)',
    Icon: HomeHeartIcon,
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'The first 30 days: how to help a newly adopted pet settle in',
    category: 'Adoption',
    readTime: '6 min read',
    coverBackground: '#e9f5ee',
    Cover: BlogCoverFirst30Days,
  },
  {
    title: 'Reading body language: subtle signs your pet is stressed',
    category: 'Health',
    readTime: '4 min read',
    coverBackground: '#2a2620',
    Cover: BlogCoverBodyLanguage,
  },
  {
    title: 'What to feed a senior cat: a vet-approved starter guide',
    category: 'Nutrition',
    readTime: '5 min read',
    coverBackground: '#ffe9b8',
    Cover: BlogCoverSeniorCat,
  },
];
