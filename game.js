const  question  =  document.getElementById("question");
const  choices = Array.from(document.getElementsByClassName("choice-text"));
const  progressText =  document.getElementById("progressText");
const  scoreText =  document.getElementById("score");
const  progressBarFull =  document.getElementById("progressBarFull");
const  loader =  document.getElementById("loader");
const game =  document.getElementById("game");


let currentQuestion = {};
let  acceptingAnswer =  false;
let score = 0;
let  questionCounter = 0;
let  availableQuestions = []; 
let  questions = [];
//fetch API
fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple").then(res => {
   
    return  res.json();

}).then(lodedQuestions => {
   // console.log(lodedQuestions);
    questions =  lodedQuestions.results.map( lodedQuestion =>{
        const  formattedQusetion = {
            question :  lodedQuestion.question
        }
        //console.log(formattedQusetion);
        const  answerChoices = [...lodedQuestion.incorrect_answers];
       // console.log(answerChoices);
       formattedQusetion.answer = Math.floor(Math.random()*3)+1;
       //console.log(formattedQusetion.answer);
       //array.splice(index, howmany, item1, ....., itemX)
       answerChoices.splice(formattedQusetion.answer-1,0,lodedQuestion.correct_answer);
       answerChoices.forEach((choice,index)=>{
           formattedQusetion["choice" +(index+1)] =  choice;
           //console.log(formattedQusetion);
       });
       return formattedQusetion;
    });
    //questions = lodedQuestions;
   
    startGame();
}).catch(err => {
console.error(err);
});
//contsantes
const  CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;
 // fonction 
 startGame =  () => {
     questionCounter = 0;
     score = 0;
     //mettre le  contenu du  tableau  dans l'autre
     availableQuestions = [...questions];
     getNewQuestion();
     game.classList.remove("hidden");
     loader.classList.add("hidden");
 }
 getNewQuestion =  () => {
     if(availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS)
     {
         // aller   a  un  autre  page 
         localStorage.setItem("mostRecentScore",score);
         return window.location.assign("/end.htm");
        }
     questionCounter++;
     progressText.innerText = ` Question ${questionCounter}/${MAX_QUESTIONS}`;
     //progressBarFull
     console.log((questionCounter/MAX_QUESTIONS)*100);
     progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;
     // floor  pour le  rendre integer  random aléatoire  =3  un  valeur  entre  0 et  3
     const questionIndex =  Math.floor(Math.random() * availableQuestions.length);
     console.log(availableQuestions.length);
     console.log("****");
     //numéro  de  question  aléatoire
     console.log(questionIndex);
     currentQuestion =  availableQuestions[questionIndex];
     //innerText retour  un  text 
     question.innerText =  currentQuestion.question;
     choices.forEach( choice =>  {
         const  number =  choice.dataset["number"];
         choice.innerText =  currentQuestion["choice" + number];

     });
     // ajouter  un  élément  au  tableau  dans  la  position  est  questionIndex
     availableQuestions.splice(questionIndex, 1);
     acceptingAnswer =  true;
 }
 choices.forEach(choice => {
     choice.addEventListener('click', e => {
         console.log(e.target);
         if(!acceptingAnswer) return;
         acceptingAnswer =false;
         const selectedChoice = e.target;
         const selectedAnswer =  selectedChoice.dataset["number"];
         /*let  classToApply =  'incorrect';
         if(selectedAnswer == currentQuestion.answer)
         {
            classToApply =  'correct';
            
         }
         console.log( classToApply);*/
         // if  ==  correct sinon  incorrect 
         const  classToApply =  selectedAnswer == currentQuestion.answer ? 'correct' :  'incorrect' ;
         //console.log(classToApply);
         //console.log(selectedAnswer , currentQuestion.answer);
         //console.log(selectedChoice);
         //ajout  d'un  class
         if(classToApply == "correct")
         {
             incrementScore(CORRECT_BONUS);
         }
         selectedChoice.parentElement.classList.add(classToApply);
         
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            },1000);
                    
     });
 });
 incrementScore =  num => {
     score+=num;
     scoreText.innerText =  score;
 }
