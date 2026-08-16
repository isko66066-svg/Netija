const params = new URLSearchParams(window.location.search);
const testId = params.get('id');
const isValidTestId = /^[1-9]\d*$/.test(testId || '');

const titleEl = document.getElementById('testTitle');
if (titleEl) {
    titleEl.textContent = isValidTestId ? `Тест №${testId}` : 'Тест не найден';
}

if (!isValidTestId) {
    const quizContainer = document.getElementById('quizContainer');
    if (quizContainer) {
        quizContainer.textContent = 'Некорректный номер теста.';
    }
    throw new Error('Quiz loader: некорректный номер теста');
}

const script = document.createElement('script');
script.src = `js/questions/natcert-${testId}.js`;
script.onload = function() {
    if (typeof initQuiz === 'function') {
        initQuiz();
    }
};
script.onerror = function() {
    const quizContainer = document.getElementById('quizContainer');
    if (quizContainer) {
        quizContainer.textContent = 'Не удалось загрузить вопросы теста.';
    }
};
document.head.appendChild(script);
