import type { ChangeEvent } from 'react'
import { BASE_INPUT_STYLE } from '../constants/staffPetForm.constants'

interface StaffPetFormTextInputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  required?: boolean
}

export default function StaffPetFormTextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: StaffPetFormTextInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      style={BASE_INPUT_STYLE}
      onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--rausch)' }}
      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(28, 44, 44, 0.13)' }}
    />
  )
}
