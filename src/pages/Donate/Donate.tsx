import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionHead from '@/components/ui/SectionHead';
import {
  apiCreateDonation,
  apiGetShelters,
  ApiError,
  type ApiShelter,
} from '@/services/api';
import { SHELTERS } from '@/pages/UseCases/UseCases';

// ─── Constants ────────────────────────────────────────────────────────────────

const MESSAGE_MAX = 280;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Philippine peso formatter — '₱1,500' style. Uses Intl for thousands separators.
const pesoFmt = new Intl.NumberFormat('en-PH', { maximumFractionDigits: 0 });
const peso = (n: number) => `₱${pesoFmt.format(n)}`;

type Tone = 'amber' | 'teal' | 'rose' | 'cream';

const TONE_BG: Record<Tone, string> = {
  amber: 'var(--cream)',
  teal: 'var(--mint)',
  rose: 'var(--rose)',
  cream: 'var(--cream-2)',
};
const TONE_INK: Record<Tone, string> = {
  amber: '#A55E24',
  teal: '#1D7575',
  rose: '#BF3B5C',
  cream: '#80481A',
};

type ImpactTier = {
  amount: number;
  label: string;
  detail: string;
  tone: Tone;
  Icon: () => JSX.Element;
};

type JourneyStep = {
  step: string;
  title: string;
  body: string;
  Vignette: () => JSX.Element;
};

type Voice = {
  name: string;
  city: string;
  quote: string;
  tone: Tone;
};

// ─── Hand-illustrated SVGs ────────────────────────────────────────────────────

const HandsHoldingPup = () => (
  <svg
    viewBox='0 0 320 280'
    width='100%'
    height='100%'
    role='img'
    aria-label='Two hands gently cradling a sleeping puppy'
  >
    {/* Soft glow halo behind */}
    <defs>
      <radialGradient id='halo' cx='50%' cy='44%' r='40%'>
        <stop offset='0%' stopColor='#FDDDB0' stopOpacity='0.9' />
        <stop offset='70%' stopColor='#FEF5E2' stopOpacity='0' />
      </radialGradient>
      <linearGradient id='handGrad' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stopColor='#F5AE50' />
        <stop offset='100%' stopColor='#CB7730' />
      </linearGradient>
      <linearGradient id='pupGrad' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stopColor='#FDE9C4' />
        <stop offset='100%' stopColor='#FAC878' />
      </linearGradient>
    </defs>

    <circle cx='160' cy='124' r='118' fill='url(#halo)' />

    {/* Cupped hands — back palm */}
    <path
      d='M52 168 Q42 138 60 122 Q78 110 96 120 L120 140 Q132 148 144 148 H180 Q198 148 214 142 L242 130 Q262 122 274 138 Q288 158 270 184 Q256 206 232 218 Q204 234 168 236 Q126 236 96 224 Q70 212 60 196 Q50 184 52 168 Z'
      fill='url(#handGrad)'
      opacity='0.96'
    />
    {/* Front palm overlay */}
    <path
      d='M80 178 Q72 160 88 152 Q104 146 124 154 L150 168 Q162 174 174 174 H198 Q214 172 230 164 L246 156 Q260 152 268 168 Q272 184 258 200 Q240 216 212 222 Q176 230 142 222 Q112 214 96 202 Q84 192 80 178 Z'
      fill='#FAC878'
      opacity='0.7'
    />

    {/* Puppy body (curled, sleeping) */}
    <ellipse
      cx='162'
      cy='150'
      rx='56'
      ry='30'
      fill='url(#pupGrad)'
      stroke='#CB7730'
      strokeWidth='1.5'
    />
    {/* Puppy head */}
    <circle
      cx='198'
      cy='138'
      r='26'
      fill='url(#pupGrad)'
      stroke='#CB7730'
      strokeWidth='1.5'
    />
    {/* Floppy ear */}
    <path
      d='M186 118 Q172 108 168 124 Q166 138 184 138 Z'
      fill='#CB7730'
      opacity='0.7'
    />
    {/* Tail tucked */}
    <path
      d='M114 152 Q98 152 102 138 Q108 130 122 138'
      stroke='#CB7730'
      strokeWidth='3'
      fill='none'
      strokeLinecap='round'
    />
    {/* Sleeping eye */}
    <path
      d='M196 138 Q200 142 204 138'
      stroke='#5E3410'
      strokeWidth='2'
      fill='none'
      strokeLinecap='round'
    />
    {/* Snout & nose */}
    <path
      d='M212 144 Q220 146 218 152'
      stroke='#5E3410'
      strokeWidth='1.6'
      fill='none'
      strokeLinecap='round'
    />
    <ellipse cx='218' cy='146' rx='2.4' ry='1.6' fill='#5E3410' />

    {/* Heart floating above */}
    <g style={{ animation: 'floatY 3s ease-in-out infinite' }}>
      <path
        d='M204 70 Q210 60 218 64 Q226 60 232 70 Q232 80 218 92 Q204 80 204 70 Z'
        fill='#D94F68'
      />
    </g>

    {/* Tiny sparkle dots */}
    <circle cx='80' cy='90' r='2.5' fill='#E8923C' opacity='0.7' />
    <circle cx='266' cy='90' r='2' fill='#D94F68' opacity='0.7' />
    <circle cx='250' cy='52' r='1.8' fill='#1D7575' opacity='0.6' />
    <circle cx='62' cy='52' r='1.8' fill='#1D7575' opacity='0.6' />
  </svg>
);

const BowlIcon = () => (
  <svg width='30' height='30' viewBox='0 0 30 30' fill='none'>
    <path
      d='M3 14 H27 Q26 23 19 25 H11 Q4 23 3 14 Z'
      fill='#FDDDB0'
      stroke='#A55E24'
      strokeWidth='1.6'
      strokeLinejoin='round'
    />
    <path
      d='M5 14 Q15 8 25 14'
      stroke='#A55E24'
      strokeWidth='1.4'
      fill='none'
      strokeLinecap='round'
    />
    <circle cx='11' cy='11' r='1.8' fill='#CB7730' />
    <circle cx='15' cy='9' r='1.6' fill='#E8923C' />
    <circle cx='19' cy='11' r='1.6' fill='#CB7730' />
  </svg>
);

const SyringeIcon = () => (
  <svg width='30' height='30' viewBox='0 0 30 30' fill='none'>
    <rect
      x='10'
      y='6'
      width='10'
      height='14'
      rx='1.6'
      fill='#CCE7EC'
      stroke='#1D7575'
      strokeWidth='1.6'
    />
    <line x1='12' y1='10' x2='18' y2='10' stroke='#1D7575' strokeWidth='1.2' />
    <line x1='12' y1='13' x2='18' y2='13' stroke='#1D7575' strokeWidth='1.2' />
    <path d='M13 20 H17 V25 H13 Z' fill='#1D7575' />
    <line
      x1='15'
      y1='25'
      x2='15'
      y2='29'
      stroke='#1D7575'
      strokeWidth='1.4'
      strokeLinecap='round'
    />
    <path
      d='M22 5 L25 2 M22 5 L19 2 M22 5 L25 8 M22 5 L19 8'
      stroke='#D94F68'
      strokeWidth='1.4'
      strokeLinecap='round'
    />
  </svg>
);

const BlanketIcon = () => (
  <svg width='30' height='30' viewBox='0 0 30 30' fill='none'>
    <path
      d='M4 10 Q4 7 7 7 H23 Q26 7 26 10 V21 Q26 24 23 24 H7 Q4 24 4 21 Z'
      fill='#F9BCC8'
      stroke='#BF3B5C'
      strokeWidth='1.6'
    />
    <path
      d='M4 14 H26 M4 18 H26'
      stroke='#BF3B5C'
      strokeWidth='1'
      strokeDasharray='3 2'
    />
    <path
      d='M22 7 Q24 11 26 10'
      stroke='#BF3B5C'
      strokeWidth='1.4'
      fill='none'
    />
  </svg>
);

const KeyIcon = () => (
  <svg width='30' height='30' viewBox='0 0 30 30' fill='none'>
    <circle
      cx='10'
      cy='15'
      r='5'
      fill='#FDE9C4'
      stroke='#80481A'
      strokeWidth='1.6'
    />
    {/* paw cutout in the keyhole */}
    <circle cx='10' cy='14' r='1' fill='#80481A' />
    <circle cx='8.5' cy='13' r='0.7' fill='#80481A' />
    <circle cx='11.5' cy='13' r='0.7' fill='#80481A' />
    <path
      d='M15 15 H27 M23 15 V19 M26 15 V18'
      stroke='#80481A'
      strokeWidth='1.8'
      strokeLinecap='round'
      fill='none'
    />
  </svg>
);

const FoundVignette = () => (
  <svg viewBox='0 0 120 80' width='100%' height='100%' fill='none'>
    <path
      d='M6 70 H114'
      stroke='#E8C28A'
      strokeWidth='1'
      strokeDasharray='2 3'
    />
    {/* lone small pup silhouette */}
    <ellipse cx='60' cy='62' rx='12' ry='6' fill='#3C4E4E' opacity='0.18' />
    <path
      d='M52 60 Q50 50 56 48 Q62 46 64 50 L68 50 Q72 48 74 52 Q74 58 70 60 Z'
      fill='#3C4E4E'
    />
    <circle cx='72' cy='52' r='4' fill='#3C4E4E' />
    {/* stars above */}
    <path
      d='M30 18 L31.5 22 L35.5 22 L32 24.5 L33 28.5 L30 26 L27 28.5 L28 24.5 L24.5 22 L28.5 22 Z'
      fill='#E8923C'
      opacity='0.65'
    />
    <path
      d='M90 28 L91 31 L94 31 L91.6 32.8 L92.4 36 L90 34 L87.6 36 L88.4 32.8 L86 31 L89 31 Z'
      fill='#5DB5C4'
      opacity='0.65'
    />
    <circle cx='102' cy='14' r='1.4' fill='#D94F68' opacity='0.7' />
  </svg>
);

const SafeVignette = () => (
  <svg viewBox='0 0 120 80' width='100%' height='100%' fill='none'>
    <path
      d='M6 70 H114'
      stroke='#E8C28A'
      strokeWidth='1'
      strokeDasharray='2 3'
    />
    {/* carrier crate */}
    <rect
      x='34'
      y='38'
      width='52'
      height='30'
      rx='6'
      fill='#FDDDB0'
      stroke='#A55E24'
      strokeWidth='1.6'
    />
    <path
      d='M38 46 H82 M38 52 H82 M38 58 H82'
      stroke='#A55E24'
      strokeWidth='1'
    />
    {/* handle */}
    <path
      d='M50 38 Q60 30 70 38'
      stroke='#A55E24'
      strokeWidth='1.6'
      fill='none'
    />
    {/* peeking face */}
    <circle cx='60' cy='52' r='5' fill='#FEF5E2' />
    <circle cx='58' cy='52' r='0.8' fill='#1C2C2C' />
    <circle cx='62' cy='52' r='0.8' fill='#1C2C2C' />
    {/* tiny heart */}
    <path
      d='M82 30 Q84 27 87 28 Q90 27 92 30 Q92 33 87 38 Q82 33 82 30 Z'
      fill='#D94F68'
    />
  </svg>
);

const HealthyVignette = () => (
  <svg viewBox='0 0 120 80' width='100%' height='100%' fill='none'>
    <path
      d='M6 70 H114'
      stroke='#E8C28A'
      strokeWidth='1'
      strokeDasharray='2 3'
    />
    {/* stethoscope curl */}
    <path
      d='M28 22 Q22 30 28 38 Q34 44 44 42'
      stroke='#1D7575'
      strokeWidth='2'
      fill='none'
      strokeLinecap='round'
    />
    <circle cx='28' cy='22' r='3' fill='#1D7575' />
    <circle
      cx='46'
      cy='44'
      r='4.5'
      fill='#5DB5C4'
      stroke='#1D7575'
      strokeWidth='1.4'
    />
    {/* pet standing, perky */}
    <path
      d='M60 64 Q60 50 72 50 Q86 48 92 56 L94 64 Z'
      fill='#FAC878'
      stroke='#CB7730'
      strokeWidth='1.4'
    />
    <circle
      cx='90'
      cy='50'
      r='6'
      fill='#FAC878'
      stroke='#CB7730'
      strokeWidth='1.4'
    />
    <path d='M86 44 Q84 40 88 42' fill='#CB7730' />
    <path d='M94 44 Q96 40 92 42' fill='#CB7730' />
    <circle cx='91' cy='50' r='0.8' fill='#1C2C2C' />
    {/* plus marks (vaccine) */}
    <path
      d='M16 50 V58 M12 54 H20'
      stroke='#D94F68'
      strokeWidth='1.6'
      strokeLinecap='round'
    />
  </svg>
);

const HomeVignette = () => (
  <svg viewBox='0 0 120 80' width='100%' height='100%' fill='none'>
    <path
      d='M6 70 H114'
      stroke='#E8C28A'
      strokeWidth='1'
      strokeDasharray='2 3'
    />
    {/* couch */}
    <path
      d='M20 60 Q20 50 30 50 H90 Q100 50 100 60 V68 H20 Z'
      fill='#F9BCC8'
      stroke='#BF3B5C'
      strokeWidth='1.4'
    />
    <path d='M28 50 V58 M92 50 V58' stroke='#BF3B5C' strokeWidth='1.4' />
    {/* family silhouettes */}
    <circle cx='40' cy='40' r='4' fill='#3C4E4E' />
    <path d='M34 56 Q34 46 40 46 Q46 46 46 56' fill='#3C4E4E' />
    <circle cx='52' cy='42' r='3' fill='#3C4E4E' />
    <path d='M48 56 Q48 48 52 48 Q56 48 56 56' fill='#3C4E4E' />
    {/* curled cat */}
    <path
      d='M68 58 Q66 52 74 52 Q82 52 84 58 Q82 62 76 62 Q70 62 68 58 Z'
      fill='#E8923C'
      stroke='#A55E24'
      strokeWidth='1.4'
    />
    <path
      d='M82 54 Q86 52 84 50 M80 52 Q80 50 82 50'
      stroke='#A55E24'
      strokeWidth='1.2'
      fill='none'
    />
    {/* heart over family */}
    <path
      d='M44 20 Q46 16 50 18 Q54 16 56 20 Q56 24 50 30 Q44 24 44 20 Z'
      fill='#D94F68'
      opacity='0.85'
    />
  </svg>
);

const QuoteMark = ({ tone }: { tone: Tone }) => (
  <svg width='34' height='28' viewBox='0 0 34 28' fill='none' aria-hidden>
    <path
      d='M4 24 V14 Q4 6 14 4 V8 Q9 10 9 14 H14 V24 Z M20 24 V14 Q20 6 30 4 V8 Q25 10 25 14 H30 V24 Z'
      fill={TONE_INK[tone]}
      opacity='0.5'
    />
  </svg>
);

const PawDeco = ({
  size = 24,
  opacity = 0.55,
}: {
  size?: number;
  opacity?: number;
}) => (
  <svg width={size} height={size} viewBox='0 0 30 30' fill='none' aria-hidden>
    <g fill='#D97757' opacity={opacity}>
      <ellipse cx='8' cy='10' rx='2' ry='3' />
      <ellipse cx='14' cy='6' rx='1.8' ry='2.6' />
      <ellipse cx='22' cy='10' rx='2' ry='3' />
      <ellipse cx='15' cy='20' rx='4.5' ry='5.5' />
    </g>
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const IMPACT_TIERS: ImpactTier[] = [
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

const JOURNEY: JourneyStep[] = [
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

const VOICES: Voice[] = [
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

// ─── Page ─────────────────────────────────────────────────────────────────────

type FieldErrors = {
  amount?: string;
  name?: string;
  email?: string;
  shelter?: string;
};

// Picker uses just the minimum fields shared by ApiShelter and mock SHELTERS.
type ShelterChoice = { id: number; name: string; address: string };

const MOCK_SHELTER_CHOICES: ShelterChoice[] = SHELTERS.map((s) => ({
  id: s.id,
  name: s.name,
  address: s.address,
}));

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1500);
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [selectedShelterId, setSelectedShelterId] = useState<number | null>(
    null,
  );
  const [shelters, setShelters] =
    useState<ShelterChoice[]>(MOCK_SHELTER_CHOICES);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [submittedAmount, setSubmittedAmount] = useState<number | null>(null);

  const formRef = useRef<HTMLDivElement>(null);
  const tiersRef = useRef<HTMLElement>(null);
  const shelterTriggerRef = useRef<HTMLButtonElement>(null);
  const shelterSearchRef = useRef<HTMLInputElement>(null);
  const comboRef = useRef<HTMLDivElement>(null);
  const comboListRef = useRef<HTMLUListElement>(null);
  const [shelterQuery, setShelterQuery] = useState('');
  const [comboOpen, setComboOpen] = useState(false);
  const [comboHighlight, setComboHighlight] = useState(0);

  // Close on outside-click and Escape; refocus trigger on Escape.
  useEffect(() => {
    if (!comboOpen) return;
    function onMouseDown(ev: MouseEvent) {
      if (!comboRef.current?.contains(ev.target as Node)) {
        setComboOpen(false);
      }
    }
    function onKey(ev: KeyboardEvent) {
      if (ev.key === 'Escape') {
        setComboOpen(false);
        shelterTriggerRef.current?.focus();
      }
    }
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [comboOpen]);

  // When the panel opens, focus the search input.
  useEffect(() => {
    if (comboOpen) {
      requestAnimationFrame(() => shelterSearchRef.current?.focus());
    }
  }, [comboOpen]);

  // Keep the highlighted row in view as the user arrows through results.
  useEffect(() => {
    if (!comboOpen) return;
    const el = comboListRef.current?.querySelector<HTMLElement>(
      `[data-idx="${comboHighlight}"]`,
    );
    el?.scrollIntoView({ block: 'nearest' });
  }, [comboHighlight, comboOpen]);

  function openCombo() {
    setShelterQuery('');
    setComboHighlight(0);
    setComboOpen(true);
  }

  useEffect(() => {
    let cancelled = false;
    apiGetShelters(1, 100)
      .then((res) => {
        if (cancelled || !res.data?.length) return;
        setShelters(
          res.data.map((s: ApiShelter) => ({
            id: s.id,
            name: s.name,
            address: s.address,
          })),
        );
      })
      .catch(() => {
        // backend down — mock fallback already in state
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedShelter =
    shelters.find((s) => s.id === selectedShelterId) ?? null;

  // City = the leading segment of the address before the first comma.
  function shortCity(address: string) {
    const i = address.indexOf(',');
    return i > 0 ? address.slice(0, i).trim() : address;
  }

  const filteredShelters = shelterQuery.trim()
    ? shelters.filter((s) => {
        const q = shelterQuery.trim().toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q)
        );
      })
    : shelters;

  function pickShelter(id: number) {
    setSelectedShelterId(id);
    setErrors((e) => ({ ...e, shelter: undefined }));
    setComboOpen(false);
    setShelterQuery('');
    setComboHighlight(0);
    shelterTriggerRef.current?.focus();
  }

  const effectiveAmount = customAmount
    ? Number(customAmount)
    : (selectedAmount ?? 0);
  const amountValid = Number.isFinite(effectiveAmount) && effectiveAmount >= 1;
  const selectedTier = IMPACT_TIERS.find((t) => t.amount === selectedAmount);

  function pickTier(value: number) {
    setSelectedAmount(value);
    setCustomAmount('');
    setErrors((e) => ({ ...e, amount: undefined }));
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function onCustomChange(raw: string) {
    setCustomAmount(raw);
    setSelectedAmount(null);
    setErrors((e) => ({ ...e, amount: undefined }));
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!amountValid) next.amount = 'Please choose an amount of ₱1 or more.';
    if (selectedShelterId === null)
      next.shelter = 'Please choose a shelter to support.';
    if (!name.trim()) next.name = 'Please tell us your name.';
    if (!email.trim()) next.email = 'Please enter your email.';
    else if (!EMAIL_RE.test(email.trim()))
      next.email = 'That email looks off — double-check it?';
    return next;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setApiError(null);
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) {
      if (v.shelter) {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        openCombo();
      }
      return;
    }

    setSubmitting(true);
    try {
      await apiCreateDonation({
        amount: effectiveAmount,
        name: name.trim(),
        email: email.trim(),
        shelterId: selectedShelterId!,
        message: message.trim() || undefined,
      });
      setSubmittedAmount(effectiveAmount);
      window.scrollTo({
        top: (formRef.current?.offsetTop ?? 0) - 80,
        behavior: 'smooth',
      });
    } catch (err) {
      const msg =
        err instanceof ApiError
          ? err.message
          : 'Something went wrong. Please try again.';
      setApiError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section
        className='section text-left rounded-3xl relative overflow-hidden'
        style={{
          padding: 'clamp(56px, 7vw, 112px) clamp(28px, 5vw, 80px)',
          background:
            'radial-gradient(ellipse 60% 70% at 88% 12%, rgba(93,181,196,0.35) 0%, transparent 55%),' +
            'radial-gradient(ellipse 70% 60% at 8% 88%, rgba(253,221,176,0.6) 0%, transparent 55%),' +
            'linear-gradient(158deg, #FFF8F0 0%, #FDE9C4 55%, #FCDDE3 100%)',
        }}
      >
        {/* Floating paw decorations */}
        <span
          className='absolute'
          style={{
            top: 56,
            left: 56,
            animation: 'floatY 5s ease-in-out infinite',
          }}
        >
          <PawDeco size={36} opacity={0.5} />
        </span>
        <span
          className='absolute'
          style={{
            top: 110,
            right: 80,
            animation: 'floatY 6s ease-in-out infinite',
            animationDelay: '0.6s',
          }}
        >
          <PawDeco size={28} opacity={0.45} />
        </span>
        <span
          className='absolute'
          style={{
            bottom: 60,
            left: '38%',
            animation: 'floatY 7s ease-in-out infinite',
            animationDelay: '1.2s',
          }}
        >
          <PawDeco size={22} opacity={0.4} />
        </span>

        <div
          className='grid items-center donate-hero-grid'
          style={{
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
            gap: 'clamp(40px, 6vw, 88px)',
          }}
        >
          {/* Headline + intro */}
          <div className='donate-hero-text'>
            <Eyebrow>Give · So they can stay</Eyebrow>
            <h1
              className='mt-8'
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(40px, 6vw, 72px)',
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
                color: 'var(--ink)',
              }}
            >
              A bowl. A bed.
              <br />
              <span style={{ color: 'var(--rausch)', fontStyle: 'italic' }}>
                A second
              </span>{' '}
              chance.
            </h1>
            <p
              className='max-w-xl'
              style={{
                marginTop: 28,
                color: 'var(--ink-2)',
                fontSize: 18,
                lineHeight: 1.6,
              }}
            >
              Every gift becomes something a pet can feel — warmth on the
              tongue, a needle that stops the shivering, a couch they’re finally
              allowed on.
            </p>

            {/* Live impact pill */}
            <div
              className='inline-flex items-center gap-3 mt-10 rounded-full'
              style={{
                padding: '12px 22px',
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(232, 146, 60, 0.25)',
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              <span
                className='relative flex items-center justify-center'
                style={{ width: 10, height: 10 }}
              >
                <span
                  className='absolute inset-0 rounded-full'
                  style={{
                    background: '#1D7575',
                    animation: 'fadeIn 1.5s ease-in-out infinite alternate',
                  }}
                />
              </span>
              <span style={{ fontSize: 13.5, color: 'var(--ink-2)' }}>
                <strong style={{ color: 'var(--ink)' }}>₱147,250</strong> raised
                this week ·{' '}
                <strong style={{ color: 'var(--ink)' }}>23 pets</strong> fed
                today
              </span>
            </div>

            <div className='flex flex-wrap gap-4 mt-10 donate-hero-cta-row'>
              <button
                type='button'
                className='btn btn-primary btn-lg'
                onClick={() => pickTier(1500)}
              >
                Send Love <span style={{ marginLeft: 6 }}>→</span>
              </button>
              <a href='#journey' className='btn btn-soft btn-lg'>
                See the journey
              </a>
            </div>
          </div>

          {/* Illustration */}
          <div
            className='donate-hero-art relative'
            style={{
              animation: 'authScaleIn 0.6s var(--ease-spring) both',
              animationDelay: '0.15s',
            }}
          >
            <HandsHoldingPup />
          </div>
        </div>
      </section>

      {/* ═══════════════════ STATS STRIP ═══════════════════ */}
      <section className='section-tight' aria-label='Impact this year'>
        <div
          className='grid gap-4'
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          }}
        >
          {[
            { num: '1,247', label: 'meals served this month' },
            { num: '328', label: 'vet visits funded since June' },
            { num: '412', label: 'forever homes since 2024' },
            { num: '94%', label: 'of every peso goes straight to pets' },
          ].map((s, i) => (
            <div
              key={s.label}
              className='text-center rounded-2xl'
              style={{
                padding: 'clamp(28px, 3vw, 40px) clamp(18px, 2vw, 28px)',
                background: i % 2 === 0 ? 'var(--cream)' : 'var(--mint)',
                border: '1px solid var(--hairline-soft)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 3.4vw, 40px)',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  lineHeight: 1,
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 13,
                  color: 'var(--ink-2)',
                  letterSpacing: '0.02em',
                  lineHeight: 1.4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ AMOUNT PICKER (any amount + impact tiles) ═══════════════════ */}
      <section ref={tiersRef} className='section'>
        <SectionHead
          eyebrow='Your gift, your call'
          heading={
            <>
              Give{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--rausch)' }}>
                whatever feels right
              </em>
            </>
          }
          subheading='Type any amount — or pick a meaningful preset below.'
        />

        {/* Hero-style any-amount input */}
        <div
          className='rounded-3xl relative overflow-hidden mx-auto'
          style={{
            maxWidth: 640,
            marginBottom: 'clamp(32px, 4vw, 56px)',
            padding: 'clamp(32px, 4vw, 48px)',
            background:
              'radial-gradient(ellipse 80% 90% at 50% 0%, rgba(253,221,176,0.7) 0%, transparent 70%),' +
              'linear-gradient(160deg, var(--cream) 0%, var(--canvas) 100%)',
            border: '1.5px solid var(--peach-stroke)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <label
            htmlFor='hero-amount'
            style={{
              display: 'block',
              fontSize: 12,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: 14,
              textAlign: 'center',
            }}
          >
            Any amount
          </label>
          <div className='flex items-center justify-center gap-2'>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(40px, 5vw, 56px)',
                fontWeight: 600,
                color: 'var(--rausch)',
                lineHeight: 1,
              }}
            >
              ₱
            </span>

            <input
              id='hero-amount'
              type='number'
              min='1'
              step='1'
              inputMode='decimal'
              placeholder='0,000'
              value={customAmount}
              onChange={(e) => onCustomChange(e.target.value)}
              className='donate-hero-amount-input'
            />
          </div>
          <p
            style={{
              marginTop: 18,
              textAlign: 'center',
              fontSize: 14,
              color: 'var(--ink-2)',
              lineHeight: 1.5,
            }}
          >
            Even <strong style={{ color: 'var(--ink)' }}>₱100</strong> buys
            lunch for a rescue pup. Give what feels right.
          </p>
          {errors.amount && (
            <p
              role='alert'
              style={{
                fontSize: 13,
                color: '#c0304d',
                marginTop: 10,
                textAlign: 'center',
              }}
            >
              {errors.amount}
            </p>
          )}
        </div>

        {/* Divider */}
        <div
          className='flex items-center gap-4 mx-auto'
          style={{
            maxWidth: 480,
            marginBottom: 'clamp(28px, 3vw, 44px)',
            color: 'var(--muted)',
            fontSize: 12,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ flex: 1, height: 1, background: 'var(--hairline)' }} />
          <span>or pick a meaningful preset</span>
          <span style={{ flex: 1, height: 1, background: 'var(--hairline)' }} />
        </div>

        <div
          className='grid gap-6 donate-tier-grid'
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          }}
        >
          {IMPACT_TIERS.map((tier) => {
            const active = selectedAmount === tier.amount && !customAmount;
            return (
              <button
                key={tier.amount}
                type='button'
                onClick={() => pickTier(tier.amount)}
                className='text-left rounded-3xl relative overflow-hidden transition-[transform,box-shadow,border-color] duration-200 cursor-pointer'
                style={{
                  padding: 'clamp(28px, 3vw, 40px) clamp(24px, 3vw, 32px)',
                  background: 'var(--canvas)',
                  border: `2px solid ${active ? TONE_INK[tier.tone] : 'var(--hairline-soft)'}`,
                  boxShadow: active
                    ? 'var(--shadow-lift)'
                    : 'var(--shadow-card)',
                  transform: active ? 'translateY(-4px)' : 'translateY(0)',
                  fontFamily: 'inherit',
                }}
              >
                {/* Selected ribbon */}
                {active && (
                  <span
                    className='absolute rounded-full'
                    style={{
                      top: 18,
                      right: 18,
                      padding: '5px 12px',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      background: TONE_INK[tier.tone],
                      color: '#fff',
                    }}
                  >
                    Chosen
                  </span>
                )}

                <div
                  className='inline-flex items-center justify-center rounded-2xl'
                  style={{
                    width: 60,
                    height: 60,
                    background: TONE_BG[tier.tone],
                  }}
                >
                  <tier.Icon />
                </div>
                <div
                  className='mt-7 flex items-baseline gap-2'
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  <span
                    style={{
                      fontSize: 40,
                      fontWeight: 600,
                      color: 'var(--ink)',
                      lineHeight: 1,
                    }}
                  >
                    {peso(tier.amount)}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      color: 'var(--muted)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    one-time
                  </span>
                </div>
                <h3
                  style={{
                    marginTop: 14,
                    fontSize: 17,
                    color: TONE_INK[tier.tone],
                  }}
                >
                  {tier.label}
                </h3>
                <p
                  style={{
                    marginTop: 10,
                    fontSize: 13.5,
                    color: 'var(--ink-2)',
                    lineHeight: 1.55,
                  }}
                >
                  {tier.detail}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════ JOURNEY ═══════════════════ */}
      <section
        id='journey'
        className='section rounded-3xl'
        style={{
          padding: 'clamp(64px, 7vw, 112px) clamp(28px, 5vw, 72px)',
          background: 'var(--soft)',
        }}
      >
        <SectionHead
          eyebrow='The journey'
          heading={
            <>
              From a corner of the street, to{' '}
              <span style={{ color: 'var(--rausch)' }}>
                a corner of your couch
              </span>
            </>
          }
          subheading='Four small acts, one whole life.'
        />

        <div className='donate-journey-grid'>
          {JOURNEY.map((s, i) => (
            <div key={s.step} className='donate-journey-step relative'>
              <div
                className='rounded-2xl mb-6'
                style={{
                  height: 152,
                  background: 'var(--canvas)',
                  border: '1px solid var(--hairline-soft)',
                  padding: 16,
                }}
              >
                <s.Vignette />
              </div>
              <div className='flex items-baseline gap-2'>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--rausch)',
                    letterSpacing: '0.1em',
                  }}
                >
                  {s.step}
                </span>
                <h3 style={{ fontSize: 22 }}>{s.title}</h3>
              </div>
              <p
                style={{
                  marginTop: 10,
                  fontSize: 14,
                  color: 'var(--ink-2)',
                  lineHeight: 1.6,
                }}
              >
                {s.body}
              </p>

              {/* Connector arrow between steps (hide on last) */}
              {i < JOURNEY.length - 1 && (
                <span
                  className='donate-journey-arrow absolute'
                  aria-hidden
                  style={{
                    top: 60,
                    right: -18,
                    color: 'var(--peach-stroke)',
                  }}
                >
                  <svg width='28' height='14' viewBox='0 0 28 14' fill='none'>
                    <path
                      d='M2 7 H24 M18 2 L24 7 L18 12'
                      stroke='currentColor'
                      strokeWidth='1.6'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      fill='none'
                    />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ THE FORM ═══════════════════ */}
      <section ref={formRef} className='section-tight'>
        <div
          className='grid items-start donate-form-grid'
          style={{
            gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)',
            gap: 'clamp(32px, 4vw, 56px)',
          }}
        >
          {/* Left: confirmation card */}
          <aside
            className='rounded-3xl relative overflow-hidden'
            style={{
              padding: 'clamp(32px, 4vw, 48px)',
              background:
                'linear-gradient(155deg, var(--cream) 0%, var(--rose) 100%)',
              border: '1px solid var(--hairline-soft)',
            }}
          >
            <Eyebrow>Your gift</Eyebrow>
            {selectedTier && !customAmount ? (
              <>
                <div
                  className='inline-flex items-center justify-center rounded-2xl mt-4'
                  style={{
                    width: 64,
                    height: 64,
                    background: 'rgba(255,255,255,0.6)',
                  }}
                >
                  <selectedTier.Icon />
                </div>
                <div
                  className='mt-5'
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 56,
                    fontWeight: 600,
                    color: 'var(--ink)',
                    lineHeight: 1,
                  }}
                >
                  {peso(selectedTier.amount)}
                </div>
                <div
                  className='mt-2'
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontSize: 20,
                    color: TONE_INK[selectedTier.tone],
                  }}
                >
                  {selectedTier.label}
                </div>
                <p
                  className='mt-4'
                  style={{
                    fontSize: 14,
                    color: 'var(--ink-2)',
                    lineHeight: 1.55,
                  }}
                >
                  {selectedTier.detail}
                </p>
              </>
            ) : (
              <>
                <div
                  className='mt-5'
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 56,
                    fontWeight: 600,
                    color: 'var(--ink)',
                    lineHeight: 1,
                  }}
                >
                  {amountValid ? peso(effectiveAmount) : '₱—'}
                </div>
                <div
                  className='mt-2'
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontSize: 20,
                    color: 'var(--rausch)',
                  }}
                >
                  Your own amount
                </div>
                <p
                  className='mt-4'
                  style={{
                    fontSize: 14,
                    color: 'var(--ink-2)',
                    lineHeight: 1.55,
                  }}
                >
                  Whatever you can. We turn every dollar into food, care, and
                  warmth — no exceptions.
                </p>
              </>
            )}

            {selectedShelter && (
              <div
                className='mt-6 rounded-2xl'
                style={{
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.55)',
                  border: '1px solid rgba(28,44,44,0.08)',
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    marginBottom: 4,
                  }}
                >
                  Going to
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--ink)',
                    lineHeight: 1.35,
                  }}
                >
                  {selectedShelter.name}
                </div>
                <button
                  type='button'
                  onClick={() => {
                    formRef.current?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                    setSelectedShelterId(null);
                    openCombo();
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    marginTop: 6,
                    fontSize: 12,
                    color: 'var(--rausch)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    textDecoration: 'underline',
                    textUnderlineOffset: 3,
                  }}
                >
                  Change shelter ↑
                </button>
              </div>
            )}

            <button
              type='button'
              onClick={() =>
                tiersRef.current?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
              }
              className='mt-5'
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                fontSize: 13,
                color: 'var(--rausch)',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                textDecoration: 'underline',
                textUnderlineOffset: 3,
              }}
            >
              Change amount ↑
            </button>

            <div
              className='mt-8'
              style={{
                borderTop: '1px dashed rgba(28,44,44,0.15)',
                paddingTop: 24,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--muted)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                What happens next
              </div>
              <ul
                className='mt-4 flex flex-col gap-3'
                style={{
                  fontSize: 13.5,
                  color: 'var(--ink-2)',
                  lineHeight: 1.5,
                }}
              >
                <li className='flex gap-2'>
                  <span style={{ color: 'var(--rausch)' }}>✓</span> A receipt in
                  your inbox within minutes.
                </li>
                <li className='flex gap-2'>
                  <span style={{ color: 'var(--rausch)' }}>✓</span> A photo
                  update from the pet your gift helped.
                </li>
                <li className='flex gap-2'>
                  <span style={{ color: 'var(--rausch)' }}>✓</span> Zero spam —
                  ever. We promise.
                </li>
              </ul>
            </div>

            <span
              className='absolute'
              style={{
                bottom: -10,
                right: -8,
                opacity: 0.7,
                animation: 'floatY 5s ease-in-out infinite',
              }}
            >
              <PawDeco size={56} opacity={0.4} />
            </span>
          </aside>

          {/* Right: form or success */}
          <form
            className='bg-(--canvas) border border-(--hairline-soft) rounded-3xl'
            style={{ padding: 'clamp(32px, 4vw, 52px)' }}
            onSubmit={onSubmit}
            noValidate
          >
            {submittedAmount !== null ? (
              <div
                className='text-center'
                style={{
                  padding: '32px 0 16px',
                  animation: 'authScaleIn 0.36s cubic-bezier(0.2,0,0,1) both',
                }}
              >
                <div
                  className='relative w-22 h-22 rounded-full flex items-center justify-center mx-auto mb-8'
                  style={{
                    width: 88,
                    height: 88,
                    background: 'var(--mint)',
                    animation:
                      'authScaleIn 0.42s cubic-bezier(0.34,1.56,0.64,1) 0.1s both',
                  }}
                >
                  <svg width='38' height='38' viewBox='0 0 32 32' fill='none'>
                    <polyline
                      points='8 16 14 22 24 10'
                      stroke='#1D7575'
                      strokeWidth='3'
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  {/* Scattered celebration paws */}
                  <span
                    className='absolute'
                    style={{
                      top: -8,
                      left: -24,
                      animation: 'floatY 3s ease-in-out infinite',
                    }}
                  >
                    <PawDeco size={22} opacity={0.6} />
                  </span>
                  <span
                    className='absolute'
                    style={{
                      bottom: -8,
                      right: -28,
                      animation: 'floatY 3.4s ease-in-out infinite',
                      animationDelay: '0.5s',
                    }}
                  >
                    <PawDeco size={26} opacity={0.55} />
                  </span>
                  <span
                    className='absolute'
                    style={{
                      top: '40%',
                      right: -44,
                      animation: 'floatY 4s ease-in-out infinite',
                      animationDelay: '1s',
                    }}
                  >
                    <PawDeco size={18} opacity={0.5} />
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 32,
                    lineHeight: 1.15,
                  }}
                >
                  {peso(submittedAmount)} is on its way
                  <br />
                  to wagging tails.
                </h2>
                <p
                  className='muted'
                  style={{
                    maxWidth: 380,
                    margin: '20px auto 0',
                    lineHeight: 1.6,
                  }}
                >
                  A receipt is heading to your inbox
                  {selectedShelter ? (
                    <>
                      {' '}
                      — and{' '}
                      <strong style={{ color: 'var(--ink)' }}>
                        {selectedShelter.name}
                      </strong>{' '}
                      will put it straight to work
                    </>
                  ) : (
                    <> — and somewhere, a small belly is about to be full</>
                  )}{' '}
                  because of you. Thank you, {name.split(' ')[0] || 'friend'}.
                </p>
                <div className='flex gap-3 justify-center mt-12 flex-wrap'>
                  <Link to='/' className='btn btn-soft'>
                    Back to home
                  </Link>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => {
                      setSubmittedAmount(null);
                      setName('');
                      setEmail('');
                      setMessage('');
                      setCustomAmount('');
                      setSelectedAmount(1500);
                      setSelectedShelterId(null);
                    }}
                  >
                    Give again
                  </button>
                </div>
              </div>
            ) : (
              <div className='flex flex-col gap-6'>
                <div>
                  <Eyebrow>Step 2 — Your details</Eyebrow>
                  <h2
                    className='mt-4'
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 30,
                      lineHeight: 1.15,
                    }}
                  >
                    Where should we send the thank-you?
                  </h2>
                </div>

                <div className='field'>
                  <label htmlFor='shelter-trigger'>
                    Which shelter receives your gift?
                  </label>
                  <div className='shelter-combo' ref={comboRef}>
                    <button
                      id='shelter-trigger'
                      ref={shelterTriggerRef}
                      type='button'
                      className={`shelter-combo-trigger${comboOpen ? ' is-open' : ''}${errors.shelter ? ' has-error' : ''}`}
                      onClick={() => (comboOpen ? setComboOpen(false) : openCombo())}
                      aria-haspopup='listbox'
                      aria-expanded={comboOpen}
                      aria-controls='shelter-listbox'
                    >
                      {selectedShelter && (
                        <svg
                          className='shelter-combo-trigger-pin'
                          width='12'
                          height='12'
                          viewBox='0 0 16 16'
                          fill='none'
                          aria-hidden
                        >
                          <path
                            d='M8 1.6 C5.2 1.6 3 3.8 3 6.6 C3 9.4 6 13.4 7.3 14.2 C7.7 14.5 8.3 14.5 8.7 14.2 C10 13.4 13 9.4 13 6.6 C13 3.8 10.8 1.6 8 1.6 Z'
                            fill='#FDDDB0'
                            stroke='#A55E24'
                            strokeWidth='1.2'
                            strokeLinejoin='round'
                          />
                          <circle cx='8' cy='6.6' r='1.8' fill='#A55E24' />
                        </svg>
                      )}
                      <span
                        className={`shelter-combo-trigger-text${selectedShelter ? '' : ' is-placeholder'}`}
                      >
                        {selectedShelter
                          ? selectedShelter.name
                          : 'Choose a shelter…'}
                      </span>
                      <svg
                        className='shelter-combo-trigger-chev'
                        width='14'
                        height='14'
                        viewBox='0 0 14 14'
                        fill='none'
                        aria-hidden
                      >
                        <path
                          d='M3 5 L7 9 L11 5'
                          stroke='currentColor'
                          strokeWidth='1.8'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          fill='none'
                        />
                      </svg>
                    </button>

                    {comboOpen && (
                      <div className='shelter-combo-panel'>
                        <div className='shelter-combo-panel-head'>
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            aria-hidden
                          >
                            <ellipse
                              cx='7'
                              cy='7'
                              rx='4.6'
                              ry='4.3'
                              stroke='currentColor'
                              strokeWidth='1.6'
                            />
                            <path
                              d='M10.4 10.6 Q12.2 12.4 14 14.2'
                              stroke='currentColor'
                              strokeWidth='1.8'
                              strokeLinecap='round'
                              fill='none'
                            />
                          </svg>
                          <input
                            ref={shelterSearchRef}
                            type='search'
                            autoComplete='off'
                            placeholder='Search…'
                            value={shelterQuery}
                            onChange={(e) => {
                              setShelterQuery(e.target.value);
                              setComboHighlight(0);
                            }}
                            onKeyDown={(ev) => {
                              if (ev.key === 'ArrowDown') {
                                ev.preventDefault();
                                setComboHighlight((h) =>
                                  Math.min(
                                    h + 1,
                                    Math.max(0, filteredShelters.length - 1),
                                  ),
                                );
                              } else if (ev.key === 'ArrowUp') {
                                ev.preventDefault();
                                setComboHighlight((h) => Math.max(h - 1, 0));
                              } else if (ev.key === 'Enter') {
                                ev.preventDefault();
                                const pick = filteredShelters[comboHighlight];
                                if (pick) pickShelter(pick.id);
                              }
                            }}
                          />
                        </div>

                        {filteredShelters.length === 0 ? (
                          <div className='shelter-combo-panel-empty'>
                            <PawDeco size={32} opacity={0.55} />
                            <span>
                              No shelters answer to “
                              <em>{shelterQuery.trim()}</em>”.
                            </span>
                          </div>
                        ) : (
                          <ul
                            id='shelter-listbox'
                            ref={comboListRef}
                            className='shelter-combo-panel-list'
                            role='listbox'
                            aria-label='Shelters'
                          >
                            {filteredShelters.map((s, i) => {
                              const isSelected = s.id === selectedShelterId;
                              const isActive = i === comboHighlight;
                              return (
                                <li
                                  key={s.id}
                                  data-idx={i}
                                  role='option'
                                  aria-selected={isSelected}
                                  className={`shelter-combo-panel-row${isActive ? ' is-active' : ''}${isSelected ? ' is-selected' : ''}`}
                                  onMouseEnter={() => setComboHighlight(i)}
                                  onMouseDown={(ev) => {
                                    ev.preventDefault(); // keep focus on search
                                    pickShelter(s.id);
                                  }}
                                >
                                  <span className='shelter-combo-panel-name'>
                                    {s.name}
                                  </span>
                                  <span className='shelter-combo-panel-city'>
                                    {shortCity(s.address)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                  {errors.shelter && (
                    <p
                      role='alert'
                      style={{ fontSize: 13, color: '#c0304d', marginTop: 6 }}
                    >
                      {errors.shelter}
                    </p>
                  )}
                </div>

                <div className='r-grid-form-2 gap-4'>
                  <div className='field'>
                    <label htmlFor='donor-name'>Your name</label>
                    <input
                      id='donor-name'
                      type='text'
                      placeholder='Jane Doe'
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrors((er) => ({ ...er, name: undefined }));
                      }}
                    />
                    {errors.name && (
                      <p
                        role='alert'
                        style={{ fontSize: 13, color: '#c0304d', marginTop: 6 }}
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className='field'>
                    <label htmlFor='donor-email'>Email for receipt</label>
                    <input
                      id='donor-email'
                      type='email'
                      placeholder='you@example.com'
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((er) => ({ ...er, email: undefined }));
                      }}
                    />
                    {errors.email && (
                      <p
                        role='alert'
                        style={{ fontSize: 13, color: '#c0304d', marginTop: 6 }}
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className='field'>
                  <label htmlFor='donor-message'>
                    Leave a note{' '}
                    <span style={{ color: 'var(--muted)' }}>(optional)</span>
                  </label>
                  <textarea
                    id='donor-message'
                    placeholder='In honor of someone, or a note for the team…'
                    maxLength={MESSAGE_MAX}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <div
                    style={{
                      fontSize: 12,
                      color: 'var(--muted)',
                      marginTop: 4,
                      textAlign: 'right',
                    }}
                  >
                    {message.length}/{MESSAGE_MAX}
                  </div>
                </div>

                {apiError && (
                  <div
                    role='alert'
                    style={{
                      background: '#fde8ec',
                      color: '#c0304d',
                      padding: '10px 14px',
                      borderRadius: 10,
                      fontSize: 14,
                    }}
                  >
                    {apiError}
                  </div>
                )}

                <button
                  type='submit'
                  className='btn btn-primary btn-lg group'
                  disabled={submitting}
                  style={{ width: '100%', marginTop: 12 }}
                >
                  {submitting ? (
                    <>Sending your gift…</>
                  ) : (
                    <>
                      Send{amountValid ? ` ${peso(effectiveAmount)}` : ''} with
                      love
                      <svg
                        width='20'
                        height='20'
                        viewBox='0 0 20 20'
                        fill='none'
                        style={{
                          marginLeft: 8,
                          transition: 'transform 200ms var(--ease-spring)',
                        }}
                        className='donate-heart'
                      >
                        <path
                          d='M10 17 Q3 12 3 7 Q3 3 7 3 Q9 3 10 5 Q11 3 13 3 Q17 3 17 7 Q17 12 10 17 Z'
                          fill='#fff'
                        />
                      </svg>
                    </>
                  )}
                </button>
                <p
                  style={{
                    fontSize: 12,
                    color: 'var(--muted)',
                    textAlign: 'center',
                    marginTop: 10,
                  }}
                >
                  Secure · One-time gift · Receipt emailed immediately
                </p>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* ═══════════════════ VOICES ═══════════════════ */}
      <section className='section'>
        <SectionHead
          eyebrow='Voices'
          heading='Why people give'
          subheading='Real words from real donors who chose to step in.'
        />
        <div
          className='grid gap-6'
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          }}
        >
          {VOICES.map((v) => (
            <figure
              key={v.name}
              className='rounded-3xl relative'
              style={{
                padding:
                  'clamp(32px, 3vw, 44px) clamp(28px, 3vw, 36px) clamp(28px, 3vw, 36px)',
                background: TONE_BG[v.tone],
                border: `1px solid ${TONE_INK[v.tone]}22`,
                margin: 0,
              }}
            >
              <span className='absolute' style={{ top: 22, right: 24 }}>
                <QuoteMark tone={v.tone} />
              </span>
              <blockquote
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 19,
                  lineHeight: 1.55,
                  color: 'var(--ink)',
                  margin: 0,
                  paddingRight: 40,
                }}
              >
                {v.quote}
              </blockquote>
              <figcaption
                className='mt-7 flex items-center gap-3'
                style={{ fontSize: 13.5 }}
              >
                <span
                  className='inline-flex items-center justify-center rounded-full'
                  style={{
                    width: 36,
                    height: 36,
                    background: 'rgba(255,255,255,0.7)',
                    color: TONE_INK[v.tone],
                    fontWeight: 700,
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {v.name[0]}
                </span>
                <span>
                  <strong style={{ color: 'var(--ink)' }}>{v.name}</strong>
                  <span style={{ color: 'var(--muted)', marginLeft: 6 }}>
                    · {v.city}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ═══════════════════ OTHER WAYS ═══════════════════ */}
      <section
        className='section-tight rounded-3xl text-center mb-5'
        style={{
          padding: 'clamp(56px, 7vw, 96px) clamp(28px, 5vw, 72px)',
          background: 'var(--ink)',
          color: '#fff',
        }}
      >
        <Eyebrow style={{ color: 'var(--cream-2)', justifyContent: 'center' }}>
          Not today?
        </Eyebrow>
        <h2
          className='mt-6'
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 40px)',
            color: '#fff',
            lineHeight: 1.2,
          }}
        >
          You don’t have to give money to give a damn.
        </h2>
        <p
          className='mx-auto mt-6'
          style={{
            maxWidth: 540,
            color: '#c8cbd6',
            fontSize: 16,
            lineHeight: 1.65,
          }}
        >
          Foster a pet between homes, volunteer at a shelter, or just share one
          of these faces with someone who might be ready.
        </p>
        <div className='flex gap-4 justify-center mt-10 flex-wrap'>
          <Link
            to='/pets'
            className='btn'
            style={{
              background: 'var(--cream)',
              color: 'var(--ink)',
              borderColor: 'var(--cream)',
            }}
          >
            Browse pets
          </Link>
          <Link
            to='/contact'
            className='btn btn-outline'
            style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}
          >
            Volunteer with us
          </Link>
        </div>
      </section>

      {/* ───────── Page-local responsive tweaks ───────── */}
      <style>{`
        .donate-hero-grid { position: relative; }
        .donate-hero-art { min-height: 280px; }
        .donate-heart:hover,
        button:hover .donate-heart {
          transform: scale(1.2) rotate(-4deg);
        }

        /* Big "any amount" input — borderless, centered, display-font */
        .donate-hero-amount-input {
          font-family: var(--font-display);
          font-size: clamp(40px, 5vw, 56px);
          font-weight: 600;
          color: var(--ink);
          background: transparent;
          border: none;
          outline: none;
          width: clamp(120px, 30vw, 220px);
          text-align: left;
          padding: 0;
          line-height: 1;
          appearance: textfield;
          -moz-appearance: textfield;
        }
        .donate-hero-amount-input::-webkit-outer-spin-button,
        .donate-hero-amount-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .donate-hero-amount-input::placeholder {
          color: var(--muted-soft);
        }
        .donate-journey-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }
        .donate-journey-step { position: relative; }

        /* ───── Shelter combo (select-style trigger + searchable panel) ───── */
        .shelter-combo { position: relative; }

        .shelter-combo-trigger {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          height: 52px;
          padding: 0 14px 0 16px;
          background: var(--canvas);
          border: 1.5px solid var(--hairline);
          border-radius: 12px;
          font-family: inherit;
          color: var(--ink);
          text-align: left;
          cursor: pointer;
          transition:
            border-color var(--dur-base) var(--ease-out),
            box-shadow var(--dur-base) var(--ease-out);
        }
        .shelter-combo-trigger:focus-visible,
        .shelter-combo-trigger.is-open {
          outline: none;
          border-color: var(--rausch);
          border-width: 2px;
          padding: 0 13px 0 15px;
          box-shadow: 0 0 0 3px rgba(232, 146, 60, 0.15);
        }
        .shelter-combo-trigger.has-error { border-color: #c0304d; }

        .shelter-combo-trigger-pin { flex-shrink: 0; }

        .shelter-combo-trigger-text {
          flex: 1;
          min-width: 0;
          font-family: var(--font-display);
          font-size: 15.5px;
          color: var(--ink);
          line-height: 1.3;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .shelter-combo-trigger-text.is-placeholder {
          font-style: italic;
          color: var(--muted);
        }

        .shelter-combo-trigger-chev {
          flex-shrink: 0;
          color: var(--peach-stroke);
          transition: transform 200ms var(--ease-out);
        }
        .shelter-combo-trigger.is-open .shelter-combo-trigger-chev {
          transform: rotate(180deg);
        }

        /* Panel */
        .shelter-combo-panel {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          z-index: 20;
          background: var(--canvas);
          border: 1px solid var(--hairline-soft);
          border-radius: 14px;
          box-shadow: var(--shadow-card);
          overflow: hidden;
          transform-origin: top center;
          animation: authScaleIn 180ms cubic-bezier(0.2, 0, 0, 1);
        }

        .shelter-combo-panel-head {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background:
            linear-gradient(180deg, var(--cream) 0%, rgba(255, 248, 240, 0) 100%);
          border-bottom: 1px solid var(--hairline-soft);
        }
        .shelter-combo-panel-head > svg {
          color: var(--peach-stroke);
          flex-shrink: 0;
        }
        .shelter-combo-panel-head input[type='search'] {
          flex: 1;
          min-width: 0;
          height: 28px;
          background: transparent;
          border: none;
          outline: none;
          padding: 0;
          font-family: var(--font-display);
          font-style: italic;
          font-size: 14.5px;
          color: var(--ink);
          caret-color: var(--rausch);
          -webkit-appearance: none;
          appearance: none;
        }
        .shelter-combo-panel-head input[type='search']::placeholder {
          color: var(--muted);
          font-style: italic;
          font-family: var(--font-display);
        }
        .shelter-combo-panel-head input[type='search']::-webkit-search-cancel-button {
          -webkit-appearance: none;
          appearance: none;
        }

        .shelter-combo-panel-list {
          list-style: none;
          margin: 0;
          padding: 4px 0;
          max-height: clamp(220px, 36vh, 304px);
          overflow-y: auto;
          -webkit-mask-image: linear-gradient(
            180deg,
            #000 0%,
            #000 90%,
            transparent 100%
          );
                  mask-image: linear-gradient(
            180deg,
            #000 0%,
            #000 90%,
            transparent 100%
          );
        }
        .shelter-combo-panel-list::-webkit-scrollbar { width: 6px; }
        .shelter-combo-panel-list::-webkit-scrollbar-thumb {
          background: var(--peach-stroke);
          border-radius: 3px;
          opacity: 0.5;
        }
        .shelter-combo-panel-list::-webkit-scrollbar-track { background: transparent; }

        .shelter-combo-panel-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 14px;
          padding: 12px 18px;
          cursor: pointer;
          transition: background 160ms var(--ease-out);
        }
        .shelter-combo-panel-row.is-active {
          background: rgba(253, 221, 176, 0.3);
        }
        .shelter-combo-panel-row.is-selected {
          background: linear-gradient(
            90deg,
            rgba(253, 221, 176, 0.55) 0%,
            rgba(253, 221, 176, 0) 100%
          );
        }
        .shelter-combo-panel-row.is-active.is-selected {
          background: linear-gradient(
            90deg,
            rgba(253, 221, 176, 0.7) 0%,
            rgba(253, 221, 176, 0.05) 100%
          );
        }

        .shelter-combo-panel-name {
          font-family: var(--font-display);
          font-size: 15px;
          color: var(--ink);
          line-height: 1.3;
          flex: 1 1 auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          min-width: 0;
          text-decoration-thickness: 1.5px;
          text-underline-offset: 5px;
        }
        .shelter-combo-panel-row.is-selected .shelter-combo-panel-name {
          text-decoration: underline wavy var(--rausch);
        }

        .shelter-combo-panel-city {
          font-family: var(--font-body);
          font-size: 10.5px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          flex: 0 0 auto;
          line-height: 1.4;
          transition: color 180ms var(--ease-out);
        }
        .shelter-combo-panel-row.is-selected .shelter-combo-panel-city {
          color: var(--ink-2);
        }

        .shelter-combo-panel-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 28px 16px 32px;
          text-align: center;
          font-style: italic;
          font-family: var(--font-display);
          font-size: 13.5px;
          color: var(--muted);
          line-height: 1.5;
        }
        .shelter-combo-panel-empty em {
          color: var(--ink-2);
          font-style: normal;
          font-weight: 600;
        }

        @media (max-width: 640px) {
          .shelter-combo-panel-head { padding: 12px 14px; }
          .shelter-combo-panel-row {
            padding: 12px 14px;
            flex-direction: column;
            align-items: flex-start;
            gap: 3px;
          }
          .shelter-combo-panel-name {
            white-space: normal;
            line-height: 1.35;
          }
        }

        /* Tablet: stack hero, 2-col journey */
        @media (max-width: 960px) {
          .donate-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .donate-hero-text { grid-column: 1 / -1; }
          .donate-hero-art  { grid-column: 1 / -1; max-width: 380px; margin: 0 auto; }
          .donate-form-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .donate-journey-grid { grid-template-columns: repeat(2, 1fr); gap: 32px; }
          .donate-journey-arrow { display: none; }
        }

        /* Mobile: looser internal padding inside the wrap, stack journey,
           side-by-side hero CTAs, illustration becomes atmospheric backdrop */
        @media (max-width: 640px) {
          .donate-hero-text > h1 { line-height: 1.05; }
          .donate-journey-grid { grid-template-columns: 1fr; gap: 28px; }

          /* Side-by-side CTAs, smaller */
          .donate-hero-cta-row {
            flex-wrap: nowrap;
            gap: 10px;
          }
          .donate-hero-cta-row > * {
            flex: 1 1 0;
            min-width: 0;
            height: 46px;
            padding: 0 14px;
            font-size: 14px;
            white-space: nowrap;
          }

          /* Illustration → atmospheric background */
          .donate-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          .donate-hero-art {
            position: absolute;
            top: -6%;
            right: -14%;
            width: 78%;
            max-width: 360px;
            min-height: 0;
            opacity: 0.32;
            margin: 0 !important;
            pointer-events: none;
            z-index: 0;
          }
          .donate-hero-text {
            position: relative;
            z-index: 1;
          }
        }
      `}</style>
    </>
  );
}
