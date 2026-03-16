/**
 * In-Sync Help Widget
 * Embeddable help/support widget with FAQ, contact info, and quick links.
 * <script src="/help-widget.js" data-source="PLATFORM" data-color="#8b5cf6" data-position="right" data-company="in-sync-website"></script>
 */
(function () {
  "use strict";

  var scriptTag = document.currentScript;
  var COLOR = (scriptTag && scriptTag.getAttribute("data-color")) || "#8b5cf6";
  var POSITION = (scriptTag && scriptTag.getAttribute("data-position")) || "right";
  var COMPANY = (scriptTag && scriptTag.getAttribute("data-company")) || "In-Sync";
  var SOURCE = (scriptTag && scriptTag.getAttribute("data-source")) || "website";

  var style = document.createElement("style");
  style.textContent = `
    #insync-help-widget *,
    #insync-help-widget *::before,
    #insync-help-widget *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    #insync-help-widget {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      position: fixed;
      bottom: 24px;
      ${POSITION}: 24px;
      z-index: 999998;
    }
    .ihw-fab {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: ${COLOR};
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4);
      transition: transform 0.2s, box-shadow 0.2s;
      position: relative;
    }
    .ihw-fab:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 28px rgba(139, 92, 246, 0.5);
    }
    .ihw-fab svg {
      width: 26px;
      height: 26px;
      fill: white;
    }
    .ihw-fab .ihw-fab-close {
      display: none;
    }
    .ihw-fab.ihw-active .ihw-fab-open {
      display: none;
    }
    .ihw-fab.ihw-active .ihw-fab-close {
      display: block;
    }
    .ihw-fab-tooltip {
      position: absolute;
      ${POSITION === "right" ? "right: 66px" : "left: 66px"};
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
    .ihw-fab:hover .ihw-fab-tooltip {
      opacity: 1;
    }
    .ihw-panel {
      display: none;
      position: fixed;
      bottom: 92px;
      ${POSITION}: 24px;
      width: 380px;
      max-width: calc(100vw - 32px);
      max-height: calc(100vh - 120px);
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 10px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05);
      overflow: hidden;
      flex-direction: column;
      animation: ihw-slideUp 0.3s ease;
    }
    .ihw-panel.ihw-open {
      display: flex;
    }
    @keyframes ihw-slideUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .ihw-header {
      background: ${COLOR};
      padding: 24px;
    }
    .ihw-header h3 {
      color: #fff;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .ihw-header p {
      color: rgba(255,255,255,0.85);
      font-size: 13px;
    }
    .ihw-body {
      padding: 16px;
      overflow-y: auto;
      flex: 1;
    }
    .ihw-search {
      width: 100%;
      padding: 10px 14px 10px 38px;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      font-size: 14px;
      outline: none;
      background: #f9fafb;
      font-family: inherit;
      transition: border-color 0.2s, box-shadow 0.2s;
      margin-bottom: 16px;
    }
    .ihw-search:focus {
      border-color: ${COLOR};
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
      background: #fff;
    }
    .ihw-search-wrap {
      position: relative;
    }
    .ihw-search-wrap svg {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      fill: #9ca3af;
      margin-bottom: 16px;
    }
    .ihw-section-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #9ca3af;
      margin-bottom: 10px;
    }
    .ihw-links {
      list-style: none;
      margin-bottom: 20px;
    }
    .ihw-links li {
      margin-bottom: 4px;
    }
    .ihw-links a {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 10px;
      text-decoration: none;
      color: #374151;
      font-size: 14px;
      font-weight: 500;
      transition: background 0.15s;
    }
    .ihw-links a:hover {
      background: #f3f4f6;
    }
    .ihw-links a svg {
      width: 20px;
      height: 20px;
      fill: ${COLOR};
      flex-shrink: 0;
    }
    .ihw-links a .ihw-link-desc {
      font-size: 12px;
      color: #9ca3af;
      font-weight: 400;
    }
    .ihw-faq {
      margin-bottom: 20px;
    }
    .ihw-faq-item {
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      margin-bottom: 8px;
      overflow: hidden;
    }
    .ihw-faq-q {
      width: 100%;
      padding: 12px 14px;
      background: #fff;
      border: none;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      color: #374151;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: inherit;
      transition: background 0.15s;
    }
    .ihw-faq-q:hover {
      background: #f9fafb;
    }
    .ihw-faq-q svg {
      width: 16px;
      height: 16px;
      fill: #9ca3af;
      transition: transform 0.2s;
      flex-shrink: 0;
    }
    .ihw-faq-q.ihw-expanded svg {
      transform: rotate(180deg);
    }
    .ihw-faq-a {
      display: none;
      padding: 0 14px 14px;
      font-size: 13px;
      color: #6b7280;
      line-height: 1.6;
    }
    .ihw-faq-a.ihw-show {
      display: block;
    }
    .ihw-contact-card {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 16px;
    }
    .ihw-contact-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 0;
      font-size: 13px;
      color: #374151;
    }
    .ihw-contact-row svg {
      width: 18px;
      height: 18px;
      fill: ${COLOR};
      flex-shrink: 0;
    }
    .ihw-contact-row a {
      color: ${COLOR};
      text-decoration: none;
      font-weight: 500;
    }
    .ihw-contact-row a:hover {
      text-decoration: underline;
    }
    .ihw-footer {
      padding: 12px 16px;
      border-top: 1px solid #f3f4f6;
      text-align: center;
      font-size: 11px;
      color: #9ca3af;
    }
    .ihw-footer a {
      color: ${COLOR};
      text-decoration: none;
      font-weight: 600;
    }
    @media (max-width: 480px) {
      .ihw-panel {
        bottom: 0;
        ${POSITION}: 0;
        width: 100vw;
        max-width: 100vw;
        max-height: 85vh;
        border-radius: 16px 16px 0 0;
      }
      #insync-help-widget {
        bottom: 16px;
        ${POSITION}: 16px;
      }
    }
  `;
  document.head.appendChild(style);

  var widget = document.createElement("div");
  widget.id = "insync-help-widget";
  widget.innerHTML = `
    <button class="ihw-fab" aria-label="Help">
      <span class="ihw-fab-tooltip">Help & Support</span>
      <svg class="ihw-fab-open" viewBox="0 0 24 24"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>
      <svg class="ihw-fab-close" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
    </button>
    <div class="ihw-panel">
      <div class="ihw-header">
        <h3>Hi there! How can we help?</h3>
        <p>Search our help resources or get in touch</p>
      </div>
      <div class="ihw-body">
        <div class="ihw-search-wrap">
          <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          <input type="text" class="ihw-search" placeholder="Search for help..." id="ihw-search">
        </div>

        <div class="ihw-section-title">Quick Links</div>
        <ul class="ihw-links" id="ihw-links">
          <li>
            <a href="https://in-sync-crm.com/#features" target="_blank">
              <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              <div>
                <div>Features</div>
                <div class="ihw-link-desc">Explore all CRM features</div>
              </div>
            </a>
          </li>
          <li>
            <a href="https://in-sync-crm.com/#pricing" target="_blank">
              <svg viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
              <div>
                <div>Pricing</div>
                <div class="ihw-link-desc">View plans & pricing</div>
              </div>
            </a>
          </li>
          <li>
            <a href="https://in-sync-crm.com/blog" target="_blank">
              <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
              <div>
                <div>Blog & Resources</div>
                <div class="ihw-link-desc">Tips, guides & updates</div>
              </div>
            </a>
          </li>
          <li>
            <a href="https://in-sync-crm.com/#faq" target="_blank">
              <svg viewBox="0 0 24 24"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>
              <div>
                <div>FAQ</div>
                <div class="ihw-link-desc">Frequently asked questions</div>
              </div>
            </a>
          </li>
        </ul>

        <div class="ihw-section-title">Common Questions</div>
        <div class="ihw-faq" id="ihw-faq">
          <div class="ihw-faq-item">
            <button class="ihw-faq-q">
              <span>How do I get started with In-Sync?</span>
              <svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
            </button>
            <div class="ihw-faq-a">Sign up for a free account at in-sync-crm.com. Our free-forever plan includes core CRM features. You can upgrade anytime as your business grows.</div>
          </div>
          <div class="ihw-faq-item">
            <button class="ihw-faq-q">
              <span>Does In-Sync integrate with WhatsApp?</span>
              <svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
            </button>
            <div class="ihw-faq-a">Yes! In-Sync offers full WhatsApp Business API integration. You can send messages, automate responses, and manage conversations directly from the CRM.</div>
          </div>
          <div class="ihw-faq-item">
            <button class="ihw-faq-q">
              <span>What are the working hours for support?</span>
              <svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
            </button>
            <div class="ihw-faq-a">Our support team is available Monday to Friday, 9:00 AM to 6:00 PM IST. You can submit a support ticket anytime and we'll respond during business hours.</div>
          </div>
          <div class="ihw-faq-item">
            <button class="ihw-faq-q">
              <span>Is my data secure with In-Sync?</span>
              <svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
            </button>
            <div class="ihw-faq-a">Absolutely. We use enterprise-grade encryption, secure cloud infrastructure powered by Supabase, and follow industry best practices to keep your data safe.</div>
          </div>
        </div>

        <div class="ihw-section-title">Contact Us</div>
        <div class="ihw-contact-card">
          <div class="ihw-contact-row">
            <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            <a href="mailto:delight@in-sync.co.in">delight@in-sync.co.in</a>
          </div>
          <div class="ihw-contact-row">
            <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            <span>India</span>
          </div>
          <div class="ihw-contact-row">
            <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
            <span>Mon-Fri, 9:00 AM - 6:00 PM IST</span>
          </div>
        </div>
      </div>
      <div class="ihw-footer">
        Powered by <a href="https://in-sync-crm.com" target="_blank">In-Sync CRM</a>
      </div>
    </div>
  `;
  document.body.appendChild(widget);

  // State & DOM
  var isOpen = false;
  var fab = widget.querySelector(".ihw-fab");
  var panel = widget.querySelector(".ihw-panel");
  var searchInput = document.getElementById("ihw-search");
  var faqItems = widget.querySelectorAll(".ihw-faq-q");
  var linkItems = widget.querySelectorAll("#ihw-links li");
  var faqContainers = widget.querySelectorAll(".ihw-faq-item");

  // Toggle
  fab.addEventListener("click", function () {
    isOpen = !isOpen;
    panel.classList.toggle("ihw-open", isOpen);
    fab.classList.toggle("ihw-active", isOpen);
  });

  // FAQ accordion
  faqItems.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var answer = btn.nextElementSibling;
      var wasOpen = answer.classList.contains("ihw-show");
      // Close all
      widget.querySelectorAll(".ihw-faq-a").forEach(function (a) { a.classList.remove("ihw-show"); });
      widget.querySelectorAll(".ihw-faq-q").forEach(function (q) { q.classList.remove("ihw-expanded"); });
      if (!wasOpen) {
        answer.classList.add("ihw-show");
        btn.classList.add("ihw-expanded");
      }
    });
  });

  // Search filter
  searchInput.addEventListener("input", function () {
    var query = searchInput.value.toLowerCase().trim();
    // Filter FAQ
    faqContainers.forEach(function (item) {
      var text = item.textContent.toLowerCase();
      item.style.display = query && !text.includes(query) ? "none" : "block";
    });
    // Filter links
    linkItems.forEach(function (item) {
      var text = item.textContent.toLowerCase();
      item.style.display = query && !text.includes(query) ? "none" : "list-item";
    });
  });
})();
