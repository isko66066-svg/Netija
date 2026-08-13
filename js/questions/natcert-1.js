const questions = [
    // --- 1–32: ТЕСТОВЫЕ ВОПРОСЫ (SINGLE CHOICE) ---
    {
        id: 1,
        type: "single_choice",
        question: "Вычислите: 666...66 (50 штук) + 555...55 (50 штук)",
        image: null,
        options: [
            "122...221 (49 двоек)",
            "122...221 (50 двоек)",
            "222...221 (49 двоек)",
            "222...221 (50 двоек)"
        ],
        correctAnswer: 0
    },
    {
        id: 2,
        type: "single_choice",
        question: "Вычислите: (2,28 − 4 7/20) : 2 1/4 − (1/2 − 1 7/8)",
        image: null,
        options: ["0,366", "0,356", "0,455", "0,466"],
        correctAnswer: 2
    },
    {
        id: 3,
        type: "single_choice",
        question: "Из городов A и B (расстояние 275 км) одновременно навстречу выехали мотоциклист (50 км/ч) и велосипедист (20 км/ч). Велосипедист отдохнул 15 мин. Найдите путь мотоциклиста до встречи.",
        image: null,
        options: ["180 км", "200 км", "160 км", "240 км"],
        correctAnswer: 1
    },
    {
        id: 4,
        type: "single_choice",
        question: "Гипотенуза прямоугольного треугольника равна 3√5. Один катет увеличили на 133 1/3%, второй — на 16 2/3%, их сумма стала 14. Найдите площадь треугольника.",
        image: null,
        options: ["9", "12", "8", "15"],
        correctAnswer: 0
    },
    {
        id: 5,
        type: "single_choice",
        question: "Вычислите: (2/3)⁻³ · (1,875)⁻¹",
        image: null,
        options: ["1 3/4", "1 3/5", "1 4/5", "1,5"],
        correctAnswer: 2
    },
    {
        id: 6,
        type: "single_choice",
        question: "Вычислите: √(666666² / 12345654321)",
        image: null,
        options: ["1", "6", "5", "12"],
        correctAnswer: 1
    },
    {
        id: 7,
        type: "single_choice",
        question: "Вычислите: ⁶√(7 − √40) · ³√(√5 + √2) · ³√9",
        image: null,
        options: ["−3", "3", "−3√3", "3√2"],
        correctAnswer: 1
    },
    {
        id: 8,
        type: "single_choice",
        question: "В арифметической прогрессии a₃ = a₁ + a₂ и a₁ · a₂ · a₃ = 384. Найдите S₁₀.",
        image: null,
        options: ["210", "180", "220", "240"],
        correctAnswer: 2
    },
    {
        id: 9,
        type: "single_choice",
        question: "В убывающей геометрической прогрессии b₁ + b₂ + b₃ = 19 и b₁² + b₂² + b₃² = 133. Вычислите S₅.",
        image: null,
        options: ["23 2/9", "23 4/9", "23 1/9", "22 7/9"],
        correctAnswer: 1
    },
    {
        id: 10,
        type: "single_choice",
        question: "Если x/y = 4 и y ≠ −3/5, найдите значение выражения: (x + y + 3) / (x + 6y + 6)",
        image: null,
        options: ["1", "1/2", "1/3", "1/4"],
        correctAnswer: 1
    },
    {
        id: 11,
        type: "single_choice",
        question: "Упростите выражение: ((1/x + 1/y + 1/xy)(x + y − 1)) / (1/x² + 1/y² + 2/xy − 1/(x²y²))",
        image: null,
        options: ["xy", "1/xy", "1/(x²y²)", "x²y²"],
        correctAnswer: 0
    },
    {
        id: 12,
        type: "single_choice",
        question: "Если cos α = 3/5 (0 < α < π/2) и a = sin α, b = tg α, c = ctg α, расположите a, b, c по возрастанию.",
        image: null,
        options: ["a < b < c", "b < a < c", "c < a < b", "a < c < b"],
        correctAnswer: 2
    },
    {
        id: 13,
        type: "single_choice",
        question: "Если cos α + √3 cos β = 0 и 2α + β = 180°, найдите |α − β|.",
        image: null,
        options: ["30°", "60°", "90°", "45°"],
        correctAnswer: 2
    },
    {
        id: 14,
        type: "single_choice",
        question: "Вычислите сумму действительных корней уравнения: 4^(x² − x) − 17 · 2^(x² − x + 2) + 256 = 0",
        image: null,
        options: ["2", "−2", "0", "1"],
        correctAnswer: 0
    },
    {
        id: 15,
        type: "single_choice",
        question: "Найдите произведение действительных корней уравнения: 2^(3 − logₓ 3) = log₃ 2 · log₃₂ x − 2/5 log_√x 3",
        image: null,
        options: ["√3/3", "9√3/3", "27√3/3", "27"],
        correctAnswer: 2
    },
    {
        id: 16,
        type: "single_choice",
        question: "Сколько целых решений имеет уравнение: x⁴ − (2027! / (2026! + 2025!)) x² + 2025 = 0?",
        image: null,
        options: ["1", "2", "3", "4"],
        correctAnswer: 3
    },
    {
        id: 17,
        type: "single_choice",
        question: "Сколько целых решений имеет уравнение: x⁴ − √|x| − 45 = 2025²?",
        image: null,
        options: ["1", "2", "3", "4"],
        correctAnswer: 1
    },
    {
        id: 18,
        type: "single_choice",
        question: "Сколько целых решений имеет неравенство: (x² − 7|x| + 10) / (x² − 6x + 9) < 0?",
        image: null,
        options: ["1", "2", "3", "4"],
        correctAnswer: 2
    },
    {
        id: 19,
        type: "single_choice",
        question: "Сколько целых чисел удовлетворяют неравенству: √(x² − 4x + 4) − 5√(2 − x) − 6 < 0?",
        image: null,
        options: ["35", "36", "37", "34"],
        correctAnswer: 1
    },
    {
        id: 20,
        type: "single_choice",
        question: "На рисунке изображен график функции f(x) = ax² + bx + c. Координаты вершины параболы равны (3; 5), и она пересекает ось Oy в точке (0; 3 1/5). Найдите значение f(18).",
        image : "images/28-feb_1-img/1-20.jpg",
        options: ["−18", "−36", "−40", "−20"],
        correctAnswer: 2
    },
    {
        id: 21,
        type: "single_choice",
        question: "Вычислите интеграл: ∫[−1, 1] (1 / (x⁴ + x²)) dx",
        image: null,
        options: ["2 − π/2", "−2 − π/2", "−2 + π/2", "0"],
        correctAnswer: 3
    },
    {
        id: 22,
        type: "single_choice",
        question: "Если 3(3x + 4)²⁰ = C₀x²⁰ + C₁x¹⁹ + ... + C₂₀, вычислите 20·19C₀ − 19·18C₁ + ... + C₁₈",
        image: null,
        options: ["9360", "10260", "11260", "10620"],
        correctAnswer: 1
    },
    {
        id: 23,
        type: "single_choice",
        question: "Хорда окружности равна 8 и стягивает дугу в 90°. Найдите радиус окружности.",
        image: null,
        options: ["4", "2√2", "4√2", "8"],
        correctAnswer: 2
    },
    {
        id: 24,
        type: "single_choice",
        question: "Сколько из представленных ниже графиков являются функциями?",
        image : "images/28-feb_1-img/1-24.jpg",
        options: ["1", "2", "3", "Все"],
        correctAnswer: 1
    },
    {
        id: 25,
        type: "single_choice",
        question: "Биссектриса прямого угла B треугольника ABC делит гипотенузу AC на отрезки √5 и 2√5. Найдите площадь ABC.",
        image: null,
        options: ["12", "9", "18", "15"],
        correctAnswer: 1
    },
    {
        id: 26,
        type: "single_choice",
        question: "В треугольнике ABC (AB=6, AE=4, EC=8) проведены биссектрисы AD и BE, пересекающиеся в K. Найдите площадь KDCE.",
        image : "images/28-feb_1-img/1-26.jpg",
        options: ["26√15/5", "12√15/5", "24√15/5", "13√15/5"],
        correctAnswer: 2
    },
    {
        id: 27,
        type: "single_choice",
        question: "Основания трапеции BC=7 и AD=27, боковые стороны AB=12 и CD=16. Найдите площадь трапеции.",
        image : "images/28-feb_1-img/1-27.jpg",
        options: ["163 1/5", "162 1/5", "161 1/5", "160 1/5"],
        correctAnswer: 0
    },
    {
        id: 28,
        type: "single_choice",
        question: "Если угол между наименьшими диагоналями правильного n-угольника равен 120°, сколько у него сторон?",
        image : "images/28-feb_1-img/1-28.jpg",
        options: ["10", "12", "8", "16"],
        correctAnswer: 1
    },
    {
        id: 29,
        type: "single_choice",
        question: "Треугольник ABC имеет вершины A(1;3), B(5;1), C(4;4). Найдите длину биссектрисы AL.",
        image : "images/28-feb_1-img/1-29.jpg",
        options: ["√(40 − 10√2)", "√(40 − 20√2)", "√(30 − 15√2)", "√(30 − 10√2)"],
        correctAnswer: 0
    },
    {
        id: 30,
        type: "single_choice",
        question: "Площадь полной поверхности правильной четырёхугольной пирамиды в 3 раза больше площади основания. Найдите tg угла наклона боковой грани.",
        image: null,
        options: ["1/2", "1/√3", "√3", "1/3"],
        correctAnswer: 2
    },
    {
        id: 31,
        type: "single_choice",
        question: "Пусть A = {делители 60}, B = {делители 48}. Найдите количество подмножеств множества A ∩ B.",
        image: null,
        options: ["16", "32", "64", "128"],
        correctAnswer: 2
    },
    {
        id: 32,
        type: "single_choice",
        question: "Трёхзначные числа с суммой цифр 7 записаны на карточках. Найдите вероятность выбрать чётное число.",
        image: null,
        options: ["1/2", "15/28", "3/4", "4/7"],
        correctAnswer: 3
    },

    // --- 33–35: ЗАДАНИЯ НА СООТВЕТСТВИЕ (MATCHING) ---
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
            "A": "1/3",
            "B": "2/3",
            "C": "1",
            "D": "3/4",
            "E": "4/9",
            "F": "2/9"
        }
    },

    // --- 36–45: ОТКРЫТЫЕ ВОПРОСЫ (OPEN ENDED) ---
    {
        id: 36,
        type: "open_ended",
        question: "Решите систему уравнений:\n26x² + 42xy + 17y² = 10\n10x² + 18xy + 8y² = 6",
        image: null,
        subQuestions: [
            {
                id: "a",
                text: "Если решениями системы уравнений являются пары (x₁, y₁), ..., (xₙ, yₙ), сколько решений имеет система?",
                correctAnswer: "4"
            },
            {
                id: "b",
                text: "Найдите наибольшее значение суммы xₙ + yₙ.",
                correctAnswer: "2"
            }
        ]
    },
    {
        id: 37,
        type: "open_ended",
        question: "Решите уравнение:\nsin³x + sin³2x + sin³3x = (sinx + sin2x + sin3x)³",
        image: null,
        subQuestions: [
            {
                id: "a",
                text: "Найдите наименьший положительный корень уравнения.",
                correctAnswer: "π/3"
            },
            {
                id: "b",
                text: "Сколько корней имеет уравнение на отрезке [−π; π]?",
                correctAnswer: "11"
            }
        ]
    },
    {
        id: 38,
        type: "open_ended",
        question: "Функция f(x) = (ax + b)/(cx + d) пересекает ось Ox в точке (3; 0). Известно, что E(y) = (−∞; 2) ∪ (2; ∞) и f(x) = f⁻¹(x).",
        image: null,
        subQuestions: [
            {
                id: "a",
                text: "Найдите число, не входящее в область определения функции f(x).",
                correctAnswer: "2"
            },
            {
                id: "b",
                text: "Найдите значение f⁻¹(6).",
                correctAnswer: "1.5"
            }
        ]
    },
    {
        id: 39,
        type: "open_ended",
        question: "Даны квадратичная функция f(x) = x²/8 − 3x/2 и уравнение окружности x² − 18x + y² − 12y + 97 = 0.",
        image : "images/28-feb_1-img/1-39.jpg",
        subQuestions: [
            {
                id: "a",
                text: "Найдите расстояние d₁ между центром окружности и вершиной параболы.",
                correctAnswer: "10.92"
            },
            {
                id: "b",
                text: "Найдите кратчайшее расстояние d₂ от параболы до окружности.",
                correctAnswer: "6.45"
            }
        ]
    },
    {
        id: 40,
        type: "open_ended",
        question: "Площадь фигуры, образованной пересечением функций f(x) = −2x² + 4x и g(x) = x² + px + q, равна 32/27. Прямая x = 4/3 делит фигуру пополам.",
        image: null,
        subQuestions: [
            {
                id: "a",
                text: "Найдите сумму абсцисс точек пересечения функций f(x) и g(x).",
                correctAnswer: "8/3"
            },
            {
                id: "b",
                text: "Найдите значение произведения p · q.",
                correctAnswer: "-10"
            }
        ]
    },
    {
        id: 41,
        type: "open_ended",
        question: "В треугольник ABC вписана окружность. Из вершины A проведена биссектриса AD. Отрезок EF || BC проходит через центр окружности. Известно: BC = 30, EB = 8, FC = 12.",
        image : "images/28-feb_1-img/1-41.jpg",
        subQuestions: [
            {
                id: "a",
                text: "Найдите длину отрезка DC.",
                correctAnswer: "18"
            },
            {
                id: "b",
                text: "Найдите модуль разности сторон |AB − AC|.",
                correctAnswer: "4"
            }
        ]
    },
    {
        id: 42,
        type: "open_ended",
        question: "Внутри квадрата ABCD взята точка P. Если AP = 1, BP = 5, PC = 7:",
        image : "images/28-feb_1-img/1-42.jpg",
        subQuestions: [
            {
                id: "a",
                text: "Найдите длину отрезка PD.",
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
        question: "На рисунке ADFK — параллелограмм, EG : GC = 1 : 2, DE : EF = 2 : 3.",
        image : "images/28-feb_1-img/1-43.jpg",
        subQuestions: [
            {
                id: "a",
                text: "Найдите отношение EG / BC.",
                correctAnswer: "1/5"
            },
            {
                id: "b",
                text: "Если S(ABC) = 242, найдите площадь параллелограмма S(ADFK).",
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
                correctAnswer: "√6/3"
            }
        ]
    },
    {
        id: 45,
        type: "open_ended",
        question: "Деревянный цилиндр имеет объем V = 162π см³ и S_бок = 72π см². Мастер выточил шар максимального объема (примите π ≈ 3).",
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