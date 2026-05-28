import type { ChangeEvent, ReactNode } from 'react'
import { BASE_INPUT_STYLE } from '../constants/staffPetForm.constants'

interface StaffPetFormSelectProps {
  value: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  children: ReactNode
}

export default function StaffPetFormSelect({ value, onChange, children }: StaffPetFormSelectProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      style={{
        ...BASE_INPUT_STYLE,
        cursor: 'pointer',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M6 9l6 6 6-6' stroke='%236C8080' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 14px center',
        paddingRight: 36,
      }}
      onFocus={(e) => { e.currentTarget.style.borderColor = '#E8923C' }}
      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(28, 44, 44, 0.13)' }}
    >
      {children}
    </select>
  )
}
