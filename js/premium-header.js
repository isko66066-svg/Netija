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
                if (!Number.isFinite(until) || until <= Date.now()) return { premium: false };
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
        } catch (_) {}
    }

    function hideHeaderNotification() {
        document.querySelectorAll('.site-notification').forEach((element) => element.remove());
    }

    function loadStyles() {
        if (document.getElementById('netija-premium-header-css')) return;

        const style = document.createElement('style');
        style.id = 'netija-premium-header-css';
        style.textContent = `
            .site-notification,
            .site-header .site-notification,
            .header .site-notification {
                display:none!important;
                visibility:hidden!important;
                width:0!important;
                min-width:0!important;
                max-width:0!important;
                height:0!important;
                margin:0!important;
                padding:0!important;
                border:0!important;
                overflow:hidden!important;
            }

            .premium-nav-link.premium-active {
                background:#1f9d63!important;
                color:#fff!important;
                border-color:#1f9d63!important;
            }

            /* Mobile only. Desktop header is not changed here. */
            @media (max-width:700px){
                body.menu-lock{overflow:hidden!important;touch-action:none!important}

                body .site-header.menu-open::after{
                    content:"";
                    position:fixed!important;
                    inset:0!important;
                    background:rgba(1,8,20,.68)!important;
                    backdrop-filter:blur(2px)!important;
                    -webkit-backdrop-filter:blur(2px)!important;
                    z-index:1!important;
                    pointer-events:auto!important;
                }

                body .site-header .header__list{
                    position:fixed!important;
                    top:58px!important;
                    right:0!important;
                    left:auto!important;
                    width:min(78vw,680px)!important;
                    height:calc(100dvh - 58px)!important;
                    margin:0!important;
                    padding:18px 18px 30px!important;
                    display:flex!important;
                    flex-direction:column!important;
                    justify-content:flex-start!important;
                    align-items:stretch!important;
                    gap:0!important;
                    overflow-y:auto!important;
                    overflow-x:hidden!important;
                    overscroll-behavior:contain!important;
                    -webkit-overflow-scrolling:touch!important;
                    background:#071a31!important;
                    border:0!important;
                    border-left:1px solid rgba(113,157,225,.16)!important;
                    border-radius:24px 0 0 0!important;
                    box-shadow:-24px 0 70px rgba(0,0,0,.42)!important;
                    transform:translateX(102%)!important;
                    opacity:1!important;
                    visibility:hidden!important;
                    pointer-events:none!important;
                    transition:transform .30s cubic-bezier(.22,.8,.22,1),visibility 0s linear .30s!important;
                    z-index:3!important;
                }

                body .site-header.menu-open .header__list{
                    transform:translateX(0)!important;
                    visibility:visible!important;
                    pointer-events:auto!important;
                    transition:transform .30s cubic-bezier(.22,.8,.22,1),visibility 0s linear 0s!important;
                }

                /* Remove the old decorative strip above Premium. */
                body .site-header .header__list::before{display:none!important;content:none!important}
                body .site-header .header__list::after{display:none!important;content:none!important}

                body .site-header .mobile-premium-item::before,
                body .site-header .mobile-premium-item::after,
                body .site-header .mobile-premium-card::before,
                body .site-header .mobile-premium-card::after{
                    content:none!important;
                    display:none!important;
                }

                body .site-header .mobile-premium-item{
                    display:block!important;
                    flex:0 0 auto!important;
                    padding:0!important;
                    margin:0 0 14px!important;
                    border:0!important;
                    background:none!important;
                }

                body .site-header .mobile-premium-card{
                    position:relative!important;
                    min-height:112px!important;
                    width:100%!important;
                    margin:0!important;
                    padding:14px 14px!important;
                    display:grid!important;
                    grid-template-columns:48px minmax(0,1fr) 44px 18px!important;
                    align-items:center!important;
                    gap:10px!important;
                    border-radius:20px!important;
                    background:linear-gradient(115deg,#4c1f93 0%,#29205d 53%,#123866 100%)!important;
                    border:1px solid rgba(127,103,218,.34)!important;
                    box-shadow:0 12px 34px rgba(24,8,64,.30),inset 0 1px 0 rgba(255,255,255,.06)!important;
                    color:#fff!important;
                    overflow:hidden!important;
                }

                body .site-header .mobile-premium-icon{
                    width:48px!important;
                    height:48px!important;
                    min-width:48px!important;
                    display:flex!important;
                    align-items:center!important;
                    justify-content:center!important;
                    border-radius:15px!important;
                    background:rgba(255,255,255,.08)!important;
                    color:#ffd83d!important;
                    box-shadow:none!important;
                }
                body .site-header .mobile-premium-icon svg{display:none!important}
                body .site-header .mobile-premium-icon::before{
                    content:""!important;
                    width:29px!important;
                    height:29px!important;
                    display:block!important;
                    background:center/contain no-repeat!important;
                    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23FFD83D' d='m3 7 4.2 3.2L12 4l4.8 6.2L21 7l-1.6 12H4.6L3 7Z'/%3E%3Cpath fill='%23FFD83D' d='M6 21h12v1H6z'/%3E%3C/svg%3E")!important;
                }

                body .site-header .mobile-premium-copy{
                    min-width:0!important;
                    display:flex!important;
                    flex-direction:column!important;
                    justify-content:center!important;
                    gap:4px!important;
                    overflow:visible!important;
                }
                body .site-header .mobile-premium-copy strong{
                    display:block!important;
                    margin:0!important;
                    padding:0!important;
                    font-size:15px!important;
                    line-height:1.15!important;
                    font-weight:700!important;
                    white-space:nowrap!important;
                    overflow:visible!important;
                    text-overflow:clip!important;
                }
                body .site-header .mobile-premium-copy small{
                    display:block!important;
                    margin:0!important;
                    padding:0!important;
                    font-size:11px!important;
                    line-height:1.25!important;
                    font-weight:400!important;
                    color:rgba(255,255,255,.82)!important;
                    white-space:normal!important;
                    overflow:visible!important;
                    text-overflow:clip!important;
                }

                body .site-header .mobile-premium-avatar{
                    width:44px!important;
                    height:44px!important;
                    min-width:44px!important;
                    border-radius:50%!important;
                    background:rgba(92,84,187,.85) center/cover no-repeat!important;
                    border:2px solid rgba(255,255,255,.88)!important;
                    box-shadow:0 0 0 2px rgba(130,118,235,.25)!important;
                }
                body .site-header .mobile-premium-arrow{
                    display:flex!important;
                    align-items:center!important;
                    justify-content:center!important;
                    font-size:30px!important;
                    line-height:1!important;
                    font-weight:300!important;
                    color:#dbe5f2!important;
                }

                body .site-header .menu-nav-item,
                body .site-header .account-item,
                body .site-header .login-item{
                    position:relative!important;
                    display:block!important;
                    flex:0 0 auto!important;
                    width:100%!important;
                    padding:0!important;
                    margin:0!important;
                    border:0!important;
                    background:transparent!important;
                }

                body .site-header .header__list-link,
                body .site-header .account-item-link{
                    position:relative!important;
                    width:100%!important;
                    min-height:76px!important;
                    height:76px!important;
                    margin:0!important;
                    padding:0 46px 0 20px!important;
                    display:flex!important;
                    align-items:center!important;
                    justify-content:flex-start!important;
                    gap:18px!important;
                    border:0!important;
                    border-radius:0!important;
                    background:transparent!important;
                    box-shadow:none!important;
                    color:#f4f7fb!important;
                    font-size:15px!important;
                    font-weight:600!important;
                    line-height:1.25!important;
                    text-align:left!important;
                    white-space:normal!important;
                }

                /* Only one arrow: the CSS arrow. Hide the literal span from menu.js. */
                body .site-header .menu-arrow{display:none!important}
                body .site-header .header__list-link::after,
                body .site-header .account-item-link::after{
                    content:"›"!important;
                    position:absolute!important;
                    right:18px!important;
                    top:50%!important;
                    transform:translateY(-52%)!important;
                    display:flex!important;
                    align-items:center!important;
                    justify-content:center!important;
                    width:14px!important;
                    height:24px!important;
                    color:#cbd7e5!important;
                    font-size:29px!important;
                    line-height:1!important;
                    font-weight:300!important;
                }
                body .site-header .header__list-link.active::after{
                    content:"›"!important;
                    background:none!important;
                    border-radius:0!important;
                    color:#fff!important;
                }

                body .site-header .menu-nav-item + .menu-nav-item .header__list-link::before,
                body .site-header .account-item + .account-item .account-item-link::before{
                    content:""!important;
                    position:absolute!important;
                    left:20px!important;
                    right:20px!important;
                    top:0!important;
                    height:1px!important;
                    background:rgba(107,143,193,.16)!important;
                }

                body .site-header .header__list-link.active{
                    min-height:76px!important;
                    height:76px!important;
                    padding-left:20px!important;
                    background:linear-gradient(100deg,rgba(24,91,185,.76),rgba(19,67,143,.55))!important;
                    border-radius:20px!important;
                    box-shadow:inset 0 1px 0 rgba(123,176,255,.08),inset 0 -1px 0 rgba(0,0,0,.08)!important;
                }
                body .site-header .header__list-link.active::before{display:none!important}

                body .site-header .menu-icon,
                body .site-header .account-inline-icon{
                    position:relative!important;
                    width:46px!important;
                    height:46px!important;
                    min-width:46px!important;
                    flex:0 0 46px!important;
                    display:flex!important;
                    align-items:center!important;
                    justify-content:center!important;
                    border-radius:14px!important;
                    box-shadow:none!important;
                    border:0!important;
                }
                body .site-header .menu-icon svg,
                body .site-header .account-inline-icon svg{display:none!important}

                body .site-header .menu-icon--home{background:rgba(19,83,190,.42)!important;color:#4d9cff!important}
                body .site-header .menu-icon--home::before{
                    content:""!important;width:28px!important;height:28px!important;display:block!important;background:center/contain no-repeat!important;
                    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%233A8DFF' d='M3 10.2 12 3l9 7.2v10.1h-6.4v-5.7H9.4v5.7H3z'/%3E%3C/svg%3E")!important;
                }
                body .site-header .menu-icon--dtm{background:rgba(88,42,157,.43)!important;color:#c38aff!important}
                body .site-header .menu-icon--dtm::before{
                    content:""!important;width:29px!important;height:29px!important;display:block!important;background:center/contain no-repeat!important;
                    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23B987FF' d='m2.4 9.1 9.6-5 9.6 5-9.6 5-9.6-5Z'/%3E%3Cpath fill='%23B987FF' d='M6.1 11.1v5.1c3.2 2.4 8.6 2.4 11.8 0v-5.1L12 14.2z'/%3E%3Cpath fill='%23B987FF' d='M20.1 9.8h1.2v6.1h-1.2z'/%3E%3C/svg%3E")!important;
                }
                body .site-header .menu-icon--natcert{background:rgba(18,111,218,.44)!important;color:#23d5ff!important}
                body .site-header .menu-icon--natcert::before{
                    content:""!important;width:28px!important;height:28px!important;display:block!important;background:center/contain no-repeat!important;
                    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%2300CFFF' d='m12 2.7 8 4.6v9.4l-8 4.6-8-4.6V7.3z'/%3E%3Cpath fill='%230A63C7' d='m12 6.8 4.5 2.6v5.2L12 17.2l-4.5-2.6V9.4z'/%3E%3C/svg%3E")!important;
                }

                body .site-header .account-inline-icon{background:rgba(0,132,148,.36)!important;color:#39e8f5!important}
                body .site-header .account-inline-icon::before{content:""!important;width:28px!important;height:28px!important;display:block!important;background:center/contain no-repeat!important}
                body .site-header .account-item:nth-last-child(3) .account-inline-icon::before{
                    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='7.5' r='4' fill='%233DE7F0'/%3E%3Cpath fill='%233DE7F0' d='M4.5 20c.8-4.2 3.3-6.4 7.5-6.4s6.7 2.2 7.5 6.4z'/%3E%3C/svg%3E")!important;
                }
                body .site-header .account-item:nth-last-child(2) .account-inline-icon{background:rgba(0,111,80,.36)!important}
                body .site-header .account-item:nth-last-child(2) .account-inline-icon::before{
                    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%234CF0A1' d='m14.6 4.2 5.2 5.2-9.6 9.6-5.7.5.5-5.7z'/%3E%3Cpath fill='%230A6B4E' d='m16.3 2.5 1.2-1.2 5.2 5.2-1.2 1.2z'/%3E%3Cpath fill='%234CF0A1' d='M4 20.5h16v1H4z'/%3E%3C/svg%3E")!important;
                }
                body .site-header .account-item-link--danger{color:#ff8f92!important}
                body .site-header .account-item-link--danger .account-inline-icon{background:rgba(137,43,61,.40)!important}
                body .site-header .account-item:has(.account-item-link--danger) .account-inline-icon::before{
                    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23FF7E86' stroke-width='2.1' stroke-linecap='round' stroke-linejoin='round' d='M10 4H5v16h5M13 8l4 4-4 4M17 12H8'/%3E%3C/svg%3E")!important;
                }

                /* Google sign-in block: clean, centered, never overlaps menu items. */
                body .site-header .login-item{
                    margin:8px 0 8px!important;
                    padding:12px 4px 14px!important;
                    border-top:1px solid rgba(107,143,193,.16)!important;
                    border-bottom:1px solid rgba(107,143,193,.16)!important;
                    text-align:center!important;
                }
                body .site-header .login-item-label{
                    margin:0 0 8px!important;
                    color:rgba(255,255,255,.86)!important;
                    font:600 13px/1.2 Poppins,sans-serif!important;
                    text-align:left!important;
                }
                body .site-header .login-item-button{
                    width:100%!important;
                    min-height:44px!important;
                    display:flex!important;
                    align-items:center!important;
                    justify-content:center!important;
                    overflow:hidden!important;
                    border-radius:10px!important;
                    background:#fff!important;
                }
                body .site-header .login-item-button > div{margin:0 auto!important;max-width:100%!important}
                body .site-header #googleSignInButtonMobile iframe{max-width:100%!important}

                /* Keep account text from colliding with the arrow. */
                body .site-header .account-item-link{padding-right:46px!important;min-width:0!important}

                @media (max-width:390px){
                    body .site-header .header__list{width:84vw!important;padding:16px 12px 24px!important}
                    body .site-header .mobile-premium-card{grid-template-columns:44px minmax(0,1fr) 38px 16px!important;gap:8px!important;min-height:104px!important;padding:13px!important}
                    body .site-header .mobile-premium-icon{width:44px!important;height:44px!important;min-width:44px!important}
                    body .site-header .mobile-premium-avatar{width:38px!important;height:38px!important;min-width:38px!important}
                    body .site-header .mobile-premium-copy strong{font-size:14px!important}
                    body .site-header .mobile-premium-copy small{font-size:10px!important}
                    body .site-header .header__list-link,
                    body .site-header .account-item-link{min-height:72px!important;height:72px!important;font-size:14px!important;padding-left:18px!important;gap:16px!important}
                    body .site-header .menu-icon,
                    body .site-header .account-inline-icon{width:44px!important;height:44px!important;min-width:44px!important;flex-basis:44px!important}
                }
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
            updateHeader({ premium:false });
            return;
        }
        try {
            const response = await fetch(`${BACKEND_URL}/api/premium/status?email=${encodeURIComponent(user.email)}`, { cache:'no-store' });
            if (!response.ok) return;
            const status = await response.json();
            saveStatus(status);
            updateHeader(status);
        } catch (_) {
            // Keep the last known valid Premium state while the backend wakes up.
        }
    }

    function init() {
        loadStyles();
        updateAuthControls();
        applyCachedStatus();
        checkPremium();

        const observer = new MutationObserver(() => hideHeaderNotification());
        observer.observe(document.documentElement, { childList:true, subtree:true });

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
        document.addEventListener('DOMContentLoaded', init, { once:true });
    } else {
        init();
    }
})();