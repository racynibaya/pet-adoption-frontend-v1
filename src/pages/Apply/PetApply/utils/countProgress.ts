import type { FormState } from '../types'

export function countProgress(form: FormState): { answered: number; total: number } {
  const items: boolean[] = []

  items.push(!!form.homeType)
  items.push(form.hasYard !== null)
  items.push(form.ownsHome !== null)
  items.push(form.householdSize !== '' && Number(form.householdSize) >= 1)
  items.push(form.hasChildren !== null)
  items.push(form.hasPreviousPetExperience !== null)
  items.push(form.hoursAwayPerDay !== '' && Number(form.hoursAwayPerDay) >= 0)
  items.push(form.hasOtherPetsNow !== null)
  items.push(form.reasonForAdopting.trim().length >= 10)
  items.push(form.hasBackupCarePlan !== null)
  items.push(form.awareOfMonthlyCosts !== null)

  if (form.hasYard === true) items.push(form.yardFenced !== null)
  if (form.ownsHome === false) items.push(form.landlordAllowsPets !== null)
  if (form.hasPreviousPetExperience === true)
    items.push(form.yearsOfPetExperience !== '')

  return {
    answered: items.filter(Boolean).length,
    total: items.length,
  }
}
