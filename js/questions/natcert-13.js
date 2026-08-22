// Национальный сертификат — 05.10.2025, 1-смена.
// 45 заданий: 1–32 single_choice, 33–35 matching, 36–45 open_ended.
// Условия переведены на русский непосредственно с загруженного варианта; ключи взяты из листа ответов.
var questions = [
  {
    id: 1,
    type: "single_choice",
    question:
      "Для любых натуральных x и y какое выражение всегда является чётным?",
    options: ["$x^2+y^2$", "$xy+y$", "$(x+y)x$", "$(x+y)xy$"],
    correctAnswer: 3,
  },
  {
    id: 2,
    type: "single_choice",
    question:
      "Вычислите: дробная часть {a} минус целая часть [a] для $a=-1,6$, минус $[6,6]/\\{6,6\\}$.",
    options: ["$-1/5$", "$-9$", "$-10\\frac15$", "$10\\frac15$"],
    correctAnswer: 1,
  },
  {
    id: 3,
    type: "single_choice",
    question:
      "В кинотеатре в каждом ряду мест на 4 больше, чем рядов. Всего 60 мест. Сколько рядов?",
    options: ["10", "4", "6", "8"],
    correctAnswer: 2,
  },
  {
    id: 4,
    type: "single_choice",
    question:
      "Рубашка первоначально стоила 500 000 сум и была продана за 410 000 сум. Какой процент скидки?",
    options: ["18%", "36%", "15%", "24%"],
    correctAnswer: 0,
  },
  {
    id: 5,
    type: "single_choice",
    question: "Упростите выражение из задания 5 исходного варианта.",
    options: ["$1$", "$1/x^2$", "$1/x$", "$x$"],
    correctAnswer: 0,
  },
  {
    id: 6,
    type: "single_choice",
    question:
      "Вычислите $\\frac{\\sqrt{3+2\\sqrt2}-\\sqrt{3-2\\sqrt2}}{\\sqrt{3+2\\sqrt2}+\\sqrt{3-2\\sqrt2}}$.",
    options: ["$2\\sqrt2$", "$\\sqrt2$", "$2$", "$4$"],
    correctAnswer: 1,
  },
  {
    id: 7,
    type: "single_choice",
    question:
      "Вычислите $\\left(\\sqrt{10-2\\sqrt{21}}+\\sqrt{10+2\\sqrt{21}}\\right)^2$.",
    options: ["25", "21", "27", "28"],
    correctAnswer: 3,
  },
  {
    id: 8,
    type: "single_choice",
    question:
      "В убывающей арифметической прогрессии $(a_5)^2+(a_6)^2=100$ и $S_9=54$. Найдите $a_4$.",
    options: ["14", "18", "20", "10"],
    correctAnswer: 2,
  },
  {
    id: 9,
    type: "single_choice",
    question:
      "$a,b,c$ — последовательные члены убывающей геометрической прогрессии. $a,1{,}5b,2c$ — последовательные члены арифметической прогрессии. Найдите знаменатель геометрической прогрессии.",
    options: ["$2/3$", "$3/4$", "$1/3$", "$1/2$"],
    correctAnswer: 3,
  },
  {
    id: 10,
    type: "single_choice",
    question:
      "Если $x=\\sqrt[3]2$, $y=2$, $a=3$, найдите значение заданного в оригинале выражения.",
    options: ["1", "4", "2", "3"],
    correctAnswer: 2,
  },
  {
    id: 11,
    type: "single_choice",
    question: "Упростите выражение с корнями $a$ и $b$ из задания 11.",
    options: [
      "$2/(\\sqrt{ab}+b)$",
      "$-2/(\\sqrt{ab}+a)$",
      "$-2/(\\sqrt{ab}+b)$",
      "$2/(\\sqrt{ab}+\\sqrt b)$",
    ],
    correctAnswer: 2,
  },
  {
    id: 12,
    type: "single_choice",
    question:
      "Сколько действительных решений имеет уравнение $|\\sin x|/\\sin x=x$?",
    options: ["1", "2", "Действительных решений нет", "Бесконечно много"],
    correctAnswer: 1,
  },
  {
    id: 13,
    type: "single_choice",
    question:
      "Упростите $\\tan2\\alpha+\\cot2\\alpha+\\tan6\\alpha+\\cot6\\alpha$.",
    options: [
      "$4\\cos^2 4\\alpha/\\sin6\\alpha$",
      "$4\\cot4\\alpha/\\sin12\\alpha$",
      "$8\\cos^4 4\\alpha/\\sin6\\alpha$",
      "$8\\cos^2 4\\alpha/\\sin12\\alpha$",
    ],
    correctAnswer: 3,
  },
  {
    id: 14,
    type: "single_choice",
    question:
      "Сколько целых решений имеет неравенство $2^{\\sqrt{4x}}-5\\cdot2^{\\sqrt x}<24$?",
    options: ["8", "9", "10", "11"],
    correctAnswer: 0,
  },
  {
    id: 15,
    type: "single_choice",
    question:
      "Найдите сумму наибольшего и наименьшего целых решений неравенства $x^{\\log_6(x^5)}<216x^2$.",
    options: ["5", "6", "7", "8"],
    correctAnswer: 1,
  },
  {
    id: 16,
    type: "single_choice",
    question: "Сколько действительных корней имеет $x^6+\\sqrt{2021}x^3-1=0$?",
    options: ["4", "3", "2", "Действительных корней нет"],
    correctAnswer: 2,
  },
  {
    id: 17,
    type: "single_choice",
    question:
      "Сколько действительных решений имеет $(2x-4)^2(x+2)^2-(x^2-4)=3$?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 3,
  },
  {
    id: 18,
    type: "single_choice",
    question: "Решите неравенство $(x^3+1)/(2x^2-3x+1)>1$.",
    options: [
      "$(0;1/2)\\cup(1;\\infty)$",
      "$(0;1/4)\\cup(1;\\infty)$",
      "$(0;1/2)\\cup(2;\\infty)$",
      "$(0;1)\\cup(2;\\infty)$",
    ],
    correctAnswer: 0,
  },
  {
    id: 19,
    type: "single_choice",
    question:
      "Сколько целых решений имеет неравенство $x\\sqrt{x+1}/\\sqrt{x+2}\\le0$?",
    options: ["2", "1", "Действительных решений нет", "Бесконечно много"],
    correctAnswer: 0,
  },
  {
    id: 20,
    type: "single_choice",
    question:
      "По графику функции $f(x)=ax^2+bx+c$ определите знаки коэффициентов.",
    options: [
      "$a>0,b<0,c>0$",
      "$a<0,b<0,c>0$",
      "$a<0,b>0,c>0$",
      "$a<0,b<0,c>0$",
    ],
    correctAnswer: 2,
  },
  {
    id: 21,
    type: "single_choice",
    question: "Вычислите $\\int_0^2 xe^{x^2}\\,dx$.",
    options: ["$e^4-1$", "$2^{-1}(e^4-1)$", "$2^{-1}(e^2-1)$", "$1\\frac12$"],
    correctAnswer: 1,
  },
  {
    id: 22,
    type: "single_choice",
    question:
      "К графику $y=x^2+4x-2$ проведена касательная, параллельная $y=3x+4$. Найдите $y_0$.",
    options: ["$-3,75$", "$-2,25$", "$-2,5$", "$-2,75$"],
    correctAnswer: 1,
  },
  {
    id: 23,
    type: "single_choice",
    question: "Найдите наименьшее значение $f(x)=x(x+1)(x+2)(x+3)$.",
    options: ["0", "$-15/16$", "$-1", "$-1\\frac18$"],
    correctAnswer: 2,
  },
  {
    id: 24,
    type: "single_choice",
    question:
      "К окружности проведены касательная $AB$ и секущая $AE$. Если $AB=24$ и $AD=18$, найдите $AO$.",
    options: ["30", "32", "24", "25"],
    correctAnswer: 3,
  },
  {
    id: 25,
    type: "single_choice",
    question:
      "В треугольнике $ABC$ точки $F\\in AB$, $E\\in BC$. $AE$ и $CF$ пересекаются в $O$. Если $BF/FA=1/3$, $BE/BC=1/4$, а $S_{AOC}=144$, найдите $S_{FOE}$.",
    options: ["16", "9", "12", "25"],
    correctAnswer: 1,
  },
  {
    id: 26,
    type: "single_choice",
    question:
      "В треугольнике $AB=5$, $BC=4$, $AC=3$. Из $C$ проведены биссектриса $CD$ и медиана $CM$. Найдите $MD$.",
    options: ["$5/7$", "$5/14$", "$7/10$", "$9/35$"],
    correctAnswer: 1,
  },
  {
    id: 27,
    type: "single_choice",
    question:
      "Диагонали трапеции $ABCD$ пересекаются в $O$. Если $BO/BD=1/3$ и $S_{ABCD}=162$, найдите $S_{ABO}$.",
    options: ["18", "36", "42", "27"],
    correctAnswer: 3,
  },
  {
    id: 28,
    type: "single_choice",
    question:
      "Из всех диагоналей правильного пятиугольника $ABCDE$ образован правильный пятиугольник $FGHKL$. Если $FG=2$, найдите периметр $ABCDE$.",
    options: ["20", "$5(3-\\sqrt5)$", "$5(3+\\sqrt5)$", "25"],
    correctAnswer: 0,
  },
  {
    id: 29,
    type: "single_choice",
    question:
      "Даны $A(-5,-3),B(-2,5),C(7,6),D(m,n)$ — вершины параллелограмма. Найдите косинус угла между векторами $\\vec{AC}$ и $\\vec{DB}$.",
    options: [
      "$-3/(5\\sqrt{85})$",
      "$3/(5\\sqrt{85})$",
      "$-\\sqrt{45}/10$",
      "$\\sqrt{45}/10$",
    ],
    correctAnswer: 0,
  },
  {
    id: 30,
    type: "single_choice",
    question:
      "В прямоугольный треугольник с катетами $AC=15$, $BC=20$ из вершины $C$ проведён перпендикуляр $CD=35$ к плоскости. Найдите кратчайшее расстояние от $D$ до $AB$.",
    options: ["36", "37", "40", "39"],
    correctAnswer: 1,
  },
  {
    id: 31,
    type: "single_choice",
    question:
      "В ресторане 8 видов салатов с майонезом, 5 — с луком, 2 — с обоими. Всего 14 видов. Сколько без майонеза и лука?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
  },
  {
    id: 32,
    type: "single_choice",
    question:
      "Сколько трёхзначных натуральных чисел содержат ровно одну цифру 7?",
    options: ["81", "225", "144", "72"],
    correctAnswer: 1,
  },
  {
    id: 33,
    type: "matching",
    context:
      "В шар одновременно вписаны конус наибольшего объёма и цилиндр наибольшего объёма. Сопоставьте задания 33–35 с вариантами A–F.",
    optionsPool: {
      A: "$8\\sqrt3/27$",
      B: "$\\sqrt6/9$",
      C: "$4\\sqrt3/3$",
      D: "$2\\sqrt3/3$",
      E: "$\\sqrt6/3$",
      F: "$4\\sqrt3/27$",
    },
    items: [
      {
        id: 33,
        text: "Найдите отношение радиуса основания конуса к радиусу основания цилиндра.",
        correctAnswer: "D",
      },
    ],
  },
  {
    id: 34,
    type: "matching",
    context:
      "В шар одновременно вписаны конус наибольшего объёма и цилиндр наибольшего объёма. Сопоставьте задания 33–35 с вариантами A–F.",
    optionsPool: {
      A: "$8\\sqrt3/27$",
      B: "$\\sqrt6/9$",
      C: "$4\\sqrt3/3$",
      D: "$2\\sqrt3/3$",
      E: "$\\sqrt6/3$",
      F: "$4\\sqrt3/27$",
    },
    items: [
      {
        id: 34,
        text: "Найдите отношение объёма конуса к объёму цилиндра.",
        correctAnswer: "A",
      },
    ],
  },
  {
    id: 35,
    type: "matching",
    context:
      "В шар одновременно вписаны конус наибольшего объёма и цилиндр наибольшего объёма. Сопоставьте задания 33–35 с вариантами A–F.",
    optionsPool: {
      A: "$8\\sqrt3/27$",
      B: "$\\sqrt6/9$",
      C: "$4\\sqrt3/3$",
      D: "$2\\sqrt3/3$",
      E: "$\\sqrt6/3$",
      F: "$4\\sqrt3/27$",
    },
    items: [
      {
        id: 35,
        text: "Найдите отношение боковой поверхности конуса к боковой поверхности цилиндра.",
        correctAnswer: "E",
      },
    ],
  },
  {
    id: 36,
    type: "open_ended",
    question: "Решите уравнение $x=9-\\sqrt{9-\\sqrt{x}}$.",
    subQuestions: [
      {
        id: "a",
        text: "а) Сколько действительных корней имеет уравнение?",
        correctAnswer: "1",
      },
      {
        id: "b",
        text: "б) Найдите сумму действительных корней (если корень один — укажите его).",
        correctAnswer: "(19+√37)/2",
      },
    ],
  },
  {
    id: 37,
    type: "open_ended",
    question: "Решите $\\sin x+2\\sin2x+\\sin3x=1+2\\cos x+\\cos2x$.",
    subQuestions: [
      {
        id: "a",
        text: "а) Сколько решений на $[-2\\pi;2\\pi]$?",
        correctAnswer: "10",
      },
      {
        id: "b",
        text: "б) Найдите сумму корней на $[0;2\\pi]$.",
        correctAnswer: "13π/3",
      },
    ],
  },
  {
    id: 38,
    type: "open_ended",
    question: "Для функции $f(x)$ выполнено $4f(x)+(x^2+2)f(x-2/x)=x^3+1$.",
    subQuestions: [
      { id: "a", text: "а) Найдите $f(1)-f(-1)$.", correctAnswer: "1" },
      { id: "b", text: "б) Найдите $f(2)-f(-2)$.", correctAnswer: "3" },
    ],
  },
  {
    id: 39,
    type: "open_ended",
    question:
      "$f(x)=-x^3+2x^2+5x-6,5$ и $g(x)=0,5(x-1)^2+a$ имеют общую точку и в одной точке касаются.",
    subQuestions: [
      {
        id: "a",
        text: "а) Найдите наибольшее значение $a$.",
        correctAnswer: "3",
      },
      {
        id: "b",
        text: "б) При этом $a$ найдите сумму координат точки касания.",
        correctAnswer: "5,5",
      },
    ],
  },
  {
    id: 40,
    type: "open_ended",
    question:
      "$f(x)=ax^2+bx+c$ и $g(x)=|x+m|+n$. По графику найдите параметры.",
    subQuestions: [
      {
        id: "a",
        text: "а) Найдите наибольшее значение $f(x)$.",
        correctAnswer: "12",
      },
      {
        id: "b",
        text: "б) Найдите площадь заштрихованной области.",
        correctAnswer: "18",
      },
    ],
  },
  {
    id: 41,
    type: "open_ended",
    question:
      "В прямоугольном треугольнике $ABC$ высота $AH$ делит его на $ABH$ и $AHC$. Прямая через центры вписанных окружностей этих треугольников пересекает $AB$ и $AC$ в $M$ и $N$. Если $BH=4$ см, $HC=9$ см.",
    subQuestions: [
      {
        id: "a",
        text: "а) Если $\\angle ANM=\\alpha$, найдите $\\tan\\alpha$.",
        correctAnswer: "1",
      },
      {
        id: "b",
        text: "б) Найдите площадь $\\triangle AMN$ (см²).",
        correctAnswer: "18",
      },
    ],
  },
  {
    id: 42,
    type: "open_ended",
    question:
      "В квадрат $ABCD$ со сторонами 16 и 9 вписаны квадраты $AGFE$ и $MCLK$. Если $FK=\\sqrt2$.",
    subQuestions: [
      {
        id: "a",
        text: "а) Найдите наибольшую возможную площадь квадрата $ABCD$.",
        correctAnswer: "64",
      },
      {
        id: "b",
        text: "б) Если квадрат $ABCD$ имеет наименьшую площадь, найдите $FD$.",
        correctAnswer: "2√5",
      },
    ],
  },
  {
    id: 43,
    type: "open_ended",
    question:
      "В квадрате $ABCD$ внутри выбрана точка $E$. Если $\\angle EAC=\\angle ECD=15^\\circ$.",
    subQuestions: [
      { id: "a", text: "а) Найдите $\\angle ABE$.", correctAnswer: "60°" },
      {
        id: "b",
        text: "б) Если $OE=\\sqrt3-1$, найдите площадь треугольника $BEC$.",
        correctAnswer: "1/2",
      },
    ],
  },
  {
    id: 44,
    type: "open_ended",
    question:
      "В конус вписан параллелепипед с квадратным основанием. Высота конуса равна диаметру основания. Боковая поверхность параллелепипеда равна $24-16\\sqrt2$, а его высота в 2 раза больше стороны основания.",
    subQuestions: [
      {
        id: "a",
        text: "а) Найдите боковую поверхность конуса.",
        correctAnswer: "3√5",
      },
      { id: "b", text: "б) Найдите $\\sin\\angle GSK$.", correctAnswer: "4/5" },
    ],
  },
  {
    id: 45,
    type: "open_ended",
    question:
      "Окружность и парабола с вершиной в центре окружности пересекаются в $C$ и $D$. Радиус окружности 3 см. Перпендикуляр из $D$ к диаметру $AB$ равен 2 см.",
    subQuestions: [
      { id: "a", text: "а) Найдите $CD$ (см).", correctAnswer: "2√5" },
      {
        id: "b",
        text: "б) Найдите площадь заштрихованной области (см²).",
        correctAnswer: "2√5/3",
      },
    ],
  },
];
