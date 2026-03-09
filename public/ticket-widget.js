/**
 * In-Sync Support Ticket Widget
 * Embeddable on any platform via:
 * <script src="https://YOUR_DOMAIN/ticket-widget.js" data-source="PLATFORM_NAME"></script>
 *
 * Features:
 * - Ticket submission with email notification
 * - Screenshot/photo upload
 * - Priority selection
 * - Working hours resolution (Mon-Fri 9AM-6PM IST)
 * - Track ticket status
 */
(function () {
  "use strict";

  const SUPABASE_URL = "https://ljggjepqdqdffoejizpg.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqZ2dqZXBxZHFkZmZvZWppenBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMzg0MzAsImV4cCI6MjA4NzkxNDQzMH0.q7J0MALSejAlA1GT5nPsQAv0XmiT3BXSYOOJNwIaUP4";

  const scriptTag = document.currentScript;
  const SOURCE = (scriptTag && scriptTag.getAttribute("data-source")) || "website";
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_FILES = 3;

  // Inject styles
  const style = document.createElement("style");
  style.textContent = `
    #insync-ticket-widget *,
    #insync-ticket-widget *::before,
    #insync-ticket-widget *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    #insync-ticket-widget {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999999;
    }
    .itw-fab {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #1e40af, #3b82f6);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(30, 64, 175, 0.4);
      transition: transform 0.2s, box-shadow 0.2s;
      position: relative;
    }
    .itw-fab:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 28px rgba(30, 64, 175, 0.5);
    }
    .itw-fab svg {
      width: 28px;
      height: 28px;
      fill: white;
    }
    .itw-fab-tooltip {
      position: absolute;
      right: 72px;
      top: 50%;
      transform: translateY(-50%);
      background: #1f2937;
      color: #fff;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 13px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
    }
    .itw-fab:hover .itw-fab-tooltip {
      opacity: 1;
    }
    .itw-panel {
      display: none;
      position: fixed;
      bottom: 96px;
      right: 24px;
      width: 400px;
      max-width: calc(100vw - 32px);
      max-height: calc(100vh - 120px);
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 10px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05);
      overflow: hidden;
      flex-direction: column;
      animation: itw-slideUp 0.3s ease;
    }
    .itw-panel.itw-open {
      display: flex;
    }
    @keyframes itw-slideUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .itw-header {
      background: linear-gradient(135deg, #1e40af, #3b82f6);
      padding: 20px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .itw-header h3 {
      color: #fff;
      font-size: 17px;
      font-weight: 600;
    }
    .itw-header-sub {
      color: #bfdbfe;
      font-size: 12px;
      margin-top: 2px;
    }
    .itw-close {
      background: rgba(255,255,255,0.15);
      border: none;
      color: #fff;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      transition: background 0.2s;
    }
    .itw-close:hover {
      background: rgba(255,255,255,0.25);
    }
    .itw-tabs {
      display: flex;
      border-bottom: 1px solid #e5e7eb;
    }
    .itw-tab {
      flex: 1;
      padding: 12px;
      border: none;
      background: #fff;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      color: #6b7280;
      transition: all 0.2s;
      border-bottom: 2px solid transparent;
    }
    .itw-tab.itw-active {
      color: #1e40af;
      border-bottom-color: #1e40af;
      background: #eff6ff;
    }
    .itw-body {
      padding: 20px 24px;
      overflow-y: auto;
      flex: 1;
    }
    .itw-field {
      margin-bottom: 16px;
    }
    .itw-field label {
      display: block;
      font-size: 13px;
      font-weight: 500;
      color: #374151;
      margin-bottom: 6px;
    }
    .itw-field label .itw-req {
      color: #ef4444;
    }
    .itw-field input,
    .itw-field textarea,
    .itw-field select {
      width: 100%;
      padding: 10px 14px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 14px;
      font-family: inherit;
      transition: border-color 0.2s, box-shadow 0.2s;
      outline: none;
      background: #fff;
      color: #1f2937;
    }
    .itw-field input:focus,
    .itw-field textarea:focus,
    .itw-field select:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
    }
    .itw-field textarea {
      resize: vertical;
      min-height: 80px;
    }
    .itw-field input.itw-error,
    .itw-field textarea.itw-error,
    .itw-field select.itw-error {
      border-color: #ef4444;
    }
    .itw-error-msg {
      color: #ef4444;
      font-size: 12px;
      margin-top: 4px;
    }
    .itw-priority-group {
      display: flex;
      gap: 8px;
    }
    .itw-priority-btn {
      flex: 1;
      padding: 8px 4px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      background: #fff;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      text-align: center;
      transition: all 0.2s;
      color: #6b7280;
    }
    .itw-priority-btn:hover {
      border-color: #9ca3af;
    }
    .itw-priority-btn.itw-selected {
      border-width: 2px;
    }
    .itw-priority-btn[data-p="low"].itw-selected {
      border-color: #22c55e;
      background: #f0fdf4;
      color: #166534;
    }
    .itw-priority-btn[data-p="medium"].itw-selected {
      border-color: #f59e0b;
      background: #fffbeb;
      color: #92400e;
    }
    .itw-priority-btn[data-p="high"].itw-selected {
      border-color: #f97316;
      background: #fff7ed;
      color: #9a3412;
    }
    .itw-priority-btn[data-p="critical"].itw-selected {
      border-color: #ef4444;
      background: #fef2f2;
      color: #991b1b;
    }
    .itw-upload-area {
      border: 2px dashed #d1d5db;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
      background: #fafafa;
    }
    .itw-upload-area:hover {
      border-color: #3b82f6;
      background: #eff6ff;
    }
    .itw-upload-area svg {
      width: 32px;
      height: 32px;
      margin: 0 auto 8px;
      fill: #9ca3af;
    }
    .itw-upload-area p {
      font-size: 13px;
      color: #6b7280;
    }
    .itw-upload-area .itw-upload-hint {
      font-size: 11px;
      color: #9ca3af;
      margin-top: 4px;
    }
    .itw-previews {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 10px;
    }
    .itw-preview {
      position: relative;
      width: 72px;
      height: 72px;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #e5e7eb;
    }
    .itw-preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .itw-preview-remove {
      position: absolute;
      top: 2px;
      right: 2px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(0,0,0,0.6);
      color: #fff;
      border: none;
      cursor: pointer;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }
    .itw-submit {
      width: 100%;
      padding: 12px;
      background: linear-gradient(135deg, #1e40af, #3b82f6);
      color: #fff;
      border: none;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.2s, transform 0.1s;
      margin-top: 4px;
    }
    .itw-submit:hover {
      opacity: 0.92;
    }
    .itw-submit:active {
      transform: scale(0.98);
    }
    .itw-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .itw-spinner {
      display: inline-block;
      width: 18px;
      height: 18px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: itw-spin 0.6s linear infinite;
      vertical-align: middle;
      margin-right: 8px;
    }
    @keyframes itw-spin {
      to { transform: rotate(360deg); }
    }
    .itw-success {
      text-align: center;
      padding: 20px 0;
    }
    .itw-success-icon {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: #dcfce7;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
    }
    .itw-success-icon svg {
      width: 32px;
      height: 32px;
      fill: #16a34a;
    }
    .itw-success h4 {
      color: #166534;
      font-size: 18px;
      margin-bottom: 8px;
    }
    .itw-success .itw-ticket-num {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      padding: 12px 20px;
      border-radius: 8px;
      display: inline-block;
      margin: 12px 0;
    }
    .itw-success .itw-ticket-num span {
      font-size: 22px;
      font-weight: 700;
      color: #1e40af;
      letter-spacing: 1px;
    }
    .itw-success p {
      color: #6b7280;
      font-size: 14px;
      line-height: 1.5;
    }
    .itw-success .itw-resolution-info {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 12px 16px;
      border-radius: 8px;
      margin: 16px 0;
      font-size: 13px;
      color: #1e40af;
    }
    .itw-new-ticket {
      margin-top: 16px;
      padding: 10px 24px;
      background: #f3f4f6;
      color: #374151;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .itw-new-ticket:hover {
      background: #e5e7eb;
    }
    /* Track ticket tab */
    .itw-track-result {
      margin-top: 16px;
    }
    .itw-track-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 20px;
    }
    .itw-track-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #f1f5f9;
      font-size: 14px;
    }
    .itw-track-row:last-child {
      border-bottom: none;
    }
    .itw-track-label {
      color: #6b7280;
      font-weight: 500;
    }
    .itw-track-value {
      color: #1f2937;
      font-weight: 600;
    }
    .itw-status-badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .itw-status-open { background: #dbeafe; color: #1e40af; }
    .itw-status-in_progress { background: #fef3c7; color: #92400e; }
    .itw-status-resolved { background: #dcfce7; color: #166534; }
    .itw-status-closed { background: #f3f4f6; color: #6b7280; }
    .itw-working-hours {
      background: #fffbeb;
      border: 1px solid #fde68a;
      border-radius: 8px;
      padding: 10px 14px;
      margin-top: 12px;
      font-size: 12px;
      color: #92400e;
      line-height: 1.5;
    }
    @media (max-width: 480px) {
      .itw-panel {
        bottom: 0;
        right: 0;
        width: 100vw;
        max-width: 100vw;
        max-height: 100vh;
        border-radius: 16px 16px 0 0;
      }
      #insync-ticket-widget {
        bottom: 16px;
        right: 16px;
      }
    }
  `;
  document.head.appendChild(style);

  // Build widget HTML
  const widget = document.createElement("div");
  widget.id = "insync-ticket-widget";
  widget.innerHTML = `
    <button class="itw-fab" aria-label="Open support ticket">
      <span class="itw-fab-tooltip">Need Help?</span>
      <svg viewBox="0 0 24 24"><path d="M21 12.22C21 6.73 16.74 3 12 3c-4.69 0-9 3.73-9 9.22 0 3.23 1.78 6.15 4.56 7.93.27.17.44.47.44.8v1.55c0 .83.91 1.34 1.62.91l1.17-.71c.26-.16.57-.2.86-.13.77.18 1.58.28 2.35.28 4.74 0 9-3.73 9-9.63zM8 13a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2z"/></svg>
    </button>
    <div class="itw-panel">
      <div class="itw-header">
        <div>
          <h3>Support Ticket</h3>
          <div class="itw-header-sub">We typically respond within business hours</div>
        </div>
        <button class="itw-close" aria-label="Close">&times;</button>
      </div>
      <div class="itw-tabs">
        <button class="itw-tab itw-active" data-tab="submit">Submit Ticket</button>
        <button class="itw-tab" data-tab="track">Track Ticket</button>
      </div>
      <div class="itw-body">
        <!-- Submit Tab -->
        <div class="itw-tab-content" id="itw-tab-submit">
          <form id="itw-form">
            <div class="itw-field">
              <label>Full Name <span class="itw-req">*</span></label>
              <input type="text" id="itw-name" placeholder="Enter your full name" required>
            </div>
            <div class="itw-field">
              <label>Email <span class="itw-req">*</span></label>
              <input type="email" id="itw-email" placeholder="your@email.com" required>
            </div>
            <div class="itw-field">
              <label>Phone</label>
              <input type="tel" id="itw-phone" placeholder="+91 XXXXX XXXXX">
            </div>
            <div class="itw-field">
              <label>Subject <span class="itw-req">*</span></label>
              <input type="text" id="itw-subject" placeholder="Brief summary of your issue" required>
            </div>
            <div class="itw-field">
              <label>Description <span class="itw-req">*</span></label>
              <textarea id="itw-description" placeholder="Please describe your issue in detail..." rows="4" required></textarea>
            </div>
            <div class="itw-field">
              <label>Priority</label>
              <div class="itw-priority-group">
                <button type="button" class="itw-priority-btn" data-p="low">Low</button>
                <button type="button" class="itw-priority-btn itw-selected" data-p="medium">Medium</button>
                <button type="button" class="itw-priority-btn" data-p="high">High</button>
                <button type="button" class="itw-priority-btn" data-p="critical">Critical</button>
              </div>
            </div>
            <div class="itw-field">
              <label>Screenshots (optional)</label>
              <div class="itw-upload-area" id="itw-upload-area">
                <svg viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
                <p>Click or drag to upload screenshots</p>
                <div class="itw-upload-hint">Max ${MAX_FILES} files, up to 5MB each (PNG, JPG, GIF)</div>
              </div>
              <input type="file" id="itw-file-input" accept="image/*" multiple hidden>
              <div class="itw-previews" id="itw-previews"></div>
            </div>
            <button type="submit" class="itw-submit" id="itw-submit-btn">Submit Ticket</button>
          </form>
          <div class="itw-success" id="itw-success" style="display:none;"></div>
        </div>
        <!-- Track Tab -->
        <div class="itw-tab-content" id="itw-tab-track" style="display:none;">
          <div class="itw-field">
            <label>Ticket Number <span class="itw-req">*</span></label>
            <input type="text" id="itw-track-input" placeholder="e.g. TKT-20260309-0001">
          </div>
          <button class="itw-submit" id="itw-track-btn">Track Ticket</button>
          <div class="itw-track-result" id="itw-track-result"></div>
          <div class="itw-working-hours">
            <strong>Working Hours:</strong> Monday to Friday, 9:00 AM - 6:00 PM IST.<br>
            Resolution times are calculated based on business hours only.
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(widget);

  // State
  let isOpen = false;
  let selectedPriority = "medium";
  let uploadedFiles = [];

  // DOM refs
  const fab = widget.querySelector(".itw-fab");
  const panel = widget.querySelector(".itw-panel");
  const closeBtn = widget.querySelector(".itw-close");
  const tabs = widget.querySelectorAll(".itw-tab");
  const tabSubmit = document.getElementById("itw-tab-submit");
  const tabTrack = document.getElementById("itw-tab-track");
  const form = document.getElementById("itw-form");
  const successDiv = document.getElementById("itw-success");
  const submitBtn = document.getElementById("itw-submit-btn");
  const priorityBtns = widget.querySelectorAll(".itw-priority-btn");
  const uploadArea = document.getElementById("itw-upload-area");
  const fileInput = document.getElementById("itw-file-input");
  const previewsDiv = document.getElementById("itw-previews");
  const trackBtn = document.getElementById("itw-track-btn");
  const trackInput = document.getElementById("itw-track-input");
  const trackResult = document.getElementById("itw-track-result");

  // Toggle panel
  fab.addEventListener("click", function () {
    isOpen = !isOpen;
    panel.classList.toggle("itw-open", isOpen);
  });
  closeBtn.addEventListener("click", function () {
    isOpen = false;
    panel.classList.remove("itw-open");
  });

  // Tabs
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("itw-active"); });
      tab.classList.add("itw-active");
      var tabName = tab.getAttribute("data-tab");
      tabSubmit.style.display = tabName === "submit" ? "block" : "none";
      tabTrack.style.display = tabName === "track" ? "block" : "none";
    });
  });

  // Priority selection
  priorityBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      priorityBtns.forEach(function (b) { b.classList.remove("itw-selected"); });
      btn.classList.add("itw-selected");
      selectedPriority = btn.getAttribute("data-p");
    });
  });

  // File upload
  uploadArea.addEventListener("click", function () {
    fileInput.click();
  });

  uploadArea.addEventListener("dragover", function (e) {
    e.preventDefault();
    uploadArea.style.borderColor = "#3b82f6";
    uploadArea.style.background = "#eff6ff";
  });

  uploadArea.addEventListener("dragleave", function () {
    uploadArea.style.borderColor = "#d1d5db";
    uploadArea.style.background = "#fafafa";
  });

  uploadArea.addEventListener("drop", function (e) {
    e.preventDefault();
    uploadArea.style.borderColor = "#d1d5db";
    uploadArea.style.background = "#fafafa";
    handleFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener("change", function () {
    handleFiles(fileInput.files);
    fileInput.value = "";
  });

  function handleFiles(files) {
    Array.from(files).forEach(function (file) {
      if (uploadedFiles.length >= MAX_FILES) return;
      if (file.size > MAX_FILE_SIZE) {
        alert("File " + file.name + " exceeds 5MB limit.");
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed.");
        return;
      }
      uploadedFiles.push(file);
      renderPreviews();
    });
  }

  function renderPreviews() {
    previewsDiv.innerHTML = "";
    uploadedFiles.forEach(function (file, idx) {
      var wrapper = document.createElement("div");
      wrapper.className = "itw-preview";
      var img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.alt = file.name;
      var removeBtn = document.createElement("button");
      removeBtn.className = "itw-preview-remove";
      removeBtn.innerHTML = "&times;";
      removeBtn.type = "button";
      removeBtn.addEventListener("click", function () {
        uploadedFiles.splice(idx, 1);
        renderPreviews();
      });
      wrapper.appendChild(img);
      wrapper.appendChild(removeBtn);
      previewsDiv.appendChild(wrapper);
    });
  }

  function toBase64(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () { resolve(reader.result); };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Form submit
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    var name = document.getElementById("itw-name").value.trim();
    var email = document.getElementById("itw-email").value.trim();
    var phone = document.getElementById("itw-phone").value.trim();
    var subject = document.getElementById("itw-subject").value.trim();
    var description = document.getElementById("itw-description").value.trim();

    if (!name || !email || !subject || !description) {
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="itw-spinner"></span>Submitting...';

    try {
      // Convert screenshots to base64 for description embedding
      var screenshotInfo = "";
      if (uploadedFiles.length > 0) {
        screenshotInfo = "\n\n--- Attachments ---\n";
        for (var i = 0; i < uploadedFiles.length; i++) {
          var b64 = await toBase64(uploadedFiles[i]);
          screenshotInfo += "Screenshot " + (i + 1) + ": " + uploadedFiles[i].name + " (" + (uploadedFiles[i].size / 1024).toFixed(1) + "KB)\nData: " + b64 + "\n\n";
        }
      }

      var response = await fetch(SUPABASE_URL + "/functions/v1/submit-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": "Bearer " + SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone || undefined,
          subject: subject,
          description: description + screenshotInfo,
          priority: selectedPriority,
          source: SOURCE,
        }),
      });

      var result = await response.json();

      if (result.success) {
        form.style.display = "none";
        successDiv.style.display = "block";
        successDiv.innerHTML = '<div class="itw-success">' +
          '<div class="itw-success-icon"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg></div>' +
          '<h4>Ticket Created Successfully!</h4>' +
          '<div class="itw-ticket-num"><span>' + result.ticket_number + '</span></div>' +
          '<p>A confirmation email with your ticket details has been sent to <strong>' + email + '</strong></p>' +
          '<div class="itw-resolution-info">' +
          '<strong>Expected Resolution:</strong> ' + result.expected_resolution_formatted + '<br>' +
          'Working Hours: Mon-Fri, 9:00 AM - 6:00 PM IST' +
          '</div>' +
          '<p style="font-size:12px;color:#9ca3af;margin-top:8px;">Please include ticket number <strong>' + result.ticket_number + '</strong> in all communications.</p>' +
          '<button class="itw-new-ticket" id="itw-new-ticket">Submit Another Ticket</button>' +
          '</div>';

        document.getElementById("itw-new-ticket").addEventListener("click", function () {
          form.reset();
          form.style.display = "block";
          successDiv.style.display = "none";
          uploadedFiles = [];
          renderPreviews();
          selectedPriority = "medium";
          priorityBtns.forEach(function (b) {
            b.classList.toggle("itw-selected", b.getAttribute("data-p") === "medium");
          });
        });
      } else {
        alert("Error: " + (result.error || "Failed to create ticket. Please try again."));
      }
    } catch (err) {
      alert("Network error. Please check your connection and try again.");
      console.error("Ticket widget error:", err);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Submit Ticket";
    }
  });

  // Track ticket
  trackBtn.addEventListener("click", async function () {
    var ticketNum = trackInput.value.trim().toUpperCase();
    if (!ticketNum) {
      trackResult.innerHTML = '<p class="itw-error-msg">Please enter a ticket number</p>';
      return;
    }

    trackBtn.disabled = true;
    trackBtn.innerHTML = '<span class="itw-spinner"></span>Searching...';

    try {
      var response = await fetch(
        SUPABASE_URL + "/rest/v1/support_tickets?ticket_number=eq." + encodeURIComponent(ticketNum) + "&select=*",
        {
          headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": "Bearer " + SUPABASE_ANON_KEY,
          },
        }
      );

      var tickets = await response.json();

      if (tickets && tickets.length > 0) {
        var t = tickets[0];
        var statusClass = "itw-status-" + t.status;
        var statusLabel = t.status.replace("_", " ").toUpperCase();
        var createdDate = new Date(t.created_at).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "medium",
          timeStyle: "short",
        });
        var resolvedInfo = "";
        if (t.resolved_at) {
          var resolvedDate = new Date(t.resolved_at).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "medium",
            timeStyle: "short",
          });
          resolvedInfo = '<div class="itw-track-row"><span class="itw-track-label">Resolved At</span><span class="itw-track-value">' + resolvedDate + '</span></div>';
          if (t.resolution_working_hours) {
            resolvedInfo += '<div class="itw-track-row"><span class="itw-track-label">Resolution Time</span><span class="itw-track-value">' + t.resolution_working_hours + ' working hours</span></div>';
          }
        }

        trackResult.innerHTML = '<div class="itw-track-card">' +
          '<div class="itw-track-row"><span class="itw-track-label">Ticket</span><span class="itw-track-value">' + t.ticket_number + '</span></div>' +
          '<div class="itw-track-row"><span class="itw-track-label">Subject</span><span class="itw-track-value">' + t.subject + '</span></div>' +
          '<div class="itw-track-row"><span class="itw-track-label">Status</span><span class="itw-status-badge ' + statusClass + '">' + statusLabel + '</span></div>' +
          '<div class="itw-track-row"><span class="itw-track-label">Priority</span><span class="itw-track-value" style="text-transform:capitalize;">' + t.priority + '</span></div>' +
          '<div class="itw-track-row"><span class="itw-track-label">Created</span><span class="itw-track-value">' + createdDate + '</span></div>' +
          resolvedInfo +
          '</div>';
      } else {
        trackResult.innerHTML = '<p class="itw-error-msg" style="text-align:center;padding:20px;">No ticket found with number <strong>' + ticketNum + '</strong></p>';
      }
    } catch (err) {
      trackResult.innerHTML = '<p class="itw-error-msg">Failed to fetch ticket. Please try again.</p>';
      console.error("Track ticket error:", err);
    } finally {
      trackBtn.disabled = false;
      trackBtn.innerHTML = "Track Ticket";
    }
  });

  // Allow Enter key to track
  trackInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      trackBtn.click();
    }
  });
})();
