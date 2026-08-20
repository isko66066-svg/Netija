function initQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    const submitBtn = document.getElementById('submitBtn');
    const resultBox = document.getElementById('resultBox');
    const timerEl = document.getElementById('timer') || document.getElementById('sidebarTimer');

    if (!quizContainer || typeof questions === 'undefined') {
        console.error('Quiz: quizContainer или questions не найдены');
        return;
    }

    let testSubmitted = false;

    window.quizInProgress = true;
    window.quizSubmitted = false;

    function renderMath(element) {
        if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
            return window.MathJax.typesetPromise([element]).catch(error => {
                console.error('MathJax error:', error);
            });
        }
        return Promise.resolve();
    }

    async function waitForMathJax() {
        if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') return;

        await new Promise(resolve => {
            let attempts = 0;
            const check = setInterval(() => {
                attempts++;
                if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
                    clearInterval(check);
                    resolve();
                }
                if (attempts >= 100) {
                    clearInterval(check);
                    resolve();
                }
            }, 50);
        });
    }

    window.addEventListener('beforeunload', function (e) {
        if (!testSubmitted) {
            e.preventDefault();
            e.returnValue = '';
        }
    });

    let timeLeft = 2 * 60 * 60 + 30 * 60;
    let timerInterval;

    function updateTimerDisplay() {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;

        if (timerEl) {
            timerEl.textContent =
                `${String(hours).padStart(2, '0')}:` +
                `${String(minutes).padStart(2, '0')}:` +
                `${String(seconds).padStart(2, '0')}`;

            if (timeLeft <= 300) timerEl.classList.add('timer--warning');
        }
    }

    function startTimer() {
        updateTimerDisplay();
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                submitTest();
                if (timerEl) timerEl.textContent = 'Время вышло';
            }
        }, 1000);
    }

    function escapeHtmlOutsideMath(text) {
        if (!text) return '';
        return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function createMathText(className, text) {
        const element = document.createElement('p');
        element.className = className;
        element.innerHTML = escapeHtmlOutsideMath(text || '');
        return element;
    }

    function latexToPlainText(text) {
        if (!text) return '';
        let result = String(text);
        result = result.replace(/\$\$?/g, '');
        result = result.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '$1/$2');
        result = result.replace(/\\sqrt\{([^{}]+)\}/g, '√$1');
        result = result.replace(/\\sqrt(\d+)/g, '√$1');
        result = result.replace(/\\operatorname\{([^{}]+)\}/g, '$1');
        result = result.replace(/[{}]/g, '');
        result = result.replace(/\\,|\\ /g, ' ');
        return result.trim();
    }

    async function renderQuestions() {
        quizContainer.innerHTML = '';

        questions.forEach((q) => {
            const block = document.createElement('div');
            block.className = 'question-block';
            block.id = `question-block-${q.id}`;

            block.appendChild(createMathText('question-text', `${q.id}. ${q.question || ''}`));

            if (q.subtitle) {
                const subtitle = document.createElement('div');
                subtitle.className = 'question-subtitle';
                subtitle.innerHTML = escapeHtmlOutsideMath(q.subtitle);
                block.appendChild(subtitle);
            }

            if (q.image) {
                const img = document.createElement('img');
                img.className = 'question-image';
                img.src = q.image;
                img.alt = `Изображение к заданию ${q.id}`;
                block.appendChild(img);
            }

            if (q.type === 'single_choice') {
                const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
                const optionsList = document.createElement('div');
                optionsList.className = 'options-list';

                q.options.forEach((option, optIndex) => {
                    const label = document.createElement('label');
                    label.className = 'option-label';

                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.name = `q-${q.id}`;
                    input.value = optIndex;
                    label.appendChild(input);

                    const optionText = document.createElement('span');
                    optionText.innerHTML = escapeHtmlOutsideMath(`${letters[optIndex] || ''}) ${option}`);
                    label.appendChild(optionText);

                    optionsList.appendChild(label);
                });

                block.appendChild(optionsList);
            }

            if (q.type === 'matching') {
                if (q.context) {
                    const context = document.createElement('div');
                    context.className = 'matching-context';
                    context.innerHTML = escapeHtmlOutsideMath(q.context);
                    block.appendChild(context);
                }

                q.items.forEach((item) => {
                    const itemBlock = document.createElement('div');
                    itemBlock.className = 'matching-item';

                    const itemText = document.createElement('p');
                    itemText.className = 'sub-question-text';
                    itemText.innerHTML = escapeHtmlOutsideMath(`${item.id}. ${item.text}`);
                    itemBlock.appendChild(itemText);

                    const select = document.createElement('select');
                    select.className = 'matching-select';
                    select.dataset.itemId = item.id;

                    const emptyOption = document.createElement('option');
                    emptyOption.value = '';
                    emptyOption.textContent = 'Выберите ответ';
                    select.appendChild(emptyOption);

                    Object.entries(q.optionsPool || {}).forEach(([letter, value]) => {
                        const opt = document.createElement('option');
                        opt.value = letter;
                        opt.textContent = `${letter}) ${latexToPlainText(value)}`;
                        select.appendChild(opt);
                    });

                    itemBlock.appendChild(select);
                    block.appendChild(itemBlock);
                });
            }

            if (q.type === 'open_ended') {
                q.subQuestions.forEach((sub) => {
                    const subBlock = document.createElement('div');
                    subBlock.className = 'sub-question-item';

                    const subText = document.createElement('p');
                    subText.className = 'sub-question-text';
                    subText.innerHTML = escapeHtmlOutsideMath(sub.text || '');
                    subBlock.appendChild(subText);

                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'sub-question-input';
                    input.placeholder = 'Введите ответ';
                    input.dataset.questionId = q.id;
                    input.dataset.subId = sub.id;
                    subBlock.appendChild(input);

                    block.appendChild(subBlock);
                });
            }

            quizContainer.appendChild(block);
        });

        await waitForMathJax();
        await renderMath(quizContainer);
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            if (testSubmitted) return;

            const confirmed = window.confirm('Вы уверены, что хотите завершить тест и проверить результат?');
            if (!confirmed) return;

            submitTest();
        });
    } else {
        console.error('Quiz: кнопка #submitBtn не найдена');
    }

    function getCertificateGrade(score) {
        if (score < 44.0) return { level: 'Не выдается', passed: false };
        if (score <= 49.99) return { level: 'C', passed: true };
        if (score <= 54.99) return { level: 'C+', passed: true };
        if (score <= 59.99) return { level: 'B', passed: true };
        if (score <= 64.99) return { level: 'B+', passed: true };
        if (score <= 69.99) return { level: 'A', passed: true };
        return { level: 'A+', passed: true };
    }

    function submitTest() {
        if (testSubmitted) return;

        testSubmitted = true;
        window.quizSubmitted = true;
        window.quizInProgress = false;
        clearInterval(timerInterval);

        let totalRawScore = 0;
        let correctFullTasksCount = 0;
        let totalTasksCount = 0;
        const details = [];

        questions.forEach((q) => {
            const block = document.getElementById(`question-block-${q.id}`);
            let questionCorrect = true;

            if (q.type === 'single_choice') {
                totalTasksCount++;
                const questionPoints = q.points !== undefined ? q.points : 1.3;
                const selected = document.querySelector(`input[name="q-${q.id}"]:checked`);
                const selectedValue = selected ? parseInt(selected.value) : null;
                const isCorrect = selectedValue === q.correctAnswer;

                if (isCorrect) {
                    totalRawScore += questionPoints;
                    correctFullTasksCount++;
                } else {
                    questionCorrect = false;
                }

                details.push({ number: q.id, isCorrect, answered: selectedValue !== null });

                if (block) {
                    const labels = block.querySelectorAll('.option-label');
                    labels.forEach((label, idx) => {
                        label.classList.remove('correct-answer', 'wrong-answer');
                        const input = label.querySelector('input');
                        if (input) input.disabled = true;

                        if (q.correctAnswer !== null && idx === q.correctAnswer) {
                            label.classList.add('correct-answer');
                        } else if (idx === selectedValue && !isCorrect) {
                            label.classList.add('wrong-answer');
                        }
                    });
                }
            }

            if (q.type === 'matching') {
                const matchingPoints = q.points !== undefined ? q.points : 2.2;
                let subItemsCorrect = true;

                q.items.forEach((item) => {
                    totalTasksCount++;
                    const select = block ? block.querySelector(`select[data-item-id="${item.id}"]`) : null;
                    const selectedValue = select ? select.value : '';
                    const isItemCorrect = selectedValue === item.correctAnswer;

                    if (!isItemCorrect) subItemsCorrect = false;
                    details.push({ number: item.id, isCorrect: isItemCorrect, answered: selectedValue !== '' });

                    if (select) {
                        select.disabled = true;
                        const parent = select.parentElement;
                        const oldHint = parent.querySelector('.correct-hint');
                        if (oldHint) oldHint.remove();

                        if (!isItemCorrect) {
                            const hint = document.createElement('span');
                            hint.className = 'correct-hint';
                            const correctText = q.optionsPool && q.optionsPool[item.correctAnswer] ? q.optionsPool[item.correctAnswer] : '';
                            hint.innerHTML = escapeHtmlOutsideMath(`Правильный ответ: ${item.correctAnswer}) ${correctText}`);
                            select.insertAdjacentElement('afterend', hint);
                            renderMath(hint);
                        }
                    }
                });

                if (subItemsCorrect) {
                    totalRawScore += matchingPoints;
                    correctFullTasksCount++;
                } else {
                    questionCorrect = false;
                }
            }

            if (q.type === 'open_ended') {
                let partACorrect = false;
                let partBCorrect = false;
                const pointsA = 1.5;
                const pointsB = 1.7;

                q.subQuestions.forEach((sub) => {
                    totalTasksCount++;
                    const input = block ? block.querySelector(`input[data-question-id="${q.id}"][data-sub-id="${sub.id}"]`) : null;
                    const value = input ? input.value.trim() : '';
                    const correctAnswer = sub.correctAnswer;
                    const isSubCorrect = correctAnswer !== null && correctAnswer !== undefined && value !== '' && value.toLowerCase() === String(correctAnswer).toLowerCase();

                    if (sub.id === 'a' && isSubCorrect) {
                        totalRawScore += pointsA;
                        partACorrect = true;
                    }
                    if (sub.id === 'b' && isSubCorrect) {
                        totalRawScore += pointsB;
                        partBCorrect = true;
                    }

                    details.push({ number: `${q.id}${sub.id}`, isCorrect: isSubCorrect, answered: value !== '' });
                    if (input) input.disabled = true;
                });

                if (!(partACorrect && partBCorrect)) questionCorrect = false;
                if (partACorrect && partBCorrect) correctFullTasksCount++;
            }

            if (block) {
                block.classList.toggle('question-correct', questionCorrect);
                block.classList.toggle('question-incorrect', !questionCorrect);
            }
        });

        const score = Math.round((totalRawScore / Math.max(1, totalTasksCount)) * 1000) / 10;
        const grade = getCertificateGrade(score);

        if (resultBox) {
            resultBox.style.display = '';
            resultBox.innerHTML = `<div class="result-summary">Результат: ${score} баллов — ${grade.level}</div><div>Правильных заданий: ${correctFullTasksCount} из ${totalTasksCount}</div>`;
        }

        const event = new CustomEvent('netija:testSubmitted', { detail: { details, score, grade } });
        document.dispatchEvent(event);
    }

    renderQuestions().then(() => {
        startTimer();
        document.dispatchEvent(new CustomEvent('netija:quizRendered'));
    });
}
