function select(selector){
   return document.querySelector(selector)
};

const body = select("body");
const controlButton = select("#control-button");
const timer = select("#timer");
const cycles = select("#cycles");
const noticeToUser = select('#notice-user');

let totalTime = 10000;
let restTime = 5000;
let longerRestTime = 8000;
let timeLeft = totalTime/1000;

let cycleCount = 0;
let counter;
let timeOut;
let bodyHue = 0;
let rate = 120/(totalTime/1000);

/* 
   const audio1 = new Audio('url');
   const audio2 = new Audio('url');
   const audio3 = new Audio('url');
   const audio4 = new Audio('url');

   audio1.play() etc

   Fazer audio para inicio do foco, fim do foco, inicio do descanso, fim do descanso
 */

controlButton.addEventListener("click", (e) => pomodoroEngine(e.target.innerText));

//estado
//mudanoticeToUser: mensagem
//muda controlButton: mensagem
//muda conteudo do timer
//aumenta o ciclo ou nao
// funcao define contagem regressiva
// funcao decresce segundos

const pomodoroStages = [
   {
      stage: 'START',
      noticeToUser: 'Concentre-se',
      buttonText: 'pause',
      timer: '',
      action: () => 'handle cycle, clear intervale ',

   }
];



//refazer como objeto
function pomodoroEngine(buttonContent){
   const currentStage = pomodoroStages.filter(stage => stage.stage === buttonContent)[0];
   noticeToUser.innerText = currentStage.noticeToUser;
   controlButton.innerText = currentStage.buttonText;
   
   
   /* if(controlButton.innerText==='START'){
      noticeToUser.innerText = "Concentre-se";
      controlButton.innerText = 'pause';
      timer.innerText = formatTime(timeLeft);
      cycleCount++;
      cycles.innerText = cycleCount;
      clearInterval(counter);
      clearTimeout(timeOut);
      counter = setInterval(() => {      
         
         
         bodyHue += rate;
         body.style.backgroundColor = `hsl(${bodyHue}, 50%, 25%)`;
         controlButton.style.backgroundColor = `hsl(${bodyHue}, 50%, 25%)`;    
         timeLeft--;
         timer.innerText = formatTime(timeLeft);
      }, "1000");

      setsCountdown();

   } else if(controlButton.innerText==='PAUSE'){
      noticeToUser.innerText = "Tempo pausado";
      controlButton.innerText = 'restart';      
      clearInterval(counter);
      clearTimeout(timeOut);

   } else if(controlButton.innerText==='RESTART'){
      noticeToUser.innerText = "Concentre-se";
      controlButton.innerText = 'pause';      

      counter = setInterval(() => {      
         bodyHue += rate;
         body.style.backgroundColor = `hsl(${bodyHue}, 50%, 25%)`;
         controlButton.style.backgroundColor = `hsl(${bodyHue}, 50%, 25%)`;   
         timeLeft--;
         timer.innerText = formatTime(timeLeft); 
      }, "1000");

      setsCountdown();
   
   } else if(controlButton.innerText==='REST'){
      noticeToUser.innerText = "Começou seu descanso";
      controlButton.innerText = 'start';
      let totalRestTime = cycleCount % 4 === 0 ? longerRestTime : restTime;
      let restTimeLeft = totalRestTime / 1000;
      timer.innerText = formatTime(restTimeLeft);
      counter = setInterval(() => {
         let restRate = 120/(totalRestTime/1000);
         bodyHue -= restRate;
         body.style.backgroundColor = `hsl(${bodyHue}, 50%, 25%)`;
         controlButton.style.backgroundColor = `hsl(${bodyHue}, 50%, 25%)`; 
         restTimeLeft--;
         timer.innerText = formatTime(restTimeLeft); 
      }, "1000");

      timeOut = setTimeout(() => {      
         console.log("Acabou o Descanso!");
         clearInterval(counter);
         noticeToUser.innerText = "Seu descanso acabou. Comece mais um foco"
      }, restTimeLeft * 1000);
   } */
};

//mudar nome para define contagem regressiva
function setsCountdown(){
   timeOut = setTimeout(() =>
      {
         clearInterval(counter);
         noticeToUser.innerText = "Seu Pomodoro acabou. Descanse um pouco";
         controlButton.innerText = 'rest';
         timeLeft = totalTime / 1000;
      }, timeLeft * 1000);
}

function formatTime(time){
   let minutes = Math.floor(time / 60);
   let seconds = time % 60;
   return `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`
}
