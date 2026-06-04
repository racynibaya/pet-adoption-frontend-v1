import { useEffect, useState, useRef, type FormEvent, type ChangeEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePets } from '@/context/usePets'
import { useShelters } from '@/context/useShelters'
import { useStaffAuth } from '@/context/useStaffAuth'
import { ApiError } from '@/services/api'
import type {
  FormState,
  FormFieldErrors,
} from '@/pages/Staff/StaffPetForm/types'
import {
  EMPTY_FORM,
  MAX_IMAGE_BYTES,
  MAX_IMAGES,
} from '@/pages/Staff/StaffPetForm/constants/staffPetForm.constants'

/**
 * Admin variant of the pet add/edit form hook.
 *
 * Differs from `useStaffPetForm` in two places only:
 *  1. Post-save redirect goes to `/admin/pets` (not `/staff/pets`).
 *  2. Shelter validation always runs — admins must pick a shelter from the
 *     dropdown since they don't have an implicit shelter scope like STAFF do.
 *  3. Access is gated on ADMIN role only.
 */
export function useAdminPetForm() {
  const { id } = useParams<{ id: string }>()
  const isEdit = id != null
  const { pets, addPet, updatePet } = usePets()
  const { shelters } = useShelters()
  const { staffUser } = useStaffAuth()
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)

  const existing = isEdit ? pets.find((p) => p.id === Number(id)) : null
  const accessDenied = staffUser?.role !== 'ADMIN'

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
      : {
          ...EMPTY_FORM,
          shelterId: shelters.length > 0 ? String(shelters[0]!.id) : '',
        },
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
    if (valid.length === 0) return
    setImages((prev) => [...prev, ...valid].slice(0, MAX_IMAGES))
    setImagePreview((prev) =>
      [...prev, ...valid.map((f) => URL.createObjectURL(f))].slice(0, MAX_IMAGES),
    )
    e.target.value = ''
  }

  function removeImage(i: number) {
    setImages((prev) => prev.filter((_, idx) => idx !== i))
    setImagePreview((prev) => {
      const url = prev[i]
      if (url) URL.revokeObjectURL(url)
      return prev.filter((_, idx) => idx !== i)
    })
  }

  // Revoke any remaining object URLs on unmount so blob refs aren't leaked.
  const previewsRef = useRef(imagePreview)
  useEffect(() => {
    previewsRef.current = imagePreview
  }, [imagePreview])
  useEffect(() => {
    return () => {
      previewsRef.current.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  function validate(): boolean {
    const errs: FormFieldErrors = {}
    if (!form.name.trim()) errs.name = 'Required'
    if (!form.breed.trim()) errs.breed = 'Required'
    const age = Number(form.ageMonths)
    if (!form.ageMonths || isNaN(age) || age < 0 || age > 600)
      errs.ageMonths = 'Enter a valid age (0–600 months)'
    if (!form.shelterId || isNaN(Number(form.shelterId)))
      errs.shelterId = 'Pick a shelter'
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
      setTimeout(() => navigate('/admin/pets'), 800)
    } catch (err) {
      setApiError(
        err instanceof ApiError ? err.message : 'An unexpected error occurred.',
      )
      setLoading(false)
    }
  }

  return {
    isEdit,
    existing,
    accessDenied,
    shelters,
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
