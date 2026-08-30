(function () {
  "use strict";

  const cfg = window.PPM_PAID_RECEIPT_EMAILJS || {};
  const EMAILJS_SDK_URL = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";

  const BRAND = {
    companyName: "Property Management Group",
    logoUrl: "https://property-management.group/image/logo.png",
    contactEmail: "support@property-management.group",
    siteUrl: "https://property-management.group"
  };

  let emailJsInitPromise = null;

  function isConfigured() {
    return Boolean(cfg.publicKey && cfg.serviceId && cfg.templateId);
  }

  function buildReceiptUrl(accessToken) {
    const params = new URLSearchParams();
    params.set("token", String(accessToken || "").trim());
    return `${BRAND.siteUrl}/receipt.html?${params.toString()}`;
  }

  function loadEmailJsSdk() {
    if (window.emailjs) {
      return Promise.resolve(window.emailjs);
    }

    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${EMAILJS_SDK_URL}"]`);
      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(window.emailjs), { once: true });
        existingScript.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = EMAILJS_SDK_URL;
      script.async = true;
      script.onload = () => resolve(window.emailjs);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async function prepareEmailJs() {
    if (!isConfigured()) {
      throw new Error("Paid receipt EmailJS is not configured.");
    }

    if (!emailJsInitPromise) {
      emailJsInitPromise = loadEmailJsSdk().then((emailjs) => {
        emailjs.init({ publicKey: cfg.publicKey });
        return emailjs;
      });
    }

    return emailJsInitPromise;
  }

  async function sendPaidReceiptEmail(confirmResult) {
    if (!confirmResult || confirmResult.replay) {
      return { skipped: true, reason: "replay" };
    }

    const applicantEmail = String(confirmResult.applicant_email || "").trim();
    if (!applicantEmail) {
      throw new Error("Applicant email is missing on this proof.");
    }

    const receiptUrl = buildReceiptUrl(confirmResult.access_token);
    const emailjs = await prepareEmailJs();

    const templateParams = {
      applicant_email: applicantEmail,
      to_email: applicantEmail,
      applicant_name: confirmResult.applicant_name || "Applicant",
      application_id: confirmResult.application_id || "",
      receipt_number: confirmResult.receipt_number || "",
      property_address: confirmResult.property_address || "",
      receipt_url: receiptUrl,
      amount_display: confirmResult.amount_display || "",
      company_name: BRAND.companyName,
      logo_url: BRAND.logoUrl,
      contact_email: BRAND.contactEmail,
      subject: `Payment confirmed – ${confirmResult.application_id || "Application"}`
    };

    const result = await emailjs.send(cfg.serviceId, cfg.templateId, templateParams);

    return {
      skipped: false,
      receiptUrl,
      result
    };
  }

  window.PPM_PAID_RECEIPT_EMAIL = {
    isConfigured,
    buildReceiptUrl,
    sendPaidReceiptEmail
  };
})();
