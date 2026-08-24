(() => {
    const root = document.getElementById("dtmTest");
    const params = new URLSearchParams(window.location.search);
    const variant = params.get("variant") || "variant-7";
    const questions = window.DTM_QUESTIONS?.[variant] || [];

    if (!questions.length) {
        root.innerHTML = '<div class="dtm-result"><h2>Тест не найден</h2><p>Вернись к списку DTM и выбери вариант.</p><a class="dtm-link" href="DTM.html">К вариантам DTM</a></div>';
        return;
    }

    let current = 0;
    const answers = Array(questions.length).fill(null);
    const titleMap = {"variant-7":"DTM • Вариант 7","variant-8":"DTM • Вариант 8","variant-9":"DTM • Вариант 9","variant-10":"DTM • Вариант 10","variant-12":"DTM • Вариант 12","variant-1982496":"DTM • Вариант 1982496","variant-2024":"DTM • Вариант 2024"};

    function render() {
        const q = questions[current];
        const selected = answers[current];
        const knownKey = q.correct !== null && q.correct !== undefined;
        const progress = ((current + 1) / questions.length) * 100;
        root.innerHTML = `<div class="dtm-test-head"><h1 class="dtm-test-title">${titleMap[variant] || "DTM"}</h1><div class="dtm-test-progress">${current + 1} / ${questions.length}</div></div><div class="dtm-progress"><span style="width:${progress}%"></span></div><section class="dtm-question"><div class="dtm-question__text">${escapeHtml(q.text)}</div>${q.image ? `<img class="dtm-question__image" src="${q.image}" alt="Схема к заданию">` : ""}<div class="dtm-options">${["A","B","C","D"].filter(k => q.options[k] !== undefined).map(k => `<button class="dtm-option ${selected === k ? "selected" : ""}" data-answer="${k}"><strong>${k})</strong> ${escapeHtml(q.options[k])}</button>`).join("")}</div><div class="dtm-actions"><button class="dtm-btn dtm-btn--back" id="prev" ${current === 0 ? "disabled" : ""}>Назад</button><button class="dtm-btn dtm-btn--next" id="next">${current === questions.length - 1 ? "Завершить" : "Далее"}</button></div>${!knownKey ? '<p style="margin:14px 0 0;color:#94a3b8;font-size:13px">Ключ ответа для этого задания пока не внесён.</p>' : ""}</section>`;
        root.querySelectorAll("[data-answer]").forEach(btn => btn.addEventListener("click", () => { answers[current] = btn.dataset.answer; render(); }));
        root.querySelector("#prev")?.addEventListener("click", () => { if (current > 0) { current--; render(); } });
        root.querySelector("#next")?.addEventListener("click", () => { if (current < questions.length - 1) { current++; render(); } else { showResult(); } });
    }

    function showResult() {
        let score = 0, known = 0;
        questions.forEach((q, i) => { if (q.correct) { known++; if (answers[i] === q.correct) score++; } });
        const answered = answers.filter(Boolean).length;
        const missing = questions.length - known;
        const percentage = known ? Math.round(score / known * 100) : 0;
        root.innerHTML = `<section class="dtm-result"><h2>Тест завершён 🎉</h2><div class="dtm-score">${score} / ${known}</div><p>Отвечено: ${answered} из ${questions.length}</p>${missing ? `<p>Для ${missing} вопросов ключ ещё не внесён, поэтому они не учитываются в балле.</p>` : `<p>${percentage}% правильных ответов</p>`}<div class="dtm-result__actions"><button class="dtm-btn dtm-btn--next" id="restart">Пройти заново</button><a class="dtm-link secondary" href="DTM.html">К вариантам DTM</a></div></section>`;
        document.getElementById("restart").addEventListener("click", () => { answers.fill(null); current = 0; render(); });
    }

    function escapeHtml(value) { return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }
    render();
})();
