(() => {
  const STYLE_ID = "dtm-typography-fix";

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .dtm-question-text {
        min-width: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        white-space: normal !important;
        overflow-wrap: anywhere !important;
        word-break: normal !important;
        line-height: 1.65 !important;
        font-style: normal !important;
      }
      .dtm-question-text mjx-container {
        max-width: 100% !important;
      }
      .dtm-option > span:last-child {
        min-width: 0 !important;
        max-width: 100% !important;
        white-space: normal !important;
        overflow-wrap: anywhere !important;
      }
      .dtm-option mjx-container {
        max-width: 100% !important;
      }
    `;
    document.head.appendChild(style);
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function toLatex(value) {
    return String(value ?? "")
      .replaceAll("−", "-")
      .replaceAll("×", "\\times ")
      .replaceAll("·", "\\cdot ")
      .replaceAll("÷", "\\div ")
      .replaceAll("≤", "\\le ")
      .replaceAll("≥", "\\ge ")
      .replaceAll("≠", "\\ne ")
      .replaceAll("≈", "\\approx ")
      .replaceAll("∞", "\\infty ")
      .replaceAll("π", "\\pi ")
      .replaceAll("tg", "\\tan ")
      .replaceAll("ctg", "\\cot ")
      .replaceAll("sin", "\\sin ")
      .replaceAll("cos", "\\cos ")
      .replaceAll("log", "\\log ")
      .replaceAll("ln", "\\ln ")
      .replaceAll("⁰", "^0")
      .replaceAll("¹", "^1")
      .replaceAll("²", "^2")
      .replaceAll("³", "^3")
      .replaceAll("⁴", "^4")
      .replaceAll("⁵", "^5")
      .replaceAll("⁶", "^6")
      .replaceAll("⁷", "^7")
      .replaceAll("⁸", "^8")
      .replaceAll("⁹", "^9");
  }

  function isMathToken(token) {
    const clean = token.replace(/[.,!?;:]$/g, "");
    if (!clean) return false;
    if (/[=≤≥≠≈√∛∜^²³⁴⁵⁶⁷⁸⁹|()[\]{}\/·×÷∞π]/.test(clean)) return true;
    if (/^[A-Za-zα-ωΑ-Ω][₀₁₂₃₄₅₆₇₈₉]*$/.test(clean)) return true;
    if (/^(sin|cos|tg|ctg|log|ln)\b/i.test(clean)) return true;
    if (/^\d+[⁰¹²³⁴⁵⁶⁷⁸⁹]$/.test(clean)) return true;
    return false;
  }

  function smartMath(value) {
    const raw = String(value ?? "");
    if (!raw) return "";

    if (raw.includes("\\(") || raw.includes("\\[") || raw.includes("$$")) {
      return escapeHtml(raw);
    }

    const tokens = raw.split(/(\s+)/);
    const out = [];
    let mathBuffer = [];

    const flushMath = () => {
      if (!mathBuffer.length) return;
      const math = mathBuffer.join("").trim();
      if (math) out.push(`\\(${escapeHtml(toLatex(math))}\\)`);
      mathBuffer = [];
    };

    for (const token of tokens) {
      if (/^\s+$/.test(token)) {
        if (mathBuffer.length) mathBuffer.push(token);
        else out.push(token);
        continue;
      }

      if (isMathToken(token)) {
        mathBuffer.push(token);
      } else {
        flushMath();
        out.push(escapeHtml(token));
      }
    }
    flushMath();

    return out.join("");
  }

  function applyFix() {
    installStyles();

    const params = new URLSearchParams(location.search);
    const variant = params.get("variant") || "variant-7";
    const questions = window.DTM_QUESTIONS?.[variant];
    if (!Array.isArray(questions)) return false;

    let changed = false;

    questions.forEach((q, index) => {
      const card = document.getElementById(`dtm-question-${index}`);
      if (!card) return;

      const text = card.querySelector(".dtm-question-text");
      if (text && text.dataset.dtmSmartMath !== "1") {
        text.innerHTML = smartMath(q.text);
        text.dataset.dtmSmartMath = "1";
        changed = true;
      }

      const optionSpans = card.querySelectorAll(".dtm-option > span:last-child");
      const keys = ["A", "B", "C", "D"];
      optionSpans.forEach((span, optionIndex) => {
        if (span.dataset.dtmSmartMath === "1") return;
        const key = keys[optionIndex];
        if (q.options && q.options[key] !== undefined) {
          span.innerHTML = smartMath(q.options[key]);
          span.dataset.dtmSmartMath = "1";
          changed = true;
        }
      });
    });

    if (changed && window.MathJax?.typesetPromise) {
      MathJax.typesetPromise([document.getElementById("dtmTest")]).catch(console.error);
    }

    return changed;
  }

  const observer = new MutationObserver(() => {
    if (window.DTM_QUESTIONS) applyFix();
  });

  function start() {
    installStyles();
    const root = document.getElementById("dtmTest");
    if (!root) return;
    observer.observe(root, { childList: true, subtree: true });
    applyFix();
    setTimeout(applyFix, 150);
    setTimeout(applyFix, 500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
