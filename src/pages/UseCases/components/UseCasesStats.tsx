import { useMemo, useState } from 'react';
import { usePets } from '@/context/usePets';
import { useShelters } from '@/context/useShelters';

interface StatTile {
  value: string | number;
  label: string;
}

export default function UseCasesStats() {
  const { pets } = usePets();
  const { shelters } = useShelters();

  const [timeStamp, _] = useState(() => Date.now());

  const stats = useMemo<StatTile[]>(() => {
    const totalShelters = shelters.length;
    const availablePets = pets.filter((p) => p.status === 'AVAILABLE').length;

    const provinces = new Set<string>();
    for (const s of shelters) {
      const p = s.province.trim();
      if (p) provinces.add(p.toLowerCase());
    }
    const provinceCount = provinces.size;

    const cutoff = timeStamp - 30 * 24 * 60 * 60 * 1000;
    const newCount = shelters.filter(
      (s) => new Date(s.createdAt).getTime() > cutoff,
    ).length;

    return [
      { value: totalShelters, label: 'Partner shelters' },
      { value: availablePets, label: 'Pets in care' },
      { value: provinceCount, label: 'Provinces reached' },
      { value: newCount, label: 'New this month' },
    ];
  }, [pets, shelters, timeStamp]);

  return (
    <section className='section-tight -m-20 w-full mx-auto'>
      <div
        aria-label='Network stats'
        className='home-stats relative z-5 [box-shadow:var(--shadow-card)] border border-(--hairline-soft) rounded-[20px]'
        style={{
          background: 'linear-gradient(145deg, var(--canvas) 0%, #f8f5ef 100%)',
        }}
      >
        {stats.map(({ value, label }) => (
          <div
            key={label}
            className='text-center border-r border-(--hairline-soft) last:border-r-0'
          >
            <div className='home-stats-num tabular-nums'>{value}</div>
            <div className='home-stats-label'>{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
