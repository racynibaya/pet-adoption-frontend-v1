import type { Dispatch, FormEvent, RefObject, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import Eyebrow from '@/components/ui/Eyebrow';
import { PawDeco } from '../assets';
import { MESSAGE_MAX_LENGTH } from '../constants/donate.constants';
import { TONE_INK } from '../constants/donate.tones';
import { formatPesoCurrency } from '../utils/formatDonation';
import type {
  DonationFieldErrors,
  ImpactTier,
  ShelterChoice,
} from '../types/donate.types';

type DonationFormProps = {
  formContainerRef: RefObject<HTMLDivElement>;
  tiersContainerRef: RefObject<HTMLElement>;
  shelterTriggerRef: RefObject<HTMLButtonElement>;
  shelterSearchRef: RefObject<HTMLInputElement>;
  shelterPickerRef: RefObject<HTMLDivElement>;
  shelterListRef: RefObject<HTMLUListElement>;

  customAmount: string;
  selectedAmount: number | null;
  donorName: string;
  donorEmail: string;
  donorMessage: string;
  shelters: ShelterChoice[];
  selectedShelterId: number | null;
  selectedShelter: ShelterChoice | null;
  selectedImpactTier: ImpactTier | undefined;
  filteredShelters: ShelterChoice[];
  effectiveAmount: number;
  isAmountValid: boolean;
  formErrors: DonationFieldErrors;
  isSubmitting: boolean;
  apiError: string | null;
  submittedAmount: number | null;
  shelterQuery: string;
  isShelterPickerOpen: boolean;
  shelterPickerHighlightIndex: number;

  onOpenShelterPicker: () => void;
  onCloseShelterPicker: () => void;
  onSelectShelter: (shelterId: number) => void;
  onClearSelectedShelter: () => void;
  onShelterQueryChange: (query: string) => void;
  onShelterPickerHighlight: Dispatch<SetStateAction<number>>;
  onDonorNameChange: (name: string) => void;
  onDonorEmailChange: (email: string) => void;
  onDonorMessageChange: (message: string) => void;
  onScrollToTiers: () => void;
  onResetDonationForm: () => void;
  onSubmitDonation: (event: FormEvent<Element>) => Promise<void>;
};

export default function DonationForm({
  formContainerRef,
  tiersContainerRef: _tiersContainerRef,
  shelterTriggerRef,
  shelterSearchRef,
  shelterPickerRef,
  shelterListRef,
  customAmount,
  selectedAmount: _selectedAmount,
  donorName,
  donorEmail,
  donorMessage,
  selectedShelterId,
  selectedShelter,
  selectedImpactTier,
  filteredShelters,
  effectiveAmount,
  isAmountValid,
  formErrors,
  isSubmitting,
  apiError,
  submittedAmount,
  shelterQuery,
  isShelterPickerOpen,
  shelterPickerHighlightIndex,
  onOpenShelterPicker,
  onCloseShelterPicker,
  onSelectShelter,
  onClearSelectedShelter,
  onShelterQueryChange,
  onShelterPickerHighlight,
  onDonorNameChange,
  onDonorEmailChange,
  onDonorMessageChange,
  onScrollToTiers,
  onResetDonationForm,
  onSubmitDonation,
}: DonationFormProps) {
  const shouldShowTierDetails = selectedImpactTier && !customAmount;

  return (
    <section ref={formContainerRef} className='section-tight'>
      <div
        className='grid md:grid-cols-2 items-start donate-form-grid'
        style={{ gap: 'clamp(32px, 4vw, 56px)' }}
      >
        <aside
          className='rounded-3xl relative overflow-hidden h-full flex flex-col justify-around'
          style={{
            padding: 'clamp(32px, 4vw, 48px)',
            background:
              'linear-gradient(155deg, var(--cream) 0%, var(--rose) 100%)',
            border: '1px solid var(--hairline-soft)',
          }}
        >
          <Eyebrow>Your gift</Eyebrow>
          {shouldShowTierDetails && selectedImpactTier ? (
            <>
              <div
                className='inline-flex items-center justify-center rounded-2xl mt-4'
                style={{
                  width: 64,
                  height: 64,
                  background: 'rgba(255,255,255,0.6)',
                }}
              >
                <selectedImpactTier.Icon />
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
                {formatPesoCurrency(selectedImpactTier.amount)}
              </div>
              <div
                className='mt-2'
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: 20,
                  color: TONE_INK[selectedImpactTier.tone],
                }}
              >
                {selectedImpactTier.label}
              </div>
              <p
                className='mt-4'
                style={{
                  fontSize: 14,
                  color: 'var(--ink-2)',
                  lineHeight: 1.55,
                }}
              >
                {selectedImpactTier.detail}
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
                {isAmountValid ? formatPesoCurrency(effectiveAmount) : '₱—'}
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
                onClick={onClearSelectedShelter}
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
            onClick={onScrollToTiers}
            className='mt-5 bg-none border-0 p-0  text-(--rausch) font-semibold cursor-pointer font-[inherit] underline underline-offset-[3] text-[13px]'
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
              <li className='flex gap-2 items-start'>
                <Check size={14} strokeWidth={2.5} style={{ color: 'var(--rausch)', marginTop: 4, flexShrink: 0 }} /> A receipt in
                your inbox within minutes.
              </li>
              <li className='flex gap-2 items-start'>
                <Check size={14} strokeWidth={2.5} style={{ color: 'var(--rausch)', marginTop: 4, flexShrink: 0 }} /> A photo update
                from the pet your gift helped.
              </li>
              <li className='flex gap-2 items-start'>
                <Check size={14} strokeWidth={2.5} style={{ color: 'var(--rausch)', marginTop: 4, flexShrink: 0 }} /> Zero spam —
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

        <form
          className='bg-(--canvas) border border-(--hairline-soft) rounded-3xl'
          style={{ padding: 'clamp(32px, 4vw, 52px)' }}
          onSubmit={onSubmitDonation}
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
                {formatPesoCurrency(submittedAmount)} is on its way
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
                because of you. Thank you, {donorName.split(' ')[0] || 'friend'}
                .
              </p>
              <div className='flex gap-3 justify-center mt-12 flex-wrap'>
                <Link to='/' className='btn btn-soft'>
                  Back to home
                </Link>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={onResetDonationForm}
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
                <div className='shelter-combo' ref={shelterPickerRef}>
                  <button
                    id='shelter-trigger'
                    ref={shelterTriggerRef}
                    type='button'
                    className={`shelter-combo-trigger${isShelterPickerOpen ? ' is-open' : ''}${formErrors.shelter ? ' has-error' : ''}`}
                    onClick={() =>
                      isShelterPickerOpen
                        ? onCloseShelterPicker()
                        : onOpenShelterPicker()
                    }
                    aria-haspopup='listbox'
                    aria-expanded={isShelterPickerOpen}
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

                  {isShelterPickerOpen && (
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
                          onChange={(event) =>
                            onShelterQueryChange(event.target.value)
                          }
                          onKeyDown={(event) => {
                            if (event.key === 'ArrowDown') {
                              event.preventDefault();
                              onShelterPickerHighlight((current) =>
                                Math.min(
                                  current + 1,
                                  Math.max(0, filteredShelters.length - 1),
                                ),
                              );
                            } else if (event.key === 'ArrowUp') {
                              event.preventDefault();
                              onShelterPickerHighlight((current) =>
                                Math.max(current - 1, 0),
                              );
                            } else if (event.key === 'Enter') {
                              event.preventDefault();
                              const highlighted =
                                filteredShelters[shelterPickerHighlightIndex];
                              if (highlighted) onSelectShelter(highlighted.id);
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
                          ref={shelterListRef}
                          className='shelter-combo-panel-list'
                          role='listbox'
                          aria-label='Shelters'
                        >
                          {filteredShelters.map((shelter, index) => {
                            const isSelected = shelter.id === selectedShelterId;
                            const isHighlighted =
                              index === shelterPickerHighlightIndex;
                            return (
                              <li
                                key={shelter.id}
                                data-idx={index}
                                role='option'
                                aria-selected={isSelected}
                                className={`shelter-combo-panel-row${isHighlighted ? ' is-active' : ''}${isSelected ? ' is-selected' : ''}`}
                                onMouseEnter={() =>
                                  onShelterPickerHighlight(index)
                                }
                                onMouseDown={(event) => {
                                  event.preventDefault();
                                  onSelectShelter(shelter.id);
                                }}
                              >
                                <span className='shelter-combo-panel-name'>
                                  {shelter.name}
                                </span>
                                <span className='shelter-combo-panel-city'>
                                  {shelter.city}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
                {formErrors.shelter && (
                  <p
                    role='alert'
                    style={{ fontSize: 13, color: '#c0304d', marginTop: 6 }}
                  >
                    {formErrors.shelter}
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
                    value={donorName}
                    onChange={(event) => onDonorNameChange(event.target.value)}
                  />
                  {formErrors.name && (
                    <p
                      role='alert'
                      style={{
                        fontSize: 13,
                        color: '#c0304d',
                        marginTop: 6,
                      }}
                    >
                      {formErrors.name}
                    </p>
                  )}
                </div>
                <div className='field'>
                  <label htmlFor='donor-email'>Email for receipt</label>
                  <input
                    id='donor-email'
                    type='email'
                    placeholder='you@example.com'
                    value={donorEmail}
                    onChange={(event) => onDonorEmailChange(event.target.value)}
                  />
                  {formErrors.email && (
                    <p
                      role='alert'
                      style={{
                        fontSize: 13,
                        color: '#c0304d',
                        marginTop: 6,
                      }}
                    >
                      {formErrors.email}
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
                  maxLength={MESSAGE_MAX_LENGTH}
                  value={donorMessage}
                  onChange={(event) => onDonorMessageChange(event.target.value)}
                />
                <div
                  style={{
                    fontSize: 12,
                    color: 'var(--muted)',
                    marginTop: 4,
                    textAlign: 'right',
                  }}
                >
                  {donorMessage.length}/{MESSAGE_MAX_LENGTH}
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
                disabled={isSubmitting}
                style={{ width: '100%', marginTop: 12 }}
              >
                {isSubmitting ? (
                  <>Sending your gift…</>
                ) : (
                  <>
                    Send
                    {isAmountValid
                      ? ` ${formatPesoCurrency(effectiveAmount)}`
                      : ''}{' '}
                    with love
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
  );
}
