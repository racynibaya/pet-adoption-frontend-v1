import type { ReactNode } from 'react'

interface PetApplyCollapsibleProps {
  open: boolean
  children: ReactNode
}

export default function PetApplyCollapsible({ open, children }: PetApplyCollapsibleProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: open ? '1fr' : '0fr',
        opacity: open ? 1 : 0,
        transition:
          'grid-template-rows 280ms var(--ease-out), opacity 220ms var(--ease-out), margin 280ms var(--ease-out)',
        marginTop: open ? 24 : 0,
      }}
    >
      <div style={{ overflow: 'hidden' }}>
        <div
          style={{
            transform: open ? 'translateY(0)' : 'translateY(-6px)',
            transition: 'transform 280ms var(--ease-out)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
