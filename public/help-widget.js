/**
 * In-Sync Help Ticket Widget
 * Clean, modern ticket form with AI auto-response.
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
  var MAX_IMG = 5; var MAX_VID = 2;

  function isOnline() {
    var now = new Date();
    var ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    return ist.getDay() >= 1 && ist.getDay() <= 5 && ist.getHours() >= 9 && ist.getHours() < 18;
  }
  function getSystemInfo() {
    var ua = navigator.userAgent;
    var b = "Unknown", o = "Unknown";
    if (ua.indexOf("Edg") > -1) b = "Edge";
    else if (ua.indexOf("Chrome") > -1) b = "Chrome";
    else if (ua.indexOf("Firefox") > -1) b = "Firefox";
    else if (ua.indexOf("Safari") > -1) b = "Safari";
    if (ua.indexOf("Win") > -1) o = "Windows";
    else if (ua.indexOf("Mac") > -1) o = "macOS";
    else if (ua.indexOf("Linux") > -1) o = "Linux";
    else if (ua.indexOf("Android") > -1) o = "Android";
    else if (/iPhone|iPad/.test(ua)) o = "iOS";
    return { browser: b, os: o, url: window.location.href, screen: screen.width + "x" + screen.height };
  }

  var online = isOnline();
  var dotColor = online ? "#22c55e" : "#eab308";

  // ── CSS ──
  var S = document.createElement("style");
  S.textContent = [
    // Reset
    "#ihw-root,#ihw-root *,#ihw-root *::before,#ihw-root *::after{box-sizing:border-box!important;border-width:0!important;border-style:none!important;border-color:transparent!important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif!important;line-height:normal!important;-webkit-text-size-adjust:100%!important;margin:0!important;padding:0!important}",

    // Root
    "#ihw-root{position:fixed!important;bottom:20px!important;" + POSITION + ":20px!important;z-index:999998!important;display:block!important}",

    // FAB
    ".ihw-fab{width:44px!important;height:44px!important;border-radius:50%!important;background:" + COLOR + "!important;cursor:pointer!important;display:flex!important;align-items:center!important;justify-content:center!important;box-shadow:0 4px 15px rgba(139,92,246,0.4)!important;transition:transform 0.2s!important;position:relative!important}",
    ".ihw-fab:hover{transform:scale(1.1)!important}",
    ".ihw-fab svg{width:20px!important;height:20px!important;fill:#fff!important;display:block!important}",
    ".ihw-fab .ic2{display:none!important}",
    ".ihw-fab.on .ic1{display:none!important}",
    ".ihw-fab.on .ic2{display:block!important}",
    ".ihw-fab-dot{position:absolute!important;top:-1px!important;right:-1px!important;width:10px!important;height:10px!important;border-radius:50%!important;background:" + dotColor + "!important;border:2px solid #fff!important}",

    // Overlay
    ".ihw-ov{display:none!important;position:fixed!important;inset:0!important;background:rgba(0,0,0,0.35)!important;z-index:999998!important;backdrop-filter:blur(2px)!important}",
    ".ihw-ov.on{display:block!important}",

    // Panel
    ".ihw-pn{display:none!important;position:fixed!important;top:50%!important;left:50%!important;transform:translate(-50%,-50%)!important;width:460px!important;max-width:calc(100vw - 32px)!important;max-height:calc(100vh - 40px)!important;background:#fff!important;border-radius:16px!important;box-shadow:0 25px 80px rgba(0,0,0,0.18)!important;overflow:hidden!important;flex-direction:column!important;z-index:999999!important;animation:ihwUp 0.3s ease!important}",
    ".ihw-pn.on{display:flex!important}",
    "@keyframes ihwUp{from{opacity:0;transform:translate(-50%,-48%) scale(0.95)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}",

    // Header
    ".ihw-hd{background:linear-gradient(135deg," + COLOR + ",#a78bfa)!important;padding:18px 24px!important;flex-shrink:0!important}",
    ".ihw-hd h3{color:#fff!important;font-size:16px!important;font-weight:700!important;display:block!important;margin-bottom:4px!important}",
    ".ihw-hd-st{display:flex!important;align-items:center!important;gap:6px!important}",
    ".ihw-hd-st i{width:7px!important;height:7px!important;border-radius:50%!important;background:" + dotColor + "!important;display:block!important}",
    ".ihw-hd-st span{color:rgba(255,255,255,0.85)!important;font-size:12px!important;display:inline!important}",

    // Tabs
    ".ihw-tb{display:flex!important;border-bottom:1px solid #e5e7eb!important;flex-shrink:0!important;background:#fafafa!important}",
    ".ihw-t{flex:1!important;padding:10px!important;background:transparent!important;cursor:pointer!important;font-size:12px!important;font-weight:600!important;color:#9ca3af!important;text-align:center!important;border-bottom:2px solid transparent!important;text-transform:uppercase!important;letter-spacing:0.5px!important;transition:all 0.15s!important;display:block!important}",
    ".ihw-t.on{color:" + COLOR + "!important;border-bottom-color:" + COLOR + "!important;background:#fff!important}",

    // Body
    ".ihw-bd{padding:20px 24px!important;overflow-y:auto!important;flex:1!important;min-height:0!important;display:block!important}",
    ".ihw-tc{display:none!important}",
    ".ihw-tc.on{display:block!important}",

    // Form field
    ".ihw-g{margin-bottom:16px!important;display:block!important}",
    ".ihw-g label{display:block!important;font-size:13px!important;font-weight:600!important;color:#374151!important;margin-bottom:6px!important}",
    ".ihw-g label b{color:#ef4444!important;font-weight:600!important}",
    ".ihw-g input,.ihw-g textarea,.ihw-g select{display:block!important;width:100%!important;padding:10px 14px!important;border:1.5px solid #e0e0e0!important;border-radius:8px!important;font-size:14px!important;background:#fafafa!important;color:#1f2937!important;transition:border-color 0.15s,background 0.15s!important;outline:none!important;-webkit-appearance:none!important;appearance:none!important}",
    ".ihw-g input:focus,.ihw-g textarea:focus,.ihw-g select:focus{border-color:" + COLOR + "!important;background:#fff!important;box-shadow:0 0 0 3px rgba(139,92,246,0.08)!important}",
    ".ihw-g input::placeholder,.ihw-g textarea::placeholder{color:#b0b0b0!important;font-size:13px!important}",
    ".ihw-g textarea{resize:vertical!important;min-height:80px!important}",
    ".ihw-g select{cursor:pointer!important;background:#fafafa url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%23999' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E\") no-repeat right 12px center!important;padding-right:32px!important}",

    // Two-col row
    ".ihw-2{display:flex!important;gap:14px!important}",
    ".ihw-2>.ihw-g{flex:1!important;min-width:0!important}",

    // Priority
    ".ihw-pr{display:flex!important;gap:6px!important}",
    ".ihw-pb{flex:1!important;padding:8px 4px!important;border:1.5px solid #e0e0e0!important;border-radius:8px!important;background:#fafafa!important;cursor:pointer!important;font-size:12px!important;font-weight:600!important;text-align:center!important;color:#9ca3af!important;transition:all 0.15s!important;display:block!important}",
    ".ihw-pb:hover{border-color:#ccc!important;background:#f5f5f5!important}",
    ".ihw-pb.on{border-width:2px!important}",
    ".ihw-pb[data-p=low].on{border-color:#22c55e!important;background:#f0fdf4!important;color:#166534!important}",
    ".ihw-pb[data-p=medium].on{border-color:#f59e0b!important;background:#fffbeb!important;color:#92400e!important}",
    ".ihw-pb[data-p=high].on{border-color:#f97316!important;background:#fff7ed!important;color:#9a3412!important}",
    ".ihw-pb[data-p=critical].on{border-color:#ef4444!important;background:#fef2f2!important;color:#991b1b!important}",

    // Upload
    ".ihw-up{display:flex!important;gap:10px!important}",
    ".ihw-uf{flex:1!important;border:2px dashed #ddd!important;border-radius:10px!important;padding:16px!important;text-align:center!important;cursor:pointer!important;background:#fafafa!important;transition:all 0.15s!important;display:block!important}",
    ".ihw-uf:hover{border-color:" + COLOR + "!important;background:#faf5ff!important}",
    ".ihw-uf svg{width:24px!important;height:24px!important;fill:#bbb!important;display:block!important;margin:0 auto 6px!important}",
    ".ihw-uf p{font-size:13px!important;color:#888!important;display:block!important}",
    ".ihw-uf small{font-size:11px!important;color:#bbb!important;display:block!important;margin-top:2px!important}",
    ".ihw-sb{width:50px!important;border:2px dashed #ddd!important;border-radius:10px!important;background:#fafafa!important;cursor:pointer!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:3px!important;transition:all 0.15s!important;flex-shrink:0!important}",
    ".ihw-sb:hover{border-color:" + COLOR + "!important;background:#faf5ff!important}",
    ".ihw-sb svg{width:18px!important;height:18px!important;fill:#bbb!important;display:block!important}",
    ".ihw-sb span{font-size:8px!important;color:#bbb!important;font-weight:700!important;display:block!important;text-transform:uppercase!important}",

    // Previews
    ".ihw-pvs{display:flex!important;gap:6px!important;flex-wrap:wrap!important;margin-top:10px!important}",
    ".ihw-pv{position:relative!important;width:52px!important;height:52px!important;border-radius:8px!important;overflow:hidden!important;border:1px solid #e5e7eb!important;display:block!important}",
    ".ihw-pv img,.ihw-pv video{width:100%!important;height:100%!important;object-fit:cover!important;display:block!important}",
    ".ihw-pv button{position:absolute!important;top:2px!important;right:2px!important;width:18px!important;height:18px!important;border-radius:50%!important;background:rgba(0,0,0,0.6)!important;color:#fff!important;cursor:pointer!important;font-size:11px!important;display:flex!important;align-items:center!important;justify-content:center!important;line-height:1!important}",

    // Submit
    ".ihw-btn{display:block!important;width:100%!important;padding:12px!important;background:linear-gradient(135deg," + COLOR + ",#a78bfa)!important;color:#fff!important;border-radius:10px!important;font-size:14px!important;font-weight:700!important;cursor:pointer!important;transition:opacity 0.15s,transform 0.1s!important;margin-top:8px!important;text-align:center!important;letter-spacing:0.3px!important}",
    ".ihw-btn:hover{opacity:0.9!important}",
    ".ihw-btn:active{transform:scale(0.98)!important}",
    ".ihw-btn:disabled{opacity:0.5!important;cursor:not-allowed!important}",
    ".ihw-sp{display:inline-block!important;width:16px!important;height:16px!important;border:2px solid rgba(255,255,255,0.3)!important;border-top-color:#fff!important;border-radius:50%!important;animation:ihwSp 0.6s linear infinite!important;vertical-align:middle!important;margin-right:8px!important}",
    "@keyframes ihwSp{to{transform:rotate(360deg)}}",

    // Success
    ".ihw-ok{text-align:center!important;padding:24px 0!important;display:block!important}",
    ".ihw-ok-ic{width:56px!important;height:56px!important;border-radius:50%!important;background:#dcfce7!important;display:flex!important;align-items:center!important;justify-content:center!important;margin:0 auto 16px!important}",
    ".ihw-ok-ic svg{width:28px!important;height:28px!important;fill:#16a34a!important;display:block!important}",
    ".ihw-ok h4{color:#166534!important;font-size:18px!important;font-weight:700!important;margin-bottom:8px!important;display:block!important}",
    ".ihw-ok .tkt{background:#f0fdf4!important;border:1px solid #bbf7d0!important;padding:8px 20px!important;border-radius:8px!important;display:inline-block!important;margin:8px 0!important}",
    ".ihw-ok .tkt b{font-size:18px!important;font-weight:700!important;color:" + COLOR + "!important;letter-spacing:1px!important}",
    ".ihw-ok p{color:#6b7280!important;font-size:13px!important;line-height:1.6!important;display:block!important}",
    ".ihw-ok .res{background:#f5f3ff!important;border:1px solid #ddd6fe!important;padding:10px 14px!important;border-radius:8px!important;margin:12px 0!important;font-size:12px!important;color:#6d28d9!important;display:block!important;text-align:left!important}",
    ".ihw-ok .nb{margin-top:12px!important;padding:8px 20px!important;background:#f3f4f6!important;color:#374151!important;border-radius:8px!important;font-size:13px!important;cursor:pointer!important;font-weight:500!important;display:inline-block!important}",
    ".ihw-ok .nb:hover{background:#e5e7eb!important}",

    // AI
    ".ihw-ai{background:#f5f3ff!important;border:1px solid #ddd6fe!important;border-radius:10px!important;padding:14px!important;margin:14px 0!important;text-align:left!important;display:block!important}",
    ".ihw-ai-h{display:flex!important;align-items:center!important;gap:6px!important;margin-bottom:8px!important;font-size:13px!important;font-weight:700!important;color:#6d28d9!important}",
    ".ihw-ai-h i{display:inline-flex!important;width:22px!important;height:22px!important;background:#8b5cf6!important;border-radius:50%!important;align-items:center!important;justify-content:center!important;color:#fff!important;font-size:9px!important;font-weight:700!important;font-style:normal!important}",
    ".ihw-ai p{color:#374151!important;font-size:13px!important;line-height:1.6!important;display:block!important;white-space:pre-wrap!important}",
    ".ihw-ai small{color:#9ca3af!important;font-size:10px!important;font-style:italic!important;display:block!important;margin-top:8px!important}",

    // Track
    ".ihw-trk{background:#f8fafc!important;border:1px solid #e2e8f0!important;border-radius:10px!important;padding:16px!important;margin-top:14px!important;display:block!important}",
    ".ihw-tr{display:flex!important;justify-content:space-between!important;padding:8px 0!important;border-bottom:1px solid #f1f5f9!important;font-size:13px!important}",
    ".ihw-tr:last-child{border-bottom:none!important}",
    ".ihw-tl{color:#6b7280!important;font-weight:500!important;display:inline!important}",
    ".ihw-tv{color:#1f2937!important;font-weight:600!important;display:inline!important}",
    ".ihw-st{display:inline-block!important;padding:3px 10px!important;border-radius:12px!important;font-size:10px!important;font-weight:700!important;text-transform:uppercase!important}",
    ".ihw-st-open{background:#dbeafe!important;color:#1e40af!important}",
    ".ihw-st-in_progress{background:#fef3c7!important;color:#92400e!important}",
    ".ihw-st-resolved{background:#dcfce7!important;color:#166534!important}",
    ".ihw-st-closed{background:#f3f4f6!important;color:#6b7280!important}",
    ".ihw-wh{background:#fffbeb!important;border:1px solid #fde68a!important;border-radius:8px!important;padding:10px 14px!important;margin-top:14px!important;font-size:12px!important;color:#92400e!important;line-height:1.5!important;display:block!important}",
    ".ihw-em{color:#ef4444!important;font-size:12px!important;margin-top:6px!important;display:block!important}",

    // Footer
    ".ihw-ft{padding:10px 24px!important;border-top:1px solid #f0f0f0!important;text-align:center!important;font-size:11px!important;color:#bbb!important;flex-shrink:0!important;display:block!important;background:#fafafa!important}",
    ".ihw-ft a{color:" + COLOR + "!important;text-decoration:none!important;font-weight:600!important;display:inline!important}",

    // Mobile
    "@media(max-width:480px){.ihw-pn{width:calc(100vw - 16px)!important;max-height:92vh!important}#ihw-root{bottom:14px!important;" + POSITION + ":14px!important}}"
  ].join("\n");
  document.head.appendChild(S);

  var sysInfo = getSystemInfo();
  var onlineText = online ? "We're online now" : "We'll respond in business hours";

  var w = document.createElement("div");
  w.id = "ihw-root";
  w.innerHTML =
    '<div class="ihw-ov" id="ihw-ov"></div>' +
    '<button class="ihw-fab" id="ihw-fab">' +
      '<span class="ihw-fab-dot"></span>' +
      '<svg class="ic1" viewBox="0 0 24 24"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>' +
      '<svg class="ic2" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>' +
    '</button>' +
    '<div class="ihw-pn" id="ihw-pn">' +
      '<div class="ihw-hd"><h3>Help & Support</h3><div class="ihw-hd-st"><i></i><span>' + onlineText + '</span></div></div>' +
      '<div class="ihw-tb"><button class="ihw-t on" data-t="s">Raise Ticket</button><button class="ihw-t" data-t="t">Track Ticket</button></div>' +
      '<div class="ihw-bd">' +
        // ── Submit tab ──
        '<div class="ihw-tc on" id="ihw-ts">' +
          '<form id="ihw-fm">' +
            '<div class="ihw-2">' +
              '<div class="ihw-g"><label>Name <b>*</b></label><input id="ihw-name" placeholder="Your full name" required></div>' +
              '<div class="ihw-g"><label>Email <b>*</b></label><input type="email" id="ihw-email" placeholder="you@company.com" required></div>' +
            '</div>' +
            '<div class="ihw-2">' +
              '<div class="ihw-g"><label>Phone</label><input type="tel" id="ihw-phone" placeholder="+91 XXXXX XXXXX"></div>' +
              '<div class="ihw-g"><label>Company</label><input id="ihw-company" placeholder="Company name"></div>' +
            '</div>' +
            '<div class="ihw-2">' +
              '<div class="ihw-g"><label>Category</label><select id="ihw-cat"><option>General</option><option>Bug / Issue</option><option>Feature Request</option><option>Billing</option><option>Integration</option><option>Account / Login</option><option>Other</option></select></div>' +
              '<div class="ihw-g"><label>Priority</label><div class="ihw-pr"><button type="button" class="ihw-pb" data-p="low">Low</button><button type="button" class="ihw-pb on" data-p="medium">Medium</button><button type="button" class="ihw-pb" data-p="high">High</button><button type="button" class="ihw-pb" data-p="critical">Critical</button></div></div>' +
            '</div>' +
            '<div class="ihw-g"><label>Subject <b>*</b></label><input id="ihw-subj" placeholder="Brief summary of your issue" required></div>' +
            '<div class="ihw-g"><label>Description <b>*</b></label><textarea id="ihw-desc" placeholder="Please describe your issue in detail so we can help you faster..." rows="4" required></textarea></div>' +
            '<div class="ihw-g"><label>Attachments</label>' +
              '<div class="ihw-up">' +
                '<div class="ihw-uf" id="ihw-uf"><svg viewBox="0 0 24 24"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/></svg><p>Click to attach files</p><small>Images &middot; Videos &middot; Screenshots</small></div>' +
                '<button type="button" class="ihw-sb" id="ihw-ss"><svg viewBox="0 0 24 24"><path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h4.05l1.83-2h4.24l1.83 2H20v12zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/></svg><span>Snap</span></button>' +
              '</div>' +
              '<input type="file" id="ihw-fi" accept="image/*,video/*" multiple hidden>' +
              '<div class="ihw-pvs" id="ihw-pvs"></div>' +
            '</div>' +
            '<button type="submit" class="ihw-btn" id="ihw-sub">Submit Ticket</button>' +
          '</form>' +
          '<div class="ihw-ok" id="ihw-ok" style="display:none"></div>' +
        '</div>' +
        // ── Track tab ──
        '<div class="ihw-tc" id="ihw-tt">' +
          '<div class="ihw-g"><label>Ticket Number <b>*</b></label><input id="ihw-ti" placeholder="e.g. TKT-20260316-0001"></div>' +
          '<button class="ihw-btn" id="ihw-tb2">Track Ticket</button>' +
          '<div id="ihw-tr"></div>' +
          '<div class="ihw-wh"><strong>Working Hours:</strong> Monday to Friday, 9:00 AM - 6:00 PM IST.<br>Resolution times are calculated based on business hours.</div>' +
        '</div>' +
      '</div>' +
      '<div class="ihw-ft">Powered by <a href="https://in-sync-crm.com" target="_blank">In-Sync CRM</a></div>' +
    '</div>';
  document.body.appendChild(w);

  // ── State ──
  var open = false, files = [], prio = "medium";
  var $ = function(id) { return document.getElementById(id); };
  var fab = $("ihw-fab"), pn = $("ihw-pn"), ov = $("ihw-ov");
  var form = $("ihw-fm"), okDiv = $("ihw-ok"), subBtn = $("ihw-sub");
  var uf = $("ihw-uf"), fi = $("ihw-fi"), pvs = $("ihw-pvs"), ss = $("ihw-ss");
  var tabs = w.querySelectorAll(".ihw-t"), ts = $("ihw-ts"), tt = $("ihw-tt");
  var pbs = w.querySelectorAll(".ihw-pb");
  var tb2 = $("ihw-tb2"), ti = $("ihw-ti"), tr = $("ihw-tr");

  function toggle() {
    open = !open;
    pn.classList.toggle("on", open);
    fab.classList.toggle("on", open);
    ov.classList.toggle("on", open);
  }
  fab.onclick = toggle;
  ov.onclick = toggle;

  tabs.forEach(function(t) {
    t.onclick = function() {
      tabs.forEach(function(x) { x.classList.remove("on"); });
      t.classList.add("on");
      var v = t.getAttribute("data-t");
      ts.classList.toggle("on", v === "s");
      tt.classList.toggle("on", v === "t");
    };
  });

  pbs.forEach(function(b) {
    b.onclick = function() {
      pbs.forEach(function(x) { x.classList.remove("on"); });
      b.classList.add("on");
      prio = b.getAttribute("data-p");
    };
  });

  uf.onclick = function() { fi.click(); };
  uf.ondragover = function(e) { e.preventDefault(); uf.style.borderColor = COLOR; };
  uf.ondragleave = function() { uf.style.borderColor = "#ddd"; };
  uf.ondrop = function(e) { e.preventDefault(); uf.style.borderColor = "#ddd"; addF(e.dataTransfer.files); };
  fi.onchange = function() { addF(fi.files); fi.value = ""; };

  ss.onclick = async function() {
    try {
      var s = await navigator.mediaDevices.getDisplayMedia({ video: { mediaSource: "screen" } });
      var v = document.createElement("video"); v.srcObject = s; await v.play();
      var c = document.createElement("canvas"); c.width = v.videoWidth; c.height = v.videoHeight;
      c.getContext("2d").drawImage(v, 0, 0);
      s.getTracks().forEach(function(t) { t.stop(); });
      c.toBlob(function(b) { if (b) { files.push(new File([b], "screenshot-" + Date.now() + ".png", { type: "image/png" })); renderP(); } }, "image/png");
    } catch (e) {}
  };

  function addF(list) {
    Array.from(list).forEach(function(f) {
      var iv = f.type.startsWith("video/"), ii = f.type.startsWith("image/");
      if (!ii && !iv) return;
      if (ii && files.filter(function(x){return x.type.startsWith("image/")}).length >= MAX_IMG) return;
      if (iv && files.filter(function(x){return x.type.startsWith("video/")}).length >= MAX_VID) return;
      if (ii && f.size > MAX_FILE_SIZE) { alert(f.name + " exceeds 5 MB."); return; }
      if (iv && f.size > 10485760) { alert(f.name + " exceeds 10 MB."); return; }
      files.push(f);
    });
    renderP();
  }

  function renderP() {
    pvs.innerHTML = "";
    files.forEach(function(f, i) {
      var d = document.createElement("div"); d.className = "ihw-pv";
      var el = document.createElement(f.type.startsWith("image/") ? "img" : "video");
      el.src = URL.createObjectURL(f); if (el.tagName === "VIDEO") el.muted = true;
      d.appendChild(el);
      var x = document.createElement("button"); x.innerHTML = "&times;"; x.type = "button";
      x.onclick = function() { files.splice(i, 1); renderP(); };
      d.appendChild(x); pvs.appendChild(d);
    });
  }

  function toB64(f) {
    return new Promise(function(r, j) { var x = new FileReader(); x.onload = function() { r(x.result); }; x.onerror = j; x.readAsDataURL(f); });
  }

  // Draft
  function saveD() { try { sessionStorage.setItem("ihw_d", JSON.stringify({ n: $("ihw-name").value, e: $("ihw-email").value, p: $("ihw-phone").value, c: $("ihw-company").value, cat: $("ihw-cat").value, s: $("ihw-subj").value, d: $("ihw-desc").value, pr: prio })); } catch(e){} }
  function loadD() { try { var d = JSON.parse(sessionStorage.getItem("ihw_d")); if (!d) return; if (d.n) $("ihw-name").value = d.n; if (d.e) $("ihw-email").value = d.e; if (d.p) $("ihw-phone").value = d.p; if (d.c) $("ihw-company").value = d.c; if (d.cat) $("ihw-cat").value = d.cat; if (d.s) $("ihw-subj").value = d.s; if (d.d) $("ihw-desc").value = d.d; if (d.pr) { prio = d.pr; pbs.forEach(function(b){b.classList.toggle("on", b.getAttribute("data-p")===d.pr)}); } } catch(e){} }
  ["ihw-name","ihw-email","ihw-phone","ihw-company","ihw-subj","ihw-desc"].forEach(function(id) { var e = $(id); if (e) e.oninput = saveD; });
  $("ihw-cat").onchange = saveD;
  loadD();

  // Submit
  form.onsubmit = async function(e) {
    e.preventDefault();
    var nm = $("ihw-name").value.trim(), em = $("ihw-email").value.trim(),
        ph = $("ihw-phone").value.trim(), co = $("ihw-company").value.trim(),
        cat = $("ihw-cat").value, su = $("ihw-subj").value.trim(), de = $("ihw-desc").value.trim();
    if (!nm || !em || !su || !de) return;
    subBtn.disabled = true;
    subBtn.innerHTML = '<span class="ihw-sp"></span>Submitting...';
    try {
      var att = "";
      if (files.length) { att = "\n\n--- Attachments ---\n"; for (var i = 0; i < files.length; i++) { var b = await toB64(files[i]); att += "File " + (i+1) + ": " + files[i].name + " (" + (files[i].size/1024).toFixed(1) + "KB)\nData: " + b + "\n\n"; } }
      var desc = de;
      if (co) desc = "Company: " + co + "\n" + desc;
      if (cat) desc = "Category: " + cat + "\n" + desc;
      desc += "\n\n--- System ---\n" + sysInfo.os + " / " + sysInfo.browser + " / " + sysInfo.screen + "\n" + sysInfo.url + att;

      var r = await fetch(SUPABASE_URL + "/functions/v1/submit-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + SUPABASE_ANON_KEY },
        body: JSON.stringify({ name: nm, email: em, phone: ph || undefined, subject: su, description: desc, priority: prio, source: SOURCE })
      });
      var res = await r.json();
      if (res.success) {
        try { sessionStorage.removeItem("ihw_d"); } catch(x){}
        form.style.display = "none";
        okDiv.style.display = "block";
        var ai = "";
        if (res.ai_response) {
          ai = '<div class="ihw-ai"><div class="ihw-ai-h"><i>AI</i> In-Sync AI Response</div><p>' + res.ai_response.replace(/</g,"&lt;").replace(/>/g,"&gt;") + '</p><small>Automated response. Our team will follow up if needed.</small></div>';
        }
        okDiv.innerHTML = '<div class="ihw-ok"><div class="ihw-ok-ic"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div><h4>Ticket Created!</h4><div class="tkt"><b>' + res.ticket_number + '</b></div><p>Confirmation email sent to <b>' + em + '</b></p>' + ai + '<div class="res"><b>Expected Resolution:</b> ' + res.expected_resolution_formatted + '<br>Mon-Fri, 9 AM - 6 PM IST</div><p style="font-size:11px!important;color:#aaa!important">Use <b>' + res.ticket_number + '</b> in Track Ticket tab</p><button class="nb" id="ihw-nw">Submit Another Ticket</button></div>';
        $("ihw-nw").onclick = function() { form.reset(); form.style.display = "block"; okDiv.style.display = "none"; files = []; renderP(); prio = "medium"; pbs.forEach(function(b){b.classList.toggle("on", b.getAttribute("data-p")==="medium")}); };
      } else { alert("Error: " + (res.error || "Failed")); }
    } catch(err) { alert("Network error. Please try again."); }
    finally { subBtn.disabled = false; subBtn.innerHTML = "Submit Ticket"; }
  };

  // Track
  tb2.onclick = async function() {
    var n = ti.value.trim().toUpperCase();
    if (!n) { tr.innerHTML = '<p class="ihw-em">Please enter a ticket number</p>'; return; }
    tb2.disabled = true; tb2.innerHTML = '<span class="ihw-sp"></span>Searching...';
    try {
      var r = await fetch(SUPABASE_URL + "/rest/v1/support_tickets?ticket_number=eq." + encodeURIComponent(n) + "&select=*", { headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + SUPABASE_ANON_KEY } });
      var tks = await r.json();
      if (tks && tks.length) {
        var t = tks[0], ct = new Date(t.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
        var rv = ""; if (t.resolved_at) { rv = '<div class="ihw-tr"><span class="ihw-tl">Resolved</span><span class="ihw-tv">' + new Date(t.resolved_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) + '</span></div>'; }
        tr.innerHTML = '<div class="ihw-trk"><div class="ihw-tr"><span class="ihw-tl">Ticket</span><span class="ihw-tv">' + t.ticket_number + '</span></div><div class="ihw-tr"><span class="ihw-tl">Subject</span><span class="ihw-tv">' + t.subject + '</span></div><div class="ihw-tr"><span class="ihw-tl">Status</span><span class="ihw-st ihw-st-' + t.status + '">' + t.status.replace("_"," ").toUpperCase() + '</span></div><div class="ihw-tr"><span class="ihw-tl">Priority</span><span class="ihw-tv" style="text-transform:capitalize!important">' + t.priority + '</span></div><div class="ihw-tr"><span class="ihw-tl">Created</span><span class="ihw-tv">' + ct + '</span></div>' + rv + '</div>';
      } else { tr.innerHTML = '<p class="ihw-em" style="text-align:center!important;padding:16px!important">No ticket found: <b>' + n + '</b></p>'; }
    } catch(e) { tr.innerHTML = '<p class="ihw-em">Failed to fetch. Try again.</p>'; }
    finally { tb2.disabled = false; tb2.innerHTML = "Track Ticket"; }
  };
  ti.onkeydown = function(e) { if (e.key === "Enter") { e.preventDefault(); tb2.click(); } };
})();
