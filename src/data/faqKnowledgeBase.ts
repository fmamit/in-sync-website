export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
  relatedQuestions?: string[];
}

export const faqKnowledgeBase: FAQItem[] = [
  // General Platform Questions
  {
    id: "general-1",
    category: "General Platform",
    question: "What is In-Sync?",
    answer: "In-Sync is a comprehensive business automation platform that combines CRM, sales automation, marketing tools, AI-powered communication, field force management, and analytics in one integrated solution.",
    keywords: ["insync", "platform", "business", "automation", "crm", "what is", "about"]
  },
  {
    id: "general-2",
    category: "General Platform", 
    question: "What makes In-Sync different from other CRM platforms?",
    answer: "In-Sync offers unique features including: Gargi AI Agent for automated calling with massive cost savings (99.8% reduction), Built-in field force automation with location tracking, WhatsApp automation with 20MM+ messages processed, Custom BI dashboards and advanced analytics, Comprehensive integrations with accounting software (Tally, Busy)",
    keywords: ["different", "unique", "features", "comparison", "advantages", "gargi", "ai agent", "field force", "whatsapp", "bi dashboards"]
  },
  {
    id: "general-3",
    category: "General Platform",
    question: "Who is In-Sync designed for?",
    answer: "In-Sync is designed for businesses of all sizes that need: Sales teams requiring lead management and automation, Field operations requiring location tracking and mobile access, Companies using WhatsApp, SMS, and email for customer communication, Organizations needing integrated accounting and CRM solutions",
    keywords: ["designed for", "target", "audience", "businesses", "sales teams", "field operations", "companies"]
  },

  // CRM & Contact Management
  {
    id: "crm-1",
    category: "CRM & Contact Management",
    question: "How does the CRM functionality work?",
    answer: "In-Sync provides basic CRM functionality including: Contact management with complete customer history access, Lead status tracking through customizable pipelines, Customer interaction timeline and communication history, Data centralization across all customer touchpoints",
    keywords: ["crm", "functionality", "contact management", "customer history", "lead tracking", "pipelines", "interaction timeline"]
  },
  {
    id: "crm-2",
    category: "CRM & Contact Management",
    question: "Can I import my existing customer data?",
    answer: "Yes, In-Sync supports data centralization and master data handling. You can import data from: Excel files (highlighted integration), Other CRM systems via API connectivity, Google Forms, Lead sources like Apollo.io, Facebook, Google, LinkedIn, Instagram",
    keywords: ["import", "customer data", "data migration", "excel", "crm systems", "google forms", "apollo", "facebook", "linkedin"]
  },
  {
    id: "crm-3",
    category: "CRM & Contact Management",
    question: "How does lead status tracking work?",
    answer: "The platform provides: Lead qualification automation to score and prioritize leads, Conversion rate optimization tracking, Custom lead status workflows, Pipeline management with visual dashboards",
    keywords: ["lead status", "tracking", "qualification", "automation", "conversion", "workflows", "pipeline", "dashboards"]
  },
  {
    id: "crm-4",
    category: "CRM & Contact Management",
    question: "What customer history is available?",
    answer: "Users have instant customer history access including: All previous communications (calls, emails, WhatsApp, SMS), Purchase history and transaction records, Support tickets and resolutions, Field service visits and reports",
    keywords: ["customer history", "communications", "purchase history", "support tickets", "field service", "reports"]
  },

  // Sales & Marketing Features
  {
    id: "sales-1",
    category: "Sales & Marketing",
    question: "How does lead qualification automation work?",
    answer: "In-Sync uses AI-powered targeting to: Automatically score leads based on behavior and demographics, Route qualified leads to appropriate sales representatives, Trigger automated follow-up sequences, Provide lead quality insights for optimization",
    keywords: ["lead qualification", "automation", "ai-powered", "targeting", "scoring", "routing", "follow-up", "insights"]
  },
  {
    id: "sales-2",
    category: "Sales & Marketing",
    question: "What marketing automation features are available?",
    answer: "The platform includes comprehensive Marketing Automation: WhatsApp automation for customer engagement, Email automation with drip campaigns, SMS automation for instant notifications, Drip Marketing campaigns with measurable impact, Campaign execution tools with performance tracking",
    keywords: ["marketing automation", "whatsapp automation", "email automation", "sms automation", "drip campaigns", "campaign execution"]
  },
  {
    id: "sales-3",
    category: "Sales & Marketing",
    question: "How do automated follow-ups work?",
    answer: "Automated follow-ups include: Email sequences triggered by customer actions, WhatsApp follow-ups for abandoned carts or inquiries, SMS reminders for appointments or payments, Task creation for sales representatives",
    keywords: ["automated follow-ups", "email sequences", "whatsapp follow-ups", "sms reminders", "task creation"]
  },
  {
    id: "sales-4",
    category: "Sales & Marketing",
    question: "Can I track campaign performance?",
    answer: "Yes, the platform provides measurable campaign impact through: Campaign ROI analysis, Conversion tracking across channels, Customer engagement metrics, A/B testing capabilities for optimization",
    keywords: ["campaign performance", "tracking", "roi analysis", "conversion tracking", "engagement metrics", "a/b testing"]
  },

  // Gargi AI Agent & Communication
  {
    id: "gargi-1",
    category: "Gargi AI Agent & Communication",
    question: "What is the Gargi AI Agent?",
    answer: "Gargi AI Agent is In-Sync's proprietary AI-driven calling system that provides: AI-driven automated calling for lead follow-up, Auto Dialer capabilities for high-volume calling, Click to Call functionality directly from the CRM, IVR (Interactive Voice Response) for customer routing",
    keywords: ["gargi ai agent", "ai-driven calling", "automated calling", "auto dialer", "click to call", "ivr"]
  },
  {
    id: "gargi-2",
    category: "Gargi AI Agent & Communication",
    question: "How much can I save with Gargi AI Agent?",
    answer: "According to case studies, Gargi AI Agent delivers massive cost savings with 99.8% reduction in calling costs compared to traditional calling methods.",
    keywords: ["cost savings", "gargi savings", "99.8% reduction", "calling costs", "traditional calling"]
  },
  {
    id: "comm-1",
    category: "Gargi AI Agent & Communication",
    question: "What communication channels does In-Sync support?",
    answer: "In-Sync supports multiple communication channels: WhatsApp API integration (via Kaleyra), SMS capabilities (via Route Mobile), Email functionality (via Elastic Email), Voice calling through Gargi AI Agent, 20MM+ messages processed across all channels",
    keywords: ["communication channels", "whatsapp api", "sms", "email", "voice calling", "kaleyra", "route mobile", "elastic email"]
  },
  {
    id: "comm-2",
    category: "Gargi AI Agent & Communication",
    question: "How does WhatsApp automation work?",
    answer: "WhatsApp automation includes: Automated welcome messages for new contacts, Drip campaigns via WhatsApp, Order confirmations and shipping updates, Support ticket notifications, Bulk messaging capabilities",
    keywords: ["whatsapp automation", "welcome messages", "drip campaigns", "order confirmations", "support notifications", "bulk messaging"]
  },

  // Task & Workflow Management
  {
    id: "workflow-1",
    category: "Task & Workflow Management",
    question: "How do task reminders work?",
    answer: "Task Reminders include: Automated follow-up reminders based on lead activity, Appointment scheduling reminders, Payment due date notifications, Custom task assignments with deadlines",
    keywords: ["task reminders", "follow-up reminders", "appointment reminders", "payment notifications", "custom tasks", "deadlines"]
  },
  {
    id: "workflow-2",
    category: "Task & Workflow Management",
    question: "What are Workflow Journeys?",
    answer: "Workflow Journeys are automated sequences that: Guide customers through predefined processes, Trigger actions based on customer behavior, Automate lead nurturing sequences, Streamline internal processes",
    keywords: ["workflow journeys", "automated sequences", "customer processes", "trigger actions", "lead nurturing", "internal processes"]
  },
  {
    id: "workflow-3",
    category: "Task & Workflow Management",
    question: "Can I create custom workflows?",
    answer: "Yes, Custom Workflows allow you to: Design unique business processes, Set trigger conditions and actions, Integrate multiple channels (email, WhatsApp, SMS), Create approval workflows for team collaboration",
    keywords: ["custom workflows", "business processes", "trigger conditions", "multiple channels", "approval workflows", "team collaboration"]
  },
  {
    id: "workflow-4",
    category: "Task & Workflow Management",
    question: "How does the scheduler work?",
    answer: "The Scheduler provides: Calendar integration with Google Calendar and other platforms, Appointment booking with automatic confirmations, Task Planner for daily/weekly planning, Team scheduling and availability management",
    keywords: ["scheduler", "calendar integration", "appointment booking", "task planner", "team scheduling", "availability management"]
  },

  // Field Operations
  {
    id: "field-1",
    category: "Field Operations",
    question: "What is Field Force Automation?",
    answer: "Field Force Automation includes: Location Tracking for field representatives, Live Reporting from field visits, Selfie verification for attendance and location confirmation, Team productivity insights through analytics, Mobile App access for on-the-go management",
    keywords: ["field force automation", "location tracking", "live reporting", "selfie verification", "productivity insights", "mobile app"]
  },
  {
    id: "field-2",
    category: "Field Operations",
    question: "How does location tracking work?",
    answer: "Location Tracking provides: Real-time GPS tracking of field staff, Route optimization for efficiency, Geofenced area alerts, Time and location stamps for activities",
    keywords: ["location tracking", "gps tracking", "route optimization", "geofenced alerts", "time stamps"]
  },
  {
    id: "field-3",
    category: "Field Operations",
    question: "What mobile capabilities are available?",
    answer: "The Mobile App access includes: Complete CRM functionality on mobile, Field reporting and data collection, Photo and document capture, Offline capability with sync when online",
    keywords: ["mobile capabilities", "mobile app", "crm functionality", "field reporting", "photo capture", "offline capability"]
  },
  {
    id: "field-4",
    category: "Field Operations",
    question: "How can I monitor team productivity?",
    answer: "Team productivity insights include: Field visit completion rates, Time spent at customer locations, Daily/weekly activity reports, Performance comparison across team members",
    keywords: ["team productivity", "monitor", "visit completion", "activity reports", "performance comparison"]
  },

  // Finance & Collections
  {
    id: "finance-1",
    category: "Finance & Collections",
    question: "How do automated payment reminders work?",
    answer: "Automated payment reminders include: SMS and WhatsApp notifications for due payments, Email reminders with payment links, Escalation sequences for overdue accounts, Integration with accounting software for balance updates",
    keywords: ["payment reminders", "automated", "sms notifications", "whatsapp notifications", "email reminders", "escalation", "accounting integration"]
  },
  {
    id: "finance-2",
    category: "Finance & Collections",
    question: "What collections management features are available?",
    answer: "Collections management provides: Real-time tracking of outstanding payments, Automated dunning processes, Customer payment history analysis, Faster payment processing through integrated gateways",
    keywords: ["collections management", "outstanding payments", "dunning processes", "payment history", "payment processing"]
  },
  {
    id: "finance-3",
    category: "Finance & Collections",
    question: "How does integration with accounting software work?",
    answer: "In-Sync integrates with: Tally accounting software for invoice and payment sync, Busy accounting software for financial data integration, Real-time balance updates, Automated reconciliation processes",
    keywords: ["accounting integration", "tally", "busy", "invoice sync", "financial data", "balance updates", "reconciliation"]
  },

  // Analytics & Reporting
  {
    id: "analytics-1",
    category: "Analytics & Reporting",
    question: "What Business Intelligence features are available?",
    answer: "Business Intelligence includes: Custom BI Dashboards (available on Scale plan), Analytics integration with third-party tools, Reporting capabilities with automated scheduling, Real-time performance metrics",
    keywords: ["business intelligence", "bi dashboards", "analytics integration", "reporting capabilities", "performance metrics"]
  },
  {
    id: "analytics-2",
    category: "Analytics & Reporting",
    question: "What types of reports can I generate?",
    answer: "Reporting capabilities include: Sales performance reports, Campaign effectiveness analysis, Field team productivity reports, Customer engagement metrics, Financial performance dashboards",
    keywords: ["reports", "sales performance", "campaign effectiveness", "field team productivity", "customer engagement", "financial performance"]
  },
  {
    id: "analytics-3",
    category: "Analytics & Reporting",
    question: "How does live reporting work?",
    answer: "Live Reporting provides: Real-time field activity updates, Instant customer interaction tracking, Live dashboard updates, Mobile-generated reports from field teams",
    keywords: ["live reporting", "field activity", "customer interaction", "dashboard updates", "mobile reports"]
  },

  // Integrations
  {
    id: "integration-1",
    category: "Integrations",
    question: "What pre-built integrations are available?",
    answer: "Pre-built Integrations include: Accounting & ERP (Tally, Busy, Excel), Communication (WhatsApp API via Kaleyra, SMS via Route Mobile, Email via Elastic Email), Productivity & Data (Google Forms, Calendar apps, Analytics tools, ETL tools), Lead Sources (Apollo.io, Facebook, Google, LinkedIn, Instagram), Specialized Tools (ScoreMe validation, Unlayer EDM)",
    keywords: ["integrations", "pre-built", "tally", "busy", "excel", "whatsapp", "sms", "email", "google forms", "apollo", "facebook", "linkedin"]
  },
  {
    id: "integration-2", 
    category: "Integrations",
    question: "Can I create custom integrations?",
    answer: "Yes, Custom Integration provides: Tailored integrations for specific business needs, Full flexibility for custom connections, API development support, Custom webhook configurations",
    keywords: ["custom integrations", "tailored", "flexibility", "api development", "webhooks"]
  },
  {
    id: "integration-3",
    category: "Integrations", 
    question: "How does API connectivity work?",
    answer: "API connectivity through Zapier allows: Connection to 1000+ applications, Custom automation workflows, Real-time data synchronization, No-code integration setup",
    keywords: ["api connectivity", "zapier", "applications", "automation workflows", "data synchronization", "no-code"]
  },

  // Security & Data Protection
  {
    id: "security-1",
    category: "Security & Data Protection",
    question: "What security measures does In-Sync provide?",
    answer: "Security Features include: Azure cloud hosting for enterprise-grade security, Separate cloud instance per client for data isolation, On-premise private cloud option for maximum control, 2-factor authentication for enhanced access security",
    keywords: ["security measures", "azure cloud", "enterprise security", "cloud instance", "data isolation", "on-premise", "2-factor authentication"]
  },
  {
    id: "security-2",
    category: "Security & Data Protection",
    question: "How is my data protected?",
    answer: "Data protection includes: NDA for data security and ownership agreements, Auto log-off after inactivity to prevent unauthorized access, Authorized personnel access controls with role-based permissions, Encrypted data transmission and storage",
    keywords: ["data protection", "nda", "data security", "auto log-off", "access controls", "role-based permissions", "encrypted"]
  },
  {
    id: "security-3",
    category: "Security & Data Protection",
    question: "Can I have my own dedicated instance?",
    answer: "Yes, In-Sync provides separate cloud instance per client ensuring: Complete data isolation, Customizable security configurations, Dedicated resources for performance, Compliance with industry regulations",
    keywords: ["dedicated instance", "cloud instance", "data isolation", "security configurations", "dedicated resources", "compliance"]
  },
  {
    id: "security-4",
    category: "Security & Data Protection",
    question: "What access controls are available?",
    answer: "Authorized personnel access controls include: Role-based permission systems, User activity logging and monitoring, Multi-level approval workflows, Custom access restrictions by data type",
    keywords: ["access controls", "role-based permissions", "activity logging", "approval workflows", "access restrictions"]
  },

  // Troubleshooting & Technical Issues
  {
    id: "trouble-1",
    category: "Troubleshooting",
    question: "My WhatsApp messages are not getting delivered. What should I do?",
    answer: "If you're experiencing issues with WhatsApp message delivery, our support team will investigate this immediately. Message delivery issues can be caused by various factors including API limits, recipient settings, or temporary service interruptions. Please contact our support team with details about the affected messages, and we'll work with you for a quick resolution.",
    keywords: ["whatsapp", "messages", "not delivered", "delivery issues", "api limits", "service interruptions", "support"]
  },
  {
    id: "trouble-2",
    category: "Troubleshooting",
    question: "The Gargi AI Agent calling feature is not working. How can I get this fixed?",
    answer: "Calling system issues require immediate attention to minimize business impact. Our technical team will prioritize any Gargi AI Agent downtime or functionality issues. Please reach out to our support team immediately with details about the specific calling problems you're experiencing, and we'll ensure a quick resolution to restore your calling capabilities.",
    keywords: ["gargi", "ai agent", "calling", "not working", "downtime", "functionality issues", "support team"]
  },
  {
    id: "trouble-3",
    category: "Troubleshooting",
    question: "My SMS messages are not being sent. What's the next step?",
    answer: "SMS delivery issues can affect your customer communication significantly. Our support team will work with our SMS provider (Route Mobile) to identify and resolve any delivery problems. Please contact our support team with information about failed SMS attempts, and we'll coordinate with our technical team for a quick resolution.",
    keywords: ["sms", "messages", "not sent", "delivery issues", "route mobile", "failed attempts", "support"]
  },
  {
    id: "trouble-4",
    category: "Troubleshooting",
    question: "The mobile app is not syncing with the main platform. How do I fix this?",
    answer: "Mobile app synchronization issues can impact field operations. Our support team will investigate sync problems and work with you to restore full mobile functionality. Please contact our support team with details about what data isn't syncing, and we'll ensure a quick resolution to maintain your field operations.",
    keywords: ["mobile app", "not syncing", "synchronization issues", "field operations", "sync problems", "mobile functionality"]
  },
  {
    id: "trouble-5",
    category: "Troubleshooting",
    question: "My integrations (Tally/Busy/Excel) are not working properly. Who can help?",
    answer: "Integration issues can disrupt your workflow and data consistency. Our technical team specializes in resolving integration problems quickly. Please contact our support team with details about which integration is affected and the specific issues you're experiencing. We'll coordinate with our integration specialists for a quick resolution.",
    keywords: ["integrations", "tally", "busy", "excel", "not working", "workflow", "data consistency", "integration specialists"]
  },

  // Plans & Pricing
  {
    id: "pricing-1",
    category: "Plans & Pricing",
    question: "What plans are available?",
    answer: "In-Sync offers multiple plans including: Scale plan - includes Custom BI Dashboards and advanced features, Additional plans for different business sizes and needs, Custom enterprise solutions",
    keywords: ["plans", "available", "scale plan", "bi dashboards", "enterprise solutions", "business sizes"]
  },
  {
    id: "pricing-2",
    category: "Plans & Pricing",
    question: "What's included in the Scale plan?",
    answer: "The Scale plan includes: Custom BI Dashboards for advanced analytics, All core CRM and automation features, Advanced integrations, Premium support",
    keywords: ["scale plan", "included", "bi dashboards", "analytics", "crm features", "automation", "integrations", "premium support"]
  },
  {
    id: "pricing-3",
    category: "Plans & Pricing",
    question: "Is there a free trial available?",
    answer: "Contact In-Sync sales team for trial options and plan details specific to your business needs.",
    keywords: ["free trial", "trial options", "sales team", "business needs"]
  },
  {
    id: "pricing-4",
    category: "Plans & Pricing",
    question: "How is pricing structured?",
    answer: "Pricing varies based on: Number of users, Features required, Integration complexity, Support level needed",
    keywords: ["pricing", "structured", "users", "features", "integration complexity", "support level"]
  },

  // Getting Started
  {
    id: "started-1",
    category: "Getting Started",
    question: "How do I set up In-Sync for my business?",
    answer: "Setup process includes: 1. Initial consultation to understand business needs, 2. Data Centralization from existing systems, 3. Custom Workflows configuration, 4. Team training and onboarding, 5. Go-live support",
    keywords: ["setup", "business setup", "consultation", "data centralization", "custom workflows", "training", "onboarding", "go-live"]
  },
  {
    id: "started-2",
    category: "Getting Started",
    question: "What training is provided?",
    answer: "Training includes: Platform overview and navigation, Feature-specific training sessions, Mobile App access training for field teams, Ongoing support and best practices",
    keywords: ["training", "platform overview", "navigation", "feature training", "mobile app training", "field teams", "ongoing support"]
  },
  {
    id: "started-3",
    category: "Getting Started",
    question: "How long does implementation take?",
    answer: "Implementation timeline depends on: Business complexity, Number of integrations required, Data migration scope, Team size and training needs",
    keywords: ["implementation", "timeline", "business complexity", "integrations", "data migration", "team size", "training needs"]
  },
  {
    id: "started-4",
    category: "Getting Started",
    question: "What support is available?",
    answer: "Support includes: Technical setup assistance, User training and onboarding, Ongoing customer success management, Integration support and troubleshooting",
    keywords: ["support", "technical setup", "user training", "customer success", "integration support", "troubleshooting"]
  }
];

// Utility functions for semantic matching
export const findMatchingFAQs = (userQuery: string): FAQItem[] => {
  const query = userQuery.toLowerCase();
  const queryWords = query.split(/\s+/).filter(word => word.length > 2);
  
  const scores = faqKnowledgeBase.map(faq => {
    let score = 0;
    
    // Exact question match gets highest score
    if (faq.question.toLowerCase().includes(query)) {
      score += 100;
    }
    
    // Keyword matching
    faq.keywords.forEach(keyword => {
      if (query.includes(keyword.toLowerCase())) {
        score += 10;
      }
      // Partial keyword matching
      queryWords.forEach(word => {
        if (keyword.toLowerCase().includes(word)) {
          score += 5;
        }
      });
    });
    
    // Answer content matching (lower weight)
    queryWords.forEach(word => {
      if (faq.answer.toLowerCase().includes(word)) {
        score += 2;
      }
    });
    
    return { faq, score };
  });
  
  // Return FAQs with score > 0, sorted by score descending
  return scores
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5) // Top 5 matches
    .map(item => item.faq);
};

export const getResponseForQuery = (userQuery: string): string => {
  const matches = findMatchingFAQs(userQuery);
  
  if (matches.length === 0) {
    return "I understand you're asking about this topic, but I don't have a specific answer in my knowledge base. Please contact our support team for personalized assistance, or try rephrasing your question with different keywords.";
  }
  
  if (matches.length === 1) {
    return matches[0].answer;
  }
  
  // Multiple matches - provide the best match and mention others
  const bestMatch = matches[0];
  const otherCategories = matches.slice(1, 3).map(m => m.category);
  
  let response = bestMatch.answer;
  
  if (otherCategories.length > 0) {
    response += `\n\nYour question also relates to: ${otherCategories.join(", ")}. Would you like me to provide information about any of these areas?`;
  }
  
  return response;
};