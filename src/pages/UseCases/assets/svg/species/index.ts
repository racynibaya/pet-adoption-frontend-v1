import type { LucideIcon } from 'lucide-react'
import { Dog, Cat, Rabbit, Bird, PawPrint } from 'lucide-react'
import type { BackendSpecies } from '@/services/api'

export { Dog, Cat, Rabbit, Bird }

export const SPECIES_ICON: Record<BackendSpecies, LucideIcon> = {
  DOG: Dog,
  CAT: Cat,
  RABBIT: Rabbit,
  BIRD: Bird,
  OTHER: PawPrint,
}
