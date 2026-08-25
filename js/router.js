// Netija navigation guard
// Protect an active test from accidental reload, Back, and internal navigation.

window.quizInProgress = window.quizInProgress === true;
window.quizSubmitted = window.quizSubmitted === true;

function isActiveQuiz() {
    return window.quizInProgress === true && window.quizSubmitted !== true;
}

// Browser refresh / close / leaving the page.
window.addEventListener('beforeunload', function (event) {
    if (!isActiveQuiz()) return;
    event.preventDefault();
    event.returnValue = '';
});

(function installQuizLeaveGuard() {
    let guardReady = false;
    let allowNavigation = false;

    function ensureHistoryGuard() {
        if (guardReady || !isActiveQuiz()) return;
        guardReady = true;
        history.pushState({ netijaQuizGuard: true }, '', window.location.href);
    }

    function confirmLeave() {
        const ok = window.confirm(
            'Вы сейчас проходите тест. Выйти из теста?\n\nВаши ответы могут быть потеряны.'
        );
        if (ok) {
            allowNavigation = true;
            window.quizInProgress = false;
            window.quizSubmitted = true;
        }
        return ok;
    }

    function leaveQuiz(destination) {
        if (!isActiveQuiz()) {
            window.location.href = destination;
            return;
        }
        if (confirmLeave()) window.location.href = destination;
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

        const ok = confirmLeave();
        if (ok) {
            history.back();
        } else {
            history.pushState({ netijaQuizGuard: true }, '', window.location.href);
            guardReady = true;
        }
    });

    const historyCheck = setInterval(function () {
        if (isActiveQuiz()) {
            ensureHistoryGuard();
            clearInterval(historyCheck);
        }
        if (window.quizSubmitted === true) clearInterval(historyCheck);
    }, 100);

    document.addEventListener('netija:quizRendered', ensureHistoryGuard);
    document.addEventListener('netija:testStarted', ensureHistoryGuard);
})();

// After submission: highlight correct open answers and move the result card.
(function installSubmittedLayout() {
    function addSubmittedStyles() {
        if (document.getElementById('netija-submitted-layout-styles')) return;

        const style = document.createElement('style');
        style.id = 'netija-submitted-layout-styles';
        style.textContent = `
            .sub-question-input.open-answer-correct {
                border: 2px solid #22c55e !important;
                background: #f0fdf4 !important;
                box-shadow: 0 0 0 2px rgba(34,197,94,.08) !important;
            }
            .sub-question-input.open-answer-wrong {
                border: 2px solid #ef4444 !important;
                background: #fef2f2 !important;
            }
            .open-answer-feedback--correct { color: #15803d !important; }
            .open-answer-feedback--wrong { color: #b91c1c !important; }
            .questions-sidebar > #resultBox.test-result {
                width: 100% !important;
                max-width: none !important;
                margin: 18px 0 0 !important;
                padding: 0 !important;
                background: transparent !important;
                border: 0 !important;
                border-radius: 0 !important;
                text-align: left !important;
            }
            .questions-sidebar > #resultBox .result-summary-card {
                width: 100%;
                margin: 0;
                padding: 22px;
                background: #fff;
                border: 1px solid #e5e7eb;
                border-radius: 16px;
                box-shadow: 0 4px 14px rgba(15,23,42,.05);
            }
            .questions-sidebar > #resultBox .result-header {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                gap: 12px;
            }
            .questions-sidebar > #resultBox .result-header h3 {
                margin: 4px 0 0;
                font-size: 24px;
                color: #172033;
            }
            .questions-sidebar > #resultBox .result-eyebrow {
                font-size: 13px;
                font-weight: 700;
                text-transform: uppercase;
                color: #94a3b8;
            }
            .questions-sidebar > #resultBox .result-status-badge {
                flex: 0 0 auto;
                padding: 8px 12px;
                border-radius: 999px;
                font-size: 12px;
                font-weight: 700;
            }
            .questions-sidebar > #resultBox .result-status--fail { background: #fee2e2; color: #b91c1c; }
            .questions-sidebar > #resultBox .result-status--success { background: #dcfce7; color: #15803d; }
            .questions-sidebar > #resultBox .result-metrics {
                display: grid;
                grid-template-columns: 1fr;
                gap: 10px;
                margin-top: 16px;
            }
            .questions-sidebar > #resultBox .metric-item {
                padding: 12px;
                background: #f8fafc;
                border: 1px solid #e8edf3;
                border-radius: 12px;
            }
            .questions-sidebar > #resultBox .metric-label { display: block; font-size: 12px; color: #64748b; }
            .questions-sidebar > #resultBox .metric-value {
                display: block;
                margin-top: 4px;
                font-size: 21px;
                font-weight: 800;
                color: #172033;
            }
            .questions-sidebar > #resultBox .metric-value small { font-size: 13px; font-weight: 600; color: #64748b; }
            @media (max-width: 900px) {
                .questions-sidebar > #resultBox.test-result { margin: 16px 0 0 !important; }
            }
        `;
        document.head.appendChild(style);
    }

    function moveResultToSidebar() {
        const resultBox = document.getElementById('resultBox');
        const sidebar = document.querySelector('.questions-sidebar');
        if (!resultBox || !sidebar) return;
        if (resultBox.parentElement !== sidebar) sidebar.appendChild(resultBox);
    }

    function markOpenAnswers() {
        document.querySelectorAll('.sub-question-item').forEach((item) => {
            const input = item.querySelector('.sub-question-input');
            const feedback = item.querySelector('.open-answer-feedback');
            if (!input || !feedback) return;
            const isCorrect = feedback.classList.contains('open-answer-feedback--correct');
            input.classList.toggle('open-answer-correct', isCorrect);
            input.classList.toggle('open-answer-wrong', !isCorrect);
        });
    }

    addSubmittedStyles();
    document.addEventListener('netija:testSubmitted', function () {
        requestAnimationFrame(function () {
            markOpenAnswers();
            moveResultToSidebar();
        });
        setTimeout(function () {
            markOpenAnswers();
            moveResultToSidebar();
        }, 100);
    });
})();

// The certificate page has its own legacy .header markup. menu.js replaces it
// with .site-header, but natcert-specific CSS can otherwise make the header
// white. Apply the shared dark header after the replacement, without changing
// the certificate page layout.
(function forceNetijaHeaderTheme() {
    function apply() {
        const header = document.querySelector('.site-header');
        if (!header) return;

        header.style.setProperty('background', '#08172d', 'important');
        header.style.setProperty('color', '#ffffff', 'important');
        header.style.setProperty('border', '0', 'important');
        header.style.setProperty('border-radius', '0', 'important');
        header.style.setProperty('box-shadow', '0 2px 14px rgba(15,23,42,.14)', 'important');

        const nav = header.querySelector('.header__nav');
        if (nav) {
            nav.style.setProperty('background', 'transparent', 'important');
            nav.style.setProperty('color', '#ffffff', 'important');
        }

        header.querySelectorAll('.header__list-link').forEach(link => {
            link.style.setProperty('color', '#dbe4f1', 'important');
        });

        const active = header.querySelector('.header__list-link.active');
        if (active) active.style.setProperty('color', '#ffffff', 'important');

        header.querySelectorAll('.user-profile, .user-profile__name').forEach(el => {
            el.style.setProperty('color', '#ffffff', 'important');
        });
    }

    apply();
    document.addEventListener('DOMContentLoaded', apply);
    window.addEventListener('load', apply);
    setTimeout(apply, 50);
    setTimeout(apply, 300);
})();

// National certificate: custom finish-test confirmation styled like the DTM modal.
(function installNatcertFinishConfirm() {
    let modal = null;
    let bypassNextSubmit = false;

    function addStyles() {
        if (document.getElementById('netija-natcert-confirm-styles')) return;
        const style = document.createElement('style');
        style.id = 'netija-natcert-confirm-styles';
        style.textContent = `
            .netija-confirm-overlay {
                position: fixed;
                inset: 0;
                z-index: 99999;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 24px;
                background: rgba(15, 23, 42, .42);
                backdrop-filter: blur(7px);
                -webkit-backdrop-filter: blur(7px);
                animation: netijaConfirmFade .16s ease-out;
            }
            .netija-confirm-modal {
                width: min(528px, 100%);
                box-sizing: border-box;
                padding: 34px 36px 36px;
                background: #fff;
                border-radius: 24px;
                box-shadow: 0 24px 70px rgba(15,23,42,.22), 0 4px 18px rgba(15,23,42,.08);
                text-align: center;
                animation: netijaConfirmPop .18s ease-out;
            }
            .netija-confirm-icon {
                width: 64px;
                height: 64px;
                margin: 0 auto 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 20px;
                background: #fff4e5;
                font-size: 31px;
            }
            .netija-confirm-title {
                margin: 0;
                color: #172033;
                font-size: 28px;
                line-height: 1.18;
                font-weight: 800;
                letter-spacing: -.45px;
            }
            .netija-confirm-text {
                max-width: 440px;
                margin: 20px auto 0;
                color: #718096;
                font-size: 17px;
                line-height: 1.55;
                font-weight: 500;
            }
            .netija-confirm-actions {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
                margin-top: 28px;
            }
            .netija-confirm-button {
                min-height: 58px;
                border: 0;
                border-radius: 14px;
                padding: 0 20px;
                font: inherit;
                font-size: 17px;
                font-weight: 750;
                cursor: pointer;
                transition: transform .12s ease, filter .12s ease;
                -webkit-tap-highlight-color: transparent;
            }
            .netija-confirm-button:active { transform: scale(.985); }
            .netija-confirm-cancel {
                background: #edf3f8;
                color: #44546a;
            }
            .netija-confirm-finish {
                background: #ff4d52;
                color: #fff;
            }
            .netija-confirm-button:hover { filter: brightness(.98); }
            @keyframes netijaConfirmFade { from { opacity: 0; } to { opacity: 1; } }
            @keyframes netijaConfirmPop { from { opacity: 0; transform: translateY(7px) scale(.985); } to { opacity: 1; transform: translateY(0) scale(1); } }
            @media (max-width: 600px) {
                .netija-confirm-overlay { padding: 16px; }
                .netija-confirm-modal { padding: 28px 20px 22px; border-radius: 22px; }
                .netija-confirm-icon { width: 58px; height: 58px; margin-bottom: 17px; font-size: 28px; }
                .netija-confirm-title { font-size: 24px; }
                .netija-confirm-text { margin-top: 15px; font-size: 15px; }
                .netija-confirm-actions { gap: 10px; margin-top: 22px; }
                .netija-confirm-button { min-height: 52px; padding: 0 12px; font-size: 15px; border-radius: 13px; }
            }
        `;
        document.head.appendChild(style);
    }

    function closeModal() {
        if (!modal) return;
        modal.remove();
        modal = null;
    }

    function openModal(submitBtn) {
        if (modal) return;
        addStyles();

        modal = document.createElement('div');
        modal.className = 'netija-confirm-overlay';
        modal.innerHTML = `
            <div class="netija-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="netija-confirm-title">
                <div class="netija-confirm-icon" aria-hidden="true">⚠️</div>
                <h2 id="netija-confirm-title" class="netija-confirm-title">Вы точно хотите завершить этот тест?</h2>
                <p class="netija-confirm-text">После завершения результат будет сохранён, а текущий тест можно будет пройти заново.</p>
                <div class="netija-confirm-actions">
                    <button type="button" class="netija-confirm-button netija-confirm-cancel">Отмена</button>
                    <button type="button" class="netija-confirm-button netija-confirm-finish">Завершить</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        const restoreScroll = () => {
            document.body.style.overflow = '';
        };

        modal.querySelector('.netija-confirm-cancel').addEventListener('click', () => {
            closeModal();
            restoreScroll();
            submitBtn.focus({ preventScroll: true });
        });

        modal.querySelector('.netija-confirm-finish').addEventListener('click', () => {
            closeModal();
            restoreScroll();
            bypassNextSubmit = true;

            const originalConfirm = window.confirm;
            window.confirm = () => true;
            try {
                submitBtn.click();
            } finally {
                window.confirm = originalConfirm;
            }
        });

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
                restoreScroll();
            }
        });

        const cancelButton = modal.querySelector('.netija-confirm-cancel');
        if (cancelButton) cancelButton.focus({ preventScroll: true });
    }

    function attach() {
        const submitBtn = document.getElementById('submitBtn');
        if (!submitBtn || submitBtn.dataset.netijaConfirmAttached === '1') return;
        submitBtn.dataset.netijaConfirmAttached = '1';

        // Capture phase runs before quiz.js's native window.confirm().
        submitBtn.addEventListener('click', function (event) {
            if (bypassNextSubmit) {
                bypassNextSubmit = false;
                return;
            }
            if (window.quizSubmitted === true) return;
            event.preventDefault();
            event.stopImmediatePropagation();
            openModal(submitBtn);
        }, true);
    }

    function init() {
        addStyles();
        attach();
    }

    init();
    document.addEventListener('DOMContentLoaded', init);
    document.addEventListener('netija:quizRendered', init);
    new MutationObserver(init).observe(document.documentElement, { childList: true, subtree: true });
})();
