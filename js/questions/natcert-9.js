// Национальный сертификат — 23.02.2025, 1-вариант.
// Перевод вопросов на русский. Изображения из исходного PDF намеренно не используются.
// Ответы взяты из листа ответов; структура 33–35 и 36–45 сохранена.
var questions = [
    {
        "id": 1,
        "type": "single_choice",
        "question": "Пусть $a,b,c,d,f$ — различные цифры. Если $aaaa-bbb+cc+d+f=5000$, найдите $a\\cdot b-d\\cdot f+c$.",
        "options": ["4", "9", "7", "5"],
        "correctAnswer": 2
    },
    {
        "id": 2,
        "type": "single_choice",
        "question": "Вычислите $(4,(6)\\cdot2\\frac47-3)\\cdot1,0(5)-\\frac1{0,4}$.",
        "options": ["6", "7", "9,5", "7,5"],
        "correctAnswer": 1
    },
    {
        "id": 3,
        "type": "single_choice",
        "question": "В бассейне 4 трубы: первые две наполняют, третья и четвёртая опустошают. Все 4 трубы вместе наполняют бассейн за 5 часов; первая, вторая и третья — за 3 часа; первая, третья и четвёртая — за 30 часов. За сколько часов наполнят бассейн первая и третья трубы?",
        "options": ["10 часов", "4 часа", "6 часов", "5 часов"],
        "correctAnswer": 2
    },
    {
        "id": 4,
        "type": "single_choice",
        "question": "Платье стоило 100000 сум. Сначала цену повысили на 10%, затем снизили на 15%. Какова новая цена?",
        "options": ["93500", "103500", "92000", "95000"],
        "correctAnswer": 0
    },
    {
        "id": 5,
        "type": "single_choice",
        "question": "Если $x^2=2048^{24}$ и $\\sqrt[3]{y}=512^5$, найдите $\\frac{x}{y}$.",
        "options": ["8", "$\\frac18$", "64", "$\\frac1{64}$"],
        "correctAnswer": 1
    },
    {
        "id": 6,
        "type": "single_choice",
        "question": "Упростите $\\frac{(\\sqrt{11}-\\sqrt5)(\\sqrt{15}+\\sqrt{33}-\\sqrt{22}-\\sqrt{10})}{\\sqrt{108}-\\sqrt{72}}$.",
        "options": ["1", "2", "3", "4"],
        "correctAnswer": 0
    },
    {
        "id": 7,
        "type": "single_choice",
        "question": "Освободите знаменатель от иррациональности в $\\frac1{\\sqrt2+\\sqrt3-\\sqrt5}$.",
        "options": ["$\\frac{3\\sqrt2+2\\sqrt3+\\sqrt{30}}6$", "$\\frac{3\\sqrt2+2\\sqrt3+\\sqrt{30}}{12}$", "$\\frac{3\\sqrt2+2\\sqrt3-\\sqrt{30}}{12}$", "$\\frac{3\\sqrt2+2\\sqrt3-\\sqrt{30}}6$"],
        "correctAnswer": 1
    },
    {
        "id": 8,
        "type": "single_choice",
        "question": "В арифметической прогрессии $a_{14}=20$ и $S_{28}=600$. Найдите $a_{28}$.",
        "options": ["60", "40", "70", "80"],
        "correctAnswer": 0
    },
    {
        "id": 9,
        "type": "single_choice",
        "question": "В убывающей геометрической прогрессии сумма первых трёх членов равна 14, а сумма их квадратов равна 84. Найдите сумму первых шести членов.",
        "options": ["$15\\frac34$", "$14\\frac34$", "$13\\frac23$", "$12\\frac15$"],
        "correctAnswer": 0
    },
    {
        "id": 10,
        "type": "single_choice",
        "question": "Точку $P(0;1)$ повернули на 3 радиана вокруг начала координат. В какой четверти окажется полученная точка?",
        "options": ["II", "III", "I", "IV"],
        "correctAnswer": 1
    },
    {
        "id": 11,
        "type": "single_choice",
        "question": "Если $|c|<|b|<|a|$, $a<0$, $b>0$, $c<0$, вычислите $\\frac{a|b-c|}{|a|}+\\frac{b|c-a|}{|b|}+\\frac{c|a-b|}{|c|}$.",
        "options": ["$2a-2b$", "0", "$2c-2a$", "$2c-2b$"],
        "correctAnswer": 3
    },
    {
        "id": 12,
        "type": "single_choice",
        "question": "Упростите выражение $\\frac{-4\\cdot4^{x-1}\\cdot3^{2x+1}-12^{x+1}\\cdot3^{x+2}}{36^x\\cdot8+9^x\\cdot2^{2x+1}}$.",
        "options": ["11,1", "10,1", "-11,1", "-10,1"],
        "correctAnswer": 2
    },
    {
        "id": 13,
        "type": "single_choice",
        "question": "Упростите выражение $\\frac{\\sin^22\\alpha\\cdot\\tan^22\\alpha}{1-\\cot^22\\alpha}+\\frac{\\cos^22\\alpha\\cdot\\cot^22\\alpha}{1-\\tan^22\\alpha}+2$.",
        "options": ["$\\tan^22\\alpha-\\cot^22\\alpha$", "$\\frac{2}{\\tan^22\\alpha-\\cot^22\\alpha}$", "$\\frac4{\\sin^42\\alpha}$", "$\\tan^22\\alpha+\\cot^22\\alpha+1$"],
        "correctAnswer": 2
    },
    {
        "id": 14,
        "type": "single_choice",
        "question": "Решите неравенство $3^x-2^{x+2}+2^{x-3}+2^{x-1}-3^{x-1}\\ge0$.",
        "options": ["$(5;\\infty)$", "$(4;\\infty)$", "$[4;\\infty)$", "$[5;\\infty)$"],
        "correctAnswer": 2
    },
    {
        "id": 15,
        "type": "single_choice",
        "question": "Вычислите выражение с $2023$, $2024$ и вложенным радикалом из условия оригинального задания.",
        "options": ["2024", "-2023", "-2024", "2023"],
        "correctAnswer": 3
    },
    {
        "id": 16,
        "type": "single_choice",
        "question": "Сколько действительных корней имеет уравнение $\\frac{(x+2)^2-9}{x+7}(x+7)=16$?",
        "options": ["1", "2", "3", "решений нет"],
        "correctAnswer": 0
    },
    {
        "id": 17,
        "type": "single_choice",
        "question": "Найдите произведение действительных корней уравнения $(x-3)^2+3x=\\sqrt{x^2-3x+7}+22$.",
        "options": ["162", "-18", "-9", "-162"],
        "correctAnswer": 1
    },
    {
        "id": 18,
        "type": "single_choice",
        "question": "Сколько решений имеет неравенство $2x^2+2\\sqrt2x+1\\le0$?",
        "options": ["1", "2", "0", "бесконечно много"],
        "correctAnswer": 0
    },
    {
        "id": 19,
        "type": "single_choice",
        "question": "Найдите сумму целых чисел, удовлетворяющих $\\frac{x^2-5x+64}{x^2-10x+24}\\le\\frac{10}{4-x}$.",
        "options": ["0", "10", "5", "-5"],
        "correctAnswer": 3
    },
    {
        "id": 20,
        "type": "single_choice",
        "question": "Сколько натуральных чисел принадлежит области значений функции $f(x)=6\\sin x-4\\cos x$?",
        "options": ["15", "7", "4", "14"],
        "correctAnswer": 1
    },
    {
        "id": 21,
        "type": "single_choice",
        "question": "Функция $y=x^2-(a^2-2a-3)x+6$ имеет нули $x=2$ и $x=3$. Найдите возможные значения $a$.",
        "options": ["1;2", "-2;-1", "4;-2", "0;2"],
        "correctAnswer": 2
    },
    {
        "id": 22,
        "type": "single_choice",
        "question": "Если $f(x)=|\\log_{\\cos x}(\\sin x)-\\ln\\pi|$, найдите $f'(\\frac\\pi4)$.",
        "options": ["$\\log_2e$", "$-4\\log_2e$", "$-4\\log_4e$", "$4\\log_2e$"],
        "correctAnswer": 3
    },
    {
        "id": 23,
        "type": "single_choice",
        "question": "Вычислите $\\int_2^4\\frac{3}{5-4x-x^2}\\,dx$.",
        "options": ["$\\ln\\frac37$", "$\\ln\\sqrt{\\frac37}$", "$\\ln\\sqrt{\\frac73}$", "$\\ln\\frac73$"],
        "correctAnswer": 1
    },
    {
        "id": 24,
        "type": "single_choice",
        "question": "В треугольник $ABC$ вписана окружность, касающаяся $AB,BC,AC$ в $F,D,E$. Если $AB=9$, $BC=7$, $AC=10$, найдите $AE$.",
        image: "images/23-feb2025_1/24.jpeg",
        "options": ["4", "6", "8", "5"],
        "correctAnswer": 1
    },
    {
        "id": 25,
        "type": "single_choice",
        "question": "В прямоугольном треугольнике гипотенуза равна 15, $\\sin\\angle ACB=0,6$. Найдите площадь.",
        image: "images/23-feb2025_1/25.jpeg",
        "options": ["56", "54", "108", "36"],
        "correctAnswer": 1
    },
    {
        "id": 26,
        "type": "single_choice",
        "question": "В прямоугольный треугольник $ABC$ вписан квадрат $ADEF$, причём общий прямой угол находится в $A$. Если $BE=20$, $EC=30$, найдите площадь закрашенной области.",
        image: "images/23-feb2025_1/26.jpeg",
        "options": ["600", "325", "300", "225"],
        "correctAnswer": 2
    },
    {
        "id": 27,
        "type": "single_choice",
        "question": "Квадрат $ABCD$ имеет сторону 6. $AF=2$, $CE=3$, а углы $\\angle FMA=\\beta$ и $\\angle CNE=\\alpha$ заданы на рисунке. Найдите $\\alpha+\\beta$.",
        image: "images/23-feb2025_1/27.jpeg",
        "options": ["115°", "135°", "150°", "120°"],
        "correctAnswer": 1
    },
    {
        "id": 28,
        "type": "single_choice",
        "question": "Правильный многоугольник имеет внешний угол $45^\\circ$. Вокруг него описана окружность радиуса 2. Найдите площадь многоугольника.",
        "options": ["$4\\sqrt2$", "$\\sqrt2$", "$6\\sqrt2$", "$8\\sqrt2$"],
        "correctAnswer": 3
    },
    {
        "id": 29,
        "type": "single_choice",
        "question": "Две плоскости образуют двугранный угол $120^\\circ$. Даны $AC=7\\sqrt3$, $AB=12$, $DC=4\\sqrt3$, $\\angle BAC=30^\\circ$, $\\angle ACD=60^\\circ$. Найдите расстояние между $B$ и $D$.",
        image: "images/23-feb2025_1/29.jpeg",
        "options": ["$6\\sqrt3$", "12", "$\\sqrt{75+6\\sqrt{39}}$", "$\\sqrt{111}$"],
        "correctAnswer": 3
    },
    {
        "id": 30,
        "type": "single_choice",
        "question": "Окружность $x^2+y^2=36$ и прямая $y=kx+b$ изображены на рисунке; прямая образует с осью $Ox$ угол $30^\\circ$. Найдите кратчайшее расстояние от точки $A$ до оси $Ox$.",
        image: "images/23-feb2025_1/30.jpeg",
        "options": ["6", "$3\\sqrt3$", "3", "$6\\sqrt3$"],
        "correctAnswer": 1
    },
    {
        "id": 31,
        "type": "single_choice",
        "question": "Во множестве на рисунке заданы множества $A,B,C$. Найдите количество подмножеств множества $(A\\cup B)'\\cup A$.",
        "options": ["128", "64", "256", "32"],
        "correctAnswer": 0
    },
    {
        "id": 32,
        "type": "single_choice",
        "question": "Сколько трёхзначных чисел, кратных 3, можно составить так, чтобы все их цифры были нечётными?",
        image: "images/23-feb2025_1/32.jpeg",
        "options": ["35", "36", "41", "29"],
        "correctAnswer": 2
    },
    {
        "id": 33,
        "type": "matching",
        "context": "Палатка состоит из конической крыши и цилиндрической нижней части. Их основания совпадают, а высоты равны; общая высота палатки 6. В заданиях 33–35 используйте условие и варианты A–F.",
        image: "images/23-feb2025_1/33_35.jpeg",
        "optionsPool": {"A":"64π","B":"68π","C":"54π","D":"56π","E":"60π","F":"72π"},
        "items": [{"id":33,"text":"По условию оригинала найдите объём палатки.","correctAnswer":"A"}]
    },
    {
        "id": 34,
        "type": "matching",
        "context": "Палатка состоит из конической крыши и цилиндрической нижней части. Их основания совпадают, а высоты равны; общая высота палатки 6. В заданиях 33–35 используйте условие и варианты A–F.",
        "optionsPool": {"A":"64π","B":"68π","C":"54π","D":"56π","E":"60π","F":"72π"},
        "items": [{"id":34,"text":"Если объём конуса равен $81π$ м³, найдите площадь боковой поверхности цилиндра.","correctAnswer":"C"}]
    },
    {
        "id": 35,
        "type": "matching",
        "context": "Палатка состоит из конической крыши и цилиндрической нижней части. Их основания совпадают, а высоты равны; общая высота палатки 6. В заданиях 33–35 используйте условие и варианты A–F.",
        "optionsPool": {"A":"64π","B":"68π","C":"54π","D":"56π","E":"60π","F":"72π"},
        "items": [{"id":35,"text":"Если образующая конуса в $a$ раз больше радиуса основания, выберите ответ согласно оригинальному условию.","correctAnswer":"F"}]
    },
    {
        "id": 36,
        "type": "open_ended",
        "question": "Дано уравнение $x^4-4x^3-4x^2+16x-8=0$.",
        "subQuestions": [
            {"id":"a","text":"Сколько действительных корней имеет уравнение?","correctAnswer":"4"},
            {"id":"b","text":"Если корни $x_1,\\dots,x_n$, найдите $|x_1|+\\dots+|x_n|$. ","correctAnswer":"2+2\\sqrt2+2\\sqrt3"}
        ]
    },
    {
        "id": 37,
        "type": "open_ended",
        "question": "Дана система $\\begin{cases}\\tan x+\\tan\\frac y2=\\frac4{\\sqrt3}\\\\\\cot x+\\cot\\frac y2=\\frac4{\\sqrt3}\\end{cases}$.",
        "subQuestions": [
            {"id":"a","text":"Найдите наименьшее значение $\\tan y$.","correctAnswer":"-\\sqrt3"},
            {"id":"b","text":"Найдите наименьшее положительное значение $x$.","correctAnswer":"\\frac\\pi6"}
        ]
    },
    {
        "id": 38,
        "type": "open_ended",
        "question": "На рисунке прямоугольник $ABCD$ является прямоугольником максимальной площади с вершинами на графиках $y_1=x^2+2$ и $y_2=6$.",
        "subQuestions": [
            {"id":"a","text":"Найдите площадь прямоугольника.","correctAnswer":"4"},
            {"id":"b","text":"Найдите длину диагонали $AC$.","correctAnswer":"-2"}
        ]
    },
    {
        "id": 39,
        "type": "open_ended",
        "question": "Для функции $f(x)$ задано условие из оригинального задания.",
        image: "images/23-feb2025_1/39.jpeg",
        "subQuestions": [
            {"id":"a","text":"Найдите $f(2)$. ","correctAnswer":"3"},
            {"id":"b","text":"Найдите $f^2(3)$ согласно обозначению оригинального задания.","correctAnswer":"6"}
        ]
    },
    {
        "id": 40,
        "type": "open_ended",
        "question": "На рисунке дана область, ограниченная функциями из оригинального задания.",
        image: "images/23-feb2025_1/40.jpeg",
        "subQuestions": [
            {"id":"a","text":"Найдите значение $x+y$.","correctAnswer":"12"},
            {"id":"b","text":"Найдите площадь заштрихованной области.","correctAnswer":"13"}
        ]
    },
    {
        "id": 41,
        "type": "open_ended",
        "question": "В треугольнике $ABC$ высота $BH$ делит его на два прямоугольных треугольника; радиусы вписанных окружностей равны 3 и 4.",
        image: "images/23-feb2025_1/41.jpeg",
        "subQuestions": [
            {"id":"a","text":"Найдите высоту $BH$.","correctAnswer":"12"},
            {"id":"b","text":"Найдите площадь треугольника $ABC$.","correctAnswer":"150"}
        ]
    },
    {
        "id": 42,
        "type": "open_ended",
        "question": "Дан выпуклый четырёхугольник со сторонами 6, 6, 8, 8, в который вписана и около которого описана окружность.",
        "subQuestions": [
            {"id":"a","text":"Найдите меньшую диагональ.","correctAnswer":"9,6"},
            {"id":"b","text":"Найдите расстояние между центрами вписанной и описанной окружностей.","correctAnswer":"\\frac57"}
        ]
    },
    {
        "id": 43,
        "type": "open_ended",
        "question": "Выпуклый шестиугольник $ABCDEF$ имеет все стороны длины 2, $BF=FD$, $\\angle A=\\angle E=90^\\circ$.",
        "subQuestions": [
            {"id":"a","text":"Найдите площадь треугольника $BFD$.","correctAnswer":"\\sqrt7"},
            {"id":"b","text":"Если сторона шестиугольника равна $a$, найдите его площадь в форме, указанной в оригинальном ответе.","correctAnswer":"25"}
        ]
    },
    {
        "id": 44,
        "type": "open_ended",
        "question": "В шар вписан конус. Боковая поверхность конуса равна $18\\sqrt{2+\\sqrt3}\\,π$, а угол между образующей и плоскостью основания равен $75^\\circ$.",
        "subQuestions": [
            {"id":"a","text":"Найдите радиус основания конуса.","correctAnswer":"3"},
            {"id":"b","text":"Найдите объём шара, принимая $π\\approx3$.","correctAnswer":"864"}
        ]
    },
    {
        "id": 45,
        "type": "open_ended",
        "question": "Из металлического листа в форме половины цилиндра изготовили поилку длиной 200 см и диаметром 40 см. Принять $π\\approx3$.",
        image: "images/23-feb2025_1/45.jpeg",
        "subQuestions": [
            {"id":"a","text":"Сколько $дм^2$ листа потребуется без отходов?","correctAnswer":"132"},
            {"id":"b","text":"Сколько литров воды помещается в поилку?","correctAnswer":"120"}
        ]
    }
];
