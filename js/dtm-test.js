(() => {
    const root = document.getElementById('dtmTest');
    const params = new URLSearchParams(location.search);
    const variant = params.get('variant') || 'variant-7';
    const questions = window.DTM_QUESTIONS?.[variant] || [];

    if (!root || !questions.length) return;

    const titleMap = {
        'variant-7': 'ДТМ тест 1', 'variant-8': 'ДТМ тест 2',
        'variant-9': 'ДТМ тест 3', 'variant-10': 'ДТМ тест 4',
        'variant-12': 'ДТМ тест 5', 'variant-1982496': 'ДТМ тест 6',
        'variant-2024': 'ДТМ тест 7'
    };

    let user = null;
    try { user = JSON.parse(localStorage.getItem('netija_user') || 'null'); } catch (_) {}
    const userKey = user?.sub || user?.email || user?.id || 'guest';
    const storageKey = `netija_dtm_progress_${userKey}_${variant}`;

    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(storageKey) || '{}') || {}; } catch (_) {}

    const answers = Array(questions.length).fill(null);
    Object.entries(saved.answers || {}).forEach(([i, answer]) => {
        const index = Number(i);
        if (Number.isInteger(index) && index >= 0 && index < answers.length) answers[index] = answer;
    });
    let reviewed = Boolean(saved.reviewed);

    function save() {
        const answerMap = {};
        answers.forEach((answer, i) => { if (answer) answerMap[i] = answer; });
        try { localStorage.setItem(storageKey, JSON.stringify({ answers: answerMap, reviewed })); } catch (_) {}
    }

    function escapeHtml(value) {
        return String(value ?? '')
            .replaceAll('&', '&amp;').replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
    }

    function tex(value) {
        return String(value ?? '')
            .replaceAll('−', '-')
            .replaceAll('×', '\\times ')
            .replaceAll('·', '\\cdot ')
            .replaceAll('÷', '\\div ')
            .replaceAll('≤', '\\le ')
            .replaceAll('≥', '\\ge ')
            .replaceAll('≠', '\\ne ')
            .replaceAll('≈', '\\approx ')
            .replaceAll('∞', '\\infty ')
            .replaceAll('π', '\\pi ')
            .replaceAll('√', '\\sqrt{}')
            .replaceAll('∛', '\\sqrt[3]{}')
            .replaceAll('∜', '\\sqrt[4]{}')
            .replaceAll('tg', '\\tan ')
            .replaceAll('ctg', '\\cot ')
            .replaceAll('sin', '\\sin ')
            .replaceAll('cos', '\\cos ')
            .replaceAll('log', '\\log ')
            .replaceAll('ln', '\\ln ')
            .replaceAll('⁰','^0').replaceAll('¹','^1').replaceAll('²','^2')
            .replaceAll('³','^3').replaceAll('⁴','^4').replaceAll('⁵','^5')
            .replaceAll('⁶','^6').replaceAll('⁷','^7').replaceAll('⁸','^8')
            .replaceAll('⁹','^9').replaceAll('⁻','^-');
    }

    function renderMath(value) {
        const raw = String(value ?? '');
        if (!raw) return '';
        if (raw.includes('\\(') || raw.includes('\\[')) return raw;

        // Формулы, которые уже записаны в данных, целиком отдаём MathJax.
        if (!/[А-Яа-яЁё]/.test(raw) && /[=+*/^√∛∜π≤≥≠≈·×÷]|\d+\s*\/\s*\d+|\b(sin|cos|tg|ctg|log|ln)\b/.test(raw)) {
            return `\\(${tex(raw)}\\)`;
        }

        // Для смешанного текста превращаем только математические фрагменты.
        const escaped = escapeHtml(raw);
        return escaped.replace(/(√[^\s,.;]+|∛[^\s,.;]+|∜[^\s,.;]+|\d+(?:[.,]\d+)?\s*\/\s*\d+(?:[.,]\d+)?)/g,
            match => `\\(${tex(match)}\\)`);
    }

    function questionHtml(q, index) {
        const selected = answers[index];
        const options = ['A','B','C','D'].filter(k => q.options?.[k] !== undefined);
        const hasKey = q.correct !== null && q.correct !== undefined && q.correct !== '';

        return `<section class="dtm-question-card" id="dtm-question-${index}">
            <div class="dtm-question-number">${index + 1}</div>
            <div class="dtm-question-body">
                <div class="dtm-question-text">${renderMath(q.text)}</div>
                ${q.image ? `<img class="dtm-question-image" src="${escapeHtml(q.image)}" alt="Схема к заданию ${index + 1}">` : ''}
                <div class="dtm-options">
                    ${options.map(k => {
                        let cls = selected === k ? 'selected' : '';
                        if (reviewed && hasKey) {
                            if (k === q.correct) cls = 'dtm-review-correct';
                            else if (selected === k) cls = 'dtm-review-wrong';
                        }
                        return `<button type="button" class="dtm-option ${cls}" data-question="${index}" data-answer="${k}" ${reviewed ? 'disabled' : ''}>
                            <span class="dtm-option-letter">${k}</span><span>${renderMath(q.options[k])}</span>
                        </button>`;
                    }).join('')}
                </div>
                ${reviewed && hasKey ? `<p class="dtm-review-badge">Правильный ответ: ${q.correct} — ${renderMath(q.options[q.correct])}</p>` : ''}
            </div>
        </section>`;
    }

    function navHtml(index) {
        const answer = answers[index];
        const q = questions[index];
        let cls = answer ? 'answered' : '';
        if (reviewed && q.correct) cls = answer === q.correct ? 'review-correct' : answer ? 'review-wrong' : '';
        return `<button type="button" class="dtm-nav-number ${cls}" data-question="${index}">${index + 1}</button>`;
    }

    function render() {
        root.innerHTML = `<div class="dtm-exam-head">
            <div><div class="dtm-exam-kicker">NETIJA • DTM</div>
            <h1 class="dtm-test-title">${titleMap[variant] || 'ДТМ тест'}</h1>
            <p class="dtm-exam-subtitle">Все вопросы открыты. Отвечай в любом порядке.</p></div>
            <div class="dtm-exam-progress"><strong id="answeredCount">${answers.filter(Boolean).length}</strong> / ${questions.length}<span>отвечено</span></div>
        </div>
        <div class="dtm-exam-layout">
            <div class="dtm-question-list">${questions.map(questionHtml).join('')}</div>
            <aside class="dtm-sidebar"><div class="dtm-sidebar-card">
                <div class="dtm-sidebar-title">Вопросы</div>
                <div class="dtm-legend"><span><i class="answered"></i> Ответ дан</span><span><i class="current"></i> Текущий вопрос</span><span><i class="unanswered"></i> Ответ не дан</span></div>
                <div class="dtm-question-nav">${questions.map((_, i) => navHtml(i)).join('')}</div>
                <button type="button" class="dtm-finish ${reviewed ? 'reviewed' : ''}" id="finishTest">${reviewed ? 'Результаты показаны' : 'Завершить тест'}</button>
            </div></aside>
        </div>`;

        typesetMath();
    }

    function updateCounter() {
        const counter = document.getElementById('answeredCount');
        if (counter) counter.textContent = answers.filter(Boolean).length;
        root.querySelectorAll('.dtm-nav-number').forEach((button, i) => {
            button.classList.toggle('answered', Boolean(answers[i]) && !reviewed);
        });
    }

    root.addEventListener('click', event => {
        const option = event.target.closest('.dtm-option');
        if (option && !option.disabled) {
            const index = Number(option.dataset.question);
            const answer = option.dataset.answer;
            if (!Number.isInteger(index) || !answers[index]) {
                answers[index] = answer;
                const card = option.closest('.dtm-question-card');
                card?.querySelectorAll('.dtm-option').forEach(button => button.classList.remove('selected'));
                option.classList.add('selected');
                save();
                updateCounter();
            } else {
                // Позволяем менять уже выбранный ответ.
                answers[index] = answer;
                const card = option.closest('.dtm-question-card');
                card?.querySelectorAll('.dtm-option').forEach(button => button.classList.toggle('selected', button.dataset.answer === answer));
                save();
            }
            return;
        }

        const nav = event.target.closest('.dtm-nav-number');
        if (nav) {
            document.getElementById(`dtm-question-${Number(nav.dataset.question)}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }

        const finish = event.target.closest('#finishTest');
        if (finish && !reviewed) {
            reviewed = true;
            save();
            render();
            document.getElementById('dtm-question-0')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    function typesetMath() {
        if (!window.MathJax?.typesetPromise) return;
        requestAnimationFrame(() => {
            window.MathJax.typesetPromise([root]).catch(error => console.error('MathJax:', error));
        });
    }

    render();
})();
