interface ServicesEmptyProps {
  onClearFilters: () => void
}

export default function ServicesEmpty({ onClearFilters }: ServicesEmptyProps) {
  return (
    <div className='text-center py-12 text-(--ink-2)'>
      <p>No pets match your current filters. Try adjusting your selection.</p>
      <button className='btn btn-soft mt-16' onClick={onClearFilters}>
        Clear filters
      </button>
    </div>
  )
}
