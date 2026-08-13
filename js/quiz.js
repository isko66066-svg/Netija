function initQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    const submitBtn = document.getElementById('submitBtn');
    const resultBox = document.getElementById('resultBox');
    const timerEl = document.getElementById('timer');

    if (!quizContainer || typeof questions === 'undefined') return;

    let timeLeft = 2 * 60 * 60 + 30 * 60; // 2 часа 30 минут
    let timerInterval;
    let isQuizSubmitted = false; // Флаг: завершён ли тест

    // --- 0. Защита от случайного выхода / обновления / кнопки "Назад" ---
    function handleBeforeUnload(e) {
        if (!isQuizSubmitted) {
            e.preventDefault();
            e.returnValue = ''; // Системное предупреждение браузера
        }
    }
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Перехват кликов по ссылкам (например, "Главное меню")
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && !isQuizSubmitted) {
            if (link.href && !link.href.includes('#') && !link.href.startsWith('javascript:')) {
                const confirmLeave = confirm('Вы точно хотите выйти? Прогресс прохождения теста будет утерян.');
                if (!confirmLeave) {
                    e.preventDefault(); // Отменяем переход по ссылке
                } else {
                    isQuizSubmitted = true;
                }
            }
        }
    });

    function updateTimerDisplay() {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        timerEl.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (timeLeft <= 300) {
            timerEl.classList.add('timer--warning');
        }
    }

    function startTimer() {
        updateTimerDisplay();
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                finishQuiz(true); // Автоматическое завершение по истечении времени
                timerEl.textContent = "Время вышло";
            }
        }, 1000);
    }

    startTimer();

    // --- 1. Отрисовка вопросов ---
    questions.forEach((q, index) => {
        const questionBlock = document.createElement('div');
        questionBlock.className = 'question-block';
        questionBlock.id = `question-block-${index}`;

        // Текст вопроса
        const questionText = document.createElement('p');
        questionText.className = 'question-text';
        questionText.textContent = `${q.id || index + 1}. ${q.question}`;
        questionBlock.appendChild(questionText);

        // Картинка к вопросу (если есть)
        if (q.image && q.image.trim() !== '') {
            const img = document.createElement('img');
            img.src = q.image;
            img.alt = "";
            img.className = 'question-image';

            img.onerror = function() {
                this.remove();
            };

            questionBlock.appendChild(img);
        }

        // Рендеринг типов вопросов
        if (!q.type || q.type === 'single_choice') {
            // ВОПРОСЫ 1–32 (Один вариант)
            if (q.options) {
                q.options.forEach((option, optIndex) => {
                    const label = document.createElement('label');
                    label.className = 'option-label';

                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.name = `question-${index}`;
                    input.value = optIndex;

                    label.appendChild(input);
                    label.appendChild(document.createTextNode(option));
                    questionBlock.appendChild(label);
                });
            }
        } 
        else if (q.type === 'matching') {
            // ВОПРОСЫ 33–35 (Соответствие)
            if (q.context) {
                const ctx = document.createElement('p');
                ctx.className = 'matching-context';
                ctx.innerHTML = `<b>Контекст:</b> ${q.context}`;
                questionBlock.appendChild(ctx);
            }

            if (q.items) {
                q.items.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'matching-item';

                    const itemText = document.createElement('p');
                    itemText.className = 'sub-question-text';
                    itemText.innerHTML = `<b>${item.id})</b> ${item.text}`;

                    const select = document.createElement('select');
                    select.name = `question-${index}-${item.id}`;
                    select.className = 'matching-select';

                    const defaultOpt = document.createElement('option');
                    defaultOpt.value = '';
                    defaultOpt.textContent = '-- Выберите вариант --';
                    select.appendChild(defaultOpt);

                    if (q.optionsPool) {
                        for (let key in q.optionsPool) {
                            const opt = document.createElement('option');
                            opt.value = key;
                            opt.textContent = `${key}) ${q.optionsPool[key]}`;
                            select.appendChild(opt);
                        }
                    }

                    itemDiv.appendChild(itemText);
                    itemDiv.appendChild(select);
                    questionBlock.appendChild(itemDiv);
                });
            }
        } 
        else if (q.type === 'open_ended') {
            // ВОПРОСЫ 36–45 (Открытые вопросы a и b)
            if (q.subQuestions) {
                q.subQuestions.forEach(sub => {
                    const subDiv = document.createElement('div');
                    subDiv.className = 'sub-question-item';

                    const subText = document.createElement('p');
                    subText.className = 'sub-question-text';
                    subText.innerHTML = `<b>${sub.id})</b> ${sub.text}`;

                    const input = document.createElement('input');
                    input.type = 'text';
                    input.name = `question-${index}-${sub.id}`;
                    input.className = 'sub-question-input';
                    input.placeholder = 'Введите ответ...';
                    input.autocomplete = 'off';

                    subDiv.appendChild(subText);
                    subDiv.appendChild(input);
                    questionBlock.appendChild(subDiv);
                });
            }
        }

        quizContainer.appendChild(questionBlock);
    });

    // --- 2. Клик на кнопку «Завершить тест» ---
    submitBtn.addEventListener('click', () => {
        const confirmFinish = confirm('Вы точно хотите завершить тест и узнать результаты?');
        if (confirmFinish) {
            finishQuiz(false);
        }
    });

    // --- Функция завершения и проверки теста ---
    function finishQuiz(isTimeOut = false) {
        clearInterval(timerInterval);

        // Снимаем защиту от закрытия страницы
        isQuizSubmitted = true;
        window.removeEventListener('beforeunload', handleBeforeUnload);

        let totalScore = 0;
        let maxScore = 0;
        const details = [];

        questions.forEach((q, index) => {
            let isCorrect = false;

            // 1. Single Choice (1–32)
            if (!q.type || q.type === 'single_choice') {
                maxScore += 1;
                const selected = document.querySelector(`input[name="question-${index}"]:checked`);
                const selectedValue = selected ? parseInt(selected.value) : null;
                const answered = selectedValue !== null;
                isCorrect = selectedValue === q.correctAnswer;
                if (isCorrect) totalScore += 1;

                const options = document.querySelectorAll(`input[name="question-${index}"]`);
                options.forEach((input, optIdx) => {
                    input.disabled = true;
                    const label = input.parentElement;

                    if (optIdx === q.correctAnswer) {
                        label.classList.add('correct-answer');
                    } else if (optIdx === selectedValue && !isCorrect) {
                        label.classList.add('wrong-answer');
                    }
                });

                details.push({
                    number: q.id || (index + 1),
                    isCorrect: isCorrect,
                    answered: answered
                });
            } 
            // 2. Matching (33–35)
            else if (q.type === 'matching') {
                let blockCorrect = true;

                if (q.items) {
                    const itemsCount = q.items.length;
                    maxScore += itemsCount;

                    q.items.forEach(item => {
                        const select = document.querySelector(`select[name="question-${index}-${item.id}"]`);
                        const val = select ? select.value : '';
                        const itemAnswered = (val !== '');
                        const itemCorrect = (val === item.correctAnswer);

                        if (!itemCorrect) blockCorrect = false;

                        if (select) {
                            select.disabled = true;
                            const parent = select.parentElement;

                            if (itemCorrect) {
                                totalScore += 1;
                                select.style.borderColor = '#22c55e';
                                select.style.backgroundColor = '#f0fdf4';
                            } else {
                                select.style.borderColor = '#ef4444';
                                select.style.backgroundColor = '#fef2f2';

                                const hint = document.createElement('span');
                                hint.className = 'correct-hint';
                                hint.textContent = `Правильно: ${item.correctAnswer})`;
                                parent.appendChild(hint);
                            }
                        }

                        details.push({
                            number: item.id,
                            isCorrect: itemCorrect,
                            answered: itemAnswered
                        });
                    });
                }
                isCorrect = blockCorrect;
            } 
            // 3. Open Ended (36–45)
            else if (q.type === 'open_ended') {
                let blockCorrect = true;
                const subCount = q.subQuestions ? q.subQuestions.length : 0;
                maxScore += subCount;

                if (q.subQuestions) {
                    q.subQuestions.forEach(sub => {
                        const input = document.querySelector(`input[name="question-${index}-${sub.id}"]`);
                        const val = input ? input.value.trim().toLowerCase() : '';
                        const subAnswered = (val !== '');
                        const subCorrect = (val === sub.correctAnswer.trim().toLowerCase());

                        if (!subCorrect) blockCorrect = false;

                        if (input) {
                            input.disabled = true;
                            const parent = input.parentElement;

                            if (subCorrect) {
                                totalScore += 1;
                                input.style.borderColor = '#22c55e';
                                input.style.backgroundColor = '#f0fdf4';
                            } else {
                                input.style.borderColor = '#ef4444';
                                input.style.backgroundColor = '#fef2f2';

                                const hint = document.createElement('div');
                                hint.className = 'correct-hint';
                                hint.textContent = `Правильный ответ: ${sub.correctAnswer}`;
                                parent.appendChild(hint);
                            }
                        }

                        const qNum = q.id || (index + 1);
                        details.push({
                            number: `${qNum}${sub.id}`,
                            isCorrect: subCorrect,
                            answered: subAnswered
                        });
                    });
                }
                isCorrect = blockCorrect;
            }

            const block = document.getElementById(`question-block-${index}`);
            if (block) {
                block.classList.remove('question-correct', 'question-incorrect');
                block.classList.add(isCorrect ? 'question-correct' : 'question-incorrect');
            }
        });

        submitBtn.style.display = 'none';
        renderResultBox(totalScore, maxScore, details);
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // --- ВАРИАНТ 1: Отправка результатов на сервер ---
        saveUserResult({
            score: totalScore,
            maxScore: maxScore,
            percent: Math.round((totalScore / maxScore) * 100),
            date: new Date().toISOString(),
            testId: typeof CURRENT_TEST_ID !== 'undefined' ? CURRENT_TEST_ID : "natcert-1"
        });
    }

    // --- 3. Отрисовка блока итогов ---
    function renderResultBox(totalScore, maxScore, details) {
        resultBox.innerHTML = '';
        resultBox.style.display = 'block';

        const summary = document.createElement('div');
        summary.className = 'result-summary';
        summary.textContent = `Результат: ${totalScore} из ${maxScore} баллов`;
        resultBox.appendChild(summary);

        const grid = document.createElement('div');
        grid.className = 'result-grid';

        details.forEach((item) => {
            const cell = document.createElement('div');
            cell.className = `result-cell ${item.isCorrect ? 'result-cell--correct' : 'result-cell--incorrect'}`;
            cell.textContent = item.number;
            if (!item.answered) {
                cell.classList.add('result-cell--empty');
                cell.title = 'Вопрос без ответа';
            }
            grid.appendChild(cell);
        });

        resultBox.appendChild(grid);
    }
}

// --- Вспомогательная функция отправки результатов на сервер ---
async function saveUserResult(resultData) {
    try {
        const response = await fetch('/api/save-result.php', { // Измени URL на свой эндпоинт
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // Если передаешь JWT-токен:
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(resultData)
        });

        if (response.ok) {
            console.log('Результат успешно сохранен в аккаунт!');
        } else {
            console.warn('Сервер не смог сохранить результат.');
        }
    } catch (error) {
        console.error('Ошибка сети при сохранении:', error);
    }
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', initQuiz);