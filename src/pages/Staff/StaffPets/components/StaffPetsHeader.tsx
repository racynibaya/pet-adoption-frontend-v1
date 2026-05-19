import { Link } from 'react-router-dom'
import { PlusIcon } from '../assets'

interface StaffPetsHeaderProps {
  totalCount: number
  availableCount: number
}

export default function StaffPetsHeader({ totalCount, availableCount }: StaffPetsHeaderProps) {
  return (
    <div className='staff-page-header'>
      <div>
        <h1 className='staff-page-title'>Pets</h1>
        <p className='staff-page-sub'>
          {totalCount} total · {availableCount} available
        </p>
      </div>
      <Link
        to='/staff/pets/add'
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          padding: '10px 20px',
          background: '#E8923C',
          color: 'white',
          borderRadius: 11,
          fontWeight: 600,
          fontSize: 13.5,
          textDecoration: 'none',
          boxShadow: '0 2px 8px rgba(232,146,60,0.3)',
          transition: 'background 0.14s',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#CB7730' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#E8923C' }}
      >
        <PlusIcon />
        Add Pet
      </Link>
    </div>
  )
}
