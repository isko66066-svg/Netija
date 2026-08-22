// Национальный сертификат — 25.05.2025, 2-смена.
// Вопросы перенесены из оригинального теста.
// Логика: 1–32 single_choice, 33–35 matching, 36–45 open_ended.
// Ключи взяты из официального листа ответов 2-смены.

var questions = [
    {
        id: 1,
        type: 'single_choice',
        question: 'Если $a,b\\in N$ и $a\\cdot b=2^3\\cdot3^5\\cdot7^2$, найдите наименьшее значение $EKUK(a;b)$ (НОК).',
        options: ['210', '588', '756', '420'],
        correctAnswer: 2
    },
    {
        id: 2,
        type: 'single_choice',
        question: 'Если $a=\\sqrt[3]{12}$, $b=\\sqrt6$, $c=2\\sqrt[6]3$, упростите $\\frac{|a-b|+|b-c|-|a-c|-|2a|}{|a-c|+|b-4|+|c-2|}$.',
        options: ['1', '-1', '2', '-2'],
        correctAnswer: 3
    },
    {
        id: 3,
        type: 'single_choice',
        question: 'Расстояние между двумя берегами равно 24 км. Моторная лодка проходит туда и обратно за 9 часов. Скорость течения 2 км/ч. Во сколько раз скорость лодки в стоячей воде больше скорости течения?',
        options: ['2', '3', '4', '6'],
        correctAnswer: 1
    },
    {
        id: 4,
        type: 'single_choice',
        question: 'Объём 6 одинаковых стеклянных сосудов составляет 90% объёма 2 бочек. Сколько процентов объёма одной бочки составляет один стеклянный сосуд?',
        options: ['15%', '20%', '40%', '30%'],
        correctAnswer: 3
    },
    {
        id: 5,
        type: 'single_choice',
        question: 'Вычислите $(0,25)^{-1/2}\\cdot3^{-1}+(0,5)^{-2}\\cdot9^{-1/2}$.',
        options: ['2', '$\\frac12$', '$\\frac32$', '$\\frac13$'],
        correctAnswer: 0
    },
    {
        id: 6,
        type: 'single_choice',
        question: 'Вычислите $\\frac4{\\sqrt{13}+3}-\\frac9{\\sqrt{13}-2}$.',
        options: ['5', '4', '-4', '-5'],
        correctAnswer: 3
    },
    {
        id: 7,
        type: 'single_choice',
        question: 'Вычислите $\\sqrt[3]{\\sqrt2+\\sqrt5}+\\sqrt[3]{\\sqrt2-\\sqrt5}$.',
        options: ['1', '2', '$\\sqrt5$', '-$\\sqrt5$'],
        correctAnswer: 0
    },
    {
        id: 8,
        type: 'single_choice',
        question: 'Если $b_4-b_1=52$, $b_7-b_1=1456$, найдите $S_6$.',
        options: ['728', '625', '732', '684'],
        correctAnswer: 0
    },
    {
        id: 9,
        type: 'single_choice',
        question: 'Если $a_4+a_{17}=17$, $S_{14}-S_3=77$, $a_k=2023$, найдите $\\sqrt{k}$.',
        options: ['2025', '45', '$\\sqrt{2024}$', '44'],
        correctAnswer: 1
    },
    {
        id: 10,
        type: 'single_choice',
        question: 'Если $x=6$, вычислите $\\left(\\frac1{\\sqrt{x}+\\sqrt2}-\\frac1{\\sqrt{x}-\\sqrt2}\\right)^{-2}$.',
        options: ['1', '2', '3', '4'],
        correctAnswer: 1
    },
    {
        id: 11,
        type: 'single_choice',
        question: 'К какому промежутку принадлежит число $\\frac1{\\sqrt3+\\sqrt4}+\\frac1{\\sqrt4+\\sqrt5}+\\dots+\\frac1{\\sqrt{24}+\\sqrt{25}}$?',
        options: ['$(2;3)$', '$(3;4)$', '$(4;5)$', '$(6;7)$'],
        correctAnswer: 1
    },
    {
        id: 12,
        type: 'single_choice',
        question: 'Вычислите $\\tan(\\arcsin(-\\frac12))$.',
        options: ['$\\frac{\\sqrt3}{3}$', '-$\\frac{\\sqrt3}{3}$', '$\\sqrt3$', '-$\\sqrt3$'],
        correctAnswer: 1
    },
    {
        id: 13,
        type: 'single_choice',
        question: 'Найдите сумму корней уравнения $\\sqrt{\\cot x}\\,(2\\sin x-1)=0$ на $[0;2\\pi]$.',
        options: ['$\\frac{11\\pi}{6}$', '$\\frac{7\\pi}{6}$', '$\\frac{13\\pi}{6}$', '$\\frac{5\\pi}{6}$'],
        correctAnswer: 2
    },
    {
        id: 14,
        type: 'single_choice',
        question: 'Найдите сумму целых решений неравенства $25\\cdot2^x-10^x+5^x\\ge25$.',
        options: ['1', '2', '3', '4'],
        correctAnswer: 2
    },
    {
        id: 15,
        type: 'single_choice',
        question: 'Найдите сумму всех действительных корней уравнения $2\\lg2+(1+\\frac1{2x})\\lg3=\\lg(3^{1/x}+27)$.',
        options: ['$\\frac14$', '$\\frac12$', '$\\frac34$', '1'],
        correctAnswer: 2
    },
    {
        id: 16,
        type: 'single_choice',
        question: 'При скольких целых значениях $a$ уравнение $\\sqrt{3x-x^2+4}=a$ имеет решения?',
        options: ['2', '3', '4', '5'],
        correctAnswer: 1
    },
    {
        id: 17,
        type: 'single_choice',
        question: 'Сколько действительных пар $(x;y)$ имеет система $\\begin{cases}\\sqrt{x+y}+\\sqrt{x-y}=y\\\\x^2=y^2+36\\end{cases}$?',
        options: ['1', '2', '3', '4'],
        correctAnswer: 0
    },
    {
        id: 18,
        type: 'single_choice',
        question: 'Найдите сумму целых решений неравенства $\\frac{\\sqrt{x-2}-\\sqrt{6-x}}4\\ge0$.',
        options: ['18', '21', '15', '11'],
        correctAnswer: 2
    },
    {
        id: 19,
        type: 'single_choice',
        question: 'Найдите сумму целых решений неравенства $\\frac{3(x-5\\sqrt{x}+6)}{x-4}>\\sqrt{x}-3$.',
        options: ['28', '31', '29', '33'],
        correctAnswer: 1
    },
    {
        id: 20,
        type: 'single_choice',
        question: 'Если $af(x)+bf(1/x)=1/x-2024$, $a\\ne0$, $b\\ne0$, $a\\ne b$, найдите $f(x)$.',
        options: [
            '$\\frac1{a^2-b^2}(\\frac ax+bx)-\\frac{2024}{a+b}$',
            '$\\frac1{a^2-b^2}(\\frac ax-bx)+\\frac{2024}{a+b}$',
            '$\\frac1{a^2-b^2}(\\frac ax+bx)+\\frac{2024}{a+b}$',
            '$\\frac1{a^2-b^2}(\\frac ax-bx)-\\frac{2024}{a+b}$'
        ],
        correctAnswer: 3
    },
    {
        id: 21,
        type: 'single_choice',
        question: 'Если $f(x)=x+3$, найдите $3(f(2x)-2f(x-1))$.',
        options: ['-3', '3', '4', '-4'],
        correctAnswer: 0
    },
    {
        id: 22,
        type: 'single_choice',
        question: 'Вычислите $\\int_0^{\\pi/4}\\frac{\\sin6x}{\\cos8x}dx$.',
        options: ['$\\frac15$', '$\\frac16$', '$\\frac17$', '$\\frac18$'],
        correctAnswer: 2
    },
    {
        id: 23,
        type: 'single_choice',
        question: 'Найдите наименьшее значение функции $y=\\frac1{1-\\cos x}+\\frac4{\\cos x}$ на $[\\frac\\pi6;\\frac\\pi3]$.',
        options: ['8', '9', '10', '12'],
        correctAnswer: 1
    },
    {
        id: 24,
        type: 'single_choice',
        question: 'В квадрат вписана окружность. Найдите отношение периметра квадрата к длине окружности.',
        options: ['$\\frac2\\pi$', '$\\frac3\\pi$', '$\\frac4\\pi$', '$\\frac1\\pi$'],
        correctAnswer: 2
    },
    {
        id: 25,
        type: 'single_choice',
        question: 'Если $R=25$ и $r=5$, найдите площадь треугольника $ABC$.',
        "image": "/images/25-may2025_2/25.jpeg",
        options: ['125', '225', '255', '275'],
        correctAnswer: 3
    },
    {
        id: 26,
        type: 'single_choice',
        question: '$ABC$ — прямоугольный треугольник. $AD=4$, $CD=6$, $DE=EB=5$. Найдите площадь заштрихованной области.',
        "image": "/images/25-may2025_2/26.jpeg",
        options: ['6', '8', '9', '12'],
        correctAnswer: 1
    },
    {
        id: 27,
        type: 'single_choice',
        question: '$ABCD$ — квадрат. $MNC$ — прямоугольный треугольник. Если $CN=4$, $MN=3$, $CM=5$, найдите площадь квадрата $ABCD$.',
        "image": "/images/25-may2025_2/27.jpeg",
        options: ['$14\\frac2{17}$', '$13\\frac3{17}$', '$15\\frac1{17}$', '$16\\frac3{17}$'],
        correctAnswer: 2
    },
    {
        id: 28,
        type: 'single_choice',
        question: '$FG=6$ см, $ABCDEF$ — правильный шестиугольник. Найдите площадь заштрихованной области.',
        "image": "/images/25-may2025_2/28.jpeg",
        options: ['$8\\sqrt3$', '$9\\sqrt3$', '$12\\sqrt3$', '$15\\sqrt3$'],
        correctAnswer: 1
    },
    {
        id: 29,
        type: 'single_choice',
        question: '$ABCD$ — равнобедренная трапеция, $\\frac{BC}{AD}=\\frac13$. $MN$ — средняя линия, пересекающая высоту $BH$ в точке $O$. Если $\\vec{AO}=a\\vec{AB}+b\\vec{BC}$, найдите $\\frac ab$.',
        "image": "/images/25-may2025_2/29.jpeg",
        options: ['2', '$\\frac12$', '1', '3'],
        correctAnswer: 2
    },
    {
        id: 30,
        type: 'single_choice',
        question: 'Полная поверхность конуса в 8 раз больше площади его основания. Высота конуса равна 24. Найдите объём конуса.',
        options: ['$81\\pi$', '$75\\pi$', '$96\\pi$', '$92\\pi$'],
        correctAnswer: 2
    },
    {
        id: 31,
        type: 'single_choice',
        question: 'Даны множества $A=[2;4]$, $B=[6;8]$, $C=[3;7]$, $D=[3;4]$, $E=[6;7]$. Какое из выражений равно по мощности множеству $D\\cup E$?',
        options: ['$(B\\cup E)\\cap D$', '$(A\\cup B)\\cap C$', '$(C\\cup D)\\cup E$', '$(B\\cap E)\\cup C$'],
        correctAnswer: 1
    },
    {
        id: 32,
        type: 'single_choice',
        question: '$a,b,c$ — различные цифры. Сколько 2025-значных чисел вида $\\overline{abcabc\\dots abc}$ можно составить?',
        options: ['1000', '900', '720', '648'],
        correctAnswer: 3
    },
    {
        id: 33,
        type: 'matching',
        context: 'Задания 33–35 и варианты ответов A–F сопоставьте между собой. Вершины четырёхугольника имеют координаты $A(-3;2)$, $B(-1;2\\sqrt3+2)$, $C(3;2\\sqrt3+2)$, $D(9;2)$.',
        "image": "/images/25-may2025_2/33_35.jpeg",
        optionsPool: {
            A: '$12\\sqrt3$',
            B: '$16\\sqrt3$',
            C: '210',
            D: '240',
            E: '$72\\sqrt3$',
            F: '$72(\\sqrt3+1)$'
        },
        items: [
            {
                id: 33,
                text: 'Найдите площадь трапеции $ABCD$.',
                correctAnswer: 'B'
            }
        ]
    },
    {
        id: 34,
        type: 'matching',
        context: 'Задания 33–35 и варианты ответов A–F сопоставьте между собой. Вершины четырёхугольника имеют координаты $A(-3;2)$, $B(-1;2\\sqrt3+2)$, $C(3;2\\sqrt3+2)$, $D(9;2)$.',
        optionsPool: {
            A: '$12\\sqrt3$',
            B: '$16\\sqrt3$',
            C: '210',
            D: '240',
            E: '$72\\sqrt3$',
            F: '$72(\\sqrt3+1)$'
        },
        items: [
            {
                id: 34,
                text: 'Найдите полную площадь поверхности тела, полученного вращением четырёхугольника вокруг большей стороны на $360^\\circ$.',
                correctAnswer: 'F'
            }
        ]
    },
    {
        id: 35,
        type: 'matching',
        context: 'Задания 33–35 и варианты ответов A–F сопоставьте между собой. Вершины четырёхугольника имеют координаты $A(-3;2)$, $B(-1;2\\sqrt3+2)$, $C(3;2\\sqrt3+2)$, $D(9;2)$.',
        optionsPool: {
            A: '$12\\sqrt3$',
            B: '$16\\sqrt3$',
            C: '210',
            D: '240',
            E: '$72\\sqrt3$',
            F: '$72(\\sqrt3+1)$'
        },
        items: [
            {
                id: 35,
                text: 'Найдите объём тела, полученного вращением четырёхугольника вокруг большей стороны на $360^\\circ$.',
                correctAnswer: 'D'
            }
        ]
    },
    {
        id: 36,
        type: 'open_ended',
        question: 'Решите уравнение $(99+70\\sqrt2)^x+8(17+12\\sqrt2)^x-7(3+2\\sqrt2)^x+(3-2\\sqrt2)^x=7$.',
        subQuestions: [
            {
                id: 'a',
                text: 'Сколько действительных корней имеет уравнение?',
                correctAnswer: '2'
            },
            {
                id: 'b',
                text: 'Найдите сумму действительных корней.',
                correctAnswer: '0'
            }
        ]
    },
    {
        id: 37,
        type: 'open_ended',
        question: 'Решите уравнение $(2\\sin x-\\sqrt3)\\sqrt{7x-4-3x^2}=0$.',
        subQuestions: [
            {
                id: 'a',
                text: 'Сколько действительных корней имеет уравнение?',
                correctAnswer: '3'
            },
            {
                id: 'b',
                text: 'Найдите произведение наибольшего и наименьшего корней.',
                correctAnswer: '4'
            }
        ]
    },
    {
        id: 38,
        type: 'open_ended',
        question: 'Для функции $f(x)=a x^n+b$, $n\\in N$, выполняется $f(x)f(1/x)=f(x)+f(1/x)$ и $f(3)=82$.',
        subQuestions: [
            {
                id: 'a',
                text: 'Найдите $f(2)+f(1)$.',
                correctAnswer: '19'
            },
            {
                id: 'b',
                text: 'Найдите область значений функции $y=f(x)$.',
                correctAnswer: '[1;\\infty)'
            }
        ]
    },
    {
        id: 39,
        type: 'open_ended',
        question: 'Если $f(x)=\\sin(1/x)$ и существует производная второго порядка, найдите следующие значения.',
        subQuestions: [
            {
                id: 'a',
                text: 'Найдите $f^{\\prime}(1/\\pi)$.',
                correctAnswer: '$\\pi^2$'
            },
            {
                id: 'b',
                text: 'Если $g(x)=f(x)+2x^3f^{\\prime}(x)+x^4f^{\\prime\\prime}(x)$, найдите $g(2025)$.',
                correctAnswer: '0'
            }
        ]
    },
    {
        id: 40,
        type: 'open_ended',
        question: '$ABCDEF$ — правильный шестиугольник площадью $6\\sqrt3$. На рисунке проведены отрезки $LM$, $LK$, $MN$.',
        "image": "/images/25-may2025_2/40.jpeg",
        subQuestions: [
            {
                id: 'a',
                text: 'Найдите длину $LM$.',
                correctAnswer: '1'
            },
            {
                id: 'b',
                text: 'Найдите площадь заштрихованной области $LKMN$.',
                correctAnswer: '$\\frac{\\sqrt3}{3}$'
            }
        ]
    },
    {
        id: 41,
        type: 'open_ended',
        question: 'Для функции $f(x)$ выполнены условия $\\int_0^1 f(x)f^{\\prime}(x)dx=0$ и $\\int_0^1 f^2(x)f^{\\prime}(x)dx=18$.',
        subQuestions: [
            {
                id: 'a',
                text: 'Найдите $f(1)$.',
                correctAnswer: '3'
            },
            {
                id: 'b',
                text: 'Найдите $\\int_0^1 f^4(x)f^{\\prime}(x)dx$.',
                correctAnswer: '$\\frac{486}{5}$'
            }
        ]
    },
    {
        id: 42,
        type: 'open_ended',
        question: 'Высоты треугольника $ABC$, опущенные на стороны $a,b,c$, равны соответственно $h_a=12$, $h_b=12\\frac{12}{13}$ и $h_c=11\\frac15$.',
        subQuestions: [
            {
                id: 'a',
                text: 'Найдите радиус вписанной окружности треугольника $ABC$.',
                correctAnswer: '4'
            },
            {
                id: 'b',
                text: 'Найдите площадь треугольника $ABC$.',
                correctAnswer: '84'
            }
        ]
    },
    {
        id: 43,
        type: 'open_ended',
        question: 'На рисунке изображён прямоугольник $ABCD$. Даны $S_{ABK}=10$, $S_{FEG}=1$, $S_{AFD}=7$, $S_{KHG}=S_1$, $S_{AKGF}=S_2$.',
        "image": "/images/25-may2025_2/43.jpeg",
        subQuestions: [
            {
                id: 'a',
                text: 'Найдите $S_1$.',
                correctAnswer: '4'
            },
            {
                id: 'b',
                text: 'Если $AB=8$ и $AD=11$, найдите $S_2$.',
                correctAnswer: '33'
            }
        ]
    },
    {
        id: 44,
        type: 'open_ended',
        question: 'На рисунке изображены шар, конус и цилиндр. $R_{шара}=R_{конуса}=R_{цилиндра}$ и $V_{цилиндра}=V_{конуса}+V_{шара}$.',
        "image": "/images/25-may2025_2/44.jpeg",
        subQuestions: [
            {
                id: 'a',
                text: 'Если $H=10$ см, сколько литров воды помещается в цилиндрический сосуд?',
                correctAnswer: '0,75 litr'
            },
            {
                id: 'b',
                text: 'Если площадь поверхности шара равна $144\\pi$, найдите объём цилиндра.',
                correctAnswer: '1296'
            }
        ]
    },
    {
        id: 45,
        type: 'open_ended',
        question: 'Круг разделён в отношении 1:2 на меньший и больший сектора. Из этих частей изготовлены стаканы.',
        "image": "/images/25-may2025_2/45.jpeg",
        subQuestions: [
            {
                id: 'a',
                text: 'Найдите отношение объёма первого стакана к объёму второго.',
                correctAnswer: '$\\frac{\\sqrt{10}}{10}$'
            },
            {
                id: 'b',
                text: 'Найдите отношение объёма шара, вписанного в первый конус, к объёму шара, вписанного во второй конус.',
                correctAnswer: '$\\frac{\\sqrt{10}}4$'
            }
        ]
    }
];
