var questions = [
    // --- 1–32: ТЕСТОВЫЕ ВОПРОСЫ (SINGLE CHOICE) ---
     {
        id: 1,
        type: "single_choice",
        question: "Найдите остаток от деления суммы $\\underbrace{77...79}_{2025 \\ шт} + \\underbrace{77...78}_{2025 \\ шт} + \\underbrace{77...77}_{2025 \\ шт} + \\dots + \\underbrace{77...72}_{2025 \\ шт} + \\underbrace{77...71}_{2025 \\ шт}$ на 7.",
        image: null,
        options: [
            "1",
            "6",
            "0",
            "3"
        ],
        correctAnswer: 2
    },
    {
        id: 2,
        type: "single_choice",
        question: "Вычислите: $\\left\\{3 \\cdot [\\lg 5] + 5 \\cdot \\{\\lg 0,1\\} - 7[\\ln 3]\\right\\}$",
        image: null,
        options: [
            "0",
            "7",
            "$\\frac{21}{48}$",
            "$\\frac{9}{28}$"
        ],
        correctAnswer: 0
    },
    {
        id: 3,
        type: "single_choice",
        question: "Какую наибольшую площадь земли в квадратных метрах можно огородить веревкой длиной 40 метров?",
        image: null,
        options: [
            "100",
            "$\\frac{400}{3\\sqrt{3}}$",
            "$\\frac{400}{\\pi}$",
            "96"
        ],
        correctAnswer: 2
    },
    {
        id: 4,
        type: "single_choice",
        question: "Имеется 30 литров 5%-го соленого раствора. Сколько литров чистой воды нужно добавить, чтобы содержание соли стало равным 2%?",
        image: null,
        options: [
            "60",
            "30",
            "45",
            "40"
        ],
        correctAnswer: 0
    },
    {
        id: 5,
        type: "single_choice",
        question: "Вычислите: $\\left(3 \\cdot 24^{\\frac{1}{3}} + 2^{\\frac{1}{3}} \\cdot 54^{\\frac{1}{6}}\\right)^2$",
        image: null,
        options: [
            "$2\\sqrt{6}$",
            "24",
            "12",
            "$4\\sqrt{6}$"
        ],
        correctAnswer: 2
    },
    {
        id: 6,
        type: "single_choice",
        question: "Вычислите: $\\sqrt[6]{5^7 \\cdot \\sqrt[7]{5^5 \\cdot \\sqrt[7]{5^{-2}}}}$",
        image: null,
        options: [
            "25",
            "125",
            "5",
            "1"
        ],
        correctAnswer: 2
    },
    {
        id: 7,
        type: "single_choice",
        question: "Вычислите: $\\frac{5}{\\sqrt[3]{32} + 2} + \\frac{5}{\\sqrt[3]{128} - \\sqrt[3]{32} + 2} - \\sqrt[3]{2}$",
        image: null,
        options: [
            "-1",
            "1",
            "0",
            "$-\\sqrt[3]{2}$"
        ],
        correctAnswer: 2
    },
    {
        id: 8,
        type: "single_choice",
        question: "В арифметической прогрессии $a_2 = 2a_1$ и $a_{10} = 20$. Найдите $S_6 - S_5$.",
        image: null,
        options: [
            "12",
            "10",
            "14",
            "18"
        ],
        correctAnswer: 1
    },
    {
        id: 9,
        type: "single_choice",
        question: "Даны арифметическая прогрессия $\\{a_n\\}$ и геометрическая прогрессия $\\{b_n\\}$. Если $a_1 + a_2 + a_3 + ... + a_n = 820$, $b_1 + b_2 + b_3 = 217$, $b_1 = a_2$, $b_2 = a_9$ и $b_3 = a_{44}$ ($d \\neq 0$), найдите $n$.",
        image: null,
        options: [
            "18",
            "20",
            "22",
            "24"
        ],
        correctAnswer: 1
    },
    {
        id: 10,
        type: "single_choice",
        question: "Упростите выражение: $\\left(1 - \\frac{x^2 + y^2 - 4}{2xy}\\right) : \\left(\\frac{1}{2} + \\frac{1}{x-y}\\right) : \\left(\\frac{1}{2} - \\frac{1}{x-y}\\right) : \\frac{2 - x + y}{2xy}$",
        image: null,
        options: [
            "$x - y - 2$",
            "$x + y - 2$",
            "$x + y + 2$",
            "$x - y + 2$"
        ],
        correctAnswer: 2
    },
    {
        id: 11,
        type: "single_choice",
        question: "Если $(a + b + 2025)^2 = 4(a + 1012)(b + 1013)$, найдите $a - b$.",
        image: null,
        options: [
            "1",
            "-1",
            "-2025",
            "2025"
        ],
        correctAnswer: 0
    },
    {
        id: 12,
        type: "single_choice",
        question: "Решите неравенство: $\\sqrt{2}\\cos 2x - 6\\sin x - 3\\sqrt{2} \\le 0$",
        image: null,
        options: [
            "$\\left[-\\frac{\\pi}{4} + \\pi k; \\frac{5\\pi}{4} + \\pi k\\right]$",
            "$\\left[\\frac{\\pi}{4} + 2\\pi k; \\frac{3\\pi}{4} + 2\\pi k\\right]$",
            "$\\left[-\\frac{\\pi}{4} + 2\\pi k; \\frac{5\\pi}{4} + 2\\pi k\\right]$",
            "$\\left[\\frac{\\pi}{4} + \\pi k; \\frac{3\\pi}{4} + \\pi k\\right]$"
        ],
        correctAnswer: 2
    },
    {
        id: 13,
        type: "single_choice",
        question: "Вычислите: $\\frac{\\sin 40^\\circ - \\cos 40^\\circ}{\\sqrt{2}\\cos 85^\\circ}$",
        image: null,
        options: [
            "-1",
            "1",
            "0",
            "$\\sqrt{2}$"
        ],
        correctAnswer: 0
    },
    {
        id: 14,
        type: "single_choice",
        question: "Найдите произведение действительных корней уравнения: $2025^{x^2-4} = 2026^{x^2-4}$",
        image: null,
        options: [
            "-2",
            "2",
            "-4",
            "0"
        ],
        correctAnswer: 1
    },
    {
        id: 15,
        type: "single_choice",
        question: "Найдите сумму действительных корней системы уравнений: $\\begin{cases} \\log_3(3 \\cdot 5^x + 2 \\cdot 3^y) = 4 \\\\ 4 \\cdot 3^y - 5^{x+1} = -113 \\end{cases}$",
        image: null,
        options: [
            "2",
            "1",
            "4",
            "3"
        ],
        correctAnswer: 0
    },
    {
        id: 16,
        type: "single_choice",
        question: "Найдите сумму действительных корней уравнения: $2x^2 - 10x + 2\\sqrt{x^2 - 5x + 4} = 4$",
        image: null,
        options: [
            "3",
            "4",
            "5",
            "1"
        ],
        correctAnswer: 1
    },
    {
        id: 17,
        type: "single_choice",
        question: "Найдите сумму действительных корней уравнения: $\\sqrt{x-2} - \\sqrt{6-x} = 2$",
        image: null,
        options: [
            "6",
            "2",
            "8",
            "12"
        ],
        correctAnswer: 1
    },
    {
        id: 18,
        type: "single_choice",
        question: "Сколько целых решений имеет неравенство? $\\frac{2x^2 - 14x + 6}{x^2 - 4x + 3} - \\frac{3x - 8}{x - 3} \\ge 0$",
        image: null,
        options: [
            "Бесконечно много",
            "1",
            "3",
            "5"
        ],
        correctAnswer: 3
    },
    {
        id: 19,
        type: "single_choice",
        question: "Сколько целых чисел являются решениями неравенства? $\\frac{(x-1)^2\\sqrt{x+6}}{x^2 - 12x + 35} \\le 0$",
        image: null,
        options: [
            "3",
            "2",
            "5",
            "4"
        ],
        correctAnswer: 3
    },
    {
        id: 20,
        type: "single_choice",
        question: "Дана функция $y = a \\cdot 3^x + b$. Если графику функции принадлежат точки $A\\left(-2; 5\\frac{7}{9}\\right)$ и $B(2; -12)$, найдите область определения функции, обратной к данной.",
        image: "images/1-mart_1-img/3-20.jpg",
        options: [
            "$(-\\infty; 6)$",
            "$(-\\infty; \\infty)$",
            "$\\left(-\\infty; 5\\frac{2}{9}\\right)$",
            "$(-\\infty; 2)$"
        ],
        correctAnswer: 0
    },
    {
        id: 21,
        type: "single_choice",
        question: "Вычислите неопределенный интеграл: $\\int \\frac{dx}{x^4 + 1}$",
        image: null,
        options: [
            "$\\frac{1}{2\\sqrt{2}}\\operatorname{arctg}\\left(\\frac{\\sqrt{2}x}{1-x^2}\\right) + \\frac{1}{4\\sqrt{2}}\\ln\\left|\\frac{x+\\frac{1}{x}+\\sqrt{2}}{x+\\frac{1}{x}-\\sqrt{2}}\\right| + C$",
            "$\\frac{1}{\\sqrt{2}}\\operatorname{arctg}\\left(\\frac{\\sqrt{2}x}{1-x^2}\\right) + \\frac{1}{\\sqrt{2}}\\ln\\left|\\frac{x+\\frac{1}{x}+\\sqrt{2}}{x+\\frac{1}{x}-\\sqrt{2}}\\right| + C$",
            "$\\frac{1}{\\sqrt{2}}\\operatorname{arctg}\\left(\\frac{\\sqrt{2}x}{1-x^2}\\right) + \\frac{1}{4\\sqrt{2}}\\ln\\left|\\frac{x+\\frac{1}{x}+\\sqrt{2}}{x+\\frac{1}{x}-\\sqrt{2}}\\right| + C$",
            "$\\frac{1}{2\\sqrt{2}}\\operatorname{arctg}\\left(\\frac{\\sqrt{2}x}{1-x^2}\\right) + \\frac{1}{2\\sqrt{2}}\\ln\\left|\\frac{x+\\frac{1}{x}+\\sqrt{2}}{x+\\frac{1}{x}-\\sqrt{2}}\\right| + C$"
        ],
        correctAnswer: 0
    },
    {
        id: 22,
        type: "single_choice",
        question: "Найдите наименьшее значение функции $f(x) = (x - 8) \\cdot e^{x-7}$ на отрезке $[5; 9]$.",
        image: null,
        options: [
            "-1",
            "$e^2$",
            "$-\\frac{3}{e^2}$",
            "0"
        ],
        correctAnswer: 2
    },
    {
        id: 23,
        type: "single_choice",
        question: "Найдите площадь закрашенной фигуры, если сторона правильного треугольника $ABC$ равна 12.",
        image: "images/1-mart_1-img/3-23.jpg",
        options: [
            "$\\frac{9\\pi + 5\\sqrt{3}}{2}$",
            "$\\frac{12\\pi + 27\\sqrt{3}}{2}$",
            "$\\frac{9\\pi + 9\\sqrt{3}}{2}$",
            "$\\frac{18\\pi + 27\\sqrt{3}}{2}$"
        ],
        correctAnswer: 3
    },
    {
        id: 24,
        type: "single_choice",
        question: "Пусть $y = f(x)$ — четная функция, а $y = g(x)$ — нечетная функция. Сколько из следующих функций являются нечетными? I. $y = f(x) \\cdot g(x)$ II. $y = \\frac{f(x)}{g(x)}$ III. $y = f(x) + g(x)$",
        image: null,
        options: [
            "1",
            "2",
            "3",
            "0"
        ],
        correctAnswer: 0
    },
    {
        id: 25,
        type: "single_choice",
        question: "На рисунке изображен треугольник $ABC$. Если площадь треугольника $ABC$ равна 108, найдите площадь закрашенной фигуры.",
        image: "images/1-mart_1-img/3-25.jpg",
        options: [
            "42",
            "48",
            "60",
            "18"
        ],
        correctAnswer: 1
    },
    {
        id: 26,
        type: "single_choice",
        question: "На основании $BC$ равнобедренного треугольника $ABC$ проведен отрезок $AD$, к треугольникам $ABD$ и $ADC$ вписаны окружности. Если $BD = 14, DC = 6$, найдите длину отрезка $MN$.",
        image: "images/1-mart_1-img/3-26.jpg",
        options: [
            "2",
            "4",
            "5",
            "8"
        ],
        correctAnswer: 1
    },
    {
        id: 27,
        type: "single_choice",
        question: "Основания трапеции $BC$ и $AD$ равны соответственно 16 и 44, а боковые стороны $AB$ и $CD$ равны 17 и 25. Найдите площадь трапеции $ABCD$.",
        image: null,
        options: [
            "380",
            "450",
            "420",
            "480"
        ],
        correctAnswer: 2
    },
    {
        id: 28,
        type: "single_choice",
        question: "Если количество диагоналей правильного многоугольника равно 35, найдите угол между наибольшей и наименьшей диагоналями, выходящими из одной вершины.",
        image: null,
        options: [
            "$54^\\circ$",
            "$72^\\circ$",
            "$45^\\circ$",
            "$60^\\circ$"
        ],
        correctAnswer: 1
    },
    {
        id: 29,
        type: "single_choice",
        question: "Диагонали параллелограмма $ABCD$ пересекаются в точке $O$. На стороне $BC$ взята точка $E$ так, что $\\frac{BE}{EC} = 3$. Если $\\overrightarrow{OE} = a \\cdot \\overrightarrow{AB} + b \\cdot \\overrightarrow{BC}$, найдите $a + b$.",
        image: "images/1-mart_1-img/3-29.jpg",
        options: [
            "$\\frac{1}{2}$",
            "$\\frac{2}{3}$",
            "$\\frac{1}{4}$",
            "$\\frac{3}{4}$"
        ],
        correctAnswer: 3
    },
    {
        id: 30,
        type: "single_choice",
        question: "Полная поверхность усеченного конуса в два раза больше его боковой поверхности. Если радиусы оснований усеченного конуса равны 4 и 12, найдите его объем.",
        image: null,
        options: [
            "$128\\pi$",
            "$208\\pi$",
            "$416\\pi$",
            "$316\\pi$"
        ],
        correctAnswer: 2
    },
    {
        id: 31,
        type: "single_choice",
        question: "В классе 25 учащихся. 9 учащихся не посещали химический кружок, 8 учащихся — биологический кружок. 10 учащихся не посещают ни один кружок. Сколько учащихся посещают оба кружка?",
        image: null,
        options: [
            "2",
            "3",
            "5",
            "8"
        ],
        correctAnswer: 0
    },
    {
        id: 32,
        type: "single_choice",
        question: "Каждая буква слова “MATEMATIKA” записана на отдельной карточке. Какова вероятность того, что при случайном выборе одной карточки на ней окажется буква M?",
        image: null,
        options: [
            "$\\frac{1}{10}$",
            "$\\frac{3}{10}$",
            "$\\frac{1}{5}$",
            "$\\frac{2}{5}$"
        ],
        correctAnswer: 2
    },

    // --- 33–35: ЗАДАНИЯ НА СООТВЕТСТВИЕ (MATCHING) ---
    {
        id: "33-35",
        type: "matching",
        question: "Дана правильная треугольная пирамида $ABCD$ с длиной стороны основания 2. Точки $E$ и $D$ — середины сторон $AB$ и $BC$. Сечение $SED$ образует с плоскостью основания угол $45^\\circ$. Сопоставьте задания (33–35) с вариантами ответов (A–F).",
        context: "Элементы пирамиды",
        image: "images/1-mart_1-img/3-33_35.jpg",
        items: [
            {
                id: 33,
                text: "Найдите длину $SD$.",
                correctAnswer: "F"
            },
            {
                id: 34,
                text: "Найдите площадь сечения $DES$.",
                correctAnswer: "C"
            },
            {
                id: 35,
                text: "Найдите объем пирамиды $DEACS$.",
                correctAnswer: "A"
            }
        ],
        optionsPool: {
            "A": "$\\frac{1}{6}$",
            "B": "$\\frac{\\sqrt{70}}{8}$",
            "C": "$\\frac{1}{8}$",
            "D": "$\\frac{\\sqrt{15}}{6}$",
            "E": "$\\frac{1}{\\sqrt{6}}$",
            "F": "$\\frac{\\sqrt{6}}{12}$"
        }
    },

    // --- 36–45: ОТКРЫТЫЕ ВОПРОСЫ (OPEN ENDED) ---
    {
        id: 36,
        type: "open_ended",
        question: "Решите уравнение: $x^4 - 2\\sqrt{3}x^2 - x + 3 - \\sqrt{3} = 0$",
        image: null,
        subQuestions: [
            {
                id: "a",
                text: "Сколько положительных корней имеет уравнение?",
                correctAnswer: "2"
            },
            {
                id: "b",
                text: "Сколько всего действительных корней имеет уравнение?",
                correctAnswer: "4"
            }
        ]
    },
    {
        id: 37,
        type: "open_ended",
        question: "Решите уравнение: $\\frac{\\operatorname{tg}2x \\cdot \\operatorname{tg}x}{\\operatorname{tg}2x - \\operatorname{tg}x} = 2\\sin\\left(\\frac{\\pi}{4} + x\\right) \\cdot \\sin\\left(\\frac{\\pi}{4} - x\\right)$",
        image: null,
        subQuestions: [
            {
                id: "a",
                text: "Найдите наибольший отрицательный корень уравнения.",
                correctAnswer: "-3П/8"
            },
            {
                id: "b",
                text: "Найдите количество корней уравнения на отрезке $[0; \\pi]$.",
                correctAnswer: "2"
            }
        ]
    },
    {
        id: 38,
        type: "open_ended",
        question: "Дана функция $f(x) = x^3 + ax^2 + bx + c$. Если выполняется равенство $(x+1) \\cdot f(x-1) + (x-1) \\cdot f(x+1) = 2x \\cdot f(x)$:",
        image: null,
        subQuestions: [
            {
                id: "a",
                text: "Найдите значение $f(1) - f(-1)$.",
                correctAnswer: "0"
            },
            {
                id: "b",
                text: "Найдите значение $f(2) - f(-2)$.",
                correctAnswer: "12"
            }
        ]
    },
    {
        id: 39,
        type: "open_ended",
        question: "На рисунке изображен график производной функции $y = f'(x)$ на интервале $(-7; 9)$.",
        image: "images/1-mart_1-img/3-39.jpg",
        subQuestions: [
            {
                id: "a",
                text: "Найдите количество точек экстремума функции $y = f(x)$.",
                correctAnswer: "4"
            },
            {
                id: "b",
                text: "Сколько целых чисел удовлетворяют неравенству $\\frac{f'(x)}{f''(x)} < 0$?",
                correctAnswer: "2"
            }
        ]
    },
    {
        id: 40,
        type: "open_ended",
        question: "Фигура ограничена графиком функции $y = x^3$, осями координат, а также прямыми $x = 0$ и $y = -1$. (Примите $\\pi \\approx 3$)",
        image: null,
        subQuestions: [
            {
                id: "a",
                text: "Найдите площадь ограниченной фигуры.",
                correctAnswer: "3/4"
            },
            {
                id: "b",
                text: "Найдите объем тела, образованного вращением фигуры вокруг оси $OY$ на $360^\\circ$.",
                correctAnswer: "9/5"
            }
        ]
    },
    {
        id: 41,
        type: "open_ended",
        question: "В прямоугольном треугольнике $ABC$ длина медианы и биссектрисы, проведенных из вершины прямого угла, равны соответственно 48 и 8.",
        image: null,
        subQuestions: [
            {
                id: "a",
                text: "Найдите площадь треугольника $ABC$.",
                correctAnswer: "288"
            },
            {
                id: "b",
                text: "Найдите площадь образованного треугольника $BML$.",
                correctAnswer: "48√7"
            }
        ]
    },
    {
        id: 42,
        type: "open_ended",
        question: "В прямоугольной трапеции $ABCD$ меньшее основание $BC = 3$, большее основание $AD = 7$, меньшая боковая сторона равна 5. Диагонали трапеции пересекаются в точке $O$.",
        image: null,
        subQuestions: [
            {
                id: "a",
                text: "Найдите наименьшее расстояние от точки $O$ до меньшей боковой стороны.",
                correctAnswer: "21/10"
            },
            {
                id: "b",
                text: "Найдите площадь треугольника $COD$.",
                correctAnswer: "21/4"
            }
        ]
    },
    {
        id: 43,
        type: "open_ended",
        question: "На стороне $CD$ правильного пятиугольника $ABCDE$ взята точка $F$. Диагональ $BD$ и отрезок $AF$ пересекаются в точке $P$.",
        image: "images/1-mart_1-img/3-43.jpg",
        subQuestions: [
            {
                id: "a",
                text: "Если $|PD| = \\sqrt{5} - 1$, найдите длину отрезка $BP$.",
                correctAnswer: "2"
            },
            {
                id: "b",
                text: "Если $S_1 = 3 - \\sqrt{5}$, найдите значение $S_2$.",
                correctAnswer: "4"
            }
        ]
    },
    {
        id: 44,
        type: "open_ended",
        question: "На рисунке изображены шар радиусом 10 с центром в точке $O$ и конус. Шар и конус касаются в точке $D$, $AC$ — диаметр и $BC = 5$. (Примите $\\pi \\approx 3$)",
        image: "images/1-mart_1-img/3-44.jpg",
        subQuestions: [
            {
                id: "a",
                text: "Найдите радиус основания конуса.",
                correctAnswer: "5/2"
            },
            {
                id: "b",
                text: "Найдите высоту конуса.",
                correctAnswer: "4/3"
            }
        ]
    },
    {
        id: 45,
        type: "open_ended",
        question: "На рисунке изображено здание высотой $h$. Используя данные рисунка (примите $\\sqrt{3} = 1,7$):",
        image: "images/1-mart_1-img/3-45.jpg",
        subQuestions: [
            {
                id: "a",
                text: "Найдите высоту здания.",
                correctAnswer: "300/7"
            },
            {
                id: "b",
                text: "Найдите длину отрезка $AD$.",
                correctAnswer: "600/7"
            }
        ]
    }
];