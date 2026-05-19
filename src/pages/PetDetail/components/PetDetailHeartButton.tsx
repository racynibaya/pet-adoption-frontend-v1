import HeartIcon from '@/icons/HeartIcon'

interface PetDetailHeartButtonProps {
  saved: boolean
  onToggle: () => void
}

export default function PetDetailHeartButton({ saved, onToggle }: PetDetailHeartButtonProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={saved ? 'Remove from saved' : 'Save pet'}
      style={{
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 2,
        width: 44,
        height: 44,
        borderRadius: '50%',
        border: 'none',
        background: saved ? '#fff0f2' : 'rgba(255,255,255,0.92)',
        color: saved ? '#e0465a' : 'var(--muted)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 2px 12px rgba(18,52,64,0.16)',
        backdropFilter: 'blur(8px)',
        transition: 'transform 150ms cubic-bezier(0.34,1.56,0.64,1), background 150ms ease, color 150ms ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.14)' }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
      onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.9)' }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.14)' }}
    >
      <HeartIcon width={20} height={20} filled={saved} />
    </button>
  )
}
