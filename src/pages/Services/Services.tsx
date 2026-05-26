import { useFavorites } from '@/context/useFavorites';
import {
  ServicesHero,
  ServicesSecondaryFilters,
  ServicesListings,
  ServicesCta,
} from './components';
import { useServicesPets } from './hooks/useServicesPets';

export default function PetsPage() {
  const services = useServicesPets();
  const { toggle, isSaved } = useFavorites();

  return (
    <>
      <ServicesHero
        activeSpecies={services.activeSpecies}
        onSpeciesChange={services.setActiveSpecies}
      />
      <ServicesSecondaryFilters
        activeGender={services.activeGender}
        activeSize={services.activeSize}
        onGenderChange={services.setActiveGender}
        onSizeChange={services.setActiveSize}
      />
      <ServicesListings
        loading={services.loading}
        totalPets={services.totalPets}
        pets={services.pets}
        filtered={services.filtered}
        isSaved={isSaved}
        onToggleSave={toggle}
        onClearFilters={services.clearFilters}
        currentPage={services.currentPage}
        totalPages={services.totalPages}
        onPageChange={services.setCurrentPage}
      />
      <ServicesCta />
    </>
  );
}
