import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { speciesLabel, genderLabel } from '@/data/pets'

interface PetApplyPetSidebarProps {
  pet: {
    id: number
    name: string
    breed: string
    species: 'DOG' | 'CAT' | 'RABBIT' | 'BIRD' | 'OTHER'
    gender: 'MALE' | 'FEMALE'
    bg: string
    svg: ReactNode
    imageUrls?: string[]
    imageUrl?: string
    shelterName?: string
    shelterCity?: string
  }
}

export default function PetApplyPetSidebar({ pet }: PetApplyPetSidebarProps) {
  const primaryImage = pet.imageUrls?.[0] ?? pet.imageUrl
  return (
    <aside
      className='petapply-sidebar'
      style={{ position: 'sticky', top: 96, alignSelf: 'start' }}
    >
      <div
        style={{
          borderRadius: 22,
          overflow: 'hidden',
          border: '1.5px solid var(--hairline-soft)',
          background: 'white',
          boxShadow: '0 12px 36px -16px rgba(28,44,44,0.16)',
        }}
      >
        <div
          className='petapply-sidebar-image'
          style={{
            aspectRatio: '1 / 1',
            background: pet.bg,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {primaryImage ? (
            <img
              src={primaryImage}
              alt={pet.name}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ transform: 'scale(2)' }}>{pet.svg}</div>
            </div>
          )}
          <span
            aria-hidden
            style={{
              position: 'absolute',
              top: 14,
              left: 14,
              padding: '5px 11px',
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(6px)',
              borderRadius: 999,
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--ink-2)',
            }}
          >
            Applying to adopt
          </span>
        </div>
        <div style={{ padding: '22px 22px 24px' }}>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 28,
              fontWeight: 700,
              color: 'var(--ink)',
              margin: 0,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {pet.name}
          </h3>
          <p style={{ fontSize: 13.5, color: 'var(--muted)', margin: '6px 0 0', lineHeight: 1.5 }}>
            {pet.breed} · {speciesLabel(pet.species)} · {genderLabel(pet.gender)}
          </p>
          {pet.shelterName && (
            <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid var(--hairline-soft)' }}>
              <p
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  margin: 0,
                }}
              >
                In the care of
              </p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--ink)',
                  margin: '4px 0 0',
                  lineHeight: 1.4,
                }}
              >
                {pet.shelterName}
              </p>
              {pet.shelterCity && (
                <p style={{ fontSize: 12.5, color: 'var(--muted)', margin: '2px 0 0' }}>
                  {pet.shelterCity}
                </p>
              )}
            </div>
          )}
          <Link
            to={`/pets/${pet.id}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              marginTop: 20,
              fontSize: 13,
              color: 'var(--muted)',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'color 150ms var(--ease-out)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#E8923C')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            <ArrowLeft size={13} /> Back to {pet.name}'s page
          </Link>
        </div>
      </div>
    </aside>
  )
}
