import type { AdoptionRequest } from '@/context/useStaff'
import type { PetCard } from '@/data/pets'
import StaffAdoptionsBadge from './StaffAdoptionsBadge'
import { CheckIcon, XIcon } from '../assets'

interface StaffAdoptionsRowProps {
  adoption: AdoptionRequest
  pet: PetCard | undefined
  onUpdate: (id: number, status: AdoptionRequest['status']) => void
}

export default function StaffAdoptionsRow({ adoption: a, pet, onUpdate }: StaffAdoptionsRowProps) {
  return (
    <tr>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'conic-gradient(from 200deg at 50% 50%, #e8923c, #d94f68, #1d7575, #e8923c)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: 12.5, flexShrink: 0,
            fontFamily: 'var(--font-display)',
          }}>
            {a.applicantName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13.5 }}>{a.applicantName}</div>
          </div>
        </div>
      </td>

      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {pet && (
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: pet.bg, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
              border: '1px solid rgba(28, 44, 44, 0.08)',
            }}>
              {pet.imageUrl ? (
                <img
                  src={pet.imageUrl}
                  alt={pet.name}
                  loading='lazy'
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ transform: 'scale(0.18)', transformOrigin: 'center', width: 200, height: 160, flexShrink: 0 }}>
                  {pet.svg}
                </div>
              )}
            </div>
          )}
          <div>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{a.petName}</div>
            {pet && <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>{pet.breed}</div>}
          </div>
        </div>
      </td>

      <td>
        <div style={{ fontSize: 13 }}>{a.email}</div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 1 }}>{a.phone}</div>
      </td>

      <td style={{ fontSize: 12.5, color: 'var(--muted)', whiteSpace: 'nowrap' }}>
        {new Date(a.submittedAt).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })}
      </td>

      <td><StaffAdoptionsBadge status={a.status} /></td>

      <td>
        <div className='staff-row-actions'>
          {(a.status === 'PENDING' || a.status === 'REVIEWING') && (
            <>
              {a.status === 'PENDING' && (
                <button
                  type='button'
                  onClick={() => onUpdate(a.id, 'REVIEWING')}
                  className='staff-row-btn ghost'
                >
                  Review
                </button>
              )}
              <button
                type='button'
                onClick={() => onUpdate(a.id, 'APPROVED')}
                className='staff-row-btn approve'
              >
                <CheckIcon />
                Approve
              </button>
              <button
                type='button'
                onClick={() => onUpdate(a.id, 'REJECTED')}
                className='staff-row-btn reject'
              >
                <XIcon />
                Reject
              </button>
            </>
          )}
          {(a.status === 'APPROVED' || a.status === 'REJECTED' || a.status === 'CANCELLED') && (
            <button
              type='button'
              onClick={() => onUpdate(a.id, 'PENDING')}
              className='staff-row-btn ghost'
            >
              Reopen
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}
