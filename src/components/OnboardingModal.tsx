import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import OnboardingForm from "./OnboardingForm";

interface OnboardingModalProps {
  trigger?: React.ReactNode;
}

const OnboardingModal = ({ trigger }: OnboardingModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            Onboarding Form
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sr-only">
          <DialogTitle>Platform Onboarding Form</DialogTitle>
          <DialogDescription>Complete the onboarding information for In-Sync Platform</DialogDescription>
        </DialogHeader>
        <OnboardingForm />
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;