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
    const storageKey = `netija_dtm_progress_${userKey}_${variant}`;

    function loadProgress() {
        try {
            const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
            return saved && typeof saved === "object"
                ? { answers: saved.answers || {}, reviewed: Boolean(saved.reviewed) }
                : { answers: {}, reviewed: false };
        } catch {
            return { answers: {}, reviewed: false };
        }
    }

    function saveProgress() {
        const answerMap = {};
        answers.forEach((answer, index) => {
            if (answer) answerMap[index] = answer;
        });
        localStorage.setItem(storageKey, JSON.stringify({ answers: answerMap, reviewed }));
    }

    const saved = loadProgress();
    const answers = Array(questions.length).fill(null);
    Object.entries(saved.answers).forEach(([index, answer]) => {
        const i = Number(index);
        if (Number.isInteger(i) && i >= 0 && i < answers.length) answers[i] = answer;
    });
    let reviewed = saved.reviewed;

    const titleMap = {
        "variant-7": "ДТМ тест 1",
        "variant-8": "ДТМ тест 2",
        "variant-9": "ДТМ тест 3",
        "variant-10": "ДТМ тест 4",
        "variant-12": "ДТМ тест 5",
        "variant-1982496": "ДТМ тест 6",
        "variant-2024": "ДТМ тест 7"
    };

    function render() {
        root.innerHTML = `
            <div class="dtm-exam-head">
                <div>
                    <div class="dtm-exam-kicker">NETIJA • DTM</div>
                    <h1 class="dtm-test-title">${titleMap[variant] || "ДТМ тест"}</h1>
                    <p class="dtm-exam-subtitle">Все вопросы открыты. Отвечай в любом порядке.</p>
                </div>
                <div class="dtm-exam-progress"><strong id="answeredCount">0</strong> / ${questions.length}<span>отвечено</span></div>
            </div>
            <div class="dtm-exam-layout">
                <div class="dtm-question-list" id="questionList">
                    ${questions.map((q, i) => renderQuestion(q, i)).join("")}
                </div>
                <aside class="dtm-sidebar">
                    <div class="dtm-sidebar-card">
                        <div class="dtm-sidebar-title">Вопросы</div>
                        <div class="dtm-legend">
                            <span><i class="answered"></i> Ответ дан</span>
                            <span><i class="current"></i> Текущий вопрос</span>
                            <span><i class="unanswered"></i> Ответ не дан</span>
                        </div>
                        <div class="dtm-question-nav" id="questionNav">
                            ${questions.map((_, i) => renderNavNumber(i)).join("")}
                        </div>
                        <button type="button" class="dtm-finish ${reviewed ? "reviewed" : ""}" id="finishTest">${reviewed ? "Результаты показаны" : "Завершить тест"}</button>
                    </div>
                </aside>
            </div>
        `;
        bindEvents();
        updateNavigation(getCurrentQuestion());
        typesetMath();
    }

    function renderNavNumber(index) {
        const q = questions[index];
        const answer = answers[index];
        let state = "";
        if (reviewed && q.correct) {
            state = answer === q.correct ? "review-correct" : answer ? "review-wrong" : "";
        } else if (answer) {
            state = "answered";
        }
        return `<button type="button" class="dtm-nav-number ${state}" data-question="${index}">${index + 1}</button>`;
    }

    function renderQuestion(q, index) {
        const selected = answers[index];
        const knownKey = q.correct !== null && q.correct !== undefined && q.correct !== "";
        const options = ["A", "B", "C", "D"].filter(k => q.options?.[k] !== undefined);
        return `
            <section class="dtm-question-card" id="dtm-question-${index}">
                <div class="dtm-question-number">${index + 1}</div>
                <div class="dtm-question-body">
                    <div class="dtm-question-text">${renderMath(q.text)}</div>
                    ${q.image ? `<img class="dtm-question-image" src="${escapeHtml(q.image)}" alt="Схема к заданию ${index + 1}">` : ""}
                    <div class="dtm-options">
                        ${options.map(k => {
                            let state = selected === k ? "selected" : "";
                            if (reviewed && knownKey) {
                                if (k === q.correct) state = "dtm-review-correct";
                                else if (selected === k && selected !== q.correct) state = "dtm-review-wrong";
                            }
                            return `
                                <button type="button" class="dtm-option ${state}" data-question="${index}" data-answer="${k}" ${reviewed ? "disabled" : ""}>
                                    <span class="dtm-option-letter">${k}</span>
                                    <span>${renderMath(q.options[k])}</span>
                                </button>
                            `;
                        }).join("")}
                    </div>
                    ${reviewed && knownKey ? `<p class="dtm-review-badge">Правильный ответ: ${escapeHtml(q.correct)} — ${renderMath(q.options[q.correct])}</p>` : ""}
                    ${!knownKey ? '<p class="dtm-missing-key">Ключ ответа для этого задания пока не внесён.</p>' : ""}
                </div>
            </section>
        `;
    }

    function bindEvents() {
        root.querySelectorAll(".dtm-option:not([disabled])").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = Number(btn.dataset.question);
                const answer = btn.dataset.answer;
                answers[index] = answer;

                const card = document.getElementById(`dtm-question-${index}`);
                card?.querySelectorAll("[data-answer]").forEach(option => option.classList.remove("selected"));
                btn.classList.add("selected");
                saveProgress();
                updateNavigation(index);
            });
        });

        root.querySelectorAll(".dtm-nav-number").forEach(btn => {
            btn.addEventListener("click", () => scrollToQuestion(Number(btn.dataset.question)));
        });

        document.getElementById("finishTest")?.addEventListener("click", () => {
            if (reviewed) return;
            reviewed = true;
            saveProgress();
            const current = getCurrentQuestion();
            render();
            scrollToQuestion(current);
        });

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) updateNavigation(Number(entry.target.dataset.index));
            });
        }, { rootMargin: "-20% 0px -65% 0px", threshold: 0 });

        root.querySelectorAll(".dtm-question-card").forEach((card, index) => {
            card.dataset.index = index;
            observer.observe(card);
        });
    }

    function getCurrentQuestion() {
        const active = root.querySelector(".dtm-nav-number.current");
        return active ? Number(active.dataset.question) : 0;
    }

    function scrollToQuestion(index) {
        document.getElementById(`dtm-question-${index}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
        updateNavigation(index);
    }

    function updateNavigation(currentIndex) {
        const answered = answers.filter(Boolean).length;
        const counter = document.getElementById("answeredCount");
        if (counter) counter.textContent = answered;
        root.querySelectorAll(".dtm-nav-number").forEach((btn, index) => {
            btn.classList.toggle("current", index === currentIndex);
            if (!reviewed) btn.classList.toggle("answered", Boolean(answers[index]));
        });
    }

    function hasCyrillic(value) {
        return /[А-Яа-яЁё]/.test(value);
    }

    function looksLikeMath(value) {
        return /(?:[=<>≤≥≠≈]|√|∛|∜|π|∞|[a-zA-Zα-ωΑ-Ω][²³⁴⁵⁶⁷⁸⁹⁰⁻⁺]?|\d+\s*\/\s*[\dA-Za-zα-ωΑ-Ω]|\^|·|×|÷|±|\b(?:sin|cos|tg|ctg|log|ln)\b)/.test(value);
    }

    function toTex(value) {
        let text = String(value)
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
            .replaceAll("ln", "\\ln ");

        const superscripts = {"⁰":"^0","¹":"^1","²":"^2","³":"^3","⁴":"^4","⁵":"^5","⁶":"^6","⁷":"^7","⁸":"^8","⁹":"^9","⁻":"^-"};
        Object.entries(superscripts).forEach(([from, to]) => { text = text.replaceAll(from, to); });
        text = text.replace(/√\s*([^\s+\-)=<>]+(?:\([^)]*\))?)/g, "\\sqrt{$1}");
        text = text.replace(/∛\s*([^\s+\-)=<>]+(?:\([^)]*\))?)/g, "\\sqrt[3]{$1}");
        text = text.replace(/∜\s*([^\s+\-)=<>]+(?:\([^)]*\))?)/g, "\\sqrt[4]{$1}");
        text = text.replace(/(\d+(?:[.,]\d+)?|[A-Za-zα-ωΑ-Ω])\s*\/\s*(\d+(?:[.,]\d+)?|[A-Za-zα-ωΑ-Ω])/g, "\\frac{$1}{$2}");
        text = text.replaceAll(",", ".");
        return text;
    }

    function renderMath(value) {
        const raw = String(value ?? "");
        if (!raw) return "";
        if (raw.includes("\\(") || raw.includes("\\[")) return escapeHtml(raw);

        if (!hasCyrillic(raw) && looksLikeMath(raw)) {
            return `\\(${toTex(raw)}\\)`;
        }

        const parts = raw.split(/(:\s*)/);
        if (parts.length >= 3) {
            const prefix = parts.shift();
            const separator = parts.shift();
            const tail = parts.join("");
            if (looksLikeMath(tail)) {
                return `${escapeHtml(prefix + separator)}\\(${toTex(tail)}\\)`;
            }
        }

        let escaped = escapeHtml(raw);
        escaped = escaped.replace(/(√[^\s,.;]+|∛[^\s,.;]+|∜[^\s,.;]+|(?:sin|cos|tg|ctg)\s*[^,.;]+(?:=[^,.;]+)?)/g, match => `\\(${toTex(match)}\\)`);
        return escaped;
    }

    function typesetMath() {
        if (window.MathJax?.typesetPromise) {
            MathJax.typesetPromise([root]).catch(error => console.error("MathJax:", error));
        }
    }

    function escapeHtml(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    render();
})();
