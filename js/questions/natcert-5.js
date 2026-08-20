var questions = [
    {
        id: 1,
        question: "Если число вида $8962ab$ делится на 12 без остатка, найдите наибольшее значение $a\\cdot b$.",
        type: "single_choice",
        options: ["72", "48", "64", "54"],
        correctAnswer: 1
    },
    {
        id: 2,
        question: "Вычислите: $\\frac{45\\frac{10}{63}-44\\frac{25}{84}}{\\left(2\\frac13-1\\frac19\\right):4-\\frac34}:\\frac{31}{32}$",
        type: "single_choice",
        options: ["2", "-2", "$\\frac12$", "$-\\frac12$"],
        correctAnswer: 1
    },
    {
        id: 3,
        question: "Сумма 10% первого числа и $\\frac16$ второго числа равна разности половины первого и половины второго числа. Найдите отношение первого числа ко второму.",
        type: "single_choice",
        options: ["$\\frac35$", "$\\frac53$", "$\\frac56$", "$\\frac65$"],
        correctAnswer: 1
    },
    {
        id: 4,
        question: "Ученик купил две книги за 205 000 сум. Если цену первой книги уменьшить на 15%, а цену второй увеличить на 20%, то новые цены книг станут равными. На сколько сум цена первой книги дороже цены второй книги?",
        type: "single_choice",
        options: ["30000", "35000", "45000", "40000"],
        correctAnswer: 1
    },
    {
        id: 5,
        question: "Вычислите: $(-1^2)^3+(-1^3)^4+\\ldots+(-1^{99})^{100}$",
        type: "single_choice",
        options: ["0", "98", "50", "-1"],
        correctAnswer: 0
    },
    {
        id: 6,
        question: "Расположите числа в порядке убывания: $a=\\sqrt8+\\sqrt3$, $b=\\sqrt6+2$, $c=2\\sqrt3+\\sqrt2$.",
        type: "single_choice",
        options: ["$a>b>c$", "$b>a>c$", "$b>c>a$", "$c>a>b$"],
        correctAnswer: 3
    },
    {
        id: 7,
        question: "Вычислите: $\\sqrt[3]{26+15\\sqrt3}+\\sqrt[3]{26-15\\sqrt3}$.",
        type: "single_choice",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2
    },
    {
        id: 8,
        question: "Если среднее арифметическое $n$ членов арифметической прогрессии, состоящей из $n$ членов, равно $2n$, найдите десятый член арифметической прогрессии.",
        type: "single_choice",
        options: ["38", "20", "40", "36"],
        correctAnswer: 0
    },
    {
        id: 9,
        question: "В геометрической прогрессии $b_1+b_2+b_3=70$ и $b_1\\cdot b_2\\cdot b_3=8000$. Найдите сумму первых пяти членов.",
        type: "single_choice",
        options: ["310 или 77,5", "310 или 77,25", "330 или 77,25", "330 или 77,5"],
        correctAnswer: 0
    },
    {
        id: 10,
        question: "Упростите выражение: $\\frac{x+2y-\\frac{4x^2-y^2}{x}}{y^3+2xy^2-3x^2y}$.",
        type: "single_choice",
        options: ["$\\frac1y$", "$\\frac{x}{y}$", "$\\frac1x$", "$\\frac1{xy}$"],
        correctAnswer: 3
    },
    {
        id: 11,
        question: "Если $x>0$, упростите выражение: $\\frac{\\sqrt{\\frac12\\left(\\frac{x^2-2}{2x}\\right)^2+1}}{\\frac1{2x}(x^2+2)}$.",
        type: "single_choice",
        options: ["2", "$\\frac1{\\sqrt2}$", "1", "$\\sqrt2$"],
        correctAnswer: 0
    },
    {
        id: 12,
        question: "Если $\\sin\\alpha=-\\frac45$ и $\\frac{3\\pi}{2}<\\alpha<2\\pi$, найдите $\\cos\\alpha$.",
        type: "single_choice",
        options: ["$\\frac35$", "$-\\frac35$", "$\\frac5{13}$", "$-\\frac5{13}$"],
        correctAnswer: 0
    },
    {
        id: 13,
        question: "Сколько решений имеет уравнение на промежутке $\\left[-\\frac\\pi2;\\pi\\right]$? $\\sqrt3\\sin^2x+\\sin^22x=\\frac{\\sqrt3}{2}-\\frac12-\\sqrt3\\cos2x$",
        type: "single_choice",
        options: ["1", "2", "3", "5"],
        correctAnswer: 2
    },
    {
        id: 14,
        question: "Сколько целых чисел удовлетворяют неравенству? $\\left(\\frac12\\right)^{x^2+3x}-\\frac{2^{-x}}8>0$",
        type: "single_choice",
        options: ["2", "3", "4", "бесконечно много"],
        correctAnswer: 1
    },
    {
        id: 15,
        question: "Сколько целых чисел удовлетворяют неравенству? $\\log_{0,5}\\log_2\\log_{x-1}9>0$",
        type: "single_choice",
        options: ["бесконечно много", "7", "3", "5"],
        correctAnswer: 3
    },
    {
        id: 16,
        question: "Сколько действительных корней имеет уравнение? $\\frac4{(x+6)(x-1)}-\\frac5{(x+2)(x+3)}=\\frac14$",
        type: "single_choice",
        options: ["1", "2", "3", "4"],
        correctAnswer: 1
    },
    {
        id: 17,
        question: "Сколько действительных корней имеет уравнение? $(x-6)^4+(x-8)^4=16$",
        type: "single_choice",
        options: ["1", "2", "3", "4"],
        correctAnswer: 1
    },
    {
        id: 18,
        question: "Сколько целых чисел удовлетворяют неравенству? $\\frac{x^2-1}{x^2+1}+x^2-2x+1\\le0$",
        type: "single_choice",
        options: ["0", "1", "2", "3"],
        correctAnswer: 2
    },
    {
        id: 19,
        question: "Сколько натуральных чисел не могут быть решениями неравенства? $x(x-3)^2>0$",
        type: "single_choice",
        options: ["1", "2", "3", "бесконечно много"],
        correctAnswer: 0
    },
    {
        id: 20,
        question: "Если $f(x)=\\ln x+\\ln3$ и $g(x)=2e^x$, вычислите $g(f(3))$.",
        type: "single_choice",
        options: ["8", "9", "18", "36"],
        correctAnswer: 2
    },
    {
        id: 21,
        question: "Вычислите определённый интеграл: $\\int_{-1}^{1}\\frac{x^4}{x^2+1}\\,dx$.",
        type: "single_choice",
        options: ["$\\frac43-\\frac\\pi2$", "$\\frac43$", "0", "$\\frac\\pi2-\\frac43$"],
        correctAnswer: 3
    },
    {
        id: 22,
        question: "К графику функции $y=\\frac1{x^2+4}$ проведена касательная, параллельная оси абсцисс. Найдите сумму координат точки касания.",
        type: "single_choice",
        options: ["1", "$\\frac12$", "$\\frac34$", "$\\frac14$"],
        correctAnswer: 3
    },
    {
        id: 23,
        question: "В окружность вписан квадрат. Если радиус окружности равен $\\sqrt6$, найдите площадь квадрата.",
        image: "images/2-mart_1-img/23.svg",
        type: "single_choice",
        options: ["6", "12", "24", "18"],
        correctAnswer: 1
    },
    {
        id: 24,
        question: "Дана функция $f(x,y,z)=\\frac{x^2+1}{x^2-1}+\\frac{2y^2-1}{2y^2+1}+\\frac{4z^2-1}{4z^2+1}$, где $|a|>1$, $-1<b\\le1$ и $-1\\le c<1$. Найдите значение функции при $x=\\frac{\\sqrt{a^2-1}}{a-1}$, $y=\\sqrt{\\frac{1-b}{2+2b}}$, $z=\\frac{\\sqrt{1-c^2}}{2(c-1)}$.",
        type: "single_choice",
        options: ["$a+b+c$", "-1", "$\\frac{a+b+c}{2}$", "1"],
        correctAnswer: 0
    },
    {
        id: 25,
        question: "Наибольшая сторона треугольника равна 8, а остальные стороны равны $(3x-4)$ и $(2x+1)$. Если стороны треугольника — целые числа, найдите его периметр.",
        image: "images/2-mart_1-img/25.svg",
        type: "single_choice",
        options: ["16", "17", "18", "20"],
        correctAnswer: 3
    },
    {
        id: 26,
        question: "По данным на рисунке найдите угол $\\alpha$.",
        image: "images/2-mart_1-img/26.svg",
        type: "single_choice",
        options: ["18°", "22,5°", "15°", "36°"],
        correctAnswer: 2
    },
    {
        id: 27,
        question: "В равнобедренной трапеции $ABCD$ проведена средняя линия $KL$. Из вершины $C$ опущена высота $CH$ на большее основание $AD$. Высота $CH$ пересекает среднюю линию $KL$ в точке $O$. Если $KL=48$ и $KO:OL=5:1$, найдите большее основание $AD$.",
        image: "images/2-mart_1-img/27.svg",
        type: "single_choice",
        options: ["54", "56", "64", "72"],
        correctAnswer: 2
    },
    {
        id: 28,
        question: "Число диагоналей выпуклого $n$-угольника не меньше 25 и не больше 30. Найдите $n$.",
        type: "single_choice",
        options: ["9", "6", "11", "7"],
        correctAnswer: 0
    },
    {
        id: 29,
        question: "Дан треугольник $ABC$ с вершинами $A(1;-1;-1)$, $B(2;2;1)$ и $C(3;3;3)$. В треугольнике $ABC$ к основанию $AC$ проведена медиана $BD$. Найдите $\\cos\\angle BDC$.",
        type: "single_choice",
        options: ["0", "$\\frac23$", "$\\frac13$", "$\\frac32$"],
        correctAnswer: 1
    },
    {
        id: 30,
        question: "Из точки $A$, расположенной вне плоскости $\\alpha$, к этой плоскости проведены наклонные $AB$ и $AC$, а также перпендикуляр $AH$. Здесь $H$ — основание перпендикуляра, а точки $B$, $C$ и $H$ лежат в плоскости $\\alpha$. Если $AH=4$, $\\angle ABH=45°$, $\\angle ACH=60°$, $\\angle BHC=60°$, найдите объём пирамиды $AHBC$.",
        type: "single_choice",
        options: ["$6\\frac23$", "$5\\frac23$", "$5\\frac13$", "$6\\frac13$"],
        correctAnswer: 2
    },
    {
        id: 31,
        question: "Если количество подмножеств множества $A$, полученного добавлением 1 элемента, на 12 больше количества подмножеств множества $A$, состоящих из 1 элемента, сколько всего подмножеств имеет множество $A$?",
        type: "single_choice",
        options: ["4", "8", "16", "32"],
        correctAnswer: 1
    },
    {
        id: 32,
        question: "Сколько среди натуральных чисел до 1000 существует чисел, которые делятся на 11 без остатка, но не делятся без остатка ни на 2, ни на 3?",
        type: "single_choice",
        options: ["90", "75", "45", "30"],
        correctAnswer: 3
    },
    {
        id: "33-35",
        type: "matching",
        question: "Сопоставьте задания 33–35 с вариантами ответов A–F. В цилиндр с радиусом основания 6 см вписан конус, а в конус вписан шар. Основание и вершина конуса лежат в центрах оснований цилиндра. Если боковая поверхность конуса равна $60\\pi\\,cm^2$,",
        items: [
            { id: "33", text: "Найдите разность полных площадей поверхностей цилиндра и конуса.", correctAnswer: "D" },
            { id: "34", text: "Найдите разность объёмов цилиндра и конуса.", correctAnswer: "E" },
            { id: "35", text: "Найдите объём шара.", correctAnswer: "A" }
        ],
        optionsPool: {
            A: "$36\\pi",
            B: "$96\\pi",
            C: "$180\\pi",
            D: "$72\\pi",
            E: "$192\\pi",
            F: "$144\\pi"
        }
    },
    {
        id: 36,
        type: "open_ended",
        question: "Решите уравнение: $\\sqrt{x}+2x+2=(x+3)\\sqrt[4]{x}$",
        subQuestions: [
            { id: "a", text: "Сколько действительных корней имеет уравнение?", correctAnswer: "1" },
            { id: "b", text: "Найдите сумму действительных корней уравнения.", correctAnswer: "16" }
        ]
    },
    {
        id: 37,
        type: "open_ended",
        question: "Решите уравнение: $\\sin^3x(1+\\operatorname{ctg}x)+\\cos^3x(1+\\operatorname{tg}x)=2\\sqrt{\\sin x\\cos x}$",
        subQuestions: [
            { id: "a", text: "Найдите наименьшее положительное решение уравнения.", correctAnswer: "$\\frac\\pi4$" },
            { id: "b", text: "Сколько решений имеет уравнение на промежутке $\\left[-\\frac{5\\pi}{2};\\frac{5\\pi}{2}\\right]$?", correctAnswer: "3" }
        ]
    },
    {
        id: 38,
        type: "open_ended",
        question: "Дана функция $f(x)=\\frac{4x^2}{4x^4+1}$.",
        subQuestions: [
            { id: "a", text: "Найдите наибольшее значение функции.", correctAnswer: "1" },
            { id: "b", text: "Сколько целых чисел принадлежит области значений функции?", correctAnswer: "2" }
        ]
    },
    {
        id: 39,
        type: "open_ended",
        question: "Дана функция $f(x)=\\operatorname{arctg}2^{x-1013}$.",
        subQuestions: [
            { id: "a", text: "Найдите $f(0)+f(1)+\\ldots+f(2026)$.", correctAnswer: "$\\frac{2027\\pi}{4}$" },
            { id: "b", text: "Найдите $f'(1013)$.", correctAnswer: "$\\frac{\\ln2}{2}$" }
        ]
    },
    {
        id: 40,
        type: "open_ended",
        question: "На рисунке изображены графики функций $f(x)=\\frac2x$, $y_1=0$, $y_2=2$, $x_1=0$ и $x_2=2$.",
        image: "images/2-mart_1-img/40.svg",
        subQuestions: [
            { id: "a", text: "Найдите площадь закрашенной области.", correctAnswer: "$2+\\ln4$" },
            { id: "b", text: "Найдите объём тела, полученного вращением закрашенной области вокруг оси $OX$ на $360°$. (Примите $\\pi\\approx3$.)", correctAnswer: "18" }
        ]
    },
    {
        id: 41,
        type: "open_ended",
        question: "На основании $AC$ треугольника $ABC$ выбрана точка $D$ и соединена с вершиной $B$. В треугольники $ABD$ и $BDC$ вписаны окружности с центрами соответственно $O_1$ и $O_2$. Если $AB=10$, $BC=14$, $AD=10$ и $DC=6$,",
        image: "images/2-mart_1-img/41.svg",
        subQuestions: [
            { id: "a", text: "Найдите длину отрезка $BD$.", correctAnswer: "10" },
            { id: "b", text: "Найдите площадь треугольника $O_1O_2D$.", correctAnswer: "$\\frac{10\\sqrt3}{3}$" }
        ]
    },
    {
        id: 42,
        type: "open_ended",
        question: "На сторонах $AB$, $BC$ и $CD$ выпуклого четырёхугольника $ABCD$ выбраны соответственно точки $E$, $F$, $G$. При этом $AE:EB=CF:FB=CG:GD=3:4$, $EF=8$, $FG=6$ и $EF\\perp FG$.",
        image: "images/2-mart_1-img/42.svg",
        subQuestions: [
            { id: "a", text: "Найдите площадь треугольника $EFG$.", correctAnswer: "24" },
            { id: "b", text: "Найдите площадь четырёхугольника $ABCD$.", correctAnswer: "98" }
        ]
    },
    {
        id: 43,
        type: "open_ended",
        question: "В трапецию $ABCD$ с основаниями 3 и 5 вписана и около неё описана окружность; их центры — $O_1$ и $O_2$. Окружность с центром $O_1$ касается боковых сторон $AB$ и $CD$ в точках $E$ и $F$.",
        image: "images/2-mart_1-img/43.svg",
        subQuestions: [
            { id: "a", text: "Найдите площадь пятиугольника $BCFO_1E$.", correctAnswer: "$\\frac{3\\sqrt{15}}{2}$" },
            { id: "b", text: "Найдите площадь шестиугольника $AEO_1FDO_2$.", correctAnswer: "$\\frac{19\\sqrt{15}}{12}$" }
        ]
    },
    {
        id: 44,
        type: "open_ended",
        question: "Пирамида со всеми равными боковыми рёбрами вписана в шар. Основанием пирамиды является равнобедренная трапеция. Боковые стороны трапеции равны 3, а основания — 5 и 8. Если боковое ребро пирамиды равно $\\frac{14\\sqrt3}{3}$,",
        subQuestions: [
            { id: "a", text: "Найдите высоту пирамиды.", correctAnswer: "7" },
            { id: "b", text: "Найдите радиус шара.", correctAnswer: "$\\frac{14}{3}$" }
        ]
    },
    {
        id: 45,
        type: "open_ended",
        question: "На рисунке тело тянут к точке $C$ по наклонной $AB$. По наклонной $AB$ его тянут со скоростью 9 км/ч, а по горизонтальной плоскости $BC$ — со скоростью 15 км/ч. При этом $AC=50\\,m$, $DC=30\\,m$ и $\\angle BAD=\\alpha$. Тело из точки $A$ доставляется в точку $C$ за минимально возможное время.",
        image: "images/2-mart_1-img/45.svg",
        subQuestions: [
            { id: "a", text: "Найдите $\\cos\\alpha$.", correctAnswer: "$\\frac35$" },
            { id: "b", text: "Найдите минимальное время (в часах).", correctAnswer: "$\\frac2{375}$" }
        ]
    }
];