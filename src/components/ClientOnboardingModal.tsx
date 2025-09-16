import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SignUpForm from "./SignUpForm";

interface ClientOnboardingModalProps {
  trigger?: React.ReactNode;
}

const ClientOnboardingModal = ({ trigger }: ClientOnboardingModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Get Started Now
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sr-only">
          <DialogTitle>Client Onboarding</DialogTitle>
          <DialogDescription>Complete the form to get started with In-Sync</DialogDescription>
        </DialogHeader>
        <SignUpForm />
      </DialogContent>
    </Dialog>
  );
};

export default ClientOnboardingModal;