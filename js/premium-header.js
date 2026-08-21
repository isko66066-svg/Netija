(function () {
    const BACKEND_URL = 'https://netija.onrender.com';
    const ACTIVE_TEXT = '👑 Premium активен';
    const DEFAULT_TEXT = '👑 Premium';
    const CACHE_KEY = 'netija_premium_header_status';

    function getUser() {
        try {
            return JSON.parse(localStorage.getItem('netija_user') || 'null');
        } catch {
            return null;
        }
    }

    function loadStyles() {
        if (document.getElementById('netija-premium-header-css')) return;

        const style = document.createElement('style');
        style.id = 'netija-premium-header-css';
        style.textContent = `
            .premium-nav-link.premium-active {
                background: #1f9d63 !important;
                color: #fff !important;
                border-color: #1f9d63 !important;
            }
        `;
        document.head.appendChild(style);
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

    function saveCachedStatus(user, status) {
        if (!user?.email) return;

        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                email: user.email,
                premium: !!status?.premium,
                premiumUntil: status?.premiumUntil || null,
                savedAt: Date.now()
            }));
        } catch {
            // Cache is only a visual optimization; server status remains authoritative.
        }
    }

    function getCachedStatus(user) {
        if (!user?.email) return null;

        try {
            const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
            if (!cached || cached.email !== user.email) return null;

            // Never show a cached Premium state after its known expiry time.
            if (cached.premium && cached.premiumUntil) {
                const until = new Date(cached.premiumUntil).getTime();
                if (!Number.isNaN(until) && until <= Date.now()) {
                    return { premium: false };
                }
            }

            return {
                premium: !!cached.premium,
                premiumUntil: cached.premiumUntil || null
            };
        } catch {
            return null;
        }
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

            if (!response.ok) return;

            const status = await response.json();
            saveCachedStatus(user, status);
            updateHeader(status);
        } catch {
            // Keep the cached visual state if the network is temporarily unavailable.
        }
    }

    function init() {
        loadStyles();

        const user = getUser();
        const cachedStatus = getCachedStatus(user);

        // Apply the last confirmed server state immediately, before the network request.
        // This prevents the Premium button from flashing back to the default state
        // while moving between Netija pages.
        if (cachedStatus) {
            updateHeader(cachedStatus);
        }

        checkPremium();

        let attempts = 0;
        const loginCheck = setInterval(() => {
            const currentUser = getUser();
            const currentCachedStatus = getCachedStatus(currentUser);

            if (currentCachedStatus) {
                updateHeader(currentCachedStatus);
            }

            checkPremium();
            attempts += 1;
            if (currentUser?.email || attempts >= 10) {
                clearInterval(loginCheck);
            }
        }, 1000);

        window.addEventListener('netija:auth-changed', () => {
            const currentUser = getUser();
            const currentCachedStatus = getCachedStatus(currentUser);
            updateHeader(currentCachedStatus || { premium: false });
            checkPremium();
        });

        window.addEventListener('pageshow', () => {
            const currentUser = getUser();
            const currentCachedStatus = getCachedStatus(currentUser);
            if (currentCachedStatus) updateHeader(currentCachedStatus);
            checkPremium();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
