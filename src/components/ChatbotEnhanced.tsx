import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, X, User, Bot, Mail, Phone, ThumbsUp, ThumbsDown, ExternalLink } from "lucide-react";
import { getResponseForQuery, faqKnowledgeBase } from "@/data/faqKnowledgeBase";
import { useToast } from "@/hooks/use-toast";
import { validateEmail, validatePhone } from "@/utils/phoneFormatter";
import { useConversationContext } from "@/utils/conversationContext";
import { useLazyComponent } from "@/hooks/useLazyComponent";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  context?: {
    intent?: string;
    category?: string;
    relatedQuestions?: string[];
  };
  satisfaction?: 'helpful' | 'not_helpful' | null;
}

interface UserInfo {
  name: string;
  email: string;
  phone: string;
}

const QUICK_ACTIONS = [
  { label: "CRM Help", category: "CRM & Contact Management", icon: "👥" },
  { label: "AI Agent", category: "Gargi AI Agent & Communication", icon: "🤖" },
  { label: "Troubleshooting", category: "Troubleshooting", icon: "🔧" },
  { label: "Integrations", category: "Integrations", icon: "🔗" },
  { label: "Field Operations", category: "Field Operations", icon: "📱" },
  { label: "Getting Started", category: "Getting Started", icon: "🚀" }
];

const ChatbotEnhanced = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content: "Hello! I'm your In-Sync support assistant. I can help you with questions about our platform features, troubleshooting, integrations, and more. How can I assist you today?",
      timestamp: new Date(),
      context: {
        relatedQuestions: [
          "What is In-Sync?",
          "How does the CRM work?",
          "Tell me about Gargi AI Agent"
        ]
      }
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: "", email: "", phone: "" });
  const [showUserForm, setShowUserForm] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const {
    addTurn,
    getCurrentTopic,
    getTopicHistory,
    setUserInfo: setContextUserInfo,
    recordSatisfaction,
    generateContextualPrompt,
    suggestRelatedQuestions
  } = useConversationContext();

  // Lazy loading for performance
  const { elementRef, shouldLoad } = useLazyComponent({
    threshold: 0.1,
    triggerOnce: true
  });

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  const detectIntent = (message: string): { intent: string; category?: string } => {
    const lowerMessage = message.toLowerCase();
    
    // Urgent issue detection
    if (lowerMessage.includes('not working') || lowerMessage.includes('error') || 
        lowerMessage.includes('problem') || lowerMessage.includes('issue') ||
        lowerMessage.includes('broken') || lowerMessage.includes('failing')) {
      return { intent: 'urgent', category: 'Troubleshooting' };
    }
    
    // Category detection
    const categories = Array.from(new Set(faqKnowledgeBase.map(faq => faq.category)));
    for (const category of categories) {
      const keywords = faqKnowledgeBase
        .filter(faq => faq.category === category)
        .flatMap(faq => faq.keywords);
      
      if (keywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()))) {
        return { intent: 'question', category };
      }
    }
    
    return { intent: 'general' };
  };

  const enhanceResponse = (response: string, intent: { intent: string; category?: string }): string => {
    const currentTopic = getCurrentTopic();
    const topicHistory = getTopicHistory();
    
    let enhancedResponse = response;
    
    // Add context-aware elements
    if (intent.intent === 'urgent') {
      enhancedResponse = `🚨 I understand this is urgent. ${response}\n\nFor immediate assistance, please contact our support team directly using the form below.`;
    }
    
    // Add cross-references for related topics
    if (intent.category && currentTopic && currentTopic !== intent.category) {
      enhancedResponse += `\n\n💡 I notice you were also asking about ${currentTopic}. These topics are often related - let me know if you'd like information about both!`;
    }
    
    // Add helpful escalation
    if (response.includes("contact our support team")) {
      enhancedResponse += "\n\n📞 Would you like me to collect your contact information so our team can reach out to you directly?";
    }
    
    return enhancedResponse;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const originalInput = inputMessage.trim();
    setInputMessage("");
    setIsTyping(true);
    setShowQuickActions(false);

    // Generate contextual prompt for better responses
    const contextualPrompt = generateContextualPrompt(originalInput);
    
    // Simulate typing delay
    setTimeout(() => {
      const intent = detectIntent(originalInput);
      const botResponse = getResponseForQuery(contextualPrompt);
      const enhancedResponse = enhanceResponse(botResponse, intent);
      
      // Generate related questions
      const relatedQuestions = suggestRelatedQuestions(intent.category);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: enhancedResponse,
        timestamp: new Date(),
        context: {
          intent: intent.intent,
          category: intent.category,
          relatedQuestions
        }
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Add to conversation context
      addTurn(originalInput, enhancedResponse, {
        intent: intent.intent,
        category: intent.category
      });

      // Show user form for support requests
      if (enhancedResponse.includes("contact our support team") || 
          enhancedResponse.includes("collect your contact information")) {
        setTimeout(() => setShowUserForm(true), 1000);
      }
    }, 1500);
  };

  const handleQuickAction = (category: string) => {
    const categoryFAQs = faqKnowledgeBase.filter(faq => faq.category === category);
    if (categoryFAQs.length > 0) {
      const firstFAQ = categoryFAQs[0];
      setInputMessage(firstFAQ.question);
      setShowQuickActions(false);
    }
  };

  const handleSatisfactionFeedback = (messageId: string, satisfaction: 'helpful' | 'not_helpful') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, satisfaction }
        : msg
    ));
    
    recordSatisfaction(messageId, satisfaction);
    
    toast({
      title: satisfaction === 'helpful' ? "Thank you!" : "We'll improve",
      description: satisfaction === 'helpful' 
        ? "Your feedback helps us provide better support."
        : "We'll use your feedback to improve our responses.",
    });

    if (satisfaction === 'not_helpful') {
      setTimeout(() => setShowUserForm(true), 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleUserInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!validateEmail(userInfo.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address (e.g., user@example.com)",
        variant: "destructive"
      });
      return;
    }

    // Validate phone
    const phoneValidation = validatePhone(userInfo.phone);
    if (!phoneValidation.isValid) {
      toast({
        title: "Invalid Phone Number",
        description: phoneValidation.message || "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }

    // Validate name
    if (userInfo.name.trim().length < 2) {
      toast({
        title: "Invalid Name",
        description: "Please enter your full name (at least 2 characters)",
        variant: "destructive"
      });
      return;
    }

    const supportMessage: Message = {
      id: Date.now().toString(),
      type: "bot",
      content: `Thank you, ${userInfo.name}! I've recorded your contact information. Our support team will reach out to you at ${userInfo.email} or ${userInfo.phone} within 24 hours to assist with your inquiry.\n\nReference ID: #${Date.now().toString().slice(-6)}\n\nIs there anything else I can help you with in the meantime?`,
      timestamp: new Date(),
      context: {
        relatedQuestions: [
          "Browse FAQ categories",
          "Learn about In-Sync features", 
          "Get integration help"
        ]
      }
    };

    setMessages(prev => [...prev, supportMessage]);
    setContextUserInfo(userInfo);
    setShowUserForm(false);
    
    toast({
      title: "Contact Information Saved",
      description: "Our support team will contact you soon!",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!shouldLoad) {
    return (
      <div ref={elementRef} className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg animate-bounce"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px]">
      <Card className="h-full flex flex-col shadow-2xl border-primary/20">
        <CardHeader className="pb-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <CardTitle className="text-lg">In-Sync Support</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('/faq', '_blank')}
                className="text-primary-foreground hover:bg-primary-foreground/20"
                title="Browse FAQ"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-primary-foreground/80">
            AI-powered support • {faqKnowledgeBase.length}+ topics
          </p>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {showQuickActions && (
            <div className="p-4 border-b bg-muted/20">
              <p className="text-sm font-medium mb-3">Quick Help Topics:</p>
              <div className="grid grid-cols-2 gap-2">
                {QUICK_ACTIONS.slice(0, 4).map((action) => (
                  <Button
                    key={action.category}
                    variant="outline"
                    size="sm"
                    className="justify-start text-xs h-auto py-2 px-2"
                    onClick={() => handleQuickAction(action.category)}
                  >
                    <span className="mr-1">{action.icon}</span>
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  <div
                    className={`flex gap-3 ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.type === "bot" && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted border"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                    {message.type === "user" && (
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-secondary-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Bot message enhancements */}
                  {message.type === "bot" && (
                    <div className="ml-11 space-y-2">
                      {/* Satisfaction feedback */}
                      {message.satisfaction === null || message.satisfaction === undefined ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Was this helpful?</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:bg-green-100 hover:text-green-700"
                            onClick={() => handleSatisfactionFeedback(message.id, 'helpful')}
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"  
                            size="sm"
                            className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-700"
                            onClick={() => handleSatisfactionFeedback(message.id, 'not_helpful')}
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-muted-foreground">
                            {message.satisfaction === 'helpful' ? 'Glad I could help!' : 'Thanks for the feedback'}
                          </span>
                          {message.satisfaction === 'helpful' ? (
                            <ThumbsUp className="h-3 w-3 text-green-600" />
                          ) : (
                            <ThumbsDown className="h-3 w-3 text-red-600" />
                          )}
                        </div>
                      )}

                      {/* Related questions */}
                      {message.context?.relatedQuestions && message.context.relatedQuestions.length > 0 && (
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Related questions:</p>
                          <div className="flex flex-wrap gap-1">
                            {message.context.relatedQuestions.slice(0, 2).map((question, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs h-6 px-2 rounded-full"
                                onClick={() => setInputMessage(question)}
                              >
                                {question}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Topic badge */}
                      {message.context?.category && (
                        <Badge variant="secondary" className="text-xs">
                          {message.context.category}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted rounded-lg p-3 border">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {showUserForm && (
            <div className="p-4 border-t bg-muted/50">
              <form onSubmit={handleUserInfoSubmit} className="space-y-3">
                <p className="text-sm font-medium">Contact Information</p>
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Full Name"
                      value={userInfo.name}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="pl-8"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-8"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className="pl-8"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" size="sm" className="flex-1">
                    Submit
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowUserForm(false)}
                  >
                    Skip
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatbotEnhanced;