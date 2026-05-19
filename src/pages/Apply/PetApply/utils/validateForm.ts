import type { FormState, FormFieldErrors } from '../types'

export function validateForm(form: FormState): FormFieldErrors {
  const errs: FormFieldErrors = {}

  if (!form.homeType) errs.homeType = 'Pick one'
  if (form.hasYard === null) errs.hasYard = 'Required'
  if (form.hasYard === true && form.yardFenced === null) errs.yardFenced = 'Required'
  if (form.ownsHome === null) errs.ownsHome = 'Required'
  if (form.ownsHome === false && form.landlordAllowsPets === null)
    errs.landlordAllowsPets = 'Required'

  const hh = Number(form.householdSize)
  if (!form.householdSize || !Number.isInteger(hh) || hh < 1 || hh > 50)
    errs.householdSize = 'Whole number, 1–50'

  if (form.hasChildren === null) errs.hasChildren = 'Required'
  if (form.hasPreviousPetExperience === null)
    errs.hasPreviousPetExperience = 'Required'
  if (form.hasPreviousPetExperience === true) {
    const yrs = Number(form.yearsOfPetExperience)
    if (
      form.yearsOfPetExperience === '' ||
      !Number.isInteger(yrs) ||
      yrs < 0 ||
      yrs > 100
    )
      errs.yearsOfPetExperience = 'Whole number, 0–100'
  }

  const hrs = Number(form.hoursAwayPerDay)
  if (
    form.hoursAwayPerDay === '' ||
    !Number.isInteger(hrs) ||
    hrs < 0 ||
    hrs > 24
  )
    errs.hoursAwayPerDay = 'Whole number, 0–24'

  if (form.hasOtherPetsNow === null) errs.hasOtherPetsNow = 'Required'

  const reason = form.reasonForAdopting.trim()
  if (reason.length < 10 || reason.length > 1000)
    errs.reasonForAdopting = 'Between 10 and 1000 characters'

  if (form.hasBackupCarePlan === null) errs.hasBackupCarePlan = 'Required'
  if (form.awareOfMonthlyCosts === null) errs.awareOfMonthlyCosts = 'Required'

  if (form.message.trim().length > 1000)
    errs.message = 'Maximum 1000 characters'

  return errs
}
