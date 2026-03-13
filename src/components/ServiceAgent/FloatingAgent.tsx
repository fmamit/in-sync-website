import { useState, useRef, useEffect } from 'react';
import './ServiceAgent.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  ticketId?: string;
}

const AGENT_API_URL = import.meta.env.VITE_AGENT_API_URL || 'http://localhost:3001';

const FloatingAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Hello. I am the In-Sync service agent. I can raise a support ticket, check if a service is down, or trigger a fix for a broken action.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const buildConversationHistory = () =>
    messages
      .filter((m) => m.id !== 'welcome')
      .map((m) => ({ role: m.role, content: m.content }));

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch(`${AGENT_API_URL}/api/agent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversation_history: buildConversationHistory(),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response || 'I was unable to process your request. Please try again.',
          ticketId: data.ticket_id || undefined,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Unable to reach the service agent. Please try again later.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="service-agent-root">
      {!isOpen && (
        <button className="sa-fab" onClick={() => setIsOpen(true)} aria-label="Open service agent">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="sa-panel">
          <div className="sa-header">
            <div className="sa-header-info">
              <div className="sa-header-dot" />
              <span className="sa-header-title">Service Agent</span>
            </div>
            <button className="sa-close" onClick={() => setIsOpen(false)} aria-label="Close">
              &times;
            </button>
          </div>

          <div className="sa-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`sa-msg sa-msg--${msg.role}`}>
                <div className={`sa-bubble sa-bubble--${msg.role}`}>
                  {msg.content}
                  {msg.ticketId && (
                    <div className="sa-ticket-card">
                      <div className="sa-ticket-label">Ticket Created</div>
                      <div className="sa-ticket-id">{msg.ticketId}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="sa-msg sa-msg--assistant">
                <div className="sa-bubble sa-bubble--assistant">
                  <div className="sa-typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="sa-input-area">
            <input
              ref={inputRef}
              className="sa-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your issue..."
              disabled={isLoading}
            />
            <button
              className="sa-send"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              aria-label="Send"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingAgent;
