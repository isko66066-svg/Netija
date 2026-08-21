(function () {
    const BACKEND_URL = 'https://netija.onrender.com';
    const CACHE_KEY = 'netija_premium_header_status';
    const ACTIVE_TEXT = '👑 Premium активен';
    const DEFAULT_TEXT = '👑 Premium';

    function getUser() {
        try {
            return JSON.parse(localStorage.getItem('netija_user') || 'null');
        } catch {
            return null;
        }
    }

    function getCachedStatus() {
        try {
            const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
            if (!cached) return null;

            if (cached.premiumUntil) {
                const until = new Date(cached.premiumUntil).getTime();
                if (!Number.isFinite(until) || until <= Date.now()) {
                    return { premium: false };
                }
            }

            return cached;
        } catch {
            return null;
        }
    }

    function saveStatus(status) {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                premium: !!status?.premium,
                premiumUntil: status?.premiumUntil || null
            }));
        } catch {
            // localStorage may be unavailable.
        }
    }

    function hideHeaderNotification() {
        document.querySelectorAll('.site-notification').forEach((element) => {
            element.remove();
        });
    }

    function loadStyles() {
        if (document.getElementById('netija-premium-header-css')) return;

        const style = document.createElement('style');
        style.id = 'netija-premium-header-css';
        style.textContent = `
            /* The notification/reward button must never appear in the header. */
            .site-notification,
            .site-header .site-notification,
            .header .site-notification {
                display: none !important;
                visibility: hidden !important;
                width: 0 !important;
                min-width: 0 !important;
                max-width: 0 !important;
                height: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                border: 0 !important;
                overflow: hidden !important;
            }

            #googleSignInButton,
            .site-header #googleSignInButton,
            .header #googleSignInButton,
            .site-header .sign__button,
            .header .sign__button {
                display: none !important;
            }

            .premium-nav-link.premium-active {
                background: #1f9d63 !important;
                color: #fff !important;
                border-color: #1f9d63 !important;
            }
        `;
        document.head.appendChild(style);
    }

    function updateAuthControls() {
        const header = document.querySelector('.site-header, .header');
        if (header) header.classList.add('netija-authenticated');
        hideHeaderNotification();
    }

    function updateHeader(status) {
        const link = document.querySelector('.premium-nav-link');
        if (!link) return;

        const active = !!status?.premium;
        link.textContent = active ? ACTIVE_TEXT : DEFAULT_TEXT;
        link.classList.toggle('premium-active', active);
        link.setAttribute('aria-label', active ? 'Premium активен' : 'Premium');
    }

    function applyCachedStatus() {
        const cached = getCachedStatus();
        if (cached) updateHeader(cached);
    }

    async function checkPremium() {
        const user = getUser();
        updateAuthControls();

        if (!user?.email) {
            updateHeader({ premium: false });
            return;
        }

        try {
            const response = await fetch(
                `${BACKEND_URL}/api/premium/status?email=${encodeURIComponent(user.email)}`,
                { cache: 'no-store' }
            );

            if (!response.ok) return;

            const status = await response.json();
            saveStatus(status);
            updateHeader(status);
        } catch {
            // Keep the last known valid Premium state while the backend wakes up.
        }
    }

    function init() {
        loadStyles();
        updateAuthControls();
        applyCachedStatus();
        checkPremium();

        // menu.js creates the header dynamically, so keep the unwanted button
        // removed even if it is inserted after this script runs.
        const observer = new MutationObserver(() => hideHeaderNotification());
        observer.observe(document.documentElement, { childList: true, subtree: true });

        let attempts = 0;
        const loginCheck = setInterval(() => {
            updateAuthControls();
            checkPremium();
            attempts += 1;
            if (getUser()?.email || attempts >= 10) clearInterval(loginCheck);
        }, 1000);

        window.addEventListener('netija:auth-changed', () => {
            updateAuthControls();
            applyCachedStatus();
            checkPremium();
        });

        window.addEventListener('pageshow', () => {
            updateAuthControls();
            applyCachedStatus();
            checkPremium();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
