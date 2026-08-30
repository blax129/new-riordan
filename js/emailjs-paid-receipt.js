(function () {
  "use strict";

  const cfg = window.PPM_PAID_RECEIPT_EMAILJS || {};
  const EMAILJS_SDK_URL = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
  const DEFAULT_SITE_URL = "https://privatepromanagement.com";

  const BRAND = {
    companyName: "Property Management Group",
    contactEmail: "privatepropertyg@gmail.com"
  };

  let emailJsInitPromise = null;

  function isConfigured() {
    return Boolean(cfg.publicKey && cfg.serviceId && cfg.templateId);
  }

  function getSiteUrl() {
    const configured = String(cfg.siteUrl || "").trim();
    if (configured) {
      return configured.replace(/\/+$/, "");
    }
    if (typeof window !== "undefined" && window.location?.origin) {
      return window.location.origin.replace(/\/+$/, "");
    }
    return DEFAULT_SITE_URL;
  }

  function getLogoUrl() {
    return `${getSiteUrl()}/image/logo.png`;
  }

  function buildReceiptUrl(accessToken) {
    const params = new URLSearchParams();
    params.set("token", String(accessToken || "").trim());
    return `${getSiteUrl()}/receipt.html?${params.toString()}`;
  }

  function formatAmountDisplay(confirmResult) {
    const existing = String(confirmResult?.amount_display || "").trim();
    if (existing) {
      return existing;
    }

    const cents = confirmResult?.amount_cents;
    if (cents !== null && cents !== undefined && Number.isFinite(Number(cents))) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(Number(cents) / 100);
    }

    return "See receipt for details";
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
    const amountDisplay = formatAmountDisplay(confirmResult);
    const emailjs = await prepareEmailJs();

    const templateParams = {
      applicant_email: applicantEmail,
      to_email: applicantEmail,
      applicant_name: confirmResult.applicant_name || "Applicant",
      application_id: confirmResult.application_id || "",
      receipt_number: confirmResult.receipt_number || "",
      property_address: confirmResult.property_address || "",
      receipt_url: receiptUrl,
      amount_display: amountDisplay,
      company_name: BRAND.companyName,
      logo_url: getLogoUrl(),
      contact_email: BRAND.contactEmail,
      subject: `Payment confirmed – ${confirmResult.application_id || "Application"}`
    };

    const result = await emailjs.send(cfg.serviceId, cfg.templateId, templateParams);

    return {
      skipped: false,
      receiptUrl,
      amountDisplay,
      result
    };
  }

  window.PPM_PAID_RECEIPT_EMAIL = {
    isConfigured,
    getSiteUrl,
    buildReceiptUrl,
    formatAmountDisplay,
    sendPaidReceiptEmail
  };
})();
