import type { CSSProperties } from 'react'
import type { PetCard } from '@/data/pets'

interface PetThumbProps {
  pet: Pick<PetCard, 'name' | 'imageUrl' | 'svg'>
  /** Class applied to the <img> when an imageUrl is present. */
  imgClassName?: string
  /** Style applied to the <img> when an imageUrl is present. */
  imgStyle?: CSSProperties
  /** Class for the SVG wrapper. If neither this nor svgStyle is provided, the SVG renders raw. */
  svgClassName?: string
  /** Style for the SVG wrapper. If neither this nor svgClassName is provided, the SVG renders raw. */
  svgStyle?: CSSProperties
  loading?: 'lazy' | 'eager'
}

export default function PetThumb({
  pet,
  imgClassName,
  imgStyle,
  svgClassName,
  svgStyle,
  loading = 'lazy',
}: PetThumbProps) {
  if (pet.imageUrl) {
    return (
      <img
        src={pet.imageUrl}
        alt={pet.name}
        loading={loading}
        className={imgClassName}
        style={imgStyle}
      />
    )
  }
  if (svgClassName || svgStyle) {
    return (
      <div className={svgClassName} style={svgStyle}>
        {pet.svg}
      </div>
    )
  }
  return <>{pet.svg}</>
}
