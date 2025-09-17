/**
 * Conversation context management for enhanced chatbot functionality
 * Provides memory, context awareness, and intelligent response handling
 */

interface ConversationTurn {
  id: string;
  userMessage: string;
  botResponse: string;
  timestamp: Date;
  context: {
    intent?: string;
    entities?: string[];
    category?: string;
    satisfaction?: 'helpful' | 'not_helpful' | null;
  };
}

interface ConversationSession {
  id: string;
  turns: ConversationTurn[];
  startTime: Date;
  lastActivity: Date;
  userInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  context: {
    currentTopic?: string;
    previousTopics: string[];
    unresolved: string[];
    preferences: Record<string, any>;
  };
}

class ConversationContextManager {
  private session: ConversationSession;
  private readonly CONTEXT_EXPIRY = 30 * 60 * 1000; // 30 minutes

  constructor() {
    this.session = this.initializeSession();
  }

  private initializeSession(): ConversationSession {
    const existingSession = this.loadSession();
    if (existingSession && this.isSessionValid(existingSession)) {
      return existingSession;
    }

    return {
      id: this.generateSessionId(),
      turns: [],
      startTime: new Date(),
      lastActivity: new Date(),
      context: {
        previousTopics: [],
        unresolved: [],
        preferences: {}
      }
    };
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private isSessionValid(session: ConversationSession): boolean {
    const now = new Date().getTime();
    const lastActivity = new Date(session.lastActivity).getTime();
    return (now - lastActivity) < this.CONTEXT_EXPIRY;
  }

  private loadSession(): ConversationSession | null {
    try {
      const stored = localStorage.getItem('chatbot_session');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  private saveSession(): void {
    try {
      localStorage.setItem('chatbot_session', JSON.stringify(this.session));
    } catch {
      // Ignore storage errors
    }
  }

  addTurn(userMessage: string, botResponse: string, context: ConversationTurn['context'] = {}): void {
    const turn: ConversationTurn = {
      id: `turn_${this.session.turns.length + 1}`,
      userMessage,
      botResponse,
      timestamp: new Date(),
      context
    };

    this.session.turns.push(turn);
    this.session.lastActivity = new Date();

    // Update session context
    if (context.category && !this.session.context.previousTopics.includes(context.category)) {
      this.session.context.previousTopics.push(context.category);
      this.session.context.currentTopic = context.category;
    }

    this.saveSession();
  }

  getRecentContext(maxTurns: number = 3): ConversationTurn[] {
    return this.session.turns.slice(-maxTurns);
  }

  getTopicHistory(): string[] {
    return this.session.context.previousTopics;
  }

  getCurrentTopic(): string | undefined {
    return this.session.context.currentTopic;
  }

  markUnresolved(query: string): void {
    if (!this.session.context.unresolved.includes(query)) {
      this.session.context.unresolved.push(query);
      this.saveSession();
    }
  }

  getUnresolvedQueries(): string[] {
    return this.session.context.unresolved;
  }

  setUserInfo(userInfo: ConversationSession['userInfo']): void {
    this.session.userInfo = { ...this.session.userInfo, ...userInfo };
    this.saveSession();
  }

  getUserInfo(): ConversationSession['userInfo'] | undefined {
    return this.session.userInfo;
  }

  setPreference(key: string, value: any): void {
    this.session.context.preferences[key] = value;
    this.saveSession();
  }

  getPreference(key: string): any {
    return this.session.context.preferences[key];
  }

  recordSatisfaction(turnId: string, satisfaction: 'helpful' | 'not_helpful'): void {
    const turn = this.session.turns.find(t => t.id === turnId);
    if (turn) {
      turn.context.satisfaction = satisfaction;
      
      // If not helpful, mark as unresolved
      if (satisfaction === 'not_helpful') {
        this.markUnresolved(turn.userMessage);
      }
      
      this.saveSession();
    }
  }

  generateContextualPrompt(userQuery: string): string {
    const recentTurns = this.getRecentContext(2);
    const currentTopic = this.getCurrentTopic();
    const topicHistory = this.getTopicHistory();
    
    let contextualPrompt = userQuery;

    // Add context from recent conversation
    if (recentTurns.length > 0) {
      const recentQuestions = recentTurns.map(turn => turn.userMessage).join('; ');
      contextualPrompt += ` [Recent context: ${recentQuestions}]`;
    }

    // Add current topic context
    if (currentTopic) {
      contextualPrompt += ` [Current topic: ${currentTopic}]`;
    }

    // Add related topics from history
    if (topicHistory.length > 1) {
      const relatedTopics = topicHistory.slice(-3).join(', ');
      contextualPrompt += ` [Related topics discussed: ${relatedTopics}]`;
    }

    return contextualPrompt;
  }

  suggestRelatedQuestions(currentCategory?: string): string[] {
    const suggestions: string[] = [];
    
    // Based on current topic
    if (currentCategory) {
      const topicSuggestions = this.getTopicSuggestions(currentCategory);
      suggestions.push(...topicSuggestions.slice(0, 2));
    }

    // Based on unresolved queries
    if (this.session.context.unresolved.length > 0) {
      suggestions.push(`Tell me more about: ${this.session.context.unresolved[0]}`);
    }

    // Based on topic history
    const recentTopics = this.session.context.previousTopics.slice(-2);
    recentTopics.forEach(topic => {
      if (topic !== currentCategory) {
        const topicSuggestions = this.getTopicSuggestions(topic);
        if (topicSuggestions.length > 0) {
          suggestions.push(topicSuggestions[0]);
        }
      }
    });

    return [...new Set(suggestions)].slice(0, 3);
  }

  private getTopicSuggestions(category: string): string[] {
    const suggestions: Record<string, string[]> = {
      'CRM & Contact Management': [
        'How do I import customer data?',
        'Can I track customer interaction history?',
        'How does lead scoring work?'
      ],
      'Gargi AI Agent & Communication': [
        'What are the cost savings with Gargi AI?',
        'How does automated calling work?',
        'Can I customize the AI agent responses?'
      ],
      'Field Operations': [
        'How does location tracking work?',
        'Can field staff work offline?',
        'How do I monitor team productivity?'
      ],
      'Integrations': [
        'What accounting software integrates with In-Sync?',
        'How do I set up WhatsApp integration?',
        'Can I connect to existing CRM systems?'
      ],
      'Troubleshooting': [
        'My messages are not being delivered',
        'The mobile app is not syncing',
        'I need help with integration issues'
      ]
    };

    return suggestions[category] || [];
  }

  clearSession(): void {
    this.session = this.initializeSession();
    localStorage.removeItem('chatbot_session');
  }

  getSessionStats(): {
    totalTurns: number;
    topicsDiscussed: number;
    unresolvedCount: number;
    sessionDuration: number;
    satisfactionRate: number;
  } {
    const satisfiedTurns = this.session.turns.filter(t => t.context.satisfaction === 'helpful').length;
    const ratedTurns = this.session.turns.filter(t => t.context.satisfaction !== null).length;
    
    return {
      totalTurns: this.session.turns.length,
      topicsDiscussed: this.session.context.previousTopics.length,
      unresolvedCount: this.session.context.unresolved.length,
      sessionDuration: new Date().getTime() - this.session.startTime.getTime(),
      satisfactionRate: ratedTurns > 0 ? (satisfiedTurns / ratedTurns) * 100 : 0
    };
  }
}

// Singleton instance
export const conversationContext = new ConversationContextManager();

// Hook for React components
export const useConversationContext = () => {
  return {
    addTurn: conversationContext.addTurn.bind(conversationContext),
    getRecentContext: conversationContext.getRecentContext.bind(conversationContext),
    getCurrentTopic: conversationContext.getCurrentTopic.bind(conversationContext),
    getTopicHistory: conversationContext.getTopicHistory.bind(conversationContext),
    setUserInfo: conversationContext.setUserInfo.bind(conversationContext),
    getUserInfo: conversationContext.getUserInfo.bind(conversationContext),
    recordSatisfaction: conversationContext.recordSatisfaction.bind(conversationContext),
    generateContextualPrompt: conversationContext.generateContextualPrompt.bind(conversationContext),
    suggestRelatedQuestions: conversationContext.suggestRelatedQuestions.bind(conversationContext),
    clearSession: conversationContext.clearSession.bind(conversationContext),
    getSessionStats: conversationContext.getSessionStats.bind(conversationContext)
  };
};