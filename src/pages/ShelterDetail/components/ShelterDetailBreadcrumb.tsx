import { Link } from 'react-router-dom'
import { BackChevronIcon } from '../assets'

interface ShelterDetailBreadcrumbProps {
  shelterName: string
}

export default function ShelterDetailBreadcrumb({ shelterName }: ShelterDetailBreadcrumbProps) {
  return (
    <nav className='flex items-center gap-2 pt-6 pb-5 text-[13px] text-(--muted)'>
      <Link
        to='/shelters'
        className='inline-flex items-center gap-1.5 text-(--muted) hover:text-(--ink) transition-colors font-semibold no-underline'
      >
        <BackChevronIcon />
        All shelters
      </Link>
      <span className='opacity-40'>/</span>
      <span className='text-(--ink) font-semibold truncate'>{shelterName}</span>
    </nav>
  )
}
