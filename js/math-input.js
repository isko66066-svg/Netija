(function () {
    'use strict';

    function loadFreshExamStyles() {
        if (document.getElementById('netija-mobile-exam-fresh')) return;
        const link = document.createElement('link');
        link.id = 'netija-mobile-exam-fresh';
        link.rel = 'stylesheet';
        link.href = 'mobile-exam.css?v=20260824';
        document.head.appendChild(link);
    }

    loadFreshExamStyles();

    const KEYS = [
        ['√', '√()', -1], ['π', 'π'], ['x²', '²'], ['x³', '³'],
        ['a⁄b', '()/()', -4], ['xⁿ', '^()', -1], ['(', '('], [')', ')'],
        ['+', '+'], ['−', '−'], ['×', '×'], ['÷', '÷'], ['⌫', null, null, 'delete']
    ];

    function addStyles() {
        if (document.getElementById('netija-math-input-styles')) return;
        const style = document.createElement('style');
        style.id = 'netija-math-input-styles';
        style.textContent = `
            .math-answer-editor{width:100%;margin-top:8px}
            .math-answer-input{width:100%!important;box-sizing:border-box!important;min-height:48px!important;padding:11px 14px!important;border:1px solid #d7dee8!important;border-radius:10px!important;font-size:18px!important;line-height:1.35!important;background:#fff!important;color:#172033!important;outline:none!important}
            .math-answer-input:focus,.math-answer-editor.is-focused .math-answer-input{border-color:#3b82f6!important;box-shadow:0 0 0 3px rgba(59,130,246,.10)!important}
            .math-answer-preview{min-height:28px;padding:5px 8px 2px;font-size:18px;color:#172033;overflow-x:auto}
            .math-answer-toolbar{display:flex;flex-wrap:wrap;align-items:center;gap:5px;margin-top:5px}
            .math-key{appearance:none;border:0;min-width:38px;height:32px;padding:0 9px;border-radius:9px;background:#eef1f5;color:#172033;font-size:15px;font-weight:600;line-height:1;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
            .math-key:hover{background:#e3e8ee}.math-key:active{transform:translateY(1px)}.math-key-delete{background:#f4e8e8;font-size:16px}
            @media(max-width:600px){.math-answer-input{min-height:46px!important;font-size:17px!important}.math-answer-toolbar{gap:4px}.math-key{min-width:36px;height:34px;padding:0 8px;font-size:15px;border-radius:8px}}
        `;
        document.head.appendChild(style);
    }

    function fire(input) {
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
    }

    function insert(input, text, offset) {
        const start = input.selectionStart ?? input.value.length;
        const end = input.selectionEnd ?? start;
        input.value = input.value.slice(0, start) + text + input.value.slice(end);
        const pos = offset === undefined ? start + text.length : start + text.length + offset;
        input.focus({ preventScroll: true });
        input.setSelectionRange(pos, pos);
        fire(input);
    }

    function erase(input) {
        const start = input.selectionStart ?? input.value.length;
        const end = input.selectionEnd ?? start;
        if (start !== end) {
            input.value = input.value.slice(0, start) + input.value.slice(end);
            input.setSelectionRange(start, start);
        } else if (start > 0) {
            input.value = input.value.slice(0, start - 1) + input.value.slice(end);
            input.setSelectionRange(start - 1, start - 1);
        }
        input.focus({ preventScroll: true });
        fire(input);
    }

    function toLatex(value) {
        return String(value || '')
            .replace(/√\s*\(([^()]*)\)/g, '\\sqrt{$1}')
            .replace(/√\s*([\d.]+)/g, '\\sqrt{$1}')
            .replace(/sqrt\s*\(([^()]*)\)/gi, '\\sqrt{$1}')
            .replace(/π/g, '\\pi').replace(/pi/gi, '\\pi')
            .replace(/×/g, '\\times').replace(/÷/g, '\\div').replace(/−/g, '-')
            .replace(/\^\(([^()]*)\)/g, '^{$1}')
            .replace(/\(([^()]*)\)\/\(([^()]*)\)/g, '\\frac{$1}{$2}')
            .replace(/(^|[^\d])(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)(?=$|[^\d])/g, '$1\\frac{$2}{$3}')
            .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/g, c => `^{${{'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁻':'-','⁺':'+'}[c]}}`);
    }

    function normalize(value) {
        return String(value ?? '')
            .trim()
            .replace(/\s+/g, '')
            .replace(/,/g, '.')
            .replace(/⁄/g, '/')
            .toLowerCase();
    }

    function fraction(value) {
        let text = normalize(value)
            .replace(/^\$+|\$+$/g, '')
            .replace(/\\(?:d?frac)\{([^{}]+)\}\{([^{}]+)\}/g, '$1/$2')
            .replace(/\\left|\\right/g, '');

        const match = text.match(/^\(?([+-]?\d+)\)?\/\(?([+-]?\d+)\)?$/);
        if (!match || match[2] === '0') return null;

        let a = BigInt(match[1]);
        let b = BigInt(match[2]);
        if (b < 0n) { a = -a; b = -b; }

        let x = a < 0n ? -a : a;
        let y = b;
        while (y) [x, y] = [y, x % y];

        return [a / x, b / x];
    }

    function equivalent(a, b) {
        const left = fraction(a);
        const right = fraction(b);
        if (left && right) return left[0] === right[0] && left[1] === right[1];

        const na = Number(normalize(a));
        const nb = Number(normalize(b));
        return Number.isFinite(na) && Number.isFinite(nb) && Math.abs(na - nb) < 1e-9;
    }

    function prepareEquivalentAnswers() {
        if (!Array.isArray(window.questions)) return;

        window.questions.forEach(q => {
            if (q.type !== 'open_ended' || !Array.isArray(q.subQuestions)) return;

            q.subQuestions.forEach(sub => {
                const input = document.querySelector(
                    `input[data-question-id="${q.id}"][data-sub-id="${sub.id}"]`
                );

                if (input && input.value.trim() && equivalent(input.value, sub.correctAnswer)) {
                    // Перед основной проверкой quiz.js заменяем эквивалентную
                    // запись на ТОЧНОЕ эталонное значение из базы ответов.
                    // Например: 8/3, (8)/(3) и $\\frac{8}{3}$ будут
                    // приведены к одной и той же строке, которую проверяет quiz.js.
                    input.value = String(sub.correctAnswer);
                }
            });
        });
    }

    function enhanceInput(input) {
        if (!input || input.dataset.mathKeyboard === '1') return;
        input.dataset.mathKeyboard = '1';

        const wrapper = document.createElement('div');
        wrapper.className = 'math-answer-editor';
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);

        const preview = document.createElement('div');
        preview.className = 'math-answer-preview';
        wrapper.appendChild(preview);

        const toolbar = document.createElement('div');
        toolbar.className = 'math-answer-toolbar';
        toolbar.setAttribute('aria-label', 'Математическая клавиатура');
        wrapper.appendChild(toolbar);

        input.classList.add('math-answer-input');
        input.setAttribute('inputmode', 'text');
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('spellcheck', 'false');

        KEYS.forEach(([label, value, offset, action]) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = action === 'delete' ? 'math-key math-key-delete' : 'math-key';
            button.textContent = label;
            button.addEventListener('mousedown', e => e.preventDefault());
            button.addEventListener('click', () => action === 'delete' ? erase(input) : insert(input, value, offset));
            toolbar.appendChild(button);
        });

        const updatePreview = () => {
            const value = toLatex(input.value);
            preview.innerHTML = value ? `\\(${value}\\)` : '';
            if (value && window.MathJax?.typesetPromise) {
                window.MathJax.typesetPromise([preview]).catch(() => {});
            }
        };

        input.addEventListener('input', updatePreview);
        input.addEventListener('focus', () => wrapper.classList.add('is-focused'));
        input.addEventListener('blur', () => wrapper.classList.remove('is-focused'));
        updatePreview();
    }

    function enhance() {
        addStyles();
        document.querySelectorAll('.sub-question-input').forEach(enhanceInput);
    }

    function attachSubmitFix() {
        const submit = document.getElementById('submitBtn');
        if (!submit || submit.dataset.mathAnswerFixAttached === '1') return;
        submit.dataset.mathAnswerFixAttached = '1';

        // Capture-фаза: этот обработчик должен сработать ДО обработчика
        // submitTest() из quiz.js.
        submit.addEventListener('click', prepareEquivalentAnswers, true);
    }

    window.NetijaMathInput = { enhance, equivalent };
    document.addEventListener('netija:quizRendered', () => {
        enhance();
        attachSubmitFix();
    });

    enhance();
    attachSubmitFix();

    new MutationObserver(() => {
        enhance();
        attachSubmitFix();
    }).observe(document.body, { childList: true, subtree: true });
})();
