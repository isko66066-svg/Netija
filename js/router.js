// Netija navigation guard
//
// IMPORTANT: test pages must be opened as real documents. The old SPA router
// replaced only <main>, so natcert-test.html kept the previous page header and
// its page-specific CSS was not reloaded. That caused the test page to look
// broken until a manual refresh.

window.quizInProgress = window.quizInProgress === true;
window.quizSubmitted = window.quizSubmitted === true;

function isActiveQuiz() {
    return window.quizInProgress === true && window.quizSubmitted !== true;
}

window.addEventListener('beforeunload', function (event) {
    if (!isActiveQuiz()) return;
    event.preventDefault();
    event.returnValue = '';
});

// The shared menu.js replaces .header with .site-header on every page.
// Keep the same dark-blue header styling after that replacement too.
(function injectGlobalHeaderFix() {
    if (document.getElementById('netija-site-header-fix')) return;

    const style = document.createElement('style');
    style.id = 'netija-site-header-fix';
    style.textContent = `
        .site-header {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #08172d !important;
            border: 0 !important;
            border-radius: 0 !important;
            box-shadow: 0 2px 14px rgba(15,23,42,.14) !important;
            position: sticky !important;
            top: 0 !important;
            z-index: 2000 !important;
            color: #fff !important;
        }

        .site-header .header__container,
        .site-header .header__nav {
            width: 100% !important;
            max-width: none !important;
            background: transparent !important;
            border: 0 !important;
            border-radius: 0 !important;
        }

        .site-header .header__nav {
            min-height: 58px !important;
            padding: 0 24px !important;
            display: flex !important;
            align-items: center !important;
            gap: 24px !important;
        }

        .site-header .header__list-link {
            color: #dbe4f1 !important;
            background: transparent !important;
        }

        .site-header .header__list-link:hover,
        .site-header .header__list-link.active {
            color: #fff !important;
        }

        .site-header .header__list-link.active::after {
            background: #3b82f6 !important;
        }

        .site-header .user-profile,
        .site-header .user-profile__name {
            color: #fff !important;
        }

        .site-header .burger span {
            background: #fff !important;
        }

        @media (max-width: 700px) {
            .site-header .header__nav {
                min-height: 60px !important;
                height: 60px !important;
                padding: 0 10px !important;
                gap: 6px !important;
            }
        }
    `;
    document.head.appendChild(style);
})();

// Reliable warning when a user tries to leave an active test through
// Netija navigation or the browser Back button. beforeunload above remains
// responsible for refresh/close/external navigation.
(function installQuizLeaveGuard() {
    let guardReady = false;
    let allowNavigation = false;

    function ensureHistoryGuard() {
        if (guardReady || !isActiveQuiz()) return;
        guardReady = true;
        history.pushState({ netijaQuizGuard: true }, '', window.location.href);
    }

    function leaveQuiz(destination) {
        if (!isActiveQuiz()) {
            window.location.href = destination;
            return;
        }

        const ok = window.confirm('Вы сейчас проходите тест. Выйти из теста?\n\nВаши ответы могут быть потеряны.');
        if (ok) {
            allowNavigation = true;
            window.location.href = destination;
        }
    }

    function handleLinkClick(event) {
        if (!isActiveQuiz()) return;
        if (event.defaultPrevented || event.button !== 0) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        const link = event.target.closest && event.target.closest('a[href]');
        if (!link) return;
        if (link.target && link.target !== '_self') return;
        if (link.hasAttribute('download')) return;

        const url = new URL(link.href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (url.href === window.location.href) return;

        event.preventDefault();
        leaveQuiz(url.href);
    }

    document.addEventListener('click', handleLinkClick, true);

    window.addEventListener('popstate', function () {
        if (allowNavigation || !isActiveQuiz()) return;

        history.pushState({ netijaQuizGuard: true }, '', window.location.href);
        const ok = window.confirm('Вы сейчас проходите тест. Выйти из теста?\n\nВаши ответы могут быть потеряны.');
        if (ok) {
            allowNavigation = true;
            history.back();
        }
    });

    const historyCheck = setInterval(function () {
        if (isActiveQuiz()) {
            ensureHistoryGuard();
            clearInterval(historyCheck);
        }
    }, 100);
})();

// Do not intercept internal .html navigation.
// Let the browser load the complete document so that:
// - the correct header is rendered;
// - style.css/test.css are loaded normally;
// - page-specific scripts start once, in the correct order;
// - stale SPA DOM/CSS cannot remain on the screen.
//
// We intentionally keep this file as a navigation guard only.
