(() => {
    const root = document.getElementById("dtmTest");
    const params = new URLSearchParams(window.location.search);
    const variant = params.get("variant") || "variant-7";
    const questions = window.DTM_QUESTIONS?.[variant] || [];

    if (!questions.length) {
        root.innerHTML = '<div class="dtm-result"><h2>Тест не найден</h2><p>Вернись к списку DTM и выбери тест.</p><a class="dtm-link" href="DTM.html">К тестам DTM</a></div>';
        return;
    }

    const user = (() => {
        try { return JSON.parse(localStorage.getItem("netija_user") || "null"); }
        catch { return null; }
    })();
    const userKey = user?.sub || user?.email || user?.id || "guest";
    const progressKey = `netija_dtm_answers_${userKey}_${variant}`;
    const resultKey = `netija_dtm_best_${userKey}_${variant}`;

    function readJSON(key, fallback) {
        try { return JSON.parse(localStorage.getItem(key) || "null") ?? fallback; }
        catch { return fallback; }
    }

    const savedAnswers = readJSON(progressKey, {});
    const answers = Array(questions.length).fill(null);
    Object.entries(savedAnswers).forEach(([index, answer]) => {
        const i = Number(index);
        if (Number.isInteger(i) && i >= 0 && i < answers.length) answers[i] = answer;
    });

    let finished = false;
    let allowLeave = false;

    function saveAnswers() {
        const data = {};
        answers.forEach((answer, index) => { if (answer) data[index] = answer; });
        localStorage.setItem(progressKey, JSON.stringify(data));
    }

    function saveResult() {
        const score = questions.reduce((total, q, index) => total + (q.correct && answers[index] === q.correct ? 1 : 0), 0);
        const answered = answers.filter(Boolean).length;
        const result = { score, total: questions.length, answered, date: Date.now() };
        const previous = readJSON(resultKey, null);
        if (!previous || score > Number(previous.score || 0)) localStorage.setItem(resultKey, JSON.stringify(result));
        return result;
    }

    const titleMap = {
        "variant-7": "ДТМ тест 1", "variant-8": "ДТМ тест 2", "variant-9": "ДТМ тест 3",
        "variant-10": "ДТМ тест 4", "variant-12": "ДТМ тест 5", "variant-1982496": "ДТМ тест 6", "variant-2024": "ДТМ тест 7",
        "me-1": "Test 1", "me-2": "Test 2", "me-3": "Test 3", "me-4": "Test 4", "me-5": "Test 5", "me-6": "Test 6", "me-7": "Test 7", "me-8": "Test 8"
    };

    function render() {
        allowLeave = false;
        root.innerHTML = `
            <div class="dtm-exam-head">
                <div>
                    <div class="dtm-exam-kicker">NETIJA • DTM</div>
                    <h1 class="dtm-test-title">${titleMap[variant] || "ДТМ тест"}</h1>
                    <p class="dtm-exam-subtitle">Все вопросы открыты. Отвечай в любом порядке.</p>
                </div>
                <div class="dtm-exam-progress"><strong id="answeredCount">${answers.filter(Boolean).length}</strong> / ${questions.length}<span>отвечено</span></div>
            </div>
            <div class="dtm-exam-layout">
                <div class="dtm-question-list" id="questionList">
                    ${questions.map((q, i) => renderQuestion(q, i)).join("")}
                </div>
                <aside class="dtm-sidebar">
                    <div class="dtm-sidebar-card">
                        <div class="dtm-sidebar-title">Вопросы</div>
                        <div class="dtm-legend"><span><i class="answered"></i> Ответ дан</span><span><i class="current"></i> Текущий вопрос</span><span><i class="unanswered"></i> Ответ не дан</span></div>
                        <div class="dtm-question-nav" id="questionNav">${questions.map((_, i) => renderNavNumber(i)).join("")}</div>
                        <button type="button" class="dtm-finish" id="finishTest">Завершить тест</button>
                    </div>
                </aside>
            </div>`;
        bindEvents();
        updateNavigation(0);
        typesetMath();
    }

    function renderNavNumber(index) {
        return `<button type="button" class="dtm-nav-number ${answers[index] ? "answered" : ""}" data-question="${index}">${index + 1}</button>`;
    }

    function renderQuestion(q, index) {
        const selected = answers[index];
        const options = ["A", "B", "C", "D"].filter(k => q.options?.[k] !== undefined);
        const english = isEnglishQuestion(q);
        return `<section class="dtm-question-card" id="dtm-question-${index}">
            <div class="dtm-question-number">${index + 1}</div><div class="dtm-question-body">
            <div class="dtm-question-text">${renderText(q.text, english)}</div>
            ${q.image ? `<img class="dtm-question-image" src="${escapeHtml(q.image)}" alt="Схема к заданию ${index + 1}">` : ""}
            <div class="dtm-options">${options.map(k => `<button type="button" class="dtm-option ${selected === k ? "selected" : ""}" data-question="${index}" data-answer="${k}"><span class="dtm-option-letter">${k}</span><span>${renderText(q.options[k], english)}</span></button>`).join("")}</div>
            </div></section>`;
    }

    function bindEvents() {
        root.querySelectorAll(".dtm-option").forEach(btn => btn.addEventListener("click", () => {
            const index = Number(btn.dataset.question);
            answers[index] = btn.dataset.answer;
            const card = document.getElementById(`dtm-question-${index}`);
            card?.querySelectorAll(".dtm-option").forEach(option => option.classList.toggle("selected", option === btn));
            saveAnswers();
            updateNavigation(index);
        }));

        root.querySelectorAll(".dtm-nav-number").forEach(btn => btn.addEventListener("click", () => {
            const index = Number(btn.dataset.question);
            document.getElementById(`dtm-question-${index}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
            updateNavigation(index);
        }));

        document.getElementById("finishTest")?.addEventListener("click", () => showConfirm("Вы точно хотите завершить этот тест?", finishTest));
    }

    function showConfirm(message, onConfirm) {
        document.querySelector(".dtm-confirm-overlay")?.remove();
        const overlay = document.createElement("div");
        overlay.className = "dtm-confirm-overlay";
        overlay.innerHTML = `<div class="dtm-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="dtmConfirmTitle">
            <div class="dtm-confirm-icon">⚠️</div><h3 id="dtmConfirmTitle">${escapeHtml(message)}</h3>
            <p>После завершения результат будет сохранён, а текущий тест можно будет пройти заново.</p>
            <div class="dtm-confirm-actions"><button type="button" class="dtm-confirm-cancel">Отмена</button><button type="button" class="dtm-confirm-ok">Завершить</button></div>
        </div>`;
        document.body.appendChild(overlay);
        const close = () => overlay.remove();
        overlay.querySelector(".dtm-confirm-cancel")?.addEventListener("click", close);
        overlay.querySelector(".dtm-confirm-ok")?.addEventListener("click", () => { close(); onConfirm(); });
        overlay.addEventListener("click", event => { if (event.target === overlay) close(); });
        document.addEventListener("keydown", function esc(event) { if (event.key === "Escape") { close(); document.removeEventListener("keydown", esc); } });
    }

    function finishTest() {
        allowLeave = true;
        const result = saveResult();
        const bestResult = readJSON(resultKey, result);
        root.innerHTML = `<div class="dtm-result">
            <div class="dtm-exam-kicker">NETIJA • DTM</div><h2>Тест завершён 🎉</h2>
            <div class="dtm-result-score">${result.score} / ${result.total}</div>
            <p>Отвечено: ${result.answered} из ${result.total}</p>
            <p>${Math.round(result.score / result.total * 100)}% правильных ответов</p>
            <p class="dtm-best-result">Лучший результат: ${bestResult.score} / ${bestResult.total}</p>
            <div class="dtm-result-actions"><button type="button" id="retryTest">Пройти заново</button><a href="DTM.html">К тестам DTM</a></div>
        </div>`;
        document.getElementById("retryTest")?.addEventListener("click", () => {
            answers.fill(null); localStorage.removeItem(progressKey); finished = false; render(); window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    function updateNavigation(currentIndex) {
        const counter = document.getElementById("answeredCount");
        if (counter) counter.textContent = answers.filter(Boolean).length;
        root.querySelectorAll(".dtm-nav-number").forEach((btn, index) => {
            btn.classList.toggle("current", index === currentIndex);
            btn.classList.toggle("answered", Boolean(answers[index]));
        });
    }

    // English questions/options are rendered as ordinary text. This is important for
    // answers such as "a/a", "the/an" and "the/-": MathJax must not turn the slash
    // into a mathematical fraction. Explicit LaTeX in a non-English question is still supported.
    function isEnglishQuestion(q) {
        const text = String(q?.text ?? "");
        if (/[^\x00-\x7F]/.test(text)) return false;
        return /\b(the|a|an|is|are|was|were|you|your|could|would|should|have|has|had|do|does|did|if|this|that|these|those|what|where|when|why|how|my|me|we|he|she|they|it|in|on|at|for|from|with|of|to|and|or|but|not|will|can|cannot|company|person|question|answer|according|passage|exam|students|computer)\b/i.test(text);
    }

    function renderText(value, plainText = false) {
        const raw = String(value ?? "");
        if (!raw) return "";
        if (plainText) return escapeHtml(raw);
        return renderMath(raw);
    }

    function renderMath(value) {
        const raw = String(value ?? "");
        if (!raw) return "";
        if (raw.includes("\\(") || raw.includes("\\[") || raw.includes("$$")) return escapeHtml(raw);

        const tokens = raw.split(/(\s+)/);
        const output = [];
        let mathBuffer = [];
        const flushMath = () => {
            if (!mathBuffer.length) return;
            const math = mathBuffer.join("").trim();
            if (math) output.push(`\\(${escapeHtml(toLatex(math))}\\)`);
            mathBuffer = [];
        };

        for (const token of tokens) {
            if (/^\s+$/.test(token)) {
                if (mathBuffer.length) mathBuffer.push(token); else output.push(token);
                continue;
            }
            if (isMathToken(token)) mathBuffer.push(token);
            else { flushMath(); output.push(escapeHtml(token)); }
        }
        flushMath();
        return output.join("");
    }

    function isMathToken(token) {
        const clean = token.replace(/[.,!?;:]$/g, "");
        if (!clean) return false;
        if (/^[A-Za-z]+\/[A-Za-z-]+$/.test(clean)) return false;
        if (/^[A-Za-z]+\/-$/.test(clean)) return false;
        if (/[=<>≤≥≠≈√∛∜^²³⁴⁵⁶⁷⁸⁹|()[\]{}\/·×÷∞π]/.test(clean)) return true;
        if (/^[A-Za-zα-ωΑ-Ω][₀₁₂₃₄₅₆₇₈₉]*$/.test(clean)) return true;
        if (/^(sin|cos|tg|ctg|log|ln)\b/i.test(clean)) return true;
        if (/^[−+\-]?\d+(?:[.,]\d+)?(?:[%²³⁴⁵⁶⁷⁸⁹])?$/.test(clean)) return true;
        if (/^[−+\-]?\d.*[A-Za-z=+\-*/^()]/.test(clean)) return true;
        return false;
    }

    function toLatex(value) {
        return String(value ?? "")
            .replaceAll("−", "-").replaceAll("×", "\\times ").replaceAll("·", "\\cdot ")
            .replaceAll("÷", "\\div ").replaceAll("≤", "\\le ").replaceAll("≥", "\\ge ")
            .replaceAll("≠", "\\ne ").replaceAll("≈", "\\approx ").replaceAll("∞", "\\infty ")
            .replaceAll("π", "\\pi ").replaceAll("tg", "\\tan ").replaceAll("ctg", "\\cot ")
            .replaceAll("sin", "\\sin ").replaceAll("cos", "\\cos ").replaceAll("log", "\\log ").replaceAll("ln", "\\ln ")
            .replaceAll("⁰", "^0").replaceAll("¹", "^1").replaceAll("²", "^2").replaceAll("³", "^3")
            .replaceAll("⁴", "^4").replaceAll("⁵", "^5").replaceAll("⁶", "^6").replaceAll("⁷", "^7")
            .replaceAll("⁸", "^8").replaceAll("⁹", "^9")
            .replace(/√\s*([^\s+\-)=<>]+(?:\([^)]*\))?)/g, "\\sqrt{$1}")
            .replace(/∛\s*([^\s+\-)=<>]+(?:\([^)]*\))?)/g, "\\sqrt[3]{$1}")
            .replace(/∜\s*([^\s+\-)=<>]+(?:\([^)]*\))?)/g, "\\sqrt[4]{$1}")
            .replace(/(\d+(?:[.,]\d+)?|[A-Za-z])\s*\/\s*(\d+(?:[.,]\d+)?|[A-Za-z])/g, "\\frac{$1}{$2}");
    }

    function installLeaveProtection() {
        window.addEventListener("beforeunload", event => {
            if (allowLeave || finished) return;
            event.preventDefault(); event.returnValue = "Вы точно хотите выйти из этого теста?"; return event.returnValue;
        });
        document.addEventListener("click", event => {
            const link = event.target.closest("a[href]");
            if (!link || allowLeave || finished) return;
            const href = link.getAttribute("href");
            if (!href || href.startsWith("#") || link.target === "_blank" || href.startsWith("javascript:")) return;
            event.preventDefault();
            showConfirm("Вы точно хотите выйти из этого теста?", () => { allowLeave = true; window.location.href = href; });
        }, true);
    }

    function typesetMath() {
        if (window.MathJax?.typesetPromise) MathJax.typesetPromise([root]).catch(console.error);
    }

    function escapeHtml(value) {
        return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
    }

    installLeaveProtection();
    render();
})();
