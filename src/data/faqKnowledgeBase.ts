export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
  relatedQuestions?: string[];
}

interface ScoredFAQItem extends FAQItem {
  score: number;
}

export const faqKnowledgeBase: FAQItem[] = [
  // General Platform Questions
  {
    id: "what-is-insync",
    category: "General Platform",
    question: "What is In-Sync?",
    answer: "In-Sync is a comprehensive business automation platform that combines CRM, sales automation, marketing tools, AI-powered communication, field force management, and analytics in one integrated solution.",
    keywords: ["platform", "business automation", "CRM", "sales", "marketing", "AI", "field force", "analytics"],
    relatedQuestions: ["What makes In-Sync different?", "Who is In-Sync designed for?"]
  },
  {
    id: "what-makes-insync-different",
    category: "General Platform",
    question: "What makes In-Sync different from other CRM platforms?",
    answer: "In-Sync offers unique features including: Gargi AI Agent for automated calling with massive cost savings (99.8% reduction), built-in field force automation with location tracking, WhatsApp automation with 20MM+ messages processed, custom BI dashboards and advanced analytics, and comprehensive integrations with accounting software (Tally, Busy).",
    keywords: ["Gargi AI", "field force", "WhatsApp", "automation", "BI dashboards", "integrations", "cost savings"],
    relatedQuestions: ["What is the Gargi AI Agent?", "How does field force automation work?"]
  },
  {
    id: "who-is-insync-for",
    category: "General Platform",
    question: "Who is In-Sync designed for?",
    answer: "In-Sync is designed for businesses of all sizes that need: sales teams requiring lead management and automation, field operations requiring location tracking and mobile access, companies using WhatsApp, SMS, and email for customer communication, and organizations needing integrated accounting and CRM solutions.",
    keywords: ["businesses", "sales teams", "field operations", "communication", "accounting", "CRM"],
    relatedQuestions: ["What is In-Sync?", "What features are available?"]
  },

  // CRM & Contact Management
  {
    id: "crm-functionality",
    category: "CRM & Contact Management",
    question: "How does the CRM functionality work?",
    answer: "In-Sync provides basic CRM functionality including: contact management with complete customer history access, lead status tracking through customizable pipelines, customer interaction timeline and communication history, and data centralization across all customer touchpoints.",
    keywords: ["CRM", "contact management", "customer history", "lead tracking", "pipelines", "data centralization"],
    relatedQuestions: ["Can I import existing data?", "How does lead tracking work?"]
  },
  {
    id: "import-customer-data",
    category: "CRM & Contact Management",
    question: "Can I import my existing customer data?",
    answer: "Yes, In-Sync supports data centralization and master data handling. You can import data from: Excel files (highlighted integration), other CRM systems via API connectivity, Google Forms, and lead sources like Apollo.io, Facebook, Google, LinkedIn, Instagram.",
    keywords: ["data import", "Excel", "API", "Google Forms", "lead sources", "data migration"],
    relatedQuestions: ["How does data migration work?", "What integrations are available?"]
  },
  {
    id: "lead-status-tracking",
    category: "CRM & Contact Management",
    question: "How does lead status tracking work?",
    answer: "The platform provides: lead qualification automation to score and prioritize leads, conversion rate optimization tracking, custom lead status workflows, and pipeline management with visual dashboards.",
    keywords: ["lead tracking", "qualification", "scoring", "conversion", "workflows", "pipelines"],
    relatedQuestions: ["How does lead qualification work?", "What dashboards are available?"]
  },
  {
    id: "customer-history",
    category: "CRM & Contact Management",
    question: "What customer history is available?",
    answer: "Users have instant customer history access including: all previous communications (calls, emails, WhatsApp, SMS), purchase history and transaction records, support tickets and resolutions, and field service visits and reports.",
    keywords: ["customer history", "communications", "purchase history", "support tickets", "field service"],
    relatedQuestions: ["How does communication tracking work?", "What reports are available?"]
  },

  // Sales & Marketing Features
  {
    id: "lead-qualification-automation",
    category: "Sales & Marketing",
    question: "How does lead qualification automation work?",
    answer: "In-Sync uses AI-powered targeting to: automatically score leads based on behavior and demographics, route qualified leads to appropriate sales representatives, trigger automated follow-up sequences, and provide lead quality insights for optimization.",
    keywords: ["lead qualification", "AI targeting", "scoring", "routing", "follow-up", "automation"],
    relatedQuestions: ["How do automated follow-ups work?", "What AI features are available?"]
  },
  {
    id: "marketing-automation",
    category: "Sales & Marketing",
    question: "What marketing automation features are available?",
    answer: "The platform includes comprehensive Marketing Automation: WhatsApp automation for customer engagement, email automation with drip campaigns, SMS automation for instant notifications, drip marketing campaigns with measurable impact, and campaign execution tools with performance tracking.",
    keywords: ["marketing automation", "WhatsApp", "email", "SMS", "drip campaigns", "performance tracking"],
    relatedQuestions: ["How does WhatsApp automation work?", "Can I track campaign performance?"]
  },
  {
    id: "automated-followups",
    category: "Sales & Marketing",
    question: "How do automated follow-ups work?",
    answer: "Automated follow-ups include: email sequences triggered by customer actions, WhatsApp follow-ups for abandoned carts or inquiries, SMS reminders for appointments or payments, and task creation for sales representatives.",
    keywords: ["automated follow-ups", "email sequences", "WhatsApp", "SMS reminders", "tasks"],
    relatedQuestions: ["What marketing automation is available?", "How does task management work?"]
  },
  {
    id: "campaign-performance",
    category: "Sales & Marketing",
    question: "Can I track campaign performance?",
    answer: "Yes, the platform provides measurable campaign impact through: campaign ROI analysis, conversion tracking across channels, customer engagement metrics, and A/B testing capabilities for optimization.",
    keywords: ["campaign performance", "ROI analysis", "conversion tracking", "engagement metrics", "A/B testing"],
    relatedQuestions: ["What analytics are available?", "How does reporting work?"]
  },

  // Gargi AI Agent & Communication
  {
    id: "gargi-ai-agent",
    category: "Gargi AI Agent",
    question: "What is the Gargi AI Agent?",
    answer: "Gargi AI Agent is In-Sync's proprietary AI-driven calling system that provides: AI-driven automated calling for lead follow-up, Auto Dialer capabilities for high-volume calling, Click to Call functionality directly from the CRM, and IVR (Interactive Voice Response) for customer routing.",
    keywords: ["Gargi AI", "automated calling", "auto dialer", "click to call", "IVR", "AI-driven"],
    relatedQuestions: ["How much can I save with Gargi AI?", "What communication channels are supported?"]
  },
  {
    id: "gargi-cost-savings",
    category: "Gargi AI Agent",
    question: "How much can I save with Gargi AI Agent?",
    answer: "According to case studies, Gargi AI Agent delivers massive cost savings with 99.8% reduction in calling costs compared to traditional calling methods.",
    keywords: ["cost savings", "99.8% reduction", "calling costs", "case studies", "ROI"],
    relatedQuestions: ["What is the Gargi AI Agent?", "How does automated calling work?"]
  },
  {
    id: "communication-channels",
    category: "Gargi AI Agent",
    question: "What communication channels does In-Sync support?",
    answer: "In-Sync supports multiple communication channels: WhatsApp API integration (via Kaleyra), SMS capabilities (via Route Mobile), email functionality (via Elastic Email), voice calling through Gargi AI Agent, with 20MM+ messages processed across all channels.",
    keywords: ["communication channels", "WhatsApp", "SMS", "email", "voice calling", "Kaleyra", "Route Mobile"],
    relatedQuestions: ["How does WhatsApp automation work?", "What is the Gargi AI Agent?"]
  },
  {
    id: "whatsapp-automation",
    category: "Gargi AI Agent",
    question: "How does WhatsApp automation work?",
    answer: "WhatsApp automation includes: automated welcome messages for new contacts, drip campaigns via WhatsApp, order confirmations and shipping updates, support ticket notifications, and bulk messaging capabilities.",
    keywords: ["WhatsApp automation", "welcome messages", "drip campaigns", "order confirmations", "bulk messaging"],
    relatedQuestions: ["What communication channels are available?", "How does marketing automation work?"]
  },

  // Task & Workflow Management
  {
    id: "task-reminders",
    category: "Task & Workflow Management",
    question: "How do task reminders work?",
    answer: "Task Reminders include: automated follow-up reminders based on lead activity, appointment scheduling reminders, payment due date notifications, and custom task assignments with deadlines.",
    keywords: ["task reminders", "follow-up", "appointments", "payment reminders", "deadlines"],
    relatedQuestions: ["What are Workflow Journeys?", "How does the scheduler work?"]
  },
  {
    id: "workflow-journeys",
    category: "Task & Workflow Management",
    question: "What are Workflow Journeys?",
    answer: "Workflow Journeys are automated sequences that: guide customers through predefined processes, trigger actions based on customer behavior, automate lead nurturing sequences, and streamline internal processes.",
    keywords: ["workflow journeys", "automated sequences", "customer behavior", "lead nurturing", "processes"],
    relatedQuestions: ["Can I create custom workflows?", "How do task reminders work?"]
  },
  {
    id: "custom-workflows",
    category: "Task & Workflow Management",
    question: "Can I create custom workflows?",
    answer: "Yes, Custom Workflows allow you to: design unique business processes, set trigger conditions and actions, integrate multiple channels (email, WhatsApp, SMS), and create approval workflows for team collaboration.",
    keywords: ["custom workflows", "business processes", "triggers", "multi-channel", "approvals"],
    relatedQuestions: ["What are Workflow Journeys?", "How does integration work?"]
  },
  {
    id: "scheduler",
    category: "Task & Workflow Management",
    question: "How does the scheduler work?",
    answer: "The Scheduler provides: calendar integration with Google Calendar and other platforms, appointment booking with automatic confirmations, task planner for daily/weekly planning, and team scheduling and availability management.",
    keywords: ["scheduler", "calendar integration", "appointments", "task planner", "team scheduling"],
    relatedQuestions: ["How do task reminders work?", "What integrations are available?"]
  },

  // Field Operations
  {
    id: "field-force-automation",
    category: "Field Operations",
    question: "What is Field Force Automation?",
    answer: "Field Force Automation includes: location tracking for field representatives, live reporting from field visits, selfie verification for attendance and location confirmation, team productivity insights through analytics, and mobile app access for on-the-go management.",
    keywords: ["field force", "location tracking", "live reporting", "selfie verification", "mobile app"],
    relatedQuestions: ["How does location tracking work?", "What mobile capabilities are available?"]
  },
  {
    id: "location-tracking",
    category: "Field Operations",
    question: "How does location tracking work?",
    answer: "Location Tracking provides: real-time GPS tracking of field staff, route optimization for efficiency, geofenced area alerts, and time and location stamps for activities.",
    keywords: ["location tracking", "GPS", "route optimization", "geofencing", "time stamps"],
    relatedQuestions: ["What is Field Force Automation?", "How can I monitor team productivity?"]
  },
  {
    id: "mobile-capabilities",
    category: "Field Operations",
    question: "What mobile capabilities are available?",
    answer: "The Mobile App access includes: complete CRM functionality on mobile, field reporting and data collection, photo and document capture, and offline capability with sync when online.",
    keywords: ["mobile app", "CRM mobile", "field reporting", "photo capture", "offline sync"],
    relatedQuestions: ["What is Field Force Automation?", "How does data sync work?"]
  },
  {
    id: "team-productivity",
    category: "Field Operations",
    question: "How can I monitor team productivity?",
    answer: "Team productivity insights include: field visit completion rates, time spent at customer locations, daily/weekly activity reports, and performance comparison across team members.",
    keywords: ["team productivity", "visit completion", "activity reports", "performance comparison"],
    relatedQuestions: ["What is Field Force Automation?", "What reports are available?"]
  },

  // Finance & Collections
  {
    id: "automated-payment-reminders",
    category: "Finance",
    question: "How do automated payment reminders work?",
    answer: "Automated payment reminders include: SMS and WhatsApp notifications for due payments, email reminders with payment links, escalation sequences for overdue accounts, and integration with accounting software for balance updates.",
    keywords: ["payment reminders", "SMS", "WhatsApp", "email", "overdue", "accounting integration"],
    relatedQuestions: ["What collections management features are available?", "How does accounting integration work?"]
  },
  {
    id: "collections-management",
    category: "Finance",
    question: "What collections management features are available?",
    answer: "Collections management provides: real-time tracking of outstanding payments, automated dunning processes, customer payment history analysis, and faster payment processing through integrated gateways.",
    keywords: ["collections", "outstanding payments", "dunning", "payment history", "payment processing"],
    relatedQuestions: ["How do payment reminders work?", "What finance integrations are available?"]
  },
  {
    id: "accounting-integration",
    category: "Finance",
    question: "How does integration with accounting software work?",
    answer: "In-Sync integrates with: Tally accounting software for invoice and payment sync, Busy accounting software for financial data integration, real-time balance updates, and automated reconciliation processes.",
    keywords: ["accounting integration", "Tally", "Busy", "invoice sync", "reconciliation"],
    relatedQuestions: ["What integrations are available?", "How does data sync work?"]
  },

  // Analytics & Reporting
  {
    id: "business-intelligence",
    category: "Analytics",
    question: "What Business Intelligence features are available?",
    answer: "Business Intelligence includes: Custom BI Dashboards (available on Scale plan), analytics integration with third-party tools, reporting capabilities with automated scheduling, and real-time performance metrics.",
    keywords: ["business intelligence", "BI dashboards", "analytics", "reporting", "performance metrics"],
    relatedQuestions: ["What types of reports can I generate?", "How does live reporting work?"]
  },
  {
    id: "report-types",
    category: "Analytics",
    question: "What types of reports can I generate?",
    answer: "Reporting capabilities include: sales performance reports, campaign effectiveness analysis, field team productivity reports, customer engagement metrics, and financial performance dashboards.",
    keywords: ["reports", "sales performance", "campaign analysis", "team productivity", "engagement metrics"],
    relatedQuestions: ["What BI features are available?", "How does live reporting work?"]
  },
  {
    id: "live-reporting",
    category: "Analytics",
    question: "How does live reporting work?",
    answer: "Live Reporting provides: real-time field activity updates, instant customer interaction tracking, live dashboard updates, and mobile-generated reports from field teams.",
    keywords: ["live reporting", "real-time updates", "customer tracking", "mobile reports"],
    relatedQuestions: ["What reports are available?", "How does field force work?"]
  },

  // Integrations
  {
    id: "prebuilt-integrations",
    category: "Integrations",
    question: "What pre-built integrations are available?",
    answer: "Pre-built Integrations include: Accounting & ERP (Tally, Busy, Excel), Communication (WhatsApp API via Kaleyra, SMS via Route Mobile, Email via Elastic Email), Productivity & Data (Google Forms, Calendar apps, Analytics tools, ETL tools), Lead Sources (Apollo.io, Facebook, Google, LinkedIn, Instagram), and Specialized Tools (ScoreMe, Unlayer).",
    keywords: ["integrations", "Tally", "Busy", "WhatsApp", "SMS", "email", "Google Forms", "lead sources"],
    relatedQuestions: ["Can I create custom integrations?", "How does API connectivity work?"]
  },
  {
    id: "custom-integrations",
    category: "Integrations",
    question: "Can I create custom integrations?",
    answer: "Yes, Custom Integration provides: tailored integrations for specific business needs, full flexibility for custom connections, API development support, and custom webhook configurations.",
    keywords: ["custom integrations", "tailored", "API development", "webhooks", "flexibility"],
    relatedQuestions: ["What pre-built integrations are available?", "How does API connectivity work?"]
  },
  {
    id: "api-connectivity",
    category: "Integrations",
    question: "How does API connectivity work?",
    answer: "API connectivity through Zapier allows: connection to 1000+ applications, custom automation workflows, real-time data synchronization, and no-code integration setup.",
    keywords: ["API connectivity", "Zapier", "automation workflows", "data sync", "no-code"],
    relatedQuestions: ["What integrations are available?", "Can I create custom integrations?"]
  },

  // Security & Data Protection
  {
    id: "security-measures",
    category: "Security",
    question: "What security measures does In-Sync provide?",
    answer: "Security Features include: Azure cloud hosting for enterprise-grade security, separate cloud instance per client for data isolation, on-premise private cloud option for maximum control, and 2-factor authentication for enhanced access security.",
    keywords: ["security", "Azure cloud", "data isolation", "private cloud", "2-factor authentication"],
    relatedQuestions: ["How is my data protected?", "Can I have my own dedicated instance?"]
  },
  {
    id: "data-protection",
    category: "Security",
    question: "How is my data protected?",
    answer: "Data protection includes: NDA for data security and ownership agreements, auto log-off after inactivity to prevent unauthorized access, authorized personnel access controls with role-based permissions, and encrypted data transmission and storage.",
    keywords: ["data protection", "NDA", "auto log-off", "access controls", "encryption"],
    relatedQuestions: ["What security measures are available?", "What access controls are available?"]
  },
  {
    id: "dedicated-instance",
    category: "Security",
    question: "Can I have my own dedicated instance?",
    answer: "Yes, In-Sync provides separate cloud instance per client ensuring: complete data isolation, customizable security configurations, dedicated resources for performance, and compliance with industry regulations.",
    keywords: ["dedicated instance", "data isolation", "customizable security", "compliance"],
    relatedQuestions: ["What security measures are available?", "How is data protected?"]
  },
  {
    id: "access-controls",
    category: "Security",
    question: "What access controls are available?",
    answer: "Authorized personnel access controls include: role-based permission systems, user activity logging and monitoring, multi-level approval workflows, and custom access restrictions by data type.",
    keywords: ["access controls", "role-based permissions", "activity logging", "approval workflows"],
    relatedQuestions: ["How is my data protected?", "What security features are available?"]
  },

  // Troubleshooting & Technical Issues
  {
    id: "whatsapp-delivery-issues",
    category: "Troubleshooting",
    question: "My WhatsApp messages are not getting delivered. What should I do?",
    answer: "If you're experiencing issues with WhatsApp message delivery, our support team will investigate this immediately. Message delivery issues can be caused by various factors including API limits, recipient settings, or temporary service interruptions. Please contact our support team with details about the affected messages, and we'll work with you for a quick resolution.",
    keywords: ["WhatsApp", "message delivery", "API limits", "support", "troubleshooting"],
    relatedQuestions: ["How do I contact support?", "What communication channels are available?"]
  },
  {
    id: "gargi-calling-issues",
    category: "Troubleshooting",
    question: "The Gargi AI Agent calling feature is not working. How can I get this fixed?",
    answer: "Calling system issues require immediate attention to minimize business impact. Our technical team will prioritize any Gargi AI Agent downtime or functionality issues. Please reach out to our support team immediately with details about the specific calling problems you're experiencing, and we'll ensure a quick resolution to restore your calling capabilities.",
    keywords: ["Gargi AI", "calling issues", "downtime", "technical support", "quick resolution"],
    relatedQuestions: ["What is the Gargi AI Agent?", "How do I report urgent issues?"]
  },
  {
    id: "sms-delivery-issues",
    category: "Troubleshooting",
    question: "My SMS messages are not being sent. What's the next step?",
    answer: "SMS delivery issues can affect your customer communication significantly. Our support team will work with our SMS provider (Route Mobile) to identify and resolve any delivery problems. Please contact our support team with information about failed SMS attempts, and we'll coordinate with our technical team for a quick resolution.",
    keywords: ["SMS", "delivery issues", "Route Mobile", "customer communication", "technical team"],
    relatedQuestions: ["What communication channels are supported?", "How do I contact support?"]
  },
  {
    id: "mobile-sync-issues",
    category: "Troubleshooting",
    question: "The mobile app is not syncing with the main platform. How do I fix this?",
    answer: "Mobile app synchronization issues can impact field operations. Our support team will investigate sync problems and work with you to restore full mobile functionality. Please contact our support team with details about what data isn't syncing, and we'll ensure a quick resolution to maintain your field operations.",
    keywords: ["mobile app", "sync issues", "field operations", "data sync", "mobile functionality"],
    relatedQuestions: ["What mobile capabilities are available?", "How does field force work?"]
  },
  {
    id: "integration-issues",
    category: "Troubleshooting",
    question: "My integrations (Tally/Busy/Excel) are not working properly. Who can help?",
    answer: "Integration issues can disrupt your workflow and data consistency. Our technical team specializes in resolving integration problems quickly. Please contact our support team with details about which integration is affected and the specific issues you're experiencing. We'll coordinate with our integration specialists for a quick resolution.",
    keywords: ["integrations", "Tally", "Busy", "Excel", "workflow", "data consistency"],
    relatedQuestions: ["What integrations are available?", "How does accounting integration work?"]
  },
  {
    id: "email-notification-issues",
    category: "Troubleshooting",
    question: "I'm not receiving email notifications or automations. What should I do?",
    answer: "Email delivery issues can impact your marketing and communication workflows. Our support team will investigate email delivery problems and work with our email provider (Elastic Email) to ensure proper delivery. Please contact our support team with examples of missing notifications, and we'll work for a quick resolution.",
    keywords: ["email notifications", "automations", "delivery issues", "Elastic Email", "workflows"],
    relatedQuestions: ["How does email automation work?", "What communication channels are available?"]
  },
  {
    id: "performance-issues",
    category: "Troubleshooting",
    question: "The CRM is running slowly or experiencing performance issues. How can this be resolved?",
    answer: "Performance issues can significantly impact productivity. Our technical team monitors system performance continuously and will investigate any slowdowns immediately. Please contact our support team with details about when and where you're experiencing slow performance, and we'll work for a quick resolution to optimize your system speed.",
    keywords: ["performance issues", "slow CRM", "productivity", "system performance", "optimization"],
    relatedQuestions: ["How do I report technical issues?", "What support is available?"]
  },
  {
    id: "workflow-stopped-working",
    category: "Troubleshooting",
    question: "My custom workflows have stopped working. Who should I contact?",
    answer: "Workflow automation issues require immediate attention to maintain business processes. Our support team will investigate workflow problems and restore automation functionality. Please contact our support team with details about which workflows are affected, and we'll coordinate with our technical team for a quick resolution.",
    keywords: ["custom workflows", "automation issues", "business processes", "workflow problems"],
    relatedQuestions: ["What are custom workflows?", "How do workflows work?"]
  },
  {
    id: "dashboard-access-issues",
    category: "Troubleshooting",
    question: "I can't access my BI dashboards or reports. How do I get this fixed?",
    answer: "Dashboard and reporting access issues can impact decision-making capabilities. Our support team will investigate access problems and restore your analytics functionality. Please contact our support team with details about which dashboards or reports you cannot access, and we'll ensure a quick resolution.",
    keywords: ["BI dashboards", "reports", "access issues", "analytics", "decision-making"],
    relatedQuestions: ["What BI features are available?", "What reports can I generate?"]
  },
  {
    id: "location-tracking-issues",
    category: "Troubleshooting",
    question: "My field team's location tracking is not working. What's the solution?",
    answer: "Location tracking issues can affect field operations management. Our support team will work to restore GPS and location functionality immediately. Please contact our support team with details about which field team members are affected, and we'll coordinate for a quick resolution to restore full tracking capabilities.",
    keywords: ["location tracking", "field team", "GPS", "field operations", "tracking capabilities"],
    relatedQuestions: ["How does location tracking work?", "What is Field Force Automation?"]
  },
  {
    id: "report-bug",
    category: "Troubleshooting",
    question: "How do I report a bug or system error?",
    answer: "For any bugs or system errors, please contact our support team immediately with: detailed description of the issue, steps that led to the problem, screenshots or error messages if available, and time when the issue occurred. Our technical team will investigate and provide a quick resolution.",
    keywords: ["bug report", "system error", "support team", "technical issues", "quick resolution"],
    relatedQuestions: ["What if I have an urgent issue?", "How do I contact support?"]
  },
  {
    id: "urgent-system-outage",
    category: "Troubleshooting",
    question: "What if I'm experiencing an urgent system outage?",
    answer: "For urgent system outages or critical issues affecting business operations: contact our support team immediately through priority channels, provide details about the scope of the outage, our technical team will prioritize critical issues for immediate resolution, and we'll provide regular updates until the issue is fully resolved.",
    keywords: ["urgent outage", "system outage", "critical issues", "priority channels", "immediate resolution"],
    relatedQuestions: ["How do I report bugs?", "What support is available?"]
  },

  // Plans & Pricing
  {
    id: "available-plans",
    category: "Plans & Pricing",
    question: "What plans are available?",
    answer: "In-Sync offers multiple plans including: Scale plan - includes Custom BI Dashboards and advanced features, additional plans for different business sizes and needs, and custom enterprise solutions.",
    keywords: ["plans", "Scale plan", "BI dashboards", "enterprise solutions", "pricing"],
    relatedQuestions: ["What's included in the Scale plan?", "Is there a free trial?"]
  },
  {
    id: "scale-plan-features",
    category: "Plans & Pricing",
    question: "What's included in the Scale plan?",
    answer: "The Scale plan includes: Custom BI Dashboards for advanced analytics, all core CRM and automation features, advanced integrations, and premium support.",
    keywords: ["Scale plan", "BI dashboards", "CRM features", "automation", "integrations", "premium support"],
    relatedQuestions: ["What plans are available?", "How is pricing structured?"]
  },
  {
    id: "free-trial",
    category: "Plans & Pricing",
    question: "Is there a free trial available?",
    answer: "Contact In-Sync sales team for trial options and plan details specific to your business needs.",
    keywords: ["free trial", "sales team", "trial options", "business needs"],
    relatedQuestions: ["What plans are available?", "How do I get started?"]
  },
  {
    id: "pricing-structure",
    category: "Plans & Pricing",
    question: "How is pricing structured?",
    answer: "Pricing varies based on: number of users, features required, integration complexity, and support level needed.",
    keywords: ["pricing structure", "users", "features", "integrations", "support level"],
    relatedQuestions: ["What plans are available?", "What's included in each plan?"]
  },

  // Getting Started
  {
    id: "setup-process",
    category: "Getting Started",
    question: "How do I set up In-Sync for my business?",
    answer: "Setup process includes: 1. Initial consultation to understand business needs, 2. Data Centralization from existing systems, 3. Custom Workflows configuration, 4. Team training and onboarding, 5. Go-live support.",
    keywords: ["setup process", "consultation", "data centralization", "workflows", "training", "go-live"],
    relatedQuestions: ["What training is provided?", "How long does implementation take?"]
  },
  {
    id: "training-provided",
    category: "Getting Started",
    question: "What training is provided?",
    answer: "Training includes: platform overview and navigation, feature-specific training sessions, Mobile App access training for field teams, and ongoing support and best practices.",
    keywords: ["training", "platform overview", "feature training", "mobile app", "ongoing support"],
    relatedQuestions: ["How do I set up In-Sync?", "What support is available?"]
  },
  {
    id: "implementation-timeline",
    category: "Getting Started",
    question: "How long does implementation take?",
    answer: "Implementation timeline depends on: business complexity, number of integrations required, data migration scope, and team size and training needs.",
    keywords: ["implementation timeline", "business complexity", "integrations", "data migration", "team size"],
    relatedQuestions: ["How do I set up In-Sync?", "How does data migration work?"]
  },
  {
    id: "available-support",
    category: "Getting Started",
    question: "What support is available?",
    answer: "Support includes: technical setup assistance, user training and onboarding, ongoing customer success management, and integration support and troubleshooting.",
    keywords: ["support", "technical setup", "training", "customer success", "troubleshooting"],
    relatedQuestions: ["What training is provided?", "How do I get help?"]
  },
  {
    id: "data-migration",
    category: "Getting Started",
    question: "How do I migrate my existing data?",
    answer: "Data migration includes: assessment of current data structure, Master data handling for clean import, testing and validation processes, and parallel running during transition period.",
    keywords: ["data migration", "data structure", "master data", "testing", "validation", "transition"],
    relatedQuestions: ["Can I import existing data?", "How long does setup take?"]
  }
];

export const findMatchingFAQs = (userQuery: string): FAQItem[] => {
  const query = userQuery.toLowerCase();
  const scoredFAQs: ScoredFAQItem[] = faqKnowledgeBase.map(faq => {
    let score = 0;
    
    // Higher score for exact question matches
    if (faq.question.toLowerCase().includes(query)) {
      score += 10;
    }
    
    // Score for keyword matches
    faq.keywords.forEach(keyword => {
      if (query.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(query)) {
        score += 5;
      }
    });
    
    // Score for partial keyword matches
    faq.keywords.forEach(keyword => {
      const keywordWords = keyword.toLowerCase().split(' ');
      const queryWords = query.split(' ');
      
      keywordWords.forEach(kw => {
        queryWords.forEach(qw => {
          if (kw.includes(qw) || qw.includes(kw)) {
            score += 2;
          }
        });
      });
    });
    
    // Score for answer content matches
    if (faq.answer.toLowerCase().includes(query)) {
      score += 3;
    }
    
    return { ...faq, score };
  });
  
  return scoredFAQs
    .filter(faq => faq.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ score, ...faq }) => faq);
};

export const getResponseForQuery = (userQuery: string): string => {
  const matchingFAQs = findMatchingFAQs(userQuery);
  
  if (matchingFAQs.length === 0) {
    return "I couldn't find specific information about your question in our FAQ database. Please contact our support team for personalized assistance, or try browsing our FAQ categories to find related topics.";
  }
  
  if (matchingFAQs.length === 1) {
    return matchingFAQs[0].answer;
  }
  
  if (matchingFAQs.length > 0) {
    const topFAQ = matchingFAQs[0];
    return topFAQ.answer;
  }

  return "I couldn't find specific information about your question in our FAQ database. Please contact our support team for personalized assistance, or try browsing our FAQ categories to find related topics.";
};