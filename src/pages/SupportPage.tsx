import { useState, useRef, useEffect } from 'react';
import { getTicketById, Ticket } from '@/components/ServiceAgent/supabaseAgent';
import '@/components/ServiceAgent/ServiceAgent.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  ticketId?: string;
}

const AGENT_API_URL = import.meta.env.VITE_AGENT_API_URL || 'http://localhost:3001';

const SupportPage = () => {
  /* ---- chat state ---- */
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

  /* ---- ticket lookup ---- */
  const [lookupId, setLookupId] = useState('');
  const [lookupResult, setLookupResult] = useState<Ticket | null | 'not_found'>(null);
  const [lookupLoading, setLookupLoading] = useState(false);

  /* ---- session ticket history ---- */
  const [sessionTickets, setSessionTickets] = useState<string[]>([]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'I was unable to process your request. Please try again.',
        ticketId: data.ticket_id || undefined,
      };
      setMessages((prev) => [...prev, assistantMsg]);

      if (data.ticket_id) {
        setSessionTickets((prev) => [...prev, data.ticket_id]);
      }
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

  const handleLookup = async () => {
    const id = lookupId.trim();
    if (!id) return;
    setLookupLoading(true);
    setLookupResult(null);
    const ticket = await getTicketById(id);
    setLookupResult(ticket || 'not_found');
    setLookupLoading(false);
  };

  return (
    <div className="sa-support-page">
      <div className="sa-sp-layout">
        {/* ---- LEFT PANEL ---- */}
        <div className="sa-sp-left">
          <div>
            <h1>Support</h1>
            <p>Get help from the In-Sync service agent. Report issues, check service status, or trigger a fix.</p>
          </div>

          {/* capability cards */}
          <div className="sa-cap-card">
            <h3>Raise a Ticket</h3>
            <p>Report a bug, broken action, or API issue. A support ticket will be created and tracked automatically.</p>
          </div>
          <div className="sa-cap-card">
            <h3>Check Service Health</h3>
            <p>Verify whether WhatsApp API, Supabase, or backend services are operational, degraded, or down.</p>
          </div>
          <div className="sa-cap-card">
            <h3>Trigger a Fix</h3>
            <p>Initiate the automated bug-fix pipeline for a broken action. A tracking ticket is created first.</p>
          </div>

          {/* ticket lookup */}
          <div className="sa-lookup">
            <h3>Ticket Status Lookup</h3>
            <div className="sa-lookup-row">
              <input
                className="sa-lookup-input"
                value={lookupId}
                onChange={(e) => setLookupId(e.target.value)}
                placeholder="Paste ticket UUID..."
                onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
              />
              <button className="sa-lookup-btn" onClick={handleLookup} disabled={lookupLoading || !lookupId.trim()}>
                {lookupLoading ? 'Searching...' : 'Look up'}
              </button>
            </div>
            {lookupResult === 'not_found' && (
              <div className="sa-lookup-result">No ticket found with that ID.</div>
            )}
            {lookupResult && lookupResult !== 'not_found' && (
              <div className="sa-lookup-result">
                <strong>Status:</strong> {lookupResult.status}<br />
                <strong>Category:</strong> {lookupResult.category}<br />
                <strong>Created:</strong> {new Date(lookupResult.created_at).toLocaleString()}<br />
                <strong>Assigned to:</strong> {lookupResult.assigned_to || 'Unassigned'}<br />
                <strong>Message:</strong> {lookupResult.user_message}
              </div>
            )}
          </div>

          {/* session ticket history */}
          <div className="sa-history">
            <h3>Session Tickets</h3>
            {sessionTickets.length === 0 ? (
              <div className="sa-history-empty">No tickets raised this session.</div>
            ) : (
              sessionTickets.map((tid) => (
                <div key={tid} className="sa-history-item">{tid}</div>
              ))
            )}
          </div>
        </div>

        {/* ---- RIGHT PANEL (chat) ---- */}
        <div className="sa-sp-right">
          <div className="sa-header">
            <div className="sa-header-info">
              <div className="sa-header-dot" />
              <span className="sa-header-title">Service Agent</span>
            </div>
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
      </div>
    </div>
  );
};

export default SupportPage;
