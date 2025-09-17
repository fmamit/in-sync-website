import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import { faqKnowledgeBase, FAQItem } from "@/data/faqKnowledgeBase";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(faqKnowledgeBase.map(faq => faq.category)));
    return ["all", ...cats];
  }, []);

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    let filtered = faqKnowledgeBase;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.keywords.some(keyword => keyword.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  // Group FAQs by category for display
  const groupedFAQs = useMemo(() => {
    if (selectedCategory !== "all") {
      return { [selectedCategory]: filteredFAQs };
    }

    return filteredFAQs.reduce((acc, faq) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
      }
      acc[faq.category].push(faq);
      return acc;
    }, {} as Record<string, FAQItem[]>);
  }, [filteredFAQs, selectedCategory]);

  const totalFAQs = faqKnowledgeBase.length;
  const displayedFAQs = filteredFAQs.length;

  return (
    <>
      <Helmet>
        <title>In-Sync Platform FAQ - Frequently Asked Questions | Help Center</title>
        <meta 
          name="description" 
          content="Find answers to common questions about In-Sync platform features, CRM functionality, Gargi AI Agent, integrations, troubleshooting, and more. Get instant support for your business automation needs." 
        />
        <meta name="keywords" content="In-Sync FAQ, CRM help, Gargi AI Agent, business automation support, platform questions, troubleshooting guide" />
        <link rel="canonical" href="/faq" />
        
        {/* Open Graph */}
        <meta property="og:title" content="In-Sync Platform FAQ - Complete Help Center" />
        <meta property="og:description" content="Get instant answers to your In-Sync platform questions. Comprehensive FAQ covering CRM, AI calling, field operations, integrations and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/faq" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="In-Sync Platform FAQ - Help Center" />
        <meta name="twitter:description" content="Complete guide to In-Sync platform features and troubleshooting. Find answers instantly." />

        {/* FAQ Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": filteredFAQs.slice(0, 10).map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>

        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "In-Sync Platform",
            "description": "Comprehensive business automation platform with CRM, AI calling, and field operations management",
            "url": "/",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer support",
              "description": "Get help with In-Sync platform questions and support"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Find instant answers to your In-Sync platform questions. From CRM basics to advanced integrations, 
              we've got you covered with comprehensive support documentation.
            </p>

            {/* Search and Filter Section */}
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search frequently asked questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg border-2 border-primary/20 focus:border-primary/50 rounded-xl"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="rounded-full px-4 py-2"
                  >
                    {category === "all" ? "All Categories" : category}
                  </Button>
                ))}
              </div>

              {/* Results Counter */}
              <div className="text-sm text-muted-foreground">
                Showing {displayedFAQs} of {totalFAQs} questions
                {searchQuery && ` for "${searchQuery}"`}
                {selectedCategory !== "all" && ` in ${selectedCategory}`}
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          {Object.keys(groupedFAQs).length > 0 ? (
            <div className="space-y-12">
              {Object.entries(groupedFAQs).map(([category, faqs]) => (
                <section key={category} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-semibold text-primary">{category}</h2>
                    <Badge variant="secondary" className="px-3 py-1">
                      {faqs.length} questions
                    </Badge>
                  </div>

                  <div className="grid gap-4">
                    {faqs.map((faq) => (
                      <Card key={faq.id} className="group hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary/20 hover:border-l-primary">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg text-left group-hover:text-primary transition-colors">
                            {faq.question}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                            {faq.answer}
                          </div>
                          
                          {/* Keywords */}
                          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
                            {faq.keywords.slice(0, 5).map((keyword, index) => (
                              <Badge 
                                key={index} 
                                variant="outline" 
                                className="text-xs px-2 py-1 bg-primary/5 hover:bg-primary/10 cursor-pointer transition-colors"
                                onClick={() => setSearchQuery(keyword)}
                              >
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-muted-foreground mb-2">No questions found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or browse all categories
              </p>
              <Button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
                View All Questions
              </Button>
            </div>
          )}

          {/* Contact Support Section */}
          <div className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="py-8">
                <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
                <p className="text-muted-foreground mb-6">
                  Can't find what you're looking for? Our AI assistant is here to help with instant, 
                  personalized support for your specific needs.
                </p>
                <Button className="bg-primary hover:bg-primary/90">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat with AI Assistant
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Popular Categories Quick Links */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-center mb-6">Popular Help Topics</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                { name: "CRM & Contact Management", icon: "👥", count: faqKnowledgeBase.filter(f => f.category === "CRM & Contact Management").length },
                { name: "Gargi AI Agent & Communication", icon: "🤖", count: faqKnowledgeBase.filter(f => f.category === "Gargi AI Agent & Communication").length },
                { name: "Troubleshooting", icon: "🔧", count: faqKnowledgeBase.filter(f => f.category === "Troubleshooting").length },
                { name: "Integrations", icon: "🔗", count: faqKnowledgeBase.filter(f => f.category === "Integrations").length },
                { name: "Field Operations", icon: "📱", count: faqKnowledgeBase.filter(f => f.category === "Field Operations").length },
                { name: "Getting Started", icon: "🚀", count: faqKnowledgeBase.filter(f => f.category === "Getting Started").length }
              ].map((topic) => (
                <Button
                  key={topic.name}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start space-y-2 hover:bg-primary/5 border-primary/20"
                  onClick={() => setSelectedCategory(topic.name)}
                >
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-xl">{topic.icon}</span>
                    <span className="font-medium text-left flex-1">{topic.name}</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {topic.count} questions
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;