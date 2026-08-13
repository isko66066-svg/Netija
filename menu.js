const burgerBtn = document.getElementById('burgerBtn');
const headerList = document.querySelector('.header__list');
burgerBtn.addEventListener('click', () => {
    headerList.classList.toggle('open');
    burgerBtn.classList.toggle('active');
});