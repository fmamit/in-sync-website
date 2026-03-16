/**
 * In-Sync Help Ticket Widget (Shadow DOM isolated)
 */
(function () {
  "use strict";

  var SUPABASE_URL = "https://ljggjepqdqdffoejizpg.supabase.co";
  var SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqZ2dqZXBxZHFkZmZvZWppenBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMzg0MzAsImV4cCI6MjA4NzkxNDQzMH0.q7J0MALSejAlA1GT5nPsQAv0XmiT3BXSYOOJNwIaUP4";
  var scriptTag = document.currentScript;
  var COLOR = (scriptTag && scriptTag.getAttribute("data-color")) || "#8b5cf6";
  var POSITION = (scriptTag && scriptTag.getAttribute("data-position")) || "right";
  var SOURCE = (scriptTag && scriptTag.getAttribute("data-source")) || "website";
  var MAX_IMG = 5, MAX_VID = 2;

  function isOnline() {
    var ist = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    return ist.getDay() >= 1 && ist.getDay() <= 5 && ist.getHours() >= 9 && ist.getHours() < 18;
  }
  function getSys() {
    var ua = navigator.userAgent, b = "Unknown", o = "Unknown";
    if (ua.indexOf("Edg") > -1) b = "Edge"; else if (ua.indexOf("Chrome") > -1) b = "Chrome"; else if (ua.indexOf("Firefox") > -1) b = "Firefox"; else if (ua.indexOf("Safari") > -1) b = "Safari";
    if (ua.indexOf("Win") > -1) o = "Windows"; else if (ua.indexOf("Mac") > -1) o = "macOS"; else if (ua.indexOf("Linux") > -1) o = "Linux"; else if (ua.indexOf("Android") > -1) o = "Android"; else if (/iPhone|iPad/.test(ua)) o = "iOS";
    return { browser: b, os: o, url: location.href, screen: screen.width + "x" + screen.height };
  }

  var online = isOnline();
  var dotCol = online ? "#22c55e" : "#eab308";
  var onTxt = online ? "We're online now" : "We'll respond in business hours";
  var sys = getSys();

  // Create host + shadow
  var host = document.createElement("div");
  host.style.cssText = "position:fixed;bottom:20px;" + POSITION + ":20px;z-index:999998;font-size:0;line-height:0;";
  document.body.appendChild(host);
  var shadow = host.attachShadow({ mode: "open" });

  // Overlay (outside shadow, on the page)
  var overlay = document.createElement("div");
  overlay.id = "ihw-overlay";
  overlay.style.cssText = "display:none;position:fixed;inset:0;background:rgba(0,0,0,0.35);z-index:999997;backdrop-filter:blur(2px);";
  document.body.appendChild(overlay);

  var CSS = `
    :host { all: initial; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; border: 0; font: inherit; }

    .fab {
      width: 44px; height: 44px; border-radius: 50%; background: ${COLOR};
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 16px rgba(139,92,246,0.4); transition: transform 0.2s;
      position: relative;
    }
    .fab:hover { transform: scale(1.1); }
    .fab svg { width: 20px; height: 20px; fill: #fff; }
    .fab .ic2 { display: none; }
    .fab.on .ic1 { display: none; }
    .fab.on .ic2 { display: block; }
    .dot {
      position: absolute; top: -1px; right: -1px; width: 10px; height: 10px;
      border-radius: 50%; background: ${dotCol}; border: 2px solid #fff;
    }

    .pn {
      display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
      width: 460px; max-width: calc(100vw - 32px); max-height: calc(100vh - 40px);
      background: #fff; border-radius: 16px;
      box-shadow: 0 25px 80px rgba(0,0,0,0.18);
      overflow: hidden; flex-direction: column;
      z-index: 999999; animation: up 0.3s ease;
    }
    .pn.on { display: flex; }
    @keyframes up {
      from { opacity: 0; transform: translate(-50%, -48%) scale(0.95); }
      to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }

    .hd {
      background: linear-gradient(135deg, ${COLOR}, #a78bfa);
      padding: 18px 24px; flex-shrink: 0;
    }
    .hd h3 { color: #fff; font-size: 16px; font-weight: 700; margin-bottom: 4px; }
    .hd-st { display: flex; align-items: center; gap: 6px; }
    .hd-st i { width: 7px; height: 7px; border-radius: 50%; background: ${dotCol}; display: block; font-style: normal; }
    .hd-st span { color: rgba(255,255,255,0.85); font-size: 12px; }

    .tabs { display: flex; border-bottom: 1px solid #e5e7eb; flex-shrink: 0; background: #fafafa; }
    .tab {
      flex: 1; padding: 10px; background: transparent; cursor: pointer;
      font-size: 12px; font-weight: 600; color: #9ca3af; text-align: center;
      border-bottom: 2px solid transparent; text-transform: uppercase; letter-spacing: 0.5px;
      transition: all 0.15s;
    }
    .tab.on { color: ${COLOR}; border-bottom-color: ${COLOR}; background: #fff; }

    .bd { padding: 24px 28px; overflow-y: auto; flex: 1; min-height: 0; }
    .tc { display: none; }
    .tc.on { display: block; }

    .g { margin-bottom: 20px; }
    .g label { display: block; font-size: 14px; font-weight: 600; color: #1f2937; margin-bottom: 8px; }
    .g label b { color: #ef4444; font-weight: 600; }
    .g input, .g textarea, .g select {
      display: block; width: 100%; padding: 12px 16px; height: 44px;
      border: 2px solid #d1d5db; border-radius: 10px;
      font-size: 14px; font-family: inherit; background: #ffffff; color: #111827;
      outline: none; transition: border-color 0.2s, box-shadow 0.2s;
      -webkit-appearance: none; appearance: none;
    }
    .g input:focus, .g textarea:focus, .g select:focus {
      border-color: ${COLOR}; background: #fff; box-shadow: 0 0 0 4px rgba(139,92,246,0.12);
    }
    .g input::placeholder, .g textarea::placeholder { color: #9ca3af; font-size: 14px; }
    .g textarea { resize: vertical; min-height: 100px; height: auto; }
    .g select {
      cursor: pointer;
      background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24'%3E%3Cpath fill='%23666' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E") no-repeat right 14px center;
      padding-right: 36px;
    }

    .r2 { display: flex; gap: 16px; }
    .r2 > .g { flex: 1; min-width: 0; }

    .pr { display: flex; gap: 8px; }
    .pb {
      flex: 1; padding: 10px 6px; border: 2px solid #d1d5db; border-radius: 10px;
      background: #fff; cursor: pointer; font-size: 13px; font-weight: 600;
      text-align: center; color: #6b7280; transition: all 0.15s; font-family: inherit;
    }
    .pb:hover { border-color: #9ca3af; background: #f9fafb; }
    .pb.on { border-width: 2.5px; }
    .pb[data-p=low].on { border-color: #22c55e; background: #f0fdf4; color: #166534; }
    .pb[data-p=medium].on { border-color: #f59e0b; background: #fffbeb; color: #92400e; }
    .pb[data-p=high].on { border-color: #f97316; background: #fff7ed; color: #9a3412; }
    .pb[data-p=critical].on { border-color: #ef4444; background: #fef2f2; color: #991b1b; }

    .upw { display: flex; gap: 12px; }
    .upl {
      flex: 1; border: 2px dashed #c7c7c7; border-radius: 12px; padding: 20px;
      text-align: center; cursor: pointer; background: #f9fafb; transition: all 0.15s;
    }
    .upl:hover { border-color: ${COLOR}; background: #faf5ff; }
    .upl svg { width: 28px; height: 28px; fill: #9ca3af; display: block; margin: 0 auto 8px; }
    .upl p { font-size: 14px; color: #6b7280; }
    .upl small { font-size: 12px; color: #9ca3af; display: block; margin-top: 4px; }
    .ssb {
      width: 56px; border: 2px dashed #c7c7c7; border-radius: 12px; background: #f9fafb;
      cursor: pointer; display: flex; flex-direction: column; align-items: center;
      justify-content: center; gap: 4px; transition: all 0.15s; flex-shrink: 0;
    }
    .ssb:hover { border-color: ${COLOR}; background: #faf5ff; }
    .ssb svg { width: 22px; height: 22px; fill: #9ca3af; }
    .ssb span { font-size: 9px; color: #9ca3af; font-weight: 700; text-transform: uppercase; }

    .pvs { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
    .pv { position: relative; width: 56px; height: 56px; border-radius: 10px; overflow: hidden; border: 2px solid #e5e7eb; }
    .pv img, .pv video { width: 100%; height: 100%; object-fit: cover; display: block; }
    .pv button {
      position: absolute; top: 3px; right: 3px; width: 20px; height: 20px;
      border-radius: 50%; background: rgba(0,0,0,0.65); color: #fff; cursor: pointer;
      font-size: 12px; display: flex; align-items: center; justify-content: center;
    }

    .btn {
      display: block; width: 100%; padding: 14px;
      background: ${COLOR};
      color: #fff; border-radius: 10px; font-size: 15px; font-weight: 700;
      cursor: pointer; transition: background 0.2s, transform 0.1s; margin-top: 12px; text-align: center;
      letter-spacing: 0.3px; box-shadow: 0 4px 14px rgba(139,92,246,0.3);
    }
    .btn:hover { background: #7c3aed; }
    .btn:active { transform: scale(0.98); }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; box-shadow: none; }
    .sp {
      display: inline-block; width: 16px; height: 16px;
      border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
      border-radius: 50%; animation: sp 0.6s linear infinite;
      vertical-align: middle; margin-right: 8px;
    }
    @keyframes sp { to { transform: rotate(360deg); } }

    .ok { text-align: center; padding: 24px 0; }
    .ok-ic {
      width: 56px; height: 56px; border-radius: 50%; background: #dcfce7;
      display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;
    }
    .ok-ic svg { width: 28px; height: 28px; fill: #16a34a; }
    .ok h4 { color: #166534; font-size: 18px; font-weight: 700; margin-bottom: 8px; }
    .ok .tkt { background: #f0fdf4; border: 1px solid #bbf7d0; padding: 8px 20px; border-radius: 8px; display: inline-block; margin: 8px 0; }
    .ok .tkt b { font-size: 18px; font-weight: 700; color: ${COLOR}; letter-spacing: 1px; }
    .ok p { color: #6b7280; font-size: 13px; line-height: 1.6; }
    .ok .res { background: #f5f3ff; border: 1px solid #ddd6fe; padding: 10px 14px; border-radius: 8px; margin: 12px 0; font-size: 12px; color: #6d28d9; text-align: left; }
    .ok .nb { margin-top: 12px; padding: 8px 20px; background: #f3f4f6; color: #374151; border-radius: 8px; font-size: 13px; cursor: pointer; font-weight: 500; display: inline-block; }
    .ok .nb:hover { background: #e5e7eb; }

    .ai { background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 10px; padding: 14px; margin: 14px 0; text-align: left; }
    .ai-h { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; font-size: 13px; font-weight: 700; color: #6d28d9; }
    .ai-h i { display: inline-flex; width: 22px; height: 22px; background: #8b5cf6; border-radius: 50%; align-items: center; justify-content: center; color: #fff; font-size: 9px; font-weight: 700; font-style: normal; }
    .ai p { color: #374151; font-size: 13px; line-height: 1.6; white-space: pre-wrap; }
    .ai small { color: #9ca3af; font-size: 10px; font-style: italic; display: block; margin-top: 8px; }

    .trk { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; margin-top: 14px; }
    .tr { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
    .tr:last-child { border-bottom: none; }
    .tl { color: #6b7280; font-weight: 500; }
    .tv { color: #1f2937; font-weight: 600; }
    .st { display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 10px; font-weight: 700; text-transform: uppercase; }
    .st-open { background: #dbeafe; color: #1e40af; }
    .st-in_progress { background: #fef3c7; color: #92400e; }
    .st-resolved { background: #dcfce7; color: #166534; }
    .st-closed { background: #f3f4f6; color: #6b7280; }
    .wh { background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 10px 14px; margin-top: 14px; font-size: 12px; color: #92400e; line-height: 1.5; }
    .em { color: #ef4444; font-size: 12px; margin-top: 6px; }

    .ft { padding: 10px 24px; border-top: 1px solid #f0f0f0; text-align: center; font-size: 11px; color: #bbb; flex-shrink: 0; background: #fafafa; }
    .ft a { color: ${COLOR}; text-decoration: none; font-weight: 600; }

    @media (max-width: 480px) {
      .pn { width: calc(100vw - 16px); max-height: 92vh; }
    }
  `;

  var HTML = `
    <div class="fab" id="fab">
      <span class="dot"></span>
      <svg class="ic1" viewBox="0 0 24 24"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>
      <svg class="ic2" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
    </div>
    <div class="pn" id="pn">
      <div class="hd"><h3>Help & Support</h3><div class="hd-st"><i></i><span>${onTxt}</span></div></div>
      <div class="tabs"><button class="tab on" data-t="s">Raise Ticket</button><button class="tab" data-t="t">Track Ticket</button></div>
      <div class="bd">
        <div class="tc on" id="ts">
          <form id="fm">
            <div class="r2"><div class="g"><label>Name <b>*</b></label><input id="nm" placeholder="Your full name" required></div><div class="g"><label>Email <b>*</b></label><input type="email" id="em" placeholder="you@company.com" required></div></div>
            <div class="r2"><div class="g"><label>Phone</label><input type="tel" id="ph" placeholder="+91 XXXXX XXXXX"></div><div class="g"><label>Company</label><input id="co" placeholder="Company name"></div></div>
            <div class="r2"><div class="g"><label>Category</label><select id="ct"><option>General</option><option>Bug / Issue</option><option>Feature Request</option><option>Billing</option><option>Integration</option><option>Account / Login</option><option>Other</option></select></div><div class="g"><label>Priority</label><div class="pr"><button type="button" class="pb" data-p="low">Low</button><button type="button" class="pb on" data-p="medium">Medium</button><button type="button" class="pb" data-p="high">High</button><button type="button" class="pb" data-p="critical">Critical</button></div></div></div>
            <div class="g"><label>Subject <b>*</b></label><input id="su" placeholder="Brief summary of your issue" required></div>
            <div class="g"><label>Description <b>*</b></label><textarea id="de" placeholder="Please describe your issue in detail..." rows="4" required></textarea></div>
            <div class="g"><label>Attachments</label>
              <div class="upw"><div class="upl" id="upl"><svg viewBox="0 0 24 24"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/></svg><p>Click to attach files</p><small>Images &middot; Videos &middot; Screenshots</small></div><button type="button" class="ssb" id="ssb"><svg viewBox="0 0 24 24"><path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h4.05l1.83-2h4.24l1.83 2H20v12zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/></svg><span>Snap</span></button></div>
              <input type="file" id="fi" accept="image/*,video/*" multiple style="display:none">
              <div class="pvs" id="pvs"></div>
            </div>
            <button type="submit" class="btn" id="sb">Submit Ticket</button>
          </form>
          <div class="ok" id="ok" style="display:none"></div>
        </div>
        <div class="tc" id="tt">
          <div class="g"><label>Ticket Number <b>*</b></label><input id="ti" placeholder="e.g. TKT-20260316-0001"></div>
          <button class="btn" id="tb">Track Ticket</button>
          <div id="trd"></div>
          <div class="wh"><strong>Working Hours:</strong> Monday to Friday, 9:00 AM - 6:00 PM IST.<br>Resolution times are based on business hours.</div>
        </div>
      </div>
      <div class="ft">Powered by <a href="https://in-sync-crm.com" target="_blank">In-Sync CRM</a></div>
    </div>
  `;

  shadow.innerHTML = "<style>" + CSS + "</style>" + HTML;

  // ── Logic ──
  var q = function(s) { return shadow.querySelector(s); };
  var qa = function(s) { return shadow.querySelectorAll(s); };
  var isOpen = false, files = [], prio = "medium";

  var fab = q("#fab"), pn = q("#pn"), fm = q("#fm"), okDiv = q("#ok"), sb = q("#sb");
  var upl = q("#upl"), fi = q("#fi"), pvs = q("#pvs"), ssb = q("#ssb");

  function toggle() {
    isOpen = !isOpen;
    fab.classList.toggle("on", isOpen);
    pn.classList.toggle("on", isOpen);
    overlay.style.display = isOpen ? "block" : "none";
  }
  fab.onclick = toggle;
  overlay.onclick = toggle;

  qa(".tab").forEach(function(t) {
    t.onclick = function() {
      qa(".tab").forEach(function(x) { x.classList.remove("on"); });
      t.classList.add("on");
      var v = t.getAttribute("data-t");
      q("#ts").classList.toggle("on", v === "s");
      q("#tt").classList.toggle("on", v === "t");
    };
  });

  qa(".pb").forEach(function(b) {
    b.onclick = function() {
      qa(".pb").forEach(function(x) { x.classList.remove("on"); });
      b.classList.add("on");
      prio = b.getAttribute("data-p");
    };
  });

  upl.onclick = function() { fi.click(); };
  upl.ondragover = function(e) { e.preventDefault(); upl.style.borderColor = COLOR; };
  upl.ondragleave = function() { upl.style.borderColor = "#ddd"; };
  upl.ondrop = function(e) { e.preventDefault(); upl.style.borderColor = "#ddd"; addF(e.dataTransfer.files); };
  fi.onchange = function() { addF(fi.files); fi.value = ""; };

  ssb.onclick = async function() {
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
      if (ii && f.size > 5242880) { alert(f.name + " exceeds 5 MB."); return; }
      if (iv && f.size > 10485760) { alert(f.name + " exceeds 10 MB."); return; }
      files.push(f);
    }); renderP();
  }

  function renderP() {
    pvs.innerHTML = "";
    files.forEach(function(f, i) {
      var d = document.createElement("div"); d.className = "pv";
      var el = document.createElement(f.type.startsWith("image/") ? "img" : "video");
      el.src = URL.createObjectURL(f); if (el.tagName === "VIDEO") el.muted = true;
      d.appendChild(el);
      var x = document.createElement("button"); x.innerHTML = "&times;"; x.type = "button";
      x.onclick = function() { files.splice(i, 1); renderP(); };
      d.appendChild(x); pvs.appendChild(d);
    });
  }

  function toB64(f) { return new Promise(function(r, j) { var x = new FileReader(); x.onload = function(){r(x.result)}; x.onerror = j; x.readAsDataURL(f); }); }

  // Draft
  function saveD() { try { sessionStorage.setItem("ihw_d", JSON.stringify({ n:q("#nm").value, e:q("#em").value, p:q("#ph").value, c:q("#co").value, ct:q("#ct").value, s:q("#su").value, d:q("#de").value, pr:prio })); } catch(e){} }
  function loadD() { try { var d = JSON.parse(sessionStorage.getItem("ihw_d")); if(!d) return; if(d.n) q("#nm").value=d.n; if(d.e) q("#em").value=d.e; if(d.p) q("#ph").value=d.p; if(d.c) q("#co").value=d.c; if(d.ct) q("#ct").value=d.ct; if(d.s) q("#su").value=d.s; if(d.d) q("#de").value=d.d; if(d.pr){prio=d.pr;qa(".pb").forEach(function(b){b.classList.toggle("on",b.getAttribute("data-p")===d.pr)});} } catch(e){} }
  ["#nm","#em","#ph","#co","#su","#de"].forEach(function(s){var e=q(s);if(e)e.oninput=saveD;});
  q("#ct").onchange = saveD;
  loadD();

  // Submit
  fm.onsubmit = async function(e) {
    e.preventDefault();
    var nm=q("#nm").value.trim(), em=q("#em").value.trim(), ph=q("#ph").value.trim(),
        co=q("#co").value.trim(), ct=q("#ct").value, su=q("#su").value.trim(), de=q("#de").value.trim();
    if (!nm||!em||!su||!de) return;
    sb.disabled = true; sb.innerHTML = '<span class="sp"></span>Submitting...';
    try {
      var att = "";
      if (files.length) { att = "\n\n--- Attachments ---\n"; for (var i=0;i<files.length;i++) { var b=await toB64(files[i]); att+="File "+(i+1)+": "+files[i].name+" ("+(files[i].size/1024).toFixed(1)+"KB)\nData: "+b+"\n\n"; } }
      var desc = de;
      if (co) desc = "Company: "+co+"\n"+desc;
      if (ct) desc = "Category: "+ct+"\n"+desc;
      desc += "\n\n--- System ---\n"+sys.os+" / "+sys.browser+" / "+sys.screen+"\n"+sys.url+att;

      var r = await fetch(SUPABASE_URL+"/functions/v1/submit-ticket", {
        method:"POST", headers:{"Content-Type":"application/json","apikey":SUPABASE_ANON_KEY,"Authorization":"Bearer "+SUPABASE_ANON_KEY},
        body: JSON.stringify({name:nm,email:em,phone:ph||undefined,subject:su,description:desc,priority:prio,source:SOURCE})
      });
      var res = await r.json();
      if (res.success) {
        try{sessionStorage.removeItem("ihw_d")}catch(x){}
        fm.style.display="none"; okDiv.style.display="block";
        var ai="";
        if(res.ai_response) ai='<div class="ai"><div class="ai-h"><i>AI</i> In-Sync AI Response</div><p>'+res.ai_response.replace(/</g,"&lt;").replace(/>/g,"&gt;")+'</p><small>Automated response. Our team will follow up if needed.</small></div>';
        okDiv.innerHTML='<div class="ok"><div class="ok-ic"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div><h4>Ticket Created!</h4><div class="tkt"><b>'+res.ticket_number+'</b></div><p>Confirmation sent to <b>'+em+'</b></p>'+ai+'<div class="res"><b>Expected Resolution:</b> '+res.expected_resolution_formatted+'<br>Mon-Fri, 9 AM - 6 PM IST</div><p style="font-size:11px;color:#aaa">Track with <b>'+res.ticket_number+'</b></p><button class="nb" id="nw">Submit Another</button></div>';
        q("#nw").onclick=function(){fm.reset();fm.style.display="block";okDiv.style.display="none";files=[];renderP();prio="medium";qa(".pb").forEach(function(b){b.classList.toggle("on",b.getAttribute("data-p")==="medium")});};
      } else { alert("Error: "+(res.error||"Failed")); }
    } catch(err) { alert("Network error. Try again."); }
    finally { sb.disabled=false; sb.innerHTML="Submit Ticket"; }
  };

  // Track
  var tb=q("#tb"), ti=q("#ti"), trd=q("#trd");
  tb.onclick = async function() {
    var n=ti.value.trim().toUpperCase();
    if(!n){trd.innerHTML='<p class="em">Please enter a ticket number</p>';return;}
    tb.disabled=true; tb.innerHTML='<span class="sp"></span>Searching...';
    try {
      var r=await fetch(SUPABASE_URL+"/rest/v1/support_tickets?ticket_number=eq."+encodeURIComponent(n)+"&select=*",{headers:{"apikey":SUPABASE_ANON_KEY,"Authorization":"Bearer "+SUPABASE_ANON_KEY}});
      var tks=await r.json();
      if(tks&&tks.length){
        var t=tks[0],ct=new Date(t.created_at).toLocaleString("en-IN",{timeZone:"Asia/Kolkata",dateStyle:"medium",timeStyle:"short"});
        var rv="";if(t.resolved_at)rv='<div class="tr"><span class="tl">Resolved</span><span class="tv">'+new Date(t.resolved_at).toLocaleString("en-IN",{timeZone:"Asia/Kolkata",dateStyle:"medium",timeStyle:"short"})+'</span></div>';
        trd.innerHTML='<div class="trk"><div class="tr"><span class="tl">Ticket</span><span class="tv">'+t.ticket_number+'</span></div><div class="tr"><span class="tl">Subject</span><span class="tv">'+t.subject+'</span></div><div class="tr"><span class="tl">Status</span><span class="st st-'+t.status+'">'+t.status.replace("_"," ").toUpperCase()+'</span></div><div class="tr"><span class="tl">Priority</span><span class="tv" style="text-transform:capitalize">'+t.priority+'</span></div><div class="tr"><span class="tl">Created</span><span class="tv">'+ct+'</span></div>'+rv+'</div>';
      } else { trd.innerHTML='<p class="em" style="text-align:center;padding:16px">No ticket found: <b>'+n+'</b></p>'; }
    } catch(e){ trd.innerHTML='<p class="em">Failed to fetch. Try again.</p>'; }
    finally { tb.disabled=false; tb.innerHTML="Track Ticket"; }
  };
  ti.onkeydown=function(e){if(e.key==="Enter"){e.preventDefault();tb.click();}};
})();
