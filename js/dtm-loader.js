(() => {
    const params = new URLSearchParams(location.search);
    const variant = params.get('variant') || 'variant-7';
    const allowed = new Set(['variant-7','variant-8','variant-9','variant-10','variant-12','variant-1982496','variant-2024']);
    const selected = allowed.has(variant) ? variant : 'variant-7';

    function load(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `${src}?v=20260824`;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

    function markMath(value, wholeOption = false) {
        if (typeof value !== 'string' || value.includes('\\(') || value.includes('\\[')) return value;
        const mathLike = /(?:\d|[=+\-−*/^√∛∜π∞≤≥≠≈·×÷]|\b(?:sin|cos|tg|ctg|log|ln|arctg|arcsin|arccos)\b)/i;
        if (!mathLike.test(value)) return value;

        if (wholeOption && !/[А-Яа-я]{3,}/.test(value)) return `\\(${value}\\)`;

        const token = '(?:\\d+(?:[.,]\\d+)?|[A-Za-zα-ωΑ-Ω]+|√|∛|∜|π|∞|[+\\-−=<>≤≥≠≈×·÷*/^²³⁴⁵⁶⁷⁸⁹]|[()[\\]{}|;,.:])';
        const expression = new RegExp(`(${token}(?:\\s*${token}){1,})`, 'g');
        return value.replace(expression, match => {
            if (!/[0-9=+\\-−*/√∛∜π∞≤≥≠≈×·÷^²³⁴⁵⁶⁷⁸⁹]/.test(match)) return match;
            if (/^[A-Za-zА-Яа-я]{1,4}$/.test(match)) return match;
            return `\\(${match.trim()}\\)`;
        });
    }

    function normalizeQuestions() {
        const bank = window.DTM_QUESTIONS?.[selected];
        if (!bank) return;
        bank.forEach(question => {
            question.text = markMath(question.text);
            if (question.options) {
                Object.keys(question.options).forEach(key => {
                    question.options[key] = markMath(question.options[key], true);
                });
            }
        });
    }

    load(`js/dtm-questions/${selected}.js`)
        .then(normalizeQuestions)
        .then(() => load('js/dtm-test.js'))
        .then(() => load('js/dtm-persistence.js'))
        .catch(error => {
            console.error('DTM loader:', error);
            const root = document.getElementById('dtmTest');
            if (root) root.innerHTML = '<div class="dtm-result"><h2>Не удалось загрузить тест</h2><p>Попробуй обновить страницу.</p></div>';
        });
})();
