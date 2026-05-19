import { useState, useRef, type FormEvent, type ChangeEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStaff, canManagePet } from '@/context/useStaff'
import { ApiError } from '@/services/api'
import type { FormState, FormFieldErrors } from '../types'
import { EMPTY_FORM, MAX_IMAGE_BYTES } from '../constants/staffPetForm.constants'

export function useStaffPetForm() {
  const { id } = useParams<{ id: string }>()
  const isEdit = id != null
  const { pets, staffUser, addPet, updatePet } = useStaff()
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)

  const existing = isEdit ? pets.find((p) => p.id === Number(id)) : null
  const accessDenied = isEdit && existing != null && !canManagePet(staffUser, existing)

  const [form, setForm] = useState<FormState>(() =>
    existing
      ? {
          name: existing.name,
          species: existing.species,
          breed: existing.breed,
          ageMonths: String(existing.ageMonths),
          gender: existing.gender,
          size: existing.size,
          status: existing.status,
          shelterId: String(existing.shelterId),
          description: existing.description,
        }
      : EMPTY_FORM,
  )

  const [images, setImages] = useState<File[]>([])
  const [imagePreview, setImagePreview] = useState<string[]>([])
  const [errors, setErrors] = useState<FormFieldErrors>({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    const valid = files.filter((f) => f.size <= MAX_IMAGE_BYTES)
    setImages(valid)
    setImagePreview(valid.map((f) => URL.createObjectURL(f)))
  }

  function removeImage(i: number) {
    setImages((prev) => prev.filter((_, idx) => idx !== i))
    setImagePreview((prev) => prev.filter((_, idx) => idx !== i))
  }

  function validate(): boolean {
    const errs: FormFieldErrors = {}
    if (!form.name.trim()) errs.name = 'Required'
    if (!form.breed.trim()) errs.breed = 'Required'
    const age = Number(form.ageMonths)
    if (!form.ageMonths || isNaN(age) || age < 0 || age > 600) errs.ageMonths = 'Enter a valid age (0–600 months)'
    if (!form.shelterId || isNaN(Number(form.shelterId))) errs.shelterId = 'Enter a valid shelter ID'
    if (!form.description.trim()) errs.description = 'Required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setApiError('')
    setLoading(true)

    try {
      if (isEdit && existing) {
        updatePet(existing.id, {
          name: form.name.trim(),
          species: form.species,
          breed: form.breed.trim(),
          ageMonths: Number(form.ageMonths),
          gender: form.gender,
          size: form.size,
          status: form.status,
          shelterId: Number(form.shelterId),
          description: form.description.trim(),
        })
      } else {
        const fd = new FormData()
        fd.append('name', form.name.trim())
        fd.append('species', form.species)
        fd.append('breed', form.breed.trim())
        fd.append('ageMonths', form.ageMonths)
        fd.append('gender', form.gender)
        fd.append('size', form.size)
        fd.append('status', form.status)
        fd.append('shelterId', form.shelterId)
        fd.append('description', form.description.trim())
        images.forEach((f) => fd.append('images', f))
        await addPet(fd)
      }

      setSaved(true)
      setTimeout(() => navigate('/staff/pets'), 800)
    } catch (err) {
      setApiError(err instanceof ApiError ? err.message : 'An unexpected error occurred.')
      setLoading(false)
    }
  }

  return {
    isEdit,
    existing,
    accessDenied,
    form,
    set,
    images: imagePreview,
    fileRef,
    handleFileChange,
    removeImage,
    errors,
    apiError,
    loading,
    saved,
    handleSubmit,
  }
}
