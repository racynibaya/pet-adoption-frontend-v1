import type { PetCard } from '@/data/pets';
import PetDetailStatusBadge from './PetDetailStatusBadge';
import PetDetailHeartButton from './PetDetailHeartButton';

interface PetDetailGalleryProps {
  pet: PetCard;
  images: string[];
  activeImage: string | undefined;
  selectedImageIdx: number;
  onSelectImage: (idx: number) => void;
  saved: boolean;
  onToggleSave: () => void;
}

export default function PetDetailGallery({
  pet,
  images,
  activeImage,
  selectedImageIdx,
  onSelectImage,
  saved,
  onToggleSave,
}: PetDetailGalleryProps) {
  return (
    <div className='r-sticky-md'>
      <div
        style={{
          borderRadius: 28,
          overflow: 'hidden',
          border: '1.5px solid var(--hairline-soft)',
          boxShadow:
            '0 8px 48px rgba(28,44,44,0.10), 0 2px 12px rgba(28,44,44,0.06)',
        }}
      >
        <div
          style={{
            background: pet.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            aspectRatio: '1 / 1',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {activeImage ? (
            <img
              src={activeImage}
              alt={pet.name}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 1,
              }}
            />
          ) : (
            <>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.55) 0%, transparent 60%),
                               radial-gradient(circle at 80% 80%, rgba(0,0,0,0.04) 0%, transparent 50%)`,
                }}
              />
              <div
                style={{
                  transform: 'scale(2.2)',
                  transition: 'transform 400ms cubic-bezier(0.34,1.56,0.64,1)',
                  position: 'relative',
                  zIndex: 1,
                }}
                className='pet-detail-svg'
              >
                {pet.svg}
              </div>
            </>
          )}

          <PetDetailStatusBadge status={pet.status} />
          <PetDetailHeartButton saved={saved} onToggle={onToggleSave} />
        </div>

        <div
          style={{
            padding: '16px 22px 18px',
            background: 'var(--canvas)',
            borderTop: '1.5px solid var(--hairline-soft)',
            minWidth: 0,
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: 'var(--muted)',
              textTransform: 'uppercase',
              marginBottom: 6,
            }}
          >
            {pet.shelterName ? pet.shelterName : 'Shelter'}
          </p>
          <p
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: 'var(--ink)',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {pet.shelterName}
          </p>
          <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
            {pet.shelterCity}
          </p>
        </div>
      </div>

      {images.length > 1 && (
        <div
          role='tablist'
          aria-label={`${pet.name} photos`}
          style={{
            display: 'flex',
            gap: 10,
            marginTop: 16,
            overflowX: 'auto',
            paddingBottom: 4,
          }}
        >
          {images.map((url, idx) => {
            const isActive = idx === selectedImageIdx;
            return (
              <button
                key={url + idx}
                role='tab'
                aria-selected={isActive}
                aria-label={`View photo ${idx + 1}`}
                onClick={() => onSelectImage(idx)}
                style={{
                  flexShrink: 0,
                  width: 68,
                  height: 68,
                  borderRadius: 12,
                  overflow: 'hidden',
                  padding: 0,
                  cursor: 'pointer',
                  background: pet.bg,
                  border: `2px solid ${isActive ? 'var(--rausch)' : 'transparent'}`,
                  outline: isActive ? 'none' : '1px solid var(--hairline-soft)',
                  outlineOffset: '-1px',
                  boxShadow: isActive
                    ? '0 6px 18px rgba(232,146,60,0.22)'
                    : 'none',
                  opacity: isActive ? 1 : 0.62,
                  transition:
                    'opacity 180ms ease, transform 180ms cubic-bezier(0.34,1.56,0.64,1), border-color 180ms ease, box-shadow 180ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = isActive ? '1' : '0.62';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <img
                  src={url}
                  alt=''
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
