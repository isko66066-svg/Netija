// =========================================================
// РЕЗУЛЬТАТЫ ЭКЗАМЕНА: правильные ответы + возврат наверх на телефоне
// =========================================================
(function () {
    if (window.__netijaExamResultFixesLoaded) return;
    window.__netijaExamResultFixesLoaded = true;

    function escapeHtml(text) {
        return String(text ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function showOpenEndedAnswers() {
        if (!Array.isArray(window.questions)) return;

        window.questions.forEach((q) => {
            if (q.type !== 'open_ended') return;

            const block = document.getElementById(`question-block-${q.id}`);
            if (!block || !Array.isArray(q.subQuestions)) return;

            q.subQuestions.forEach((sub) => {
                const input = block.querySelector(
                    `input[data-question-id="${q.id}"][data-sub-id="${sub.id}"]`
                );
                if (!input) return;

                const subBlock = input.closest('.sub-question-item');
                if (!subBlock || subBlock.querySelector('.open-ended-correct-answer')) return;

                const answer = document.createElement('div');
                answer.className = 'open-ended-correct-answer correct-hint';
                answer.innerHTML = `<strong>Правильный ответ:</strong> ${escapeHtml(sub.correctAnswer)}`;
                input.insertAdjacentElement('afterend', answer);

                if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
                    window.MathJax.typesetPromise([answer]).catch(() => {});
                }
            });
        });
    }

    function scrollToTopOnMobile() {
        if (window.innerWidth > 900) return;

        // Ждём появления блока результата, затем плавно возвращаемся к началу.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            });
        });
    }

    document.addEventListener('netija:testSubmitted', function () {
        showOpenEndedAnswers();
        scrollToTopOnMobile();
    });

    // При SPA-переходе тест может отрисоваться после загрузки этого файла.
    document.addEventListener('netija:quizRendered', function () {
        if (window.quizSubmitted) showOpenEndedAnswers();
    });
})();
