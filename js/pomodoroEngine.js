const pomodoroStages = [
   {
      stage: 'START',
      noticeToUser: 'Focus',
      buttonText: 'pause',
      action: function(){
         periodMilliseconds = pomodoroMs;
         messageAfterCountdown = 'Time\'s up. Rest a little';
         buttonTextAfterCountdown = 'rest';    
         handleCycle();
         periodSeconds = periodMilliseconds / 1000;
         renderTime(periodSeconds);
         const directionBg = 'forward';
         const intervalChange = 120;
         decreasesSeconds(periodSeconds, directionBg, intervalChange);
         setsCountdown(periodSeconds, messageAfterCountdown, buttonTextAfterCountdown, audioBreak);
      }
   },
   {
      stage: 'REST',
      noticeToUser: 'Relax a bit',
      buttonText: 'skip rest',
      action: function(){
         periodMilliseconds = cycleCount % 4 === 0 ? longRestMs : shortRestMs;
         messageAfterCountdown = 'Time to work';
         buttonTextAfterCountdown = 'start';    
         periodSeconds = periodMilliseconds / 1000;
         renderTime(periodSeconds);
         const directionBg = 'backward';
         const intervalChange = 120;
         decreasesSeconds(periodSeconds, directionBg, intervalChange);
         setsCountdown(periodSeconds, messageAfterCountdown, buttonTextAfterCountdown, audioFocus);
      }
   },
   {
      stage: 'PAUSE',
      noticeToUser: 'Paused',
      buttonText: 'restart',
      action: function(){
         playAudio(audioPause);
      } 
   },
   {
      stage: 'RESTART',
      noticeToUser: 'Focus',
      buttonText: 'pause',
      action: function(){
         periodMilliseconds = timeLeft * 1000;
         messageAfterCountdown = 'Time\'s up. Rest a little';
         buttonTextAfterCountdown = 'rest';    
         periodSeconds = periodMilliseconds / 1000;
         renderTime(periodSeconds);
         const directionBg = 'forward';
         const intervalChange = 120 - bodyHue;
         decreasesSeconds(periodSeconds, directionBg, intervalChange);
         setsCountdown(periodSeconds, messageAfterCountdown, buttonTextAfterCountdown, audioBreak);
      }
   },
   {
      stage: 'SKIP REST',
      noticeToUser: 'Focus',
      buttonText: 'pause',
      action: function(){
         periodMilliseconds = pomodoroMs;
         messageAfterCountdown = 'Time\'s up. Rest a little';
         buttonTextAfterCountdown = 'rest';    
         handleCycle();
         periodSeconds = periodMilliseconds / 1000;
         renderTime(periodSeconds);         
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
            setsCountdown(periodSeconds, messageAfterCountdown, buttonTextAfterCountdown, audioBreak);
         }, 2000)         
      }
   }
];

function formatTime(time){
   let minutes = Math.floor(time / 60);
   let seconds = time % 60;
   return `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`
}

function renderTime(time){
   timer.innerText = formatTime(time);
   document.title = `${formatTime(time)} Pomodoro`
}

function decreasesSeconds(seconds, directionBg, intervalChange){
   timeLeft = seconds;
   const rate = intervalChange/seconds;
   counter = setInterval(() =>{
      changesBg(rate, directionBg);
      timeLeft--;
      renderTime(timeLeft);
   } , 1000)   
}

function changesBg(rate, direction){   
   direction === 'forward' ? bodyHue += rate : bodyHue -= rate;
   body.style.backgroundColor = `hsl(${bodyHue}, 50%, 25%)`;
   controlButton.style.backgroundColor = `hsl(${bodyHue}, 50%, 25%)`;
}

function setsCountdown(seconds, message, buttonText, audio){
   timeOut = setTimeout(() =>
      {
         clearInterval(counter);         
         playAudio(audio);
         noticeToUser.innerText = message;
         controlButton.innerText = buttonText;
      }, seconds * 1000);
}

function handleCycle(){
   cycleCount++;
   cycles.innerText = cycleCount;
}

const playAudio = (audio) => audio.play();

function pomodoroEngine(buttonContent){
   const currentStage = pomodoroStages.filter(stage => stage.stage === buttonContent)[0];
   noticeToUser.innerText = currentStage.noticeToUser;
   controlButton.innerText = currentStage.buttonText;
   clearInterval(counter);
   clearTimeout(timeOut);
   currentStage.action();
};

controlButton.addEventListener("click", (e) => pomodoroEngine(e.target.innerText));