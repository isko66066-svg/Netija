const burgerBtn = document.getElementById('burgerBtn');
const headerList = document.querySelector('.header__list');

if (burgerBtn && headerList) {
    const closeMenu = () => {
        headerList.classList.remove('open');
        burgerBtn.classList.remove('active');
    };

    burgerBtn.addEventListener('click', () => {
        headerList.classList.toggle('open');
        burgerBtn.classList.toggle('active');
    });

    headerList.addEventListener('click', (event) => {
        if (event.target.closest('.header__list-link')) {
            closeMenu();
        }
    });
}
