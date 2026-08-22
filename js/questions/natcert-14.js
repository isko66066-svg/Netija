// Национальный сертификат — 05.10.2025, 2-смена.
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
    question: "Вычислите $3,0(45)-1,(08)+2,0(45)$.",
    options: ["$4,(08)$", "$4,(05)$", "$4,(02)$", "$4,(01)$"],
    correctAnswer: 3,
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
      "3 м адраса и 5 м атласа стоят 215 000 сум. После удешевления адраса на 12% и атласа на 8% цена стала 194 200 сум. На сколько первоначальная цена 1 м адраса больше цены 1 м атласа?",
    options: ["5500", "5000", "6000", "6500"],
    correctAnswer: 1,
  },
  {
    id: 5,
    type: "single_choice",
    question: "Вычислите $\\frac{36^3+73^3}{37^3+73^3}$.",
    options: ["$105/107$", "$107/108$", "$108/109$", "$110/111$"],
    correctAnswer: 2,
  },
  {
    id: 6,
    type: "single_choice",
    question: "Вычислите выражение с корнями из задания 6.",
    options: ["$2+\\sqrt2$", "$2-\\sqrt2$", "$3+\\sqrt2$", "$3-\\sqrt2$"],
    correctAnswer: 2,
  },
  {
    id: 7,
    type: "single_choice",
    question:
      "Числа $a=\\sqrt{26},b=\\sqrt5,c=\\sqrt3$ расположите в порядке, указанном в оригинале.",
    options: ["$b>c>a$", "$a>b>c$", "$c>a>b$", "$a>c>b$"],
    correctAnswer: 2,
  },
  {
    id: 8,
    type: "single_choice",
    question:
      "В арифметической прогрессии $a_9=3a_3$ и $a_8=2(a_3+4)$. Найдите $S_{10}$.",
    options: ["110", "120", "220", "210"],
    correctAnswer: 2,
  },
  {
    id: 9,
    type: "single_choice",
    question:
      "Возрастaющая арифметическая прогрессия имеет сумму $a+b+c=12$. Числа $a+1,b,c+1$ образуют геометрическую прогрессию. Найдите требуемую в оригинале величину.",
    options: ["3", "4", "5", "6"],
    correctAnswer: 2,
  },
  {
    id: 10,
    type: "single_choice",
    question:
      "Если $((a/125)^{a^2+4ab})=(\\sqrt{625})^{3a^2-10ab}$, найдите $a/b$.",
    options: ["$2/21$", "$4/21$", "$5/21$", "$8/21$"],
    correctAnswer: 1,
  },
  {
    id: 11,
    type: "single_choice",
    question:
      "Если $(a+b-5)^2+(b+2c+3)^2+(3c+a-10)^2=0$, найдите $a^2+b^2+c^2$.",
    options: ["57", "73", "58", "65"],
    correctAnswer: 0,
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
      "Найдите наименьший положительный корень $\\cos^2 2x+\\cos^2 3x+\\cos^2 10x+\\cos^2 11x=2$.",
    options: ["$\\pi/12$", "$\\pi/6$", "$\\pi/8$", "$\\pi/13$"],
    correctAnswer: 1,
  },
  {
    id: 14,
    type: "single_choice",
    question:
      "Сколько действительных корней имеет $2025^x+2026\\cdot2025^{x-1}=4051$?",
    options: ["1", "2", "3", "Действительных решений нет"],
    correctAnswer: 0,
  },
  {
    id: 15,
    type: "single_choice",
    question:
      "Сколько действительных корней имеет $\\log_{x+4}(4x^2+12x+9)+\\log_{2x+3}(6x^2+17x+12)=4$?",
    options: ["1", "2", "3", "Действительных решений нет"],
    correctAnswer: 2,
  },
  {
    id: 16,
    type: "single_choice",
    question: "Сколько действительных корней имеет $x^2-(3+\\sqrt3)x+3=0$?",
    options: ["1", "2", "3", "Действительных решений нет"],
    correctAnswer: 3,
  },
  {
    id: 17,
    type: "single_choice",
    question:
      "Сколько целых чисел не удовлетворяет неравенству $(x^2+1)^{x-2}(x+2)>(x^2+1)^2$?",
    options: ["8", "7", "6", "5"],
    correctAnswer: 1,
  },
  {
    id: 18,
    type: "single_choice",
    question: "Решите неравенство $(x^3-1)/(2x^2-3x+1)>1$.",
    options: [
      "$(0;1/2)\\cup(1;\\infty)$",
      "$(1/2;1)\\cup(1;\\infty)$",
      "$(1/4;1)\\cup(1;\\infty)$",
      "$(0;1)\\cup(1;\\infty)$",
    ],
    correctAnswer: 1,
  },
  {
    id: 19,
    type: "single_choice",
    question: "Найдите сумму всех решений неравенства $6/(\\sqrt{x}+1)>2$.",
    options: ["4", "6", "5", "3"],
    correctAnswer: 1,
  },
  {
    id: 20,
    type: "single_choice",
    question:
      "Если $f(x)=(2+x)(2x+1/x)$, найдите величину, указанную в оригинальном задании.",
    options: ["$1/2$", "$2/7$", "$12/7$", "$15/12$"],
    correctAnswer: 0,
  },
  {
    id: 21,
    type: "single_choice",
    question: "Вычислите $\\int_0^{\\pi/2}\\frac{dx}{12\\cos x-5\\sin x+13}$.",
    options: ["$1/5$", "$1/2$", "$1/10$", "$1$"],
    correctAnswer: 2,
  },
  {
    id: 22,
    type: "single_choice",
    question:
      "Для $f(x)=x^3-x^2-7x+6$ найдите угол наклона касательной к графику в точке $x_0=2$.",
    options: ["30°", "45°", "60°", "75°"],
    correctAnswer: 1,
  },
  {
    id: 23,
    type: "single_choice",
    question:
      "$ABC$ — прямоугольный треугольник, в него вписана окружность с центром $O$. Если $AB=DC$, $BD=4$, $AC=9$, найдите $AD$.",
    image: "/images/5-oct2025_2/23.jpeg",
    options: ["$\\sqrt{25}$", "$\\sqrt{30}$", "$\\sqrt{31}$", "$\\sqrt{26}$"],
    correctAnswer: 1,
  },
  {
    id: 24,
    type: "single_choice",
    question:
      "Найдите наименьшее значение выражения из задания 24 на указанном в оригинале отрезке.",
    options: ["5", "9", "8", "10"],
    correctAnswer: 2,
  },
  {
    id: 25,
    type: "single_choice",
    question:
      "По рисунку и данным исходного варианта найдите площадь заштрихованной области.",
    image: "/images/5-oct2025_2/25.jpeg",
    options: ["$\\sqrt3$", "$2\\sqrt3$", "$3\\sqrt3$", "$4\\sqrt3$"],
    correctAnswer: 2,
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
      "По рисунку и данным исходного варианта найдите площадь заштрихованной области.",
    image: "/images/5-oct2025_2/27.jpeg",
    options: ["5", "4", "3", "6"],
    correctAnswer: 3,
  },
  {
    id: 28,
    type: "single_choice",
    question:
      "Из диагоналей правильного пятиугольника образован внутренний правильный пятиугольник. Если $FG=2$, найдите периметр исходного пятиугольника.",
    image: "/images/5-oct2025_2/28.jpeg",
    options: ["20", "$5(3-\\sqrt5)$", "$5(3+\\sqrt5)$", "25"],
    correctAnswer: 2,
  },
  {
    id: 29,
    type: "single_choice",
    question:
      "На рисунке изображён правильный шестиугольник. Найдите произведение координат точки $E$.",
    image: "/images/5-oct2025_2/29.jpeg",
    options: ["8", "9", "$9\\sqrt3$", "$12\\sqrt3$"],
    correctAnswer: 3,
  },
  {
    id: 30,
    type: "single_choice",
    question:
      "В прямоугольный треугольник с катетами $AC=15$, $BC=20$ из $C$ проведён перпендикуляр $CD=35$ к плоскости. Найдите кратчайшее расстояние от $D$ до $AB$.",
    options: ["36", "37", "40", "39"],
    correctAnswer: 1,
  },
  {
    id: 31,
    type: "single_choice",
    question:
      "По диаграмме Венна найдите число элементов множества $(A\\cup B)\\cup C$ в соответствии с исходным условием.",
    image: "/images/5-oct2025_2/31.jpeg",
    options: ["8", "9", "10", "11"],
    correctAnswer: 3,
  },
  {
    id: 32,
    type: "single_choice",
    question: "Найдите сумму коэффициентов разложения $(x+2y)^5$.",
    options: ["32", "243", "432", "512"],
    correctAnswer: 1,
  },
  {
    id: 33,
    type: "matching",
    context:
      "В шар объёмом $32\\sqrt3\\pi$ вписан цилиндр. Сопоставьте задания 33–35 с вариантами A–F.",
    optionsPool: {
      A: "$16\\sqrt2\\pi$",
      B: "$64\\pi$",
      C: "$24\\pi$",
      D: "$8\\sqrt2\\pi$",
      E: "$32\\sqrt2\\pi$",
      F: "$32\\pi$",
    },
    items: [
      {
        id: 33,
        text: "Найдите наибольшее значение объёма цилиндра.",
        correctAnswer: "F",
      },
    ],
  },
  {
    id: 34,
    type: "matching",
    context:
      "В шар объёмом $32\\sqrt3\\pi$ вписан цилиндр. Сопоставьте задания 33–35 с вариантами A–F.",
    optionsPool: {
      A: "$16\\sqrt2\\pi$",
      B: "$64\\pi$",
      C: "$24\\pi$",
      D: "$8\\sqrt2\\pi$",
      E: "$32\\sqrt2\\pi$",
      F: "$32\\pi$",
    },
    items: [
      {
        id: 34,
        text: "Найдите наибольшее значение боковой поверхности цилиндра.",
        correctAnswer: "C",
      },
    ],
  },
  {
    id: 35,
    type: "matching",
    context:
      "В шар объёмом $32\\sqrt3\\pi$ вписан цилиндр. Сопоставьте задания 33–35 с вариантами A–F.",
    optionsPool: {
      A: "$16\\sqrt2\\pi$",
      B: "$64\\pi$",
      C: "$24\\pi$",
      D: "$8\\sqrt2\\pi$",
      E: "$32\\sqrt2\\pi$",
      F: "$32\\pi$",
    },
    items: [
      {
        id: 35,
        text: "Если объём цилиндра максимален, найдите площадь его боковой поверхности.",
        correctAnswer: "A",
      },
    ],
  },
  {
    id: 36,
    type: "open_ended",
    question:
      "Если система из двух уравнений имеет ровно одно действительное решение: $\\log_3(x^2y^2-a)=1+\\log_3(1-a x^2y^2)$ и $x^2y^2=|a|+1$.",
    subQuestions: [
      {
        id: "a",
        text: "а) Найдите сумму всех возможных значений $a$.",
        correctAnswer: "-3",
      },
      {
        id: "b",
        text: "б) Ответ второго пункта по исходному варианту.",
        correctAnswer: "1/2",
      },
    ],
  },
  {
    id: 37,
    type: "open_ended",
    question:
      "Решите $\\cos^2x\\cos2x+\\cos4x+\\cos3x\\cos x+2\\cos^4x=1/(2\\sin^2x)$.",
    subQuestions: [
      {
        id: "a",
        text: "а) Найдите наименьший положительный корень.",
        correctAnswer: "π/11",
      },
      {
        id: "b",
        text: "б) Найдите число решений на интервале, указанном в исходном варианте.",
        correctAnswer: "5",
      },
    ],
  },
  {
    id: 38,
    type: "open_ended",
    question:
      "$f(x)$ — линейная, $g(x)$ — квадратичная функции. Известно $f(2)=5$ и $g(x-1)=x^2+1$.",
    subQuestions: [
      {
        id: "a",
        text: "а) Найдите наименьшее значение $g(x)$.",
        correctAnswer: "1",
      },
      { id: "b", text: "б) Вычислите $f^{-1}(g(1))$.", correctAnswer: "2" },
    ],
  },
  {
    id: 39,
    type: "open_ended",
    question: "$f(x)=e^{ax^2+bx+1}$ и выполнено условие $f(1)=f(0)=f'(0)$.",
    subQuestions: [
      { id: "a", text: "а) Найдите $a$.", correctAnswer: "-1" },
      {
        id: "b",
        text: "б) Если на $[-1,5;2]$ максимум $f(x)$ равен $m$, найдите $\\ln m$.",
        correctAnswer: "5/4",
      },
    ],
  },
  {
    id: 40,
    type: "open_ended",
    question:
      "$f(x)=ax^2+bx+c$ и $g(x)=-|x+m|+n$. По рисунку ось симметрии равна 4.",
    image: "/images/5-oct2025_2/40.jpeg",
    subQuestions: [
      { id: "a", text: "а) Найдите $n-m$.", correctAnswer: "9" },
      {
        id: "b",
        text: "б) Найдите площадь заштрихованной области.",
        correctAnswer: "19/3",
      },
    ],
  },
  {
    id: 41,
    type: "open_ended",
    question:
      "В прямоугольном треугольнике $ABC$ внутри находятся две одинаковые касающиеся окружности радиуса 5 см. Гипотенуза $BC=35$ см.",
    image: "/images/5-oct2025_2/41.jpeg",
    subQuestions: [
      {
        id: "a",
        text: "а) Найдите требуемый в исходном варианте параметр.",
        correctAnswer: "145 1/24",
      },
      { id: "b", text: "б) Найдите площадь $ABC$.", correctAnswer: "294" },
    ],
  },
  {
    id: 42,
    type: "open_ended",
    question:
      "Четырёхугольник имеет вершины $A(2;2\\sqrt3)$, $B(5;5\\sqrt3)$, $C(9;3\\sqrt3)$, $D(3;\\sqrt3)$. Если $\\angle BAD=\\beta$.",
    image: "/images/5-oct2025_2/42.jpeg",
    subQuestions: [
      { id: "a", text: "а) Найдите $\\sin\\beta$.", correctAnswer: "√3/2" },
      { id: "b", text: "б) Найдите площадь $ABCD$.", correctAnswer: "13√3" },
    ],
  },
  {
    id: 43,
    type: "open_ended",
    question:
      "В пятиугольнике $ABCDE$ точки $M,K,N,L$ — середины $AB,BC,CD,DE$. $P$ — середина $MN$, $T$ — середина $KL$. Если $AP=AE=12$ и $\\angle PAE=60^\\circ$.",
    image: "/images/5-oct2025_2/43.jpeg",
    subQuestions: [
      { id: "a", text: "а) Найдите $PT$.", correctAnswer: "3" },
      {
        id: "b",
        text: "б) Найдите площадь четырёхугольника $APTE$.",
        correctAnswer: "45√3",
      },
    ],
  },
  {
    id: 44,
    type: "open_ended",
    question:
      "Из цилиндрической заготовки радиуса 3 выточили конус и полушар. Если образующая конуса равна 5.",
    image: "/images/5-oct2025_2/44.jpeg",
    subQuestions: [
      {
        id: "a",
        text: "а) Найдите величину из пункта a) исходного варианта.",
        correctAnswer: "75π",
      },
      {
        id: "b",
        text: "б) Найдите первоначальный объём заготовки.",
        correctAnswer: "63π",
      },
    ],
  },
  {
    id: 45,
    type: "open_ended",
    question:
      "Из точки $A$ на суше до точки $T$ в воде 150 м. $AB=200$ м. Анвар идёт от $B$ по берегу со скоростью 150 м/мин, затем плывёт от точки $C$ со скоростью 75 м/мин.",
    image: "/images/5-oct2025_2/45.jpeg",
    subQuestions: [
      {
        id: "a",
        text: "а) Найдите минимальное время в пути, округлив до целого.",
        correctAnswer: "3",
      },
      {
        id: "b",
        text: "б) Найдите минимальную длину пути, считая $\\sqrt3\\approx1,7$.",
        correctAnswer: "285",
      },
    ],
  },
];
