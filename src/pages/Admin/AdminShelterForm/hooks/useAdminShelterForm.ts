import { useEffect, useState, useRef, type FormEvent, type ChangeEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShelters } from '@/context/useShelters'
import { useStaffAuth } from '@/context/useStaffAuth'
import { ApiError } from '@/services/api'
import type { FormState, FormFieldErrors } from '../types'
import {
  EMPTY_FORM,
  MAX_IMAGE_BYTES,
  NAME_MIN_LENGTH,
  EMAIL_REGEX,
} from '../constants/adminShelterForm.constants'

export function useAdminShelterForm() {
  const { id } = useParams<{ id: string }>()
  const isEdit = id != null
  const { shelters, sheltersLoaded, addShelter, updateShelter } = useShelters()
  const { staffUser } = useStaffAuth()
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)

  const existing = isEdit
    ? shelters.find((s) => s.id === Number(id))
    : null

  const accessDenied = staffUser?.role !== 'ADMIN'
  const notFound = isEdit && sheltersLoaded && !existing

  const [form, setForm] = useState<FormState>(() =>
    existing
      ? {
          name: existing.name,
          description: existing.description,
          addressLine: existing.addressLine,
          city: existing.city,
          province: existing.province,
          region: existing.region,
          contactEmail: existing.contactEmail,
          phoneNumber: existing.phoneNumber,
        }
      : { ...EMPTY_FORM },
  )

  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(
    existing?.imageUrl ?? null,
  )
  const [errors, setErrors] = useState<FormFieldErrors>({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > MAX_IMAGE_BYTES) {
      setErrors((prev) => ({ ...prev, image: 'Image must be 5 MB or smaller' }))
      e.target.value = ''
      return
    }
    setImage(file)
    setImagePreview((prev) => {
      if (prev?.startsWith('blob:')) URL.revokeObjectURL(prev)
      return URL.createObjectURL(file)
    })
    setErrors((prev) => ({ ...prev, image: undefined }))
    e.target.value = ''
  }

  function removeImage() {
    setImage(null)
    setImagePreview((prev) => {
      if (prev?.startsWith('blob:')) URL.revokeObjectURL(prev)
      return null
    })
  }

  // Revoke any remaining blob URL on unmount. Remote URLs (existing.imageUrl)
  // are left untouched.
  const previewRef = useRef(imagePreview)
  useEffect(() => {
    previewRef.current = imagePreview
  }, [imagePreview])
  useEffect(() => {
    return () => {
      const url = previewRef.current
      if (url?.startsWith('blob:')) URL.revokeObjectURL(url)
    }
  }, [])

  function validate(): boolean {
    const errs: FormFieldErrors = {}
    const name = form.name.trim()
    if (!name) errs.name = 'Required'
    else if (name.length < NAME_MIN_LENGTH)
      errs.name = `Must be at least ${NAME_MIN_LENGTH} characters`
    if (!form.description.trim()) errs.description = 'Required'
    if (!form.addressLine.trim()) errs.addressLine = 'Required'
    if (!form.city.trim()) errs.city = 'Required'
    if (!form.province.trim()) errs.province = 'Required'
    if (!form.region) errs.region = 'Required'
    const email = form.contactEmail.trim()
    if (!email) errs.contactEmail = 'Required'
    else if (!EMAIL_REGEX.test(email))
      errs.contactEmail = 'Enter a valid email address'
    if (!form.phoneNumber.trim()) errs.phoneNumber = 'Required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function applyConflictError(message: string) {
    const lower = message.toLowerCase()
    if (lower.includes('address')) {
      setErrors((prev) => ({ ...prev, addressLine: message }))
    } else if (lower.includes('email')) {
      setErrors((prev) => ({ ...prev, contactEmail: message }))
    } else {
      setApiError(message)
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setApiError('')
    setLoading(true)

    const fd = new FormData()
    fd.append('name', form.name.trim())
    fd.append('description', form.description.trim())
    fd.append('addressLine', form.addressLine.trim())
    fd.append('city', form.city.trim())
    fd.append('province', form.province.trim())
    fd.append('region', form.region)
    fd.append('contactEmail', form.contactEmail.trim())
    fd.append('phoneNumber', form.phoneNumber.trim())
    if (image) fd.append('image', image)

    try {
      if (isEdit && existing) {
        await updateShelter(existing.id, fd)
      } else {
        await addShelter(fd)
      }
      setSaved(true)
      setTimeout(() => navigate('/admin/shelters'), 800)
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        applyConflictError(err.message)
      } else {
        setApiError(
          err instanceof ApiError ? err.message : 'An unexpected error occurred.',
        )
      }
      setLoading(false)
    }
  }

  return {
    isEdit,
    existing,
    accessDenied,
    notFound,
    form,
    set,
    fileRef,
    image,
    imagePreview,
    handleFileChange,
    removeImage,
    errors,
    apiError,
    loading,
    saved,
    handleSubmit,
  }
}
