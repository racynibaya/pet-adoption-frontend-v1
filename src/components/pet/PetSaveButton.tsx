import { Heart } from 'lucide-react'
import { useFavorites } from '@/context/useFavorites'

interface PetSaveButtonProps {
  petId: string | number
  petName?: string
  /** Size of the heart glyph in px. Default 16. */
  size?: number
}

export default function PetSaveButton({
  petId,
  petName,
  size = 16,
}: PetSaveButtonProps) {
  const { isSaved, toggle } = useFavorites()
  const saved = isSaved(String(petId))
  const label = saved
    ? `Remove ${petName ?? 'pet'} from saved`
    : `Save ${petName ?? 'pet'}`

  return (
    <button
      type='button'
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(String(petId))
      }}
      aria-label={label}
      aria-pressed={saved}
      className={`absolute top-3 right-3 z-3 w-9 h-9 rounded-full border-0 flex items-center justify-center cursor-pointer backdrop-blur-sm transition-[transform,color,background,box-shadow] duration-150 ease-out hover:scale-[1.14] active:scale-[0.88] ${
        saved ? 'text-[#e0465a] bg-[#fff0f2]' : 'text-(--muted) bg-white/90'
      }`}
      style={{ boxShadow: '0 2px 8px rgba(18,52,64,0.14)' }}
    >
      <Heart size={size} fill={saved ? 'currentColor' : 'none'} strokeWidth={2} />
    </button>
  )
}
