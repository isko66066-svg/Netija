(function () {
    const HEADER_HTML = `
        <header class="site-header">
            <div class="header__container">
                <nav class="header__nav" aria-label="Основная навигация">
                    <a class="site-header__logo" href="index.html" aria-label="Netija"><img class="logo" src="./images/logo.svg" alt="Netija"></a>
                    <ul class="header__list">
                        <li class="header__list-item"><a class="header__list-link" href="index.html">Главная страница</a></li>
                        <li class="header__list-item"><a class="header__list-link" href="/">Дтм</a></li>
                        <li class="header__list-item"><a class="header__list-link" href="natcert.html">Национальный сертификат</a></li>
                    </ul>
                    <div class="site-header__account">
                        <a class="premium-nav-link" href="premium.html">👑 Premium</a>
                        <button class="site-notification" type="button" aria-label="Уведомления">♧<span>1</span></button>
                        <div class="sign__button" id="googleSignInButton"></div>
                        <div id="userProfile" class="user-profile" style="display:none;"><img id="userAvatar" class="user-profile__avatar" src="" alt=""><span id="userName" class="user-profile__name"></span></div>
                        <button class="burger" id="burgerBtn" type="button" aria-label="Меню"><span></span><span></span><span></span></button>
                    </div>
                </nav>
            </div>
        </header>`;

    function setActiveLink(header) {
        const path = window.location.pathname.toLowerCase();
        header.querySelectorAll('.header__list-link, .premium-nav-link').forEach(link => link.classList.remove('active'));
        let selector = '.header__list-link[href="index.html"]';
        if (path.includes('natcert-test')) selector = '.header__list-link[href="natcert.html"]';
        else if (path.includes('natcert')) selector = '.header__list-link[href="natcert.html"]';
        else if (path.includes('premium')) selector = '.premium-nav-link';
        else if (path.endsWith('/') || path.endsWith('/index.html')) selector = '.header__list-link[href="index.html"]';
        const active = header.querySelector(selector);
        if (active) active.classList.add('active');
    }

    window.initNetijaHeader = function () {
        const oldHeader = document.querySelector('.site-header, .header, .exam-header');
        if (oldHeader) oldHeader.outerHTML = HEADER_HTML;
        else document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);
        const header = document.querySelector('.site-header');
        if (!header) return;
        setActiveLink(header);
        const burgerBtn = document.getElementById('burgerBtn');
        const headerList = header.querySelector('.header__list');
        if (burgerBtn && headerList) burgerBtn.addEventListener('click', () => { headerList.classList.toggle('open'); burgerBtn.classList.toggle('active'); });
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', window.initNetijaHeader, { once: true });
    else window.initNetijaHeader();
})();
