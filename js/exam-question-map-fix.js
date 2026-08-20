(function () {
    const EXPECTED = 45;
    const resultByNumber = new Map();

    function getBlocks() {
        return Array.from(document.querySelectorAll('#quizContainer .question-block'));
    }

    function findBlockForNumber(id) {
        const direct = document.getElementById(`question-block-${id}`);
        if (direct) return direct;

        return getBlocks().find(block =>
            block.querySelector(`select[data-item-id="${id}"]`) ||
            Array.from(block.querySelectorAll('.sub-question-text')).some(el =>
                new RegExp(`^\\s*${id}\\.`).test(el.textContent || '')
            )
        ) || null;
    }

    function isAnsweredForNumber(block, id) {
        if (!block) return false;

        const select = block.querySelector(`select[data-item-id="${id}"]`);
        if (select) return select.value !== '';

        const input = block.querySelector(`input[data-question-id="${id}"]`);
        if (input) return input.value.trim() !== '';

        return !!block.querySelector('input[type="radio"]:checked') ||
            Array.from(block.querySelectorAll('input[type="text"]')).some(i => i.value.trim() !== '') ||
            Array.from(block.querySelectorAll('select')).some(s => s.value !== '');
    }

    function patchQuestionMap() {
        const grid = document.getElementById('questionGrid');
        if (!grid) return;

        const buttons = Array.from(grid.querySelectorAll('.question-number'));
        if (buttons.length !== EXPECTED) return;

        for (let id = 1; id <= EXPECTED; id++) {
            const button = buttons[id - 1];
            const block = findBlockForNumber(id);
            if (!button || !block) continue;

            button.disabled = false;
            button.classList.remove('missing');
            button.title = `Перейти к вопросу ${id}`;
            button.onclick = event => {
                event.preventDefault();
                event.stopPropagation();
                block.scrollIntoView({ behavior: 'smooth', block: 'start' });
            };

            const result = resultByNumber.get(String(id));
            const answered = isAnsweredForNumber(block, id);
            button.classList.toggle('answered', answered && !window.quizSubmitted);
            button.classList.toggle('correct', !!result && result.isCorrect === true);
            button.classList.toggle('incorrect', !!result && result.isCorrect === false);
        }
    }

    function captureResults(event) {
        resultByNumber.clear();
        const details = event?.detail?.details || [];
        details.forEach(item => resultByNumber.set(String(item.number), item));
        patchQuestionMap();
        requestAnimationFrame(patchQuestionMap);
        setTimeout(patchQuestionMap, 100);
        setTimeout(patchQuestionMap, 300);
    }

    document.addEventListener('netija:testSubmitted', captureResults);
    document.addEventListener('netija:quizRendered', () => {
        setTimeout(patchQuestionMap, 0);
        setTimeout(patchQuestionMap, 100);
        setTimeout(patchQuestionMap, 400);
    });

    function start() {
        const container = document.getElementById('quizContainer');
        if (container) {
            const observer = new MutationObserver(patchQuestionMap);
            observer.observe(container, { childList: true, subtree: true });
        }
        patchQuestionMap();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
        start();
    }

    // Загружаем фикс правильных ответов и возврата наверх после завершения.
    const existing = document.querySelector('script[data-exam-result-fixes]');
    if (!existing) {
        const script = document.createElement('script');
        script.src = 'js/exam-result-fixes.js';
        script.dataset.examResultFixes = 'true';
        document.body.appendChild(script);
    }
})();
