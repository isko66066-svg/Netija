const params = new URLSearchParams(window.location.search);
const testId = params.get('id');

const titleEl = document.getElementById('testTitle');
if (titleEl) {
    titleEl.textContent = `Тест №${testId}`;
}

const script = document.createElement('script');
script.src = `js/questions/natcert-${testId}.js`;
script.onload = function() {
    if (typeof initQuiz === 'function') {
        initQuiz();
    }
};
document.head.appendChild(script);