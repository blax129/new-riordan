(function () {
  "use strict";

  const cfg = window.PPM_SUPABASE_CONFIG || {};

  function baseUrl() {
    return String(cfg.url || "").replace(/\/+$/, "");
  }

  function isConfigured() {
    return Boolean(baseUrl() && cfg.anonKey);
  }

  async function rpc(functionName, params) {
    if (!isConfigured()) {
      throw new Error("Supabase is not configured.");
    }

    const response = await fetch(`${baseUrl()}/rest/v1/rpc/${functionName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: cfg.anonKey,
        Authorization: `Bearer ${cfg.anonKey}`
      },
      body: JSON.stringify(params || {})
    });

    let body = null;
    const text = await response.text();
    if (text) {
      try {
        body = JSON.parse(text);
      } catch (error) {
        body = text;
      }
    }

    if (!response.ok) {
      const message =
        (body && typeof body === "object" && (body.message || body.error || body.hint)) ||
        (typeof body === "string" ? body : "") ||
        `RPC ${functionName} failed (${response.status})`;
      throw new Error(message);
    }

    return body;
  }

  function collectFormPayload(form) {
    const payload = {};
    const skip = new Set(["_subject", "_replyto", "_gotcha"]);

    new FormData(form).forEach((value, key) => {
      if (skip.has(key)) {
        return;
      }
      if (value instanceof File) {
        return;
      }
      payload[key] = String(value);
    });

    return payload;
  }

  async function submitApplicationFromForm(form, applicationId, selectedLanguage) {
    const formData = new FormData(form);

    return rpc("submit_application", {
      p_application_id: applicationId,
      p_applicant_name: String(formData.get("name") || "").trim(),
      p_applicant_email: String(formData.get("email") || "").trim(),
      p_applicant_phone: String(formData.get("phone") || "").trim() || null,
      p_property_address: String(formData.get("property") || "").trim() || null,
      p_selected_language: selectedLanguage || "en",
      p_form_payload: collectFormPayload(form)
    });
  }

  async function getApplicationByToken(token) {
    return rpc("get_application_by_token", {
      p_token: String(token || "").trim()
    });
  }

  async function submitPaymentProof(payload) {
    return rpc("submit_payment_proof", {
      p_token: String(payload.token || "").trim(),
      p_screenshot_url: String(payload.screenshotUrl || "").trim(),
      p_cloudinary_public_id: payload.publicId || null,
      p_amount_cents: payload.amountCents ?? null,
      p_amount_detected_cents: payload.amountDetectedCents ?? payload.amountCents ?? null,
      p_amount_source: payload.amountSource || "unknown",
      p_ocr_detected_amounts: payload.ocrDetectedAmounts || []
    });
  }

  async function getReceiptByToken(token) {
    return rpc("get_receipt_by_token", {
      p_token: String(token || "").trim()
    });
  }

  async function getPublicReceiptStatus(receiptNumber) {
    return rpc("get_public_receipt_status", {
      p_receipt_number: String(receiptNumber || "").trim()
    });
  }

  async function ownerListProofs(password) {
    return rpc("owner_list_proofs", {
      p_password: String(password || "")
    });
  }

  async function ownerConfirmProof(password, proofId, amountCents) {
    return rpc("owner_confirm_proof", {
      p_password: String(password || ""),
      p_proof_id: proofId,
      p_amount_cents: amountCents ?? null
    });
  }

  async function ownerRejectProof(password, proofId) {
    return rpc("owner_reject_proof", {
      p_password: String(password || ""),
      p_proof_id: proofId
    });
  }

  window.PPM_SUPABASE = {
    isConfigured,
    rpc,
    collectFormPayload,
    submitApplicationFromForm,
    getApplicationByToken,
    submitPaymentProof,
    getReceiptByToken,
    getPublicReceiptStatus,
    ownerListProofs,
    ownerConfirmProof,
    ownerRejectProof
  };
})();
