import { Link } from 'react-router-dom';

interface AdminSheltersToplineProps {
  shelterCount: number;
  statusLabel: string;
  canCreate: boolean;
}

export default function AdminSheltersTopline({
  shelterCount,
  statusLabel,
  canCreate,
}: AdminSheltersToplineProps) {
  return (
    <header
      className='admin-topline a-section'
      style={{ ['--i' as string]: 0 }}
    >
      <div>
        <div className='admin-eyebrow'>Directory</div>
        <h1 className='admin-title'>Partner shelters.</h1>
        <p className='admin-subtitle'>
          Every shelter currently homing pets on KodaNest. Pick a shelter on the
          left to see its contact info and live roster by status.
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {canCreate && (
          <Link to='/admin/shelters/add' className='bento-action-btn primary'>
            New shelter
          </Link>
        )}
        <div className='admin-clock'>
          <span>
            {shelterCount} shelter{shelterCount === 1 ? '' : 's'}
          </span>
          <span className='admin-clock-now'>{statusLabel}</span>
        </div>
      </div>
    </header>
  );
}
