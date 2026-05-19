import type { CSSProperties } from 'react'
import type { FormState } from '../types'

export const EMPTY_FORM: FormState = {
  message: '',
  homeType: '',
  hasYard: null,
  yardFenced: null,
  ownsHome: null,
  landlordAllowsPets: null,
  householdSize: '',
  hasChildren: null,
  hasPreviousPetExperience: null,
  yearsOfPetExperience: '',
  hoursAwayPerDay: '',
  hasOtherPetsNow: null,
  reasonForAdopting: '',
  hasBackupCarePlan: null,
  awareOfMonthlyCosts: null,
}

export const chapterCard: CSSProperties = {
  background: 'white',
  border: '1.5px solid var(--hairline-soft)',
  borderRadius: 22,
  padding: 'clamp(24px, 5.5vw, 40px) clamp(20px, 5vw, 44px)',
  marginBottom: 22,
  boxShadow:
    '0 1px 0 rgba(28,44,44,0.02), 0 12px 36px -18px rgba(28,44,44,0.10)',
}

export const questionLabel: CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 19,
  fontWeight: 500,
  color: 'var(--ink)',
  lineHeight: 1.35,
  letterSpacing: '-0.005em',
  margin: 0,
}

export const helperText: CSSProperties = {
  fontSize: 13.5,
  color: 'var(--muted)',
  lineHeight: 1.55,
  margin: '6px 0 0',
}

export const numberInput: CSSProperties = {
  width: '100%',
  height: 48,
  padding: '0 16px',
  border: '1.5px solid var(--hairline)',
  borderRadius: 12,
  fontSize: 15,
  color: 'var(--ink)',
  background: 'white',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'var(--font-body)',
  transition: 'border-color 160ms var(--ease-out), background 160ms var(--ease-out)',
}

export const PAGE_CSS = `
.petapply-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 56px;
  align-items: start;
}
.petapply-journal::placeholder {
  font-style: italic;
  color: #B6A998;
}
.petapply-sticky-footer {
  position: fixed;
  right: 28px;
  bottom: 24px;
  z-index: 40;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 12px 10px 22px;
  background: white;
  border: 1.5px solid var(--hairline);
  border-radius: 999px;
  box-shadow: 0 14px 38px -10px rgba(28,44,44,0.22);
  animation: petapplyFooterIn 320ms var(--ease-out) both;
}
@keyframes petapplyFooterIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
@media (max-width: 900px) {
  .petapply-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .petapply-sidebar {
    position: static !important;
  }
  .petapply-sticky-footer {
    display: none;
  }
  .petapply-sidebar-image {
    aspect-ratio: 16 / 10 !important;
  }
}
@media (max-width: 480px) {
  .petapply-chapter-head {
    gap: 12px !important;
    margin-bottom: 22px !important;
    padding-bottom: 14px !important;
  }
  .petapply-chapter-num {
    font-size: 32px !important;
  }
  .petapply-chapter-title {
    font-size: 22px !important;
  }
  .petapply-hometype-grid {
    gap: 8px !important;
  }
  .petapply-hometype-btn {
    min-height: 92px !important;
    padding: 14px 6px !important;
    font-size: 12.5px !important;
  }
  .petapply-hometype-btn svg {
    width: 22px;
    height: 22px;
  }
}
`
