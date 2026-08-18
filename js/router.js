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
    // MathJax уже загружен и готов
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
        callback();
        return;
    }

    // Скрипт MathJax уже добавлен в head, но ещё грузится —
    // просто ждём его готовности, не добавляя дубликат
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

    // Конфиг MathJax (дублирует конфиг из <head> natcert-test.html
    // на случай, если страница была открыта через SPA-переход,
    // а не напрямую)
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
    if (url.includes('natcert.html')) {
        loadScript('js/natcert_tests-list.js', () => {
            loadScript('js/render-cards.js');
        });
    }

    if (url.includes('natcert-test.html')) {
        // Сначала гарантируем готовность MathJax,
        // и только потом грузим вопросы и логику теста
        ensureMathJax(() => {
            loadScript('js/quiz-loader.js', () => {
                loadScript('js/quiz.js');
            });
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

document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href && link.href.startsWith(window.location.origin) && !link.hasAttribute('target')) {
        const url = new URL(link.href);
        if (url.pathname.endsWith('.html') || url.search) {
            e.preventDefault();
            loadPage(link.href);
        }
    }
});

window.addEventListener('popstate', (e) => {
    loadPage(window.location.href, false);
});