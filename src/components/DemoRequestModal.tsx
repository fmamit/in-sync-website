import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { X } from "lucide-react";

const demoRequestSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  bestTimeToContact: z.string().min(1, "Please select best time to contact"),
  email: z.string().email("Valid email is required"),
  company: z.string().min(2, "Company name is required"),
  industry: z.string().min(1, "Please select an industry"),
  problemDescription: z.string().min(10, "Please describe the problem you're trying to solve"),
});

type DemoRequestFormData = z.infer<typeof demoRequestSchema>;

interface DemoRequestModalProps {
  trigger?: React.ReactNode;
}

const problemOptions = [
  "Sales Monitoring",
  "Operation Efficiency", 
  "Tech Upgrade",
  "Unhappy with Current Solution",
  "Lead Management",
  "Customer Communication",
  "Data Analytics",
  "Process Automation"
];

const industries = [
  "Financial Services",
  "Healthcare", 
  "Education",
  "Real Estate",
  "Manufacturing",
  "Technology/SaaS",
  "Retail/E-commerce",
  "Professional Services",
  "Insurance",
  "Automotive",
  "Other"
];

const timeSlots = [
  "9:00 AM - 12:00 PM",
  "12:00 PM - 3:00 PM", 
  "3:00 PM - 6:00 PM",
  "6:00 PM - 9:00 PM",
  "Anytime"
];

const DemoRequestModal = ({ trigger }: DemoRequestModalProps) => {
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<DemoRequestFormData>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: {
      name: "",
      phone: "",
      bestTimeToContact: "",
      email: "",
      company: "",
      industry: "",
      problemDescription: "",
    },
  });

  const handleProblemToggle = (problem: string) => {
    const updatedProblems = selectedProblems.includes(problem)
      ? selectedProblems.filter(p => p !== problem)
      : [...selectedProblems, problem];
    
    setSelectedProblems(updatedProblems);
    
    // Update form field with selected problems
    const currentDescription = form.getValues("problemDescription");
    const problemsText = updatedProblems.length > 0 ? `Selected areas: ${updatedProblems.join(", ")}\n\n` : "";
    const customText = currentDescription.replace(/^Selected areas:.*?\n\n/s, "");
    form.setValue("problemDescription", problemsText + customText);
  };

  const onSubmit = async (data: DemoRequestFormData) => {
    try {
      // For now, just show success message - user needs Supabase integration for actual submission
      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit demo request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleModalClose = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset form and states when modal is closed
      setIsSubmitted(false);
      form.reset();
      setSelectedProblems([]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="default" size="lg">
            Request Demo
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Thank You!</h2>
              <p className="text-lg text-muted-foreground">
                We are delighted. One of our solutions expert will get in touch shortly.
              </p>
            </div>
            <Button onClick={() => handleModalClose(false)} className="mt-4">
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Request a Demo</DialogTitle>
              <DialogDescription>
                Fill out the form below and our team will contact you to schedule a personalized demo
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Best Number to Connect *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bestTimeToContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Best Time to Contact *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select preferred time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Company *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {industries.map((industry) => (
                              <SelectItem key={industry} value={industry}>
                                {industry}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="problemDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Problem You're Trying to Solve *</FormLabel>
                      <FormDescription>
                        Select from common areas below or describe your specific challenges
                      </FormDescription>
                      
                      {/* Clickable Problem Options */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {problemOptions.map((problem) => (
                          <Badge
                            key={problem}
                            variant={selectedProblems.includes(problem) ? "default" : "outline"}
                            className="cursor-pointer hover:bg-primary/20 transition-colors"
                            onClick={() => handleProblemToggle(problem)}
                          >
                            {problem}
                            {selectedProblems.includes(problem) && (
                              <X className="ml-1 h-3 w-3" />
                            )}
                          </Badge>
                        ))}
                      </div>

                      <FormControl>
                        <Textarea
                          placeholder="Describe the specific challenges you're facing or what you're looking to improve..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => handleModalClose(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Submit Demo Request
                  </Button>
                </div>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DemoRequestModal;