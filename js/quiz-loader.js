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

    function showAccessMessage(title, text) {
        if (titleEl) {
            titleEl.textContent = title;
        }

        if (timerEl) {
            timerEl.style.display = 'none';
        }

        if (quizContainer) {
            quizContainer.innerHTML = `
                <div class="test-access-message">
                    <h2>${text}</h2>
                </div>
            `;
        }

        if (submitBtn) {
            submitBtn.style.display = 'none';
        }
    }

    async function checkDailyAccess() {
        const user = getCurrentUser();

        if (!user?.email) {
            showAccessMessage(
                'Доступ к тесту ограничен',
                'Сначала войдите в аккаунт, чтобы пройти тест.'
            );
            return false;
        }

        try {
            const response = await fetch(
                `${BACKEND_URL}/api/tests/daily-access`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: user.email,
                        testId
                    })
                }
            );

            const data = await response.json().catch(() => ({}));

            if (response.ok && data.allowed) {
                return true;
            }

            if (
                response.status === 409 &&
                data.error === 'DAILY_LIMIT_REACHED'
            ) {
                showAccessMessage(
                    'Доступ к тесту ограничен',
                    'Вы уже прошли тест сегодня.'
                );
                return false;
            }

            if (response.status === 404) {
                showAccessMessage(
                    'Доступ к тесту ограничен',
                    'Пользователь не найден. Войдите в аккаунт заново.'
                );
                return false;
            }

            showAccessMessage(
                'Ошибка доступа',
                'Не удалось проверить доступ к тесту. Попробуйте ещё раз.'
            );
            return false;
        } catch (error) {
            console.error('Daily test access error:', error);

            showAccessMessage(
                'Ошибка соединения',
                'Не удалось связаться с сервером. Попробуйте ещё раз.'
            );
            return false;
        }
    }

    async function loadQuiz() {
        const allowed = await checkDailyAccess();

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
            showAccessMessage(
                'Ошибка загрузки',
                'Не удалось загрузить вопросы теста.'
            );
        };

        document.head.appendChild(script);
    }

    loadQuiz();
})();
