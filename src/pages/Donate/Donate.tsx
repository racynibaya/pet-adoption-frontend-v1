import {
  DonationHero,
  DonationStats,
  DonationAmount,
  DonationJourney,
  DonationForm,
  DonationVoices,
  DonationOtherWays,
} from './components';

import { useDonate } from './hooks/useDonate';

export default function DonatePage() {
  const donate = useDonate();

  return (
    <>
      <DonationHero onSelectImpactTier={donate.handleSelectImpactTier} />

      <DonationStats />

      <DonationAmount
        tiersContainerRef={donate.tiersContainerRef}
        customAmount={donate.customAmount}
        selectedAmount={donate.selectedAmount}
        formErrors={donate.formErrors}
        onCustomAmountChange={donate.handleCustomAmountChange}
        onSelectImpactTier={donate.handleSelectImpactTier}
      />

      <DonationJourney />

      <DonationForm
        formContainerRef={donate.formContainerRef}
        tiersContainerRef={donate.tiersContainerRef}
        shelterTriggerRef={donate.shelterTriggerRef}
        shelterSearchRef={donate.shelterSearchRef}
        shelterPickerRef={donate.shelterPickerRef}
        shelterListRef={donate.shelterListRef}
        customAmount={donate.customAmount}
        selectedAmount={donate.selectedAmount}
        donorName={donate.donorName}
        donorEmail={donate.donorEmail}
        donorMessage={donate.donorMessage}
        shelters={donate.shelters}
        selectedShelterId={donate.selectedShelterId}
        selectedShelter={donate.selectedShelter}
        selectedImpactTier={donate.selectedImpactTier}
        filteredShelters={donate.filteredShelters}
        effectiveAmount={donate.effectiveAmount}
        isAmountValid={donate.isAmountValid}
        formErrors={donate.formErrors}
        isSubmitting={donate.isSubmitting}
        apiError={donate.apiError}
        submittedAmount={donate.submittedAmount}
        shelterQuery={donate.shelterQuery}
        isShelterPickerOpen={donate.isShelterPickerOpen}
        shelterPickerHighlightIndex={donate.shelterPickerHighlightIndex}
        onOpenShelterPicker={donate.handleOpenShelterPicker}
        onCloseShelterPicker={donate.handleCloseShelterPicker}
        onSelectShelter={donate.handleSelectShelter}
        onClearSelectedShelter={donate.handleClearSelectedShelter}
        onShelterQueryChange={donate.handleShelterQueryChange}
        onShelterPickerHighlight={donate.handleShelterPickerHighlight}
        onDonorNameChange={donate.handleDonorNameChange}
        onDonorEmailChange={donate.handleDonorEmailChange}
        onDonorMessageChange={donate.handleDonorMessageChange}
        onScrollToTiers={donate.handleScrollToTiers}
        onResetDonationForm={donate.handleResetDonationForm}
        onSubmitDonation={donate.handleSubmitDonation}
      />

      <DonationVoices />

      <DonationOtherWays />
    </>
  );
}
