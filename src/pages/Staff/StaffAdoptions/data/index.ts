import type { AdoptionRequest } from '@/context/useAdoptions'
import type { StatusFilter, StatusMetaEntry } from '../types'

export const FILTERS: StatusFilter[] = ['All', 'PENDING', 'REVIEWING', 'APPROVED', 'REJECTED', 'CANCELLED']

export const STATUS_META: Record<AdoptionRequest['status'], StatusMetaEntry> = {
  PENDING:   { cls: 's-badge-pending',   label: '◌ Pending',    plain: 'Pending',   pillVariant: 'is-pending' },
  REVIEWING: { cls: 's-badge-pending',   label: '⏳ Reviewing',  plain: 'Reviewing', pillVariant: 'is-reviewing' },
  APPROVED:  { cls: 's-badge-approved',  label: '✓ Approved',   plain: 'Approved',  pillVariant: 'is-approved' },
  REJECTED:  { cls: 's-badge-rejected',  label: '✕ Rejected',   plain: 'Rejected',  pillVariant: 'is-rejected' },
  CANCELLED: { cls: 's-badge-rejected',  label: '— Cancelled',  plain: 'Cancelled', pillVariant: 'is-cancelled' },
}

export const STAT_STATUSES: AdoptionRequest['status'][] = ['PENDING', 'REVIEWING', 'APPROVED', 'REJECTED', 'CANCELLED']
