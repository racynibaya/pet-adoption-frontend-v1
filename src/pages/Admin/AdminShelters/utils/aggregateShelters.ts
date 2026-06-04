import type { PetCard } from '@/data/pets'

export function countPets(pets: PetCard[], shelterId: number, shelterName: string) {
  let total = 0, available = 0, pending = 0, adopted = 0
  for (const p of pets) {
    const match = p.shelterId === shelterId || (shelterName && p.shelterName === shelterName)
    if (!match) continue
    total += 1
    if (p.status === 'AVAILABLE') available += 1
    else if (p.status === 'PENDING') pending += 1
    else adopted += 1
  }
  return { total, available, pending, adopted }
}
