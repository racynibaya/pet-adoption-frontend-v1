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
            background: 'linear-gradient(135deg, #E8923C44, #E8923C22)',
            border: '1.5px solid #E8923C44',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#a05818', fontWeight: 700, fontSize: 12.5, flexShrink: 0,
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
            }}>
              <div style={{ transform: 'scale(0.18)', transformOrigin: 'center', width: 200, height: 160, flexShrink: 0 }}>
                {pet.svg}
              </div>
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
        <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          {(a.status === 'PENDING' || a.status === 'REVIEWING') && (
            <>
              {a.status === 'PENDING' && (
                <button onClick={() => onUpdate(a.id, 'REVIEWING')} className="staff-action-btn staff-btn-edit">
                  ⏳ Review
                </button>
              )}
              <button onClick={() => onUpdate(a.id, 'APPROVED')} className="staff-action-btn staff-btn-approve">
                <CheckIcon />
                Approve
              </button>
              <button onClick={() => onUpdate(a.id, 'REJECTED')} className="staff-action-btn staff-btn-reject">
                <XIcon />
                Reject
              </button>
            </>
          )}
          {(a.status === 'APPROVED' || a.status === 'REJECTED' || a.status === 'CANCELLED') && (
            <button
              onClick={() => onUpdate(a.id, 'PENDING')}
              style={{
                padding: '6px 12px', borderRadius: 8,
                border: '1.5px solid var(--hairline)',
                background: 'white', color: 'var(--muted)',
                cursor: 'pointer', fontSize: 12,
                fontFamily: 'var(--font-body)',
                transition: 'border-color 0.13s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--ink)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--hairline)' }}
            >
              Reopen
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}
