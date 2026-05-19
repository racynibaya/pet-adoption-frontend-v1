import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import AuthModal from '@/components/ui/AuthModal'
import {
  PetApplyBreadcrumb,
  PetApplyPetSidebar,
  PetApplyPageHero,
  PetApplySignupGate,
  PetApplyVerifyGate,
  PetApplySuccessScreen,
  PetApplyChapter1Home,
  PetApplyChapter2Household,
  PetApplyChapter3Experience,
  PetApplyChapter4Care,
  PetApplySubmitRow,
  PetApplyStickyFooter,
  PetApplyApiError,
} from './components'
import { PAGE_CSS } from './constants/petApply.constants'
import { usePetApply } from './hooks/usePetApply'

export default function PetApply() {
  const a = usePetApply()

  if (!a.pet) return <Navigate to='/pets' replace />

  const pageWrapper = (children: ReactNode) => (
    <div style={{ paddingTop: 32, paddingBottom: 96 }}>
      <style>{PAGE_CSS}</style>
      <PetApplyBreadcrumb petId={a.pet!.id} petName={a.pet!.name} />
      <div className='petapply-grid'>
        <PetApplyPetSidebar pet={a.pet!} />
        <div style={{ minWidth: 0, maxWidth: 620 }}>
          <PetApplyPageHero petName={a.pet!.name} />
          {children}
        </div>
      </div>
    </div>
  )

  if (!a.isAuthenticated || !a.adopter) {
    return pageWrapper(
      <>
        <PetApplySignupGate
          petName={a.pet.name}
          onOpenSignup={a.openSignup}
          onOpenSignin={a.openSignin}
        />
        <AuthModal
          isOpen={a.authOpen}
          mode={a.authMode}
          onClose={() => a.setAuthOpen(false)}
          onModeChange={a.setAuthMode}
        />
      </>,
    )
  }

  if (!a.adopter.isVerified) {
    return pageWrapper(<PetApplyVerifyGate email={a.adopter.email} />)
  }

  if (a.submitted) {
    return pageWrapper(<PetApplySuccessScreen petId={a.pet.id} petName={a.pet.name} />)
  }

  return pageWrapper(
    <>
      <form onSubmit={a.handleSubmit} noValidate>
        <PetApplyChapter1Home form={a.form} errors={a.errors} set={a.set} />
        <PetApplyChapter2Household form={a.form} errors={a.errors} set={a.set} />
        <PetApplyChapter3Experience form={a.form} errors={a.errors} set={a.set} />
        <PetApplyChapter4Care
          form={a.form}
          errors={a.errors}
          petName={a.pet.name}
          set={a.set}
        />

        {a.apiError && <PetApplyApiError message={a.apiError} />}

        <PetApplySubmitRow
          loading={a.loading}
          answered={a.progress.answered}
          total={a.progress.total}
        />
      </form>

      {a.showStickyFooter && (
        <PetApplyStickyFooter
          loading={a.loading}
          answered={a.progress.answered}
          total={a.progress.total}
        />
      )}
    </>,
  )
}
