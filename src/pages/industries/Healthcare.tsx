import IndustryTemplate, { IndustryTemplateProps, FeatureGrid, MetricCards, ComparisonTable } from "@/components/templates/IndustryTemplate";
import { Shield, Users, Activity, DollarSign, Clock, CheckCircle, Heart, Phone, MessageSquare, Calendar, BarChart, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import DemoRequestModal from "@/components/DemoRequestModal";

const Healthcare = () => {
  const industryData: IndustryTemplateProps = {
    industryName: "Healthcare",
    heroTitle: "Stop Losing Patients to Hospitals That Respond Faster",
    heroDescription: "Transform appointment chaos and poor patient communication into a systematic care engine that increases patient retention by 70%, eliminates missed appointments that waste doctor time, and builds the trust that makes patients choose you for life.",
    heroIcon: "🏥",
    heroGradient: "bg-blue-600",
    primaryCTAText: "See How Leading Hospitals Build Patient Loyalty - Schedule Demo",
    secondaryCTAText: "Calculate Your Patient Retention Value",
    
    heroBenefits: [
      { text: "Convert emergency patients into loyal, long-term relationships" },
      { text: "Eliminate the 30% revenue loss from no-shows and missed appointments" },
      { text: "Build a patient database that generates predictable monthly revenue" },
      { text: "Compete with corporate hospitals through superior patient experience" }
    ],
    
    problemTitle: "The Patient Experience Crisis Costing You Crores",
    problemSubtitle: "Patients Choose Providers Who Make Them Feel Cared For",
    problemDescription: "When patients can't reach you easily, when appointment confirmations come late or not at all, when they feel like just another number - they don't just complain. They switch to competitors who provide better communication and make them feel valued. In healthcare, trust drives patient loyalty more than clinical expertise alone.",
    
    problems: [
      {
        icon: "📉",
        title: "Patient Leakage",
        description: "40% of patients never return after poor communication experience",
        impact: "Lost lifetime value and referral opportunities"
      },
      {
        icon: "🔄",
        title: "No-Show Crisis", 
        description: "30% appointment no-shows waste valuable doctor time",
        impact: "Direct revenue loss and scheduling inefficiency"
      },
      {
        icon: "📞",
        title: "Communication Gaps",
        description: "Patients can't reach reception during busy hours",
        impact: "Emergency cases go to competitors"
      },
      {
        icon: "📋",
        title: "Manual Chaos",
        description: "Paper-based records create treatment delays",
        impact: "Poor patient outcomes and staff burnout"
      }
    ],
    
    sections: [
      {
        id: "solution",
        title: "The Complete Patient Care System",
        subtitle: "Everything You Need to Build Patient Loyalty",
        description: "Transform every patient interaction into an opportunity to build trust and loyalty.",
        background: "muted",
        content: (
          <FeatureGrid features={[
            {
              icon: Phone,
              title: "24/7 Patient Communication",
              description: "Automated appointment reminders, follow-ups, and emergency response system that never misses a patient.",
              benefits: ["99% uptime", "Multi-language support", "Emergency alerts"]
            },
            {
              icon: Calendar,
              title: "Smart Appointment Management", 
              description: "Intelligent scheduling that reduces no-shows by 70% through automated confirmations and rebooking.",
              benefits: ["Automated reminders", "Online booking", "Waitlist management"]
            },
            {
              icon: Heart,
              title: "Patient Journey Tracking",
              description: "Complete patient history and treatment tracking for personalized care delivery.",
              benefits: ["Treatment history", "Prescription tracking", "Care coordination"]
            },
            {
              icon: BarChart,
              title: "Healthcare Analytics",
              description: "Track patient satisfaction, treatment outcomes, and operational efficiency.",
              benefits: ["Patient insights", "Revenue tracking", "Performance metrics"]
            },
            {
              icon: MessageSquare,
              title: "Multi-Channel Patient Engagement",
              description: "Reach patients through WhatsApp, SMS, email, and voice calls for maximum engagement.",
              benefits: ["WhatsApp integration", "Bulk messaging", "Personalized content"]
            },
            {
              icon: Shield,
              title: "HIPAA Compliant Security",
              description: "Bank-grade security ensuring complete patient data protection and regulatory compliance.",
              benefits: ["Data encryption", "Audit trails", "Compliance reporting"]
            }
          ]} />
        )
      },
      {
        id: "metrics",
        title: "Results That Matter",
        description: "See the measurable impact on your healthcare practice.",
        content: (
          <MetricCards metrics={[
            {
              icon: TrendingUp,
              title: "Patient Retention",
              value: "70%",
              description: "Increase in patient return visits"
            },
            {
              icon: Clock,
              title: "No-Show Reduction", 
              value: "65%",
              description: "Fewer missed appointments"
            },
            {
              icon: Users,
              title: "Patient Satisfaction",
              value: "95%",
              description: "Patient satisfaction rating"
            },
            {
              icon: DollarSign,
              title: "Revenue Growth",
              value: "40%",
              description: "Average revenue increase"
            }
          ]} />
        )
      },
      {
        id: "comparison",
        title: "Before vs After Implementation",
        content: (
          <ComparisonTable
            title="Healthcare Practice Transformation"
            comparisons={[
              {
                feature: "Appointment Scheduling",
                without: "Manual booking, frequent no-shows",
                with: "Automated scheduling, 70% fewer no-shows"
              },
              {
                feature: "Patient Communication",
                without: "Phone tag, missed calls",
                with: "Multi-channel automated messaging"
              },
              {
                feature: "Patient Records",
                without: "Paper files, treatment delays",
                with: "Digital records, instant access"
              },
              {
                feature: "Follow-up Care", 
                without: "Manual tracking, patients forgotten",
                with: "Automated care sequences"
              },
              {
                feature: "Emergency Response",
                without: "Patients call competitors",
                with: "24/7 automated triage system"
              }
            ]}
          />
        )
      },
      {
        id: "cta",
        title: "Ready to Transform Your Healthcare Practice?",
        subtitle: "Join 500+ Healthcare Providers Already Using In-Sync",
        description: "See how leading hospitals and clinics are building patient loyalty and growing their practice.",
        background: "gradient",
        content: (
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <DemoRequestModal
                trigger={
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                    Schedule Your Healthcare Demo
                  </Button>
                }
              />
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                Calculate Your ROI
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Free implementation support • 24/7 customer success • HIPAA compliant
            </p>
          </div>
        )
      }
    ],
    
    pageTitle: "Healthcare CRM Software India | Patient Management System | In-Sync",
    metaDescription: "Transform your healthcare practice with In-Sync's patient management system. Reduce no-shows by 70%, increase patient retention, and build lasting patient relationships. HIPAA compliant."
  };

  return <IndustryTemplate {...industryData} />;
};

export default Healthcare;