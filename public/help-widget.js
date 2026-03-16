/**
 * In-Sync Help Ticket Widget
 * Ticket submission + tracking with screenshot upload, priority, and auto browser info.
 * <script src="/help-widget.js" data-source="PLATFORM" data-color="#8b5cf6" data-position="right" data-company="in-sync-website"></script>
 */
(function () {
  "use strict";

  var SUPABASE_URL = "https://ljggjepqdqdffoejizpg.supabase.co";
  var SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqZ2dqZXBxZHFkZmZvZWppenBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMzg0MzAsImV4cCI6MjA4NzkxNDQzMH0.q7J0MALSejAlA1GT5nPsQAv0XmiT3BXSYOOJNwIaUP4";

  var scriptTag = document.currentScript;
  var COLOR = (scriptTag && scriptTag.getAttribute("data-color")) || "#8b5cf6";
  var POSITION = (scriptTag && scriptTag.getAttribute("data-position")) || "right";
  var SOURCE = (scriptTag && scriptTag.getAttribute("data-source")) || "website";
  var MAX_FILE_SIZE = 5 * 1024 * 1024;
  var MAX_IMG = 5;
  var MAX_VID = 2;

  // Check if currently within working hours (Mon-Fri 9AM-6PM IST)
  function isOnline() {
    var now = new Date();
    var ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    var day = ist.getDay();
    var hour = ist.getHours();
    return day >= 1 && day <= 5 && hour >= 9 && hour < 18;
  }

  // Get browser & OS info for debugging
  function getSystemInfo() {
    var ua = navigator.userAgent;
    var browser = "Unknown";
    if (ua.indexOf("Chrome") > -1 && ua.indexOf("Edg") === -1) browser = "Chrome";
    else if (ua.indexOf("Edg") > -1) browser = "Edge";
    else if (ua.indexOf("Firefox") > -1) browser = "Firefox";
    else if (ua.indexOf("Safari") > -1) browser = "Safari";
    var os = "Unknown";
    if (ua.indexOf("Win") > -1) os = "Windows";
    else if (ua.indexOf("Mac") > -1) os = "macOS";
    else if (ua.indexOf("Linux") > -1) os = "Linux";
    else if (ua.indexOf("Android") > -1) os = "Android";
    else if (/iPhone|iPad/.test(ua)) os = "iOS";
    return { browser: browser, os: os, url: window.location.href, screen: screen.width + "x" + screen.height };
  }

  var online = isOnline();
  var statusDot = online ? "#22c55e" : "#f59e0b";
  var statusText = online ? "We're online" : "We'll respond during business hours";

  var style = document.createElement("style");
  style.textContent = `
    #ihw-root *, #ihw-root *::before, #ihw-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
    #ihw-root {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      position: fixed; bottom: 24px; ${POSITION}: 24px; z-index: 999998;
    }
    .ihw-fab {
      width: 56px; height: 56px; border-radius: 50%; background: ${COLOR};
      border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 20px rgba(139,92,246,0.4); transition: transform 0.2s, box-shadow 0.2s;
      position: relative;
    }
    .ihw-fab:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(139,92,246,0.5); }
    .ihw-fab svg { width: 26px; height: 26px; fill: #fff; }
    .ihw-fab .ihw-ic-close { display: none; }
    .ihw-fab.ihw-active .ihw-ic-open { display: none; }
    .ihw-fab.ihw-active .ihw-ic-close { display: block; }
    .ihw-fab-tip {
      position: absolute; ${POSITION === "right" ? "right: 66px" : "left: 66px"};
      top: 50%; transform: translateY(-50%); background: #1f2937; color: #fff;
      padding: 6px 14px; border-radius: 8px; font-size: 13px; white-space: nowrap;
      opacity: 0; pointer-events: none; transition: opacity 0.2s;
    }
    .ihw-fab:hover .ihw-fab-tip { opacity: 1; }
    .ihw-badge {
      position: absolute; top: -2px; right: -2px; width: 14px; height: 14px;
      border-radius: 50%; background: ${statusDot}; border: 2px solid #fff;
    }
    .ihw-panel {
      display: none; position: fixed; bottom: 92px; ${POSITION}: 24px;
      width: 420px; max-width: calc(100vw - 32px); max-height: calc(100vh - 120px);
      background: #fff; border-radius: 16px;
      box-shadow: 0 10px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05);
      overflow: hidden; flex-direction: column; animation: ihw-up 0.3s ease;
    }
    .ihw-panel.ihw-open { display: flex; }
    @keyframes ihw-up { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    .ihw-hdr { background: ${COLOR}; padding: 20px 24px; }
    .ihw-hdr h3 { color: #fff; font-size: 17px; font-weight: 700; margin-bottom: 2px; }
    .ihw-hdr-status { display: flex; align-items: center; gap: 6px; margin-top: 4px; }
    .ihw-hdr-dot { width: 8px; height: 8px; border-radius: 50%; background: ${statusDot}; }
    .ihw-hdr-status span { color: rgba(255,255,255,0.85); font-size: 12px; }
    /* Tabs */
    .ihw-tabs { display: flex; border-bottom: 1px solid #e5e7eb; }
    .ihw-tab {
      flex: 1; padding: 11px; border: none; background: #fff; cursor: pointer;
      font-size: 13px; font-weight: 500; color: #6b7280; transition: all 0.2s;
      border-bottom: 2px solid transparent; font-family: inherit;
    }
    .ihw-tab.ihw-active { color: ${COLOR}; border-bottom-color: ${COLOR}; background: #faf5ff; }
    .ihw-body { padding: 18px 20px; overflow-y: auto; flex: 1; }
    .ihw-tab-content { display: none; }
    .ihw-tab-content.ihw-show { display: block; }
    .ihw-row { display: flex; gap: 12px; }
    .ihw-row .ihw-fld { flex: 1; }
    .ihw-fld { margin-bottom: 14px; }
    .ihw-fld label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 5px; }
    .ihw-fld label .ihw-req { color: #ef4444; }
    .ihw-fld input, .ihw-fld textarea, .ihw-fld select {
      width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 8px;
      font-size: 14px; font-family: inherit; outline: none; background: #fff; color: #1f2937;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .ihw-fld input:focus, .ihw-fld textarea:focus, .ihw-fld select:focus {
      border-color: ${COLOR}; box-shadow: 0 0 0 3px rgba(139,92,246,0.1);
    }
    .ihw-fld textarea { resize: vertical; min-height: 80px; }
    .ihw-fld input.ihw-err, .ihw-fld textarea.ihw-err, .ihw-fld select.ihw-err { border-color: #ef4444; }
    .ihw-err-msg { color: #ef4444; font-size: 12px; margin-top: 4px; }
    /* Priority */
    .ihw-prio { display: flex; gap: 8px; }
    .ihw-prio-btn {
      flex: 1; padding: 7px 4px; border: 1px solid #d1d5db; border-radius: 8px; background: #fff;
      cursor: pointer; font-size: 12px; font-weight: 500; text-align: center;
      transition: all 0.2s; color: #6b7280; font-family: inherit;
    }
    .ihw-prio-btn:hover { border-color: #9ca3af; }
    .ihw-prio-btn.ihw-sel { border-width: 2px; }
    .ihw-prio-btn[data-p="low"].ihw-sel { border-color:#22c55e; background:#f0fdf4; color:#166534; }
    .ihw-prio-btn[data-p="medium"].ihw-sel { border-color:#f59e0b; background:#fffbeb; color:#92400e; }
    .ihw-prio-btn[data-p="high"].ihw-sel { border-color:#f97316; background:#fff7ed; color:#9a3412; }
    .ihw-prio-btn[data-p="critical"].ihw-sel { border-color:#ef4444; background:#fef2f2; color:#991b1b; }
    /* Upload */
    .ihw-upload-wrap { display: flex; gap: 8px; }
    .ihw-upload {
      flex: 1; border: 2px dashed #d1d5db; border-radius: 8px; padding: 14px;
      text-align: center; cursor: pointer; transition: all 0.2s; background: #fafafa;
    }
    .ihw-upload:hover { border-color: ${COLOR}; background: #f5f3ff; }
    .ihw-upload svg { width: 24px; height: 24px; margin: 0 auto 4px; fill: #9ca3af; display: block; }
    .ihw-upload p { font-size: 12px; color: #6b7280; }
    .ihw-upload .ihw-hint { font-size: 10px; color: #9ca3af; margin-top: 3px; }
    .ihw-ss-btn {
      width: 48px; border: 2px dashed #d1d5db; border-radius: 8px; background: #fafafa;
      cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center;
      transition: all 0.2s; gap: 2px;
    }
    .ihw-ss-btn:hover { border-color: ${COLOR}; background: #f5f3ff; }
    .ihw-ss-btn svg { width: 20px; height: 20px; fill: #9ca3af; }
    .ihw-ss-btn span { font-size: 8px; color: #9ca3af; font-weight: 600; }
    .ihw-previews { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px; }
    .ihw-prev {
      position: relative; width: 64px; height: 64px; border-radius: 8px;
      overflow: hidden; border: 1px solid #e5e7eb;
    }
    .ihw-prev img, .ihw-prev video { width: 100%; height: 100%; object-fit: cover; }
    .ihw-prev-rm {
      position: absolute; top: 2px; right: 2px; width: 20px; height: 20px;
      border-radius: 50%; background: rgba(0,0,0,0.6); color: #fff; border: none;
      cursor: pointer; font-size: 12px; display: flex; align-items: center; justify-content: center;
    }
    .ihw-btn {
      width: 100%; padding: 12px; background: ${COLOR}; color: #fff; border: none;
      border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer;
      transition: opacity 0.2s, transform 0.1s; margin-top: 4px;
    }
    .ihw-btn:hover { opacity: 0.92; }
    .ihw-btn:active { transform: scale(0.98); }
    .ihw-btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .ihw-spin {
      display: inline-block; width: 18px; height: 18px;
      border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
      border-radius: 50%; animation: ihw-sp 0.6s linear infinite;
      vertical-align: middle; margin-right: 8px;
    }
    @keyframes ihw-sp { to { transform: rotate(360deg); } }
    /* Success */
    .ihw-ok { text-align: center; padding: 20px 0; }
    .ihw-ok-ic {
      width: 60px; height: 60px; border-radius: 50%; background: #dcfce7;
      display: flex; align-items: center; justify-content: center; margin: 0 auto 14px;
    }
    .ihw-ok-ic svg { width: 30px; height: 30px; fill: #16a34a; }
    .ihw-ok h4 { color: #166534; font-size: 17px; margin-bottom: 8px; }
    .ihw-ok .ihw-tkt {
      background: #f0fdf4; border: 1px solid #bbf7d0; padding: 10px 18px;
      border-radius: 8px; display: inline-block; margin: 10px 0;
    }
    .ihw-ok .ihw-tkt span { font-size: 20px; font-weight: 700; color: ${COLOR}; letter-spacing: 1px; }
    .ihw-ok p { color: #6b7280; font-size: 13px; line-height: 1.5; }
    .ihw-ok .ihw-res {
      background: #f5f3ff; border: 1px solid #ddd6fe; padding: 10px 14px;
      border-radius: 8px; margin: 14px 0; font-size: 12px; color: #6d28d9;
    }
    .ihw-ok-btn {
      margin-top: 14px; padding: 9px 20px; background: #f3f4f6; color: #374151;
      border: none; border-radius: 8px; font-size: 13px; cursor: pointer; font-family: inherit;
    }
    .ihw-ok-btn:hover { background: #e5e7eb; }
    /* Track ticket */
    .ihw-track-card {
      background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; margin-top: 14px;
    }
    .ihw-track-row {
      display: flex; justify-content: space-between; padding: 8px 0;
      border-bottom: 1px solid #f1f5f9; font-size: 13px;
    }
    .ihw-track-row:last-child { border-bottom: none; }
    .ihw-track-lbl { color: #6b7280; font-weight: 500; }
    .ihw-track-val { color: #1f2937; font-weight: 600; }
    .ihw-badge-status {
      display: inline-block; padding: 3px 10px; border-radius: 12px;
      font-size: 11px; font-weight: 600; text-transform: uppercase;
    }
    .ihw-st-open { background:#dbeafe; color:#1e40af; }
    .ihw-st-in_progress { background:#fef3c7; color:#92400e; }
    .ihw-st-resolved { background:#dcfce7; color:#166534; }
    .ihw-st-closed { background:#f3f4f6; color:#6b7280; }
    .ihw-wh {
      background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px;
      padding: 10px 14px; margin-top: 12px; font-size: 11px; color: #92400e; line-height: 1.5;
    }
    /* System info bar */
    .ihw-sysinfo {
      background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;
      padding: 8px 12px; margin-bottom: 14px; font-size: 11px; color: #9ca3af;
      display: flex; flex-wrap: wrap; gap: 8px;
    }
    .ihw-sysinfo span { display: flex; align-items: center; gap: 3px; }
    .ihw-sysinfo svg { width: 12px; height: 12px; fill: #9ca3af; }
    /* Footer */
    .ihw-footer {
      padding: 10px 16px; border-top: 1px solid #f3f4f6;
      text-align: center; font-size: 11px; color: #9ca3af;
    }
    .ihw-footer a { color: ${COLOR}; text-decoration: none; font-weight: 600; }
    @media (max-width: 480px) {
      .ihw-panel { bottom:0; ${POSITION}:0; width:100vw; max-width:100vw; max-height:90vh; border-radius:16px 16px 0 0; }
      #ihw-root { bottom:16px; ${POSITION}:16px; }
    }
  `;
  document.head.appendChild(style);

  var sysInfo = getSystemInfo();

  var w = document.createElement("div");
  w.id = "ihw-root";
  w.innerHTML = `
    <button class="ihw-fab" aria-label="Raise a ticket">
      <span class="ihw-fab-tip">Need Help?</span>
      <span class="ihw-badge"></span>
      <svg class="ihw-ic-open" viewBox="0 0 24 24"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>
      <svg class="ihw-ic-close" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
    </button>
    <div class="ihw-panel">
      <div class="ihw-hdr">
        <h3>Help & Support</h3>
        <div class="ihw-hdr-status">
          <span class="ihw-hdr-dot"></span>
          <span>${statusText}</span>
        </div>
      </div>
      <div class="ihw-tabs">
        <button class="ihw-tab ihw-active" data-tab="submit">Raise Ticket</button>
        <button class="ihw-tab" data-tab="track">Track Ticket</button>
      </div>
      <div class="ihw-body">
        <!-- SUBMIT TAB -->
        <div class="ihw-tab-content ihw-show" id="ihw-tc-submit">
          <div class="ihw-sysinfo">
            <span><svg viewBox="0 0 24 24"><path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/></svg> ${sysInfo.os}</span>
            <span><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg> ${sysInfo.browser}</span>
            <span><svg viewBox="0 0 24 24"><path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z"/></svg> ${sysInfo.screen}</span>
          </div>
          <form id="ihw-form">
            <div class="ihw-row">
              <div class="ihw-fld">
                <label>Name <span class="ihw-req">*</span></label>
                <input type="text" id="ihw-name" placeholder="Your name" required>
              </div>
              <div class="ihw-fld">
                <label>Email <span class="ihw-req">*</span></label>
                <input type="email" id="ihw-email" placeholder="you@email.com" required>
              </div>
            </div>
            <div class="ihw-row">
              <div class="ihw-fld">
                <label>Phone</label>
                <input type="tel" id="ihw-phone" placeholder="+91 XXXXX XXXXX">
              </div>
              <div class="ihw-fld">
                <label>Company</label>
                <input type="text" id="ihw-company" placeholder="Company name">
              </div>
            </div>
            <div class="ihw-fld">
              <label>Category</label>
              <select id="ihw-category">
                <option value="General">General</option>
                <option value="Bug">Bug / Issue</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Billing">Billing</option>
                <option value="Integration">Integration</option>
                <option value="Account">Account / Login</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="ihw-fld">
              <label>Priority</label>
              <div class="ihw-prio">
                <button type="button" class="ihw-prio-btn" data-p="low">Low</button>
                <button type="button" class="ihw-prio-btn ihw-sel" data-p="medium">Medium</button>
                <button type="button" class="ihw-prio-btn" data-p="high">High</button>
                <button type="button" class="ihw-prio-btn" data-p="critical">Critical</button>
              </div>
            </div>
            <div class="ihw-fld">
              <label>Subject <span class="ihw-req">*</span></label>
              <input type="text" id="ihw-subject" placeholder="Brief summary of your issue" required>
            </div>
            <div class="ihw-fld">
              <label>Description <span class="ihw-req">*</span></label>
              <textarea id="ihw-desc" placeholder="Describe your issue in detail..." rows="4" required></textarea>
            </div>
            <div class="ihw-fld">
              <label>Attachments</label>
              <div class="ihw-upload-wrap">
                <div class="ihw-upload" id="ihw-upload">
                  <svg viewBox="0 0 24 24"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/></svg>
                  <p>Click to attach files</p>
                  <div class="ihw-hint">Images (max ${MAX_IMG}, 5MB) · Videos (max ${MAX_VID}, 10MB)</div>
                </div>
                <button type="button" class="ihw-ss-btn" id="ihw-ss-btn" title="Capture screenshot">
                  <svg viewBox="0 0 24 24"><path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h4.05l1.83-2h4.24l1.83 2H20v12zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/></svg>
                  <span>SCREEN</span>
                </button>
              </div>
              <input type="file" id="ihw-file" accept="image/*,video/*" multiple hidden>
              <div class="ihw-previews" id="ihw-previews"></div>
            </div>
            <button type="submit" class="ihw-btn" id="ihw-submit">Submit Ticket</button>
          </form>
          <div class="ihw-ok" id="ihw-ok" style="display:none;"></div>
        </div>
        <!-- TRACK TAB -->
        <div class="ihw-tab-content" id="ihw-tc-track">
          <div class="ihw-fld">
            <label>Ticket Number <span class="ihw-req">*</span></label>
            <input type="text" id="ihw-track-input" placeholder="e.g. TKT-20260316-0001">
          </div>
          <button class="ihw-btn" id="ihw-track-btn">Track Ticket</button>
          <div id="ihw-track-result"></div>
          <div class="ihw-wh">
            <strong>Working Hours:</strong> Monday to Friday, 9:00 AM - 6:00 PM IST.<br>
            Resolution times are calculated based on business hours only.
          </div>
        </div>
      </div>
      <div class="ihw-footer">Powered by <a href="https://in-sync-crm.com" target="_blank">In-Sync CRM</a></div>
    </div>
  `;
  document.body.appendChild(w);

  // State
  var isOpen = false;
  var files = [];
  var selectedPriority = "medium";

  // DOM
  var fab = w.querySelector(".ihw-fab");
  var panel = w.querySelector(".ihw-panel");
  var tabs = w.querySelectorAll(".ihw-tab");
  var tcSubmit = document.getElementById("ihw-tc-submit");
  var tcTrack = document.getElementById("ihw-tc-track");
  var form = document.getElementById("ihw-form");
  var okDiv = document.getElementById("ihw-ok");
  var submitBtn = document.getElementById("ihw-submit");
  var uploadArea = document.getElementById("ihw-upload");
  var ssBtn = document.getElementById("ihw-ss-btn");
  var fileInput = document.getElementById("ihw-file");
  var previews = document.getElementById("ihw-previews");
  var prioBtns = w.querySelectorAll(".ihw-prio-btn");
  var trackBtn = document.getElementById("ihw-track-btn");
  var trackInput = document.getElementById("ihw-track-input");
  var trackResult = document.getElementById("ihw-track-result");

  // Toggle panel
  fab.addEventListener("click", function () {
    isOpen = !isOpen;
    panel.classList.toggle("ihw-open", isOpen);
    fab.classList.toggle("ihw-active", isOpen);
  });

  // Tabs
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("ihw-active"); });
      tab.classList.add("ihw-active");
      var name = tab.getAttribute("data-tab");
      tcSubmit.classList.toggle("ihw-show", name === "submit");
      tcTrack.classList.toggle("ihw-show", name === "track");
    });
  });

  // Priority
  prioBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      prioBtns.forEach(function (b) { b.classList.remove("ihw-sel"); });
      btn.classList.add("ihw-sel");
      selectedPriority = btn.getAttribute("data-p");
    });
  });

  // File upload
  uploadArea.addEventListener("click", function () { fileInput.click(); });
  uploadArea.addEventListener("dragover", function (e) { e.preventDefault(); uploadArea.style.borderColor = COLOR; });
  uploadArea.addEventListener("dragleave", function () { uploadArea.style.borderColor = "#d1d5db"; });
  uploadArea.addEventListener("drop", function (e) {
    e.preventDefault(); uploadArea.style.borderColor = "#d1d5db";
    addFiles(e.dataTransfer.files);
  });
  fileInput.addEventListener("change", function () { addFiles(fileInput.files); fileInput.value = ""; });

  // Screenshot capture
  ssBtn.addEventListener("click", async function () {
    try {
      var stream = await navigator.mediaDevices.getDisplayMedia({ video: { mediaSource: "screen" } });
      var video = document.createElement("video");
      video.srcObject = stream;
      await video.play();
      var canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      stream.getTracks().forEach(function (t) { t.stop(); });
      canvas.toBlob(function (blob) {
        if (blob) {
          var file = new File([blob], "screenshot-" + Date.now() + ".png", { type: "image/png" });
          files.push(file);
          renderPreviews();
        }
      }, "image/png");
    } catch (err) {
      console.log("Screenshot cancelled or not supported");
    }
  });

  function addFiles(list) {
    Array.from(list).forEach(function (f) {
      var isVid = f.type.startsWith("video/");
      var isImg = f.type.startsWith("image/");
      if (!isImg && !isVid) return;
      var imgCount = files.filter(function (x) { return x.type.startsWith("image/"); }).length;
      var vidCount = files.filter(function (x) { return x.type.startsWith("video/"); }).length;
      if (isImg && imgCount >= MAX_IMG) return;
      if (isVid && vidCount >= MAX_VID) return;
      if (isImg && f.size > MAX_FILE_SIZE) { alert(f.name + " exceeds 5 MB."); return; }
      if (isVid && f.size > 10 * 1024 * 1024) { alert(f.name + " exceeds 10 MB."); return; }
      files.push(f);
    });
    renderPreviews();
  }

  function renderPreviews() {
    previews.innerHTML = "";
    files.forEach(function (f, i) {
      var d = document.createElement("div"); d.className = "ihw-prev";
      if (f.type.startsWith("image/")) {
        var img = document.createElement("img"); img.src = URL.createObjectURL(f); d.appendChild(img);
      } else {
        var vid = document.createElement("video"); vid.src = URL.createObjectURL(f); vid.muted = true; d.appendChild(vid);
      }
      var rm = document.createElement("button"); rm.className = "ihw-prev-rm"; rm.innerHTML = "&times;"; rm.type = "button";
      rm.addEventListener("click", function () { files.splice(i, 1); renderPreviews(); });
      d.appendChild(rm); previews.appendChild(d);
    });
  }

  function toBase64(file) {
    return new Promise(function (res, rej) {
      var r = new FileReader();
      r.onload = function () { res(r.result); };
      r.onerror = rej;
      r.readAsDataURL(file);
    });
  }

  // Save form draft to sessionStorage
  function saveDraft() {
    try {
      sessionStorage.setItem("ihw_draft", JSON.stringify({
        name: document.getElementById("ihw-name").value,
        email: document.getElementById("ihw-email").value,
        phone: document.getElementById("ihw-phone").value,
        company: document.getElementById("ihw-company").value,
        category: document.getElementById("ihw-category").value,
        subject: document.getElementById("ihw-subject").value,
        desc: document.getElementById("ihw-desc").value,
        priority: selectedPriority,
      }));
    } catch (e) {}
  }

  function loadDraft() {
    try {
      var d = JSON.parse(sessionStorage.getItem("ihw_draft"));
      if (!d) return;
      if (d.name) document.getElementById("ihw-name").value = d.name;
      if (d.email) document.getElementById("ihw-email").value = d.email;
      if (d.phone) document.getElementById("ihw-phone").value = d.phone;
      if (d.company) document.getElementById("ihw-company").value = d.company;
      if (d.category) document.getElementById("ihw-category").value = d.category;
      if (d.subject) document.getElementById("ihw-subject").value = d.subject;
      if (d.desc) document.getElementById("ihw-desc").value = d.desc;
      if (d.priority) {
        selectedPriority = d.priority;
        prioBtns.forEach(function (b) { b.classList.toggle("ihw-sel", b.getAttribute("data-p") === d.priority); });
      }
    } catch (e) {}
  }

  // Auto-save draft on input
  ["ihw-name","ihw-email","ihw-phone","ihw-company","ihw-subject","ihw-desc"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener("input", saveDraft);
  });
  document.getElementById("ihw-category").addEventListener("change", saveDraft);

  // Load draft on init
  loadDraft();

  // Submit form
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    var name = document.getElementById("ihw-name").value.trim();
    var email = document.getElementById("ihw-email").value.trim();
    var phone = document.getElementById("ihw-phone").value.trim();
    var company = document.getElementById("ihw-company").value.trim();
    var category = document.getElementById("ihw-category").value;
    var subject = document.getElementById("ihw-subject").value.trim();
    var desc = document.getElementById("ihw-desc").value.trim();

    if (!name || !email || !subject || !desc) return;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="ihw-spin"></span>Submitting...';

    try {
      var attachInfo = "";
      if (files.length > 0) {
        attachInfo = "\n\n--- Attachments ---\n";
        for (var i = 0; i < files.length; i++) {
          var b64 = await toBase64(files[i]);
          attachInfo += "File " + (i + 1) + ": " + files[i].name + " (" + (files[i].size / 1024).toFixed(1) + "KB)\nData: " + b64 + "\n\n";
        }
      }

      var fullDesc = desc;
      if (company) fullDesc = "Company: " + company + "\n" + fullDesc;
      if (category) fullDesc = "Category: " + category + "\n" + fullDesc;
      fullDesc += "\n\n--- System Info ---\nBrowser: " + sysInfo.browser + "\nOS: " + sysInfo.os + "\nScreen: " + sysInfo.screen + "\nPage: " + sysInfo.url;
      fullDesc += attachInfo;

      var resp = await fetch(SUPABASE_URL + "/functions/v1/submit-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": "Bearer " + SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          name: name, email: email, phone: phone || undefined,
          subject: subject, description: fullDesc, priority: selectedPriority, source: SOURCE,
        }),
      });

      var result = await resp.json();

      if (result.success) {
        // Clear draft
        try { sessionStorage.removeItem("ihw_draft"); } catch (e) {}
        form.style.display = "none";
        okDiv.style.display = "block";
        okDiv.innerHTML =
          '<div class="ihw-ok">' +
          '<div class="ihw-ok-ic"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div>' +
          '<h4>Ticket Created!</h4>' +
          '<div class="ihw-tkt"><span>' + result.ticket_number + '</span></div>' +
          '<p>Confirmation sent to <strong>' + email + '</strong></p>' +
          '<div class="ihw-res"><strong>Expected Resolution:</strong> ' + result.expected_resolution_formatted +
          '<br>Working Hours: Mon-Fri, 9 AM - 6 PM IST</div>' +
          '<p style="font-size:11px;color:#9ca3af;margin-top:8px;">Save your ticket number <strong>' + result.ticket_number + '</strong> to track progress in the "Track Ticket" tab.</p>' +
          '<button class="ihw-ok-btn" id="ihw-new">Submit Another Ticket</button>' +
          '</div>';
        document.getElementById("ihw-new").addEventListener("click", function () {
          form.reset(); form.style.display = "block"; okDiv.style.display = "none";
          files = []; renderPreviews(); selectedPriority = "medium";
          prioBtns.forEach(function (b) { b.classList.toggle("ihw-sel", b.getAttribute("data-p") === "medium"); });
        });
      } else {
        alert("Error: " + (result.error || "Failed to create ticket."));
      }
    } catch (err) {
      alert("Network error. Please try again.");
      console.error("Help widget error:", err);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Submit Ticket";
    }
  });

  // Track ticket
  trackBtn.addEventListener("click", async function () {
    var num = trackInput.value.trim().toUpperCase();
    if (!num) { trackResult.innerHTML = '<p class="ihw-err-msg">Please enter a ticket number</p>'; return; }

    trackBtn.disabled = true;
    trackBtn.innerHTML = '<span class="ihw-spin"></span>Searching...';

    try {
      var resp = await fetch(
        SUPABASE_URL + "/rest/v1/support_tickets?ticket_number=eq." + encodeURIComponent(num) + "&select=*",
        { headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + SUPABASE_ANON_KEY } }
      );
      var tickets = await resp.json();

      if (tickets && tickets.length > 0) {
        var t = tickets[0];
        var stCls = "ihw-st-" + t.status;
        var stLbl = t.status.replace("_", " ").toUpperCase();
        var created = new Date(t.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
        var resolved = "";
        if (t.resolved_at) {
          var rDate = new Date(t.resolved_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
          resolved = '<div class="ihw-track-row"><span class="ihw-track-lbl">Resolved</span><span class="ihw-track-val">' + rDate + '</span></div>';
          if (t.resolution_working_hours) {
            resolved += '<div class="ihw-track-row"><span class="ihw-track-lbl">Resolution Time</span><span class="ihw-track-val">' + t.resolution_working_hours + ' working hrs</span></div>';
          }
        }
        trackResult.innerHTML = '<div class="ihw-track-card">' +
          '<div class="ihw-track-row"><span class="ihw-track-lbl">Ticket</span><span class="ihw-track-val">' + t.ticket_number + '</span></div>' +
          '<div class="ihw-track-row"><span class="ihw-track-lbl">Subject</span><span class="ihw-track-val">' + t.subject + '</span></div>' +
          '<div class="ihw-track-row"><span class="ihw-track-lbl">Status</span><span class="ihw-badge-status ' + stCls + '">' + stLbl + '</span></div>' +
          '<div class="ihw-track-row"><span class="ihw-track-lbl">Priority</span><span class="ihw-track-val" style="text-transform:capitalize;">' + t.priority + '</span></div>' +
          '<div class="ihw-track-row"><span class="ihw-track-lbl">Created</span><span class="ihw-track-val">' + created + '</span></div>' +
          resolved + '</div>';
      } else {
        trackResult.innerHTML = '<p class="ihw-err-msg" style="text-align:center;padding:20px;">No ticket found with number <strong>' + num + '</strong></p>';
      }
    } catch (err) {
      trackResult.innerHTML = '<p class="ihw-err-msg">Failed to fetch ticket. Please try again.</p>';
    } finally {
      trackBtn.disabled = false;
      trackBtn.innerHTML = "Track Ticket";
    }
  });

  trackInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); trackBtn.click(); }
  });
})();
