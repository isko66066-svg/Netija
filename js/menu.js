(function () {
    const HEADER_HTML = `
        <header class="header site-header">
            <div class="header__container">
                <nav class="header__nav" aria-label="Основная навигация">
                    <a class="site-header__logo" href="index.html" aria-label="Netija">
                        <img class="logo" src="./images/logo.svg" alt="Netija">
                    </a>

                    <ul class="header__list">
                        <li class="header__list-item mobile-premium-item">
                            <a class="mobile-premium-card" href="premium.html">
                                <span class="mobile-premium-icon" aria-hidden="true">♛</span>
                                <span class="mobile-premium-copy">
                                    <strong>Premium активен</strong>
                                    <small>Спасибо, что вы с нами!</small>
                                </span>
                                <span class="mobile-premium-avatar" aria-hidden="true"></span>
                                <span class="mobile-premium-arrow" aria-hidden="true">›</span>
                            </a>
                        </li>
                        <li class="header__list-item menu-nav-item"><a class="header__list-link" href="index.html"><span class="menu-icon menu-icon--home" aria-hidden="true">⌂</span><span>Главная страница</span></a></li>
                        <li class="header__list-item menu-nav-item"><a class="header__list-link" href="/"><span class="menu-icon menu-icon--dtm" aria-hidden="true">◆</span><span>Дтм</span></a></li>
                        <li class="header__list-item menu-nav-item"><a class="header__list-link" href="natcert.html"><span class="menu-icon menu-icon--natcert" aria-hidden="true">⬡</span><span>Национальный сертификат</span></a></li>
                    </ul>

                    <div class="site-header__account">
                        <a class="premium-nav-link" href="premium.html">👑 Premium</a>
                        <button class="site-notification" type="button" aria-label="Уведомления">♧<span>1</span></button>
                        <div class="sign__button" id="googleSignInButton"></div>
                        <div id="userProfile" class="user-profile" style="display:none;"><img id="userAvatar" class="user-profile__avatar" src="" alt=""><span id="userName" class="user-profile__name"></span></div>
                        <button class="burger" id="burgerBtn" type="button" aria-label="Открыть меню" aria-expanded="false"><span></span><span></span><span></span></button>
                    </div>
                </nav>
            </div>
        </header>`;

    function iconSvg(type) {
        const common = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
        const icons = {
            home: `<svg ${common}><path d="M3.5 10.5 12 3.8l8.5 6.7"/><path d="M5.5 9.5v10h13v-10"/><path d="M9.5 19.5v-5h5v5"/></svg>`,
            dtm: `<svg ${common}><path d="m12 3 8.5 9-8.5 9-8.5-9L12 3Z"/><path d="M8.5 12h7"/></svg>`,
            natcert: `<svg ${common}><path d="m12 3.5 7.4 4.25v8.5L12 20.5l-7.4-4.25v-8.5L12 3.5Z"/><path d="M9.3 12h5.4"/></svg>`,
            avatar: `<svg ${common}><circle cx="12" cy="8" r="3.1"/><path d="M5.8 19.2c.9-3 3-4.6 6.2-4.6s5.3 1.6 6.2 4.6"/></svg>`,
            name: `<svg ${common}><path d="M4 17.5h4.2"/><path d="M4 12h7"/><path d="M4 6.5h9"/><path d="M17.5 14.2a3.2 3.2 0 1 0-2.7-5"/><path d="M14.8 17.7a4.6 4.6 0 0 0 5.2-2.3"/></svg>`,
            logout: `<svg ${common}><path d="M10 5H5.5v14H10"/><path d="M13 8.5 17 12l-4 3.5"/><path d="M17 12H8"/></svg>`,
            crown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 7 3.2 3.2L12 4l4.8 6.2L20 7l-1.4 11H5.4L4 7Z"/><path d="M6.2 20h11.6"/></svg>`
        };
        return icons[type] || '';
    }

    function setActiveLink(header) {
        const path = window.location.pathname.toLowerCase();
        header.querySelectorAll('.header__list-link, .premium-nav-link, .mobile-premium-card').forEach(link => link.classList.remove('active'));
        let selector = '.header__list-link[href="index.html"]';
        if (path.includes('natcert-test')) selector = '.header__list-link[href="natcert.html"]';
        else if (path.includes('natcert')) selector = '.header__list-link[href="natcert.html"]';
        else if (path.includes('premium')) selector = '.premium-nav-link, .mobile-premium-card';
        else if (path.endsWith('/') || path.endsWith('/index.html')) selector = '.header__list-link[href="index.html"]';
        header.querySelectorAll(selector).forEach(link => link.classList.add('active'));
    }

    function closeMobileMenu() {
        const header = document.querySelector('.site-header');
        const list = header?.querySelector('.header__list');
        const burger = document.getElementById('burgerBtn');
        if (header) header.classList.remove('menu-open');
        if (list) list.classList.remove('open');
        if (burger) {
            burger.classList.remove('active');
            burger.setAttribute('aria-expanded', 'false');
        }
        document.body.classList.remove('menu-lock');
    }

    function toggleMobileMenu() {
        const header = document.querySelector('.site-header');
        const list = header?.querySelector('.header__list');
        const burger = document.getElementById('burgerBtn');
        if (!header || !list || !burger) return;
        const open = !header.classList.contains('menu-open');
        header.classList.toggle('menu-open', open);
        list.classList.toggle('open', open);
        burger.classList.toggle('active', open);
        burger.setAttribute('aria-expanded', String(open));
        document.body.classList.toggle('menu-lock', open);
    }

    function loadMobilePolishStyles() {
        if (document.getElementById('netija-mobile-polish-css')) return;
        const style = document.createElement('style');
        style.id = 'netija-mobile-polish-css';
        style.textContent = `
            @media (max-width:700px) {
                .site-header .header__list{left:10px!important;right:10px!important;top:68px!important;padding:10px!important;gap:6px!important;border-radius:18px!important;background:linear-gradient(180deg,#0d2b70 0%,#0a235d 100%)!important;border:1px solid rgba(111,157,255,.22)!important;box-shadow:0 22px 55px rgba(2,8,23,.46)!important}
                .site-header .header__list-item.menu-nav-item{padding:0!important;border:0!important}
                .site-header .header__list-link{min-height:56px!important;height:56px!important;padding:7px 12px!important;gap:12px!important;border:1px solid rgba(111,157,255,.13)!important;border-radius:14px!important;background:rgba(24,73,166,.72)!important;color:#fff!important;font-size:13px!important;font-weight:700!important;line-height:1.15!important;letter-spacing:-.1px!important}
                .site-header .header__list-link.active{padding-left:12px!important;background:rgba(43,100,218,.82)!important;box-shadow:inset 0 0 0 1px rgba(116,166,255,.16)!important}
                .site-header .header__list-link.active::after{display:none!important}
                .site-header .menu-icon{width:40px!important;height:40px!important;min-width:40px!important;display:flex!important;align-items:center!important;justify-content:center!important;border-radius:12px!important;color:#a9d3ff!important;background:rgba(33,105,228,.88)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.12)!important}
                .site-header .menu-icon--dtm{color:#f1a6ff!important;background:linear-gradient(135deg,#5f2bea,#7138f4)!important}
                .site-header .menu-icon--natcert{color:#72efff!important;background:linear-gradient(135deg,#1477e8,#1689f4)!important}
                .site-header .menu-icon svg{width:21px!important;height:21px!important}
                .site-header .mobile-premium-item{padding:0 0 5px!important;border:0!important}
                .site-header .mobile-premium-card{min-height:104px!important;padding:14px!important;display:grid!important;grid-template-columns:48px minmax(0,1fr) 44px 20px!important;align-items:center!important;gap:11px!important;border-radius:20px!important;background:linear-gradient(135deg,#6a28e8 0%,#4d2ee5 52%,#7a2be8 100%)!important;border:1px solid rgba(174,137,255,.58)!important;box-shadow:0 10px 26px rgba(84,44,226,.34),inset 0 1px 0 rgba(255,255,255,.13)!important;color:#fff!important}
                .site-header .mobile-premium-icon{width:48px!important;height:48px!important;display:flex!important;align-items:center!important;justify-content:center!important;border-radius:15px!important;background:rgba(255,255,255,.14)!important;color:#ffe35d!important}
                .site-header .mobile-premium-icon svg{width:29px!important;height:29px!important}
                .site-header .mobile-premium-copy{min-width:0!important;display:flex!important;flex-direction:column!important;gap:3px!important}
                .site-header .mobile-premium-copy strong{font-size:16px!important;line-height:1.15!important;font-weight:800!important}
                .site-header .mobile-premium-copy small{font-size:11px!important;line-height:1.25!important;opacity:.9!important}
                .site-header .mobile-premium-avatar{width:40px!important;height:40px!important;border-radius:50%!important;background:rgba(255,255,255,.14) center/cover no-repeat!important;border:2px solid rgba(255,255,255,.92)!important;box-shadow:0 0 0 3px rgba(255,255,255,.12)!important}
                .site-header .mobile-premium-arrow{font-size:29px!important;font-weight:300!important;line-height:1!important;color:#fff!important}
                .site-header .account-item{padding:0!important;border:0!important}
                .site-header .account-item-link{min-height:52px!important;height:52px!important;padding:6px 12px!important;gap:12px!important;border:1px solid rgba(111,157,255,.12)!important;border-radius:13px!important;background:rgba(24,73,166,.52)!important;color:#f7faff!important;font-size:13px!important;font-weight:650!important;line-height:1.15!important}
                .site-header .account-inline-icon{width:36px!important;height:36px!important;min-width:36px!important;display:flex!important;align-items:center!important;justify-content:center!important;border-radius:11px!important;background:rgba(39,125,238,.86)!important;color:#d8edff!important}
                .site-header .account-inline-icon svg{width:19px!important;height:19px!important}
                .site-header .account-item-link--danger{color:#ff9eab!important;background:rgba(111,35,92,.34)!important}
                .site-header .account-item-link--danger .account-inline-icon{background:rgba(191,55,121,.55)!important;color:#ffb1c0!important}
                .site-header .login-item{padding:10px 4px 2px!important;margin-top:3px!important;border-top:1px solid rgba(255,255,255,.09)!important}
                .site-header .login-item-label{font-size:13px!important;margin:0 0 8px!important}
                .site-header .login-item-button{border-radius:10px!important}
                .site-header .burger{width:46px!important;height:46px!important;border-radius:15px!important}
            }
            @media (max-width:390px){
                .site-header .header__list{left:7px!important;right:7px!important;padding:8px!important}
                .site-header .header__list-link{font-size:12px!important}
                .site-header .mobile-premium-copy strong{font-size:15px!important}
                .site-header .mobile-premium-copy small{font-size:10px!important}
                .site-header .mobile-premium-card{grid-template-columns:44px minmax(0,1fr) 36px 16px!important;gap:8px!important}
                .site-header .mobile-premium-icon{width:44px!important;height:44px!important}
                .site-header .mobile-premium-avatar{width:34px!important;height:34px!important}
            }
        `;
        document.head.appendChild(style);
    }

    function applyIcons(header) {
        [['.menu-icon--home','home'],['.menu-icon--dtm','dtm'],['.menu-icon--natcert','natcert'],['.mobile-premium-icon','crown']].forEach(([selector,type]) => {
            const el = header.querySelector(selector);
            if (el) el.innerHTML = iconSvg(type);
        });

        header.querySelectorAll('.account-item-link').forEach(link => {
            if (link.classList.contains('account-item-link--danger')) link.dataset.menuIcon = 'logout';
            else if (link.textContent.includes('аватар')) link.dataset.menuIcon = 'avatar';
            else if (link.textContent.includes('имя')) link.dataset.menuIcon = 'name';
            const type = link.dataset.menuIcon;
            if (!type || link.querySelector('.account-inline-icon')) return;
            const icon = document.createElement('span');
            icon.className = 'account-inline-icon';
            icon.innerHTML = iconSvg(type);
            link.prepend(icon);
        });
    }

    function syncPremiumAvatar(header) {
        const avatar = header.querySelector('.mobile-premium-avatar');
        if (!avatar) return;
        try {
            const saved = JSON.parse(localStorage.getItem('netija_user') || 'null');
            avatar.style.backgroundImage = saved?.picture ? `url("${saved.picture}")` : '';
        } catch (_) {
            avatar.style.backgroundImage = '';
        }
    }

    function observeDynamicAccountItems(header) {
        const list = header.querySelector('.header__list');
        if (!list || list.dataset.iconsObserver) return;
        list.dataset.iconsObserver = '1';
        const observer = new MutationObserver(() => {
            applyIcons(header);
            syncPremiumAvatar(header);
        });
        observer.observe(list, { childList:true, subtree:true });
        const avatar = document.getElementById('userAvatar');
        if (avatar) {
            const avatarObserver = new MutationObserver(() => syncPremiumAvatar(header));
            avatarObserver.observe(avatar, { attributes:true, attributeFilter:['src'] });
        }
        window.addEventListener('netija:login', () => syncPremiumAvatar(header));
    }

    window.initNetijaHeader = function () {
        const oldHeader = document.querySelector('.site-header, .header, .exam-header');
        if (oldHeader) oldHeader.outerHTML = HEADER_HTML;
        else document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);
        const header = document.querySelector('.site-header');
        if (!header) return;

        loadMobilePolishStyles();
        setActiveLink(header);
        applyIcons(header);
        syncPremiumAvatar(header);
        observeDynamicAccountItems(header);

        const burgerBtn = document.getElementById('burgerBtn');
        const headerList = header.querySelector('.header__list');
        if (burgerBtn && headerList) {
            burgerBtn.addEventListener('click', event => {
                event.preventDefault();
                event.stopPropagation();
                toggleMobileMenu();
            });
            headerList.addEventListener('click', event => {
                const link = event.target.closest('a.header__list-link, a.mobile-premium-card');
                if (link) closeMobileMenu();
            });
        }
        document.addEventListener('click', event => {
            if (!window.matchMedia('(max-width:700px)').matches) return;
            if (!header.classList.contains('menu-open')) return;
            if (event.target.closest('.header__list') || event.target.closest('#burgerBtn')) return;
            closeMobileMenu();
        });
        document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMobileMenu(); });
        window.addEventListener('resize', () => { if (window.innerWidth > 700) closeMobileMenu(); });
    };

    function initExamQuestionMap() {
        const grid = document.getElementById('questionGrid');
        const map = document.getElementById('answerMapGrid');
        const container = document.getElementById('quizContainer');
        const total = document.getElementById('totalQuestions');
        if (!grid || !map || !container) return;
        const EXPECTED = 45;
        let builtSignature = '';
        function build() {
            const blocks = Array.from(container.querySelectorAll('.question-block'));
            if (blocks.length < EXPECTED) return;
            const signature = blocks.slice(0,EXPECTED).map(block => block.id).join('|');
            if (signature === builtSignature && grid.children.length === EXPECTED) return;
            builtSignature = signature;
            grid.innerHTML = '';
            map.innerHTML = '';
            if (total) total.textContent = String(EXPECTED);
            const questionButtons = [];
            const mapButtons = [];
            blocks.slice(0,EXPECTED).forEach((block,index) => {
                const text = block.querySelector('.question-text');
                const match = text && text.textContent.match(/^(\d+)/);
                const number = match ? match[1] : String(index + 1);
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'question-number';
                button.textContent = number;
                button.addEventListener('click', () => block.scrollIntoView({behavior:'smooth',block:'start'}));
                grid.appendChild(button);
                questionButtons.push(button);
                const mapButton = document.createElement('button');
                mapButton.type = 'button';
                mapButton.className = 'answer-map-cell';
                mapButton.textContent = number;
                mapButton.addEventListener('click', () => block.scrollIntoView({behavior:'smooth',block:'start'}));
                map.appendChild(mapButton);
                mapButtons.push(mapButton);
            });
            function isAnswered(block) {
                return Array.from(block.querySelectorAll('input[type="radio"]')).some(input => input.checked)
                    || Array.from(block.querySelectorAll('input[type="text"]')).some(input => input.value.trim() !== '')
                    || Array.from(block.querySelectorAll('select')).some(select => select.value !== '');
            }
            function updateStates() {
                blocks.slice(0,EXPECTED).forEach((block,index) => {
                    const answered = isAnswered(block);
                    questionButtons[index]?.classList.toggle('answered',answered);
                    mapButtons[index]?.classList.toggle('answered',answered);
                    mapButtons[index]?.classList.toggle('correct',block.classList.contains('question-correct'));
                    mapButtons[index]?.classList.toggle('incorrect',block.classList.contains('question-incorrect'));
                });
            }
            container.addEventListener('change',updateStates);
            container.addEventListener('input',updateStates);
            const current = document.getElementById('currentQuestion');
            if (window.IntersectionObserver) {
                const intersection = new IntersectionObserver(entries => entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    const index = blocks.indexOf(entry.target);
                    if (index < 0 || index >= EXPECTED) return;
                    questionButtons.forEach((button,n) => button.classList.toggle('current',n === index));
                    mapButtons.forEach((button,n) => button.classList.toggle('current',n === index));
                    if (current) current.textContent = String(index + 1);
                }),{root:null,rootMargin:'-18% 0px -62% 0px',threshold:0});
                blocks.slice(0,EXPECTED).forEach(block => intersection.observe(block));
            }
            updateStates();
        }
        const observer = new MutationObserver(build);
        observer.observe(container,{childList:true,subtree:true});
        build();
    }

    function loadExamUiFixes() {
        if (!document.body.classList.contains('exam-body')) return;
        if (document.querySelector('script[data-netija-exam-ui-fixes]')) return;
        const script = document.createElement('script');
        script.src = 'js/exam-ui-fixes.js';
        script.dataset.netijaExamUiFixes = '1';
        document.body.appendChild(script);
    }

    function start() {
        window.initNetijaHeader();
        initExamQuestionMap();
        loadExamUiFixes();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',start,{once:true});
    else start();
})();
