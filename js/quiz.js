function initQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    const submitBtn = document.getElementById('submitBtn');
    const resultBox = document.getElementById('resultBox');
    const timerEl = document.getElementById('timer');
    const EXPECTED_QUESTIONS = 45;

    if (!quizContainer || typeof questions === 'undefined') {
        console.error('Quiz: quizContainer или questions не найдены');
        return;
    }

    let testSubmitted = false;
    window.quizInProgress = true;
    window.quizSubmitted = false;

    function renderMath(element) {
        if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
            return window.MathJax.typesetPromise([element]).catch(error => console.error('MathJax error:', error));
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
        if (!timerEl) return;
        timerEl.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        timerEl.classList.toggle('timer--warning', timeLeft <= 300);
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
        return String(text).replace(/</g, '&lt;').replace(/>/g, '&gt;');
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
            if (!window.confirm('Вы уверены, что хотите завершить тест и проверить результат?')) return;
            submitTest();
        });
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
        let totalScoredParts = 0;
        const details = [];

        questions.forEach((q) => {
            const block = document.getElementById(`question-block-${q.id}`);
            let questionCorrect = true;

            if (q.type === 'single_choice') {
                totalScoredParts++;
                const points = q.points !== undefined ? q.points : 1.3;
                const selected = document.querySelector(`input[name="q-${q.id}"]:checked`);
                const selectedValue = selected ? parseInt(selected.value, 10) : null;
                const isCorrect = selectedValue === q.correctAnswer;
                if (isCorrect) {
                    totalRawScore += points;
                    correctFullTasksCount++;
                } else questionCorrect = false;
                details.push({ number: q.id, isCorrect, answered: selectedValue !== null });

                if (block) {
                    block.querySelectorAll('.option-label').forEach((label, idx) => {
                        label.classList.remove('correct-answer', 'wrong-answer');
                        const input = label.querySelector('input');
                        if (input) input.disabled = true;
                        if (idx === q.correctAnswer) label.classList.add('correct-answer');
                        else if (idx === selectedValue && !isCorrect) label.classList.add('wrong-answer');
                    });
                }
            }

            if (q.type === 'matching') {
                const points = q.points !== undefined ? q.points : 2.2;
                let allCorrect = true;
                q.items.forEach((item) => {
                    totalScoredParts++;
                    const select = block ? block.querySelector(`select[data-item-id="${item.id}"]`) : null;
                    const selectedValue = select ? select.value : '';
                    const isItemCorrect = selectedValue === item.correctAnswer;
                    if (!isItemCorrect) allCorrect = false;
                    details.push({ number: item.id, isCorrect: isItemCorrect, answered: selectedValue !== '' });
                    if (select) {
                        select.disabled = true;
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
                if (allCorrect) {
                    totalRawScore += points;
                    correctFullTasksCount++;
                } else questionCorrect = false;
            }

            if (q.type === 'open_ended') {
                let aCorrect = false;
                let bCorrect = false;
                q.subQuestions.forEach((sub) => {
                    totalScoredParts++;
                    const input = block ? block.querySelector(`input[data-question-id="${q.id}"][data-sub-id="${sub.id}"]`) : null;
                    const value = input ? input.value.trim() : '';
                    const correctAnswer = sub.correctAnswer;
                    const isCorrect = correctAnswer !== null && correctAnswer !== undefined && value !== '' && value.toLowerCase() === String(correctAnswer).toLowerCase();
                    if (sub.id === 'a') { aCorrect = isCorrect; if (isCorrect) totalRawScore += 1.5; }
                    if (sub.id === 'b') { bCorrect = isCorrect; if (isCorrect) totalRawScore += 1.7; }
                    details.push({ number: `${q.id}${sub.id}`, isCorrect, answered: value !== '' });
                    if (input) input.disabled = true;
                });
                if (aCorrect && bCorrect) correctFullTasksCount++;
                else questionCorrect = false;
            }

            if (block) {
                block.classList.toggle('question-correct', questionCorrect);
                block.classList.toggle('question-incorrect', !questionCorrect);
            }
        });

        // The certificate score is scaled from the raw task points.
        const maxRawScore = 64.2;
        const finalScore = Number(Math.min(100, (totalRawScore / maxRawScore) * 100).toFixed(2));
        const gradeInfo = getCertificateGrade(finalScore);

        const params = new URLSearchParams(window.location.search);
        const testId = params.get('id');
        const storageKey = `result_natcert-${testId}`;
        const currentResult = {
            score: finalScore,
            correctCount: correctFullTasksCount,
            total: EXPECTED_QUESTIONS,
            level: gradeInfo.level
        };
        try {
            const old = JSON.parse(localStorage.getItem(storageKey) || 'null');
            if (old && Number(old.score) > finalScore) {
                currentResult.score = old.score;
                currentResult.correctCount = old.correctCount;
                currentResult.level = old.level;
            }
            localStorage.setItem(storageKey, JSON.stringify(currentResult));
        } catch (error) {
            console.error('Ошибка сохранения результата:', error);
        }

        renderResultBox(finalScore, correctFullTasksCount, EXPECTED_QUESTIONS, gradeInfo);
        document.dispatchEvent(new CustomEvent('netija:testSubmitted', {
            detail: { details, score: finalScore, grade: gradeInfo, correctCount: correctFullTasksCount, total: EXPECTED_QUESTIONS }
        }));
    }

    function renderResultBox(score, correctCount, totalCount, gradeInfo) {
        if (!resultBox) return;
        const passed = gradeInfo.passed;
        resultBox.style.display = 'block';
        resultBox.innerHTML = `
            <div class="result-summary-card">
                <div class="result-header">
                    <div>
                        <div class="result-eyebrow">Результат тестирования</div>
                        <h3>Ваш результат</h3>
                    </div>
                    <span class="result-status-badge ${passed ? 'result-status--success' : 'result-status--fail'}">${passed ? 'Сертификат получен' : 'Не выдается'}</span>
                </div>
                <div class="result-metrics">
                    <div class="metric-item metric-item--score"><span class="metric-label">Итоговый балл</span><span class="metric-value">${score}</span></div>
                    <div class="metric-item"><span class="metric-label">Уровень</span><span class="metric-value highlight">${gradeInfo.level}</span></div>
                    <div class="metric-item"><span class="metric-label">Правильных вопросов</span><span class="metric-value">${correctCount}<small> / ${totalCount}</small></span></div>
                </div>
            </div>
        `;
        renderMath(resultBox);
    }

    renderQuestions().then(() => {
        startTimer();
        document.dispatchEvent(new CustomEvent('netija:quizRendered'));
    });
}
