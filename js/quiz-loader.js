(function () {
    const BACKEND_URL = 'https://netija.onrender.com';

    const params = new URLSearchParams(window.location.search);
    const testId = params.get('id');

    const titleEl = document.getElementById('testTitle');
    const quizContainer = document.getElementById('quizContainer');
    const submitBtn = document.getElementById('submitBtn');
    const timerEl = document.getElementById('timer');

    if (titleEl) {
        titleEl.textContent = `Тест №${testId}`;
    }

    function getCurrentUser() {
        try {
            return JSON.parse(
                localStorage.getItem('netija_user') || 'null'
            );
        } catch (error) {
            return null;
        }
    }

    function getTashkentDate() {
        return new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Asia/Tashkent',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(new Date());
    }

    function showLimitMessage(message) {
        if (titleEl) {
            titleEl.textContent = 'Доступ к тесту ограничен';
        }

        if (timerEl) {
            timerEl.style.display = 'none';
        }

        if (quizContainer) {
            quizContainer.innerHTML = `
                <div class="test-access-message">
                    <h2>${message}</h2>
                    <p>
                        Бесплатно можно пройти только один тест в сутки.
                    </p>
                </div>
            `;
        }

        if (submitBtn) {
            submitBtn.style.display = 'none';
        }
    }

    async function checkDailyLimit() {
        const user = getCurrentUser();

        if (!user?.email) {
            showLimitMessage(
                'Сначала войдите в аккаунт, чтобы пройти тест.'
            );
            return false;
        }

        try {
            const response = await fetch(
                `${BACKEND_URL}/api/premium/status?email=${encodeURIComponent(user.email)}`
            );

            if (response.ok) {
                const account = await response.json();

                if (account.premium) {
                    return true;
                }
            }
        } catch (error) {
            console.error(
                'Не удалось проверить Premium:',
                error
            );
        }

        const today = getTashkentDate();
        const storageKey = `netija_daily_test_${user.email}_${today}`;
        const alreadyUsed = localStorage.getItem(storageKey);

        if (alreadyUsed) {
            showLimitMessage(
                'Вы уже прошли тест сегодня.'
            );
            return false;
        }

        localStorage.setItem(storageKey, '1');

        return true;
    }

    async function loadQuiz() {
        const allowed = await checkDailyLimit();

        if (!allowed) {
            return;
        }

        // Убираем предыдущий тег с вопросами, если он был
        // (актуально при переходе между тестами через роутер)
        const oldScript = document.querySelector(
            'script[data-questions-loader]'
        );

        if (oldScript) {
            oldScript.remove();
        }

        const script = document.createElement('script');

        script.src = `js/questions/natcert-${testId}.js`;
        script.dataset.questionsLoader = 'true';

        script.onload = function () {
            if (typeof initQuiz === 'function') {
                initQuiz();
            }
        };

        script.onerror = function () {
            showLimitMessage(
                'Не удалось загрузить вопросы теста.'
            );
        };

        document.head.appendChild(script);
    }

    loadQuiz();
})();
