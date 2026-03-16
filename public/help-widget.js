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
      box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
    }
    #ihw-root {
      position: fixed; bottom: 20px; ${POSITION}: 20px; z-index: 999998;
      line-height: 1.4;
    }
    /* FAB */
    .ihw-fab {
      width: 42px; height: 42px; border-radius: 50%; background: ${COLOR};
      border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 12px rgba(139,92,246,0.3); transition: transform 0.2s;
      position: relative;
    }
    .ihw-fab:hover { transform: scale(1.1); }
    .ihw-fab svg { width: 18px; height: 18px; fill: #fff; }
    .ihw-fab .ihw-ic-close { display: none; }
    .ihw-fab.ihw-active .ihw-ic-open { display: none; }
    .ihw-fab.ihw-active .ihw-ic-close { display: block; }
    .ihw-fab-tip {
      position: absolute; ${POSITION === "right" ? "right: 52px" : "left: 52px"};
      top: 50%; transform: translateY(-50%); background: #1f2937; color: #fff;
      padding: 4px 10px; border-radius: 6px; font-size: 11px; white-space: nowrap;
      opacity: 0; pointer-events: none; transition: opacity 0.2s;
    }
    .ihw-fab:hover .ihw-fab-tip { opacity: 1; }
    .ihw-dot {
      position: absolute; top: -1px; right: -1px; width: 10px; height: 10px;
      border-radius: 50%; background: ${statusDot}; border: 2px solid #fff;
    }
    /* Panel */
    .ihw-panel {
      display: none; position: fixed; bottom: 72px; ${POSITION}: 20px;
      width: 340px; max-width: calc(100vw - 24px); max-height: calc(100vh - 90px);
      background: #fff; border-radius: 12px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04);
      overflow: hidden; flex-direction: column; animation: ihw-up 0.25s ease;
    }
    .ihw-panel.ihw-open { display: flex; }
    @keyframes ihw-up { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
    /* Header */
    .ihw-hdr { background: ${COLOR}; padding: 12px 16px; flex-shrink: 0; }
    .ihw-hdr h3 { color: #fff; font-size: 14px; font-weight: 600; }
    .ihw-hdr-status { display: flex; align-items: center; gap: 5px; margin-top: 2px; }
    .ihw-hdr-dot { width: 6px; height: 6px; border-radius: 50%; background: ${statusDot}; flex-shrink: 0; }
    .ihw-hdr-status span { color: rgba(255,255,255,0.8); font-size: 11px; }
    /* Tabs */
    .ihw-tabs { display: flex; border-bottom: 1px solid #e5e7eb; flex-shrink: 0; }
    .ihw-tab {
      flex: 1; padding: 7px; border: none; background: #fff; cursor: pointer;
      font-size: 11px; font-weight: 600; color: #9ca3af; transition: all 0.15s;
      border-bottom: 2px solid transparent; font-family: inherit; text-transform: uppercase; letter-spacing: 0.3px;
    }
    .ihw-tab.ihw-active { color: ${COLOR}; border-bottom-color: ${COLOR}; background: #faf5ff; }
    /* Body */
    .ihw-body { padding: 10px 14px; overflow-y: auto; flex: 1; min-height: 0; }
    .ihw-tc { display: none; }
    .ihw-tc.ihw-show { display: block; }
    /* Form fields */
    .ihw-r { display: flex; gap: 8px; }
    .ihw-r > .ihw-f { flex: 1; min-width: 0; }
    .ihw-f { margin-bottom: 8px; }
    .ihw-f label {
      display: block; font-size: 11px; font-weight: 600; color: #4b5563;
      margin-bottom: 2px; letter-spacing: 0.2px;
    }
    .ihw-f label .rq { color: #ef4444; }
    .ihw-f input, .ihw-f textarea, .ihw-f select {
      width: 100%; padding: 6px 8px; border: 1px solid #d1d5db; border-radius: 5px;
      font-size: 12px; font-family: inherit; outline: none; background: #fff; color: #1f2937;
      transition: border-color 0.15s;
    }
    .ihw-f input:focus, .ihw-f textarea:focus, .ihw-f select:focus {
      border-color: ${COLOR};
    }
    .ihw-f input::placeholder, .ihw-f textarea::placeholder { color: #b0b0b0; font-size: 11px; }
    .ihw-f textarea { resize: vertical; min-height: 50px; max-height: 120px; }
    .ihw-f select { padding: 5px 8px; cursor: pointer; }
    /* Priority */
    .ihw-pr { display: flex; gap: 4px; }
    .ihw-pb {
      flex: 1; padding: 4px 2px; border: 1px solid #d1d5db; border-radius: 4px; background: #fff;
      cursor: pointer; font-size: 10px; font-weight: 600; text-align: center;
      transition: all 0.15s; color: #9ca3af; font-family: inherit;
    }
    .ihw-pb:hover { border-color: #aaa; }
    .ihw-pb.sel { border-width: 2px; }
    .ihw-pb[data-p="low"].sel { border-color:#22c55e; background:#f0fdf4; color:#166534; }
    .ihw-pb[data-p="medium"].sel { border-color:#f59e0b; background:#fffbeb; color:#92400e; }
    .ihw-pb[data-p="high"].sel { border-color:#f97316; background:#fff7ed; color:#9a3412; }
    .ihw-pb[data-p="critical"].sel { border-color:#ef4444; background:#fef2f2; color:#991b1b; }
    /* Attach */
    .ihw-att { display: flex; gap: 6px; }
    .ihw-upl {
      flex: 1; border: 1.5px dashed #d1d5db; border-radius: 5px; padding: 8px;
      text-align: center; cursor: pointer; transition: all 0.15s; background: #fafafa;
    }
    .ihw-upl:hover { border-color: ${COLOR}; background: #f5f3ff; }
    .ihw-upl svg { width: 16px; height: 16px; margin: 0 auto 2px; fill: #b0b0b0; display: block; }
    .ihw-upl p { font-size: 10px; color: #888; }
    .ihw-upl .ht { font-size: 8px; color: #b0b0b0; margin-top: 1px; }
    .ihw-ssb {
      width: 36px; border: 1.5px dashed #d1d5db; border-radius: 5px; background: #fafafa;
      cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center;
      transition: all 0.15s; gap: 1px; flex-shrink: 0;
    }
    .ihw-ssb:hover { border-color: ${COLOR}; background: #f5f3ff; }
    .ihw-ssb svg { width: 14px; height: 14px; fill: #b0b0b0; }
    .ihw-ssb span { font-size: 7px; color: #b0b0b0; font-weight: 700; }
    .ihw-pvs { display: flex; gap: 4px; flex-wrap: wrap; margin-top: 6px; }
    .ihw-pv {
      position: relative; width: 40px; height: 40px; border-radius: 4px;
      overflow: hidden; border: 1px solid #e5e7eb;
    }
    .ihw-pv img, .ihw-pv video { width: 100%; height: 100%; object-fit: cover; }
    .ihw-pv-x {
      position: absolute; top: 1px; right: 1px; width: 16px; height: 16px;
      border-radius: 50%; background: rgba(0,0,0,0.6); color: #fff; border: none;
      cursor: pointer; font-size: 10px; display: flex; align-items: center; justify-content: center;
    }
    /* Submit btn */
    .ihw-btn {
      width: 100%; padding: 8px; background: ${COLOR}; color: #fff; border: none;
      border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;
      transition: opacity 0.15s; margin-top: 6px;
    }
    .ihw-btn:hover { opacity: 0.9; }
    .ihw-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .ihw-sp {
      display: inline-block; width: 14px; height: 14px;
      border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
      border-radius: 50%; animation: ihw-spin 0.6s linear infinite;
      vertical-align: middle; margin-right: 6px;
    }
    @keyframes ihw-spin { to { transform: rotate(360deg); } }
    /* Success */
    .ihw-ok { text-align: center; padding: 16px 0; }
    .ihw-ok-ic {
      width: 48px; height: 48px; border-radius: 50%; background: #dcfce7;
      display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;
    }
    .ihw-ok-ic svg { width: 24px; height: 24px; fill: #16a34a; }
    .ihw-ok h4 { color: #166534; font-size: 14px; margin-bottom: 6px; }
    .ihw-ok .ihw-tkt {
      background: #f0fdf4; border: 1px solid #bbf7d0; padding: 6px 14px;
      border-radius: 6px; display: inline-block; margin: 6px 0;
    }
    .ihw-ok .ihw-tkt span { font-size: 16px; font-weight: 700; color: ${COLOR}; letter-spacing: 0.5px; }
    .ihw-ok p { color: #6b7280; font-size: 11px; line-height: 1.5; }
    .ihw-ok .ihw-res {
      background: #f5f3ff; border: 1px solid #ddd6fe; padding: 8px 10px;
      border-radius: 6px; margin: 10px 0; font-size: 10px; color: #6d28d9;
    }
    .ihw-ok-btn {
      margin-top: 10px; padding: 6px 16px; background: #f3f4f6; color: #374151;
      border: none; border-radius: 6px; font-size: 11px; cursor: pointer; font-family: inherit;
    }
    .ihw-ok-btn:hover { background: #e5e7eb; }
    /* AI */
    .ihw-ai {
      background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 8px;
      padding: 10px; margin: 10px 0; text-align: left;
    }
    .ihw-ai-hdr {
      display: flex; align-items: center; gap: 5px; margin-bottom: 6px;
      font-size: 11px; font-weight: 700; color: #6d28d9;
    }
    .ihw-ai-hdr span {
      display: inline-flex; width: 18px; height: 18px; background: #8b5cf6;
      border-radius: 50%; align-items: center; justify-content: center;
      color: #fff; font-size: 8px; font-weight: 700;
    }
    .ihw-ai p { color: #374151; font-size: 11px; line-height: 1.5; margin: 0; white-space: pre-wrap; }
    .ihw-ai .ihw-ai-note { color: #9ca3af; font-size: 9px; font-style: italic; margin-top: 6px; }
    /* Track */
    .ihw-tc2 { }
    .ihw-trk {
      background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-top: 10px;
    }
    .ihw-tr {
      display: flex; justify-content: space-between; padding: 5px 0;
      border-bottom: 1px solid #f1f5f9; font-size: 11px;
    }
    .ihw-tr:last-child { border-bottom: none; }
    .ihw-tl { color: #6b7280; font-weight: 500; }
    .ihw-tv { color: #1f2937; font-weight: 600; }
    .ihw-st {
      display: inline-block; padding: 2px 8px; border-radius: 10px;
      font-size: 9px; font-weight: 700; text-transform: uppercase;
    }
    .ihw-st-open { background:#dbeafe; color:#1e40af; }
    .ihw-st-in_progress { background:#fef3c7; color:#92400e; }
    .ihw-st-resolved { background:#dcfce7; color:#166534; }
    .ihw-st-closed { background:#f3f4f6; color:#6b7280; }
    .ihw-wh {
      background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px;
      padding: 8px 10px; margin-top: 10px; font-size: 10px; color: #92400e; line-height: 1.4;
    }
    .ihw-em { color: #ef4444; font-size: 10px; margin-top: 3px; }
    /* Sysinfo */
    .ihw-si {
      background: #f9fafb; border: 1px solid #eee; border-radius: 4px;
      padding: 4px 8px; margin-bottom: 8px; font-size: 9px; color: #b0b0b0;
      display: flex; gap: 8px;
    }
    /* Footer */
    .ihw-ft {
      padding: 6px 14px; border-top: 1px solid #f3f4f6; flex-shrink: 0;
      text-align: center; font-size: 9px; color: #b0b0b0;
    }
    .ihw-ft a { color: ${COLOR}; text-decoration: none; font-weight: 600; }
    /* Mobile */
    @media (max-width: 480px) {
      .ihw-panel { bottom: 0; ${POSITION}: 0; width: 100vw; max-width: 100vw; max-height: 85vh; border-radius: 12px 12px 0 0; }
      #ihw-root { bottom: 14px; ${POSITION}: 14px; }
    }
  `;
  document.head.appendChild(style);

  var sysInfo = getSystemInfo();

  var w = document.createElement("div");
  w.id = "ihw-root";
  w.innerHTML =
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

  fab.addEventListener("click", function () {
    isOpen = !isOpen;
    panel.classList.toggle("ihw-open", isOpen);
    fab.classList.toggle("ihw-active", isOpen);
  });

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
