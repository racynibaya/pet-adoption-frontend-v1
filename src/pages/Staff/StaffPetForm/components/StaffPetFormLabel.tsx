import type { ReactNode } from 'react'

interface StaffPetFormLabelProps {
  children: ReactNode
}

export default function StaffPetFormLabel({ children }: StaffPetFormLabelProps) {
  return (
    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 6, letterSpacing: '0.02em' }}>
      {children}
    </label>
  )
}
