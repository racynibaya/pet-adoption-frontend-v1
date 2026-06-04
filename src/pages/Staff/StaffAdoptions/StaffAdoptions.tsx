import { useState } from 'react';
import { usePets } from '@/context/usePets';
import { useAdoptions } from '@/context/useAdoptions';
import {
  StaffAdoptionsHeader,
  StaffAdoptionsStats,
  StaffAdoptionsToolbar,
  StaffAdoptionsTable,
} from './components';
import type { StatusFilter } from './types';

export default function StaffAdoptions() {
  const { pets } = usePets();
  const { adoptions, updateAdoption } = useAdoptions();
  const [filter, setFilter] = useState<StatusFilter>('All');
  const [search, setSearch] = useState('');

  const filtered = adoptions.filter((a) => {
    const matchStatus = filter === 'All' || a.status === filter;
    const q = search.toLowerCase();
    const matchSearch =
      a.applicantName.toLowerCase().includes(q) ||
      a.petName.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const pendingCount = adoptions.filter(
    (a) => a.status === 'PENDING' || a.status === 'REVIEWING',
  ).length;

  return (
    <div className='staff-page-shell'>
      <StaffAdoptionsHeader
        totalCount={adoptions.length}
        pendingCount={pendingCount}
      />

      <StaffAdoptionsStats adoptions={adoptions} />

      <StaffAdoptionsToolbar
        search={search}
        filter={filter}
        onSearchChange={setSearch}
        onFilterChange={setFilter}
      />

      <div className='staff-table-card'>
        <StaffAdoptionsTable
          adoptions={filtered}
          pets={pets}
          onUpdate={updateAdoption}
        />
      </div>
    </div>
  );
}
