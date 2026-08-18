(function () {
    const params = new URLSearchParams(window.location.search);
    const testId = params.get('id');

    const titleEl = document.getElementById('testTitle');
    if (titleEl) {
        titleEl.textContent = `Тест №${testId}`;
    }

    // убираем предыдущий скрипт с вопросами, если он был
    const oldScript = document.querySelector('script[data-questions-loader]');
    if (oldScript) oldScript.remove();

    // сбрасываем старые вопросы на случай гонки
    window.questions = undefined;

    const script = document.createElement('script');
    script.src = `js/questions/natcert-${testId}.js`;
    script.dataset.questionsLoader = 'true';
    script.onload = function () {
        if (typeof initQuiz === 'function') {
            initQuiz();
        }
    };
    document.head.appendChild(script);
})();