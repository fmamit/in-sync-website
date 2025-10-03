import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer";
import { faqKnowledgeBase, getResponseForQuery } from "@/data/faqKnowledgeBase";
import {
  Search,
  MessageCircleQuestion,
  HelpCircle,
  BookOpen,
  Users,
  Settings,
  Zap,
  DollarSign,
  BarChart3,
  Smartphone,
  Shield
} from "lucide-react";
import { Helmet } from 'react-helmet-async';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [faqQuery, setFaqQuery] = useState("");
  const [faqResponse, setFaqResponse] = useState("");

  // Group FAQs by category
  const categories = [
    { id: "all", name: "All Categories", icon: BookOpen },
    { id: "General Platform", name: "General Platform", icon: HelpCircle },
    { id: "CRM & Contact Management", name: "CRM & Contacts", icon: Users },
    { id: "Sales & Marketing", name: "Sales & Marketing", icon: DollarSign },
    { id: "Gargi AI Agent", name: "Gargi AI Agent", icon: Zap },
    { id: "Task & Workflow Management", name: "Tasks & Workflows", icon: Settings },
    { id: "Field Operations", name: "Field Operations", icon: Smartphone },
    { id: "Finance", name: "Finance", icon: DollarSign },
    { id: "Analytics", name: "Analytics", icon: BarChart3 },
    { id: "Integrations", name: "Integrations", icon: Zap },
    { id: "Security", name: "Security", icon: Shield }
  ];

  // Filter FAQs based on search term and category
  const filteredFAQs = faqKnowledgeBase.filter(faq => {
    const matchesSearch = searchTerm === "" || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Group filtered FAQs by category
  const groupedFAQs = categories.reduce((acc, category) => {
    if (category.id === "all") return acc;
    
    const categoryFAQs = filteredFAQs.filter(faq => faq.category === category.id);
    if (categoryFAQs.length > 0) {
      acc[category.id] = {
        ...category,
        faqs: categoryFAQs
      };
    }
    return acc;
  }, {} as Record<string, any>);

  const handleFAQQuery = () => {
    if (faqQuery.trim()) {
      const response = getResponseForQuery(faqQuery.trim());
      setFaqResponse(response);
    } else {
      setFaqResponse("");
    }
  };

  const popularQuestions = [
    "What is In-Sync?",
    "How does the Gargi AI Agent work?", 
    "What integrations are available?",
    "How does WhatsApp automation work?",
    "What security measures does In-Sync provide?",
    "How much can I save with Gargi AI Agent?",
    "What is Field Force Automation?",
    "How does lead qualification work?"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Frequently Asked Questions - In-Sync CRM Platform</title>
        <meta name="description" content="Get answers to frequently asked questions about In-Sync CRM platform, features, integrations, pricing, and more." />
        <meta name="keywords" content="FAQ, In-Sync, CRM, questions, support, help, documentation" />
      </Helmet>

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <MessageCircleQuestion className="w-12 h-12 text-primary" />
                <h1 className="text-5xl font-bold text-primary">
                  Frequently Asked Questions
                </h1>
              </div>
              <p className="text-xl text-muted-foreground mb-8">
                Find answers to common questions about In-Sync platform, features, and capabilities. 
                Get instant support from our comprehensive knowledge base.
              </p>
              
              {/* Quick Search */}
              <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* AI Query Section */}
              <Card className="max-w-3xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Ask Our AI Assistant
                  </CardTitle>
                  <CardDescription>
                    Can't find your answer? Ask our AI assistant any question about In-Sync.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <Input
                      placeholder="Ask any question about In-Sync..."
                      value={faqQuery}
                      onChange={(e) => setFaqQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleFAQQuery()}
                      className="flex-1"
                    />
                    <Button onClick={handleFAQQuery}>
                      <Search className="h-4 w-4 mr-2" />
                      Ask Question
                    </Button>
                  </div>
                  
                  {faqResponse && (
                    <Card className="bg-muted/50 mt-4">
                      <CardContent className="pt-6">
                        <div className="prose prose-sm max-w-none">
                          <div className="whitespace-pre-wrap">{faqResponse}</div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Popular Questions */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Popular Questions</h2>
              <p className="text-muted-foreground">Quick answers to the most commonly asked questions</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {popularQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto p-4 text-left"
                  onClick={() => {
                    setFaqQuery(question);
                    const response = getResponseForQuery(question);
                    setFaqResponse(response);
                  }}
                >
                  <MessageCircleQuestion className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="text-sm">{question}</span>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* All FAQs by Category */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Complete FAQ Database</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore all {faqKnowledgeBase.length} questions and answers organized by category. 
                {filteredFAQs.length < faqKnowledgeBase.length && (
                  <span> Currently showing {filteredFAQs.length} results.</span>
                )}
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              {Object.values(groupedFAQs).map((categoryData: any) => (
                <div key={categoryData.id} className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <categoryData.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{categoryData.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {categoryData.faqs.length} question{categoryData.faqs.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  <Accordion type="single" collapsible className="space-y-2">
                    {categoryData.faqs.map((faq: any) => (
                      <AccordionItem 
                        key={faq.id} 
                        value={faq.id}
                        className="border rounded-lg px-4"
                      >
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-start gap-3 text-left">
                            <HelpCircle className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                            <span className="font-medium">{faq.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 pb-6">
                          <div className="pl-7">
                            <p className="text-muted-foreground mb-4 leading-relaxed">
                              {faq.answer}
                            </p>
                            
                            {/* Keywords */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {faq.keywords.slice(0, 5).map((keyword: string, index: number) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>

                            {/* Related Questions */}
                            {faq.relatedQuestions && faq.relatedQuestions.length > 0 && (
                              <div className="border-t pt-4">
                                <p className="text-sm font-medium mb-2">Related Questions:</p>
                                <div className="space-y-1">
                                  {faq.relatedQuestions.map((relatedQ: string, index: number) => (
                                    <Button
                                      key={index}
                                      variant="ghost"
                                      size="sm"
                                      className="h-auto p-2 justify-start text-xs text-primary hover:bg-primary/5"
                                      onClick={() => {
                                        setFaqQuery(relatedQ);
                                        const response = getResponseForQuery(relatedQ);
                                        setFaqResponse(response);
                                      }}
                                    >
                                      → {relatedQ}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  <Separator className="my-8" />
                </div>
              ))}

              {filteredFAQs.length === 0 && (
                <div className="text-center py-12">
                  <MessageCircleQuestion className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No FAQs Found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or category filter.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Support Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
              <p className="text-muted-foreground mb-8">
                Can't find the answer you're looking for? Our support team is here to help you get the most out of In-Sync.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <MessageCircleQuestion className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Contact Support</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get personalized help from our expert team
                    </p>
                    <Button className="w-full">
                      Contact Support Team
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Documentation</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Browse our comprehensive guides and tutorials
                    </p>
                    <Button variant="outline" className="w-full">
                      View Documentation
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;