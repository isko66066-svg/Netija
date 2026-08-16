const questions = [
    // --- 1–32: ТЕСТОВЫЕ ВОПРОСЫ (SINGLE CHOICE) ---
    {
        id: 1,
        type: "single_choice",
        question: "Вычислите: $666...66\\ (50\\ штук) + 555...55\\ (50\\ штук)$",
        image: null,
        options: [
            "$122...221\\ (49\\ двоек)$",
            "$122...221\\ (50\\ двоек)$",
            "$222...221\\ (49\\ двоек)$",
            "$222...221\\ (50\\ двоек)$"
        ],
        correctAnswer: 0
    },

    {
        id: 2,
        type: "single_choice",
        question: "Вычислите: $(2,28-4\\frac{7}{20}):2\\frac{1}{4}-(\\frac{1}{2}-1\\frac{7}{8})$",
        image: null,
        options: [
            "$0,366$",
            "$0,356$",
            "$0,455$",
            "$0,466$"
        ],
        correctAnswer: 2
    },

    {
        id: 3,
        type: "single_choice",
        question: "Из городов A и B (расстояние 275 км) одновременно навстречу выехали мотоциклист (50 км/ч) и велосипедист (20 км/ч). Велосипедист отдохнул 15 мин. Найдите путь мотоциклиста до встречи.",
        image: null,
        options: [
            "$180\\ км$",
            "$200\\ км$",
            "$160\\ км$",
            "$240\\ км$"
        ],
        correctAnswer: 1
    },

    {
        id: 4,
        type: "single_choice",
        question: "Гипотенуза прямоугольного треугольника равна $3\\sqrt{5}$. Один катет увеличили на $133\\frac{1}{3}\\%$, второй — на $16\\frac{2}{3}\\%$, их сумма стала 14. Найдите площадь треугольника.",
        image: null,
        options: [
            "$9$",
            "$12$",
            "$8$",
            "$15$"
        ],
        correctAnswer: 0
    },

    {
        id: 5,
        type: "single_choice",
        question: "Вычислите: $\\left(\\frac{2}{3}\\right)^{-3}\\cdot(1,875)^{-1}$",
        image: null,
        options: [
            "$1\\frac{3}{4}$",
            "$1\\frac{3}{5}$",
            "$1\\frac{4}{5}$",
            "$1,5$"
        ],
        correctAnswer: 2
    },

    {
        id: 6,
        type: "single_choice",
        question: "Вычислите: $\\sqrt{\\frac{666666^2}{12345654321}}$",
        image: null,
        options: [
            "$1$",
            "$6$",
            "$5$",
            "$12$"
        ],
        correctAnswer: 1
    },

    {
        id: 7,
        type: "single_choice",
        question: "Вычислите: $\\sqrt[6]{7-\\sqrt{40}}\\cdot\\sqrt[3]{\\sqrt{5}+\\sqrt{2}}\\cdot\\sqrt[3]{9}$",
        image: null,
        options: [
            "$-3$",
            "$3$",
            "$-3\\sqrt{3}$",
            "$3\\sqrt{2}$"
        ],
        correctAnswer: 1
    },

    {
        id: 8,
        type: "single_choice",
        question: "В арифметической прогрессии $a_3=a_1+a_2$ и $a_1\\cdot a_2\\cdot a_3=384$. Найдите $S_{10}$.",
        image: null,
        options: [
            "$210$",
            "$180$",
            "$220$",
            "$240$"
        ],
        correctAnswer: 2
    },

    {
        id: 9,
        type: "single_choice",
        question: "В убывающей геометрической прогрессии $b_1+b_2+b_3=19$ и $b_1^2+b_2^2+b_3^2=133$. Вычислите $S_5$.",
        image: null,
        options: [
            "$23\\frac{2}{9}$",
            "$23\\frac{4}{9}$",
            "$23\\frac{1}{9}$",
            "$22\\frac{7}{9}$"
        ],
        correctAnswer: 1
    },

    {
        id: 10,
        type: "single_choice",
        question: "Если $\\frac{x}{y}=4$ и $y\\neq-\\frac{3}{5}$, найдите значение выражения: $\\frac{x+y+3}{x+6y+6}$",
        image: null,
        options: [
            "$1$",
            "$\\frac{1}{2}$",
            "$\\frac{1}{3}$",
            "$\\frac{1}{4}$"
        ],
        correctAnswer: 1
    },

    {
        id: 11,
        type: "single_choice",
        question: "Упростите выражение: $\\frac{\\left(\\frac{1}{x}+\\frac{1}{y}+\\frac{1}{xy}\\right)(x+y-1)}{\\frac{1}{x^2}+\\frac{1}{y^2}+\\frac{2}{xy}-\\frac{1}{x^2y^2}}$",
        image: null,
        options: [
            "$xy$",
            "$\\frac{1}{xy}$",
            "$\\frac{1}{x^2y^2}$",
            "$x^2y^2$"
        ],
        correctAnswer: 0
    },

    {
    id: 12,
    type: "single_choice",
    question: "Если $\\cos\\alpha=\\frac{3}{5}$ ($0<\\alpha<\\frac{\\pi}{2}$) и $a=\\sin\\alpha$, $b=\\operatorname{tg}\\alpha$, $c=\\operatorname{ctg}\\alpha$, расположите $a$, $b$, $c$ по возрастанию.",
    image: null,
    options: [
        "$a<b<c$",
        "$b<a<c$",
        "$c<a<b$",
        "$a<c<b$"
    ],
    correctAnswer: 3
    },

    {
        id: 13,
        type: "single_choice",
        question: "Если $\\cos\\alpha+\\sqrt{3}\\cos\\beta=0$ и $2\\alpha+\\beta=180^\\circ$, найдите $|\\alpha-\\beta|$.",
        image: null,
        options: [
            "$30^\\circ$",
            "$60^\\circ$",
            "$90^\\circ$",
            "$45^\\circ$"
        ],
        correctAnswer: 2
    },

    {
        id: 14,
        type: "single_choice",
        question: "Вычислите сумму действительных корней уравнения: $4^{x^2-x}-17\\cdot2^{x^2-x+2}+256=0$",
        image: null,
        options: [
            "$2$",
            "$-2$",
            "$0$",
            "$1$"
        ],
        correctAnswer: 0
    },

    {
        id: 15,
        type: "single_choice",
        question: "Найдите произведение действительных корней уравнения: $2^{3-\\log_x3}=\\log_32\\cdot\\log_{32}x-\\frac{2}{5}\\log_{\\sqrt{x}}3$",
        image: null,
        options: [
            "$\\frac{\\sqrt{3}}{3}$",
            "$\\frac{9\\sqrt{3}}{3}$",
            "$\\frac{27\\sqrt{3}}{3}$",
            "$27$"
        ],
        correctAnswer: 2
    },

    {
        id: 16,
        type: "single_choice",
        question: "Сколько целых решений имеет уравнение: $x^4-\\frac{2027!}{2026!+2025!}x^2+2025=0$?",
        image: null,
        options: [
            "$1$",
            "$2$",
            "$3$",
            "$4$"
        ],
        correctAnswer: 3
    },

    {
        id: 17,
        type: "single_choice",
        question: "Сколько целых решений имеет уравнение: $x^4-\\sqrt{|x|}-45=2025^2$?",
        image: null,
        options: [
            "$1$",
            "$2$",
            "$3$",
            "$4$"
        ],
        correctAnswer: 1
    },

    {
        id: 18,
        type: "single_choice",
        question: "Сколько целых решений имеет неравенство: $\\frac{x^2-7|x|+10}{x^2-6x+9}<0$?",
        image: null,
        options: [
            "$1$",
            "$2$",
            "$3$",
            "$4$"
        ],
        correctAnswer: 2
    },

    {
        id: 19,
        type: "single_choice",
        question: "Сколько целых чисел удовлетворяют неравенству: $\\sqrt{x^2-4x+4}-5\\sqrt{2-x}-6<0$?",
        image: null,
        options: [
            "$35$",
            "$36$",
            "$37$",
            "$34$"
        ],
        correctAnswer: 1
    },

    {
        id: 20,
        type: "single_choice",
        question: "На рисунке изображен график функции $f(x)=ax^2+bx+c$. Координаты вершины параболы равны $(3;5)$, и она пересекает ось $Oy$ в точке $(0;3\\frac{1}{5})$. Найдите значение $f(18)$.",
        image: "images/28-feb_1-img/1-20.jpg",
        options: [
            "$-18$",
            "$-36$",
            "$-40$",
            "$-20$"
        ],
        correctAnswer: 2
    },

    {
        id: 21,
        type: "single_choice",
        question: "Вычислите интеграл: $\\int_{-1}^{1}\\frac{1}{x^4+x^2}\\,dx$",
        image: null,
        options: [
            "$2-\\frac{\\pi}{2}$",
            "$-2-\\frac{\\pi}{2}$",
            "$-2+\\frac{\\pi}{2}$",
            "$0$"
        ],
        correctAnswer: 1
    },

    {
        id: 22,
        type: "single_choice",
        question: "Если $3(3x+4)^{20}=C_0x^{20}+C_1x^{19}+...+C_{20}$, вычислите $20\\cdot19C_0-19\\cdot18C_1+...+C_{18}$",
        image: null,
        options: [
            "$9360$",
            "$10260$",
            "$11260$",
            "$10620$"
        ],
        correctAnswer: 1
    },

    {
        id: 23,
        type: "single_choice",
        question: "Хорда окружности равна 8 и стягивает дугу в $90^\\circ$. Найдите радиус окружности.",
        image: null,
        options: [
            "$4$",
            "$2\\sqrt{2}$",
            "$4\\sqrt{2}$",
            "$8$"
        ],
        correctAnswer: 2
    },

    {
        id: 24,
        type: "single_choice",
        question: "Сколько из представленных ниже графиков являются функциями?",
        image: "images/28-feb_1-img/1-24.jpg",
        options: [
            "$1$",
            "$2$",
            "$3$",
            "Все"
        ],
        correctAnswer: 0
    },

    {
        id: 25,
        type: "single_choice",
        question: "Биссектриса прямого угла B треугольника ABC делит гипотенузу AC на отрезки $\\sqrt{5}$ и $2\\sqrt{5}$. Найдите площадь ABC.",
        image: null,
        options: [
            "$12$",
            "$9$",
            "$18$",
            "$15$"
        ],
        correctAnswer: 1
    },

    {
        id: 26,
        type: "single_choice",
        question: "В треугольнике ABC ($AB=6$, $AE=4$, $EC=8$) проведены биссектрисы AD и BE, пересекающиеся в K. Найдите площадь KDCE.",
        image: "images/28-feb_1-img/1-26.jpg",
        options: [
            "$\\frac{26\\sqrt{15}}{5}$",
            "$\\frac{12\\sqrt{15}}{5}$",
            "$\\frac{24\\sqrt{15}}{5}$",
            "$\\frac{13\\sqrt{15}}{5}$"
        ],
        correctAnswer: 2
    },

    {
        id: 27,
        type: "single_choice",
        question: "Основания трапеции $BC=7$ и $AD=27$, боковые стороны $AB=12$ и $CD=16$. Найдите площадь трапеции.",
        image: "images/28-feb_1-img/1-27.jpg",
        options: [
            "$163\\frac{1}{5}$",
            "$162\\frac{1}{5}$",
            "$161\\frac{1}{5}$",
            "$160\\frac{1}{5}$"
        ],
        correctAnswer: 0
    },

    {
        id: 28,
        type: "single_choice",
        question: "Если угол между наименьшими диагоналями правильного $n$-угольника равен $120^\\circ$, сколько у него сторон?",
        image: "images/28-feb_1-img/1-28.jpg",
        options: [
            "$10$",
            "$12$",
            "$8$",
            "$16$"
        ],
        correctAnswer: 1
    },

    {
        id: 29,
        type: "single_choice",
        question: "Треугольник ABC имеет вершины $A(1;3)$, $B(5;1)$, $C(4;4)$. Найдите длину биссектрисы AL.",
        image: "images/28-feb_1-img/1-29.jpg",
        options: [
            "$\\sqrt{40-10\\sqrt{2}}$",
            "$\\sqrt{40-20\\sqrt{2}}$",
            "$\\sqrt{30-15\\sqrt{2}}$",
            "$\\sqrt{30-10\\sqrt{2}}$"
        ],
        correctAnswer: 1
    },

    {
        id: 30,
        type: "single_choice",
        question: "Площадь полной поверхности правильной четырёхугольной пирамиды в 3 раза больше площади основания. Найдите $\\tg$ угла наклона боковой грани.",
        image: null,
        options: [
            "$\\frac{1}{2}$",
            "$\\frac{1}{\\sqrt{3}}$",
            "$\\sqrt{3}$",
            "$\\frac{1}{3}$"
        ],
        correctAnswer: 2
    },

    {
        id: 31,
        type: "single_choice",
        question: "Пусть $A=\\{\\text{делители }60\\}$, $B=\\{\\text{делители }48\\}$. Найдите количество подмножеств множества $A\\cap B$.",
        image: null,
        options: [
            "$16$",
            "$32$",
            "$64$",
            "$128$"
        ],
        correctAnswer: 2
    },

    {
        id: 32,
        type: "single_choice",
        question: "Трёхзначные числа с суммой цифр 7 записаны на карточках. Найдите вероятность выбрать чётное число.",
        image: null,
        options: [
            "$\\frac{1}{2}$",
            "$\\frac{15}{28}$",
            "$\\frac{3}{4}$",
            "$\\frac{4}{7}$"
        ],
        correctAnswer: 3
    },


    // --- 33–35: ЗАДАНИЯ НА СООТВЕТСТВИЕ (MATCHING) ---

    {
        id: "33-35",
        type: "matching",
        question: "Сопоставьте задания (33–35) и варианты ответов (A–F).",
        context: "На рисунке в конус вписан цилиндр наибольшего объема.",
        image: "images/28-feb_1-img/1-33_35.jpg",

        items: [
            {
                id: 33,
                text: "Найдите отношение радиуса основания цилиндра к радиусу основания конуса.",
                correctAnswer: "B"
            },
            {
                id: 34,
                text: "Найдите отношение высоты цилиндра к высоте конуса.",
                correctAnswer: "A"
            },
            {
                id: 35,
                text: "Найдите отношение объема цилиндра к объему конуса.",
                correctAnswer: "E"
            }
        ],

        optionsPool: {
            "A": "$\\frac{1}{3}$",
            "B": "$\\frac{2}{3}$",
            "C": "$1$",
            "D": "$\\frac{3}{4}$",
            "E": "$\\frac{4}{9}$",
            "F": "$\\frac{2}{9}$"
        }
    },


    // --- 36–45: ОТКРЫТЫЕ ВОПРОСЫ (OPEN ENDED) ---

    {
        id: 36,
        type: "open_ended",
        question: "Решите систему уравнений:\n$26x^2+42xy+17y^2=10$\n$10x^2+18xy+8y^2=6$",
        image: null,

        subQuestions: [
            {
                id: "a",
                text: "Если решениями системы уравнений являются пары $(x_1,y_1),\\ldots,(x_n,y_n)$, сколько решений имеет система?",
                correctAnswer: "4"
            },
            {
                id: "b",
                text: "Найдите наибольшее значение суммы $x_n+y_n$.",
                correctAnswer: "2"
            }
        ]
    },

    {
        id: 37,
        type: "open_ended",
        question: "Решите уравнение: $\\sin^3x+\\sin^32x+\\sin^33x=(\\sin x+\\sin2x+\\sin3x)^3$",
        image: null,

        subQuestions: [
            {
                id: "a",
                text: "Найдите наименьший положительный корень уравнения.",
                correctAnswer: "$\\frac{\\pi}{3}$"
            },
            {
                id: "b",
                text: "Сколько корней имеет уравнение на отрезке $[-\\pi;\\pi]$?",
                correctAnswer: "11"
            }
        ]
    },

    {
        id: 38,
        type: "open_ended",
        question: "Функция $f(x)=\\frac{ax+b}{cx+d}$ пересекает ось Ox в точке $(3;0)$. Известно, что $E(y)=(-\\infty;2)\\cup(2;\\infty)$ и $f(x)=f^{-1}(x)$.",
        image: null,

        subQuestions: [
            {
                id: "a",
                text: "Найдите число, не входящее в область определения функции $f(x)$.",
                correctAnswer: "2"
            },
            {
                id: "b",
                text: "Найдите значение $f^{-1}(6)$.",
                correctAnswer: "1.5"
            }
        ]
    },

    {
        id: 39,
        type: "open_ended",
        question: "Даны квадратичная функция $f(x)=\\frac{x^2}{8}-\\frac{3x}{2}$ и уравнение окружности $x^2-18x+y^2-12y+97=0$.",
        image: "images/28-feb_1-img/1-39.jpg",

        subQuestions: [
            {
                id: "a",
                text: "Найдите расстояние $d_1$ между центром окружности и вершиной параболы.",
                correctAnswer: "10.92"
            },
            {
                id: "b",
                text: "Найдите кратчайшее расстояние $d_2$ от параболы до окружности.",
                correctAnswer: "6.45"
            }
        ]
    },

    {
        id: 40,
        type: "open_ended",
        question: "Площадь фигуры, образованной пересечением функций $f(x)=-2x^2+4x$ и $g(x)=x^2+px+q$, равна $\\frac{32}{27}$. Прямая $x=\\frac{4}{3}$ делит фигуру пополам.",
        image: null,

        subQuestions: [
            {
                id: "a",
                text: "Найдите сумму абсцисс точек пересечения функций $f(x)$ и $g(x)$.",
                correctAnswer: "$\\frac{8}{3}$"
            },
            {
                id: "b",
                text: "Найдите значение произведения $p\\cdot q$.",
                correctAnswer: "-10"
            }
        ]
    },

    {
        id: 41,
        type: "open_ended",
        question: "В треугольник ABC вписана окружность. Из вершины A проведена биссектриса AD. Отрезок $EF\\parallel BC$ проходит через центр окружности. Известно: $BC=30$, $EB=8$, $FC=12$.",
        image: "images/28-feb_1-img/1-41.jpg",

        subQuestions: [
            {
                id: "a",
                text: "Найдите длину отрезка $DC$.",
                correctAnswer: "18"
            },
            {
                id: "b",
                text: "Найдите модуль разности сторон $|AB-AC|$.",
                correctAnswer: "4"
            }
        ]
    },

    {
        id: 42,
        type: "open_ended",
        question: "Внутри квадрата ABCD взята точка P. Если $AP=1$, $BP=5$, $PC=7$:",
        image: "images/28-feb_1-img/1-42.jpg",

        subQuestions: [
            {
                id: "a",
                text: "Найдите длину отрезка $PD$.",
                correctAnswer: "5"
            },
            {
                id: "b",
                text: "Найдите площадь квадрата.",
                correctAnswer: "25"
            }
        ]
    },

    {
        id: 43,
        type: "open_ended",
        question: "На рисунке ADFK — параллелограмм, $EG:GC=1:2$, $DE:EF=2:3$.",
        image: "images/28-feb_1-img/1-43.jpg",

        subQuestions: [
            {
                id: "a",
                text: "Найдите отношение $\\frac{EG}{BC}$.",
                correctAnswer: "$\\frac{1}{5}$"
            },
            {
                id: "b",
                text: "Если $S(ABC)=242$, найдите площадь параллелограмма $S(ADFK)$.",
                correctAnswer: "132"
            }
        ]
    },

    {
        id: 44,
        type: "open_ended",
        question: "Дана сфера радиуса 3 с диаметром AB. Точки C и D лежат на сфере, E — середина DC. В сферу вписана пирамида ABCD наибольшего объема.",
        image: null,

        subQuestions: [
            {
                id: "a",
                text: "Найдите объем пирамиды.",
                correctAnswer: "16"
            },
            {
                id: "b",
                text: "Найдите синус угла между прямой AE и плоскостью основания.",
                correctAnswer: "$\\frac{\\sqrt{6}}{3}$"
            }
        ]
    },

    {
        id: 45,
        type: "open_ended",
        question: "Деревянный цилиндр имеет объем $V=162\\pi\\ \\text{см}^3$ и $S_{бок}=72\\pi\\ \\text{см}^2$. Мастер выточил шар максимального объема (примите $\\pi\\approx3$).",
        image: null,

        subQuestions: [
            {
                id: "a",
                text: "Найдите площадь поверхности выточенного шара.",
                correctAnswer: "324"
            },
            {
                id: "b",
                text: "Найдите объем отходов при вытачивании наибольшего шара.",
                correctAnswer: "216"
            }
        ]
    }
];