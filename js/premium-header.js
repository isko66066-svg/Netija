(function () {
    const BACKEND_URL = 'https://netija.onrender.com';
    const ACTIVE_TEXT = '👑 Premium активен';
    const DEFAULT_TEXT = '👑 Premium';

    function getUser() {
        try {
            return JSON.parse(localStorage.getItem('netija_user') || 'null');
        } catch {
            return null;
        }
    }

    function updateHeader(status) {
        const link = document.querySelector('.premium-nav-link');
        if (!link) return false;

        const active = !!status?.premium;
        link.textContent = active ? ACTIVE_TEXT : DEFAULT_TEXT;
        link.classList.toggle('premium-active', active);
        link.setAttribute('aria-label', active ? 'Premium активен' : 'Premium');
        return true;
    }

    async function checkPremium() {
        const user = getUser();

        if (!user?.email) {
            updateHeader({ premium: false });
            return;
        }

        try {
            const response = await fetch(
                `${BACKEND_URL}/api/premium/status?email=${encodeURIComponent(user.email)}`,
                { cache: 'no-store' }
            );

            if (!response.ok) {
                updateHeader({ premium: false });
                return;
            }

            updateHeader(await response.json());
        } catch {
            // Не меняем интерфейс на ошибку сети: оставляем обычную кнопку Premium.
        }
    }

    function init() {
        checkPremium();

        // После входа Google localStorage меняется в этой же вкладке,
        // поэтому небольшая повторная проверка нужна для первого входа.
        let attempts = 0;
        const loginCheck = setInterval(() => {
            checkPremium();
            attempts += 1;
            if (getUser()?.email || attempts >= 10) {
                clearInterval(loginCheck);
            }
        }, 1000);

        window.addEventListener('netija:auth-changed', checkPremium);
        window.addEventListener('pageshow', checkPremium);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
