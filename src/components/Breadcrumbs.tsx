import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { getBreadcrumbSchema } from '@/utils/seo';
import { Helmet } from 'react-helmet-async';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumbs Component
 * Provides navigation breadcrumbs with structured data for SEO
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  // Always include home as first item
  const allItems: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    ...items
  ];

  const structuredData = getBreadcrumbSchema(allItems.map(item => ({
    name: item.name,
    url: `https://in-sync-crm.com${item.url}`
  })));

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <nav 
        aria-label="Breadcrumb" 
        className={`bg-muted/30 py-3 px-4 ${className}`}
      >
        <ol className="flex items-center space-x-2 text-sm">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            
            return (
              <li key={item.url} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
                )}
                
                {isLast ? (
                  <span 
                    className="text-foreground font-medium"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.url}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    {index === 0 && <Home className="h-3.5 w-3.5" />}
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
