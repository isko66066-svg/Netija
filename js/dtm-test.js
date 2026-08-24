(() => {
    const root = document.getElementById("dtmTest");
    const params = new URLSearchParams(window.location.search);
    const variant = params.get("variant") || "variant-7";
    const questions = window.DTM_QUESTIONS?.[variant] || [];

    if (!questions.length) {
        root.innerHTML = '<div class="dtm-result"><h2>Тест не найден</h2><p>Вернись к списку DTM и выбери тест.</p><a class="dtm-link" href="DTM.html">К тестам DTM</a></div>';
        return;
    }

    const answers = Array(questions.length).fill(null);
    const titleMap = {
        "variant-7": "ДТМ тест 1",
        "variant-8": "ДТМ тест 2",
        "variant-9": "ДТМ тест 3",
        "variant-10": "ДТМ тест 4",
        "variant-12": "ДТМ тест 5",
        "variant-1982496": "ДТМ тест 6",
        "variant-2024": "ДТМ тест 7",
        "variant-1": "ДТМ тест 8"
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
                            ${questions.map((_, i) => `<button type="button" class="dtm-nav-number" data-question="${i}">${i + 1}</button>`).join("")}
                        </div>
                        <button type="button" class="dtm-finish" id="finishTest">Завершить тест</button>
                    </div>
                </aside>
            </div>
        `;
        bindEvents();
        updateNavigation(0);
    }

    function renderQuestion(q, index) {
        const selected = answers[index];
        const knownKey = q.correct !== null && q.correct !== undefined;
        const options = ["A", "B", "C", "D"].filter(k => q.options?.[k] !== undefined);
        return `
            <section class="dtm-question-card" id="dtm-question-${index}">
                <div class="dtm-question-number">${index + 1}</div>
                <div class="dtm-question-body">
                    <div class="dtm-question-text">${escapeHtml(q.text)}</div>
                    ${q.image ? `<img class="dtm-question-image" src="${escapeHtml(q.image)}" alt="Схема к заданию ${index + 1}">` : ""}
                    <div class="dtm-options">
                        ${options.map(k => `
                            <button type="button" class="dtm-option ${selected === k ? "selected" : ""}" data-question="${index}" data-answer="${k}">
                                <span class="dtm-option-letter">${k}</span>
                                <span>${escapeHtml(q.options[k])}</span>
                            </button>
                        `).join("")}
                    </div>
                    ${!knownKey ? '<p class="dtm-missing-key">Ключ ответа для этого задания пока не внесён.</p>' : ""}
                </div>
            </section>
        `;
    }

    function bindEvents() {
        root.querySelectorAll("[data-answer]").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = Number(btn.dataset.question);
                answers[index] = btn.dataset.answer;
                const card = document.getElementById(`dtm-question-${index}`);
                card.querySelectorAll("[data-answer]").forEach(option => option.classList.remove("selected"));
                btn.classList.add("selected");
                updateNavigation(index);
            });
        });
        root.querySelectorAll("[data-question]").forEach(btn => {
            if (btn.classList.contains("dtm-option")) return;
            btn.addEventListener("click", () => scrollToQuestion(Number(btn.dataset.question)));
        });
        document.getElementById("finishTest")?.addEventListener("click", showResult);
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

    function scrollToQuestion(index) {
        document.getElementById(`dtm-question-${index}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
        updateNavigation(index);
    }

    function updateNavigation(currentIndex) {
        const answered = answers.filter(Boolean).length;
        const counter = document.getElementById("answeredCount");
        if (counter) counter.textContent = answered;
        root.querySelectorAll(".dtm-nav-number").forEach((btn, index) => {
            btn.classList.toggle("answered", Boolean(answers[index]));
            btn.classList.toggle("current", index === currentIndex);
        });
    }

    function showResult() {
        const knownQuestions = questions.filter(q => q.correct);
        const score = knownQuestions.reduce((sum, q) => {
            const originalIndex = questions.indexOf(q);
            return sum + (answers[originalIndex] === q.correct ? 1 : 0);
        }, 0);
        const answered = answers.filter(Boolean).length;
        const missing = questions.length - knownQuestions.length;
        const percentage = knownQuestions.length ? Math.round(score / knownQuestions.length * 100) : 0;
        root.innerHTML = `
            <section class="dtm-result">
                <div class="dtm-exam-kicker">NETIJA • DTM</div>
                <h2>Тест завершён 🎉</h2>
                <div class="dtm-score">${score} / ${knownQuestions.length}</div>
                <p>Отвечено: ${answered} из ${questions.length}</p>
                ${missing ? `<p>Для ${missing} вопросов ключ ещё не внесён, поэтому они не учитываются в балле.</p>` : `<p>${percentage}% правильных ответов</p>`}
                <div class="dtm-result-actions">
                    <button class="dtm-btn dtm-btn--next" id="restart">Пройти заново</button>
                    <a class="dtm-link secondary" href="DTM.html">К тестам DTM</a>
                </div>
            </section>
        `;
        document.getElementById("restart")?.addEventListener("click", () => {
            answers.fill(null);
            render();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
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
