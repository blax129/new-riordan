(function () {
  "use strict";

  const TESSERACT_SRC = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
  let tesseractLoadPromise = null;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        if (existing.dataset.loaded === "true") {
          resolve();
          return;
        }
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => {
        script.dataset.loaded = "true";
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function loadTesseract() {
    if (window.Tesseract) {
      return Promise.resolve(window.Tesseract);
    }
    if (!tesseractLoadPromise) {
      tesseractLoadPromise = loadScript(TESSERACT_SRC).then(() => window.Tesseract);
    }
    return tesseractLoadPromise;
  }

  function parseDollarToken(raw) {
    const normalized = String(raw || "").replace(/,/g, "").trim();
    const value = Number.parseFloat(normalized);
    if (!Number.isFinite(value) || value <= 0 || value > 50000) {
      return null;
    }
    return Math.round(value * 100);
  }

  function extractAmountCentsFromText(text) {
    const amounts = [];
    const seen = new Set();
    const source = String(text || "");

    const patterns = [
      /\$\s*(\d{1,5}(?:,\d{3})*(?:\.\d{2})?)/g,
      /(?:USD|usd)\s*(\d{1,5}(?:,\d{3})*(?:\.\d{2})?)/g,
      /(?:amount|sent|paid|payment|total)[:\s]*\$?\s*(\d{1,5}(?:,\d{3})*(?:\.\d{2})?)/gi
    ];

    patterns.forEach((pattern) => {
      let match = pattern.exec(source);
      while (match) {
        const cents = parseDollarToken(match[1]);
        if (cents !== null && !seen.has(cents)) {
          seen.add(cents);
          amounts.push(cents);
        }
        match = pattern.exec(source);
      }
    });

    return amounts;
  }

  /**
   * Pick one payment amount from OCR hits.
   * Never sums duplicate lines (e.g. two $85 Chime history rows → $85, not $170).
   */
  function selectPaymentAmountCents(amounts) {
    if (!Array.isArray(amounts) || amounts.length === 0) {
      return null;
    }

    if (amounts.length === 1) {
      return amounts[0];
    }

    const unique = [...new Set(amounts)];
    if (unique.length === 1) {
      return unique[0];
    }

    return amounts[0];
  }

  async function detectPaymentAmountFromImage(file, options) {
    const opts = options || {};
    const onProgress = typeof opts.onProgress === "function" ? opts.onProgress : null;

    try {
      if (onProgress) {
        onProgress("Loading scanner…");
      }

      const Tesseract = await loadTesseract();
      if (onProgress) {
        onProgress("Reading screenshot…");
      }

      const result = await Tesseract.recognize(file, "eng", {
        logger: (message) => {
          if (!onProgress || !message) {
            return;
          }
          if (message.status === "recognizing text" && message.progress) {
            const pct = Math.round(message.progress * 100);
            onProgress(`Reading screenshot… ${pct}%`);
          }
        }
      });

      const rawAmounts = extractAmountsFromText(result?.data?.text || "");
      const amountCents = selectPaymentAmountCents(rawAmounts);

      return {
        amountCents,
        rawAmounts,
        source: amountCents ? "ocr" : "unknown",
        textPreview: String(result?.data?.text || "").slice(0, 500)
      };
    } catch (error) {
      console.warn("[PaymentAmountScanner] OCR failed:", error);
      return {
        amountCents: null,
        rawAmounts: [],
        source: "unknown",
        error: error?.message || String(error)
      };
    }
  }

  window.PPM_PAYMENT_AMOUNT_SCANNER = {
    extractAmountCentsFromText,
    selectPaymentAmountCents,
    detectPaymentAmountFromImage
  };
})();
