import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Calendar, User } from "lucide-react";
import { fetchWhitepapers, downloadWhitepaperPDF } from "@/utils/whitepaperUpload";

interface Whitepaper {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  publication_date: string;
  thumbnail_url?: string;
  tags: string[];
  download_count: number;
  pages: number;
}

export default function FeaturedWhitepaper() {
  const [whitepaper, setWhitepaper] = useState<Whitepaper | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const loadLatestWhitepaper = async () => {
      try {
        const whitepapers = await fetchWhitepapers();
        if (whitepapers.length > 0) {
          setWhitepaper(whitepapers[0]); // Get the latest one
        }
      } catch (error) {
        console.error("Error loading whitepaper:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLatestWhitepaper();
  }, []);

  const handleDownload = async () => {
    if (!whitepaper) return;
    
    setIsDownloading(true);
    try {
      await downloadWhitepaperPDF(whitepaper);
    } catch (error) {
      console.error("Error downloading whitepaper:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Latest Whitepaper</h2>
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-64 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!whitepaper) {
    return null;
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Latest Whitepaper</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Download our newest insights and research to stay ahead in your industry
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-0 shadow-xl bg-card">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Thumbnail/Visual */}
                <div className="relative bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center min-h-[300px]">
                  {whitepaper.thumbnail_url ? (
                    <img 
                      src={whitepaper.thumbnail_url} 
                      alt={whitepaper.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <FileText className="w-24 h-24 text-primary/60 mx-auto mb-4" />
                      <Badge variant="secondary" className="text-sm">
                        {whitepaper.pages} Pages
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge variant="default" className="bg-primary text-primary-foreground">
                      Latest
                    </Badge>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <div className="mb-4">
                      <Badge variant="outline" className="mb-3">
                        {whitepaper.category}
                      </Badge>
                      <h3 className="text-2xl font-bold text-foreground mb-3 leading-tight">
                        {whitepaper.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {whitepaper.description}
                      </p>
                    </div>
                    
                    {/* Tags */}
                    {whitepaper.tags && whitepaper.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {whitepaper.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Meta Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {whitepaper.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(whitepaper.publication_date).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {whitepaper.download_count} downloads
                      </span>
                      <Button 
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {isDownloading ? "Downloading..." : "Download PDF"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}