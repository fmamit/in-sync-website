import { useState, useEffect } from 'react';
import { supabaseAgent, Ticket } from '@/components/ServiceAgent/supabaseAgent';
import '@/components/ServiceAgent/ServiceAgent.css';

const AGENT_API_URL = import.meta.env.VITE_AGENT_API_URL || 'http://localhost:3001';

type OtpStage = 'idle' | 'sending' | 'sent' | 'verifying';
type StatusFilter = 'all' | 'open' | 'in_progress' | 'resolved';

const SupportAdmin = () => {
  /* ---- auth state ---- */
  const [authed, setAuthed] = useState(false);
  const [stage, setStage] = useState<OtpStage>('idle');
  const [otp, setOtp] = useState('');
  const [maskedNumber, setMaskedNumber] = useState('');
  const [authError, setAuthError] = useState('');
  const [cooldown, setCooldown] = useState(0);

  /* ---- dashboard state ---- */
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [loading, setLoading] = useState(false);

  /* ---- cooldown timer ---- */
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  /* ---- OTP flow ---- */
  const requestOtp = async () => {
    setStage('sending');
    setAuthError('');
    try {
      const res = await fetch(`${AGENT_API_URL}/api/admin/request-otp`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
      setMaskedNumber(data.masked_number || '');
      setStage('sent');
      setCooldown(60);
    } catch (e: unknown) {
      setAuthError(e instanceof Error ? e.message : 'Failed to send OTP');
      setStage('idle');
    }
  };

  const verifyOtp = async () => {
    if (!otp.trim()) return;
    setStage('verifying');
    setAuthError('');
    try {
      const res = await fetch(`${AGENT_API_URL}/api/admin/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: otp.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Verification failed');
      setAuthed(true);
    } catch (e: unknown) {
      setAuthError(e instanceof Error ? e.message : 'Verification failed');
      setStage('sent');
    }
  };

  /* ---- tickets ---- */
  const fetchTickets = async () => {
    setLoading(true);
    let query = supabaseAgent.from('tickets').select('*').order('created_at', { ascending: false });
    if (filter !== 'all') {
      query = query.eq('status', filter);
    }
    const { data, error } = await query;
    if (error) console.error('Failed to fetch tickets:', error.message);
    setTickets((data as Ticket[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    if (authed) fetchTickets();
  }, [authed, filter]);

  const updateStatus = async (ticketId: string, newStatus: 'in_progress' | 'resolved') => {
    const { error } = await supabaseAgent
      .from('tickets')
      .update({ status: newStatus })
      .eq('ticket_id', ticketId);
    if (error) {
      console.error('Failed to update ticket:', error.message);
      return;
    }
    setTickets((prev) =>
      prev.map((t) => (t.ticket_id === ticketId ? { ...t, status: newStatus } : t))
    );
  };

  /* ======== OTP GATE ======== */
  if (!authed) {
    return (
      <div className="sa-admin-page">
        <div className="sa-pin-gate">
          <h2>Admin Access</h2>

          {/* idle — show request button */}
          {(stage === 'idle' || stage === 'sending') && (
            <>
              <p>A one-time code will be sent to the registered admin WhatsApp number.</p>
              <button
                className="sa-pin-btn"
                onClick={requestOtp}
                disabled={stage === 'sending'}
              >
                {stage === 'sending' ? 'Sending...' : 'Send OTP'}
              </button>
            </>
          )}

          {/* sent — show OTP input */}
          {(stage === 'sent' || stage === 'verifying') && (
            <>
              <p>Enter the 6-digit code sent to {maskedNumber || 'your WhatsApp'}.</p>
              <input
                className="sa-pin-input"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                onKeyDown={(e) => e.key === 'Enter' && verifyOtp()}
                placeholder="------"
                autoFocus
                disabled={stage === 'verifying'}
              />
              <button
                className="sa-pin-btn"
                onClick={verifyOtp}
                disabled={stage === 'verifying' || otp.length < 6}
              >
                {stage === 'verifying' ? 'Verifying...' : 'Verify'}
              </button>
              <button
                className="sa-pin-btn"
                style={{ marginTop: 10, background: 'transparent', border: '1px solid var(--sa-navy-border)', color: 'var(--sa-text-muted)' }}
                onClick={requestOtp}
                disabled={cooldown > 0 || stage === 'verifying'}
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend OTP'}
              </button>
            </>
          )}

          {authError && <div className="sa-pin-error">{authError}</div>}
        </div>
      </div>
    );
  }

  /* ======== DASHBOARD ======== */
  return (
    <div className="sa-admin-page">
      <div className="sa-admin-dash">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 4 }}>
          <h1>Ticket Dashboard</h1>
          <button className="sa-refresh-btn" onClick={fetchTickets}>
            Refresh
          </button>
        </div>
        <p className="sa-admin-subtitle">
          Viewing {filter === 'all' ? 'all' : filter.replace('_', ' ')} tickets &middot; {tickets.length} results
        </p>

        <div className="sa-admin-filters">
          {(['all', 'open', 'in_progress', 'resolved'] as StatusFilter[]).map((f) => (
            <button
              key={f}
              className={`sa-filter-btn ${filter === f ? 'sa-active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All' : f.replace('_', ' ')}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="sa-empty">Loading tickets...</div>
        ) : tickets.length === 0 ? (
          <div className="sa-empty">No tickets found.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="sa-admin-table">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Project</th>
                  <th>Category</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Assigned</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t.ticket_id}>
                    <td className="sa-td-id" title={t.ticket_id}>
                      {t.ticket_id.slice(0, 8)}...
                    </td>
                    <td>{t.project_name}</td>
                    <td>{t.category}</td>
                    <td className="sa-td-msg" title={t.user_message}>
                      {t.user_message}
                    </td>
                    <td>
                      <span className={`sa-badge sa-badge--${t.status}`}>
                        {t.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td>{t.assigned_to || '\u2014'}</td>
                    <td style={{ whiteSpace: 'nowrap', fontSize: 12 }}>
                      {new Date(t.created_at).toLocaleString()}
                    </td>
                    <td>
                      <div className="sa-action-btns">
                        <button
                          className="sa-action-btn"
                          disabled={t.status === 'in_progress'}
                          onClick={() => updateStatus(t.ticket_id, 'in_progress')}
                        >
                          In Progress
                        </button>
                        <button
                          className="sa-action-btn"
                          disabled={t.status === 'resolved'}
                          onClick={() => updateStatus(t.ticket_id, 'resolved')}
                        >
                          Resolve
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportAdmin;
