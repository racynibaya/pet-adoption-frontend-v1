import { useState } from 'react';
import { useStaff } from '@/context/useStaff';
import {
  StaffAdoptionsHeader,
  StaffAdoptionsStats,
  StaffAdoptionsToolbar,
  StaffAdoptionsTable,
} from './components';
import type { StatusFilter } from './types';

export default function StaffAdoptions() {
  const { adoptions, updateAdoption, pets } = useStaff();
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
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <StaffAdoptionsHeader
        totalCount={adoptions.length}
        pendingCount={pendingCount}
      />

      <div className='staff-page-body' style={{ padding: '24px 32px' }}>
        <StaffAdoptionsStats adoptions={adoptions} />

        <div className='staff-card'>
          <StaffAdoptionsToolbar
            search={search}
            filter={filter}
            onSearchChange={setSearch}
            onFilterChange={setFilter}
          />
          <StaffAdoptionsTable
            adoptions={filtered}
            pets={pets}
            onUpdate={updateAdoption}
          />
        </div>
      </div>
    </div>
  );
}
