const burgerBtn = document.getElementById('burgerBtn');
const headerList = document.querySelector('.header__list');
burgerBtn.addEventListener('click', () => {
    headerList.classList.toggle('open');
    burgerBtn.classList.toggle('active');
});

const userResult = results.find(r => r.testId === testId);

if (userResult && statusBox) {
    const isGood = userResult.percent >= 70;
    const statusType = isGood ? 'success' : 'warning';

    // Рендерим полноценный прогресс-бар вместо обычного текста
    statusBox.innerHTML = `
        <div class="progress-container">
            <div class="progress-info">
                <span>Результат: ${userResult.score}/${userResult.maxScore}</span>
                <span>${userResult.percent}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill ${statusType}" style="width: ${userResult.percent}%"></div>
            </div>
        </div>
    `;

    // Меняем кнопку на "Пройти повторно"
    if (btn) {
        btn.textContent = 'Пройти повторно';
        btn.classList.add('completed');
    }
}