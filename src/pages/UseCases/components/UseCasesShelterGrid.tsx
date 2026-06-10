import { useEffect, useRef, useState } from 'react';
import { ChevronDown, MapPin, Search, SlidersHorizontal, X } from 'lucide-react';
import { useShelters } from '@/context/useShelters';
import { usePets } from '@/context/usePets';
import SectionHead from '@/components/ui/SectionHead';
import { GENERIC_SHELTER_BG } from '@/pages/ShelterDetail/assets';
import type {
  ApiShelter,
  BackendGender,
  BackendSize,
  BackendSpecies,
} from '@/services/api';
import type { Shelter } from '@/data/shelters';
import type { SpeciesCounts } from '../UseCases';
import { REGIONS, REGION_ORDER, type RegionId } from '../data/regions';
import { SPECIES_ICON } from '../assets/svg/species';
import { SPECIES_LABELS, SPECIES_ORDER } from '../data/species';
import {
  useShelterFilters,
  type ProvinceOption,
  type ProvinceFilter,
  type AgeBand,
  AGE_BAND_ORDER,
  AGE_BAND_LABEL,
  SIZE_ORDER,
  SIZE_LABEL,
  GENDER_ORDER,
  GENDER_LABEL,
} from '../hooks/useShelterFilters';
import UseCasesShelterCard from './UseCasesShelterCard';

interface UseCasesShelterGridProps {
  countFor: (shelterId: number) => number;
  speciesCountsFor: (shelterId: number) => SpeciesCounts;
}

const SHELTER_PALETTES: { bg: string; ink: string; rule: string }[] = [
  { bg: '#fde2cf', ink: '#5c2b1a', rule: 'rgba(92,43,26,0.18)' },
  { bg: '#ffe9b8', ink: '#5a3e0f', rule: 'rgba(90,62,15,0.18)' },
  { bg: '#e9f5ee', ink: '#1f4a3a', rule: 'rgba(31,74,58,0.20)' },
  { bg: '#e5edf6', ink: '#1f3a5c', rule: 'rgba(31,58,92,0.20)' },
  { bg: '#f4eaff', ink: '#3d2a5c', rule: 'rgba(61,42,92,0.20)' },
  { bg: '#fbe6e2', ink: '#5c1f1a', rule: 'rgba(92,31,26,0.18)' },
];

const NEW_SHELTER_MS = 30 * 24 * 60 * 60 * 1000;

/** Click-outside + Escape close hook for popover containers. */
function useDismissable(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent) {
      const node = ref.current;
      if (node && !node.contains(e.target as Node)) onClose();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);
  return ref;
}

interface FilterPillProps {
  label: string;
  icon: React.ReactNode;
  count?: number;
  open: boolean;
  onClick: () => void;
}

function FilterPill({ label, icon, count, open, onClick }: FilterPillProps) {
  const hasSelection = (count ?? 0) > 0;
  const isActive = hasSelection || open;
  return (
    <button
      type='button'
      onClick={onClick}
      aria-expanded={open}
      aria-haspopup='menu'
      className={`group w-full md:w-auto md:shrink-0 inline-flex items-center justify-center md:justify-start gap-2 h-11 px-3.5 rounded-full text-14 font-medium transition-[background,color] duration-200 ${
        isActive
          ? 'bg-(--ink) text-white'
          : 'text-(--ink-2) hover:bg-(--soft) hover:text-(--ink)'
      }`}
    >
      <span
        className={`inline-flex items-center ${
          isActive ? 'text-white/80' : 'text-(--muted) group-hover:text-(--ink)'
        }`}
        aria-hidden='true'
      >
        {icon}
      </span>
      <span
        className={
          isActive ? '' : 'underline decoration-transparent decoration-1 underline-offset-[6px] group-hover:decoration-(--ink)'
        }
      >
        {label}
      </span>
      {hasSelection && (
        <span
          className={`inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full text-11 font-bold tabular-nums ${
            isActive ? 'bg-white/15 text-white' : 'bg-(--rausch-soft) text-(--rausch-active)'
          }`}
        >
          {count}
        </span>
      )}
      <ChevronDown
        size={13}
        strokeWidth={2}
        className={`transition-transform duration-200 ${
          isActive ? 'text-white/70' : 'text-(--muted-soft)'
        } ${open ? 'rotate-180' : ''}`}
      />
    </button>
  );
}

// ── Location popover ─────────────────────────────────────────────────────────
// Province-first. Regions appear only as non-clickable headers so the user
// can still orient by island without filtering by an entire third of the
// country.

interface LocationPopoverProps {
  province: ProvinceFilter;
  provinceOptions: ProvinceOption[];
  onSelect: (p: ProvinceFilter) => void;
  onClose: () => void;
  align?: 'left' | 'right';
}

function LocationPopover({
  province,
  provinceOptions,
  onSelect,
  onClose,
  align = 'left',
}: LocationPopoverProps) {
  const ref = useDismissable(true, onClose);
  const [query, setQuery] = useState('');

  const grouped: Record<RegionId, ProvinceOption[]> = {
    LUZON: [],
    VISAYAS: [],
    MINDANAO: [],
  };
  const q = query.trim().toLowerCase();
  for (const p of provinceOptions) {
    if (q.length > 0 && !p.name.toLowerCase().includes(q)) continue;
    grouped[p.region].push(p);
  }

  const allActive = province === 'ALL';
  const visibleRegions = REGION_ORDER.filter((r) => grouped[r].length > 0);
  const empty = visibleRegions.length === 0;

  return (
    <div
      ref={ref}
      role='menu'
      className={`absolute top-full mt-3 z-30 w-[min(340px,calc(100vw-2rem))] rounded-28 bg-(--canvas) [box-shadow:var(--shadow-lift)] ring-1 ring-(--hairline-soft) overflow-hidden ${
        align === 'right' ? 'right-0' : 'left-0'
      }`}
      style={{
        animation: 'authScaleIn 180ms cubic-bezier(0.16, 1, 0.3, 1) both',
        transformOrigin: align === 'right' ? 'top right' : 'top left',
      }}
    >
      <div className='px-5 pt-5 pb-3'>
        <div className='relative'>
          <Search
            size={14}
            strokeWidth={2}
            className='pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-(--muted)'
            aria-hidden='true'
          />
          <input
            type='search'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            placeholder='Find a province'
            aria-label='Find a province'
            className='h-9 w-full bg-transparent border-0 border-b border-(--hairline-soft) pl-6 pr-1 text-14 text-(--ink) outline-none placeholder:text-(--muted) focus:border-(--ink) transition-colors duration-150'
          />
        </div>
      </div>

      <div className='max-h-[58vh] overflow-y-auto pb-3'>
        <button
          type='button'
          onClick={() => {
            onSelect('ALL');
            onClose();
          }}
          className={`group w-full flex items-center justify-between px-5 py-2 text-left text-14 transition-colors ${
            allActive
              ? 'text-(--ink) font-semibold'
              : 'text-(--ink-2) hover:text-(--ink)'
          }`}
        >
          <span
            className={
              allActive
                ? ''
                : 'underline decoration-transparent decoration-1 underline-offset-4 group-hover:decoration-(--ink-2)'
            }
          >
            All locations
          </span>
          {allActive && (
            <span
              aria-hidden='true'
              className='inline-block h-1.5 w-1.5 rounded-full bg-(--rausch)'
            />
          )}
        </button>

        {empty && (
          <p className='px-5 py-6 text-center text-13 text-(--muted)'>
            No provinces match “{query}”.
          </p>
        )}

        {visibleRegions.map((r) => {
          const meta = REGIONS[r];
          const provs = grouped[r];
          return (
            <div key={r} className='mt-3'>
              <div className='flex items-baseline justify-between px-5 pb-1.5'>
                <span className='text-11 font-semibold uppercase tracking-16 text-(--muted)'>
                  {meta.display}
                </span>
                <span className='text-11 uppercase tracking-widest text-(--muted-soft) tabular-nums'>
                  {provs.length}
                </span>
              </div>
              <ul>
                {provs.map((p) => {
                  const isSelected = province === p.name;
                  return (
                    <li key={p.name}>
                      <button
                        type='button'
                        onClick={() => {
                          onSelect(p.name);
                          onClose();
                        }}
                        className={`group w-full flex items-center justify-between px-5 py-1.5 text-left text-14 transition-colors ${
                          isSelected
                            ? 'text-(--ink) font-semibold'
                            : 'text-(--ink-2) hover:text-(--ink)'
                        }`}
                      >
                        <span className='flex items-baseline gap-2 min-w-0'>
                          <span
                            className={
                              isSelected
                                ? 'truncate'
                                : 'truncate underline decoration-transparent decoration-1 underline-offset-4 group-hover:decoration-(--ink-2)'
                            }
                          >
                            {p.name}
                          </span>
                          {p.count > 0 && (
                            <span className='text-11 text-(--muted) tabular-nums shrink-0'>
                              {p.count}
                            </span>
                          )}
                        </span>
                        {isSelected && (
                          <span
                            aria-hidden='true'
                            className='inline-block h-1.5 w-1.5 rounded-full bg-(--rausch) shrink-0'
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Refine popover ───────────────────────────────────────────────────────────
// One panel collapses what would otherwise be four separate pills. Species is
// a row layout (icons + counts); the shorter-axis filters (size/age/gender)
// render as compact chip rows so the panel stays tight.

interface RefinePopoverProps {
  species: ReadonlySet<BackendSpecies>;
  sizes: ReadonlySet<BackendSize>;
  ages: ReadonlySet<AgeBand>;
  genders: ReadonlySet<BackendGender>;
  speciesCounts: Partial<Record<BackendSpecies, number>>;
  sizeCounts: Partial<Record<BackendSize, number>>;
  ageCounts: Partial<Record<AgeBand, number>>;
  genderCounts: Partial<Record<BackendGender, number>>;
  refineCount: number;
  onToggleSpecies: (s: BackendSpecies) => void;
  onToggleSize: (s: BackendSize) => void;
  onToggleAge: (a: AgeBand) => void;
  onToggleGender: (g: BackendGender) => void;
  onReset: () => void;
  onClose: () => void;
  align?: 'left' | 'right';
}

function Chip({
  label,
  active,
  available,
  onClick,
}: {
  label: string;
  active: boolean;
  available: boolean;
  onClick: () => void;
}) {
  const muted = !available && !active;
  return (
    <button
      type='button'
      onClick={onClick}
      aria-pressed={active}
      disabled={muted}
      className={`group inline-flex items-center justify-center h-9 w-full rounded-full px-3 transition-[background,color,transform,box-shadow,border-color] duration-150 active:scale-[0.97] ${
        active
          ? 'bg-(--ink) text-white border border-(--ink) shadow-card-md'
          : muted
            ? 'bg-(--canvas) text-(--muted-soft) border border-(--hairline-soft) cursor-not-allowed'
            : 'bg-(--canvas) text-(--ink) border border-(--hairline) shadow-hairline hover:bg-(--cream) hover:border-(--ink-2) hover:-translate-y-px hover:shadow-card-sm'
      }`}
    >
      <span className='text-13 font-semibold leading-none whitespace-nowrap'>
        {label}
      </span>
    </button>
  );
}

function RefineSection({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className='px-5 pt-4'>
      <div className='flex items-baseline justify-between gap-3 mb-2.5'>
        <p className='text-11 font-semibold uppercase tracking-16 text-(--muted)'>
          {title}
        </p>
        {hint && (
          <p className='text-11 text-(--muted-soft) tabular-nums truncate'>
            {hint}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

function RefinePopover({
  species,
  sizes,
  ages,
  genders,
  speciesCounts,
  sizeCounts,
  ageCounts,
  genderCounts,
  refineCount,
  onToggleSpecies,
  onToggleSize,
  onToggleAge,
  onToggleGender,
  onReset,
  onClose,
  align = 'right',
}: RefinePopoverProps) {
  const ref = useDismissable(true, onClose);
  return (
    <div
      ref={ref}
      role='menu'
      className={`absolute top-full mt-3 z-30 w-[min(380px,calc(100vw-2rem))] rounded-28 bg-(--canvas) [box-shadow:var(--shadow-lift)] ring-1 ring-(--hairline) overflow-hidden ${
        align === 'right' ? 'right-0' : 'left-0'
      }`}
      style={{
        animation: 'authScaleIn 180ms cubic-bezier(0.16, 1, 0.3, 1) both',
        transformOrigin: align === 'right' ? 'top right' : 'top left',
      }}
    >
      <div className='flex items-center justify-between px-5 pt-4 pb-1'>
        <p className='text-11 font-semibold uppercase tracking-16 text-(--muted)'>
          Refine
          {refineCount > 0 && (
            <span className='ml-2 text-(--ink) tabular-nums'>
              {refineCount} on
            </span>
          )}
        </p>
        <button
          type='button'
          onClick={onReset}
          disabled={refineCount === 0}
          className='text-11 font-semibold uppercase tracking-16 text-(--ink-2) hover:text-(--rausch) transition-colors disabled:text-(--muted-soft) disabled:cursor-not-allowed'
        >
          Reset
        </button>
      </div>

      <div className='max-h-[70vh] overflow-y-auto pb-5'>
        {/* Species — pill rows with icon glyph, equal depth treatment */}
        <RefineSection title='Species'>
          <div className='flex flex-wrap gap-2'>
            {SPECIES_ORDER.map((sp) => {
              const Icon = SPECIES_ICON[sp];
              const isOn = species.has(sp);
              const count = speciesCounts[sp] ?? 0;
              const labels = SPECIES_LABELS[sp];
              const muted = count === 0 && !isOn;
              return (
                <button
                  key={sp}
                  type='button'
                  onClick={() => onToggleSpecies(sp)}
                  aria-pressed={isOn}
                  disabled={muted}
                  className={`inline-flex items-center gap-1.5 h-9 rounded-full pl-2.5 pr-3 transition-[background,color,transform,box-shadow,border-color] duration-150 active:scale-[0.97] ${
                    isOn
                      ? 'bg-(--ink) text-white border border-(--ink) shadow-card-md'
                      : muted
                        ? 'bg-(--canvas) text-(--muted-soft) border border-(--hairline-soft) cursor-not-allowed'
                        : 'bg-(--canvas) text-(--ink) border border-(--hairline) shadow-hairline hover:bg-(--cream) hover:border-(--ink-2) hover:-translate-y-px hover:shadow-card-sm'
                  }`}
                >
                  <Icon
                    aria-hidden='true'
                    className={`h-4 w-4 shrink-0 ${
                      isOn ? 'text-white/85' : 'text-(--rausch)'
                    }`}
                  />
                  <span className='text-13 font-semibold capitalize leading-none'>
                    {labels.plur}
                  </span>
                  {count > 0 && (
                    <span
                      className={`text-11 tabular-nums leading-none ${
                        isOn ? 'text-white/55' : 'text-(--muted)'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </RefineSection>

        <RefineSection title='Size'>
          <div className='grid grid-cols-4 gap-2'>
            {SIZE_ORDER.map((sz) => (
              <Chip
                key={sz}
                label={SIZE_LABEL[sz]}
                active={sizes.has(sz)}
                available={(sizeCounts[sz] ?? 0) > 0}
                onClick={() => onToggleSize(sz)}
              />
            ))}
          </div>
        </RefineSection>

        <RefineSection
          title='Age'
          hint='Baby ≤1y · Young 1–3y · Adult 3–8y · Senior 8y+'
        >
          <div className='grid grid-cols-4 gap-2'>
            {AGE_BAND_ORDER.map((a) => (
              <Chip
                key={a}
                label={AGE_BAND_LABEL[a].label}
                active={ages.has(a)}
                available={(ageCounts[a] ?? 0) > 0}
                onClick={() => onToggleAge(a)}
              />
            ))}
          </div>
        </RefineSection>

        <RefineSection title='Gender'>
          <div className='grid grid-cols-2 gap-2'>
            {GENDER_ORDER.map((g) => (
              <Chip
                key={g}
                label={GENDER_LABEL[g]}
                active={genders.has(g)}
                available={(genderCounts[g] ?? 0) > 0}
                onClick={() => onToggleGender(g)}
              />
            ))}
          </div>
        </RefineSection>
      </div>
    </div>
  );
}

function shelterMonogram(name: string): string {
  const tokens = name
    .replace(/[^\p{L}\s-]/gu, '')
    .split(/\s+/)
    .filter(
      (t) =>
        t.length > 0 &&
        !['the', 'and', 'of', 'a', 'an'].includes(t.toLowerCase()),
    );
  if (tokens.length === 0) return name.slice(0, 2).toUpperCase();
  if (tokens.length === 1) return tokens[0]!.slice(0, 2).toUpperCase();
  return (tokens[0]![0]! + tokens[1]![0]!).toUpperCase();
}

function MonogramArt({
  name,
  ink,
  rule,
}: {
  name: string;
  ink: string;
  rule: string;
}) {
  const initials = shelterMonogram(name);
  return (
    <div className='relative h-full w-full'>
      <svg
        className='absolute inset-0 h-full w-full opacity-40'
        viewBox='0 0 400 300'
        preserveAspectRatio='none'
        aria-hidden='true'
      >
        <defs>
          <pattern
            id={`hatch-${initials}`}
            patternUnits='userSpaceOnUse'
            width='24'
            height='24'
            patternTransform='rotate(-22)'
          >
            <line x1='0' y1='0' x2='0' y2='24' stroke={rule} strokeWidth='1' />
          </pattern>
        </defs>
        <rect width='400' height='300' fill={`url(#hatch-${initials})`} />
      </svg>
      <div
        className='absolute inset-6 border'
        style={{ borderColor: rule }}
        aria-hidden='true'
      />
      <div
        className='absolute inset-0 flex items-center justify-center'
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 'clamp(64px, 10vw, 110px)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: ink,
        }}
      >
        {initials}
      </div>
    </div>
  );
}

function apiShelterToCard(s: ApiShelter): Shelter {
  const palette = SHELTER_PALETTES[s.id % SHELTER_PALETTES.length]!;
  return {
    id: s.id,
    name: s.name,
    description: s.description,
    addressLine: s.addressLine,
    city: s.city,
    province: s.province,
    region: s.region,
    contactEmail: s.contactEmail,
    phoneNumber: s.phoneNumber,
    petCount: 0,
    bg: s.imageUrl ? GENERIC_SHELTER_BG : palette.bg,
    svg: s.imageUrl ? (
      <img src={s.imageUrl} alt='' />
    ) : (
      <MonogramArt name={s.name} ink={palette.ink} rule={palette.rule} />
    ),
  };
}

// ── Search input ─────────────────────────────────────────────────────────────

function SearchField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      const inEditable =
        t instanceof HTMLInputElement ||
        t instanceof HTMLTextAreaElement ||
        t?.isContentEditable;
      if (e.key === '/' && !inEditable) {
        e.preventDefault();
        ref.current?.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className='group relative flex-1 min-w-0'>
      <Search
        size={16}
        strokeWidth={1.8}
        className='pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-(--muted) transition-colors duration-200 group-focus-within:text-(--ink)'
        aria-hidden='true'
      />
      <input
        ref={ref}
        type='search'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Search by shelter name or city'
        aria-label='Search shelters by name or city'
        className='h-11 w-full bg-transparent border-0 border-b border-(--hairline) pl-7 pr-10 text-15 text-(--ink) outline-none transition-colors duration-200 placeholder:text-(--muted-soft) focus:border-(--ink)'
      />
      {value.length === 0 && (
        <kbd
          aria-hidden='true'
          className='absolute right-1 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center justify-center h-5 w-5 text-11 font-semibold text-(--muted-soft) tabular-nums'
        >
          /
        </kbd>
      )}
      {value.length > 0 && (
        <button
          type='button'
          onClick={() => onChange('')}
          aria-label='Clear search'
          className='absolute right-0 top-1/2 -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center rounded-full text-(--muted) hover:text-(--ink) transition-colors duration-150'
        >
          <X size={14} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}

// ── Empty state with illustration ────────────────────────────────────────────

function EmptyStateIcon() {
  return (
    <svg
      width='52'
      height='52'
      viewBox='0 0 64 64'
      fill='none'
      aria-hidden='true'
    >
      <circle cx='32' cy='32' r='30' fill='var(--cream)' />
      <path
        d='M22 27c0-2 2-4 4-4M42 27c0-2-2-4-4-4'
        stroke='var(--rausch)'
        strokeWidth='1.6'
        strokeLinecap='round'
      />
      <ellipse
        cx='32'
        cy='36'
        rx='12'
        ry='10'
        fill='var(--rausch-soft)'
        stroke='var(--rausch)'
        strokeWidth='1.6'
      />
      <circle cx='28' cy='34' r='1.4' fill='var(--ink)' />
      <circle cx='36' cy='34' r='1.4' fill='var(--ink)' />
      <path
        d='M30 40 Q32 42 34 40'
        stroke='var(--ink)'
        strokeWidth='1.4'
        fill='none'
        strokeLinecap='round'
      />
      <ellipse cx='22' cy='22' rx='3' ry='4' fill='var(--peach-stroke)' />
      <ellipse cx='42' cy='22' rx='3' ry='4' fill='var(--peach-stroke)' />
    </svg>
  );
}

function EmptyState({
  title,
  copy,
  onClear,
}: {
  title: string;
  copy: string;
  onClear?: () => void;
}) {
  return (
    <div className='mt-12 rounded-20 border border-(--hairline-soft) bg-(--canvas) py-16 px-8 text-center [box-shadow:var(--shadow-card)]'>
      <div className='inline-flex'>
        <EmptyStateIcon />
      </div>
      <h3 className='text-22 mt-5'>{title}</h3>
      <p className='mt-3 mx-auto max-w-md text-15 text-(--ink-2) leading-relaxed'>
        {copy}
      </p>
      {onClear && (
        <button
          type='button'
          onClick={onClear}
          className='btn btn-primary mt-7'
        >
          Reset filters
        </button>
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <article className='bg-(--canvas) rounded-20 overflow-hidden border border-(--hairline-soft)'>
      <div
        className='bg-(--soft) animate-pulse'
        style={{ aspectRatio: '4 / 3' }}
      />
      <div className='p-5.5'>
        <div className='h-3 w-1/3 rounded bg-(--soft) animate-pulse' />
        <div className='mt-3 h-5 w-3/4 rounded bg-(--soft) animate-pulse' />
        <div className='mt-3 h-3 w-full rounded bg-(--soft) animate-pulse' />
        <div className='mt-2 h-3 w-2/3 rounded bg-(--soft) animate-pulse' />
        <div className='mt-5 pt-4 border-t border-(--hairline-soft) flex justify-between'>
          <div className='h-8 w-24 rounded-full bg-(--soft) animate-pulse' />
          <div className='h-8 w-28 rounded-full bg-(--soft) animate-pulse' />
        </div>
      </div>
    </article>
  );
}

// ── Active-filter description for the result line ───────────────────────────

function refineSummary(
  species: ReadonlySet<BackendSpecies>,
  sizes: ReadonlySet<BackendSize>,
  ages: ReadonlySet<AgeBand>,
  genders: ReadonlySet<BackendGender>,
): string | null {
  const parts: string[] = [];
  if (species.size > 0) {
    parts.push(
      Array.from(species)
        .map((sp) => SPECIES_LABELS[sp].plur)
        .join(' or '),
    );
  }
  const attrs: string[] = [];
  if (sizes.size > 0) {
    attrs.push(
      Array.from(sizes)
        .map((s) => SIZE_LABEL[s].toLowerCase())
        .join('/'),
    );
  }
  if (ages.size > 0) {
    attrs.push(
      Array.from(ages)
        .map((a) => AGE_BAND_LABEL[a].label.toLowerCase())
        .join('/'),
    );
  }
  if (genders.size > 0) {
    attrs.push(
      Array.from(genders)
        .map((g) => GENDER_LABEL[g].toLowerCase())
        .join('/'),
    );
  }
  if (attrs.length > 0) parts.push(attrs.join(' · '));
  return parts.length > 0 ? parts.join(' — ') : null;
}

// ── Main ─────────────────────────────────────────────────────────────────────

export default function UseCasesShelterGrid({
  countFor,
  speciesCountsFor,
}: UseCasesShelterGridProps) {
  const { shelters, sheltersLoaded } = useShelters();
  const { pets } = usePets();
  const f = useShelterFilters(shelters, pets);
  const [now, _] = useState(() => Date.now());
  const [openMenu, setOpenMenu] = useState<'none' | 'location' | 'refine'>(
    'none',
  );
  const closeMenu = () => setOpenMenu('none');

  const locationLabel = f.province === 'ALL' ? 'Location' : f.province;
  const locationCount = f.province === 'ALL' ? 0 : 1;

  // Loading
  if (!sheltersLoaded) {
    return (
      <section className='section'>
        <SectionHead
          eyebrow='The network'
          heading='Shelters with pets ready to adopt'
          subheading='Every shelter is reviewed and approved before they can list a single pet.'
        />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7'>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    );
  }

  // No shelters at all
  if (shelters.length === 0) {
    return (
      <section className='section'>
        <SectionHead
          eyebrow='The network'
          heading='Shelters with pets ready to adopt'
          subheading='Partner shelters join KodaNest after a careful review. The directory is empty for now — check back soon.'
        />
      </section>
    );
  }

  const inactiveCount = shelters.length - f.activeNetworkCount;
  const refineDescription = refineSummary(
    f.species,
    f.sizes,
    f.ages,
    f.genders,
  );

  return (
    <section className='section'>
      <SectionHead
        eyebrow='The network'
        heading='Shelters with pets ready to adopt'
        subheading='Search by name, narrow by province, and refine by the kind of pet you’re hoping to meet.'
      />

      {/* ── Filter bar ─────────────────────────────────────────────────── */}
      <div
        className='w-full mx-auto mb-16'
        role='search'
        aria-label='Filter shelters'
      >
        <div className='flex flex-col md:flex-row gap-3 md:gap-5 md:items-center'>
          <SearchField value={f.search} onChange={f.setSearch} />
          <div className='flex w-full md:w-auto items-center gap-2'>
            <div className='relative flex-1 md:flex-none'>
              <FilterPill
                label={locationLabel}
                icon={<MapPin size={14} strokeWidth={1.8} />}
                count={locationCount}
                open={openMenu === 'location'}
                onClick={() =>
                  setOpenMenu((m) =>
                    m === 'location' ? 'none' : 'location',
                  )
                }
              />
              {openMenu === 'location' && (
                <LocationPopover
                  province={f.province}
                  provinceOptions={f.provinceOptions}
                  onSelect={(p) => f.setProvince(p)}
                  onClose={closeMenu}
                  align='left'
                />
              )}
            </div>
            <div className='relative flex-1 md:flex-none'>
              <FilterPill
                label='Refine'
                icon={<SlidersHorizontal size={14} strokeWidth={1.8} />}
                count={f.refineCount}
                open={openMenu === 'refine'}
                onClick={() =>
                  setOpenMenu((m) => (m === 'refine' ? 'none' : 'refine'))
                }
              />
              {openMenu === 'refine' && (
                <RefinePopover
                  species={f.species}
                  sizes={f.sizes}
                  ages={f.ages}
                  genders={f.genders}
                  speciesCounts={f.speciesCounts}
                  sizeCounts={f.sizeCounts}
                  ageCounts={f.ageCounts}
                  genderCounts={f.genderCounts}
                  refineCount={f.refineCount}
                  onToggleSpecies={f.toggleSpecies}
                  onToggleSize={f.toggleSize}
                  onToggleAge={f.toggleAge}
                  onToggleGender={f.toggleGender}
                  onReset={f.clearRefine}
                  onClose={closeMenu}
                  align='right'
                />
              )}
            </div>
          </div>
        </div>

        {/* Result line — sentence on its own row, controls beneath. */}
        <div className='mt-5'>
          <p className='text-14 text-(--ink-2) leading-relaxed'>
            {f.matchCount === 0 ? (
              'No shelters match these filters.'
            ) : (
              <>
                <span className='font-semibold text-(--ink) tabular-nums'>
                  {f.matchCount}
                </span>{' '}
                {f.matchCount === 1 ? 'shelter' : 'shelters'}
                {f.hideEmpty &&
                f.search.trim().length === 0 &&
                f.refineCount === 0
                  ? ' with pets ready to adopt'
                  : ' matching your search'}
                {f.province !== 'ALL' && (
                  <>
                    {' in '}
                    <span className='font-semibold text-(--ink)'>
                      {f.province}
                    </span>
                  </>
                )}
                {refineDescription && (
                  <>
                    {' with '}
                    <span className='font-semibold text-(--ink)'>
                      {refineDescription}
                    </span>
                  </>
                )}
                .
              </>
            )}
            {f.hiddenEmptyCount > 0 && (
              <>
                {' '}
                <button
                  type='button'
                  onClick={() => f.setHideEmpty(false)}
                  className='text-(--rausch) font-semibold hover:underline underline-offset-2'
                >
                  Show {f.hiddenEmptyCount} more without pets
                </button>
              </>
            )}
          </p>

          <div className='mt-3 flex items-center justify-between gap-4'>
            <label className='inline-flex items-center gap-2 cursor-pointer select-none'>
              <span className='relative inline-flex h-4 w-7 shrink-0'>
                <input
                  type='checkbox'
                  checked={f.hideEmpty}
                  onChange={(e) => f.setHideEmpty(e.target.checked)}
                  className='peer sr-only'
                  aria-label='Show only shelters with adoptable pets'
                />
                <span
                  className='absolute inset-0 rounded-full bg-(--hairline) transition-colors duration-200 peer-checked:bg-(--ink) peer-focus-visible:shadow-amber-ring'
                  aria-hidden='true'
                />
                <span
                  className='absolute top-0.5 left-0.5 h-3 w-3 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-3'
                  aria-hidden='true'
                />
              </span>
              <span className='text-13 text-(--ink-2)'>
                Only with pets
              </span>
              {inactiveCount > 0 && (
                <span className='text-12 text-(--muted-soft) tabular-nums'>
                  ({inactiveCount})
                </span>
              )}
            </label>

            {f.hasActiveFilters && (
              <button
                type='button'
                onClick={f.clearAll}
                className='text-12 font-semibold uppercase tracking-14 text-(--muted) hover:text-(--rausch) transition-colors duration-150'
              >
                Reset all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid or empty */}
      {f.matchCount === 0 ? (
        <EmptyState
          title='No shelters match these filters.'
          copy='Try widening the location, clearing a refine filter, or include shelters that are between intakes right now.'
          onClear={f.clearAll}
        />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7'>
          {f.matches.map((s) => {
            const isNew =
              now - new Date(s.createdAt).getTime() < NEW_SHELTER_MS;
            return (
              <UseCasesShelterCard
                key={s.id}
                shelter={apiShelterToCard(s)}
                availableCount={countFor(s.id)}
                speciesCounts={speciesCountsFor(s.id)}
                isNew={isNew}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
