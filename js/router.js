// =========================================================
// ЗАЩИТА ОТ СЛУЧАЙНОГО УХОДА СО СТРАНИЦЫ ТЕСТА
// window.quizInProgress — true, пока тест идёт и не сдан
//                          (выставляется в quiz.js)
// window.quizSubmitted  — true, как только тест сдан
//                          (выставляется в quiz.js)
// =========================================================

window.quizInProgress = false;
window.quizSubmitted = false;

// Если страница была открыта напрямую как natcert-test.html
// (полная перезагрузка, а не переход через роутер) —
// запоминаем её адрес сразу, чтобы popstate мог восстановить его
let currentQuizUrl = window.location.pathname.includes('natcert-test.html')
    ? window.location.href
    : null;

function isLeavingActiveQuiz() {
    return window.quizInProgress === true && window.quizSubmitted !== true;
}

function confirmLeaveQuiz() {
    return window.confirm(
        'Вы уверены, что хотите покинуть тест? Прогресс не будет сохранён.'
    );
}

async function loadPage(url, pushState = true) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newMain = doc.getElementById('main');
        const newTitle = doc.querySelector('title').textContent;
        
        document.getElementById('main').innerHTML = newMain.innerHTML;
        document.title = newTitle;

        // Закрываем бургер-меню, если оно было открыто
        const headerList = document.querySelector('.header__list');
        const burgerBtn = document.getElementById('burgerBtn');
        if (headerList) headerList.classList.remove('open');
        if (burgerBtn) burgerBtn.classList.remove('active');

        // Обновляем активную ссылку в меню
        const links = document.querySelectorAll('.header__list-link');
        links.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            const currentPath = new URL(url, window.location.origin).pathname;
            if (linkPath === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        if (pushState) {
            history.pushState({ url }, '', url);
        }
        
        runPageScripts(url);
    } catch (error) {
        console.error('Ошибка загрузки страницы:', error);
        window.location.href = url;
    }
}

// =========================================================
// MATHJAX
// Гарантирует, что MathJax загружен и готов к работе,
// независимо от того, зашли мы на страницу теста через
// полную перезагрузку или через SPA-переход (router.js
// подменяет только innerHTML #main и НЕ трогает <head>,
// поэтому при SPA-переходе MathJax может отсутствовать).
// =========================================================

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
            inlineMath: [
                ['$', '$'],
                ['\\(', '\\)']
            ],
            displayMath: [
                ['$$', '$$'],
                ['\\[', '\\]']
            ],
            macros: {
                tg: "\\operatorname{tg}",
                ctg: "\\operatorname{ctg}"
            }
        },
        svg: {
            fontCache: 'global'
        }
    };

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
    script.async = true;
    script.dataset.mathjaxLoader = 'true';
    script.onload = callback;
    document.head.appendChild(script);
}

// =========================================================
// ЗАГРУЗКА СКРИПТОВ СТРАНИЦЫ
// =========================================================

function runPageScripts(url) {

    if (url.includes('natcert-test.html')) {
        // Заходим на страницу теста — запоминаем url
        // и включаем защиту от случайного ухода
        currentQuizUrl = url;
        window.quizInProgress = true;
        window.quizSubmitted = false;

        ensureMathJax(() => {
            loadScript('js/quiz-loader.js', () => {
                loadScript('js/quiz.js');
            });
        });
        return;
    }

    // Уходим со страницы теста на любую другую страницу —
    // защита больше не нужна
    window.quizInProgress = false;
    currentQuizUrl = null;

    if (url.includes('natcert.html')) {
        loadScript('js/natcert_tests-list.js', () => {
            loadScript('js/render-cards.js');
        });
    }
}

function loadScript(src, callback) {
    const existing = document.querySelector(`script[data-dynamic="${src}"]`);
    if (existing) existing.remove();
    
    const script = document.createElement('script');
    script.src = src;
    script.dataset.dynamic = src;
    script.onload = callback || null;
    document.body.appendChild(script);
}

// =========================================================
// КЛИКИ ПО ССЫЛКАМ
// =========================================================

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

// =========================================================
// КНОПКА "НАЗАД" / "ВПЕРЁД" БРАУЗЕРА
// =========================================================

window.addEventListener('popstate', () => {
    if (isLeavingActiveQuiz()) {
        if (!confirmLeaveQuiz()) {
            // Пользователь передумал — возвращаем адрес теста
            // обратно в историю. Содержимое #main не трогаем,
            // тест остаётся как был, ничего не сбрасывается.
            const restoreUrl = currentQuizUrl || window.location.href;
            history.pushState({ url: restoreUrl }, '', restoreUrl);
            return;
        }
        window.quizInProgress = false;
    }

    loadPage(window.location.href, false);
});