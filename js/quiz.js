function initQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    const submitBtn = document.getElementById('submitBtn');
    const resultBox = document.getElementById('resultBox');
    const timerEl = document.getElementById('timer');

    if (!quizContainer || typeof questions === 'undefined') return;

    let timeLeft = 2 * 60 * 60 + 30 * 60; // 2 часа 30 минут в секундах
    let timerInterval;

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
                submitBtn.click();
                timerEl.textContent = "Время вышло";
            }
        }, 1000);
    }

    startTimer();


    questions.forEach((q, index) => {
        const questionBlock = document.createElement('div');
        questionBlock.className = 'question-block';
        questionBlock.id = `question-block-${index}`;

        const questionText = document.createElement('p');
        questionText.className = 'question-text';
        questionText.textContent = `${index + 1}. ${q.question}`;
        questionBlock.appendChild(questionText);

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

        quizContainer.appendChild(questionBlock);
    });

    submitBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        let correctCount = 0;
        const details = [];

        questions.forEach((q, index) => {
            const selected = document.querySelector(`input[name="question-${index}"]:checked`);
            const selectedValue = selected ? parseInt(selected.value) : null;
            const isCorrect = selectedValue === q.correctAnswer;

            if (isCorrect) correctCount++;

            details.push({
                number: index + 1,
                isCorrect: isCorrect,
                answered: selectedValue !== null
            });

            const block = document.getElementById(`question-block-${index}`);
            block.classList.remove('question-correct', 'question-incorrect');
            block.classList.add(isCorrect ? 'question-correct' : 'question-incorrect');
        });

        renderResultBox(correctCount, details);
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    function renderResultBox(correctCount, details) {
        resultBox.innerHTML = '';
        resultBox.style.display = 'block';

        const summary = document.createElement('div');
        summary.className = 'result-summary';
        summary.textContent = `Результат: ${correctCount} из ${questions.length} правильных ответов`;
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