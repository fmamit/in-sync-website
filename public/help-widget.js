/**
 * In-Sync Help Ticket Widget
 * Compact ticket submission + tracking with screenshot upload, priority, and auto browser info.
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

  function isOnline() {
    var now = new Date();
    var ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    var day = ist.getDay();
    var hour = ist.getHours();
    return day >= 1 && day <= 5 && hour >= 9 && hour < 18;
  }

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
  var statusText = online ? "We're online" : "We'll respond in business hours";

  var style = document.createElement("style");
  style.textContent = `
    #ihw-root, #ihw-root *, #ihw-root *::before, #ihw-root *::after {
      box-sizing: border-box !important;
      border: 0 none transparent !important;
      font-family: -apple-system, 'Segoe UI', Roboto, sans-serif !important;
      line-height: 1.4 !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    #ihw-root {
      position: fixed !important; bottom: 20px !important; ${POSITION}: 20px !important; z-index: 999998 !important;
    }
    /* FAB */
    .ihw-fab {
      width: 42px !important; height: 42px !important; border-radius: 50% !important; background: ${COLOR};
      border: none !important; cursor: pointer !important; display: flex !important; align-items: center !important; justify-content: center !important;
      box-shadow: 0 2px 12px rgba(139,92,246,0.3) !important; transition: transform 0.2s !important;
      position: relative !important;
    }
    .ihw-fab:hover { transform: scale(1.1) !important; }
    .ihw-fab svg { width: 18px !important; height: 18px !important; fill: #fff !important; }
    .ihw-fab .ihw-ic-close { display: none !important; }
    .ihw-fab.ihw-active .ihw-ic-open { display: none !important; }
    .ihw-fab.ihw-active .ihw-ic-close { display: block !important; }
    .ihw-fab-tip {
      position: absolute !important; ${POSITION === "right" ? "right: 52px" : "left: 52px"};
      top: 50% !important; transform: translateY(-50%) !important; background: #1f2937 !important; color: #fff !important;
      padding: 4px 10px !important; border-radius: 6px !important; font-size: 11px !important; white-space: nowrap !important;
      opacity: 0 !important; pointer-events: none !important; transition: opacity 0.2s !important;
    }
    .ihw-fab:hover .ihw-fab-tip { opacity: 1 !important; }
    .ihw-dot {
      position: absolute !important; top: -1px !important; right: -1px !important; width: 10px !important; height: 10px !important;
      border-radius: 50% !important; background: ${statusDot}; border: 2px solid #fff !important;
    }
    /* Panel */
    .ihw-panel {
      display: none !important; position: fixed !important;
      top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important;
      width: 400px !important; max-width: calc(100vw - 32px) !important; max-height: calc(100vh - 40px) !important;
      background: #fff !important; border-radius: 12px !important;
      box-shadow: 0 20px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05) !important;
      overflow: hidden !important; flex-direction: column !important; animation: ihw-up 0.25s ease !important;
      z-index: 999999 !important;
    }
    .ihw-overlay {
      display: none !important; position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
      background: rgba(0,0,0,0.3) !important; z-index: 999998 !important;
    }
    .ihw-overlay.ihw-show { display: block !important; }
    .ihw-panel.ihw-open { display: flex !important; }
    @keyframes ihw-up { from { opacity:0; transform: translate(-50%, -48%) scale(0.96) !important; } to { opacity:1; transform: translate(-50%, -50%) scale(1) !important; } }
    /* Header */
    .ihw-hdr { background: ${COLOR}; padding: 12px 16px !important; flex-shrink: 0 !important; }
    .ihw-hdr h3 { color: #fff !important; font-size: 14px !important; font-weight: 600 !important; }
    .ihw-hdr-status { display: flex !important; align-items: center !important; gap: 5px !important; margin-top: 2px !important; }
    .ihw-hdr-dot { width: 6px !important; height: 6px !important; border-radius: 50% !important; background: ${statusDot}; flex-shrink: 0 !important; }
    .ihw-hdr-status span { color: rgba(255,255,255,0.8) !important; font-size: 11px !important; }
    /* Tabs */
    .ihw-tabs { display: flex !important; border-bottom: 1px solid #e5e7eb !important; flex-shrink: 0 !important; }
    .ihw-tab {
      flex: 1 !important; padding: 7px !important; border: none !important; background: #fff !important; cursor: pointer !important;
      font-size: 11px !important; font-weight: 600 !important; color: #9ca3af !important; transition: all 0.15s !important;
      border-bottom: 2px solid transparent !important; font-family: inherit !important; text-transform: uppercase !important; letter-spacing: 0.3px !important;
    }
    .ihw-tab.ihw-active { color: ${COLOR}; border-bottom-color: ${COLOR}; background: #faf5ff !important; }
    /* Body */
    .ihw-body { padding: 10px 14px !important; overflow-y: auto !important; flex: 1 !important; min-height: 0 !important; }
    .ihw-tc { display: none !important; }
    .ihw-tc.ihw-show { display: block !important; }
    /* Form fields */
    .ihw-r { display: flex !important; gap: 8px !important; }
    .ihw-r > .ihw-f { flex: 1 !important; min-width: 0 !important; }
    .ihw-f { margin-bottom: 8px !important; }
    .ihw-f label {
      display: block !important; font-size: 11px !important; font-weight: 600 !important; color: #4b5563 !important;
      margin-bottom: 2px !important; letter-spacing: 0.2px !important;
    }
    .ihw-f label .rq { color: #ef4444 !important; }
    .ihw-f input, .ihw-f textarea, .ihw-f select {
      width: 100% !important; padding: 6px 8px !important; border: 1px solid #d1d5db !important; border-radius: 5px !important;
      font-size: 12px !important; font-family: inherit !important; outline: none !important; background: #fff !important; color: #1f2937 !important;
      transition: border-color 0.15s !important;
    }
    .ihw-f input:focus, .ihw-f textarea:focus, .ihw-f select:focus {
      border-color: ${COLOR};
    }
    .ihw-f input::placeholder, .ihw-f textarea::placeholder { color: #b0b0b0 !important; font-size: 11px !important; }
    .ihw-f textarea { resize: vertical !important; min-height: 50px !important; max-height: 120px !important; }
    .ihw-f select { padding: 5px 8px !important; cursor: pointer !important; }
    /* Priority */
    .ihw-pr { display: flex !important; gap: 4px !important; }
    .ihw-pb {
      flex: 1 !important; padding: 4px 2px !important; border: 1px solid #d1d5db !important; border-radius: 4px !important; background: #fff !important;
      cursor: pointer !important; font-size: 10px !important; font-weight: 600 !important; text-align: center !important;
      transition: all 0.15s !important; color: #9ca3af !important; font-family: inherit !important;
    }
    .ihw-pb:hover { border-color: #aaa !important; }
    .ihw-pb.sel { border-width: 2px !important; }
    .ihw-pb[data-p="low"].sel { border-color:#22c55e; background:#f0fdf4; color:#166534; }
    .ihw-pb[data-p="medium"].sel { border-color:#f59e0b; background:#fffbeb; color:#92400e; }
    .ihw-pb[data-p="high"].sel { border-color:#f97316; background:#fff7ed; color:#9a3412; }
    .ihw-pb[data-p="critical"].sel { border-color:#ef4444; background:#fef2f2; color:#991b1b; }
    /* Attach */
    .ihw-att { display: flex !important; gap: 6px !important; }
    .ihw-upl {
      flex: 1 !important; border: 1.5px dashed #d1d5db !important; border-radius: 5px !important; padding: 8px !important;
      text-align: center !important; cursor: pointer !important; transition: all 0.15s !important; background: #fafafa !important;
    }
    .ihw-upl:hover { border-color: ${COLOR}; background: #f5f3ff !important; }
    .ihw-upl svg { width: 16px !important; height: 16px !important; margin: 0 auto 2px !important; fill: #b0b0b0 !important; display: block !important; }
    .ihw-upl p { font-size: 10px !important; color: #888 !important; }
    .ihw-upl .ht { font-size: 8px !important; color: #b0b0b0 !important; margin-top: 1px !important; }
    .ihw-ssb {
      width: 36px !important; border: 1.5px dashed #d1d5db !important; border-radius: 5px !important; background: #fafafa !important;
      cursor: pointer !important; display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important;
      transition: all 0.15s !important; gap: 1px !important; flex-shrink: 0 !important;
    }
    .ihw-ssb:hover { border-color: ${COLOR}; background: #f5f3ff !important; }
    .ihw-ssb svg { width: 14px !important; height: 14px !important; fill: #b0b0b0 !important; }
    .ihw-ssb span { font-size: 7px !important; color: #b0b0b0 !important; font-weight: 700 !important; }
    .ihw-pvs { display: flex !important; gap: 4px !important; flex-wrap: wrap !important; margin-top: 6px !important; }
    .ihw-pv {
      position: relative !important; width: 40px !important; height: 40px !important; border-radius: 4px !important;
      overflow: hidden !important; border: 1px solid #e5e7eb !important;
    }
    .ihw-pv img, .ihw-pv video { width: 100% !important; height: 100% !important; object-fit: cover !important; }
    .ihw-pv-x {
      position: absolute !important; top: 1px !important; right: 1px !important; width: 16px !important; height: 16px !important;
      border-radius: 50% !important; background: rgba(0,0,0,0.6) !important; color: #fff !important; border: none !important;
      cursor: pointer !important; font-size: 10px !important; display: flex !important; align-items: center !important; justify-content: center !important;
    }
    /* Submit btn */
    .ihw-btn {
      width: 100% !important; padding: 8px !important; background: ${COLOR}; color: #fff !important; border: none !important;
      border-radius: 6px !important; font-size: 12px !important; font-weight: 600 !important; cursor: pointer !important;
      transition: opacity 0.15s !important; margin-top: 6px !important;
    }
    .ihw-btn:hover { opacity: 0.9 !important; }
    .ihw-btn:disabled { opacity: 0.5 !important; cursor: not-allowed !important; }
    .ihw-sp {
      display: inline-block !important; width: 14px !important; height: 14px !important;
      border: 2px solid rgba(255,255,255,0.3) !important; border-top-color: #fff !important;
      border-radius: 50% !important; animation: ihw-spin 0.6s linear infinite !important;
      vertical-align: middle !important; margin-right: 6px !important;
    }
    @keyframes ihw-spin { to { transform: rotate(360deg) !important; } }
    /* Success */
    .ihw-ok { text-align: center !important; padding: 16px 0 !important; }
    .ihw-ok-ic {
      width: 48px !important; height: 48px !important; border-radius: 50% !important; background: #dcfce7 !important;
      display: flex !important; align-items: center !important; justify-content: center !important; margin: 0 auto 10px !important;
    }
    .ihw-ok-ic svg { width: 24px !important; height: 24px !important; fill: #16a34a !important; }
    .ihw-ok h4 { color: #166534 !important; font-size: 14px !important; margin-bottom: 6px !important; }
    .ihw-ok .ihw-tkt {
      background: #f0fdf4 !important; border: 1px solid #bbf7d0 !important; padding: 6px 14px !important;
      border-radius: 6px !important; display: inline-block !important; margin: 6px 0 !important;
    }
    .ihw-ok .ihw-tkt span { font-size: 16px !important; font-weight: 700 !important; color: ${COLOR}; letter-spacing: 0.5px !important; }
    .ihw-ok p { color: #6b7280 !important; font-size: 11px !important; line-height: 1.5 !important; }
    .ihw-ok .ihw-res {
      background: #f5f3ff !important; border: 1px solid #ddd6fe !important; padding: 8px 10px !important;
      border-radius: 6px !important; margin: 10px 0 !important; font-size: 10px !important; color: #6d28d9 !important;
    }
    .ihw-ok-btn {
      margin-top: 10px !important; padding: 6px 16px !important; background: #f3f4f6 !important; color: #374151 !important;
      border: none !important; border-radius: 6px !important; font-size: 11px !important; cursor: pointer !important; font-family: inherit !important;
    }
    .ihw-ok-btn:hover { background: #e5e7eb !important; }
    /* AI */
    .ihw-ai {
      background: #f5f3ff !important; border: 1px solid #ddd6fe !important; border-radius: 8px !important;
      padding: 10px !important; margin: 10px 0 !important; text-align: left !important;
    }
    .ihw-ai-hdr {
      display: flex !important; align-items: center !important; gap: 5px !important; margin-bottom: 6px !important;
      font-size: 11px !important; font-weight: 700 !important; color: #6d28d9 !important;
    }
    .ihw-ai-hdr span {
      display: inline-flex !important; width: 18px !important; height: 18px !important; background: #8b5cf6 !important;
      border-radius: 50% !important; align-items: center !important; justify-content: center !important;
      color: #fff !important; font-size: 8px !important; font-weight: 700 !important;
    }
    .ihw-ai p { color: #374151 !important; font-size: 11px !important; line-height: 1.5 !important; margin: 0 !important; white-space: pre-wrap !important; }
    .ihw-ai .ihw-ai-note { color: #9ca3af !important; font-size: 9px !important; font-style: italic !important; margin-top: 6px !important; }
    /* Track */
    .ihw-tc2 { }
    .ihw-trk {
      background: #f8fafc !important; border: 1px solid #e2e8f0 !important; border-radius: 8px !important; padding: 12px !important; margin-top: 10px !important;
    }
    .ihw-tr {
      display: flex !important; justify-content: space-between !important; padding: 5px 0 !important;
      border-bottom: 1px solid #f1f5f9 !important; font-size: 11px !important;
    }
    .ihw-tr:last-child { border-bottom: none !important; }
    .ihw-tl { color: #6b7280 !important; font-weight: 500 !important; }
    .ihw-tv { color: #1f2937 !important; font-weight: 600 !important; }
    .ihw-st {
      display: inline-block !important; padding: 2px 8px !important; border-radius: 10px !important;
      font-size: 9px !important; font-weight: 700 !important; text-transform: uppercase !important;
    }
    .ihw-st-open { background:#dbeafe; color:#1e40af; }
    .ihw-st-in_progress { background:#fef3c7; color:#92400e; }
    .ihw-st-resolved { background:#dcfce7; color:#166534; }
    .ihw-st-closed { background:#f3f4f6; color:#6b7280; }
    .ihw-wh {
      background: #fffbeb !important; border: 1px solid #fde68a !important; border-radius: 6px !important;
      padding: 8px 10px !important; margin-top: 10px !important; font-size: 10px !important; color: #92400e !important; line-height: 1.4 !important;
    }
    .ihw-em { color: #ef4444 !important; font-size: 10px !important; margin-top: 3px !important; }
    /* Sysinfo */
    .ihw-si {
      background: #f9fafb !important; border: 1px solid #eee !important; border-radius: 4px !important;
      padding: 4px 8px !important; margin-bottom: 8px !important; font-size: 9px !important; color: #b0b0b0 !important;
      display: flex !important; gap: 8px !important;
    }
    /* Footer */
    .ihw-ft {
      padding: 6px 14px !important; border-top: 1px solid #f3f4f6 !important; flex-shrink: 0 !important;
      text-align: center !important; font-size: 9px !important; color: #b0b0b0 !important;
    }
    .ihw-ft a { color: ${COLOR}; text-decoration: none !important; font-weight: 600 !important; }
    /* Mobile */
    @media (max-width: 480px) {
      .ihw-panel { width: calc(100vw - 16px) !important; max-height: 90vh !important; }
      #ihw-root { bottom: 14px !important; ${POSITION}: 14px !important; }
    }
  `;
  document.head.appendChild(style);

  var sysInfo = getSystemInfo();

  var w = document.createElement("div");
  w.id = "ihw-root";
  w.innerHTML =
    '<div class="ihw-overlay" id="ihw-overlay"></div>' +
    '<button class="ihw-fab" aria-label="Help">' +
      '<span class="ihw-fab-tip">Need Help?</span>' +
      '<span class="ihw-dot"></span>' +
      '<svg class="ihw-ic-open" viewBox="0 0 24 24"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>' +
      '<svg class="ihw-ic-close" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>' +
    '</button>' +
    '<div class="ihw-panel">' +
      '<div class="ihw-hdr">' +
        '<h3>Help & Support</h3>' +
        '<div class="ihw-hdr-status"><span class="ihw-hdr-dot"></span><span>' + statusText + '</span></div>' +
      '</div>' +
      '<div class="ihw-tabs">' +
        '<button class="ihw-tab ihw-active" data-tab="submit">Raise Ticket</button>' +
        '<button class="ihw-tab" data-tab="track">Track Ticket</button>' +
      '</div>' +
      '<div class="ihw-body">' +
        '<div class="ihw-tc ihw-show" id="ihw-tc-submit">' +
          '<div class="ihw-si">' + sysInfo.os + ' · ' + sysInfo.browser + ' · ' + sysInfo.screen + '</div>' +
          '<form id="ihw-form">' +
            '<div class="ihw-r">' +
              '<div class="ihw-f"><label>Name <span class="rq">*</span></label><input type="text" id="ihw-name" placeholder="Your name" required></div>' +
              '<div class="ihw-f"><label>Email <span class="rq">*</span></label><input type="email" id="ihw-email" placeholder="you@email.com" required></div>' +
            '</div>' +
            '<div class="ihw-r">' +
              '<div class="ihw-f"><label>Phone</label><input type="tel" id="ihw-phone" placeholder="+91 XXXXX XXXXX"></div>' +
              '<div class="ihw-f"><label>Company</label><input type="text" id="ihw-company" placeholder="Company name"></div>' +
            '</div>' +
            '<div class="ihw-r">' +
              '<div class="ihw-f"><label>Category</label><select id="ihw-category"><option value="General">General</option><option value="Bug">Bug / Issue</option><option value="Feature Request">Feature Request</option><option value="Billing">Billing</option><option value="Integration">Integration</option><option value="Account">Account / Login</option><option value="Other">Other</option></select></div>' +
            '</div>' +
            '<div class="ihw-f"><label>Priority</label>' +
              '<div class="ihw-pr">' +
                '<button type="button" class="ihw-pb" data-p="low">Low</button>' +
                '<button type="button" class="ihw-pb sel" data-p="medium">Medium</button>' +
                '<button type="button" class="ihw-pb" data-p="high">High</button>' +
                '<button type="button" class="ihw-pb" data-p="critical">Critical</button>' +
              '</div>' +
            '</div>' +
            '<div class="ihw-f"><label>Subject <span class="rq">*</span></label><input type="text" id="ihw-subject" placeholder="Brief summary of your issue" required></div>' +
            '<div class="ihw-f"><label>Description <span class="rq">*</span></label><textarea id="ihw-desc" placeholder="Describe your issue in detail..." rows="3" required></textarea></div>' +
            '<div class="ihw-f"><label>Attachments</label>' +
              '<div class="ihw-att">' +
                '<div class="ihw-upl" id="ihw-upload"><svg viewBox="0 0 24 24"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/></svg><p>Attach files</p><div class="ht">Images · Videos</div></div>' +
                '<button type="button" class="ihw-ssb" id="ihw-ss-btn" title="Screenshot"><svg viewBox="0 0 24 24"><path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h4.05l1.83-2h4.24l1.83 2H20v12zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/></svg><span>SNAP</span></button>' +
              '</div>' +
              '<input type="file" id="ihw-file" accept="image/*,video/*" multiple hidden>' +
              '<div class="ihw-pvs" id="ihw-previews"></div>' +
            '</div>' +
            '<button type="submit" class="ihw-btn" id="ihw-submit">Submit Ticket</button>' +
          '</form>' +
          '<div class="ihw-ok" id="ihw-ok" style="display:none;"></div>' +
        '</div>' +
        '<div class="ihw-tc" id="ihw-tc-track">' +
          '<div class="ihw-f"><label>Ticket Number <span class="rq">*</span></label><input type="text" id="ihw-track-input" placeholder="e.g. TKT-20260316-0001"></div>' +
          '<button class="ihw-btn" id="ihw-track-btn">Track Ticket</button>' +
          '<div id="ihw-track-result"></div>' +
          '<div class="ihw-wh"><strong>Working Hours:</strong> Mon-Fri, 9 AM - 6 PM IST. Resolution times are based on business hours.</div>' +
        '</div>' +
      '</div>' +
      '<div class="ihw-ft">Powered by <a href="https://in-sync-crm.com" target="_blank">In-Sync CRM</a></div>' +
    '</div>';
  document.body.appendChild(w);

  var isOpen = false;
  var files = [];
  var selectedPriority = "medium";

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
  var prioBtns = w.querySelectorAll(".ihw-pb");
  var trackBtn = document.getElementById("ihw-track-btn");
  var trackInput = document.getElementById("ihw-track-input");
  var trackResult = document.getElementById("ihw-track-result");

  var overlay = document.getElementById("ihw-overlay");

  function togglePanel() {
    isOpen = !isOpen;
    panel.classList.toggle("ihw-open", isOpen);
    fab.classList.toggle("ihw-active", isOpen);
    overlay.classList.toggle("ihw-show", isOpen);
  }

  fab.addEventListener("click", togglePanel);
  overlay.addEventListener("click", togglePanel);

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("ihw-active"); });
      tab.classList.add("ihw-active");
      var name = tab.getAttribute("data-tab");
      tcSubmit.classList.toggle("ihw-show", name === "submit");
      tcTrack.classList.toggle("ihw-show", name === "track");
    });
  });

  prioBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      prioBtns.forEach(function (b) { b.classList.remove("sel"); });
      btn.classList.add("sel");
      selectedPriority = btn.getAttribute("data-p");
    });
  });

  uploadArea.addEventListener("click", function () { fileInput.click(); });
  uploadArea.addEventListener("dragover", function (e) { e.preventDefault(); uploadArea.style.borderColor = COLOR; });
  uploadArea.addEventListener("dragleave", function () { uploadArea.style.borderColor = "#d1d5db"; });
  uploadArea.addEventListener("drop", function (e) {
    e.preventDefault(); uploadArea.style.borderColor = "#d1d5db";
    addFiles(e.dataTransfer.files);
  });
  fileInput.addEventListener("change", function () { addFiles(fileInput.files); fileInput.value = ""; });

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
    } catch (err) { console.log("Screenshot cancelled"); }
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
      var d = document.createElement("div"); d.className = "ihw-pv";
      if (f.type.startsWith("image/")) {
        var img = document.createElement("img"); img.src = URL.createObjectURL(f); d.appendChild(img);
      } else {
        var vid = document.createElement("video"); vid.src = URL.createObjectURL(f); vid.muted = true; d.appendChild(vid);
      }
      var rm = document.createElement("button"); rm.className = "ihw-pv-x"; rm.innerHTML = "&times;"; rm.type = "button";
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

  // Draft save/load
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
        prioBtns.forEach(function (b) { b.classList.toggle("sel", b.getAttribute("data-p") === d.priority); });
      }
    } catch (e) {}
  }
  ["ihw-name","ihw-email","ihw-phone","ihw-company","ihw-subject","ihw-desc"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener("input", saveDraft);
  });
  document.getElementById("ihw-category").addEventListener("change", saveDraft);
  loadDraft();

  // Submit
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
    submitBtn.innerHTML = '<span class="ihw-sp"></span>Submitting...';

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
        headers: { "Content-Type": "application/json", "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + SUPABASE_ANON_KEY },
        body: JSON.stringify({ name: name, email: email, phone: phone || undefined, subject: subject, description: fullDesc, priority: selectedPriority, source: SOURCE }),
      });
      var result = await resp.json();

      if (result.success) {
        try { sessionStorage.removeItem("ihw_draft"); } catch (e) {}
        form.style.display = "none";
        okDiv.style.display = "block";
        var aiHtml = "";
        if (result.ai_response) {
          aiHtml = '<div class="ihw-ai"><div class="ihw-ai-hdr"><span>AI</span> In-Sync AI Response</div><p>' + result.ai_response.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</p><div class="ihw-ai-note">Automated response. Team will follow up if needed.</div></div>';
        }
        okDiv.innerHTML =
          '<div class="ihw-ok">' +
          '<div class="ihw-ok-ic"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div>' +
          '<h4>Ticket Created!</h4>' +
          '<div class="ihw-tkt"><span>' + result.ticket_number + '</span></div>' +
          '<p>Confirmation sent to <strong>' + email + '</strong></p>' +
          aiHtml +
          '<div class="ihw-res"><strong>Resolution:</strong> ' + result.expected_resolution_formatted + '<br>Mon-Fri, 9 AM - 6 PM IST</div>' +
          '<p style="font-size:9px;color:#b0b0b0;margin-top:6px;">Track with <strong>' + result.ticket_number + '</strong></p>' +
          '<button class="ihw-ok-btn" id="ihw-new">New Ticket</button></div>';
        document.getElementById("ihw-new").addEventListener("click", function () {
          form.reset(); form.style.display = "block"; okDiv.style.display = "none";
          files = []; renderPreviews(); selectedPriority = "medium";
          prioBtns.forEach(function (b) { b.classList.toggle("sel", b.getAttribute("data-p") === "medium"); });
        });
      } else {
        alert("Error: " + (result.error || "Failed to create ticket."));
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Submit Ticket";
    }
  });

  // Track
  trackBtn.addEventListener("click", async function () {
    var num = trackInput.value.trim().toUpperCase();
    if (!num) { trackResult.innerHTML = '<p class="ihw-em">Please enter a ticket number</p>'; return; }
    trackBtn.disabled = true;
    trackBtn.innerHTML = '<span class="ihw-sp"></span>Searching...';
    try {
      var resp = await fetch(SUPABASE_URL + "/rest/v1/support_tickets?ticket_number=eq." + encodeURIComponent(num) + "&select=*",
        { headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + SUPABASE_ANON_KEY } });
      var tickets = await resp.json();
      if (tickets && tickets.length > 0) {
        var t = tickets[0];
        var created = new Date(t.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
        var resolved = "";
        if (t.resolved_at) {
          var rd = new Date(t.resolved_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
          resolved = '<div class="ihw-tr"><span class="ihw-tl">Resolved</span><span class="ihw-tv">' + rd + '</span></div>';
        }
        trackResult.innerHTML = '<div class="ihw-trk">' +
          '<div class="ihw-tr"><span class="ihw-tl">Ticket</span><span class="ihw-tv">' + t.ticket_number + '</span></div>' +
          '<div class="ihw-tr"><span class="ihw-tl">Subject</span><span class="ihw-tv">' + t.subject + '</span></div>' +
          '<div class="ihw-tr"><span class="ihw-tl">Status</span><span class="ihw-st ihw-st-' + t.status + '">' + t.status.replace("_", " ").toUpperCase() + '</span></div>' +
          '<div class="ihw-tr"><span class="ihw-tl">Priority</span><span class="ihw-tv" style="text-transform:capitalize">' + t.priority + '</span></div>' +
          '<div class="ihw-tr"><span class="ihw-tl">Created</span><span class="ihw-tv">' + created + '</span></div>' +
          resolved + '</div>';
      } else {
        trackResult.innerHTML = '<p class="ihw-em" style="text-align:center;padding:14px;">No ticket found: <strong>' + num + '</strong></p>';
      }
    } catch (err) {
      trackResult.innerHTML = '<p class="ihw-em">Failed to fetch. Try again.</p>';
    } finally {
      trackBtn.disabled = false;
      trackBtn.innerHTML = "Track Ticket";
    }
  });
  trackInput.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); trackBtn.click(); } });
})();
