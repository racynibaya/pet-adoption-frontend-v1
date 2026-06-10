import { ArrowLeft, ArrowRight } from 'lucide-react'

interface ServicesPaginationProps {
  currentPage: number
  totalPages: number
  loading: boolean
  onPageChange: (page: number) => void
}

export default function ServicesPagination({
  currentPage,
  totalPages,
  loading,
  onPageChange,
}: ServicesPaginationProps) {
  if (totalPages <= 1) return null
  return (
    <div className='mt-14 flex justify-center'>
      <nav
        aria-label='Pets pagination'
        className='inline-flex items-center gap-3 sm:gap-4 rounded-full border border-(--hairline-soft) bg-(--canvas) pl-2 pr-2 py-2 sm:pl-3 sm:pr-3'
        style={{ boxShadow: '0 1px 0 rgba(255,255,255,0.6) inset, 0 8px 26px rgba(18,52,64,0.08)' }}
      >
        <button
          className='btn btn-soft btn-sm'
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1 || loading}
          aria-label='Previous page'
        >
          <ArrowLeft size={14} className='mr-1' aria-hidden='true' />
          Prev
        </button>

        <div className='flex items-baseline gap-1.5 px-3 sm:px-4 min-w-25 justify-center'>
          <span
            className='text-26 sm:text-30 leading-none text-(--ink)'
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {currentPage}
          </span>
          <span
            className='text-11 tracking-18 uppercase text-(--muted)'
            style={{ fontWeight: 600 }}
          >
            of {totalPages}
          </span>
        </div>

        <button
          className='btn btn-primary btn-sm'
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || loading}
          aria-label='Next page'
        >
          Next
          <ArrowRight size={14} className='ml-1' aria-hidden='true' />
        </button>
      </nav>
    </div>
  )
}
