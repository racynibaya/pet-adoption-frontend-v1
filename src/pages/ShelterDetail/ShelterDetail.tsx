import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useFavorites } from '@/context/useFavorites'
import { useStaff } from '@/context/useStaff'
import { apiGetShelters, type ApiShelter } from '@/services/api'
import { SHELTERS } from '@/pages/UseCases/UseCases'
import type { PetCard } from '@/data/pets'
import {
  ShelterDetailBreadcrumb,
  ShelterDetailHero,
  ShelterDetailStats,
  ShelterDetailPets,
  ShelterDetailCta,
} from './components'
import { GenericShelterSvg, GENERIC_SHELTER_BG } from './assets'
import { parseCity } from './utils/parseCity'
import type { ShelterDetailModel } from './types'

export default function ShelterDetail() {
  const { id } = useParams<{ id: string }>()
  const shelterId = Number(id)
  const { pets } = useStaff()
  const { toggle, isSaved } = useFavorites()

  const mockShelter = SHELTERS.find((s) => s.id === shelterId)
  const [apiShelter, setApiShelter] = useState<ApiShelter | null>(null)
  const [apiDone, setApiDone] = useState(false)

  useEffect(() => {
    let cancelled = false
    apiGetShelters(1, 100)
      .then((res) => {
        if (cancelled) return
        const found = res.data.find((s) => s.id === shelterId) ?? null
        setApiShelter(found)
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setApiDone(true)
      })
    return () => { cancelled = true }
  }, [shelterId])

  const hasAny = apiShelter || mockShelter
  if (!hasAny && apiDone) return <Navigate to='/shelters' replace />

  const shelter: ShelterDetailModel | null = hasAny
    ? {
        id: shelterId,
        name: apiShelter?.name ?? mockShelter?.name ?? '',
        address: apiShelter?.address ?? mockShelter?.address ?? '',
        contactEmail: apiShelter?.contactEmail ?? mockShelter?.contactEmail ?? '',
        phoneNumber: apiShelter?.phoneNumber ?? mockShelter?.phoneNumber ?? '',
        description: mockShelter?.description ?? '',
        bg: mockShelter?.bg ?? GENERIC_SHELTER_BG,
        svg: mockShelter?.svg ?? <GenericShelterSvg />,
      }
    : null

  if (!shelter) {
    return <div className='py-24 text-center text-(--muted)'>Loading shelter…</div>
  }

  const shelterPets: PetCard[] = pets.filter((p) => p.shelterId === shelterId)
  const availablePets = shelterPets.filter((p) => p.status === 'AVAILABLE')
  const city = parseCity(shelter.address)

  return (
    <div className='pb-20'>
      <ShelterDetailBreadcrumb shelterName={shelter.name} />
      <ShelterDetailHero shelter={shelter} />
      <ShelterDetailStats
        availableCount={availablePets.length}
        totalCount={shelterPets.length}
        city={city}
      />
      <ShelterDetailPets
        shelterName={shelter.name}
        pets={shelterPets}
        availableCount={availablePets.length}
        isSaved={isSaved}
        onToggleSave={toggle}
      />
      <ShelterDetailCta shelterName={shelter.name} />
    </div>
  )
}
