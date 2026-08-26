(() => {
    const params = new URLSearchParams(location.search);
    const variant = params.get('variant');
    if (!/^me-[1-8]$/.test(variant || '')) return;
    const n = Number(variant.slice(3));
    const apply = () => {
        const title = document.querySelector('.dtm-test-title');
        if (title) title.textContent = `Test ${n}`;
    };
    apply();
    new MutationObserver(apply).observe(document.getElementById('dtmTest') || document.body, {childList:true, subtree:true});
})();
