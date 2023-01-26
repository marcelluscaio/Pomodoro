function select(selector){
   return document.querySelector(selector)
};

const body = select("body");
const controlButton = select("#control-button");
const timer = select("#timer");
const cycles = select("#cycles");
const noticeToUser = select('#notice-user');

let pomodoroMs = 6000;
let shortRestMs = 5000;
let longRestMs = 15000;
let timeLeft;


let counter;
let timeOut;
let cycleCount = 0;
let bodyHue = 0;
/* let rate = 120/(totalTime/1000); */

/* 
   const audio1 = new Audio('url');
   const audio2 = new Audio('url');
   const audio3 = new Audio('url');
   const audio4 = new Audio('url');

   audio1.play() etc

   Fazer audio para inicio do foco, fim do foco, inicio do descanso, fim do descanso
 */

controlButton.addEventListener("click", (e) => pomodoroEngine(e.target.innerText));



const pomodoroStages = [
   {
      stage: 'START',
      noticeToUser: 'Concentre-se',
      buttonText: 'pause',
      action: function(){
         periodMilliseconds = pomodoroMs;
         messageAfterCountdown = 'Seu Pomodoro acabou. Descanse um pouco';
         buttonTextAfterCountdown = 'rest';    
         cycleCount++;
         cycles.innerText = cycleCount;
         periodSeconds = periodMilliseconds / 1000;
         timer.innerText = formatTime(periodSeconds);
         const directionBg = 'forward';
         const intervalChange = 120;
         decreasesSeconds(periodSeconds, directionBg, intervalChange);
         setsCountdown(periodSeconds, messageAfterCountdown, buttonTextAfterCountdown);
      }
   },
   {
      stage: 'REST',
      noticeToUser: 'Começou seu descanso',
      buttonText: 'skip rest',
      action: function(){
         periodMilliseconds = cycleCount % 4 === 0 ? longRestMs : shortRestMs;
         messageAfterCountdown = 'Seu descanso acabou. Comece mais um foco';
         buttonTextAfterCountdown = 'start';    
         periodSeconds = periodMilliseconds / 1000;
         timer.innerText = formatTime(periodSeconds);
         const directionBg = 'backward';
         const intervalChange = 120;
         decreasesSeconds(periodSeconds, directionBg, intervalChange);
         setsCountdown(periodSeconds, messageAfterCountdown, buttonTextAfterCountdown);
      }
   },
   {
      stage: 'PAUSE',
      noticeToUser: 'Tempo pausado',
      buttonText: 'restart',
      action: function(){} 
   },
   {
      stage: 'RESTART',
      noticeToUser: 'Concentre-se',
      buttonText: 'pause',
      action: function(){
         periodMilliseconds = timeLeft * 1000;
         messageAfterCountdown = 'Seu Pomodoro acabou. Descanse um pouco';
         buttonTextAfterCountdown = 'rest';    
         periodSeconds = periodMilliseconds / 1000;
         timer.innerText = formatTime(periodSeconds);
         const directionBg = 'forward';
         const intervalChange = 120 - bodyHue;
         decreasesSeconds(periodSeconds, directionBg, intervalChange);
         setsCountdown(periodSeconds, messageAfterCountdown, buttonTextAfterCountdown);
      }
   },
   {
      stage: 'SKIP REST',
      noticeToUser: 'Concentre-se',
      buttonText: 'pause',
      action: function(){
         periodMilliseconds = pomodoroMs;
         messageAfterCountdown = 'Seu Pomodoro acabou. Descanse um pouco';
         buttonTextAfterCountdown = 'rest';    
         cycleCount++;
         cycles.innerText = cycleCount;
         periodSeconds = periodMilliseconds / 1000;
         timer.innerText = formatTime(periodSeconds);         
         [body, controlButton].forEach(e => e.classList.add('restore'));
         controlButton.disabled = true;
         bodyHue = 0;
         const directionBg = 'forward';
         const intervalChange = 120;
         setTimeout(() => {
            controlButton.disabled = false;
            
            [body, controlButton].forEach(e => {
               e.style.backgroundColor =`hsl(0, 50%, 25%)`;
               e.classList.remove('restore');
            });
            decreasesSeconds(periodSeconds, directionBg, intervalChange);
            setsCountdown(periodSeconds, messageAfterCountdown, buttonTextAfterCountdown);
         }, 2000)         
      }
   }
];

function formatTime(time){
   let minutes = Math.floor(time / 60);
   let seconds = time % 60;
   return `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`
}

function decreasesSeconds(seconds, directionBg, intervalChange){
   timeLeft = seconds;
   const rate = intervalChange/seconds;
   counter = setInterval(() =>{
      changesBg(rate, directionBg);
      timeLeft--;
      timer.innerText = formatTime(timeLeft);
   } , 1000)   
}

function changesBg(rate, direction){   
   direction === 'forward' ? bodyHue += rate : bodyHue -= rate;
   body.style.backgroundColor = `hsl(${bodyHue}, 50%, 25%)`;
   controlButton.style.backgroundColor = `hsl(${bodyHue}, 50%, 25%)`;
}

function setsCountdown(seconds, message, buttonText){
   timeOut = setTimeout(() =>
      {
         clearInterval(counter);
         noticeToUser.innerText = message;
         controlButton.innerText = buttonText;
      }, seconds * 1000);
}

function pomodoroEngine(buttonContent){
   const currentStage = pomodoroStages.filter(stage => stage.stage === buttonContent)[0];
   noticeToUser.innerText = currentStage.noticeToUser;
   controlButton.innerText = currentStage.buttonText;
   clearInterval(counter);
   clearTimeout(timeOut);
   currentStage.action();
};