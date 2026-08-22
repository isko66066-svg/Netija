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

                        <li class="header__list-item menu-nav-item">
                            <a class="header__list-link" href="index.html">
                                <span class="menu-icon menu-icon--home" aria-hidden="true">⌂</span>
                                <span>Главная страница</span>
                            </a>
                        </li>
                        <li class="header__list-item menu-nav-item">
                            <a class="header__list-link" href="/">
                                <span class="menu-icon menu-icon--dtm" aria-hidden="true">◆</span>
                                <span>Дтм</span>
                            </a>
                        </li>
                        <li class="header__list-item menu-nav-item">
                            <a class="header__list-link" href="natcert.html">
                                <span class="menu-icon menu-icon--natcert" aria-hidden="true">⬡</span>
                                <span>Национальный сертификат</span>
                            </a>
                        </li>
                    </ul>

                    <div class="site-header__account">
                        <a class="premium-nav-link" href="premium.html">👑 Premium</a>
                        <button class="site-notification" type="button" aria-label="Уведомления">♧<span>1</span></button>
                        <div class="sign__button" id="googleSignInButton"></div>
                        <div id="userProfile" class="user-profile" style="display:none;">
                            <img id="userAvatar" class="user-profile__avatar" src="" alt="">
                            <span id="userName" class="user-profile__name"></span>
                        </div>
                        <button class="burger" id="burgerBtn" type="button" aria-label="Открыть меню" aria-expanded="false">
                            <span></span><span></span><span></span>
                        </button>
                    </div>
                </nav>
            </div>
        </header>`;

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

    window.initNetijaHeader = function () {
        const oldHeader = document.querySelector('.site-header, .header, .exam-header');
        if (oldHeader) oldHeader.outerHTML = HEADER_HTML;
        else document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);

        const header = document.querySelector('.site-header');
        if (!header) return;

        setActiveLink(header);

        const burgerBtn = document.getElementById('burgerBtn');
        const headerList = header.querySelector('.header__list');

        if (burgerBtn && headerList) {
            burgerBtn.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                toggleMobileMenu();
            });

            headerList.addEventListener('click', (event) => {
                const link = event.target.closest('a.header__list-link, a.mobile-premium-card');
                if (link) closeMobileMenu();
            });
        }

        document.addEventListener('click', (event) => {
            if (!window.matchMedia('(max-width: 700px)').matches) return;
            if (!header.classList.contains('menu-open')) return;
            if (event.target.closest('.header__list') || event.target.closest('#burgerBtn')) return;
            closeMobileMenu();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeMobileMenu();
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 700) closeMobileMenu();
        });
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
                    mapButtons.forEach((button, n) => button.classList.toggle('current', n === index));
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
