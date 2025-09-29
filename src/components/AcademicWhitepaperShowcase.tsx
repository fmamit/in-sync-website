import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Calendar, User, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { downloadWhitepaperPDF } from "@/utils/whitepaperUpload";

interface Whitepaper {
  id: string;
  title: string;
  description: string;
  author: string;
  publication_date: string;
  tags: string[];
  download_count: number;
  pages: number;
  thumbnail_url?: string;
  pdf_url?: string;
}

const AcademicWhitepaperShowcase = () => {
  const [whitepaper, setWhitepaper] = useState<Whitepaper | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestWhitepaper();
  }, []);

  const fetchLatestWhitepaper = async () => {
    try {
      const { data, error } = await supabase
        .from('whitepapers')
        .select('*')
        .order('publication_date', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching whitepaper:', error);
        return;
      }

      setWhitepaper(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (whitepaper) {
      await downloadWhitepaperPDF(whitepaper);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
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
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Academic Research</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the scientific foundation and rigorous research behind our platform through our comprehensive whitepaper
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden bg-card border shadow-lg">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Thumbnail Side */}
              <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center p-8">
                {whitepaper.thumbnail_url ? (
                  <img
                    src={whitepaper.thumbnail_url}
                    alt={`${whitepaper.title} thumbnail`}
                    className="max-w-full max-h-64 object-contain rounded-lg shadow-md"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
                    <FileText className="h-24 w-24 mb-4" />
                    <p className="text-sm">Research Document</p>
                  </div>
                )}
              </div>

              {/* Content Side */}
              <CardContent className="p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl font-bold text-foreground mb-3">
                    {whitepaper.title}
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {whitepaper.description}
                  </CardDescription>
                </CardHeader>

                {/* Metadata */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Author: {whitepaper.author}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Published: {new Date(whitepaper.publication_date).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>{whitepaper.pages} pages • {whitepaper.download_count} downloads</span>
                  </div>
                </div>

                {/* Tags */}
                {whitepaper.tags && whitepaper.tags.length > 0 && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {whitepaper.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Download Button */}
                <Button 
                  onClick={handleDownload}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Research Paper
                </Button>

                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Free access to our comprehensive research findings
                </p>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AcademicWhitepaperShowcase;