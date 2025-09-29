/**
 * SEO Utility Functions
 * Centralized SEO management for meta tags, structured data, and optimization
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  noindex?: boolean;
  nofollow?: boolean;
  structuredData?: any;
}

/**
 * Generate structured data for Organization
 */
export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "In-Sync",
  "alternateName": "In-Sync CRM",
  "url": "https://in-sync-crm.com",
  "logo": "https://in-sync-crm.com/logo.png",
  "description": "AI-powered CRM platform for sales, marketing, and customer service automation",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-11-4084-1521",
    "contactType": "Customer Service",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/in-sync-crm",
    "https://twitter.com/insynccrm",
    "https://www.youtube.com/c/insynccrm"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Corporate Office",
    "addressLocality": "New Delhi",
    "addressRegion": "Delhi",
    "postalCode": "110001",
    "addressCountry": "IN"
  }
});

/**
 * Generate structured data for SoftwareApplication
 */
export const getSoftwareApplicationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "In-Sync CRM",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, iOS, Android",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "500",
    "bestRating": "5",
    "worstRating": "1"
  },
  "description": "All-in-one CRM platform with AI-powered automation, multi-channel communication, and field force management"
});

/**
 * Generate structured data for FAQ page
 */
export const getFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

/**
 * Generate structured data for Article/Blog
 */
export const getArticleSchema = (article: {
  title: string;
  description: string;
  author: string;
  publishDate: string;
  modifiedDate?: string;
  imageUrl?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "author": {
    "@type": "Person",
    "name": article.author
  },
  "datePublished": article.publishDate,
  "dateModified": article.modifiedDate || article.publishDate,
  "image": article.imageUrl || "https://in-sync-crm.com/default-og-image.jpg",
  "publisher": {
    "@type": "Organization",
    "name": "In-Sync",
    "logo": {
      "@type": "ImageObject",
      "url": "https://in-sync-crm.com/logo.png"
    }
  }
});

/**
 * Generate structured data for Product/Service
 */
export const getProductSchema = (product: {
  name: string;
  description: string;
  price?: string;
  currency?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "brand": {
    "@type": "Brand",
    "name": "In-Sync"
  },
  "offers": product.price ? {
    "@type": "Offer",
    "price": product.price,
    "priceCurrency": product.currency || "INR",
    "availability": "https://schema.org/InStock"
  } : undefined
});

/**
 * Generate breadcrumb structured data
 */
export const getBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
});

/**
 * Default SEO configurations for different pages
 */
export const defaultSEOConfig: Record<string, SEOConfig> = {
  home: {
    title: "In-Sync CRM - AI-Powered Customer Relationship Management Platform | India",
    description: "Transform your business with In-Sync's AI-powered CRM platform. Features include sales automation, WhatsApp integration, field force tracking, and multi-channel marketing. Free forever plan available.",
    keywords: "CRM software India, AI CRM, customer relationship management, sales automation, WhatsApp CRM, field force management, free CRM",
    canonical: "https://in-sync-crm.com/",
    ogType: "website",
    ogImage: "https://in-sync-crm.com/og-home.jpg",
    twitterCard: "summary_large_image"
  },
  features: {
    title: "In-Sync CRM Features - AI Automation, Multi-Channel Marketing & Field Force",
    description: "Explore In-Sync CRM's powerful features: AI-powered calling with 99.8% cost reduction, WhatsApp automation, GPS field tracking, sales pipeline management, and 20+ native integrations.",
    keywords: "CRM features, AI calling, WhatsApp automation, field force tracking, sales pipeline, CRM integrations, marketing automation",
    canonical: "https://in-sync-crm.com/features",
    ogType: "website"
  },
  pricing: {
    title: "In-Sync CRM Pricing - Free Forever Plan | Transparent Pricing",
    description: "Simple, transparent pricing for In-Sync CRM. Start free forever with up to 1,000 records. Growth plans from ₹12,999/month. No hidden fees, unlimited users, scales with your business.",
    keywords: "CRM pricing, free CRM, affordable CRM India, CRM plans, unlimited users CRM",
    canonical: "https://in-sync-crm.com/pricing",
    ogType: "website"
  },
  industries: {
    title: "Industry-Specific CRM Solutions | Healthcare, Finance, Manufacturing & More",
    description: "Discover In-Sync CRM solutions tailored for your industry. Compliance-ready platforms for healthcare, financial services, manufacturing, real estate, technology, and professional services.",
    keywords: "industry CRM, healthcare CRM, financial services CRM, manufacturing CRM, real estate CRM, compliance CRM",
    canonical: "https://in-sync-crm.com/industries",
    ogType: "website"
  },
  resources: {
    title: "CRM Resources - Guides, Whitepapers, Tutorials & Webinars | In-Sync",
    description: "Access comprehensive CRM resources including implementation guides, industry whitepapers, video tutorials, and expert webinars. Learn best practices for CRM success.",
    keywords: "CRM resources, CRM guides, CRM tutorials, CRM whitepapers, CRM webinars, CRM best practices",
    canonical: "https://in-sync-crm.com/resources",
    ogType: "website"
  }
};

/**
 * Generate canonical URL
 */
export const getCanonicalUrl = (path: string): string => {
  const baseUrl = "https://in-sync-crm.com";
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

/**
 * Generate meta robots content
 */
export const getRobotsContent = (noindex?: boolean, nofollow?: boolean): string => {
  const directives = [];
  if (noindex) directives.push('noindex');
  if (nofollow) directives.push('nofollow');
  
  if (directives.length === 0) {
    return 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  }
  
  return directives.join(', ');
};

/**
 * Truncate text for meta descriptions
 */
export const truncateDescription = (text: string, maxLength: number = 160): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
};

/**
 * Generate keywords string from array
 */
export const generateKeywords = (keywords: string[]): string => {
  return keywords.join(', ');
};
