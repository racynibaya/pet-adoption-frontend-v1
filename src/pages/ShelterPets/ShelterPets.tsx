import { Navigate, useParams } from 'react-router-dom';
import { usePets } from '@/context/usePets';
import { useSheltersQuery } from '@/queries/useSheltersQuery';
import type { PetCard } from '@/data/pets';
import ShelterDetailStats from '@/pages/ShelterDetail/components/ShelterDetailStats';
import ShelterDetailPets from '@/pages/ShelterDetail/components/ShelterDetailPets';
import { ShelterPetsBreadcrumb, ShelterPetsHero } from './components';

export default function ShelterPets() {
  const { id } = useParams<{ id: string }>();
  const shelterId = Number(id);
  const { pets } = usePets();

  const { data: shelters = [], isFetched: apiDone } = useSheltersQuery();
  const apiShelter = shelters.find((s) => s.id === shelterId) ?? null;

  if (!apiShelter && apiDone) return <Navigate to='/shelters' replace />;

  const shelterName = apiShelter?.name ?? '';
  const city = apiShelter?.city ?? '—';

  if (!apiShelter) {
    return (
      <div className='py-24 text-center text-(--muted)'>Loading shelter…</div>
    );
  }

  const shelterPets: PetCard[] = pets.filter((p) => p.shelterId === shelterId);
  const availablePets = shelterPets.filter((p) => p.status === 'AVAILABLE');

  return (
    <div className='pb-10'>
      <ShelterPetsBreadcrumb shelterId={shelterId} shelterName={shelterName} />
      <ShelterPetsHero
        shelterName={shelterName}
        availableCount={availablePets.length}
        totalCount={shelterPets.length}
      />
      <ShelterDetailStats
        availableCount={availablePets.length}
        totalCount={shelterPets.length}
        city={city}
      />
      <ShelterDetailPets
        shelterName={shelterName}
        pets={shelterPets}
        availableCount={availablePets.length}
      />
    </div>
  );
}
