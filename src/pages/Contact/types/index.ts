import type { ReactNode } from 'react'

export type Topic = 'adopt' | 'shelter' | 'application' | 'other'

export interface FaqItem {
  question: string
  answer: string
}

export interface OfficeItem {
  code: string
  name: string
  addr: string
}

export interface TopicButton {
  key: Topic
  label: string
  icon: ReactNode
}

export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  pet: string
  message: string
  updates: boolean
}
