// Национальный сертификат — 07.03.2026, 2-смена.
// Перевод вопросов на русский. Изображения из исходного PDF намеренно не используются.
var questions = [
    {
        id: 1,
        type: "single_choice",
        question: "Если $m=24^3\cdot6^{12}\cdot20^3$, найдите наибольшее натуральное $n$, при котором дробь $\\frac{m^2}{2^n}$ является натуральным числом.",
        options: ["54", "48", "27", "60"],
        correctAnswer: 0
    },
    {
        id: 2,
        type: "single_choice",
        question: "Если $x\\in[\\frac12;2]$, упростите выражение $||3x-1|-|x||-|x-2|$.",
        options: ["$x$", "$3(x-1)$", "0", "3"],
        correctAnswer: 0
    },
    {
        id: 3,
        type: "single_choice",
        question: "Расстояние между двумя кенгуру равно 30 м (большой кенгуру догоняет маленького). Большой кенгуру за один прыжок преодолевает 2 м, маленький — 1 м. За то время, пока большой кенгуру делает 2 прыжка, маленький делает 3 прыжка. Какое расстояние преодолеет большой кенгуру к моменту, когда догонит маленького?",
        options: ["120", "180", "90", "60"],
        correctAnswer: 0
    },
    {
        id: 4,
        type: "single_choice",
        question: "Три рабочих вместе получили 4 080 000 сум в качестве заработной платы. Отношение зарплаты первого рабочего к зарплате второго равно $7\\frac12:2\\frac14$. Зарплата третьего рабочего составляет $43\\frac13\\%$ от зарплаты первого. Сколько сум получил третий рабочий?",
        options: ["1060800", "1080600", "2440000", "571000"],
        correctAnswer: 0
    },
    {
        id: 5,
        type: "single_choice",
        question: "Найдите наибольшее число среди данных степеней числа 2.",
        options: ["$2^{2^2}$", "$2^{2^{22}}$", "$2^{2222}$", "$2^{22^2}$"],
        correctAnswer: 1
    },
    {
        id: 6,
        type: "single_choice",
        question: "Вычислите $\\sqrt2(\\sqrt5-1)(3+\\sqrt5)\\sqrt{3-\\sqrt5}$.",
        options: ["16", "2", "4", "8"],
        correctAnswer: 3
    },
    {
        id: 7,
        type: "single_choice",
        question: "Упростите $\\sqrt[3]{\\frac{125\\cdot x^{6/5}}{54}}$.",
        options: ["$\\frac{5\\sqrt[3]{4x^{2/5}}}{6}$", "$\\frac{5\\sqrt[3]{4x^{3/5}}}{6}$", "$\\frac{5\\sqrt[3]{2x^{2/5}}}{6}$", "$\\frac{5\\sqrt[3]{2x^{3/5}}}{6}$"],
        correctAnswer: 0
    },
    {
        id: 8,
        type: "single_choice",
        question: "В арифметической прогрессии $a_5=5$, а произведение $a_7\\cdot a_{10}$ имеет наименьшее возможное значение. Найдите разность прогрессии $d$.",
        options: ["$-0,75$", "$-2,25$", "$-1,25$", "$-1,75$"],
        correctAnswer: 3
    },
    {
        id: 9,
        type: "single_choice",
        question: "Даны арифметическая прогрессия $\\{a_n\\}$ и геометрическая прогрессия $\\{b_n\\}$. Если $b_1+b_2+b_3=16$, $b_1=a_2$, $b_2=a_4$, $b_3=a_6$ и $a_1+a_2+a_3+\\dots+a_n=176$, найдите $n$.",
        options: ["11", "32", "33", "36"],
        correctAnswer: 0
    },
    {
        id: 10,
        type: "single_choice",
        question: "Упростите выражение $\\frac{a^3-b^3}{(2a+b)^2-3a(a+b)}+\\frac{(a^2+b)(b^2+a)-ab(ab+1)}{a^2-ab+b^2}$.",
        options: ["$2b$", "$2a-2b$", "$2a+2b$", "$2a$"],
        correctAnswer: 3
    },
    {
        id: 11,
        type: "single_choice",
        question: "Если $a^3+a-1=0$, найдите $\\frac{a^4+a^3+a^2+9}{a^5-a^2-a+6}$.",
        options: ["2", "$\\frac23$", "1", "$\\frac53$"],
        correctAnswer: 0
    },
    {
        id: 12,
        type: "single_choice",
        question: "Вычислите $\\frac{3\\sin10^\\circ-\\sqrt3\\cos10^\\circ}{3\\cos70^\\circ}$.",
        options: ["$\\frac{2}{\\sqrt3}$", "$-\\frac{2}{\\sqrt3}$", "$\\frac{\\sqrt2}{3}$", "$-\\frac{\\sqrt2}{3}$"],
        correctAnswer: 1
    },
    {
        id: 13,
        type: "single_choice",
        question: "$\\alpha$, $\\beta$ и $\\gamma$ — внутренние углы треугольника. Если $\\sin\\alpha\\sin\\beta\\sin\\gamma=\\frac12$, найдите $\\sin2\\alpha+\\sin2\\beta+\\sin2\\gamma$.",
        options: ["2", "$\\frac{\\sqrt3}{2}$", "0", "1"],
        correctAnswer: 0
    },
    {
        id: 14,
        type: "single_choice",
        question: "Сколько действительных корней имеет уравнение $\\frac{7^x-11^x}{\\sqrt{77^x-121^x}}=1$?",
        options: ["2", "1", "Ни при каком значении", "Бесконечно много"],
        correctAnswer: 1
    },
    {
        id: 15,
        type: "single_choice",
        question: "Сколько целых чисел удовлетворяет неравенству $\\log_{1/2}(2x-5\\frac12)\\ge\\log_{4-x}1$?",
        options: ["1", "2", "Бесконечно много", "Целых решений нет"],
        correctAnswer: 3
    },
    {
        id: 16,
        type: "single_choice",
        question: "Сколько целых значений параметра $a$ существует, при которых уравнение $x^2-3x+a^2=0$ имеет действительные корни?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 2
    },
    {
        id: 17,
        type: "single_choice",
        question: "Найдите сумму действительных корней уравнения $\\sqrt[3]{(x+3)^2}-6\\sqrt[3]{(x-3)^2}=\\sqrt[3]{9-x^2}$. Если корень один, найдите этот корень.",
        options: ["$2\\frac{11}{14}$", "9", "$6\\frac{9}{14}$", "0"],
        correctAnswer: 2
    },
    {
        id: 18,
        type: "single_choice",
        question: "Найдите сумму всех целых решений неравенства $\\frac{x^2+3x+46}{x^2-7x+10}\\le\\frac{8}{5-x}$.",
        options: ["-12", "7", "5", "-4"],
        correctAnswer: 3
    },
    {
        id: 19,
        type: "single_choice",
        question: "Решите неравенство $\\sqrt{x-11}+\\sqrt{12-x}>0$.",
        options: ["$(11;12)$", "[11;12]", "{11;12}", "$(-\\infty;\\infty)$"],
        correctAnswer: 0
    },
    {
        id: 20,
        type: "single_choice",
        question: "Найдите сумму всех целых чисел, принадлежащих области определения функции $f(x)=\\frac{\\sqrt{x+3}-\\sqrt{6-x}}{x^2-10x+25}$.",
        options: ["10", "13", "7", "15"],
        correctAnswer: 0
    },
    {
        id: 21,
        type: "single_choice",
        question: "Найдите неопределённый интеграл $\\int\\frac{dx}{x^3+1}$.",
        options: ["$\\frac13\\ln|x+1|-\\frac12\\ln(x^2-x+1)+\\sqrt3\\arctg\\left(\\frac{x-1}{2\\sqrt3}\\right)+C$", "$\\frac13\\ln|x+1|-\\ln(x^2-x+1)-\\sqrt3\\arctg\\left(\\frac{x-1}{\\sqrt3}\\right)+C$", "$\\frac13\\ln|x+1|-\\frac16\\ln(x^2-x+1)+\\frac1{\\sqrt3}\\arctg\\left(\\frac{2x-1}{\\sqrt3}\\right)+C$", "$\\frac13\\ln|x+1|+\\frac12\\ln(x^2-x+1)+\\sqrt3\\arctg\\left(\\frac{2x-1}{\\sqrt3}\\right)+C$"],
        correctAnswer: 2
    },
    {
        id: 22,
        type: "single_choice",
        question: "Если $f(x)=\\frac{x+x^2+x^3+\\dots+x^{2024}}{x+x^2+x^3+\\dots+x^{1012}}$, найдите $f'(1)$.",
        options: ["1", "-1", "-1012", "1012"],
        correctAnswer: 3
    },
    {
        id: 23,
        type: "single_choice",
        question: "В четверть круга радиуса $1+\\sqrt2$ вписана окружность с центром $O_1$. Найдите радиус окружности с центром $O_1$.",
        image: "images/7-mart_2-img/23.jpeg",
        options: ["$\\sqrt2$", "1", "$\\sqrt3$", "$\\frac{\\sqrt2}{2}$"],
        correctAnswer: 1
    },
    {
        id: 24,
        type: "single_choice",
        question: "Графики функций $f(x)=x^2-ax+3$ и $g(x)=2x-1$ пересекаются в одной точке. Найдите сумму всех возможных значений $a$ (если значение одно, найдите его).",
        options: ["2", "-4", "4", "6"],
        correctAnswer: 1
    },
    {
        id: 25,
        type: "single_choice",
        question: "Два внутренних угла треугольника равны $64^\circ$ и $76^\circ$. Найдите наименьший угол, образованный пересечением биссектрис треугольника.",
        options: ["$52^\circ$", "$58^\circ$", "$70^\circ$", "$40^\circ$"],
        correctAnswer: 1
    },
    {
        id: 26,
        type: "single_choice",
        question: "В треугольнике $ABC$ даны $AB=8$, $BC=13$, $AC=15$. $L$ — точка пересечения биссектрис, $M$ — точка пересечения медиан. Найдите длину отрезка $LM$.",
        image: "images/7-mart_2-img/23.jpeg",
        options: ["$\\frac{2\\sqrt5}{3}$", "$\\frac{\\sqrt{19}}{3}$", "$\\frac{\\sqrt{17}}{3}$", "$\\frac{\\sqrt7}{3}$"],
        correctAnswer: 0
    },
    {
        id: 27,
        type: "single_choice",
        question: "По данным на рисунке найдите площадь квадрата. Ломаная внутри квадрата имеет последовательные отрезки длиной $5,2,4,2,3$, причём соседние отрезки перпендикулярны.",
        image: "images/7-mart_2-img/27.jpeg",
        options: ["100", "80", "81", "40"],
        correctAnswer: 1
    },
    {
        id: 28,
        type: "single_choice",
        question: "В окружность вписан правильный шестиугольник, а вокруг него описан другой правильный шестиугольник. Найдите отношение площади внешнего правильного шестиугольника к площади внутреннего.",
        options: ["$\\frac32$", "$\\frac43$", "$\\frac54$", "$\\frac65$"],
        correctAnswer: 1
    },
    {
        id: 29,
        type: "single_choice",
        question: "Начало вектора $\\vec{AB}$ — точка $A(6;4;-2)$, конец $B$ лежит в плоскости $Oxy$, а вектор $\\vec{CD}=(4;-3;1)$ коллинеарен вектору $\\vec{AB}$. Найдите сумму координат вектора $\\vec{AB}$.",
        options: ["4", "-12", "-4", "12"],
        correctAnswer: 1
    },
    {
        id: 30,
        type: "single_choice",
        question: "Диагональ осевого сечения цилиндра в 4 раза больше его радиуса. Если площадь боковой поверхности цилиндра равна $12\\sqrt3\\pi$, найдите объём цилиндра.",
        options: ["$12\\pi$", "$24\\pi$", "$18\\pi$", "$54\\pi$"],
        correctAnswer: 2
    },
    {
        id: 31,
        type: "single_choice",
        image: "images/7-mart_2-img/31.jpeg",
        question: "Определите, какому множеству соответствует заштрихованная область на диаграмме Венна.",
        options: ["$(A\\cap C)\\setminus B$", "$B\\setminus(A\\cap C)$", "$B\\setminus(A\\cup C)$", "$(A\\cup C)\\setminus B$"],
        correctAnswer: 0
    },
    {
        id: 32,
        type: "single_choice",
        question: "Сколько существует трёхзначных чисел, сумма цифр которых равна 9?",
        options: ["36", "45", "44", "48"],
        correctAnswer: 1
    },
    {
        id: 33,
        type: "matching",
        question: "",
        context: "Задания 33–35 и варианты ответов A–F сопоставьте между собой. В основание конуса вписан квадрат со стороной 4 см. Две вершины одной стороны квадрата соединены с вершиной конуса, образуя треугольное сечение. Угол между двумя боковыми рёбрами этого сечения равен 60°.",
        image: "images/7-mart_2-img/33-35.jpeg",
        optionsPool: {
            A: "$16\\sqrt2$",
            B: "$8\\sqrt2$",
            C: "$2\\sqrt2$",
            D: "$4\\sqrt2$",
            E: "$4\\sqrt3$",
            F: "$2\\sqrt3$"
        },
        items: [
            {
                id: 33,
                text: "Найдите высоту конуса (см).",
                correctAnswer: "C"
            }
        ]
    },
    {
        id: 34,
        type: "matching",
        question: "",
        optionsPool: {
            A: "$16\\sqrt2$",
            B: "$8\\sqrt2$",
            C: "$2\\sqrt2$",
            D: "$4\\sqrt2$",
            E: "$4\\sqrt3$",
            F: "$2\\sqrt3$"
        },
        items: [
            {
                id: 34,
                text: "Найдите площадь сечения $ABS$ (см²).",
                correctAnswer: "E"
            }
        ]
    },
    {
        id: 35,
        type: "matching",
        question: "",
        optionsPool: {
            A: "$16\\sqrt2$",
            B: "$8\\sqrt2$",
            C: "$2\\sqrt2$",
            D: "$4\\sqrt2$",
            E: "$4\\sqrt3$",
            F: "$2\\sqrt3$"
        },
        items: [
            {
                id: 35,
                text: "Найдите объём конуса (см³), используя $\\pi\\approx3$.",
                correctAnswer: "A"
            }
        ]
    },
    {
        id: 36,
        type: "open_ended",
        question: "Решите систему уравнений $\\begin{cases}x^4+y^4=17(x-y),\\\\xy=2(x-y).\\end{cases}$",
        subQuestions: [
            {
                id: "a",
                text: "Если решения системы — $(x_1;y_1),(x_2;y_2),\\dots,(x_n;y_n)$, сколько решений имеет система?",
                correctAnswer: "3"
            },
            {
                id: "b",
                text: "Если решения системы — $(x_1;y_1),(x_2;y_2),\\dots,(x_n;y_n)$, найдите наименьшее значение $x_n+y_n$.",
                correctAnswer: "-3"
            }
        ]
    },
    {
        id: 37,
        type: "open_ended",
        question: "Решите уравнение $\\cos3x\\cdot\\sin^3x+\\sin3x\\cdot\\cos^3x=\\frac34$.",
        subQuestions: [
            {
                id: "a",
                text: "Найдите наименьший положительный корень уравнения.",
                correctAnswer: "\\frac{\\pi}{8}"
            },
            {
                id: "b",
                text: "Сколько корней имеет уравнение на отрезке $[-2\\pi;2\\pi]$?",
                correctAnswer: "8"
            }
        ]
    },
    {
        id: 38,
        type: "open_ended",
        question: "Дана функция $f(x)=\\cos(\\sqrt2\\,x)+\\cos\\frac{x}{\\sqrt2}$.",
        subQuestions: [
            {
                id: "a",
                text: "Найдите наименьший положительный период функции.",
                correctAnswer: "2\\sqrt2\\pi"
            },
            {
                id: "b",
                text: "Найдите наименьшее значение функции.",
                correctAnswer: "-\\frac98"
            }
        ]
    },
    {
        id: 39,
        type: "open_ended",
        question: "На отрезке $(-1;13)$ задан график производной $y=f'(x)$. По графику: $f'(x)=0$ при $x=5,9,11$; знак производной меняется с «−» на «+» в точках $5$ и $11$, а с «+» на «−» в точке $9$.",
        image: "images/7-mart_2-img/39.jpeg",
        subQuestions: [
            {
                id: "a",
                text: "Сколько экстремумов имеет функция $y=f(x)$ на указанном промежутке?",
                correctAnswer: "3"
            },
            {
                id: "b",
                text: "В какой точке функция $y=f(x)$ достигает наибольшего значения на отрезке $[5;11]$?",
                correctAnswer: "9"
            }
        ]
    },
    {
        id: 40,
        type: "open_ended",
        image: "images/7-mart_2-img/40.jpeg",
        question: "Дана функция $f(x)=x^2-4x+5$. Также даны $g(x)=x+1$ и $h(x)=x+5$.",
        subQuestions: [
            {
                id: "a",
                text: "Найдите площадь области $S_1$, ограниченной графиками $f(x)$ и $g(x)$.",
                correctAnswer: "\\frac92"
            },
            {
                id: "b",
                text: "Найдите площадь области $S_2$, ограниченной графиками $f(x)$, $h(x)$ и $g(x)$.",
                correctAnswer: "\\frac{49}{3}"
            }
        ]
    },
    {
        id: 41,
        type: "open_ended",
        question: "В треугольнике $ABC$ внутри взята точка $P$. Дано $BP=\\sqrt3$, $PC=1$. Отрезок $AP$ — биссектриса угла $BAC$. Если $\\angle BAC=30^\\circ$ и $\\angle BPC=120^\\circ$.",
        image: "images/7-mart_2-img/41.jpeg",
        subQuestions: [
            {
                id: "a",
                text: "Найдите $\\sin\\beta$, где $\\beta$ — угол, отмеченный на рисунке.",
                correctAnswer: "\\frac{\\sqrt2}{2}"
            },
            {
                id: "b",
                text: "Найдите длину стороны $AC$.",
                correctAnswer: "2+\\sqrt3"
            }
        ]
    },
    {
        id: 42,
        type: "open_ended",
        image: "images/7-mart_2-img/42.jpeg",
        question: "Внутри прямоугольника $ABCD$ взята точка $E$. Дано $AE=1$, $ED=4$, $EB=\\sqrt2$ и $BC=3AB$.",
        subQuestions: [
            {
                id: "a",
                text: "Найдите $\\cos\\angle EAD$.",
                correctAnswer: "\\frac{7\\sqrt{65}}{65}"
            },
            {
                id: "b",
                text: "Найдите площадь прямоугольника $ABCD$.",
                correctAnswer: "\\frac{39}{5}"
            }
        ]
    },
    {
        id: 43,
        type: "open_ended",
        question: "Сторона правильного восьмиугольника равна $\\sqrt6-\\sqrt2$. Вокруг правильного восьмиугольника описана окружность.",
        subQuestions: [
            {
                id: "a",
                text: "Найдите радиус окружности.",
                correctAnswer: "\\frac{65}{2}"
            },
            {
                id: "b",
                text: "Найдите площадь правильного восьмиугольника.",
                correctAnswer: "12"
            }
        ]
    },
    {
        id: 44,
        type: "open_ended",
        question: "Дана пирамида, основанием которой является ромб. Меньший угол ромба равен $30^\\circ$, а радиус окружности, вписанной в основание, равен $\\sqrt3$. Боковые грани пирамиды образуют с плоскостью основания угол $60^\\circ$.",
        subQuestions: [
            {
                id: "a",
                text: "Найдите полную площадь поверхности пирамиды.",
                correctAnswer: "24"
            },
            {
                id: "b",
                text: "Найдите объём пирамиды.",
                correctAnswer: "72"
            }
        ]
    },
    {
        id: 45,
        type: "open_ended",
        question: "Пять рабочих выполняют одну работу. Первый, второй и третий рабочие вместе выполняют работу за 7,5 часа; первый, третий и пятый — за 5 часов; первый, третий и четвёртый — за 6 часов; второй, четвёртый и пятый — за 4 часа.",
        subQuestions: [
            {
                id: "a",
                text: "За сколько часов второй рабочий выполнит всю работу один?",
                correctAnswer: "20"
            },
            {
                id: "b",
                text: "За сколько часов пятеро рабочих выполнят работу вместе?",
                correctAnswer: "3"
            }
        ]
    }
];
