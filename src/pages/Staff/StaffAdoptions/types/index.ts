import type { AdoptionRequest } from '@/context/useStaff'

export type StatusFilter = 'All' | AdoptionRequest['status']

export interface StatusMetaEntry {
  cls: string
  label: string
  plain: string
  pillVariant: string
}
