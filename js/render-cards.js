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