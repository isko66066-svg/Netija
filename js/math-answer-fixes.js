/* =========================================================
   МАТЕМАТИЧЕСКИЕ ОТКРЫТЫЕ ОТВЕТЫ
   Считает эквивалентные дроби одинаковыми:
   2/3 = 4/6 = (8)/(12) и т.д.
   ========================================================= */
(function () {
    'use strict';

    if (window.__netijaMathAnswerFixesLoaded) return;
    window.__netijaMathAnswerFixesLoaded = true;

    function clean(value) {
        return String(value ?? '')
            .trim()
            .replace(/\s+/g, '')
            .replace(/,/g, '.')
            .replace(/[⁄]/g, '/')
            .toLowerCase();
    }

    function unwrap(value) {
        let result = clean(value);
        let changed = true;
        while (changed) {
            changed = false;
            const match = result.match(/^\((.*)\)$/);
            if (match && match[1] && balanced(match[1])) {
                result = match[1];
                changed = true;
            }
        }
        return result;
    }

    function balanced(value) {
        let depth = 0;
        for (const char of value) {
            if (char === '(') depth++;
            if (char === ')') depth--;
            if (depth < 0) return false;
        }
        return depth === 0;
    }

    function parseInteger(value) {
        const text = unwrap(value);
        if (!/^[+-]?\d+$/.test(text)) return null;
        return BigInt(text);
    }

    function parseFraction(value) {
        const text = clean(value)
            .replace(/^\$+|\$+$/g, '')
            .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1)/($2)');

        const match = text.match(/^\(?([+-]?\d+)\)?\/\(?([+-]?\d+)\)?$/);
        if (!match || match[2] === '0') return null;

        let numerator = BigInt(match[1]);
        let denominator = BigInt(match[2]);
        if (denominator < 0n) {
            numerator = -numerator;
            denominator = -denominator;
        }

        const gcd = (a, b) => {
            a = a < 0n ? -a : a;
            b = b < 0n ? -b : b;
            while (b) [a, b] = [b, a % b];
            return a;
        };

        const divisor = gcd(numerator, denominator);
        return [numerator / divisor, denominator / divisor];
    }

    function equivalent(a, b) {
        const left = parseFraction(a);
        const right = parseFraction(b);
        if (left && right) return left[0] === right[0] && left[1] === right[1];

        const leftInt = parseInteger(a);
        const rightInt = parseInteger(b);
        if (leftInt !== null && rightInt !== null) return leftInt === rightInt;

        const leftNumber = Number(clean(a));
        const rightNumber = Number(clean(b));
        return Number.isFinite(leftNumber) && Number.isFinite(rightNumber)
            ? Math.abs(leftNumber - rightNumber) < 1e-9
            : false;
    }

    function makeExactEquivalentBeforeSubmit() {
        if (!Array.isArray(window.questions)) return;

        window.questions.forEach((question) => {
            if (question.type !== 'open_ended' || !Array.isArray(question.subQuestions)) return;

            question.subQuestions.forEach((sub) => {
                const input = document.querySelector(
                    `input[data-question-id="${question.id}"][data-sub-id="${sub.id}"]`
                );
                if (!input || !input.value.trim()) return;

                if (equivalent(input.value, sub.correctAnswer)) {
                    input.value = String(sub.correctAnswer);
                }
            });
        });
    }

    function attach() {
        const submit = document.getElementById('submitBtn');
        if (!submit || submit.dataset.mathAnswerFixAttached === '1') return;
        submit.dataset.mathAnswerFixAttached = '1';
        submit.addEventListener('click', makeExactEquivalentBeforeSubmit, true);
    }

    window.NetijaMathAnswers = { attach, equivalent };
    attach();
    document.addEventListener('netija:quizRendered', attach);
})();
