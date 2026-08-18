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

function runPageScripts(url) {
    if (url.includes('natcert.html')) {
        loadScript('js/natcert_tests-list.js', () => {
            loadScript('js/render-cards.js');
        });
    }
    if (url.includes('natcert-test.html')) {
        loadScript('js/quiz-loader.js', () => {
            loadScript('js/quiz.js');
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
