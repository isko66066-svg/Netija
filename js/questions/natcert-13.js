// Национальный сертификат — 05.10.2025, 1 смена.
// Ответы сверены по листу ключей из исходного PDF.
var questions = [];
const answers = [3,1,2,0,0,1,3,2,3,2,2,1,3,1,1,1,2,3,0,2,1,1,0,3,1,1,1,2,0,1,1,1];
answers.forEach((correctAnswer,index)=>questions.push({id:index+1,type:'single_choice',question:`Оригинальное задание №${index+1} из теста 05.10.2025 (см. исходный вариант).`,options:['A','B','C','D'],correctAnswer}));
questions.push({id:33,type:'matching',context:'Задания 33–35 из оригинального теста 05.10.2025.',optionsPool:{A:'A',B:'B',C:'C',D:'D',E:'E',F:'F'},items:[{id:33,text:'Выберите вариант A–F.',correctAnswer:'D'}]});
questions.push({id:34,type:'matching',context:'Задания 33–35 из оригинального теста 05.10.2025.',optionsPool:{A:'A',B:'B',C:'C',D:'D',E:'E',F:'F'},items:[{id:34,text:'Выберите вариант A–F.',correctAnswer:'A'}]});
questions.push({id:35,type:'matching',context:'Задания 33–35 из оригинального теста 05.10.2025.',optionsPool:{A:'A',B:'B',C:'C',D:'D',E:'E',F:'F'},items:[{id:35,text:'Выберите вариант A–F.',correctAnswer:'E'}]});
const open=[
[36,'1','(19+√37)/2'],[37,'10','13π/3'],[38,'1','3'],[39,'3','5,5'],[40,'12','18'],
[41,'1','18'],[42,'64','2√5'],[43,'60°','1/2'],[44,'3√5','4/5'],[45,'2√5','2√5/3']
];
open.forEach(([id,a,b])=>questions.push({id,type:'open_ended',question:`Оригинальное задание №${id} из теста 05.10.2025.`,subQuestions:[{id:'a',text:'Введите ответ пункта a).',correctAnswer:a},{id:'b',text:'Введите ответ пункта b).',correctAnswer:b}]}));
