const username =  document.getElementById("username");
const  saveScoreBtn =  document.getElementById("saveScoreBtn");
const  mostRecentScore =  localStorage.getItem("mostRecentScore");
const  finalScore =  document.getElementById("finalScore");
// enregistre dans  localStorage comme  une  chaine
//localStorage.setItem('heightScores', JSON.stringify([]))
//convertir  à un  tableau 
//console.log(JSON.parse(localStorage.getItem('heightScores')));
const  highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const  MAX_HIGH_SCORES = 5; 
finalScore.innerText =  mostRecentScore;
username.addEventListener("keyup", ()=>{
 saveScoreBtn.disabled = !username.value;
 console.log(!username.value);
});
saveHighScore =  e => {
    console.log("clicked the  save  button ! ");
    e.preventDefault();
    const  score = {
        score: Math.floor(Math.random()*100),
        name:  username.value
    };
    highScores.push(score);
    //localStorage.setItem('highSCores', JSON.stringify(highSCores));
   // console.log(highSCores);
   highScores.sort((a,b)=>b.score -a.score);
   highScores.splice(5);
   localStorage.setItem('highScores', JSON.stringify(highScores));
   window.location.assign('/');
   console.log(highScores);
}
