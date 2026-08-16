async function loadPage(url, pushState = true) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newMain = doc.getElementById('main');
        const newTitle = doc.querySelector('title');

        if (!newMain) {
            throw new Error(`Основной контент не найден: ${url}`);
        }

        loadPageStyles(doc);
        
        document.getElementById('main').innerHTML = newMain.innerHTML;

        if (newTitle) {
            document.title = newTitle.textContent;
        }
        
        if (pushState) {
            history.pushState({ url }, '', url);
        }
        
        await runPageScripts(url);
    } catch (error) {
        console.error('Ошибка загрузки страницы:', error);
        window.location.href = url;
    }
}

function loadPageStyles(doc) {
    doc.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
        const href = link.getAttribute('href');

        if (!href || document.querySelector(`link[rel="stylesheet"][href="${href}"]`)) {
            return;
        }

        const stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = href;
        document.head.appendChild(stylesheet);
    });
}

async function runPageScripts(url) {
    if (url.includes('natcert.html')) {
        await loadScript('js/natcert_tests-list.js');
        await loadScript('js/render-cards.js');
    }

    if (url.includes('natcert-test.html')) {
        ensureMathJaxConfig();
        if (!window.MathJax.typesetPromise) {
            await loadScript('https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js', {
                dynamicKey: 'mathjax'
            });
        }
        await loadScript('js/quiz.js');
        await loadScript('js/quiz-loader.js');
    }
}

function ensureMathJaxConfig() {
    window.MathJax = window.MathJax || {
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
}

function loadScript(src, options = {}) {
    const dynamicKey = options.dynamicKey || src;
    const existing = document.querySelector(`script[data-dynamic="${dynamicKey}"]`);

    if (existing) {
        existing.remove();
    }

    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.dataset.dynamic = dynamicKey;
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Не удалось загрузить скрипт: ${src}`));
        document.body.appendChild(script);
    });
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
