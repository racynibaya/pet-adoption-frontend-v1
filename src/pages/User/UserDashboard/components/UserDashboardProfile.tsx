import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface UserDashboardProfileProps {
  fullName: string
  email: string
  phoneNumber: string | null | undefined
  address: string | null | undefined
}

export default function UserDashboardProfile({
  fullName,
  email,
  phoneNumber,
  address,
}: UserDashboardProfileProps) {
  return (
    <section className='u-section' style={{ ['--i' as string]: 5, marginTop: 48 }}>
      <header className='u-section-head'>
        <div>
          <div className='u-section-num'>04 — Account</div>
          <h2 className='u-section-title'>Your details</h2>
        </div>
      </header>

      <div className='user-profile'>
        <div className='user-profile-block'>
          <span className='user-profile-label'>Full name</span>
          <span className='user-profile-value'>{fullName || '—'}</span>
        </div>
        <div className='user-profile-block'>
          <span className='user-profile-label'>Email</span>
          <span className='user-profile-value'>{email}</span>
        </div>
        <div className='user-profile-block'>
          <span className='user-profile-label'>Phone</span>
          <span className={`user-profile-value ${phoneNumber ? '' : 'empty'}`}>
            {phoneNumber || 'Add a number so shelters can reach you'}
          </span>
        </div>
        <div className='user-profile-block'>
          <span className='user-profile-label'>Address</span>
          <span className={`user-profile-value ${address ? '' : 'empty'}`}>
            {address || 'Not set yet'}
          </span>
        </div>

        <div className='user-profile-cta'>
          <p className='user-profile-cta-note'>
            A complete profile speeds up shelter approvals. You can add the
            missing details when you submit your first application.
          </p>
          <Link to='/pets' className='user-btn user-btn-primary inline-flex items-center gap-2'>
            Find your match <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
