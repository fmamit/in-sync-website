/**
 * In-Sync Help Ticket Widget
 * Simple ticket submission with screenshot upload.
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
    }
    .ihw-fab:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(139,92,246,0.5); }
    .ihw-fab svg { width: 26px; height: 26px; fill: #fff; }
    .ihw-fab .ihw-ic-close { display: none; }
    .ihw-fab.ihw-active .ihw-ic-open { display: none; }
    .ihw-fab.ihw-active .ihw-ic-close { display: block; }
    .ihw-panel {
      display: none; position: fixed; bottom: 92px; ${POSITION}: 24px;
      width: 400px; max-width: calc(100vw - 32px); max-height: calc(100vh - 120px);
      background: #fff; border-radius: 16px;
      box-shadow: 0 10px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05);
      overflow: hidden; flex-direction: column; animation: ihw-up 0.3s ease;
    }
    .ihw-panel.ihw-open { display: flex; }
    @keyframes ihw-up { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    .ihw-hdr { background: ${COLOR}; padding: 20px 24px; }
    .ihw-hdr h3 { color: #fff; font-size: 17px; font-weight: 700; margin-bottom: 2px; }
    .ihw-hdr p { color: rgba(255,255,255,0.85); font-size: 12px; }
    .ihw-body { padding: 18px 20px; overflow-y: auto; flex: 1; }
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
    .ihw-upload {
      border: 2px dashed #d1d5db; border-radius: 8px; padding: 16px;
      text-align: center; cursor: pointer; transition: all 0.2s; background: #fafafa;
    }
    .ihw-upload:hover { border-color: ${COLOR}; background: #f5f3ff; }
    .ihw-upload svg { width: 28px; height: 28px; margin: 0 auto 6px; fill: #9ca3af; display: block; }
    .ihw-upload p { font-size: 13px; color: #6b7280; }
    .ihw-upload .ihw-hint { font-size: 11px; color: #9ca3af; margin-top: 4px; }
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
      border: none; border-radius: 8px; font-size: 13px; cursor: pointer;
    }
    .ihw-ok-btn:hover { background: #e5e7eb; }
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

  var w = document.createElement("div");
  w.id = "ihw-root";
  w.innerHTML = `
    <button class="ihw-fab" aria-label="Raise a ticket">
      <svg class="ihw-ic-open" viewBox="0 0 24 24"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>
      <svg class="ihw-ic-close" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
    </button>
    <div class="ihw-panel">
      <div class="ihw-hdr">
        <h3>Raise a Ticket</h3>
        <p>Describe your issue and we'll get back to you</p>
      </div>
      <div class="ihw-body">
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
              <option value="Other">Other</option>
            </select>
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
            <div class="ihw-upload" id="ihw-upload">
              <svg viewBox="0 0 24 24"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/></svg>
              <p>Click to attach files</p>
              <div class="ihw-hint">Images (max ${MAX_IMG}, 5 MB each) · Videos (max ${MAX_VID}, 10 MB each)</div>
            </div>
            <input type="file" id="ihw-file" accept="image/*,video/*" multiple hidden>
            <div class="ihw-previews" id="ihw-previews"></div>
          </div>
          <button type="submit" class="ihw-btn" id="ihw-submit">Submit Ticket</button>
        </form>
        <div class="ihw-ok" id="ihw-ok" style="display:none;"></div>
      </div>
      <div class="ihw-footer">Powered by <a href="https://in-sync-crm.com" target="_blank">In-Sync CRM</a></div>
    </div>
  `;
  document.body.appendChild(w);

  var isOpen = false;
  var files = [];
  var fab = w.querySelector(".ihw-fab");
  var panel = w.querySelector(".ihw-panel");
  var form = document.getElementById("ihw-form");
  var okDiv = document.getElementById("ihw-ok");
  var submitBtn = document.getElementById("ihw-submit");
  var uploadArea = document.getElementById("ihw-upload");
  var fileInput = document.getElementById("ihw-file");
  var previews = document.getElementById("ihw-previews");

  fab.addEventListener("click", function () {
    isOpen = !isOpen;
    panel.classList.toggle("ihw-open", isOpen);
    fab.classList.toggle("ihw-active", isOpen);
  });

  uploadArea.addEventListener("click", function () { fileInput.click(); });
  uploadArea.addEventListener("dragover", function (e) { e.preventDefault(); uploadArea.style.borderColor = COLOR; });
  uploadArea.addEventListener("dragleave", function () { uploadArea.style.borderColor = "#d1d5db"; });
  uploadArea.addEventListener("drop", function (e) {
    e.preventDefault(); uploadArea.style.borderColor = "#d1d5db";
    addFiles(e.dataTransfer.files);
  });
  fileInput.addEventListener("change", function () { addFiles(fileInput.files); fileInput.value = ""; });

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
          subject: subject, description: fullDesc, priority: "medium", source: SOURCE,
        }),
      });

      var result = await resp.json();

      if (result.success) {
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
          '<button class="ihw-ok-btn" id="ihw-new">Submit Another Ticket</button>' +
          '</div>';
        document.getElementById("ihw-new").addEventListener("click", function () {
          form.reset(); form.style.display = "block"; okDiv.style.display = "none";
          files = []; renderPreviews();
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
})();
