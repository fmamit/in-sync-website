import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const ChatbotEnhanced = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m here to help you learn about In-Sync\'s AI-powered CRM platform. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Local knowledge base for In-Sync CRM
  const knowledgeBase = {
    features: [
      "AI-powered lead scoring and qualification",
      "Automated drip marketing campaigns",
      "Multi-channel communication (Email, SMS, WhatsApp)",
      "Real-time analytics and reporting",
      "Custom CRM workflows",
      "Integration with 200+ third-party apps",
      "Mobile CRM application",
      "Advanced security and compliance"
    ],
    pricing: "For detailed pricing information, please contact our team at +91 92288 24668 or delight@in-sync.co.in for a custom quote based on your specific needs.",
    contact: {
      phone: "+91 92288 24668",
      email: "delight@in-sync.co.in"
    },
    industries: [
      "Healthcare & Life Sciences",
      "Financial Services", 
      "Manufacturing",
      "Real Estate",
      "Technology & SaaS",
      "Professional Services",
      "Education",
      "Retail & E-commerce"
    ],
    benefits: [
      "Increase sales productivity by up to 40%",
      "Reduce lead response time by 75%",
      "Improve customer retention by 30%",
      "Automate 80% of repetitive tasks",
      "Get 360-degree customer insights"
    ]
  };

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    // Pricing related queries
    if (input.includes('price') || input.includes('cost') || input.includes('pricing') || input.includes('how much')) {
      return knowledgeBase.pricing;
    }

    // Features related queries
    if (input.includes('feature') || input.includes('what can') || input.includes('capabilities') || input.includes('functionality')) {
      return `In-Sync CRM offers powerful features including:\n\n${knowledgeBase.features.map(f => `• ${f}`).join('\n')}\n\nWould you like me to explain any specific feature in detail?`;
    }

    // Benefits related queries
    if (input.includes('benefit') || input.includes('advantage') || input.includes('why choose') || input.includes('roi')) {
      return `Here are the key benefits of using In-Sync CRM:\n\n${knowledgeBase.benefits.map(b => `• ${b}`).join('\n')}\n\nThese improvements can significantly impact your business growth and efficiency.`;
    }

    // Industries related queries
    if (input.includes('industry') || input.includes('sector') || input.includes('vertical')) {
      return `In-Sync CRM serves various industries:\n\n${knowledgeBase.industries.map(i => `• ${i}`).join('\n')}\n\nWe customize our CRM solutions to meet the specific needs of each industry.`;
    }

    // Contact related queries
    if (input.includes('contact') || input.includes('reach') || input.includes('call') || input.includes('email')) {
      return `You can reach our team at:\n\n📞 Phone: ${knowledgeBase.contact.phone}\n📧 Email: ${knowledgeBase.contact.email}\n\nOur experts are ready to discuss your CRM requirements and provide a personalized demo.`;
    }

    // Demo related queries
    if (input.includes('demo') || input.includes('trial') || input.includes('test') || input.includes('try')) {
      return `I'd be happy to help you get started with a demo! Please contact our team at ${knowledgeBase.contact.phone} or ${knowledgeBase.contact.email} to schedule a personalized demonstration of In-Sync CRM. They'll show you exactly how our platform can benefit your business.`;
    }

    // Integration related queries
    if (input.includes('integration') || input.includes('integrate') || input.includes('connect') || input.includes('api')) {
      return `In-Sync CRM integrates seamlessly with 200+ popular business applications including:\n\n• Email platforms (Gmail, Outlook)\n• Marketing tools (Mailchimp, HubSpot)\n• Accounting software (QuickBooks, Tally)\n• Communication tools (Slack, Microsoft Teams)\n• E-commerce platforms (Shopify, WooCommerce)\n\nOur integration capabilities ensure your CRM works perfectly with your existing business ecosystem.`;
    }

    // AI related queries
    if (input.includes('ai') || input.includes('artificial intelligence') || input.includes('machine learning') || input.includes('automation')) {
      return `In-Sync CRM leverages advanced AI to:\n\n• Automatically score and qualify leads\n• Predict customer behavior and churn risk\n• Suggest next best actions for sales reps\n• Automate routine tasks and workflows\n• Provide intelligent insights and recommendations\n\nOur AI engine learns from your data to continuously improve performance and help you make smarter business decisions.`;
    }

    // Security related queries
    if (input.includes('security') || input.includes('secure') || input.includes('data protection') || input.includes('privacy')) {
      return `Security is our top priority. In-Sync CRM provides:\n\n• Enterprise-grade encryption for data at rest and in transit\n• Role-based access controls\n• Regular security audits and compliance checks\n• GDPR and other regulatory compliance\n• Secure cloud hosting with 99.9% uptime\n• Regular automated backups\n\nYour business data is always protected with industry-leading security measures.`;
    }

    // Support related queries  
    if (input.includes('support') || input.includes('help') || input.includes('training') || input.includes('onboarding')) {
      return `We provide comprehensive support including:\n\n• 24/7 technical support\n• Dedicated onboarding specialist\n• Free training sessions for your team\n• Extensive documentation and video tutorials\n• Regular webinars and best practice sessions\n• Priority support for enterprise customers\n\nOur success team ensures you get maximum value from your CRM investment.`;
    }

    // Greetings
    if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input.includes('good morning') || input.includes('good afternoon')) {
      return `Hello! Welcome to In-Sync CRM. I'm here to help you discover how our AI-powered platform can transform your business operations. What would you like to know about our CRM solution?`;
    }

    // Thank you
    if (input.includes('thank') || input.includes('thanks')) {
      return `You're welcome! I'm glad I could help. If you have any other questions about In-Sync CRM or would like to speak with our team, feel free to contact us at ${knowledgeBase.contact.phone} or ${knowledgeBase.contact.email}.`;
    }

    // Default response
    return `I'd be happy to help you learn more about In-Sync CRM! I can provide information about our features, pricing, integrations, security, and more. You can also contact our team directly at ${knowledgeBase.contact.phone} or ${knowledgeBase.contact.email} for personalized assistance.\n\nWhat specific aspect of our CRM platform interests you most?`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 group">
          {/* Pulse ring animation */}
          <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
          
          <Button
            onClick={() => setIsOpen(true)}
            className="relative h-16 w-16 rounded-full shadow-premium-lg bg-primary hover:bg-primary/90 hover:scale-110 transition-all duration-300 btn-glow"
            size="icon"
          >
            <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform" />
          </Button>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
            <div className="bg-card text-card-foreground text-sm font-medium px-4 py-2 rounded-lg shadow-premium-sm whitespace-nowrap border border-border font-body">
              💬 Chat with us!
            </div>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl z-[100] flex flex-col bg-background border">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2 border-b">
            <CardTitle className="text-lg font-semibold text-foreground">In-Sync Assistant</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 px-4 pt-4">
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 items-end ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mb-1">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[250px] p-3 rounded-lg whitespace-pre-line text-sm leading-relaxed ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-sm'
                          : 'bg-muted text-muted-foreground rounded-bl-sm'
                      }`}
                    >
                      {message.content}
                    </div>
                    {message.type === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mb-1">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-2 items-end justify-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mb-1">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg rounded-bl-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="flex gap-2 p-4 border-t bg-background">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about In-Sync CRM..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon" disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatbotEnhanced;