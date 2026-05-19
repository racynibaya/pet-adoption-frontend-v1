import { useState, type FormEvent } from 'react'
import type { Topic, ContactFormData } from '../types'

const INITIAL_FORM: ContactFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  city: 'San Agustin HQ, PH',
  pet: 'Dog',
  message: '',
  updates: true,
}

export function useContactForm() {
  const [activeTopic, setActiveTopic] = useState<Topic>('adopt')
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM)

  function update<K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) {
    setFormData((d) => ({ ...d, [key]: value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return {
    activeTopic,
    setActiveTopic,
    submitted,
    formData,
    update,
    handleSubmit,
  }
}
