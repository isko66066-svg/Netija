// =========================================================
// ЗАЩИТА ОТ СЛУЧАЙНОГО УХОДА СО СТРАНИЦЫ ТЕСТА
// =========================================================
window.quizInProgress = false;
window.quizSubmitted = false;

let currentQuizUrl = window.location.pathname.includes('natcert-test.html')
    ? window.location.href
    : null;

function isLeavingActiveQuiz() {
    return window.quizInProgress === true && window.quizSubmitted !== true;
}

function confirmLeaveQuiz() {
    return window.confirm('Вы уверены, что хотите покинуть тест? Прогресс не будет сохранён.');
}

async function loadPage(url, pushState = true) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newMain = doc.getElementById('main');
        const newTitle = doc.querySelector('title')?.textContent || 'Netija';

        if (!newMain) {
            window.location.href = url;
            return;
        }

        document.getElementById('main').innerHTML = newMain.innerHTML;
        document.title = newTitle;

        const headerList = document.querySelector('.header__list');
        const burgerBtn = document.getElementById('burgerBtn');
        if (headerList) headerList.classList.remove('open');
        if (burgerBtn) burgerBtn.classList.remove('active');

        const links = document.querySelectorAll('.header__list-link, .premium-nav-link');
        links.forEach(link => {
            const linkPath = new URL(link.href, window.location.origin).pathname;
            const currentPath = new URL(url, window.location.origin).pathname;
            link.classList.toggle('active', linkPath === currentPath);
        });

        if (pushState) history.pushState({ url }, '', url);
        runPageScripts(url);
    } catch (error) {
        console.error('Ошибка загрузки страницы:', error);
        window.location.href = url;
    }
}

function ensureMathJax(callback) {
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
        callback();
        return;
    }

    const existingLoader = document.querySelector('script[data-mathjax-loader]');
    if (existingLoader) {
        const check = setInterval(() => {
            if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
                clearInterval(check);
                callback();
            }
        }, 50);
        return;
    }

    window.MathJax = {
        tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            macros: { tg: "\\operatorname{tg}", ctg: "\\operatorname{ctg}" }
        },
        svg: { fontCache: 'global' }
    };

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
    script.async = true;
    script.dataset.mathjaxLoader = 'true';
    script.onload = callback;
    document.head.appendChild(script);
}

function runPageScripts(url) {
    if (url.includes('natcert-test.html')) {
        currentQuizUrl = url;
        window.quizInProgress = true;
        window.quizSubmitted = false;
        ensureMathJax(() => {
            loadScript('js/quiz-loader.js', () => {
                loadScript('js/quiz.js', () => loadScript('js/exam-question-map-fix.js'));
            });
        });
        return;
    }

    window.quizInProgress = false;
    currentQuizUrl = null;

    if (url.includes('natcert.html')) {
        loadScript('js/natcert_tests-list.js', () => loadScript('js/render-cards.js'));
        return;
    }

    if (url.includes('premium.html')) {
        loadScript('js/premium-page.js');
    }
}

function loadScript(src, callback) {
    const existing = document.querySelector(`script[data-dynamic="${src}"]`);
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.src = src;
    script.dataset.dynamic = src;
    script.type = 'text/javascript';
    script.onload = callback || null;
    document.body.appendChild(script);
}

document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href && link.href.startsWith(window.location.origin) && !link.hasAttribute('target')) {
        const url = new URL(link.href);
        if (url.pathname.endsWith('.html') || url.search) {
            if (isLeavingActiveQuiz() && !confirmLeaveQuiz()) {
                e.preventDefault();
                return;
            }
            e.preventDefault();
            window.quizInProgress = false;
            loadPage(link.href);
        }
    }
});

window.addEventListener('popstate', () => {
    if (isLeavingActiveQuiz()) {
        if (!confirmLeaveQuiz()) {
            const restoreUrl = currentQuizUrl || window.location.href;
            history.pushState({ url: restoreUrl }, '', restoreUrl);
            return;
        }
        window.quizInProgress = false;
    }
    loadPage(window.location.href, false);
});

// На прямом открытии natcert-test.html подключаем фикс после
// загрузки основного router.js. Он отдельно исправляет 34/35.
if (window.location.pathname.includes('natcert-test.html')) {
    loadScript('js/exam-question-map-fix.js');
}
