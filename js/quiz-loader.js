(function () {
    const BACKEND_URL = 'https://netija.onrender.com';
    const params = new URLSearchParams(window.location.search);
    const testId = params.get('id');

    const titleEl = document.getElementById('testTitle');
    const quizContainer = document.getElementById('quizContainer');
    const submitBtn = document.getElementById('submitBtn');
    const timerEl = document.getElementById('timer');

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
            return JSON.parse(localStorage.getItem('netija_user') || 'null');
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

    function normalizeLegacyMatchingQuestions() {
        if (typeof questions === 'undefined' || !Array.isArray(questions)) {
            return;
        }

        const legacyIndex = questions.findIndex(
            (question) =>
                question.type === 'matching' &&
                String(question.id) === '33-35' &&
                Array.isArray(question.items) &&
                question.items.length === 3
        );

        if (legacyIndex === -1) {
            return;
        }

        const legacyQuestion = questions[legacyIndex];
        const normalizedQuestions = legacyQuestion.items.map((item, index) => ({
            id: item.id,
            type: 'matching',
            question: '',
            context: index === 0 ? legacyQuestion.context || '' : '',
            image: index === 0 ? legacyQuestion.image || null : null,
            optionsPool: { ...legacyQuestion.optionsPool },
            items: [
                {
                    id: item.id,
                    text: item.text,
                    correctAnswer: item.correctAnswer
                }
            ]
        }));

        questions.splice(legacyIndex, 1, ...normalizedQuestions);
    }

    function applyMatchingQuestions() {
        if (typeof questions === 'undefined' || !Array.isArray(questions)) {
            return;
        }

        const q33 = questions.find((question) => question.id === 33);
        const q34 = questions.find((question) => question.id === 34);
        const q35 = questions.find((question) => question.id === 35);

        if (!q33 || !q34 || !q35) {
            return;
        }

        if (String(testId) === '6') {
            q33.type = 'matching';
            q33.question = '';
            q33.context = 'Задания (33–35) и варианты ответов (A–F) сопоставьте между собой. На рисунке даны конус, цилиндр и шар равных объёмов. Осевое сечение цилиндра — квадрат, а осевое сечение конуса — правильный треугольник.';
            q33.image = 'images/2-mart_2-img/matching.svg';
            q33.optionsPool = {
                A: '$\\frac{\\sqrt[6]{12}}{2}$',
                B: '$\\frac{\\sqrt[6]{3}}{\\sqrt[3]{6}}$',
                C: '$\\frac{\\sqrt[3]{18}}{2}$',
                D: '$\\frac{\\sqrt[3]{12}}{6}$',
                E: '$\\frac{\\sqrt[3]{18}}{3}$',
                F: '$\\frac{\\sqrt[3]{6}}{2}$'
            };
            q33.items = [
                {
                    id: 33,
                    text: 'Найдите отношение радиуса основания цилиндра к радиусу основания конуса.',
                    correctAnswer: 'B'
                }
            ];

            q34.type = 'matching';
            q34.question = '';
            q34.context = '';
            q34.optionsPool = q33.optionsPool;
            q34.items = [
                {
                    id: 34,
                    text: 'Найдите отношение радиуса шара к радиусу конуса.',
                    correctAnswer: 'A'
                }
            ];

            q35.type = 'matching';
            q35.question = '';
            q35.context = '';
            q35.optionsPool = q33.optionsPool;
            q35.items = [
                {
                    id: 35,
                    text: 'Найдите отношение радиуса основания цилиндра к радиусу шара.',
                    correctAnswer: 'E'
                }
            ];
        }

        if (String(testId) === '7') {
            q33.type = 'matching';
            q33.question = '';
            q33.context = 'Задания (33–35) и варианты ответов (A–F) сопоставьте между собой. Если высота цилиндра равна 8, а полная площадь поверхности равна 232,5π, вычислите следующие величины.';
            q33.optionsPool = {
                A: '$\\frac{\\sqrt{161}}{2}$',
                B: '$\\frac{\\sqrt{161}}{4}$',
                C: '$\\frac{17}{2}$',
                D: '$\\frac{3\\sqrt{21}}{2}$',
                E: '$\\frac{3\\sqrt{21}}{4}$',
                F: '$\\frac{19}{2}$'
            };
            q33.items = [
                {
                    id: 33,
                    text: 'Найдите наименьшее расстояние от оси цилиндра до отрезка длиной 10 см, расположенного на одинаковом расстоянии от оснований.',
                    correctAnswer: 'D'
                }
            ];

            q34.type = 'matching';
            q34.question = '';
            q34.context = '';
            q34.optionsPool = q33.optionsPool;
            q34.items = [
                {
                    id: 34,
                    text: 'Через цилиндр проведено сечение, параллельное его оси. Если сечение — квадрат, найдите наименьшее расстояние до оси.',
                    correctAnswer: 'B'
                }
            ];

            q35.type = 'matching';
            q35.question = '';
            q35.context = '';
            q35.optionsPool = q33.optionsPool;
            q35.items = [
                {
                    id: 35,
                    text: 'Найдите радиус шара, описанного около цилиндра.',
                    correctAnswer: 'C'
                }
            ];
        }
    }

    function addMatchingVisualFix() {
        if (document.getElementById('matching-visual-fix')) {
            return;
        }

        const style = document.createElement('style');
        style.id = 'matching-visual-fix';
        style.textContent = `
            .matching-context {
                background: #fff !important;
                border: 0 !important;
                padding: 0 !important;
                color: #172033 !important;
                font-size: 16px !important;
                line-height: 1.55 !important;
                margin-bottom: 12px !important;
            }

            .question-image {
                max-width: 100%;
                height: auto;
                max-height: 330px;
                object-fit: contain;
                background: #fff;
                border: 0 !important;
                border-radius: 0 !important;
                margin: 14px auto 20px !important;
            }

            #question-block-33 > .question-text,
            #question-block-34 > .question-text,
            #question-block-35 > .question-text {
                display: none !important;
            }

            #question-block-34,
            #question-block-35 {
                box-shadow: none !important;
                margin-top: -24px !important;
                border-top: 0 !important;
                border-radius: 0 !important;
                padding-top: 0 !important;
            }

            #question-block-35 {
                border-radius: 0 0 12px 12px !important;
                padding-bottom: 24px !important;
            }
        `;

        document.head.appendChild(style);
    }

    async function loadQuiz() {
        const allowed = await checkDailyAccess();

        if (!allowed) {
            return;
        }

        restoreTestUI();

        const oldScript = document.querySelector('script[data-questions-loader]');
        if (oldScript) {
            oldScript.remove();
        }

        const script = document.createElement('script');
        script.src = `js/questions/natcert-${testId}.js`;
        script.dataset.questionsLoader = 'true';

        script.onload = function () {
            normalizeLegacyMatchingQuestions();
            applyMatchingQuestions();
            addMatchingVisualFix();

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

    window.addEventListener('netija:login', loadQuiz);
    loadQuiz();
})();
