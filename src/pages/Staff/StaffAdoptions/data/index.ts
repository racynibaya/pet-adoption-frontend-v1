import type { AdoptionRequest } from '@/context/useStaff'
import type { StatusFilter, StatusMetaEntry } from '../types'

export const FILTERS: StatusFilter[] = ['All', 'PENDING', 'REVIEWING', 'APPROVED', 'REJECTED', 'CANCELLED']

export const STATUS_META: Record<AdoptionRequest['status'], StatusMetaEntry> = {
  PENDING:   { cls: 's-badge-pending',   label: '◌ Pending' },
  REVIEWING: { cls: 's-badge-pending',   label: '⏳ Reviewing' },
  APPROVED:  { cls: 's-badge-approved',  label: '✓ Approved' },
  REJECTED:  { cls: 's-badge-rejected',  label: '✕ Rejected' },
  CANCELLED: { cls: 's-badge-rejected',  label: '— Cancelled' },
}

export const STAT_STATUSES: AdoptionRequest['status'][] = ['PENDING', 'REVIEWING', 'APPROVED', 'REJECTED', 'CANCELLED']
