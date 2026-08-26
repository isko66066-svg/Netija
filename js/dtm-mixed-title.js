(() => {
    const params = new URLSearchParams(location.search);
    const variant = params.get('variant');

    if (!/^me-[1-8]$/.test(variant || '')) return;

    const n = Number(variant.slice(3));
    const title = document.querySelector('.dtm-test-title');

    if (title) {
        title.textContent = `Test ${n}`;
    }
})();
