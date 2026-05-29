interface StaffPetFormGuideProps {
  isEdit: boolean
}

export default function StaffPetFormGuide({ isEdit }: StaffPetFormGuideProps) {
  return (
    <div className='staff-form-card'>
      <div className='staff-form-card-head'>Listing tips</div>
      <div className='staff-form-card-body'>
        <div className='staff-guide-list'>
          <div className='staff-guide-item'>
            <span className='staff-guide-dot'>01</span>
            <div>
              <div className='staff-guide-h'>Lead with personality</div>
              <p className='staff-guide-p'>
                Two or three short paragraphs about temperament and the kind of home that suits them best land better than a list of traits.
              </p>
            </div>
          </div>
          <div className='staff-guide-item'>
            <span className='staff-guide-dot is-teal'>02</span>
            <div>
              <div className='staff-guide-h'>
                {isEdit ? 'Keep photos current' : 'Bright, eye-level photos'}
              </div>
              <p className='staff-guide-p'>
                {isEdit
                  ? 'If the pet has changed since intake, refresh the photos so adopters meet the animal they will actually see.'
                  : 'Natural light, clean backgrounds, and a camera at the pet’s eye level outperform clinical or cluttered shots.'}
              </p>
            </div>
          </div>
          <div className='staff-guide-item'>
            <span className='staff-guide-dot is-rose'>03</span>
            <div>
              <div className='staff-guide-h'>Status reflects readiness</div>
              <p className='staff-guide-p'>
                Mark <strong>Available</strong> only after vetting wraps. <strong>Pending</strong> means a family is mid-process; <strong>Adopted</strong> closes the listing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
