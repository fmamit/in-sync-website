import BaseModal from "./common/BaseModal";
import OnboardingForm from "./OnboardingForm";

interface OnboardingModalProps {
  trigger?: React.ReactNode;
}

const OnboardingModal = ({ trigger }: OnboardingModalProps) => {
  return (
    <BaseModal
      trigger={trigger}
      title="Platform Onboarding Form"
      description="Complete the onboarding information for In-Sync Platform"
      size="2xl"
      hideHeader={true}
    >
      <OnboardingForm />
    </BaseModal>
  );
};

export default OnboardingModal;