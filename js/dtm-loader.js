(() => {
    const params = new URLSearchParams(location.search);
    const variant = params.get('variant') || 'variant-7';
    const allowed = new Set([
        'variant-7','variant-8','variant-9','variant-10','variant-12','variant-1982496','variant-2024',
        'me-1','me-2','me-3','me-4','me-5','me-6','me-7','me-8'
    ]);
    const selected = allowed.has(variant) ? variant : 'variant-7';

    function load(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `${src}?v=20260826-6`;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

    function installNavigationFix() {
        if (window.__netijaDtmNavigationFix) return;
        window.__netijaDtmNavigationFix = true;

        document.addEventListener('click', event => {
            const button = event.target.closest('.dtm-nav-number');
            if (!button) return;

            const index = Number(button.dataset.question);
            const target = document.getElementById(`dtm-question-${index}`);
            if (!target) return;

            // The old handler used smooth scrollIntoView(). On Safari this can
            // fight with MathJax layout/reflow and freeze the whole page.
            event.preventDefault();
            event.stopImmediatePropagation();

            const headerOffset = 90;
            const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
            window.scrollTo(0, Math.max(0, top));

            document.querySelectorAll('.dtm-nav-number').forEach((nav, navIndex) => {
                nav.classList.toggle('current', navIndex === index);
            });
        }, true);
    }

    load(`js/dtm-questions/${selected}.js`)
        .then(() => load('js/dtm-test.js'))
        .then(() => load('js/dtm-mixed-title.js'))
        .then(() => installNavigationFix())
        .catch(error => {
            console.error('DTM loader:', error);
            const root = document.getElementById('dtmTest');
            if (root) root.innerHTML = '<div class="dtm-result"><h2>Не удалось загрузить тест</h2><p>Попробуй обновить страницу.</p></div>';
        });
})();
