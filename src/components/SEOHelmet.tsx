import { Helmet } from 'react-helmet-async';
import { SEOConfig, getCanonicalUrl, getRobotsContent } from '@/utils/seo';

interface SEOHelmetProps {
  config: SEOConfig;
  children?: React.ReactNode;
}

/**
 * SEO Helmet Component
 * Centralized component for managing page-level SEO meta tags
 */
export const SEOHelmet: React.FC<SEOHelmetProps> = ({ config, children }) => {
  const {
    title,
    description,
    keywords,
    canonical,
    ogType = 'website',
    ogImage = 'https://in-sync-crm.com/og-default.jpg',
    twitterCard = 'summary_large_image',
    noindex,
    nofollow,
    structuredData
  } = config;

  const canonicalUrl = canonical || getCanonicalUrl(window.location.pathname);
  const robotsContent = getRobotsContent(noindex, nofollow);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Robots */}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="In-Sync CRM" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@insynccrm" />
      <meta name="twitter:creator" content="@insynccrm" />
      
      {/* Geographic Tags for India */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />
      <meta name="geo.position" content="20.5937;78.9629" />
      <meta name="ICBM" content="20.5937, 78.9629" />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="In-Sync CRM" />
      <meta name="publisher" content="In-Sync" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#1e40af" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Additional children elements */}
      {children}
    </Helmet>
  );
};

export default SEOHelmet;
