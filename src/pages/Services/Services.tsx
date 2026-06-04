import {
  ServicesHero,
  ServicesSecondaryFilters,
  ServicesListings,
  ServicesCta,
} from './components';
import { useServicesPets } from './hooks/useServicesPets';

export default function PetsPage() {
  const services = useServicesPets();

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
        onClearFilters={services.clearFilters}
        currentPage={services.currentPage}
        totalPages={services.totalPages}
        onPageChange={services.setCurrentPage}
      />
      <ServicesCta />
    </>
  );
}
