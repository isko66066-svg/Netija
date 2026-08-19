(function () {
    const params = new URLSearchParams(window.location.search);
    const testId = params.get('id');

    const titleEl = document.getElementById('testTitle');
    if (titleEl) {
        titleEl.textContent = `Тест №${testId}`;
    }

    // Убираем предыдущий тег с вопросами, если он был
    // (актуально при переходе между тестами через роутер)
    const oldScript = document.querySelector('script[data-questions-loader]');
    if (oldScript) {
        oldScript.remove();
    }

    const script = document.createElement('script');
    script.src = `js/questions/natcert-${testId}.js`;
    script.dataset.questionsLoader = 'true';
    script.onload = function() {
        if (typeof initQuiz === 'function') {
            initQuiz();
        }
    };
    document.head.appendChild(script);
})();