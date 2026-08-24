(() => {
    const params = new URLSearchParams(location.search);
    const variant = params.get('variant') || 'variant-7';
    const allowed = new Set(['variant-7','variant-8','variant-9','variant-10','variant-12','variant-1982496','variant-2024']);
    const selected = allowed.has(variant) ? variant : 'variant-7';

    function load(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `${src}?v=20260824`;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

    load(`js/dtm-questions/${selected}.js`)
        .then(() => load('js/dtm-test.js'))
        .catch(error => {
            console.error('DTM loader:', error);
            const root = document.getElementById('dtmTest');
            if (root) root.innerHTML = '<div class="dtm-result"><h2>Не удалось загрузить тест</h2><p>Попробуй обновить страницу.</p></div>';
        });
})();
