import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2,
  Phone,
  Mail,
  Building,
  FileText,
  UserIcon
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  company: string;
  requirement: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m here to help you learn about In-Sync\'s AI-powered CRM platform. To get started, could you please share some basic information?',
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    email: '',
    phone: '',
    company: '',
    requirement: ''
  });
  const [collectingInfo, setCollectingInfo] = useState(true);
  const [currentField, setCurrentField] = useState<keyof ContactInfo>('name');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fieldPrompts = {
    name: "What's your name?",
    email: "What's your email address?",
    phone: "What's your phone number?",
    company: "What company do you work for?",
    requirement: "What specific requirements or challenges can I help you with regarding CRM?"
  };

  const addMessage = (type: 'user' | 'bot', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getWebsiteKnowledge = () => {
    return `
In-Sync is an AI-powered CRM platform that offers:

CORE FEATURES:
- AI-powered CRM with 99.8% cost reduction
- Unlimited users and contacts
- No-code customization platform
- 20+ native integrations
- Field force automation with GPS tracking
- Multi-channel communication (WhatsApp, SMS, Email, Calls)

AI CAPABILITIES:
- Gargi AI autonomous calling system
- Predictive lead scoring
- Conversational AI
- Behavioral triggers and automation
- 500K+ calls handled, 20MM+ messages processed

INDUSTRIES SERVED:
- Financial Services
- Healthcare  
- Manufacturing
- Real Estate
- Retail & E-commerce
- Professional Services
- Technology & SaaS
- Education

KEY INTEGRATIONS:
- PowerBI native connection
- Excel & Tally sync
- Tata SIP Trunking for calling
- WhatsApp Business API
- SMS gateways

CONTACT CENTER (CCaaS):
- Call distribution
- Real-time monitoring
- IVR system
- Call recording and analytics
- One-click CSAT surveys

FIELD FORCE FEATURES:
- GPS attendance tracking
- Live location monitoring
- Route optimization
- Mobile CRM access
- Performance analytics

PROVEN RESULTS:
- Used by 1250+ organizations across 75 countries
- Trusted by companies like Audi, InCred, Motherson Group, Quess Corp
- Since 1991 in business
- 99.8% cost reduction with AI calling
- 45% productivity increase for field teams

PRICING: Contact for custom pricing based on requirements
COMPANY: In-Sync Tech-Fin Solutions Ltd.
LOCATION: Gurgaon, Haryana, India
PHONE: +91 92288 24668
EMAIL: delight@in-sync.co.in
    `;
  };

  const handleContactInfoSubmission = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/save-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactInfo),
      });

      if (response.ok) {
        setCollectingInfo(false);
        addMessage('bot', `Thank you ${contactInfo.name}! I have your information. Now I can help you with any questions about In-Sync's CRM platform. What would you like to know?`);
      }
    } catch (error) {
      console.error('Error saving contact:', error);
      addMessage('bot', 'Thank you for the information! Now I can help you with any questions about In-Sync\'s CRM platform. What would you like to know?');
      setCollectingInfo(false);
    }
    
    setIsLoading(false);
  };

  const handlePerplexityQuery = async (query: string) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/chatbot-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          contactInfo,
          websiteContext: getWebsiteKnowledge()
        }),
      });

      const data = await response.json();
      
      if (data.answer) {
        addMessage('bot', data.answer);
      } else {
        addMessage('bot', 'I apologize, but I couldn\'t process your question right now. Let me connect you with our team for personalized assistance.');
      }
    } catch (error) {
      console.error('Error querying chatbot:', error);
      addMessage('bot', 'I\'m having trouble processing your question. Please contact our team directly at +91 92288 24668 or delight@in-sync.co.in for immediate assistance.');
    }
    
    setIsLoading(false);
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    addMessage('user', currentMessage);
    const userInput = currentMessage;
    setCurrentMessage('');

    if (collectingInfo) {
      const updatedInfo = { ...contactInfo, [currentField]: userInput };
      setContactInfo(updatedInfo);

      const fieldOrder: (keyof ContactInfo)[] = ['name', 'email', 'phone', 'company', 'requirement'];
      const currentIndex = fieldOrder.indexOf(currentField);
      
      if (currentIndex < fieldOrder.length - 1) {
        const nextField = fieldOrder[currentIndex + 1];
        setCurrentField(nextField);
        setTimeout(() => {
          addMessage('bot', fieldPrompts[nextField]);
        }, 500);
      } else {
        // All info collected
        handleContactInfoSubmission();
      }
    } else {
      // Handle regular chat queries
      handlePerplexityQuery(userInput);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        <div className="absolute -top-12 right-0 bg-foreground text-background px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 animate-pulse">
          Chat with us!
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 h-[500px] shadow-2xl border-0 bg-background">
        <CardHeader className="bg-gradient-to-r from-primary to-teal-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg">In-Sync Assistant</CardTitle>
                <p className="text-sm text-white/90">AI-powered support</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex flex-col h-[420px]">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.type === 'bot' && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    {message.type === 'user' && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    <div>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-white/70' : 'text-muted-foreground'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex gap-1">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">Typing...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Contact Info Status */}
          {collectingInfo && (
            <div className="px-4 pb-2">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <UserIcon className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Contact Information</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-blue-700">
                  <div className="flex items-center gap-1">
                    <UserIcon className="h-3 w-3" />
                    <span className={contactInfo.name ? "font-medium" : "text-blue-400"}>
                      {contactInfo.name || "Name"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    <span className={contactInfo.email ? "font-medium" : "text-blue-400"}>
                      {contactInfo.email ? "✓" : "Email"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    <span className={contactInfo.phone ? "font-medium" : "text-blue-400"}>
                      {contactInfo.phone ? "✓" : "Phone"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building className="h-3 w-3" />
                    <span className={contactInfo.company ? "font-medium" : "text-blue-400"}>
                      {contactInfo.company ? "✓" : "Company"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={collectingInfo ? `Enter your ${currentField}...` : "Type your message..."}
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !currentMessage.trim()}
                className="bg-primary hover:bg-primary/90"
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

export default Chatbot;