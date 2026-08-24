(function () {
    'use strict';

    const KEYS = [
        ['√', '√()', -1], ['π', 'π'], ['x²', '²'], ['x³', '³'],
        ['a⁄b', '()/()', -4], ['xⁿ', '^()', -1], ['(', '('], [')', ')'],
        ['+', '+'], ['−', '−'], ['×', '×'], ['÷', '÷'], ['⌫', null, null, 'delete']
    ];

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
            if (value && window.MathJax?.typesetPromise) window.MathJax.typesetPromise([preview]).catch(() => {});
        };

        input.addEventListener('input', updatePreview);
        updatePreview();
    }

    function enhance() {
        document.querySelectorAll('.sub-question-input').forEach(enhanceInput);
    }

    window.NetijaMathInput = { enhance };
    document.addEventListener('netija:quizRendered', enhance);
    enhance();
    new MutationObserver(enhance).observe(document.body, { childList: true, subtree: true });
})();
