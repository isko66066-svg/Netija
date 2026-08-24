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
    const bestResult = readJSON(resultKey, null);
    const answers = Array(questions.length).fill(null);
    Object.entries(savedAnswers).forEach(([index, answer]) => {
        const i = Number(index);
        if (Number.isInteger(i) && i >= 0 && i < answers.length) answers[i] = answer;
    });

    let finished = false;
    let lastResult = null;

    function saveAnswers() {
        const data = {};
        answers.forEach((answer, index) => { if (answer) data[index] = answer; });
        localStorage.setItem(progressKey, JSON.stringify(data));
    }

    function saveResult() {
        const score = questions.reduce((total, q, index) => total + (q.correct && answers[index] === q.correct ? 1 : 0), 0);
        const answered = answers.filter(Boolean).length;
        const result = { score, total: questions.length, answered, date: Date.now() };
        lastResult = result;

        const previous = readJSON(resultKey, null);
        if (!previous || score > Number(previous.score || 0)) {
            localStorage.setItem(resultKey, JSON.stringify(result));
        }
        return result;
    }

    const titleMap = {
        "variant-7": "ДТМ тест 1", "variant-8": "ДТМ тест 2", "variant-9": "ДТМ тест 3",
        "variant-10": "ДТМ тест 4", "variant-12": "ДТМ тест 5", "variant-1982496": "ДТМ тест 6", "variant-2024": "ДТМ тест 7"
    };

    function render() {
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
        return `<section class="dtm-question-card" id="dtm-question-${index}">
            <div class="dtm-question-number">${index + 1}</div><div class="dtm-question-body">
            <div class="dtm-question-text">${renderMath(q.text)}</div>
            ${q.image ? `<img class="dtm-question-image" src="${escapeHtml(q.image)}" alt="Схема к заданию ${index + 1}">` : ""}
            <div class="dtm-options">${options.map(k => `<button type="button" class="dtm-option ${selected === k ? "selected" : ""}" data-question="${index}" data-answer="${k}"><span class="dtm-option-letter">${k}</span><span>${renderMath(q.options[k])}</span></button>`).join("")}</div>
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

        document.getElementById("finishTest")?.addEventListener("click", finishTest);
    }

    function finishTest() {
        const result = saveResult();
        finished = true;
        root.innerHTML = `<div class="dtm-result">
            <div class="dtm-exam-kicker">NETIJA • DTM</div><h2>Тест завершён 🎉</h2>
            <div class="dtm-result-score">${result.score} / ${result.total}</div>
            <p>Отвечено: ${result.answered} из ${result.total}</p>
            <p>${Math.round(result.score / result.total * 100)}% правильных ответов</p>
            ${bestResult && result.score < bestResult.score ? `<p class="dtm-best-result">Лучший результат: ${bestResult.score} / ${bestResult.total}</p>` : `<p class="dtm-best-result">Лучший результат: ${result.score} / ${result.total}</p>`}
            <div class="dtm-result-actions"><button type="button" id="retryTest">Пройти заново</button><a href="DTM.html">К тестам DTM</a></div>
        </div>`;
        document.getElementById("retryTest")?.addEventListener("click", () => {
            answers.fill(null);
            localStorage.removeItem(progressKey);
            finished = false;
            render();
            window.scrollTo({ top: 0, behavior: "smooth" });
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

    function renderMath(value) {
        const raw = String(value ?? "");
        if (!raw) return "";
        if (raw.includes("\\(") || raw.includes("\\[")) return escapeHtml(raw);
        const hasMath = /[=<>≤≥≠≈√∛∜π^²³⁴⁵⁶⁷⁸⁹]|\d+\s*\/\s*[\dA-Za-z]|\b(sin|cos|tg|ctg|log|ln)\b|[·×÷]/i.test(raw);
        if (!hasMath) return escapeHtml(raw);
        let text = raw.replaceAll("−", "-").replaceAll("×", "\\times ").replaceAll("·", "\\cdot ").replaceAll("÷", "\\div ").replaceAll("≤", "\\le ").replaceAll("≥", "\\ge ").replaceAll("≠", "\\ne ").replaceAll("≈", "\\approx ").replaceAll("∞", "\\infty ").replaceAll("π", "\\pi ").replaceAll("tg", "\\tan ").replaceAll("ctg", "\\cot ").replaceAll("sin", "\\sin ").replaceAll("cos", "\\cos ").replaceAll("log", "\\log ").replaceAll("ln", "\\ln ");
        const superscripts = {"⁰":"^0","¹":"^1","²":"^2","³":"^3","⁴":"^4","⁵":"^5","⁶":"^6","⁷":"^7","⁸":"^8","⁹":"^9"};
        Object.entries(superscripts).forEach(([a,b]) => text = text.replaceAll(a,b));
        text = text.replace(/√\s*([^\s+\-)=<>]+(?:\([^)]*\))?)/g, "\\sqrt{$1}").replace(/∛\s*([^\s+\-)=<>]+(?:\([^)]*\))?)/g, "\\sqrt[3]{$1}").replace(/∜\s*([^\s+\-)=<>]+(?:\([^)]*\))?)/g, "\\sqrt[4]{$1}");
        text = text.replace(/(\d+(?:[.,]\d+)?|[A-Za-z])\s*\/\s*(\d+(?:[.,]\d+)?|[A-Za-z])/g, "\\frac{$1}{$2}");
        return `\\(${text}\\)`;
    }

    function typesetMath() { if (window.MathJax?.typesetPromise) MathJax.typesetPromise([root]).catch(console.error); }
    function escapeHtml(value) { return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }

    render();
})();
