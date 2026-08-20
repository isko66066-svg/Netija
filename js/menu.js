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
        if (document.getElementById('netija-exam-fixes-css')) return;
        const styleLink = document.createElement('link');
        styleLink.id = 'netija-exam-fixes-css';
        styleLink.rel = 'stylesheet';
        styleLink.href = 'exam-fixes.css';
        document.head.appendChild(styleLink);
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
        if (burgerBtn && headerList) burgerBtn.addEventListener('click', () => { headerList.classList.toggle('open'); burgerBtn.classList.toggle('active'); });
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

    function start() {
        window.initNetijaHeader();
        initExamQuestionMap();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
    else start();
})();
