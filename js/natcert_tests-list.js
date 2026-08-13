const testsList = [
    { id: 1, title: "28-февраля, 1 смена", questionsCount: 45 },
];




















const testCards = document.getElementById('testCards');

if (testCards) {
    testsList.forEach((test) => {
        // Создаем саму карточку (ссылку на тест)
        const card = document.createElement('a');
        card.className = 'test-card';
        card.href = `natcert-test.html?id=${test.id}`;
        card.setAttribute('data-test-id', `natcert-${test.id}`); // Важно для привязки результатов

        // Блок для статуса прохождения / баллов
        const statusBox = document.createElement('div');
        statusBox.className = 'card-status';
        
        const title = document.createElement('h3');
        title.className = 'test-card__title';
        title.textContent = test.title;

        const count = document.createElement('p');
        count.className = 'test-card__count';
        count.textContent = `${test.questionsCount} вопросов`;

        // Кнопка действия
        const actionBtn = document.createElement('span');
        actionBtn.className = 'btn-card-action';
        actionBtn.textContent = 'Начать тест';

        // Собираем карточку воедино
        card.appendChild(statusBox);
        card.appendChild(title);
        card.appendChild(count);
        card.appendChild(actionBtn);
        
        testCards.appendChild(card);
    });
}