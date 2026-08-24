(function () {
    const BACKEND_URL = 'https://netija.onrender.com';
    const params = new URLSearchParams(window.location.search);
    const testId = params.get('id');

    const titleEl = document.getElementById('testTitle');
    const quizContainer = document.getElementById('quizContainer');
    const submitBtn = document.getElementById('submitBtn');
    const timerEl = document.getElementById('timer');

    if (!document.getElementById('test-access-styles')) {
        const style = document.createElement('style');
        style.id = 'test-access-styles';
        style.textContent = `
            .test-title.test-title--access { max-width: 720px; margin: 56px auto 14px; padding: 0 24px; text-align: center; font-size: clamp(26px, 4vw, 34px); line-height: 1.2; font-weight: 800; letter-spacing: -0.7px; color: #19191B; }
            .test-access-message { position: relative; max-width: 720px; margin: 0 auto; padding: 34px 36px; background: rgba(255,255,255,.96); border: 1px solid #e5e7eb; border-radius: 22px; box-shadow: 0 14px 40px rgba(0,0,0,.07); text-align: center; overflow: hidden; }
            .test-access-message::before { content: '🔒'; display: flex; align-items: center; justify-content: center; width: 58px; height: 58px; margin: 0 auto 18px; border-radius: 50%; background: #f1f5f9; font-size: 25px; }
            .test-access-message::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg,#03045E,#40E0D0); }
            .test-access-message h2 { margin: 0; color: #475569; font-size: 18px; line-height: 1.55; font-weight: 600; }
            @media (max-width:600px) { .test-title.test-title--access { margin-top:34px; font-size:26px; padding:0 18px; } .test-access-message { margin:0 16px; padding:28px 20px; border-radius:18px; } .test-access-message h2 { font-size:16px; } }
        `;
        document.head.appendChild(style);
    }

    if (titleEl) titleEl.textContent = `Тест №${testId}`;

    function getCurrentUser() {
        try { return JSON.parse(localStorage.getItem('netija_user') || 'null'); }
        catch (error) { return null; }
    }

    function showAccessMessage(title, text) {
        if (titleEl) { titleEl.textContent = title; titleEl.classList.add('test-title--access'); }
        if (timerEl) timerEl.style.display = 'none';
        if (quizContainer) quizContainer.innerHTML = `<div class="test-access-message"><h2>${text}</h2></div>`;
        if (submitBtn) submitBtn.style.display = 'none';
    }

    function restoreTestUI() {
        if (titleEl) { titleEl.textContent = `Тест №${testId}`; titleEl.classList.remove('test-title--access'); }
        if (timerEl) timerEl.style.display = '';
        if (submitBtn) submitBtn.style.display = '';
    }

    async function checkDailyAccess() {
        const user = getCurrentUser();
        if (!user?.email) { showAccessMessage('Доступ к тесту ограничен', 'Сначала войдите в аккаунт, чтобы пройти тест.'); return false; }
        try {
            const response = await fetch(`${BACKEND_URL}/api/tests/daily-access`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ email:user.email, testId }) });
            const data = await response.json().catch(() => ({}));
            if (response.ok && data.allowed) return true;
            if (response.status === 409 && data.error === 'DAILY_LIMIT_REACHED') { showAccessMessage('Доступ к тесту ограничен', 'Вы уже прошли тест сегодня.'); return false; }
            if (response.status === 404) { showAccessMessage('Доступ к тесту ограничен', 'Пользователь не найден. Войдите в аккаунт заново.'); return false; }
            showAccessMessage('Ошибка доступа', 'Не удалось проверить доступ к тесту. Попробуйте ещё раз.');
            return false;
        } catch (error) {
            console.error('Daily test access error:', error);
            showAccessMessage('Ошибка соединения', 'Не удалось связаться с сервером. Попробуйте ещё раз.');
            return false;
        }
    }

    function normalizeLegacyMatchingQuestions() {
        if (typeof questions === 'undefined' || !Array.isArray(questions)) return;
        const legacyIndex = questions.findIndex(q => q.type === 'matching' && Array.isArray(q.items) && q.items.length === 3);
        if (legacyIndex === -1) return;
        const legacyQuestion = questions[legacyIndex];
        const normalizedQuestions = legacyQuestion.items.map((item,index) => ({ id:item.id, type:'matching', question:'', context:index===0 ? legacyQuestion.context || '' : '', image:index===0 ? legacyQuestion.image || null : null, optionsPool:{...legacyQuestion.optionsPool}, items:[{id:item.id,text:item.text,correctAnswer:item.correctAnswer}] }));
        questions.splice(legacyIndex, 1, ...normalizedQuestions);
    }

    function applyMatchingQuestions() {
        if (typeof questions === 'undefined' || !Array.isArray(questions)) return;
        const q33 = questions.find(q => q.id === 33);
        const q34 = questions.find(q => q.id === 34);
        const q35 = questions.find(q => q.id === 35);
        if (!q33 || !q34 || !q35) return;

        if (String(testId) === '6') {
            q33.type='matching'; q33.question=''; q33.context='Задания (33–35) и варианты ответов (A–F) сопоставьте между собой. На рисунке даны конус, цилиндр и шар равных объёмов. Осевое сечение цилиндра — квадрат, а осевое сечение конуса — правильный треугольник.'; q33.image='images/2-mart_2-img/matching.svg';
            q33.optionsPool={A:'$\\frac{\\sqrt[6]{12}}{2}$',B:'$\\frac{\\sqrt[6]{3}}{\\sqrt[3]{6}}$',C:'$\\frac{\\sqrt[3]{18}}{2}$',D:'$\\frac{\\sqrt[3]{12}}{6}$',E:'$\\frac{\\sqrt[3]{18}}{3}$',F:'$\\frac{\\sqrt[3]{6}}{2}$'};
            q33.items=[{id:33,text:'Найдите отношение радиуса основания цилиндра к радиусу основания конуса.',correctAnswer:'B'}];
            q34.type='matching'; q34.question=''; q34.context=''; q34.optionsPool=q33.optionsPool; q34.items=[{id:34,text:'Найдите отношение радиуса шара к радиусу конуса.',correctAnswer:'A'}];
            q35.type='matching'; q35.question=''; q35.context=''; q35.optionsPool=q33.optionsPool; q35.items=[{id:35,text:'Найдите отношение радиуса основания цилиндра к радиусу шара.',correctAnswer:'E'}];
        }

        if (String(testId) === '7') {
            q33.type='matching'; q33.question=''; q33.context='Задания (33–35) и варианты ответов (A–F) сопоставьте между собой. Если высота цилиндра равна 8, а полная площадь поверхности равна 232,5π, вычислите следующие величины.';
            q33.optionsPool={A:'$\\frac{\\sqrt{161}}{2}$',B:'$\\frac{\\sqrt{161}}{4}$',C:'$\\frac{17}{2}$',D:'$\\frac{3\\sqrt{21}}{2}$',E:'$\\frac{3\\sqrt{21}}{4}$',F:'$\\frac{19}{2}$'};
            q33.items=[{id:33,text:'Найдите наименьшее расстояние от оси цилиндра до отрезка длиной 10 см, расположенного на одинаковом расстоянии от оснований.',correctAnswer:'D'}];
            q34.type='matching'; q34.question=''; q34.context=''; q34.optionsPool=q33.optionsPool; q34.items=[{id:34,text:'Через цилиндр проведено сечение, параллельное его оси. Если сечение — квадрат, найдите наименьшее расстояние до оси.',correctAnswer:'B'}];
            q35.type='matching'; q35.question=''; q35.context=''; q35.optionsPool=q33.optionsPool; q35.items=[{id:35,text:'Найдите радиус шара, описанного около цилиндра.',correctAnswer:'C'}];
        }
    }

    function applyOpenSubQuestions() {
        if (typeof questions === 'undefined' || !Array.isArray(questions)) return;

        const maps = {
            '6': {
                36: { question: 'Уравнение: $2(x^2+x+1)^2-13(x^3-1)=7(x-1)^2$.', a: 'Сколько действительных корней имеет уравнение?', b: 'Найдите произведение действительных корней уравнения.' },
                37: { question: 'Решите уравнение $(\\sin x+\\cos x)^4+(\\sin x-\\cos x)^4+\\sin4x=3$.', a: 'Найдите наименьший положительный корень.', b: 'Сколько корней имеет уравнение на отрезке $[-\\pi;2\\pi]$?' },
                38: { question: 'Для функции $f(x)$ известно: $2f(x)+f(1-x)=\\frac{3x^2+x+4}{x(1-x)}$. Также дана обратная функция $f^{-1}(x)$.', a: 'Найдите $f(2)$.', b: 'Найдите $f^{-1}(-2)$.' },
                39: { question: 'Дана функция $f(x)=2\\sqrt{x}$.', a: 'К графику $f(x)=2\\sqrt{x}$ проведена касательная, образующая с осью $Ox$ угол $30^\\circ$. Найдите кратчайшее расстояние от точки пересечения касательной с осью $Ox$ до графика $y=2\\sqrt{x}$.', b: 'Найдите кратчайшее расстояние от графика $f(x)=2\\sqrt{x}$ до прямой $y=\\frac{x}{2}+3$.' },
                40: { question: 'Функция $f(x)=x^3+ax^2+bx+c$ пересекает ось $Ox$ в точке $(-1;0)$ и касается её в точке $(2;0)$.', a: 'Найдите значение $a+b+c$.', b: 'Найдите площадь закрашенной области на рисунке.' },
                41: { question: 'На рисунке изображены квадраты со сторонами $2$, $4$ и $6$.', a: 'Найдите площадь закрашенной области.', b: 'Найдите длину отрезка $|TK|$.' },
                42: { question: 'В прямоугольном треугольнике $ABC$ катеты $AC$ и $AB$ равны соответственно $3$ и $4$. На катете $AC$ и гипотенузе $BC$ построены внешние квадраты $ACML$ и $BCFE$. Точки $O_1$ и $O_2$ — точки пересечения диагоналей этих квадратов.', a: 'Найдите длину $|MF|$.', b: 'Найдите площадь треугольника $AO_1O_2$.' },
                43: { question: 'В трапецию $ABCD$ вписана окружность. Меньшее основание равно $3$, большее — $13$. Расстояния от точки $B$ до точек $E$ и $D$ окружности равны $10$; точки $E$ и $D$ не совпадают.', a: 'Найдите длину отрезка $AE$.', b: 'Найдите площадь пятиугольника $ABCDE$.' },
                44: { question: 'Тело состоит из полусферы, цилиндра и конуса. Образующая конуса равна $5$ см, радиус полусферы равен $3$ см, общая длина тела равна $15$ см.', a: 'Найдите полную площадь поверхности тела в $см^2$.', b: 'Найдите объём тела в $см^3$.' },
                45: { question: 'Подвесной мост изображён в форме параболы. Расстояние между крайними высокими стойками равно $300$ м, расстояния между соседними стойками — $15$ м, высота крайних стоек — $67$ м. Начало координат расположено в центре моста: $O(0;0)$.', a: 'Составьте уравнение параболы.', b: 'Найдите сумму длин десяти самых коротких стоек.' }
            },
            '7': {
                36: { question: 'Дана система уравнений: $\\begin{cases}x^2+y^2-2(x-y)a=9-6a-a^2,\\\\x^2+y^2+2(3x+4y)a=1-2a-24a^2.\\end{cases}$', a: 'Сколько значений $a$ существует, при которых система имеет ровно одно действительное решение?', b: 'Найдите наибольшее значение $a$, при котором система имеет ровно одно действительное решение.' },
                37: { question: 'Решите уравнение $\\sin^{10}x+\\cos^{10}x=\\frac{29}{16}\\cos^4 2x$.', a: 'Найдите наименьший положительный корень.', b: 'Найдите сумму корней уравнения на отрезке $[-\\pi;\\pi]$.' },
                38: { question: 'Графики $f(x)=a|x+b|+c$ и $g(x)=kx+l$ пересекаются в точке $(6;1)$. Функция $f(x)$ достигает максимума в точке $(2;3)$. На интервале $(-\\infty;2)$ графики функций параллельны.', a: 'Найдите $3\\cdot\\frac{a+b+c}{k+l}$.', b: 'Найдите кратчайшее расстояние между графиками $f(x)$ и $g(x)$ на интервале $(-\\infty;2)$.' },
                39: { question: 'Дана функция $f(x)=\\frac{x^5}{40}+\\frac{x^4}{8}-\\frac{x^3}{6}-x^2+2$.', a: 'Найдите количество точек локального максимума функции.', b: 'Найдите наибольшее значение функции на отрезке $[-5;2]$.' },
                40: { question: 'На рисунке изображены графики $f(x)=ax^2+bx+c$ и $g(x)=kx+l$. Функция $f$ пересекает ось $Ox$ в точках $(-6;0)$ и $(2;0)$, а $g$ пересекает $f$ в точках $(-4;3)$ и $(2;0)$.', a: 'Найдите значение $\\frac{a+b+c}{k+l}$.', b: 'Найдите площадь закрашенной области.' },
                41: { question: 'В прямоугольном треугольнике к гипотенузе проведены высота и биссектриса из прямого угла. Их длины соответственно равны $6$ и $8$.', a: 'Найдите площадь треугольника.', b: 'Найдите гипотенузу треугольника.' },
                42: { question: 'В квадрате $ABCD$ через диагональ $AC$ взята точка $E$, а на стороне $CD$ — точка $F$. Отрезки $BE$ и $EF$ взаимно перпендикулярны. Известно, что $AE=1$ и $BE=\\sqrt3+1$.', a: 'Найдите длину отрезка $DF$.', b: 'Найдите величину угла $ABE$.' },
                43: { question: 'В декартовой системе координат дана функция $y=\\sqrt{x}$ и правильный восьмиугольник $ABCDEFGH$. График $y=\\sqrt{x}$ пересекает вершины $A$ и $E$.', a: 'Найдите длину стороны восьмиугольника.', b: 'Найдите длину отрезка $AE$.' },
                44: { question: 'В правильную четырёхугольную пирамиду вписан цилиндр. Осевое сечение цилиндра проходит через высоту пирамиды. Площадь основания пирамиды равна $144$, объём равен $288$; принять $\\pi\\approx3$.', a: 'Найдите максимальный объём цилиндра.', b: 'Найдите максимальное значение площади боковой поверхности цилиндра.' },
                45: { question: 'Анвар взял в банке кредит $60$ млн сум на $2$ года под $20\\%$ годовых. Ежемесячные платежи приведены в таблице.', a: 'Какой была сумма ежемесячного платежа в десятом месяце?', b: 'Найдите общую сумму начисленных процентов за два года.' }
            }
        };

        const map = maps[String(testId)];
        if (!map) return;

        questions.forEach(q => {
            const item = map[q.id];
            if (!item || q.type !== 'open_ended') return;
            const oldA = q.subQuestions?.find(s => s.id === 'a')?.correctAnswer ?? '';
            const oldB = q.subQuestions?.find(s => s.id === 'b')?.correctAnswer ?? '';
            q.question = item.question;
            q.subQuestions = [
                { id: 'a', text: item.a, correctAnswer: oldA },
                { id: 'b', text: item.b, correctAnswer: oldB }
            ];
        });
    }

    function addMatchingVisualFix() {
        if (document.getElementById('matching-visual-fix')) return;
        const style=document.createElement('style'); style.id='matching-visual-fix';
        style.textContent=`
            .matching-context{background:#fff!important;border:0!important;padding:0!important;color:#172033!important;font-size:16px!important;line-height:1.55!important;margin-bottom:12px!important}
            .question-image{max-width:100%;height:auto;max-height:330px;object-fit:contain;background:#fff;border:0!important;border-radius:0!important;margin:14px auto 20px!important}
            #question-block-33>.question-text,#question-block-34>.question-text,#question-block-35>.question-text{display:none!important}
            #question-block-34,#question-block-35{box-shadow:none!important;margin-top:-24px!important;border-top:0!important;border-radius:0!important;padding-top:0!important}
            #question-block-35{border-radius:0 0 12px 12px!important;padding-bottom:24px!important}
        `;
        document.head.appendChild(style);
    }

    function loadMathInput() {
        return new Promise(resolve => {
            if (window.NetijaMathInput) { window.NetijaMathInput.enhance(); resolve(); return; }
            const existing=document.querySelector('script[data-math-input]');
            if (existing) { existing.addEventListener('load',()=>resolve(),{once:true}); existing.addEventListener('error',()=>resolve(),{once:true}); return; }
            const script=document.createElement('script');
            script.src='js/math-input.js?v=20260824.3';
            script.dataset.mathInput='true';
            script.onload=()=>resolve();
            script.onerror=()=>resolve();
            document.head.appendChild(script);
        });
    }

    async function loadQuiz() {
        const allowed=await checkDailyAccess();
        if (!allowed) return;
        restoreTestUI();

        const oldScript=document.querySelector('script[data-questions-loader]');
        if (oldScript) oldScript.remove();

        const script=document.createElement('script');
        script.src=`js/questions/natcert-${testId}.js`;
        script.dataset.questionsLoader='true';

        script.onload=async function () {
            normalizeLegacyMatchingQuestions();
            applyMatchingQuestions();
            applyOpenSubQuestions();
            addMatchingVisualFix();
            await loadMathInput();
            if (typeof initQuiz==='function') initQuiz();
        };

        script.onerror=function(){ showAccessMessage('Ошибка загрузки','Не удалось загрузить вопросы теста.'); };
        document.head.appendChild(script);
    }

    window.addEventListener('netija:login', loadQuiz);
    loadQuiz();
})();
