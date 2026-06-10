import { Link } from 'react-router-dom';

interface StaffDashboardHeaderProps {
  firstName: string | undefined;
}

export default function StaffDashboardHeader({
  firstName,
}: StaffDashboardHeaderProps) {
  return (
    <div className='staff-page-header'>
      <div>
        <h1 className='staff-page-title'>Good day, {firstName} 👋</h1>
        <p className='staff-page-sub'>
          Here's what's happening at your shelter today.
        </p>
      </div>
      <Link
        className='p-4'
        to='/staff/pets/add'
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          padding: '10px 20px',
          background: 'var(--rausch)',
          color: 'white',
          borderRadius: 11,
          fontWeight: 600,
          fontSize: 13.5,
          textDecoration: 'none',
          boxShadow: '0 2px 8px rgba(232,146,60,0.3)',
          transition: 'background 0.14s',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = 'var(--rausch-active)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = 'var(--rausch)';
        }}
      >
        Add Pet
      </Link>
    </div>
  );
}
