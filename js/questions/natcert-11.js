// Национальный сертификат — 25.05.2025, 1-смена.
// Вопросы перенесены из оригинального теста.
// Логика: 1–32 single_choice, 33–35 matching, 36–45 open_ended.
// Ключи взяты из официального листа ответов 1-смены.

var questions = [
    {
        id: 1,
        type: 'single_choice',
        question: '$42^n$, $n\\in N$. При каком наименьшем $n$ число $42^n$ делится без остатка на $495\\cdot123$?',
        options: ['5', '8', '9', '10'],
        correctAnswer: 3
    },
    {
        id: 2,
        type: 'single_choice',
        question: 'Вычислите $\\sqrt{\\frac{2026!}{2025!+2024!}}-\\frac{10!}{9!+8!}$.',
        options: ['43', '44', '45', '46'],
        correctAnswer: 1
    },
    {
        id: 3,
        type: 'single_choice',
        question: 'За 1 час Анвар изготовил 20 деталей, а Сардор — 21 деталь. Сардор работал на 10 минут дольше Анвара. Сколько деталей изготовил каждый из них?',
        options: ['60', '70', '80', '90'],
        correctAnswer: 1
    },
    {
        id: 4,
        type: 'single_choice',
        question: 'На заводе за 1 месяц изготовили 4020 автомобилей. Это на 120% больше плана. Сколько автомобилей было запланировано изготовить?',
        options: ['804', '700', '870', '750'],
        correctAnswer: 2
    },
    {
        id: 5,
        type: 'single_choice',
        question: 'Вычислите $\\frac{2^{98}+1}{2^{49}+2^{25}+1}$.',
        options: ['$2^{50}-2^{24}+1$', '$2^{49}-2^{24}+1$', '$2^{49}+2^{25}+1$', '$2^{50}+2^{24}+1$'],
        correctAnswer: 1
    },
    {
        id: 6,
        type: 'single_choice',
        question: 'Расположите числа по возрастанию: $a=\\sqrt{26}$, $b=\\sqrt5$, $c=\\sqrt3$.',
        options: ['$c>b>a$', '$c>a>b$', '$a>b>c$', '$a>c>b$'],
        correctAnswer: 2
    },
    {
        id: 7,
        type: 'single_choice',
        question: 'Если $2025^3-2023^3=a$, найдите $\\sqrt{\\frac{a-2}{6}}$.',
        options: ['2021', '2025', '2023', '2024'],
        correctAnswer: 3
    },
    {
        id: 8,
        type: 'single_choice',
        question: 'Если в арифметической прогрессии $a_1+a_m=90$, $S_m=270$, найдите $m$.',
        options: ['5', '6', '8', '9'],
        correctAnswer: 1
    },
    {
        id: 9,
        type: 'single_choice',
        question: 'Для арифметической и геометрической прогрессий $a_1=b_1=1$, $a_2=b_2$, $a_1+a_2+a_3+...+a_8=369$. Найдите $b_1$.',
        options: ['27', '54', '36', '48'],
        correctAnswer: 0
    },
    {
        id: 10,
        type: 'single_choice',
        question: 'Если $\\left(\\frac13\\right)^2a^4+b^4=\\sqrt[6]{625}^{\\,3a-10b}$, найдите $\\frac ab$.',
        options: ['$\\frac2{21}$', '$\\frac4{15}$', '$\\frac2{11}$', '$\\frac{21}{22}$'],
        correctAnswer: 1
    },
    {
        id: 11,
        type: 'single_choice',
        question: 'Если $a+b+c=0$ и $a^2+b^2+c^2=1$, найдите $a^4+b^4+c^4$.',
        options: ['$\\frac12$', '$\\frac14$', '$\\frac34$', '$2$'],
        correctAnswer: 0
    },
    {
        id: 12,
        type: 'single_choice',
        question: 'Вычислите $\\arcsin(-\\frac{\\sqrt3}{2})+\\arctg(\\frac{\\sqrt3}{3})$.',
        options: ['$-\\frac\\pi6$', '$-\\frac\\pi3$', '$\\frac\\pi6$', '$-\\frac{\\pi}{3}$'],
        correctAnswer: 0
    },
    {
        id: 13,
        type: 'single_choice',
        question: 'Если $\\sin\\alpha-\\cos\\alpha=\\frac1{\\sqrt5}$, $\\alpha\\in(0;\\frac\\pi2)$, найдите $\\sin2\\alpha-\\cos2\\alpha$.',
        options: ['$\\frac15$', '$\\frac35$', '$\\frac25$', '$\\frac75$'],
        correctAnswer: 3
    },
    {
        id: 14,
        type: 'single_choice',
        question: 'Сколько действительных решений имеет уравнение $2^{23x}+2^{22x}=222$?',
        options: ['Действительных решений нет', '1', '2', '3'],
        correctAnswer: 1
    },
    {
        id: 15,
        type: 'single_choice',
        question: 'Найдите сумму всех действительных корней уравнения $\\left(\\frac14\\right)^{\\frac{\\log_4x}{\\log_{10}0,25}}=\\log_{1/8}3$.',
        options: ['Бесконечно много', 'Действительных корней нет', '1', '2'],
        correctAnswer: 1
    },
    {
        id: 16,
        type: 'single_choice',
        question: 'Найдите сумму действительных корней уравнения $|x-4|-\\sqrt{4x+17}=-3$.',
        options: ['10', '8', '26', '2'],
        correctAnswer: 0
    },
    {
        id: 17,
        type: 'single_choice',
        question: 'Найдите сумму действительных корней уравнения $x\\sqrt{x}-4x+3\\sqrt{x}=4x-16\\sqrt{x}+12$ (если корень один — найдите его).',
        options: ['25', '26', '17', '10'],
        correctAnswer: 1
    },
    {
        id: 18,
        type: 'single_choice',
        question: 'Сколько целых решений имеет на отрезке $[-20;20]$ неравенство $\\sqrt{x^2-10x+16}\\le2x-4$?',
        options: ['10', '11', '12', '13'],
        correctAnswer: 3
    },
    {
        id: 19,
        type: 'single_choice',
        question: 'Сколько натуральных чисел удовлетворяет $\\sqrt{x^2+9}<5$?',
        options: ['3', '4', '5', '6'],
        correctAnswer: 0
    },
    {
        id: 20,
        type: 'single_choice',
        question: 'Если $g(x)=6x-5$, $g(f(x))=x^2$, найдите $f(2)$.',
        options: ['$\\frac13$', '$\\frac12$', '$\\frac25$', '$\\frac52$'],
        correctAnswer: 1
    },
    {
        id: 21,
        type: 'single_choice',
        question: 'Вычислите $\\int_{\\pi/2}^{2\\pi}\\frac{1}{1+\\sin x+\\cos x}\\,dx$.',
        options: ['$\\ln\\frac{3+\\sqrt3}{4}$', '$\\ln\\frac{3-\\sqrt3}{2}$', '$\\ln\\frac{3+\\sqrt3}{2}$', '$\\ln\\frac{3-\\sqrt3}{2}$'],
        correctAnswer: 0
    },
    {
        id: 22,
        type: 'single_choice',
        question: 'Если $f(x)$ и $g(x)$ — функции, $g(x)=\\frac{x+1}{x}$ и $g(f(x))=\\frac{x-1}{x-2}$, найдите $f(2024)$.',
        options: ['2023', '2021', '2024', '2025'],
        correctAnswer: 0
    },
    {
        id: 23,
        type: 'single_choice',
        question: 'Дана функция $f(x)=\\frac{\\cos^2x+6\\cos x+9}{\\sin^2x}$. Найдите наименьшее значение $f(x)$ на $[-\\frac\\pi3;\\frac\\pi2]$.',
        options: ['5', '9', '8', '10'],
        correctAnswer: 2
    },
    {
        id: 24,
        type: 'single_choice',
        question: 'На рисунке изображены окружность и прямоугольник. Найдите отношение площади области, ограниченной окружностью, к площади прямоугольника.',
        "image": "/images/25-may2025_1/24.jpeg",
        options: ['$\\frac\\pi8$', '$\\frac\\pi{12}$', '$\\frac{\\pi}{3}$', '$\\frac{\\pi}{4}$'],
        correctAnswer: 0
    },
    {
        id: 25,
        type: 'single_choice',
        question: 'В треугольнике $ABC$ $BC=8$, $AB=13$ и $\\angle AOB=150^\\circ$. Найдите площадь треугольника $ABC$.',
        "image": "/images/25-may2025_1/25.jpeg",
        options: ['28', '$12\\sqrt3$', '$14\\sqrt3$', '24'],
        correctAnswer: 2
    },
    {
        id: 26,
        type: 'single_choice',
        question: '$ABCD$ — параллелограмм. Его диагональ $BD$ пересекает отрезок $AF$ в точке $F$. Если площадь параллелограмма равна 48, найдите площадь треугольника, указанного на рисунке.',
        "image": "/images/25-may2025_1/26.jpeg",
        options: ['21', '18', '15', '12'],
        correctAnswer: 3
    },
    {
        id: 27,
        type: 'single_choice',
        question: 'В равностороннем треугольнике $ABC$ взята точка $F$. Из точки $F$ к $AC$ и $BC$ проведены перпендикуляры. Короткое расстояние между основаниями перпендикуляров равно 1. Если $AB=4\\sqrt3$, найдите расстояние от $F$ до $AC$.',
        options: ['5', '2,5', '3', '3,5'],
        correctAnswer: 1
    },
    {
        id: 28,
        type: 'single_choice',
        question: 'На рисунке изображена правильная треугольная призма. Найдите отношение площадей $\\frac{S_1}{S_2}$.',
        "image": "/images/25-may2025_1/28.jpeg",
        options: ['$\\sqrt2+1$', '$\\sqrt2+2$', '$\\sqrt2+3$', '$\\sqrt2+4$'],
        correctAnswer: 2
    },
    {
        id: 29,
        type: 'single_choice',
        question: 'На рисунке изображён правильный шестиугольник. Если координаты точки $D$ равны $(x;6)$, найдите абсциссу точки $E$.',
        "image": "/images/25-may2025_1/29.jpeg",
        options: ['8', '9', '$9\\sqrt3$', '$12\\sqrt3$'],
        correctAnswer: 3
    },
    {
        id: 30,
        type: 'single_choice',
        question: 'Стороны треугольника равны 10, 17 и 21. Из треугольника, отрезав от него треугольник с углом 15°, получают правильный многоугольник. Найдите расстояние от вершины до полученной точки пересечения.',
        options: ['17', '16', '18', '20'],
        correctAnswer: 0
    },
    {
        id: 31,
        type: 'single_choice',
        question: 'По данным множествам на рисунке найдите сумму числа элементов множества $(A\\cup B)\\cap C$.',
        "image": "/images/25-may2025_1/31.jpeg",
        options: ['32', '64', '128', '256'],
        correctAnswer: 1
    },
    {
        id: 32,
        type: 'single_choice',
        question: 'Сейф открывается 6-значным кодом. Код состоит из цифр. Сколько максимум можно подобрать кодов, если цифры сейфа не используются повторно?',
        options: ['$10^5$', '$9\\cdot10^5$', '$10^4$', '$10^6$'],
        correctAnswer: 3
    },
    {
        id: 33,
        type: 'matching',
        context: 'Задания 33–35 и варианты ответов A–F сопоставьте между собой. На рисунке дана правильная призма, все рёбра которой равны 2.',
        "image": "/images/25-may2025_1/33_35.jpeg",
        optionsPool: {
            A: '12',
            B: '$4\\sqrt6$',
            C: '8',
            D: '$3\\sqrt6$',
            E: '$3\\sqrt7$',
            F: '$4\\sqrt7$'
        },
        items: [
            {
                id: 33,
                text: 'Найдите площадь прямоугольника $ACD_1F_1$.',
                correctAnswer: 'B'
            }
        ]
    },
    {
        id: 34,
        type: 'matching',
        context: 'Задания 33–35 и варианты ответов A–F сопоставьте между собой. На рисунке дана правильная призма, все рёбра которой равны 2.',
        optionsPool: {
            A: '12',
            B: '$4\\sqrt6$',
            C: '8',
            D: '$3\\sqrt6$',
            E: '$3\\sqrt7$',
            F: '$4\\sqrt7$'
        },
        items: [
            {
                id: 34,
                text: 'Найдите площадь прямоугольника $B_1CDE_1$.',
                correctAnswer: 'E'
            }
        ]
    },
    {
        id: 35,
        type: 'matching',
        context: 'Задания 33–35 и варианты ответов A–F сопоставьте между собой. На рисунке дана правильная призма, все рёбра которой равны 2.',
        optionsPool: {
            A: '12',
            B: '$4\\sqrt6$',
            C: '8',
            D: '$3\\sqrt6$',
            E: '$3\\sqrt7$',
            F: '$4\\sqrt7$'
        },
        items: [
            {
                id: 35,
                text: 'Найдите площадь треугольника $ABE_1$, отсекаемого плоскостью.',
                correctAnswer: 'A'
            }
        ]
    },
    {
        id: 36,
        type: 'open_ended',
        question: 'Дана система уравнений: $\\begin{cases}\\frac{x}{2}+\\frac{y}{2}=36\\\\ |x|+y=a\\end{cases}$',
        subQuestions: [
            {
                id: 'a',
                text: 'При каком $a$ система имеет 3 решения? Если $a$ единственное — найдите его.',
                correctAnswer: '6'
            },
            {
                id: 'b',
                text: 'При каком $a$ система имеет 4 решения? Если $a$ единственное — найдите его.',
                correctAnswer: '15'
            }
        ]
    },
    {
        id: 37,
        type: 'open_ended',
        question: 'Решите уравнение $\\frac{0,5-\\cos2x}{\\cos2x-\\sin x-1}=\\cos2x+\\sin x-1$.',
        subQuestions: [
            {
                id: 'a',
                text: 'Найдите сумму наименьшего положительного и наибольшего отрицательного корней.',
                correctAnswer: '-$\\frac{\\pi}{12}$'
            },
            {
                id: 'b',
                text: 'Сколько решений уравнение имеет на отрезке $[-\\pi;\\pi]$?',
                correctAnswer: '6'
            }
        ]
    },
    {
        id: 38,
        type: 'open_ended',
        question: 'На рисунке даны графики $f(x)=ax^2+bx+c$ и $g(x)=kx+c$. $f(x)$ пересекает ось $Ox$ в точках $(-4;0)$ и $(5;0)$, а парабола имеет вершину $(2;-4,5)$.',
        "image": "/images/25-may2025_1/38.jpeg",
        subQuestions: [
            {
                id: 'a',
                text: 'Найдите $f(-2)$.',
                correctAnswer: '3,5'
            },
            {
                id: 'b',
                text: 'Найдите $\\frac{a-b-c}{k-m-n}$ согласно обозначениям рисунка.',
                correctAnswer: '4'
            }
        ]
    },
    {
        id: 39,
        type: 'open_ended',
        question: 'Если для функции $f(x)$ заданы $f(0)=1$, $f\'(0)=2$ и $f\''(x)=4f\'(x)-3f(x)+1$, найдите значения производных.',
        subQuestions: [
            {
                id: 'a',
                text: 'Найдите $f\''(0)$.',
                correctAnswer: '6'
            },
            {
                id: 'b',
                text: 'Найдите $f^{IV}(0)$.',
                correctAnswer: '54'
            }
        ]
    },
    {
        id: 40,
        type: 'open_ended',
        question: 'На рисунке даны графики прямых и параболы; точки пересечения и оси отмечены.',
        "image": "/images/25-may2025_1/40.jpeg",
        subQuestions: [
            {
                id: 'a',
                text: 'Найдите координату точки $B$.',
                correctAnswer: '8,5'
            },
            {
                id: 'b',
                text: 'Найдите площадь заштрихованной области или площадь соответствующего треугольника.',
                correctAnswer: '10,5'
            }
        ]
    },
    {
        id: 41,
        type: 'open_ended',
        question: '$ABC$ — правильный треугольник. $OC=\\frac{14}{\\sqrt3}$, $PB=10$, $AP=6$.',
        "image": "/images/25-may2025_1/41.jpeg",
        subQuestions: [
            {
                id: 'a',
                text: 'Найдите площадь заштрихованной области.',
                correctAnswer: '$15\\sqrt3$'
            },
            {
                id: 'b',
                text: 'Найдите длину $PC$.',
                correctAnswer: '$2\\sqrt{19}$'
            }
        ]
    },
    {
        id: 42,
        type: 'open_ended',
        question: 'Стороны четырёхугольника равны 13, 13, 15, 15. В него вписана окружность. Диагонали пересекаются в отношении 5:9.',
        subQuestions: [
            {
                id: 'a',
                text: 'Найдите площадь четырёхугольника.',
                correctAnswer: '168'
            },
            {
                id: 'b',
                text: 'Найдите расстояние от точки пересечения диагоналей до центра окружности.',
                correctAnswer: '1,5'
            }
        ]
    },
    {
        id: 43,
        type: 'open_ended',
        question: 'На рисунке изображён правильный шестиугольник $ABCDEF$; $P$ — точка внутри него.',
        "image": "/images/25-may2025_1/43.jpeg",
        subQuestions: [
            {
                id: 'a',
                text: 'Если сторона правильного шестиугольника равна 4, найдите площадь треугольника $PDC$.',
                correctAnswer: '$6\\sqrt3$'
            },
            {
                id: 'b',
                text: 'Найдите отношение площади треугольника $EPF$ к площади четырёхугольника $ABCP$.',
                correctAnswer: '$\\frac15$'
            }
        ]
    },
    {
        id: 44,
        type: 'open_ended',
        question: 'На рисунке дана правильная четырёхугольная пирамида, вписанная в куб. Куб находится внутри пирамиды.',
        "image": "/images/25-may2025_1/44.jpeg",
        subQuestions: [
            {
                id: 'a',
                text: 'Если сторона малого основания усечённой пирамиды равна $1+\\sqrt3$, найдите объём куба.',
                correctAnswer: '$24\\sqrt3$'
            },
            {
                id: 'b',
                text: 'Если полная сторона куба равна $24-12\\sqrt3$, найдите сторону большого основания усечённой пирамиды.',
                correctAnswer: '$\\frac2{\\sqrt3}$'
            }
        ]
    },
    {
        id: 45,
        type: 'open_ended',
        question: 'Школьник живёт в 30 км от школы. От дома до дороги 20 км, затем от дороги до школы 50 км по вертикали; длина отрезка $FC=50$ км, $DE=20$ км.',
        "image": "/images/25-may2025_1/45.jpeg",
        subQuestions: [
            {
                id: 'a',
                text: 'Найдите $BD$.',
                correctAnswer: '22,5'
            },
            {
                id: 'b',
                text: 'Найдите сумму длин $AD$ и $EC$.',
                correctAnswer: '120'
            }
        ]
    }
];
