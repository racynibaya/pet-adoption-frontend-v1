import type { ChangeEvent, RefObject } from 'react'

interface AdminShelterFormImageProps {
  fileRef: RefObject<HTMLInputElement>
  imagePreview: string | null
  errorMsg: string | undefined
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  onRemove: () => void
}

export default function AdminShelterFormImage({
  fileRef,
  imagePreview,
  errorMsg,
  onFileChange,
  onRemove,
}: AdminShelterFormImageProps) {
  return (
    <section className='bento-card a-section' style={{ ['--i' as string]: 3 }}>
      <div className='bento-eyebrow'>
        <span className='dot' /> Cover image
      </div>
      <h3 className='bento-h'>Photo</h3>
      <p className='bento-sub' style={{ marginBottom: 18 }}>
        Optional. Used as the shelter&rsquo;s cover on the directory. Max 5&nbsp;MB,
        JPEG, PNG, or WebP.
      </p>

      <input
        ref={fileRef}
        type='file'
        accept='image/jpeg,image/png,image/webp'
        onChange={onFileChange}
        style={{ display: 'none' }}
      />

      <div className='asf-image-row'>
        <div
          className={`asf-image-tile${imagePreview ? '' : ' is-empty'}`}
        >
          {imagePreview ? (
            <>
              <img src={imagePreview} alt='Shelter preview' />
              <button
                type='button'
                onClick={onRemove}
                className='asf-image-remove'
                aria-label='Remove image'
              >
                ✕
              </button>
            </>
          ) : (
            <button
              type='button'
              onClick={() => fileRef.current?.click()}
              className='asf-image-tile-empty-btn'
            >
              <svg
                width='32'
                height='32'
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
              <span>Add an image</span>
            </button>
          )}
        </div>

        <div className='asf-image-meta'>
          <button
            type='button'
            onClick={() => fileRef.current?.click()}
            className='bento-action-btn ghost'
            style={{ alignSelf: 'flex-start' }}
          >
            {imagePreview ? 'Replace image' : 'Choose image'}
          </button>
          <p className='asf-image-meta-hint'>
            {imagePreview
              ? 'Looks good. The image will be uploaded when you save.'
              : 'No image attached — you can add one later from the edit screen.'}
          </p>
          {errorMsg && <span className='asf-error'>{errorMsg}</span>}
        </div>
      </div>
    </section>
  )
}
