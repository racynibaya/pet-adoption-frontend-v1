import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { usePets } from '@/context/usePets';
import { apiGetShelters, type ApiShelter } from '@/services/api';
import { SHELTERS } from '@/data/shelters';
import type { PetCard } from '@/data/pets';
import ShelterDetailStats from '@/pages/ShelterDetail/components/ShelterDetailStats';
import ShelterDetailPets from '@/pages/ShelterDetail/components/ShelterDetailPets';
import { ShelterPetsBreadcrumb, ShelterPetsHero } from './components';

export default function ShelterPets() {
  const { id } = useParams<{ id: string }>();
  const shelterId = Number(id);
  const { pets } = usePets();

  const mockShelter = SHELTERS.find((s) => s.id === shelterId);
  const [apiShelter, setApiShelter] = useState<ApiShelter | null>(null);
  const [apiDone, setApiDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    apiGetShelters(1, 100)
      .then((res) => {
        if (cancelled) return;
        const found = res.data.find((s) => s.id === shelterId) ?? null;
        setApiShelter(found);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setApiDone(true);
      });
    return () => {
      cancelled = true;
    };
  }, [shelterId]);

  const hasAny = apiShelter || mockShelter;
  if (!hasAny && apiDone) return <Navigate to='/shelters' replace />;

  const shelterName = apiShelter?.name ?? mockShelter?.name ?? '';
  const city = apiShelter?.city ?? mockShelter?.city ?? '—';

  if (!hasAny) {
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
