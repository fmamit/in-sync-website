import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabaseAgent } from './supabaseAgent';
import './ServiceAgent.css';

interface Attachment {
  name: string;
  url: string;
  type: 'image' | 'video';
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  ticketId?: string;
  attachments?: Attachment[];
}

const AGENT_API_URL = import.meta.env.VITE_AGENT_API_URL || 'http://localhost:3001';

const MAX_IMAGES = 6;
const MAX_VIDEOS = 1;
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/webm'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file

const FloatingAgent = () => {
  const { loading, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Hello. I am the In-Sync service agent. I can raise a support ticket, check if a service is down, or trigger a fix for a broken action. You can attach up to 6 screenshots and 1 video to help describe your issue.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;
    setUploadError('');

    const currentImages = files.filter((f) => IMAGE_TYPES.includes(f.type));
    const currentVideos = files.filter((f) => VIDEO_TYPES.includes(f.type));

    for (const file of selected) {
      if (file.size > MAX_FILE_SIZE) {
        setUploadError(`${file.name} exceeds 10MB limit`);
        return;
      }
      const isImage = IMAGE_TYPES.includes(file.type);
      const isVideo = VIDEO_TYPES.includes(file.type);
      if (!isImage && !isVideo) {
        setUploadError('Only images (JPG, PNG, GIF, WebP) and videos (MP4, MOV, WebM) are allowed');
        return;
      }
      if (isImage && currentImages.length + selected.filter((f) => IMAGE_TYPES.includes(f.type)).length > MAX_IMAGES) {
        setUploadError(`Maximum ${MAX_IMAGES} screenshots allowed`);
        return;
      }
      if (isVideo && currentVideos.length + selected.filter((f) => VIDEO_TYPES.includes(f.type)).length > MAX_VIDEOS) {
        setUploadError(`Maximum ${MAX_VIDEOS} video allowed`);
        return;
      }
    }

    setFiles((prev) => [...prev, ...selected]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setUploadError('');
  };

  const uploadFiles = async (): Promise<Attachment[]> => {
    const attachments: Attachment[] = [];
    for (const file of files) {
      const ext = file.name.split('.').pop() || 'bin';
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabaseAgent.storage
        .from('ticket-attachments')
        .upload(path, file, { contentType: file.type });
      if (error) {
        console.error('Upload failed:', file.name, error.message);
        continue;
      }
      const { data: urlData } = supabaseAgent.storage
        .from('ticket-attachments')
        .getPublicUrl(path);
      attachments.push({
        name: file.name,
        url: urlData.publicUrl,
        type: IMAGE_TYPES.includes(file.type) ? 'image' : 'video',
      });
    }
    return attachments;
  };

  const handleSend = async () => {
    const text = input.trim();
    if ((!text && files.length === 0) || isLoading) return;

    let attachments: Attachment[] = [];
    setIsLoading(true);

    // Upload files first
    if (files.length > 0) {
      attachments = await uploadFiles();
      setFiles([]);
    }

    const messageText = text || '(attached files)';
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      attachments: attachments.length > 0 ? attachments : undefined,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Build message with attachment info for the agent
    let agentMessage = messageText;
    if (attachments.length > 0) {
      const attachmentList = attachments.map((a) => `- ${a.type}: ${a.name} (${a.url})`).join('\n');
      agentMessage += `\n\n[User attached ${attachments.length} file(s):\n${attachmentList}]`;
    }

    try {
      const res = await fetch(`${AGENT_API_URL}/api/agent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: agentMessage,
          conversation_history: buildConversationHistory(),
          attachments: attachments.length > 0 ? attachments : undefined,
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

  if (loading || !isAdmin) return null;

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
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="sa-attachments">
                      {msg.attachments.map((att, i) => (
                        <div key={i} className="sa-attachment-thumb">
                          {att.type === 'image' ? (
                            <img src={att.url} alt={att.name} />
                          ) : (
                            <div className="sa-video-badge">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                              <span>{att.name}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
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

          {files.length > 0 && (
            <div className="sa-file-preview-strip">
              {files.map((file, i) => (
                <div key={i} className="sa-file-preview-item">
                  {IMAGE_TYPES.includes(file.type) ? (
                    <img src={URL.createObjectURL(file)} alt={file.name} />
                  ) : (
                    <div className="sa-file-preview-video">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                  )}
                  <button className="sa-file-remove" onClick={() => removeFile(i)} aria-label="Remove file">&times;</button>
                </div>
              ))}
            </div>
          )}
          {uploadError && <div className="sa-upload-error">{uploadError}</div>}
          <div className="sa-input-area">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp,video/mp4,video/quicktime,video/webm"
              multiple
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            <button
              className="sa-attach-btn"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              aria-label="Attach files"
              title={`Attach screenshots (${MAX_IMAGES - files.filter(f => IMAGE_TYPES.includes(f.type)).length} left) or video (${MAX_VIDEOS - files.filter(f => VIDEO_TYPES.includes(f.type)).length} left)`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            </button>
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
              disabled={(!input.trim() && files.length === 0) || isLoading}
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
