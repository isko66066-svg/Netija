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

    function loadGlobalFixes() {
        if (document.getElementById('netija-global-fixes-css')) return;
        const style = document.createElement('style');
        style.id = 'netija-global-fixes-css';
        style.textContent = `
            /* Account dropdown: desktop only */
            .site-header .account-dropdown,.header .account-dropdown{position:absolute !important;top:calc(100% + 10px) !important;right:0 !important;min-width:190px !important;padding:7px !important;background:#fff !important;border:1px solid #e5e7eb !important;border-radius:13px !important;box-shadow:0 14px 35px rgba(15,23,42,.18) !important;z-index:5000 !important;}
            .site-header .account-dropdown.open,.header .account-dropdown.open{display:flex !important;flex-direction:column !important;}
            .account-dropdown button{border:0 !important;background:transparent !important;text-align:left !important;padding:11px 12px !important;border-radius:9px !important;color:#172033 !important;font:600 13px Poppins,sans-serif !important;cursor:pointer !important;}
            .account-dropdown button:hover{background:#f1f5f9 !important;}
            .account-dropdown button.danger{color:#dc2626 !important;}

            /* National certificate cards */
            .main__natcert{max-width:1180px !important;margin:0 auto !important;padding:64px 24px 90px !important;box-sizing:border-box !important;}
            .main__natcert .test-title{max-width:none !important;margin:0 0 14px !important;padding:0 !important;font-size:42px !important;line-height:1.15 !important;font-weight:800 !important;color:#172033 !important;}
            .main__natcert .test-subtitle{max-width:none !important;margin:0 0 30px !important;padding:0 !important;font-size:17px !important;color:#718096 !important;}
            .main__natcert .filter-container{max-width:none !important;padding:0 !important;margin:0 0 24px !important;display:flex !important;gap:10px !important;flex-wrap:wrap !important;}
            .main__natcert .filter-btn{border:1px solid #dce3ec !important;background:#fff !important;color:#536174 !important;border-radius:999px !important;padding:10px 25px !important;font:600 15px Poppins,sans-serif !important;box-shadow:none !important;}
            .main__natcert .filter-btn.active{background:#070b72 !important;color:#fff !important;border-color:#070b72 !important;box-shadow:0 7px 15px rgba(7,11,114,.18) !important;}
            .main__natcert .test-cards{max-width:none !important;margin:0 !important;padding:0 !important;display:grid !important;grid-template-columns:repeat(3,minmax(0,1fr)) !important;gap:20px !important;align-items:stretch !important;}
            .main__natcert .test-card{min-height:250px !important;box-sizing:border-box !important;background:#fff !important;border:1px solid #e1e7ef !important;border-radius:17px !important;padding:28px !important;display:flex !important;flex-direction:column !important;justify-content:flex-end !important;box-shadow:0 4px 16px rgba(15,23,42,.035) !important;transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease !important;}
            .main__natcert .test-card.filter-hidden{display:none !important;}
            .main__natcert .test-card:hover{transform:translateY(-3px) !important;border-color:#cfd9e7 !important;box-shadow:0 12px 26px rgba(15,23,42,.08) !important;}
            .main__natcert .test-card__title{margin:0 0 14px !important;font-size:20px !important;line-height:1.25 !important;font-weight:800 !important;color:#172033 !important;}
            .main__natcert .test-card__count{margin:0 0 25px !important;font-size:15px !important;color:#718096 !important;}
            .main__natcert .test-card a,.main__natcert .test-card button{width:100% !important;box-sizing:border-box !important;}
            .main__natcert .test-card__result{margin-bottom:auto !important;}

            /* Mobile header */
            @media(max-width:700px){
                html,body{overflow-x:hidden !important;}
                .site-header,.header{height:60px !important;min-height:60px !important;}
                .site-header .header__nav,.header .header__nav{height:60px !important;min-height:60px !important;padding:0 10px !important;gap:6px !important;}
                .site-header .logo,.header .logo{width:120px !important;max-width:none !important;}
                .site-header .header__list,.header .header__list{position:absolute !important;left:10px !important;right:10px !important;top:68px !important;width:auto !important;max-height:calc(100vh - 82px) !important;margin:0 !important;padding:10px !important;display:none !important;flex-direction:column !important;align-items:stretch !important;gap:3px !important;background:#0b1b34 !important;border:1px solid rgba(255,255,255,.09) !important;border-radius:16px !important;box-shadow:0 18px 45px rgba(2,8,23,.38) !important;overflow-y:auto !important;z-index:5000 !important;}
                .site-header .header__list.open,.header .header__list.open{display:flex !important;}
                .site-header .header__list-item,.header .header__list-item{display:block !important;width:100% !important;}
                .site-header .header__list-link,.header .header__list-link{display:flex !important;width:100% !important;min-height:48px !important;height:48px !important;padding:0 14px !important;align-items:center !important;justify-content:flex-start !important;box-sizing:border-box !important;border-radius:10px !important;font-size:14px !important;color:#dbe4f1 !important;}
                .site-header .header__list-link.active,.header .header__list-link.active{background:rgba(59,130,246,.13) !important;padding-left:23px !important;}
                .site-header .header__list-link.active::after,.header .header__list-link.active::after{left:9px !important;right:auto !important;top:12px !important;bottom:12px !important;width:3px !important;height:auto !important;}
                .site-header .site-header__account,.header .site-header__account{margin-left:auto !important;gap:5px !important;display:flex !important;align-items:center !important;}
                .site-header .premium-nav-link,.header .premium-nav-link{font-size:10px !important;padding:8px 10px !important;}
                .site-header .user-profile__avatar,.header .user-profile__avatar{width:39px !important;height:39px !important;}
                .site-header .user-profile__name,.header .user-profile__name{display:none !important;}
                .site-header .burger,.header .burger{position:relative !important;display:flex !important;flex:0 0 34px !important;width:34px !important;height:40px !important;margin:0 !important;padding:0 !important;align-items:center !important;justify-content:center !important;gap:0 !important;}
                .site-header .burger span,.header .burger span{position:absolute !important;left:50% !important;top:50% !important;width:22px !important;height:2.5px !important;margin:0 !important;border-radius:3px !important;background:#fff !important;transition:transform .18s ease,opacity .18s ease !important;}
                .site-header .burger span:nth-child(1),.header .burger span:nth-child(1){transform:translate(-50%,-7px) !important;}
                .site-header .burger span:nth-child(2),.header .burger span:nth-child(2){transform:translate(-50%,0) !important;}
                .site-header .burger span:nth-child(3),.header .burger span:nth-child(3){transform:translate(-50%,7px) !important;}
                .site-header .burger.active span:nth-child(1),.header .burger.active span:nth-child(1){transform:translate(-50%,-50%) rotate(45deg) !important;}
                .site-header .burger.active span:nth-child(2),.header .burger.active span:nth-child(2){opacity:0 !important;transform:translate(-50%,-50%) !important;}
                .site-header .burger.active span:nth-child(3),.header .burger.active span:nth-child(3){transform:translate(-50%,-50%) rotate(-45deg) !important;}
                .site-header .account-dropdown,.header .account-dropdown{display:none !important;}
                .header__list .account-item{display:block !important;}
                .header__list .login-item{display:block !important;}
                .header__list .login-item[style*="display: none"]{display:none !important;}
                .header__list .account-item-link{font:600 14px Poppins,sans-serif !important;text-align:left !important;cursor:pointer !important;color:#dbe4f1 !important;background:transparent !important;border:0 !important;}
                .header__list .account-item-link:hover{background:rgba(255,255,255,.06) !important;}
                .header__list .account-item-link--danger{color:#fca5a5 !important;}
                .header__list .login-item{padding:12px !important;margin-top:6px !important;border-top:1px solid rgba(255,255,255,.1) !important;}
                .login-item-label{color:#fff !important;font:600 14px Poppins,sans-serif !important;margin:0 0 9px !important;}
                .login-item-button{background:#fff !important;border-radius:10px !important;overflow:hidden !important;}
                .main__natcert,.main{margin-top:0 !important;}
                .main__natcert{padding:34px 14px 60px !important;}
                .main__natcert .test-title{font-size:30px !important;}
                .main__natcert .test-subtitle{font-size:15px !important;}
                .main__natcert .test-cards{grid-template-columns:1fr !important;gap:14px !important;}
                .main__natcert .test-card{min-height:230px !important;padding:23px !important;}
                .main__natcert .filter-container{gap:7px !important;}
                .main__natcert .filter-btn{padding:9px 18px !important;font-size:14px !important;}
            }
            @media(min-width:701px){
                .site-header .logo,.header .logo{width:128px !important;max-width:none !important;}
                .header__list .account-item,.header__list .login-item{display:none !important;}
            }
        `;
        document.head.appendChild(style);
    }

    window.initNetijaHeader = function () {
        const oldHeader = document.querySelector('.site-header, .header, .exam-header');
        if (oldHeader) oldHeader.outerHTML = HEADER_HTML;
        else document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);
        const header = document.querySelector('.site-header');
        if (!header) return;
        setActiveLink(header);
        loadGlobalFixes();

        const burgerBtn = document.getElementById('burgerBtn');
        const headerList = header.querySelector('.header__list');
        if (burgerBtn && headerList) {
            burgerBtn.addEventListener('click', () => {
                headerList.classList.toggle('open');
                burgerBtn.classList.toggle('active');
            });
        }

        // On phones the profile/avatar is not a menu trigger.
        // The account menu is available only through the burger.
        document.addEventListener('click', function (event) {
            if (!window.matchMedia('(max-width: 700px)').matches) return;
            const profile = event.target.closest && event.target.closest('#userProfile');
            if (!profile) return;
            event.preventDefault();
            event.stopImmediatePropagation();
        }, true);
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

            const signature = blocks.slice(0, EXPECTED).map(block => block.id).join('|');
            if (signature === builtSignature && grid.children.length === EXPECTED) return;
            builtSignature = signature;

            grid.innerHTML = '';
            map.innerHTML = '';
            if (total) total.textContent = String(EXPECTED);

            const questionButtons = [];
            const mapButtons = [];

            blocks.slice(0, EXPECTED).forEach((block, index) => {
                const text = block.querySelector('.question-text');
                const match = text && text.textContent.match(/^(\d+)/);
                const number = match ? match[1] : String(index + 1);

                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'question-number';
                button.textContent = number;
                button.addEventListener('click', () => block.scrollIntoView({ behavior: 'smooth', block: 'start' }));
                grid.appendChild(button);
                questionButtons.push(button);

                const mapButton = document.createElement('button');
                mapButton.type = 'button';
                mapButton.className = 'answer-map-cell';
                mapButton.textContent = number;
                mapButton.addEventListener('click', () => block.scrollIntoView({ behavior: 'smooth', block: 'start' }));
                map.appendChild(mapButton);
                mapButtons.push(mapButton);
            });

            function isAnswered(block) {
                return Array.from(block.querySelectorAll('input[type="radio"]')).some(input => input.checked)
                    || Array.from(block.querySelectorAll('input[type="text"]')).some(input => input.value.trim() !== '')
                    || Array.from(block.querySelectorAll('select')).some(select => select.value !== '');
            }

            function updateStates() {
                blocks.slice(0, EXPECTED).forEach((block, index) => {
                    const answered = isAnswered(block);
                    questionButtons[index]?.classList.toggle('answered', answered);
                    mapButtons[index]?.classList.toggle('answered', answered);
                    mapButtons[index]?.classList.toggle('correct', block.classList.contains('question-correct'));
                    mapButtons[index]?.classList.toggle('incorrect', block.classList.contains('question-incorrect'));
                });
            }

            container.addEventListener('change', updateStates);
            container.addEventListener('input', updateStates);

            const current = document.getElementById('currentQuestion');
            if (window.IntersectionObserver) {
                const intersection = new IntersectionObserver(entries => entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    const index = blocks.indexOf(entry.target);
                    if (index < 0 || index >= EXPECTED) return;
                    questionButtons.forEach((button, n) => button.classList.toggle('current', n === index));
                    mapButtons.forEach((button, n) => mapButtons[n].classList.toggle('current', n === index));
                    if (current) current.textContent = String(index + 1);
                }), { root: null, rootMargin: '-18% 0px -62% 0px', threshold: 0 });
                blocks.slice(0, EXPECTED).forEach(block => intersection.observe(block));
            }

            updateStates();
        }

        const observer = new MutationObserver(build);
        observer.observe(container, { childList: true, subtree: true });
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

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
    else start();
})();
