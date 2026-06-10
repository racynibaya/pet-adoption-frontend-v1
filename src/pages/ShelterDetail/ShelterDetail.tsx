import { Navigate, useParams } from 'react-router-dom';
import { useSheltersQuery } from '@/queries/useSheltersQuery';
import {
  ShelterDetailBreadcrumb,
  ShelterDetailHero,
  ShelterDetailAbout,
  ShelterDetailLocation,
  ShelterDetailContact,
  ShelterDetailVisitCta,
  ShelterDetailCta,
} from './components';
import type { ShelterDetailModel } from './types';

export default function ShelterDetail() {
  const { id } = useParams<{ id: string }>();
  const shelterId = Number(id);

  const { data: shelters = [], isFetched: apiDone } = useSheltersQuery();
  const apiShelter = shelters.find((s) => s.id === shelterId) ?? null;

  if (!apiShelter && apiDone) return <Navigate to='/shelters' replace />;

  const shelter: ShelterDetailModel | null = apiShelter
    ? {
        id: shelterId,
        name: apiShelter.name,
        addressLine: apiShelter.addressLine,
        city: apiShelter.city,
        province: apiShelter.province,
        region: apiShelter.region,
        contactEmail: apiShelter.contactEmail,
        phoneNumber: apiShelter.phoneNumber,
        description: apiShelter.description,
        bg: null,
        svg: null,
        imageUrl: apiShelter.imageUrl ?? null,
      }
    : null;

  if (!shelter) {
    return (
      <div className='py-24 text-center text-(--muted)'>Loading shelter…</div>
    );
  }

  return (
    <div className='pb-10'>
      <ShelterDetailBreadcrumb shelterName={shelter.name} />
      <ShelterDetailHero
        shelter={shelter}
        city={shelter.city}
        province={shelter.province}
      />
      <ShelterDetailAbout
        shelterName={shelter.name}
        description={shelter.description}
      />
      <ShelterDetailLocation shelter={shelter} />
      <ShelterDetailContact
        shelterName={shelter.name}
        contactEmail={shelter.contactEmail}
        phoneNumber={shelter.phoneNumber}
      />
      <ShelterDetailVisitCta
        shelterId={shelterId}
        shelterName={shelter.name}
        shelterBg={shelter.bg}
        shelterSvg={shelter.svg}
      />
      <ShelterDetailCta shelterName={shelter.name} />
    </div>
  );
}
