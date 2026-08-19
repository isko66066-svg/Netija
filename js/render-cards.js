var testCards = document.getElementById('testCards');

if (testCards) {
    testsList.forEach((test) => {
        const card = document.createElement('a');
        card.className = 'test-card';
        card.href = `natcert-test.html?id=${test.id}`;
        card.setAttribute('data-test-id', `natcert-${test.id}`);
        card.setAttribute('data-year', test.year); // Добавлено для правильной работы фильтра по годам

        const statusBox = document.createElement('div');
        statusBox.className = 'card-status';

        const title = document.createElement('h3');
        title.className = 'test-card__title';
        title.textContent = test.title;

        const count = document.createElement('p');
        count.className = 'test-card__count';
        count.textContent = `${test.questionsCount} вопросов`;

        const actionBtn = document.createElement('span');
        actionBtn.className = 'btn-card-action';
        actionBtn.textContent = 'Начать тест';

        card.appendChild(statusBox);
        card.appendChild(title);
        card.appendChild(count);
        card.appendChild(actionBtn);

        testCards.appendChild(card);
    });

    loadResultsFromStorage();
}

function loadResultsFromStorage() {
    const cards = document.querySelectorAll('.test-card');

    cards.forEach(card => {
        const testId = card.getAttribute('data-test-id');
        const saved = localStorage.getItem(`result_${testId}`);
        if (!saved) return;

        const result = JSON.parse(saved);
        const statusBox = card.querySelector('.card-status');
        const btn = card.querySelector('.btn-card-action');

        // Используем баллы (из 100) или проценты
        const isGood = result.score >= 44; // 44 балла — порог для C
        const badgeClass = isGood ? 'card-badge--success' : 'card-badge--warning';

        if (statusBox) {
            statusBox.innerHTML = `
                <div class="card-badge ${badgeClass}">
                    Лучший результат: ${result.score} (${result.correctCount}/${result.total}) — ${result.level}
                </div>
            `;
        }

        if (btn) {
            btn.textContent = 'Пройти повторно';
            btn.classList.add('completed');
        }
    });
}

// Фильтр

var filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Убираем активный класс у всех кнопок и ставим на нажатую
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const selectedYear = button.getAttribute('data-filter');
        const cards = document.querySelectorAll('.test-card');

        cards.forEach(card => {
            const cardYear = card.getAttribute('data-year');
            
            if (selectedYear === 'all' || cardYear === selectedYear) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});