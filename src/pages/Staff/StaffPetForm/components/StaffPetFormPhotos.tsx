import type { ChangeEvent, RefObject } from 'react'
import { MAX_IMAGES } from '../constants/staffPetForm.constants'
import { UploadIcon } from '../assets'

interface StaffPetFormPhotosProps {
  fileRef: RefObject<HTMLInputElement>
  images: string[]
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  onRemove: (i: number) => void
}

export default function StaffPetFormPhotos({ fileRef, images, onFileChange, onRemove }: StaffPetFormPhotosProps) {
  const empty = images.length === 0

  return (
    <div className='staff-visuals-card'>
      <div className='staff-visuals-head'>
        <span className='staff-visuals-eyebrow'>Visuals</span>
        <span className='staff-visuals-count'>
          {images.length}<em> / {MAX_IMAGES}</em>
        </span>
      </div>
      <div className='staff-visuals-body'>
        <input
          ref={fileRef}
          type='file'
          accept='image/jpeg,image/png,image/webp'
          multiple
          onChange={onFileChange}
          style={{ display: 'none' }}
        />

        {empty ? (
          <button type='button' onClick={() => fileRef.current?.click()} className='staff-visuals-drop'>
            <span className='staff-visuals-drop-icon'>
              <UploadIcon />
            </span>
            <span className='staff-visuals-drop-title'>Click to upload photos</span>
            <span className='staff-visuals-drop-rule' />
            <span className='staff-visuals-drop-sub'>
              Up to {MAX_IMAGES} images · max 5 MB each
              <br />JPEG · PNG · WebP
            </span>
          </button>
        ) : (
          <div className='staff-visuals-grid'>
            {images.map((src, i) => (
              <div key={src} className={`staff-visuals-tile${i === 0 ? ' is-primary' : ''}`}>
                <img src={src} alt='' />
                {i === 0 && <span className='staff-visuals-tile-badge'>PRIMARY</span>}
                <button
                  type='button'
                  onClick={() => onRemove(i)}
                  className='staff-visuals-tile-remove'
                  aria-label='Remove photo'
                >✕</button>
              </div>
            ))}
            {images.length < MAX_IMAGES && (
              <button
                type='button'
                onClick={() => fileRef.current?.click()}
                className='staff-visuals-add'
                aria-label='Add more photos'
              >+</button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
