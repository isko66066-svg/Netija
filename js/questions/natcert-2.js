var questions = [
    // =========================================================
    // 1–32 — ОБЫЧНЫЕ ВОПРОСЫ
    // =========================================================

    {
        id: 1,
        question: "Найдите остаток от деления суммы $77...79 + 77...78 + 77...77 + \\dots + 77...72 + 77...71$ на 7.",
        type: "single_choice",
        options: ["1", "6", "0", "3"],
        correctAnswer: 3
    },

    {
        id: 2,
        question: "Вычислите: $4\\frac{2}{2025}\\cdot6\\frac{5}{2026}-2\\frac{2023}{2025}\\cdot7\\frac{2021}{2026}-\\frac{35}{2026}$",
        type: "single_choice",
        options: [
            "$\\frac{7}{1013}$",
            "$\\frac{7}{2026}$",
            "$\\frac{14}{1013}$",
            "$\\frac{28}{2025}$"
        ],
        correctAnswer: 3
    },

    {
        id: 3,
        question: "Расстояние между городами A и B равно 24 км. Из городов A и B навстречу друг другу вышли два пешехода. Через 1 час первый прошёл на 2 км больше второго. Если первый пешеход прибыл в пункт назначения на 1 час раньше второго, то за какое время прибыл второй пешеход?",
        type: "single_choice",
        options: ["4", "6", "3", "8"],
        correctAnswer: 0
    },

    {
        id: 4,
        question: "У Малики есть 2 одинаковых платья. Первое платье она продала со скидкой 5%, а второе — без скидки. Прибыль от первого платья составляет 18% от цены продажи первого платья. Сколько процентов от цены продажи составляет прибыль от второго платья?",
        type: "single_choice",
        options: ["23,1", "22,1", "23,2", "22"],
        correctAnswer: 1
    },

    {
        id: 5,
        question: "Вычислите: $\\frac{(3^4\\cdot2)^{-\\frac12}}{9^{-3}\\cdot2^{-2}}$",
        type: "single_choice",
        options: [
            "$162\\sqrt2$",
            "$\\frac{81}{2\\sqrt2}$",
            "$\\frac{2\\sqrt2}{81}$",
            "$162$"
        ],
        correctAnswer: 0
    },

    {
        id: 6,
        question: "Вычислите: $\\sqrt[6]{7-\\sqrt{40}}\\cdot\\sqrt[3]{\\sqrt2+\\sqrt5}\\cdot\\sqrt[3]{9}$",
        type: "single_choice",
        options: [
            "$3$",
            "$-3$",
            "$6\\sqrt3$",
            "$3\\sqrt3$"
        ],
        correctAnswer: 0
    },

    {
        id: 7,
        question: "Вычислите: $\\frac{5}{\\sqrt[3]{32}+2}+\\frac{5}{\\sqrt[3]{128}-\\sqrt[3]{32}+2}-\\sqrt[3]{2}$",
        type: "single_choice",
        options: [
            "$-1$",
            "$1$",
            "$0$",
            "$\\sqrt6$"
        ],
        correctAnswer: 1
    },

    {
        id: 8,
        question: "Найдите сумму первых одиннадцати членов арифметической прогрессии, если формула её общего члена имеет вид $a_n=3,8-0,7n$.",
        type: "single_choice",
        options: ["-0,55", "-4,4", "-3,7", "-3,3"],
        correctAnswer: 1
    },

    {
        id: 9,
        question: "Найдите сумму первых 5 членов убывающей геометрической прогрессии, если $b_1+b_2+b_3=19$ и $b_1^2+b_2^2+b_3^2=133$.",
        type: "single_choice",
        options: [
            "$22\\frac49$",
            "$22\\frac59$",
            "$23\\frac19$",
            "$23\\frac49$"
        ],
        correctAnswer: 3
    },

    {
        id: 10,
        question: "Найдите значение выражения при $a=\\sqrt2$ и $b=\\sqrt{18}$: $\\left(\\frac{\\sqrt{ab}}{\\sqrt a+\\sqrt b}-\\frac{b}{\\sqrt b-\\sqrt a}+\\frac{2b\\sqrt a}{a-b}\\right)\\cdot\\left(\\frac{1}{\\sqrt a-\\sqrt b}-\\frac{\\sqrt b}{a+\\sqrt{ab}}+\\frac{2\\sqrt b}{b-a}\\right)$",
        type: "single_choice",
        options: ["9", "3", "$\\sqrt3$", "$\\sqrt6$"],
        correctAnswer: 2
    },

    {
        id: 11,
        question: "Упростите: $(2x-1)^4-8x(2x-1)^3+24x^2(2x-1)^2-32x^3(2x-1)+16x^4$",
        type: "single_choice",
        options: [
            "1",
            "$(4x-1)^2$",
            "$\\frac12$",
            "-1"
        ],
        correctAnswer: 0
    },

    {
        id: 12,
        question: "Сколько корней имеет уравнение на интервале $\\left[-\\frac{\\pi}{2};\\frac{5\\pi}{2}\\right]$? $\\cos\\left(\\frac{3\\pi}{2}+2x\\right)=0$",
        type: "single_choice",
        options: ["3", "2", "7", "4"],
        correctAnswer: 2
    },

    {
        id: 13,
        question: "Сколько решений имеет уравнение на отрезке $\\left[-\\frac{3\\pi}{2};\\frac{5\\pi}{2}\\right]$? $\\sin^4x+\\cos^4x=1$",
        type: "single_choice",
        options: ["8", "4", "9", "7"],
        correctAnswer: 2
    },

    {
        id: 14,
        question: "Если $x$ и $y$ — корни системы уравнений, найдите $x\\cdot y$: $\\begin{cases}x^{3y-4}=9\\\\x^{y+1}=27\\end{cases}$",
        type: "single_choice",
        options: ["8", "10", "9", "6"],
        correctAnswer: 3
    },

    {
        id: 15,
        question: "Сколько действительных корней имеет уравнение?",
        type: "single_choice",
        subtitle: "$\\frac{\\sqrt{4-x}-\\sqrt{5x^3-4x^2-4x}}{\\sqrt{4-x}+\\log_5^2(5x^3-4x^2+1)}=1$",
        options: [
            "Имеет бесконечно много решений",
            "1",
            "Не имеет действительных корней",
            "2"
        ],
        correctAnswer: 2
    },

    {
        id: 16,
        question: "Сколько целых решений имеет уравнение? $x^4-\\frac{2027!}{2026!+2025!}x^2+2025=0$",
        type: "single_choice",
        options: ["1", "2", "3", "4"],
        correctAnswer: 3
    },

    {
        id: 17,
        question: "Решите уравнение: $x+\\frac{x}{1+2}+\\frac{x}{1+2+3}+\\frac{x}{1+2+3+4}+\\dots+\\frac{x}{1+2+3+\\dots+4041}=4041$",
        type: "single_choice",
        options: ["2021", "2022", "2023", "2024"],
        correctAnswer: 0
    },

    {
        id: 18,
        question: "Найдите сумму целых чисел, являющихся решением неравенства: $\\frac{|x^2-8x+12|}{18+7x-x^2}>0$",
        type: "single_choice",
        options: ["35", "27", "30", "24"],
        correctAnswer: 1
    },

    {
        id: 19,
        question: "Сколько целых чисел удовлетворяют неравенству? $\\sqrt{x^2-4x+4}<5\\sqrt{2-x}+6$",
        type: "single_choice",
        options: ["34", "36", "35", "37"],
        correctAnswer: 1
    },

    {
        id: 20,
        question: "Сколько целых значений принадлежит области определения функции? $y=\\log_{x+2}\\frac{(x-2)\\sqrt{24+2x-x^2}}{x-2}$",
        type: "single_choice",
        options: ["5", "6", "4", "7"],
        correctAnswer: 0
    },

    {
        id: 21,
        question: "Вычислите определённый интеграл: $\\int_{-\\frac{\\pi}{4}}^{\\frac{\\pi}{4}}\\frac{\\sin^3x}{\\cos^7x}\\,dx$",
        type: "single_choice",
        options: [
            "$-\\frac15$",
            "0",
            "$\\frac15$",
            "$-\\frac5{12}$"
        ],
        correctAnswer: 1
    },

    {
        id: 22,
        question: "Найдите область значений функции $y=\\frac{x^4+1}{x^2+1}$.",
        type: "single_choice",
        options: [
            "$(-2\\sqrt2-2;\\infty)$",
            "$(-2\\sqrt2-2;2\\sqrt2-2)$",
            "$(2\\sqrt2-2;\\infty)$",
            "$(2\\sqrt2;\\infty)$"
        ],
        correctAnswer: 2
    },

    {
        id: 23,
        question: "Хорда окружности, равная 8, стягивает дугу в $90^\\circ$. Найдите радиус окружности.",
        type: "single_choice",
        options: [
            "$3\\sqrt2$",
            "4",
            "$4\\sqrt2$",
            "8"
        ],
        correctAnswer: 2
    },

    {
        id: 24,
        question: "Найдите наименьшее значение функции $f(x)=(x-8)e^{x-7}$ на отрезке $[5;9]$.",
        type: "single_choice",
        options: [
            "-1",
            "$e^2$",
            "$-\\frac3{e^2}$",
            "0"
        ],
        correctAnswer: 2
    },

    {
        id: 25,
        question: "Даны правильные треугольники ABC и FED. Если $AB=18$ и $AF:FC=CD:DB=BE:EA=1:2$, найдите площадь треугольника FED.",
        image: "images/28-feb_2-img/2-25.jpg",
        type: "single_choice",
        options: [
            "$27\\sqrt3$",
            "$18\\sqrt3$",
            "9",
            "$9\\sqrt3$"
        ],
        correctAnswer: 0
    },

    {
        id: 26,
        question: "На основании приведённого рисунка найдите площадь закрашенной области.",
        image: "images/28-feb_2-img/2-26.jpg",
        type: "single_choice",
        options: [
            "$15\\sqrt3$",
            "$14\\sqrt3$",
            "28",
            "30"
        ],
        correctAnswer: 3
    },

    {
        id: 27,
        question: "Меньшая боковая сторона прямоугольной трапеции с основаниями 3 и 9 равна 6. Найдите наименьшее расстояние от точки пересечения диагоналей трапеции до большего основания.",
        type: "single_choice",
        options: ["4,5", "3", "3,5", "1"],
        correctAnswer: 0
    },

    {
        id: 28,
        question: "Если количество диагоналей правильного многоугольника равно 35, найдите угол между наибольшей и наименьшей диагоналями, выходящими из одной его вершины.",
        type: "single_choice",
        options: [
            "$54^\\circ$",
            "$72^\\circ$",
            "$45^\\circ$",
            "$60^\\circ$"
        ],
        correctAnswer: 0
    },

    {
        id: 29,
        question: "$A(3;1;2)$, $B(-1;1;4)$ и $C(0;2;2)$ — вершины треугольника. Найдите длину медианы, проведённой из вершины C к стороне AB.",
        type: "single_choice",
        options: [
            "$\\sqrt{10}$",
            "$\\sqrt{20}$",
            "$\\sqrt6$",
            "$\\sqrt3$"
        ],
        correctAnswer: 3
    },

    {
        id: 30,
        question: "Боковое ребро правильной шестиугольной пирамиды образует с плоскостью основания угол $60^\\circ$. Если длина ребра равна $\\sqrt{39}$, найдите объём пирамиды.",
        type: "single_choice",
        options: [
            "13",
            "$\\frac{117\\sqrt{39}}{32}$",
            "$\\frac{39\\sqrt{39}}{32}$",
            "$\\frac{117\\sqrt{39}}{16}$"
        ],
        correctAnswer: 3
    },

    {
        id: 31,
        question: "Найдите количество элементов множества $(A\\cup C)\\cap(B\\cup D)$.",
        image: "images/28-feb_2-img/2-31.jpg",
        type: "single_choice",
        options: ["12", "11", "13", "16"],

        // В разборе автор отмечает неоднозначность рисунка:
        // при повторяющемся элементе получается 11.
        correctAnswer: 1
    },

    {
        id: 32,
        question: "Каждая буква слова «MATEMATИKA» была записана на отдельном листке бумаги. Найдите вероятность того, что при случайном выборе одного листка на нём окажется буква M.",
        type: "single_choice",
        options: [
            "$\\frac1{10}$",
            "$\\frac3{10}$",
            "$\\frac15$",
            "$\\frac25$"
        ],
        correctAnswer: 2
    },


    // =========================================================
    // 33–35 — MATCHING
    // =========================================================

    {
        id: 33,
        type: "matching",

        question: "В правильную треугольную пирамиду вписан конус. Радиус основания конуса равен 4. Боковые грани пирамиды образуют с плоскостью основания угол $60^\\circ$ (считать $\\pi\\approx3$).",

        items: [
            {
                id: "33",
                text: "Найдите площадь боковой поверхности конуса.",
                correctAnswer: "B"
            },
            {
                id: "34",
                text: "Найдите площадь боковой поверхности пирамиды.",
                correctAnswer: "E"
            },
            {
                id: "35",
                text: "Найдите объём пирамиды.",
                correctAnswer: "C"
            }
        ],

        optionsPool: {
            A: "48",
            B: "96",
            C: "192",
            D: "$64\\sqrt3$",
            E: "$96\\sqrt3$",
            F: "100"
        }
    },


    // =========================================================
    // 36–45 — ОТКРЫТЫЕ
    // =========================================================

    {
        id: 36,
        type: "open_ended",

        question: "Решите систему уравнений: $\\begin{cases}x-\\frac14xy-y=0\\\\x^2-\\frac52xy+y^2=0\\end{cases}$",

        subQuestions: [
            {
                id: "a",
                text: "Если $(x_1;y_1),(x_2;y_2),\\dots,(x_n;y_n)$ — решения системы уравнений, найдите наибольшее значение $x_n\\cdot y_n$.",
                correctAnswer: "8"
            },
            {
                id: "b",
                text: "Сколько решений имеет система уравнений?",
                correctAnswer: "3"
            }
        ]
    },

    {
        id: 37,
        type: "open_ended",

        question: "Решите уравнение: $\\sin^2x+\\sin2x=3\\cos^2x$",

        subQuestions: [
            {
                id: "a",
                text: "Найдите наибольший отрицательный корень уравнения.",
                correctAnswer: "-arctg3"
            },
            {
                id: "b",
                text: "Найдите количество решений на промежутке $[-\\pi;\\pi]$.",
                correctAnswer: "4"
            }
        ]
    },

    {
        id: 38,
        type: "open_ended",

        question: "Для функций $f(x)$ и $g(x)$ выполняются условия $f(3x-2)+7g(x-5)=x+1$ и $f(x+1)-g\\left(\\frac{x}{3}-4\\right)=3x$.",

        subQuestions: [
            {
                id: "a",
                text: "Найдите $(f(1))^{-1}$.",
                correctAnswer: "1"
            },
            {
                id: "b",
                text: "Найдите количество корней уравнения $f(x)+g(x)=\\frac12$.",
                correctAnswer: "1"
            }
        ]
    },

    {
        id: 39,
        type: "open_ended",

        question: "На рисунке изображён график функции $f(x)$ на отрезке $[-9;5]$.",
        image: "images/28-feb_2-img/2-39.jpg",

        subQuestions: [
            {
                id: "a",
                text: "Сколько точек экстремума у функции $f(x)$ на отрезке $[-9;5]$?",
                correctAnswer: "8"
            },
            {
                id: "b",
                text: "Чему равно наибольшее целое значение аргумента на отрезке $[-9;5]$, удовлетворяющее неравенству $f'(x)<0$?",
                correctAnswer: "4"
            }
        ]
    },

    {
        id: 40,
        type: "open_ended",

        question: "Даны функции $f(x)=px^2+qx$ и $g(x)=ax^3+bx^2+cx$. Они пересекаются в точках $(-2;8)$ и $(2;0)$, а функция $g(x)$ проходит через точку $\\left(-1\\frac23;0\\right)$.",
        image: "images/28-feb_2-img/2-40.jpg",

        subQuestions: [
            {
                id: "a",
                text: "Найдите $\\frac{a+b+c}{p+q}$.",
                correctAnswer: "-8"
            },
            {
                id: "b",
                text: "Найдите площадь закрашенной области.",
                correctAnswer: "24"
            }
        ]
    },

    {
        id: 41,
        type: "open_ended",

        question: "В прямоугольный треугольник ABC вписана окружность с центром в точке O. Прямая CO пересекает гипотенузу AB в точке D. Радиус равен $\\sqrt3$, $CO:OD=\\sqrt3:\\sqrt2$.",
        image: "images/28-feb_2-img/2-41.jpg",

        subQuestions: [
            {
                id: "a",
                text: "Найдите длину отрезка OD.",
                correctAnswer: "2"
            },
            {
                id: "b",
                text: "Найдите меньший угол прямоугольного треугольника.",
                correctAnswer: "15"
            }
        ]
    },

    {
        id: 42,
        type: "open_ended",

        question: "Два квадрата нарисованы так, как показано на рисунке. Если $S_1=9$ и $S_2=27$.",
        image: "images/28-feb_2-img/2-42.jpg",

        subQuestions: [
            {
                id: "a",
                text: "Найдите $S_3$.",
                correctAnswer: "9/5"
            },
            {
                id: "b",
                text: "Найдите $S_4$.",
                correctAnswer: "36"
            }
        ]
    },

    {
        id: 43,
        type: "open_ended",

        question: "На сторонах BC и AF правильного шестиугольника ABCDEF со стороной 9 взяты точки G и H соответственно. Если $BG=1$ и $HF=2$.",
        image: "images/28-feb_2-img/2-43.jpg",

        subQuestions: [
            {
                id: "a",
                text: "Найдите длину отрезка GH.",
                correctAnswer: "14"
            },
            {
                id: "b",
                text: "Найдите $\\frac{S_1}{S_2}$.",
                correctAnswer: "79/407"
            }
        ]
    },

    {
        id: 44,
        type: "open_ended",

        question: "В пирамиде ABCD вершина D, $DC=3$. Сфера радиуса $\\frac23$ касается боковой грани ABD, ребра DC и точки пересечения медиан треугольника ABC. $AD\\perp ABC$ и $AC=BC$.",

        subQuestions: [
            {
                id: "a",
                text: "Найдите длину медианы треугольника ABC, опущенной на сторону AB.",
                correctAnswer: "2"
            },
            {
                id: "b",
                text: "Найдите объём пирамиды.",
                correctAnswer: "4√11/9"
            }
        ]
    },

    {
        id: 45,
        type: "open_ended",

        question: "Функция дохода $A(x)=\\frac{2x}{3}$, функция расходов $B(x)=2\\sqrt{x}$, где $x$ — количество работников.",

        subQuestions: [
            {
                id: "a",
                text: "Сколько работников нужно нанять как минимум, чтобы предприятие не терпело убытков?",
                correctAnswer: "9"
            },
            {
                id: "b",
                text: "Сколько работников нужно нанять как минимум, чтобы предприятие получало прибыль?",
                correctAnswer: "10"
            }
        ]
    }
];