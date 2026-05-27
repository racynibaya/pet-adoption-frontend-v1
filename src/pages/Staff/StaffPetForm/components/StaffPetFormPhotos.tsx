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
  return (
    <div className='staff-form-card'>
      <div className='staff-form-card-head'>Photos</div>
      <div className='staff-form-card-body'>
        <p style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 12 }}>
          Up to {MAX_IMAGES} images · max 5 MB each · JPEG, PNG, or WebP
        </p>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={onFileChange}
          style={{ display: 'none' }}
        />
        {images.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
            {images.map((src, i) => (
              <div key={src} style={{ position: 'relative', width: 88, height: 88 }}>
                <img src={src} alt="" style={{ width: 88, height: 88, objectFit: 'cover', borderRadius: 10, border: '1.5px solid var(--hairline)' }} />
                {i === 0 && (
                  <span style={{
                    position: 'absolute', bottom: 4, left: 4,
                    fontSize: 9, fontWeight: 700, background: '#1D7575', color: 'white',
                    padding: '2px 6px', borderRadius: 4, letterSpacing: '0.05em',
                  }}>PRIMARY</span>
                )}
                <button
                  type="button"
                  onClick={() => onRemove(i)}
                  style={{
                    position: 'absolute', top: -6, right: -6,
                    width: 20, height: 20, borderRadius: '50%',
                    background: '#D94F68', border: 'none', color: 'white',
                    cursor: 'pointer', fontSize: 12, lineHeight: 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >✕</button>
              </div>
            ))}
            {images.length < MAX_IMAGES && (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                style={{
                  width: 88, height: 88, borderRadius: 10, border: '2px dashed var(--hairline)',
                  background: 'white', cursor: 'pointer', color: 'var(--muted)', fontSize: 22,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >+</button>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            style={{
              width: '100%', padding: '28px 16px',
              border: '2px dashed var(--hairline)', borderRadius: 12,
              background: 'white', cursor: 'pointer',
              color: 'var(--muted)', fontSize: 13.5, fontFamily: 'var(--font-body)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              transition: 'border-color 0.13s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#E8923C' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--hairline)' }}
          >
            <UploadIcon />
            Click to upload photos
          </button>
        )}
      </div>
    </div>
  )
}
