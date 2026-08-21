// Netija navigation guard
// Protect an active test from accidental reload, Back, and internal navigation.

window.quizInProgress = window.quizInProgress === true;
window.quizSubmitted = window.quizSubmitted === true;

function isActiveQuiz() {
    return window.quizInProgress === true && window.quizSubmitted !== true;
}

// Browser refresh / close / leaving the page.
// Browsers intentionally show their own standard confirmation text.
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
        history.pushState(
            { netijaQuizGuard: true },
            '',
            window.location.href
        );
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

        if (confirmLeave()) {
            window.location.href = destination;
        }
    }

    // Internal links: ask before leaving an active test.
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

    // Browser Back button.
    // A duplicate history entry is installed while the test is active:
    // [previous page] -> [test] -> [test guard].
    // On Back we are first returned to the duplicate test URL. We ask there;
    // if cancelled, restore the guard entry. If confirmed, go back once more
    // to the actual previous page. Do NOT push a new entry before confirming,
    // otherwise the Back button can never leave the test.
    window.addEventListener('popstate', function () {
        if (allowNavigation || !isActiveQuiz()) return;

        const ok = confirmLeave();

        if (ok) {
            // The browser is already at the duplicate test history entry.
            // One more Back reaches the real previous page.
            history.back();
        } else {
            // User cancelled: restore the protected entry at the current URL.
            history.pushState(
                { netijaQuizGuard: true },
                '',
                window.location.href
            );
            guardReady = true;
        }
    });

    // quiz.js sets quizInProgress when the test starts. Keep checking until
    // that happens, then install the history guard.
    const historyCheck = setInterval(function () {
        if (isActiveQuiz()) {
            ensureHistoryGuard();
            clearInterval(historyCheck);
        }

        if (window.quizSubmitted === true) {
            clearInterval(historyCheck);
        }
    }, 100);

    document.addEventListener('netija:quizRendered', ensureHistoryGuard);
    document.addEventListener('netija:testStarted', ensureHistoryGuard);
})();

// After submission: highlight correct open answers and move the result card
// into the right sidebar, directly below the question navigation cards.
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

            .questions-sidebar > #resultBox .result-status--fail {
                background: #fee2e2;
                color: #b91c1c;
            }

            .questions-sidebar > #resultBox .result-status--success {
                background: #dcfce7;
                color: #15803d;
            }

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

            .questions-sidebar > #resultBox .metric-label {
                display: block;
                font-size: 12px;
                color: #64748b;
            }

            .questions-sidebar > #resultBox .metric-value {
                display: block;
                margin-top: 4px;
                font-size: 21px;
                font-weight: 800;
                color: #172033;
            }

            .questions-sidebar > #resultBox .metric-value small {
                font-size: 13px;
                font-weight: 600;
                color: #64748b;
            }

            @media (max-width: 900px) {
                .questions-sidebar > #resultBox.test-result {
                    margin: 16px 0 0 !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function moveResultToSidebar() {
        const resultBox = document.getElementById('resultBox');
        const sidebar = document.querySelector('.questions-sidebar');
        if (!resultBox || !sidebar) return;

        if (resultBox.parentElement !== sidebar) {
            sidebar.appendChild(resultBox);
        }
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

// Do not intercept internal .html navigation. Let the browser load the
// complete document so each page gets its own header, CSS and scripts.
