(() => {
    const params = new URLSearchParams(location.search);
    const variant = params.get('variant') || 'variant-7';
    const user = (() => {
        try { return JSON.parse(localStorage.getItem('netija_user') || 'null'); } catch { return null; }
    })();
    const userKey = user?.sub || user?.email || user?.id || 'guest';
    const key = `netija_dtm_progress_${userKey}_${variant}`;

    const load = () => {
        try { return JSON.parse(localStorage.getItem(key) || 'null') || { answers: {}, reviewed: false }; }
        catch { return { answers: {}, reviewed: false }; }
    };
    const save = state => localStorage.setItem(key, JSON.stringify(state));

    function restore() {
        const state = load();
        const buttons = [...document.querySelectorAll('#dtmTest .dtm-option[data-question][data-answer]')];
        if (!buttons.length) return false;

        for (const [index, answer] of Object.entries(state.answers || {})) {
            const button = buttons.find(b => b.dataset.question === index && b.dataset.answer === answer);
            if (button && !button.disabled) button.click();
        }

        if (state.reviewed) {
            const finish = document.getElementById('finishTest');
            if (finish && !finish.classList.contains('reviewed')) finish.click();
        }
        return true;
    }

    document.addEventListener('click', event => {
        const option = event.target.closest('#dtmTest .dtm-option[data-question][data-answer]');
        if (option && !option.disabled) {
            const state = load();
            state.answers[option.dataset.question] = option.dataset.answer;
            state.reviewed = false;
            save(state);
            return;
        }

        const finish = event.target.closest('#finishTest');
        if (finish && !finish.classList.contains('reviewed')) {
            const state = load();
            state.reviewed = true;
            save(state);
        }
    }, true);

    const observer = new MutationObserver(() => restore());
    observer.observe(document.getElementById('dtmTest') || document.body, { childList: true, subtree: true });
    restore();
})();
