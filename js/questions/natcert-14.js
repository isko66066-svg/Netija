// Национальный сертификат — 05.10.2025, 2 смена.
// Ответы сверены по листу ключей из исходного PDF.
var questions = [];
const answers = [3,3,2,1,2,2,2,2,2,1,0,1,1,1,0,2,3,1,1,0,2,2,1,2,2,1,3,2,3,1,3,1];
answers.forEach((correctAnswer,index)=>questions.push({id:index+1,type:'single_choice',question:`Оригинальное задание №${index+1} из теста 05.10.2025 (см. исходный вариант).`,options:['A','B','C','D'],correctAnswer}));
questions.push({id:33,type:'matching',context:'Задания 33–35 из оригинального теста 05.10.2025.',optionsPool:{A:'A',B:'B',C:'C',D:'D',E:'E',F:'F'},items:[{id:33,text:'Выберите вариант A–F.',correctAnswer:'F'}]});
questions.push({id:34,type:'matching',context:'Задания 33–35 из оригинального теста 05.10.2025.',optionsPool:{A:'A',B:'B',C:'C',D:'D',E:'E',F:'F'},items:[{id:34,text:'Выберите вариант A–F.',correctAnswer:'C'}]});
questions.push({id:35,type:'matching',context:'Задания 33–35 из оригинального теста 05.10.2025.',optionsPool:{A:'A',B:'B',C:'C',D:'D',E:'E',F:'F'},items:[{id:35,text:'Выберите вариант A–F.',correctAnswer:'A'}]});
const open=[
[36,'-3','1/2'],[37,'π/11','5'],[38,'1','2'],[39,'-1','5/4'],[40,'9','19/3'],
[41,'145 1/24','294'],[42,'√3/2','13√3'],[43,'3','45√3'],[44,'75π','63π'],[45,'3','285']
];
open.forEach(([id,a,b])=>questions.push({id,type:'open_ended',question:`Оригинальное задание №${id} из теста 05.10.2025.`,subQuestions:[{id:'a',text:'Введите ответ пункта a).',correctAnswer:a},{id:'b',text:'Введите ответ пункта b).',correctAnswer:b}]}));
