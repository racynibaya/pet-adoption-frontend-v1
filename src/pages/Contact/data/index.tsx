import type { FaqItem, OfficeItem, TopicButton } from '../types'

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How do I apply to adopt a pet?',
    answer:
      "Create an account, browse available pets, and click 'Apply to adopt' on any listing. You'll fill out your adopter profile — living situation, experience, working hours — and add a personal message to the shelter.",
  },
  {
    question: 'How long does the review process take?',
    answer:
      "Each shelter sets its own timeline, but most applications receive a response within 3–7 days. You'll get an email notification the moment your application status changes.",
  },
  {
    question: 'What happens if my application is rejected?',
    answer:
      "A rejection means this specific pet wasn't the right fit — it doesn't mean you can't adopt. You're free to apply for other pets. The shelter may share feedback to help you find a better match.",
  },
  {
    question: 'Can I apply for multiple pets at the same time?',
    answer:
      'Yes. There is no limit on the number of active applications. Each application requires a separate adopter profile and message to the relevant shelter.',
  },
  {
    question: 'Can I cancel my application?',
    answer:
      "Yes — you can cancel any pending application from your account at any time, as long as it hasn't already been approved.",
  },
]

export const OFFICES: OfficeItem[] = [
  {
    code: 'SFC',
    name: 'San Agustin, SFC. HQ',
    addr: 'Brgy. San Agustin Chismosa St, Aprt No.4 · Mon–Fri, 9–6',
  },
  {
    code: 'MNL',
    name: 'Manila, Philippines',
    addr: 'BGC Taguig - Fort Bonifacio · Tue–Sat, 10–7',
  },
  {
    code: 'AFM',
    name: 'Siargao - Lugar ng AFAM',
    addr: 'General Luna, 8419 Surigao del Norte · Wed–Sun, 11–6',
  },
]

export const TOPIC_BUTTONS: TopicButton[] = [
  {
    key: 'adopt',
    label: 'Adopt a pet',
    icon: (
      <svg width='28' height='28' viewBox='0 0 28 28'>
        <path d='M14 4 Q19 1 22 5 Q26 11 14 22 Q2 11 6 5 Q9 1 14 4Z' fill='#D94F68' />
      </svg>
    ),
  },
  {
    key: 'shelter',
    label: 'Register shelter',
    icon: (
      <svg width='28' height='28' viewBox='0 0 28 28'>
        <path d='M14 4 L24 10 L24 22 L18 22 L18 16 L10 16 L10 22 L4 22 L4 10 Z' fill='none' stroke='#1D7575' strokeWidth='1.6' strokeLinejoin='round' />
      </svg>
    ),
  },
  {
    key: 'application',
    label: 'My application',
    icon: (
      <svg width='28' height='28' viewBox='0 0 28 28'>
        <rect x='6' y='4' width='16' height='20' rx='2' fill='none' stroke='#2F97AC' strokeWidth='1.6' />
        <line x1='10' y1='10' x2='18' y2='10' stroke='#2F97AC' strokeWidth='1.6' strokeLinecap='round' />
        <line x1='10' y1='14' x2='18' y2='14' stroke='#2F97AC' strokeWidth='1.6' strokeLinecap='round' />
        <line x1='10' y1='18' x2='14' y2='18' stroke='#2F97AC' strokeWidth='1.6' strokeLinecap='round' />
      </svg>
    ),
  },
  {
    key: 'other',
    label: 'Other',
    icon: (
      <svg width='28' height='28' viewBox='0 0 28 28'>
        <circle cx='14' cy='14' r='9' fill='none' stroke='#2F97AC' strokeWidth='1.6' />
        <circle cx='14' cy='14' r='2' fill='#2F97AC' />
      </svg>
    ),
  },
]
