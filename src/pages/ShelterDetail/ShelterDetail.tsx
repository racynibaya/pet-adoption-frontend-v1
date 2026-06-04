import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { apiGetShelters, type ApiShelter } from '@/services/api';
import { SHELTERS } from '@/data/shelters';
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

  const shelter: ShelterDetailModel | null = hasAny
    ? {
        id: shelterId,
        name: apiShelter?.name ?? mockShelter?.name ?? '',
        addressLine:
          apiShelter?.addressLine ?? mockShelter?.addressLine ?? '',
        city: apiShelter?.city ?? mockShelter?.city ?? '',
        province: apiShelter?.province ?? mockShelter?.province ?? '',
        region: apiShelter?.region ?? mockShelter?.region ?? 'LUZON',
        contactEmail:
          apiShelter?.contactEmail ?? mockShelter?.contactEmail ?? '',
        phoneNumber: apiShelter?.phoneNumber ?? mockShelter?.phoneNumber ?? '',
        description: apiShelter?.description ?? mockShelter?.description ?? '',
        bg: mockShelter?.bg ?? null,
        svg: mockShelter?.svg ?? null,
        imageUrl: apiShelter?.imageUrl ?? null,
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
