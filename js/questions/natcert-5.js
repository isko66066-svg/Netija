var questions = [
    {
        id: 1,
        question: "8962ab ko‘rinishidagi son 12 ga qoldiqsiz bo‘linsa, a·b ning eng katta qiymatini toping.",
        type: "single_choice",
        options: ["72", "48", "64", "54"],
        correctAnswer: 1
    },
    {
        id: 2,
        question: "Hisoblang: $\\frac{45\\frac{10}{63}-44\\frac{25}{84}}{\\left(2\\frac13-1\\frac19\\right):4-\\frac34}:\\frac{31}{32}$",
        type: "single_choice",
        options: ["2", "-2", "$\\frac12$", "$-\\frac12$"],
        correctAnswer: 1
    },
    {
        id: 3,
        question: "Birinchi sonning 10% iga ikkinchi sonning $\\frac16$ qismi qo‘shilgani, birinchi sonning yarmidan ikkinchi sonning yarmini ayirganimizga teng. Birinchi sonning ikkinchi songa nisbatini toping.",
        type: "single_choice",
        options: ["$\\frac35$", "$\\frac53$", "$\\frac56$", "$\\frac65$"],
        correctAnswer: 1
    },
    {
        id: 4,
        question: "O‘quvchi ikkita kitobni 205000 so‘mga sotib oldi. Agar birinchi kitob narxi 15% ga kamaytirilsa va ikkinchi kitob narxi 20% ga oshirilsa, u holda kitoblarning yangi narxlari o‘zaro teng bo‘ladi. Birinchi kitobning narxi ikkinchi kitob narxidan necha so‘mga qimmat ekanini aniqlang.",
        type: "single_choice",
        options: ["30000", "35000", "45000", "40000"],
        correctAnswer: 1
    },
    {
        id: 5,
        question: "Hisoblang: $(-1^2)^3+(-1^3)^4+\\ldots+(-1^{99})^{100}$",
        type: "single_choice",
        options: ["0", "98", "50", "-1"],
        correctAnswer: 0
    },
    {
        id: 6,
        question: "Sonlarni kamayish tartibida joylashtiring: $a=\\sqrt8+\\sqrt3$, $b=\\sqrt6+2$, $c=2\\sqrt3+\\sqrt2$.",
        type: "single_choice",
        options: ["$a>b>c$", "$b>a>c$", "$b>c>a$", "$c>a>b$"],
        correctAnswer: 3
    },
    {
        id: 7,
        question: "Hisoblang: $\\sqrt[3]{26+15\\sqrt3}+\\sqrt[3]{26-15\\sqrt3}$.",
        type: "single_choice",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2
    },
    {
        id: 8,
        question: "$n$ ta hadli arifmetik progressiyaning $n$ ta hadi o‘rta arifmetigi $2n$ ga teng bo‘lsa, arifmetik progressiyaning o‘ninchi hadini toping.",
        type: "single_choice",
        options: ["38", "20", "40", "36"],
        correctAnswer: 0
    },
    {
        id: 9,
        question: "Geometrik progressiyada $b_1+b_2+b_3=70$ va $b_1\\cdot b_2\\cdot b_3=8000$ bo‘lsa, dastlabki beshta hadining yig‘indisini toping.",
        type: "single_choice",
        options: ["310 yoki 77,5", "310 yoki 77,25", "330 yoki 77,25", "330 yoki 77,5"],
        correctAnswer: 0
    },
    {
        id: 10,
        question: "Ifodani soddalashtiring: $\\frac{x+2y-\\frac{4x^2-y^2}{x}}{y^3+2xy^2-3x^2y}$.",
        type: "single_choice",
        options: ["$\\frac1y$", "$\\frac{x}{y}$", "$\\frac1x$", "$\\frac1{xy}$"],
        correctAnswer: 3
    },
    {
        id: 11,
        question: "Agar $x>0$ bo‘lsa, ifodani soddalashtiring: $\\frac{\\sqrt{\\frac12\\left(\\frac{x^2-2}{2x}\\right)^2+1}}{\\frac1{2x}(x^2+2)}$.",
        type: "single_choice",
        options: ["2", "$\\frac1{\\sqrt2}$", "1", "$\\sqrt2$"],
        correctAnswer: 0
    },
    {
        id: 12,
        question: "Agar $\\sin\\alpha=-\\frac45\\;(\\frac{3\\pi}{2}<\\alpha<2\\pi)$ bo‘lsa, $\\cos\\alpha$ ni toping.",
        type: "single_choice",
        options: ["$\\frac35$", "$-\\frac35$", "$\\frac5{13}$", "$-\\frac5{13}$"],
        correctAnswer: 0
    },
    {
        id: 13,
        question: "Tenglama $\\left[-\\frac\\pi2;\\pi\\right]$ oraliqda nechta yechimga ega? $\\sqrt3\\sin^2x+\\sin^22x=\\frac{\\sqrt3}{2}-\\frac12-\\sqrt3\\cos2x$",
        type: "single_choice",
        options: ["1", "2", "3", "5"],
        correctAnswer: 2
    },
    {
        id: 14,
        question: "Tengsizlikni nechta butun son qanoatlantiradi? $\\left(\\frac12\\right)^{x^2+3x}-\\frac{2^{-x}}8>0$",
        type: "single_choice",
        options: ["2", "3", "4", "cheksiz ko‘p"],
        correctAnswer: 1
    },
    {
        id: 15,
        question: "Tengsizlikni nechta butun son qanoatlantiradi? $\\log_{0,5}\\log_2\\log_{x-1}9>0$",
        type: "single_choice",
        options: ["cheksiz ko‘p", "7 ta", "3 ta", "5 ta"],
        correctAnswer: 3
    },
    {
        id: 16,
        question: "Tenglama nechta haqiqiy ildizga ega? $\\frac4{(x+6)(x-1)}-\\frac5{(x+2)(x+3)}=\\frac14$",
        type: "single_choice",
        options: ["1", "2", "3", "4"],
        correctAnswer: 1
    },
    {
        id: 17,
        question: "Tenglama nechta haqiqiy ildizga ega? $(x-6)^4+(x-8)^4=16$",
        type: "single_choice",
        options: ["1", "2", "3", "4"],
        correctAnswer: 1
    },
    {
        id: 18,
        question: "Tengsizlikni nechta butun son qanoatlantiradi? $\\frac{x^2-1}{x^2+1}+x^2-2x+1\\le0$",
        type: "single_choice",
        options: ["0", "1", "2", "3"],
        correctAnswer: 2
    },
    {
        id: 19,
        question: "Nechta natural son tengsizlikning yechimi bo‘la olmaydi? $x(x-3)^2>0$",
        type: "single_choice",
        options: ["1", "2", "3", "cheksiz ko‘p"],
        correctAnswer: 0
    },
    {
        id: 20,
        question: "Agar $f(x)=\\ln x+\\ln3$ va $g(x)=2e^x$ bo‘lsa, $g(f(3))$ ni hisoblang.",
        type: "single_choice",
        options: ["8", "9", "18", "36"],
        correctAnswer: 2
    },
    {
        id: 21,
        question: "Aniq integralni hisoblang: $\\int_{-1}^{1}\\frac{x^4}{x^2+1}\\,dx$.",
        type: "single_choice",
        options: ["$\\frac43-\\frac\\pi2$", "$\\frac43$", "0", "$\\frac\\pi2-\\frac43$"],
        correctAnswer: 3
    },
    {
        id: 22,
        question: "$y=\\frac1{x^2+4}$ funksiyaga grafiga o‘tkazilgan urinma abssissa o‘qiga parallel bo‘ladi. Urinish nuqtasining koordinatalari yig‘indisini toping.",
        type: "single_choice",
        options: ["1", "$\\frac12$", "$\\frac34$", "$\\frac14$"],
        correctAnswer: 3
    },
    {
        id: 23,
        question: "Aylanaga kvadrat ichki chizilgan. Aylana radiusi $\\sqrt6$ ga teng bo‘lsa, kvadrat yuzini toping.",
        image: "images/2-mart_1-img/23.svg",
        type: "single_choice",
        options: ["6", "12", "24", "18"],
        correctAnswer: 1
    },
    {
        id: 24,
        question: "$f(x,y,z)=\\frac{x^2+1}{x^2-1}+\\frac{2y^2-1}{2y^2+1}+\\frac{4z^2-1}{4z^2+1}$, $|a|>1$, $-1<b\\le1$ va $-1\\le c<1$ funksiya berilgan. Funksiyaning $x=\\frac{\\sqrt{a^2-1}}{a-1}$, $y=\\sqrt{\\frac{1-b}{2+2b}}$, $z=\\frac{\\sqrt{1-c^2}}{2(c-1)}$ bo‘lgandagi qiymatini toping.",
        type: "single_choice",
        options: ["$a+b+c$", "-1", "$\\frac{a+b+c}{2}$", "1"],
        correctAnswer: 0
    },
    {
        id: 25,
        question: "Uchburchakning eng katta tomoni 8 ga, yon tomonlari esa $(3x-4)$ va $(2x+1)$ ga teng. Agar uchburchakning tomonlari butun sonlardan iborat bo‘lsa, uchburchak perimetrini toping.",
        image: "images/2-mart_1-img/25.svg",
        type: "single_choice",
        options: ["16", "17", "18", "20"],
        correctAnswer: 3
    },
    {
        id: 26,
        question: "Rasmdagi ma’lumotlar asosida $\\alpha$ burchakni toping.",
        image: "images/2-mart_1-img/26.svg",
        type: "single_choice",
        options: ["18°", "22,5°", "15°", "36°"],
        correctAnswer: 2
    },
    {
        id: 27,
        question: "$ABCD$ teng yonli trapetsiyada $KL$ o‘rta chiziq o‘tkazilgan. Trapetsiyaning $C$ uchidan $AD$ katta asosiga $CH$ balandlik tushirildi. $CH$ balandlik $KL$ o‘rta chiziqni $O$ nuqtada kesib o‘tadi. Agar $KL=48$ va $KO:OL=5:1$ bo‘lsa, $AD$ katta asosini toping.",
        image: "images/2-mart_1-img/27.svg",
        type: "single_choice",
        options: ["54", "56", "64", "72"],
        correctAnswer: 2
    },
    {
        id: 28,
        question: "Qavariq $n$ burchakning diagonallari soni 25 dan kichik emas va 30 dan katta emas. $n$ ning qiymatini toping.",
        type: "single_choice",
        options: ["9", "6", "11", "7"],
        correctAnswer: 0
    },
    {
        id: 29,
        question: "Uchlari $A(1;-1;-1)$, $B(2;2;1)$ va $C(3;3;3)$ nuqtalarda bo‘lgan $ABC$ uchburchak berilgan. $ABC$ uchburchakda $AC$ asosga $BD$ mediana tushirilgan. $\\cos\\angle BDC$ ni toping.",
        type: "single_choice",
        options: ["0", "$\\frac23$", "$\\frac13$", "$\\frac32$"],
        correctAnswer: 1
    },
    {
        id: 30,
        question: "$\\alpha$ tekislikdan tashqarida joylashgan $A$ nuqtadan ushbu tekislikka $AB$ va $AC$ og‘malar hamda $AH$ perpendikulyar tushirilgan. Bu yerda $H$ — perpendikulyarning asos nuqtasi bo‘lib, $B$, $C$ va $H$ nuqtalar $\\alpha$ tekislikda yotadi. Agar $AH=4$, $\\angle ABH=45°$, $\\angle ACH=60°$, $\\angle BHC=60°$ bo‘lsa, $AHBC$ piramidaning hajmini toping.",
        type: "single_choice",
        options: ["$6\\frac23$", "$5\\frac23$", "$5\\frac13$", "$6\\frac13$"],
        correctAnswer: 2
    },
    {
        id: 31,
        question: "$A$ to‘plamga 1 element qo‘shilgandagi qism to‘plamlar soni $A$ to‘plamning 1 ta element olinadigan qism to‘plamlar sonidan 12 ga ko‘p bo‘lsa, $A$ to‘plamning qism to‘plamlari soni nechta?",
        type: "single_choice",
        options: ["4", "8", "16", "32"],
        correctAnswer: 1
    },
    {
        id: 32,
        question: "1000 gacha bo‘lgan natural sonlar ichida 11 ga qoldiqsiz bo‘linadigan va 2 ga ham 3 ga ham qoldiqsiz bo‘linmaydigan sonlar nechta?",
        type: "single_choice",
        options: ["90", "75", "45", "30"],
        correctAnswer: 3
    },
    {
        id: "33-35",
        type: "matching",
        question: "Topshiriqlar (33-35) va javob variantlari (A-F) ni o‘zaro moslashtiring. Asosining radiusi 6 cm bo‘lgan silindrga konus ichki chizilgan, konusga esa shar ichki chizilgan. Konusning asosi va uchi silindr asoslari markazlarida yotadi. Agar konus yon sirti $60\\pi\\,cm^2$ ga teng bo‘lsa,",
        items: [
            { id: "33", text: "Silindr va konus to‘la sirtlarining ayirmasini toping.", correctAnswer: "D" },
            { id: "34", text: "Silindr va konus hajmlari ayirmasini toping.", correctAnswer: "E" },
            { id: "35", text: "Shar hajmini toping.", correctAnswer: "A" }
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
        question: "Tenglamani yeching: $\\sqrt{x}+2x+2=(x+3)\\sqrt[4]{x}$",
        subQuestions: [
            { id: "a", text: "Tenglama nechta haqiqiy ildizga ega?", correctAnswer: "1" },
            { id: "b", text: "Tenglamaning haqiqiy ildizlari yig‘indisini toping.", correctAnswer: "16" }
        ]
    },
    {
        id: 37,
        type: "open_ended",
        question: "Tenglamani yeching: $\\sin^3x(1+\\operatorname{ctg}x)+\\cos^3x(1+\\operatorname{tg}x)=2\\sqrt{\\sin x\\cos x}$",
        subQuestions: [
            { id: "a", text: "Tenglamaning eng kichik musbat yechimini toping.", correctAnswer: "$\\frac\\pi4$" },
            { id: "b", text: "Tenglama $\\left[-\\frac{5\\pi}{2};\\frac{5\\pi}{2}\\right]$ oraliqda nechta yechimga ega?", correctAnswer: "3" }
        ]
    },
    {
        id: 38,
        type: "open_ended",
        question: "$f(x)=\\frac{4x^2}{4x^4+1}$ funksiya berilgan.",
        subQuestions: [
            { id: "a", text: "Funksiyaning eng katta qiymatini toping.", correctAnswer: "1" },
            { id: "b", text: "Funksiyaning qiymatlar sohasiga nechta butun son tegishli?", correctAnswer: "2" }
        ]
    },
    {
        id: 39,
        type: "open_ended",
        question: "$f(x)=\\operatorname{arctg}2^{x-1013}$ funksiya berilgan.",
        subQuestions: [
            { id: "a", text: "$f(0)+f(1)+\\ldots+f(2026)$ ni toping.", correctAnswer: "$\\frac{2027\\pi}{4}$" },
            { id: "b", text: "$f'(1013)$ ni toping.", correctAnswer: "$\\frac{\\ln2}{2}$" }
        ]
    },
    {
        id: 40,
        type: "open_ended",
        question: "Rasmda $f(x)=\\frac2x$, $y_1=0$, $y_2=2$, $x_1=0$ va $x_2=2$ funksiya grafiklari tasvirlangan.",
        image: "images/2-mart_1-img/40.svg",
        subQuestions: [
            { id: "a", text: "Bo‘yalgan soha yuzini toping.", correctAnswer: "$2+\\ln4$" },
            { id: "b", text: "Bo‘yalgan sohani $OX$ o‘qi atrofida $360°$ ga aylantirishdan hosil bo‘lgan jism hajmini toping. ($\\pi\\approx3$ deb oling.)", correctAnswer: "18" }
        ]
    },
    {
        id: 41,
        type: "open_ended",
        question: "$ABC$ uchburchakning $AC$ asosidan $D$ nuqta tanlab olinib $B$ uchi bilan tutashtirildi. $ABD$ va $BDC$ uchburchaklarga mos ravishda $O_1$ va $O_2$ markazli aylanalar ichki chizilgan. Agar $AB=10$, $BC=14$, $AD=10$ va $DC=6$ bo‘lsa,",
        image: "images/2-mart_1-img/41.svg",
        subQuestions: [
            { id: "a", text: "$BD$ kesma uzunligini toping.", correctAnswer: "10" },
            { id: "b", text: "$O_1O_2D$ uchburchak yuzini toping.", correctAnswer: "$\\frac{10\\sqrt3}{3}$" }
        ]
    },
    {
        id: 42,
        type: "open_ended",
        question: "$ABCD$ qavariq to‘rtburchakning $AB$, $BC$ va $CD$ tomonlaridan mos ravishda $E$, $F$, $G$ nuqtalar olindi. Bunda $AE:EB=CF:FB=CG:GD=3:4$, $EF=8$, $FG=6$ va $EF\\perp FG$ bo‘lsa,",
        image: "images/2-mart_1-img/42.svg",
        subQuestions: [
            { id: "a", text: "$EFG$ uchburchak yuzini toping.", correctAnswer: "24" },
            { id: "b", text: "$ABCD$ to‘rtburchak yuzini toping.", correctAnswer: "98" }
        ]
    },
    {
        id: 43,
        type: "open_ended",
        question: "Asosi tomonlari 3 va 5 ga teng bo‘lgan $ABCD$ trapetsiyaga markazlari $O_1$ va $O_2$ bo‘lgan aylanalar ichki va tashqi chizilgan. $O_1$ markazli aylana $AB$ va $CD$ yon tomonlarga $E$ va $F$ nuqtalarda urinadi.",
        image: "images/2-mart_1-img/43.svg",
        subQuestions: [
            { id: "a", text: "$BCFO_1E$ beshburchak yuzini toping.", correctAnswer: "$\\frac{3\\sqrt{15}}{2}$" },
            { id: "b", text: "$AEO_1FDO_2$ oltiburchak yuzini toping.", correctAnswer: "$\\frac{19\\sqrt{15}}{12}$" }
        ]
    },
    {
        id: 44,
        type: "open_ended",
        question: "Barcha yon qirralari teng bo‘lgan piramida shar ichiga chizilgan. Piramidaning asosi teng yonli trapetsiyadan iborat. Trapetsiyaning yon tomonlari 3 ga, asoslari esa 5 va 8 ga teng. Piramida yon qirrasi $\\frac{14\\sqrt3}{3}$ ga teng bo‘lsa,",
        subQuestions: [
            { id: "a", text: "Piramida balandligini toping.", correctAnswer: "7" },
            { id: "b", text: "Shar radiusini toping.", correctAnswer: "$\\frac{14}{3}$" }
        ]
    },
    {
        id: 45,
        type: "open_ended",
        question: "Rasmda $AB$ qiyalik orqali jism $C$ nuqtaga qarab tortilmoqda. $AB$ qiyalikda 9 km/soat, $BC$ tekislikda esa 15 km/soat tezlik bilan tortilmoqda. Bunda $AC=50\,m$, $DC=30\,m$ va $\\angle BAD=\\alpha$. $A$ nuqtadagi jism eng qisqa vaqt ichida $C$ nuqtaga tortib borildi.",
        image: "images/2-mart_1-img/45.svg",
        subQuestions: [
            { id: "a", text: "$\\cos\\alpha$ ni toping.", correctAnswer: "$\\frac35$" },
            { id: "b", text: "Eng kam vaqtni toping (soat).", correctAnswer: "$\\frac2{375}$" }
        ]
    }
];