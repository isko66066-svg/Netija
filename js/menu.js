(function () {
    const HEADER_HTML = `
        <header class="site-header header">
            <div class="header__container">
                <nav class="header__nav" aria-label="Основная навигация">
                    <a class="site-header__logo" href="index.html" aria-label="Netija">
                        <img class="logo" src="./images/logo.svg" alt="Netija">
                    </a>
                    <ul class="header__list">
                        <li class="header__list-item"><a class="header__list-link" href="index.html">Главная страница</a></li>
                        <li class="header__list-item"><a class="header__list-link" href="/">Дтм</a></li>
                        <li class="header__list-item"><a class="header__list-link" href="natcert.html">Национальный сертификат</a></li>
                    </ul>
                    <div class="site-header__account">
                        <div class="sign__button" id="googleSignInButton"></div>
                        <div id="userProfile" class="user-profile" style="display:none;">
                            <img id="userAvatar" class="user-profile__avatar" src="" alt="">
                            <span id="userName" class="user-profile__name"></span>
                        </div>
                        <button class="burger" id="burgerBtn" type="button" aria-label="Меню">
                            <span></span><span></span><span></span>
                        </button>
                    </div>
                </nav>
            </div>
        </header>`;

    function injectHeaderStyles() {
        if (document.getElementById('netija-shared-header-styles')) return;

        const style = document.createElement('style');
        style.id = 'netija-shared-header-styles';
        style.textContent = `
            .site-header {
                width: 100%;
                max-width: 1200px;
                margin: 0 auto 48px;
                padding: 0;
                background: #fff;
                border: 1px solid #e5e7eb;
                border-radius: 12px;
                box-shadow: 0 1px 3px rgba(15,23,42,.03);
                position: relative;
                z-index: 1000;
            }
            .site-header .header__container { width: 100%; margin: 0; padding: 0; }
            .site-header .header__nav {
                min-height: 56px;
                width: 100%;
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 7px 14px;
                background: transparent;
                border: 0;
                border-radius: 12px;
                max-width: none;
                margin: 0;
            }
            .site-header__logo { flex: 0 0 auto; display:flex; align-items:center; }
            .site-header .logo { display:block; width: 100px; height:auto; margin:0; }
            .site-header .header__list {
                flex: 1 1 auto;
                min-width: 0;
                display:flex;
                align-items:center;
                justify-content:center;
                gap: 7px;
                margin:0;
                padding:0;
                list-style:none;
            }
            .site-header .header__list-item { margin:0; padding:0; }
            .site-header .header__list-link {
                display:inline-flex;
                align-items:center;
                justify-content:center;
                min-height:28px;
                padding:5px 10px;
                background:#f8f9fa;
                border:1px solid #e5e7eb;
                border-radius:999px;
                color:#64748b;
                font-family:Poppins,sans-serif;
                font-size:11px;
                line-height:1;
                font-weight:500;
                letter-spacing:-.1px;
                white-space:nowrap;
                text-decoration:none;
                transition:.2s ease;
            }
            .site-header .header__list-link:hover,
            .site-header .header__list-link.active {
                color:#172033;
                background:#fff;
                border-color:#dfe4ea;
            }
            .site-header__account { flex:0 0 auto; display:flex; align-items:center; gap:8px; }
            .site-header .sign__button { display:flex; align-items:center; }
            .site-header .user-profile { display:flex; align-items:center; gap:7px; position:relative; cursor:pointer; }
            .site-header .user-profile__avatar { width:32px; height:32px; border-radius:50%; object-fit:cover; display:block; }
            .site-header .user-profile__name { max-width:72px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:#172033; font-size:11px; font-weight:600; }
            .site-header .account-dropdown { top:calc(100% + 8px); right:0; }
            .site-header .burger {
                display:none;
                width:30px;
                height:30px;
                padding:5px;
                border:0;
                background:transparent;
                flex-direction:column;
                justify-content:center;
                gap:4px;
                cursor:pointer;
            }
            .site-header .burger span { display:block; width:20px; height:2px; border-radius:2px; background:#172033; }

            @media (max-width: 700px) {
                .site-header { margin-bottom:48px; border-radius:12px; }
                .site-header .header__nav { min-height:54px; padding:7px 9px; gap:5px; }
                .site-header .logo { width:98px; }
                .site-header .header__list { gap:4px; justify-content:flex-end; }
                .site-header .header__list-link { min-height:26px; padding:5px 8px; font-size:9px; }
                .site-header .user-profile__avatar { width:28px; height:28px; }
                .site-header .user-profile__name { display:none; }
                .site-header .sign__button { max-width:28px; overflow:hidden; }
                .site-header .burger { display:none; }
            }
            @media (max-width: 430px) {
                .site-header .header__nav { padding-left:7px; padding-right:7px; }
                .site-header .logo { width:92px; }
                .site-header .header__list { gap:3px; }
                .site-header .header__list-link { padding-left:6px; padding-right:6px; font-size:8.5px; }
                .site-header .user-profile__avatar { width:26px; height:26px; }
            }
        `;
        document.head.appendChild(style);
    }

    function setActiveLink(header) {
        const path = window.location.pathname.toLowerCase();
        header.querySelectorAll('.header__list-link').forEach(link => link.classList.remove('active'));
        let selector = '.header__list-link[href="index.html"]';
        if (path.includes('natcert')) selector = '.header__list-link[href="natcert.html"]';
        if (path.endsWith('/') || path.endsWith('/index.html')) selector = '.header__list-link[href="index.html"]';
        const active = header.querySelector(selector);
        if (active) active.classList.add('active');
    }

    function initHeader() {
        const oldHeader = document.querySelector('.site-header, .header, .exam-header');
        if (oldHeader) oldHeader.outerHTML = HEADER_HTML;
        else document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);

        injectHeaderStyles();

        const header = document.querySelector('.site-header');
        if (!header) return;
        setActiveLink(header);

        const burgerBtn = document.getElementById('burgerBtn');
        const headerList = header.querySelector('.header__list');
        if (burgerBtn && headerList) {
            burgerBtn.addEventListener('click', () => {
                headerList.classList.toggle('open');
                burgerBtn.classList.toggle('active');
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeader, { once: true });
    } else {
        initHeader();
    }
})();
