import type { ChangeEvent, RefObject } from 'react'
import { MAX_IMAGES } from '@/pages/Staff/StaffPetForm/constants/staffPetForm.constants'

interface AdminPetFormPhotosProps {
  fileRef: RefObject<HTMLInputElement>
  images: string[]
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  onRemove: (index: number) => void
}

export default function AdminPetFormPhotos({
  fileRef,
  images,
  onFileChange,
  onRemove,
}: AdminPetFormPhotosProps) {
  const hasImages = images.length > 0
  const room = MAX_IMAGES - images.length

  return (
    <section className='bento-card a-section' style={{ ['--i' as string]: 4 }}>
      <div className='bento-eyebrow'>
        <span className='dot' /> Photos
      </div>
      <h3 className='bento-h'>
        Photos
        <span
          className='asf-label-hint'
          style={{ marginLeft: 10, fontWeight: 500 }}
        >
          up to {MAX_IMAGES} · 5&nbsp;MB each
        </span>
      </h3>
      <p className='bento-sub' style={{ marginBottom: 18 }}>
        Clear, well-lit photos. The first photo becomes the cover for this pet
        on the public directory.
      </p>

      <input
        ref={fileRef}
        type='file'
        accept='image/jpeg,image/png,image/webp'
        multiple
        onChange={onFileChange}
        style={{ display: 'none' }}
      />

      <div className='asf-image-row' style={{ flexWrap: 'wrap', gap: 14 }}>
        {images.map((src, i) => (
          <div
            key={src}
            className='asf-image-tile'
            style={{ width: 132, height: 132 }}
          >
            <img src={src} alt={`Pet photo ${i + 1}`} />
            <button
              type='button'
              onClick={() => onRemove(i)}
              className='asf-image-remove'
              aria-label={`Remove photo ${i + 1}`}
            >
              ✕
            </button>
          </div>
        ))}

        {room > 0 && (
          <div
            className='asf-image-tile is-empty'
            style={{ width: 132, height: 132 }}
          >
            <button
              type='button'
              onClick={() => fileRef.current?.click()}
              className='asf-image-tile-empty-btn'
            >
              <svg
                width='28'
                height='28'
                viewBox='0 0 24 24'
                fill='none'
                aria-hidden='true'
              >
                <rect
                  x='3'
                  y='5'
                  width='18'
                  height='14'
                  rx='2'
                  stroke='currentColor'
                  strokeWidth='1.5'
                />
                <circle cx='9' cy='10' r='1.5' fill='currentColor' />
                <path
                  d='M3 16l5-4.5 4 3.5 3-2.5 6 5'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <span>{hasImages ? 'Add more' : 'Add photos'}</span>
            </button>
          </div>
        )}
      </div>

      <p
        className='asf-image-meta-hint'
        style={{ marginTop: 14 }}
      >
        {hasImages
          ? `${images.length} of ${MAX_IMAGES} photos attached. Photos upload when you save.`
          : 'No photos attached yet — they upload when you save.'}
      </p>
    </section>
  )
}
