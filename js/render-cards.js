var testCards = document.getElementById('testCards');

function createSvgIcon(type, className) {
    const wrapper = document.createElement('span');
    wrapper.className = className;
    wrapper.setAttribute('aria-hidden', 'true');
    wrapper.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:2;';

    const icons = {
        calendar: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3.5" y="5.5" width="17" height="15" rx="3" stroke="currentColor" stroke-width="1.8"/><path d="M7.5 3.5V7M16.5 3.5V7M3.5 9.5H20.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M8 13H8.01M12 13H12.01M16 13H16.01M8 17H8.01M12 17H12.01" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
        document: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 3.5H14L18 7.5V20.5H6.5V3.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 3.5V8H18M9 12H16M9 15.5H16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        star: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3.7L14.55 8.86L20.25 9.69L16.13 13.72L17.1 19.4L12 16.72L6.9 19.4L7.87 13.72L3.75 9.69L9.45 8.86L12 3.7Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`
    };

    wrapper.innerHTML = icons[type] || '';
    return wrapper;
}

if (testCards) {
    testsList.forEach((test) => {
        const card = document.createElement('a');
        card.className = 'test-card';
        card.href = `natcert-test.html?id=${test.id}`;
        card.setAttribute('data-test-id', `natcert-${test.id}`);
        card.setAttribute('data-year', String(test.year));

        const statusBox = document.createElement('div');
        statusBox.className = 'card-status';

        const title = document.createElement('h3');
        title.className = 'test-card__title';
        title.style.position = 'relative';
        title.appendChild(createSvgIcon('calendar', 'test-card__title-icon'));
        title.appendChild(document.createTextNode(test.title));

        const count = document.createElement('p');
        count.className = 'test-card__count';
        count.style.position = 'relative';
        count.appendChild(createSvgIcon('document', 'test-card__count-icon'));
        count.appendChild(document.createTextNode(`${test.questionsCount} вопросов`));

        const actionBtn = document.createElement('span');
        actionBtn.className = 'btn-card-action';
        actionBtn.appendChild(document.createTextNode('Пройти тест'));

        card.appendChild(statusBox);
        card.appendChild(title);
        card.appendChild(count);
        card.appendChild(actionBtn);
        testCards.appendChild(card);
    });

    loadResultsFromStorage();
}

function renderStatus(statusBox, result) {
    if (!statusBox) return;

    const isGood = result.score >= 44;
    const badgeClass = isGood ? 'card-badge--success' : 'card-badge--warning';

    statusBox.innerHTML = `
        <div class="card-badge ${badgeClass}" style="position:relative;">
            <span class="card-badge__icon" aria-hidden="true" style="position:absolute;left:12px;top:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;transform:translateY(-50%);z-index:2;">
                ${createSvgIcon('star', '').innerHTML}
            </span>
            <span style="position:relative;z-index:1;margin-left:28px;">Лучший результат: ${result.score} (${result.correctCount}/${result.total}) — ${result.level}</span>
        </div>
    `;
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

        renderStatus(statusBox, result);

        if (btn) {
            btn.firstChild.textContent = 'Пройти повторно';
            btn.classList.add('completed');
        }
    });
}

var filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const selectedYear = String(button.getAttribute('data-filter') || 'all');
        const cards = document.querySelectorAll('.test-card');

        cards.forEach(card => {
            const cardYear = String(card.getAttribute('data-year') || '');
            const hidden = selectedYear !== 'all' && cardYear !== selectedYear;
            card.classList.toggle('filter-hidden', hidden);
            card.style.setProperty('display', hidden ? 'none' : 'flex', 'important');
        });
    });
});
