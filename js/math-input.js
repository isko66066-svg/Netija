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

    function takeBraces(text, start) {
        if (text[start] !== '{') return null;
        let depth = 0;
        for (let i = start; i < text.length; i++) {
            if (text[i] === '{') depth++;
            if (text[i] === '}') {
                depth--;
                if (depth === 0) return { value: text.slice(start + 1, i), end: i + 1 };
            }
        }
        return null;
    }

    function latexToExpression(value) {
        let text = normalize(value)
            .replace(/^\$+|\$+$/g, '')
            .replace(/\\left|\\right/g, '')
            .replace(/\\,|\\;/g, '')
            .replace(/\\times/g, '*')
            .replace(/\\cdot/g, '*')
            .replace(/\\div/g, '/')
            .replace(/\\pi/g, 'pi')
            .replace(/π/g, 'pi')
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-');

        text = text.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]+/g, chars => {
            const map = {'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁻':'-','⁺':'+'};
            return '^' + chars.split('').map(c => map[c]).join('');
        });

        let guard = 0;
        while (/\\(?:d?frac|sqrt)/.test(text) && guard++ < 100) {
            let replaced = false;

            const fracIndex = text.search(/\\(?:d?frac)/);
            if (fracIndex !== -1) {
                const command = text.slice(fracIndex).match(/^\\(?:d?frac)/)[0];
                const first = takeBraces(text, fracIndex + command.length);
                if (first) {
                    const second = takeBraces(text, first.end);
                    if (second) {
                        text = text.slice(0, fracIndex) + `(${first.value})/(${second.value})` + text.slice(second.end);
                        replaced = true;
                    }
                }
            }

            const sqrtIndex = text.search(/\\sqrt/);
            if (sqrtIndex !== -1) {
                let pos = sqrtIndex + 5;
                let indexPart = null;
                if (text[pos] === '[') {
                    const close = text.indexOf(']', pos + 1);
                    if (close !== -1) {
                        indexPart = text.slice(pos + 1, close);
                        pos = close + 1;
                    }
                }
                const radicand = takeBraces(text, pos);
                if (radicand) {
                    const replacement = indexPart ? `root(${indexPart},(${radicand.value}))` : `sqrt((${radicand.value}))`;
                    text = text.slice(0, sqrtIndex) + replacement + text.slice(radicand.end);
                    replaced = true;
                }
            }

            if (!replaced) break;
        }

        return text
            .replace(/√\s*\(([^()]*)\)/g, 'sqrt($1)')
            .replace(/√\s*([\d.]+)/g, 'sqrt($1)')
            .replace(/[{}]/g, '')
            .replace(/\^\(([^()]*)\)/g, '^($1)');
    }

    function evaluateExpression(value) {
        const source = latexToExpression(value);
        if (!source) return null;

        const tokens = [];
        const tokenPattern = /\s*(sqrt|root|pi|\d+(?:\.\d+)?|[(),+\-*/^])/gy;
        let pos = 0;
        while (pos < source.length) {
            tokenPattern.lastIndex = pos;
            const match = tokenPattern.exec(source);
            if (!match || match.index !== pos) return null;
            tokens.push(match[1]);
            pos = tokenPattern.lastIndex;
        }

        let index = 0;
        const peek = () => tokens[index];
        const consume = () => tokens[index++];
        const startsFactor = token => token === '(' || token === 'sqrt' || token === 'root' || token === 'pi' || /^\d/.test(token || '');

        function primary() {
            const token = peek();
            if (token === '+') { consume(); return primary(); }
            if (token === '-') { consume(); const value = primary(); return value === null ? null : -value; }
            if (token === '(') {
                consume();
                const value = expression();
                if (consume() !== ')') return null;
                return value;
            }
            if (token === 'pi') { consume(); return Math.PI; }
            if (token === 'sqrt') {
                consume();
                if (consume() !== '(') return null;
                const value = expression();
                if (consume() !== ')') return null;
                return value !== null && value >= 0 ? Math.sqrt(value) : null;
            }
            if (token === 'root') {
                consume();
                if (consume() !== '(') return null;
                const degree = expression();
                if (consume() !== ',') return null;
                const value = expression();
                if (consume() !== ')') return null;
                if (degree === null || value === null || degree === 0) return null;
                if (value < 0 && Math.abs(degree % 2) !== 1) return null;
                return value < 0 ? -Math.pow(-value, 1 / degree) : Math.pow(value, 1 / degree);
            }
            if (/^\d/.test(token || '')) { consume(); return Number(token); }
            return null;
        }

        function power() {
            let left = primary();
            if (left === null) return null;
            if (peek() === '^') {
                consume();
                const right = power();
                if (right === null) return null;
                left = Math.pow(left, right);
            }
            return left;
        }

        function term() {
            let left = power();
            if (left === null) return null;
            while (true) {
                const op = peek();
                if (op === '*' || op === '/') {
                    consume();
                    const right = power();
                    if (right === null || (op === '/' && right === 0)) return null;
                    left = op === '*' ? left * right : left / right;
                    continue;
                }
                if (startsFactor(op)) {
                    const right = power();
                    if (right === null) return null;
                    left *= right;
                    continue;
                }
                break;
            }
            return left;
        }

        function expression() {
            let left = term();
            if (left === null) return null;
            while (peek() === '+' || peek() === '-') {
                const op = consume();
                const right = term();
                if (right === null) return null;
                left = op === '+' ? left + right : left - right;
            }
            return left;
        }

        const result = expression();
        return index === tokens.length && Number.isFinite(result) ? result : null;
    }

    function equivalent(a, b) {
        const left = normalize(a);
        const right = normalize(b);
        if (!left || !right) return false;
        if (left === right) return true;

        const na = evaluateExpression(left);
        const nb = evaluateExpression(right);
        if (na !== null && nb !== null) {
            return Math.abs(na - nb) <= 1e-9 * Math.max(1, Math.abs(na), Math.abs(nb));
        }
        return false;
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
        submit.addEventListener('click', prepareEquivalentAnswers, true);
    }

    window.NetijaMathInput = { enhance, equivalent, evaluateExpression };

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
