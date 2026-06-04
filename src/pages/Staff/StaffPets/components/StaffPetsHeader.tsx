import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface StaffPetsHeaderProps {
  totalCount: number;
  availableCount: number;
}

export default function StaffPetsHeader({
  totalCount,
  availableCount,
}: StaffPetsHeaderProps) {
  return (
    <header className='staff-subtopbar'>
      <div className='staff-subtopbar-title'>
        <h1 className='staff-subtopbar-name'>
          The <em>roster</em>
        </h1>
        <p className='staff-subtopbar-sub'>
          {totalCount} total · {availableCount} available
        </p>
      </div>
      <div className='staff-subtopbar-actions'>
        <Link to='/staff/pets/add' className='staff-detail-btn primary p-4 inline-flex items-center gap-1.5'>
          Add pet <ArrowRight size={14} />
        </Link>
      </div>
    </header>
  );
}
