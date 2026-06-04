import SectionHead from '@/components/ui/SectionHead';
import PetCardLarge from '@/components/pet/PetCardLarge';
import type { PetCard } from '@/data/pets';
import ServicesEmpty from './ServicesEmpty';
import ServicesPagination from './ServicesPagination';

interface ServicesListingsProps {
  loading: boolean;
  totalPets: number;
  pets: PetCard[];
  filtered: PetCard[];
  onClearFilters: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ServicesListings({
  loading,
  totalPets,
  pets,
  filtered,
  onClearFilters,
  currentPage,
  totalPages,
  onPageChange,
}: ServicesListingsProps) {
  return (
    <section className='section'>
      <SectionHead
        heading={
          loading && pets.length === 0
            ? 'Finding pets…'
            : totalPets > 0
              ? 'Available Pets'
              : 'No pets match your filters'
        }
        subheading='Each pet is listed by a verified shelter. Click a listing to view full details and start your adoption application.'
      />
      {filtered.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7'>
          {filtered.map((pet) => (
            <PetCardLarge key={pet.id} pet={pet} />
          ))}
        </div>
      ) : (
        <ServicesEmpty onClearFilters={onClearFilters} />
      )}

      <ServicesPagination
        currentPage={currentPage}
        totalPages={totalPages}
        loading={loading}
        onPageChange={onPageChange}
      />
    </section>
  );
}
