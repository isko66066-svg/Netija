var testCards = document.getElementById('testCards');

function createSvgIcon(type, className) {
    const wrapper = document.createElement('span');
    wrapper.className = className || '';
    wrapper.setAttribute('aria-hidden', 'true');

    const icons = {
        calendar: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3.5" y="5.5" width="17" height="15" rx="3" stroke="currentColor" stroke-width="1.8"/><path d="M7.5 3.5V7M16.5 3.5V7M3.5 9.5H20.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M8 13H8.01M12 13H12.01M16 13H16.01M8 17H8.01M12 17H12.01" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
        document: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 3.5H14L18 7.5V20.5H6.5V3.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 3.5V8H18M9 12H16M9 15.5H16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        star: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3.7L14.55 8.86L20.25 9.69L16.13 13.72L17.1 19.4L12 16.72L6.9 19.4L7.87 13.72L3.75 9.69L9.45 8.86L12 3.7Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`
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
        title.appendChild(createSvgIcon('calendar', 'test-card__title-icon'));
        title.appendChild(document.createTextNode(test.title));

        const count = document.createElement('p');
        count.className = 'test-card__count';
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
        <div class="card-badge ${badgeClass}">
            <span class="card-badge__icon" aria-hidden="true">${createSvgIcon('star').innerHTML}</span>
            <span class="card-badge__text">Лучший результат: ${result.score} (${result.correctCount}/${result.total}) — ${result.level}</span>
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
            btn.textContent = 'Пройти повторно';
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

/* ===== National certificate visual fixes ===== */
(function applyNatcertVisualFixes() {
    if (!document.querySelector('.main__natcert')) return;

    const style = document.createElement('style');
    style.textContent = `
        /* Keep the year filter clearly below the decorative hero illustration. */
        .main__natcert .filter-container {
            margin-top: 72px !important;
        }

        /* Draw a real geometric checkmark instead of the slanted text glyph. */
        .main__natcert .filter-btn.active[data-filter]:not([data-filter="all"])::after {
            content: "" !important;
            position: absolute !important;
            left: 21px !important;
            top: 50% !important;
            width: 11px !important;
            height: 6px !important;
            border-left: 2.5px solid #aeb8c4 !important;
            border-bottom: 2.5px solid #aeb8c4 !important;
            border-radius: 1px !important;
            display: block !important;
            transform: translateY(-65%) rotate(-45deg) !important;
            transform-origin: center !important;
            color: transparent !important;
            font-size: 0 !important;
        }

        @media (max-width: 700px) {
            .main__natcert .filter-container {
                margin-top: 26px !important;
            }

            .main__natcert .filter-btn.active[data-filter]:not([data-filter="all"])::after {
                left: 17px !important;
                width: 8px !important;
                height: 5px !important;
                border-left-width: 2px !important;
                border-bottom-width: 2px !important;
                transform: translateY(-65%) rotate(-45deg) !important;
            }
        }
    `;
    document.head.appendChild(style);
})();
