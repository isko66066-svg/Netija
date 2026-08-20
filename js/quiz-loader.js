(function () {
    const BACKEND_URL = 'https://netija.onrender.com';

    const params = new URLSearchParams(window.location.search);
    const testId = params.get('id');

    const titleEl = document.getElementById('testTitle');
    const quizContainer = document.getElementById('quizContainer');
    const submitBtn = document.getElementById('submitBtn');
    const timerEl = document.getElementById('timer');

    // Стили для красивого сообщения об ограничении доступа.
    if (!document.getElementById('test-access-styles')) {
        const style = document.createElement('style');
        style.id = 'test-access-styles';
        style.textContent = `
            .test-title.test-title--access {
                max-width: 720px;
                margin: 56px auto 14px;
                padding: 0 24px;
                text-align: center;
                font-size: clamp(26px, 4vw, 34px);
                line-height: 1.2;
                font-weight: 800;
                letter-spacing: -0.7px;
                color: #19191B;
            }

            .test-access-message {
                position: relative;
                max-width: 720px;
                margin: 0 auto;
                padding: 34px 36px;
                background: rgba(255, 255, 255, 0.96);
                border: 1px solid #e5e7eb;
                border-radius: 22px;
                box-shadow: 0 14px 40px rgba(0, 0, 0, 0.07);
                text-align: center;
                overflow: hidden;
            }

            .test-access-message::before {
                content: '🔒';
                display: flex;
                align-items: center;
                justify-content: center;
                width: 58px;
                height: 58px;
                margin: 0 auto 18px;
                border-radius: 50%;
                background: #f1f5f9;
                font-size: 25px;
            }

            .test-access-message::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, #03045E, #40E0D0);
            }

            .test-access-message h2 {
                margin: 0;
                color: #475569;
                font-size: 18px;
                line-height: 1.55;
                font-weight: 600;
            }

            @media (max-width: 600px) {
                .test-title.test-title--access {
                    margin-top: 34px;
                    font-size: 26px;
                    padding: 0 18px;
                }

                .test-access-message {
                    margin: 0 16px;
                    padding: 28px 20px;
                    border-radius: 18px;
                }

                .test-access-message h2 {
                    font-size: 16px;
                }
            }
        `;
        document.head.appendChild(style);
    }

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
            titleEl.classList.add('test-title--access');
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

    function restoreTestUI() {
        if (titleEl) {
            titleEl.textContent = `Тест №${testId}`;
            titleEl.classList.remove('test-title--access');
        }

        if (timerEl) {
            timerEl.style.display = '';
        }

        if (submitBtn) {
            submitBtn.style.display = '';
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

        restoreTestUI();

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

    // Если пользователь вошёл уже после загрузки страницы,
    // повторно проверяем доступ и сразу открываем тест.
    window.addEventListener('netija:login', function () {
        loadQuiz();
    });

    loadQuiz();
})();
