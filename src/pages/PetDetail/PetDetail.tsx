import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  ageLabel,
  speciesLabel,
  genderLabel,
  sizeLabel,
} from '@/data/pets';
import { useFavorites } from '@/context/useFavorites';
import { usePets } from '@/context/usePets';
import { apiPetToPetCard } from '@/data/adapters';
import { apiGetPet } from '@/services/api';
import { queryKeys } from '@/queries/keys';
import {
  PetDetailBreadcrumb,
  PetDetailGallery,
  PetDetailHeading,
  PetDetailStatGrid,
  PetDetailAbout,
  PetDetailTraits,
  PetDetailCare,
  PetDetailGoodWith,
  PetDetailCta,
} from './components';

export default function PetDetail() {
  const { id } = useParams<{ id: string }>();
  const { pets } = usePets();
  const localPet = pets.find((p) => String(p.id) === id);
  const { toggle, isSaved } = useFavorites();

  const numericId = id ? Number(id) : NaN;
  const isInvalidId = !id || !Number.isInteger(numericId) || numericId <= 0;

  const { data: fetchedPet, isError: notFound } = useQuery({
    queryKey: queryKeys.pets.detail(numericId),
    queryFn: () => apiGetPet(numericId).then((res) => apiPetToPetCard(res.data)),
    enabled: !localPet && !isInvalidId,
  });

  const pet = localPet ?? fetchedPet;

  const images = pet?.imageUrls ?? (pet?.imageUrl ? [pet.imageUrl] : []);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [prevId, setPrevId] = useState(id);
  if (id !== prevId) {
    setPrevId(id);
    setSelectedImageIdx(0);
  }

  if (notFound || (isInvalidId && !localPet)) return <Navigate to='/pets' replace />;
  if (!pet) {
    return (
      <div className='py-24 text-center text-(--muted)'>Loading pet…</div>
    );
  }

  const saved = isSaved(String(pet.id));
  const activeImage = images[selectedImageIdx] ?? images[0];

  return (
    <div style={{ paddingBottom: 80 }}>
      <PetDetailBreadcrumb petName={pet.name} />

      <div
        className='pet-detail-grid'
        style={{ display: 'grid', gap: 40, alignItems: 'start' }}
      >
        <PetDetailGallery
          pet={pet}
          images={images}
          activeImage={activeImage}
          selectedImageIdx={selectedImageIdx}
          onSelectImage={setSelectedImageIdx}
          saved={saved}
          onToggleSave={() => toggle(String(pet.id))}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <PetDetailHeading
            name={pet.name}
            breed={pet.breed}
            species={speciesLabel(pet.species)}
            gender={genderLabel(pet.gender)}
          />
          <PetDetailStatGrid
            age={ageLabel(pet.ageMonths)}
            size={sizeLabel(pet.size)}
            gender={genderLabel(pet.gender)}
            species={speciesLabel(pet.species)}
          />
          <PetDetailAbout name={pet.name} description={pet.description} />
          <PetDetailTraits traits={pet.traits} />
          <PetDetailCare
            vaccinated={pet.vaccinated}
            neutered={pet.neutered}
            houseTrained={pet.houseTrained}
          />
          <PetDetailGoodWith items={pet.goodWith} />
          <PetDetailCta petId={pet.id} petName={pet.name} status={pet.status} />
        </div>
      </div>
    </div>
  );
}
