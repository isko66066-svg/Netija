const testCards = document.getElementById('testCards');

if (testCards) {
    testsList.forEach((test) => {
        const card = document.createElement('a');
        card.className = 'test-card';
        card.href = `natcert-test.html?id=${test.id}`;

        const title = document.createElement('h3');
        title.className = 'test-card__title';
        title.textContent = test.title;

        const count = document.createElement('p');
        count.className = 'test-card__count';
        count.textContent = `${test.questionsCount} вопросов`;

        card.appendChild(title);
        card.appendChild(count);
        testCards.appendChild(card);
    });
}
// Пример того, как добавить проверку результатов в твой существующий render-cards.js
async function renderCardsWithResults() {
    // 1. Сначала твоя функция рисует карточки внутри #testCards
    // (предполагаем, что карточки уже отрисовались и у каждой есть атрибут data-test-id и .card-status)
    
    try {
        const response = await fetch('/api/get-user-results.php');
        if (!response.ok) return;
        const results = await response.json();

        const cards = document.querySelectorAll('.test-card');
        
        cards.forEach(card => {
            const testId = card.getAttribute('data-test-id');
            const statusBox = card.querySelector('.card-status');
            const btn = card.querySelector('.btn-card-action');

            const userResult = results.find(r => r.testId === testId);

            if (userResult && statusBox) {
                const isGood = userResult.percent >= 70;
                const badgeClass = isGood ? 'card-badge--success' : 'card-badge--warning';

                statusBox.innerHTML = `
                    <div class="card-badge ${badgeClass}">
                        <span>✓ Результат: ${userResult.score}/${userResult.maxScore} (${userResult.percent}%)</span>
                    </div>
                `;

                if (btn) {
                    btn.textContent = 'Пройти повторно';
                    btn.classList.add('completed');
                }
            }
        });
    } catch (error) {
        console.log('Результаты не загружены (возможно, пользователь не авторизован)');
    }
}

// Запускай эту функцию сразу после отрисовки карточек
document.addEventListener('DOMContentLoaded', () => {
    // твоя функция отрисовки карточек...
    // renderTestCards(); 

    // И сразу следом проверяем результаты:
    renderCardsWithResults();
});