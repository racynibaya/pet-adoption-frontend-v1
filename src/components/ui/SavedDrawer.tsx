import { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useFavorites } from '@/context/FavoritesContext';
import { PET_LISTINGS, ageLabel } from '@/data/pets';
import HeartIcon from '@/icons/HeartIcon';

export default function SavedDrawer() {
  const { saved, toggle, drawerOpen, closeDrawer } = useFavorites();
  const savedPets = PET_LISTINGS.filter(p => saved.includes(String(p.id)));

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') closeDrawer();
  }, [closeDrawer]);

  useEffect(() => {
    if (!drawerOpen) return;
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [drawerOpen, handleKey]);

  if (!drawerOpen) return null;

  return ReactDOM.createPortal(
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 z-[150]'
        style={{
          background: 'rgba(20,36,22,0.46)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          animation: 'fadeIn 260ms cubic-bezier(0.16, 1, 0.3, 1) both',
        }}
        onClick={closeDrawer}
        aria-hidden='true'
      />

      {/* Panel */}
      <aside
        className='fixed top-0 right-0 bottom-0 z-[151] w-[400px] max-w-[92vw] max-[480px]:w-full max-[480px]:max-w-full bg-(--canvas) flex flex-col'
        style={{
          boxShadow: '-8px 0 48px rgba(18,52,64,0.16)',
          animation: 'slideIn 320ms cubic-bezier(0.16, 1, 0.3, 1) both',
        }}
        role='dialog'
        aria-modal='true'
        aria-label='Saved pets'
      >
        {/* Header */}
        <div className='flex items-center justify-between px-6 py-5 border-b border-(--hairline-soft) shrink-0'>
          <div className='flex items-center gap-[10px]'>
            <HeartIcon width={18} height={18} filled={saved.length > 0} />
            <h2
              className='text-[20px] font-bold text-(--ink) tracking-[-0.012em] m-0'
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Saved Pets
            </h2>
            {saved.length > 0 && (
              <span className='inline-flex items-center justify-center min-w-[22px] h-[22px] rounded-full bg-[var(--rausch)] text-white text-[11px] font-bold px-[6px]'>
                {saved.length}
              </span>
            )}
          </div>
          <button
            className='w-8 h-8 rounded-full border-0 bg-(--soft) text-(--muted) flex items-center justify-center cursor-pointer transition-[background,color,transform] duration-120 ease-out hover:bg-(--hairline) hover:text-(--ink) hover:scale-[1.1] hover:rotate-90 active:scale-[0.92]'
            onClick={closeDrawer}
            aria-label='Close saved pets'
          >
            <svg width='12' height='12' viewBox='0 0 12 12' fill='none'>
              <path d='M1 1L11 11M11 1L1 11' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
            </svg>
          </button>
        </div>

        {/* List or empty state */}
        {savedPets.length > 0 ? (
          <div className='drawer-list flex-1 overflow-y-auto p-3 flex flex-col gap-[10px]'>
            {savedPets.map(pet => (
              <div
                key={pet.id}
                className='flex gap-[14px] items-center px-[14px] py-3 rounded-[14px] border border-(--hairline-soft) bg-(--canvas) transition-[box-shadow,transform] duration-200 ease-out hover:shadow-(--shadow-soft) hover:-translate-y-px'
              >
                <Link
                  to={`/pets/${pet.id}`}
                  onClick={closeDrawer}
                  className='w-16 h-16 rounded-xl overflow-hidden shrink-0 flex items-center justify-center'
                  style={{ background: pet.bg }}
                  aria-label={`View details for ${pet.name}`}
                >
                  {pet.svg}
                </Link>

                <Link
                  to={`/pets/${pet.id}`}
                  onClick={closeDrawer}
                  className='flex-1 min-w-0'
                  style={{ textDecoration: 'none' }}
                >
                  <h4 className='text-[15px] font-semibold text-(--ink) whitespace-nowrap overflow-hidden text-ellipsis'>
                    {pet.name}
                  </h4>
                  <p className='text-[12px] text-(--muted) mt-0.75 whitespace-nowrap overflow-hidden text-ellipsis'>
                    {pet.breed} · {pet.gender} · {ageLabel(pet.ageMonths)}
                  </p>
                  <p className='text-[11px] text-(--muted-soft) mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis'>
                    <span
                      className='inline-block w-1.5 h-1.5 rounded-full mr-1.25 align-middle'
                      style={{ background: pet.status === 'AVAILABLE' ? '#1D7575' : '#a87d12' }}
                    />
                    {pet.shelterName}
                  </p>
                </Link>

                <button
                  className='w-7.5 h-7.5 rounded-full border-0 bg-transparent text-(--muted) flex items-center justify-center cursor-pointer shrink-0 transition-[background,color,transform] duration-120 ease-out hover:bg-[#fff0f2] hover:text-[#e0465a] hover:scale-[1.14] active:scale-[0.88]'
                  onClick={() => toggle(String(pet.id))}
                  aria-label={`Remove ${pet.name} from saved`}
                >
                  <HeartIcon width={15} height={15} filled />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex-1 flex flex-col items-center justify-center text-center px-8 py-12 gap-3'>
            <div className='w-14 h-14 rounded-full bg-(--soft) flex items-center justify-center text-(--muted)'>
              <HeartIcon width={24} height={24} />
            </div>
            <h3 className='text-[17px] text-(--ink)'>No saved pets yet</h3>
            <p className='text-[14px] text-(--muted) leading-[1.55] max-w-65'>
              Heart a pet on the Browse page to save them here for later.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className='px-5 py-4 border-t border-(--hairline-soft) shrink-0'>
          <Link
            to='/pets'
            className='btn btn-primary'
            style={{ width: '100%' }}
            onClick={closeDrawer}
          >
            Browse all pets →
          </Link>
        </div>
      </aside>
    </>,
    document.body
  );
}
