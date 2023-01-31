function select(selector){
   return document.querySelector(selector)
};

const body = select("body");
const controlButton = select("#control-button");
const timer = select("#timer");
const cycles = select("#cycles");
const noticeToUser = select('#notice-user');
const gear = select("#gear");
const sidebar = select("#sidebar");
const inputFocus = select("#focus");
const inputShortBreak = select("#short-break");
const inputLongBreak = select("#long-break");
const saveButton = select("#save-button");
const audioFocus = new Audio(`./sound/foco.m4a`);
const audioPause = new Audio(`./sound/pausa.m4a`);
const audioBreak = new Audio(`./sound/descanso.m4a`);

let timeLeft;
let counter;
let timeOut;
let cycleCount = 0;
let bodyHue = 0;
let sidebarIsOpen = false;

const minutesToMilliseconds = (minutes) => minutes * 60000;

if(localStorage.length > 0){
   inputFocus.value = localStorage.getItem('pomodoroMs');
   inputShortBreak.value = localStorage.getItem('shortRestMs');
   inputLongBreak.value = localStorage.getItem('longRestMs');
}

let pomodoroMs = minutesToMilliseconds(inputFocus.value);
let shortRestMs = minutesToMilliseconds(inputShortBreak.value);
let longRestMs = minutesToMilliseconds(inputLongBreak.value);

renderTime(pomodoroMs / 1000);

gear.addEventListener('click', e => {
   handleSidebar(e.target)
});

const handleSidebar = (icon) => {
   toggleRotation(icon);
   toggleTranslate();   
   disableButton();
   handlePomodoroButton();
}

const toggleRotation = target => {
   if(target.classList.contains('rotate')){
      target.classList.remove('rotate');
      target.classList.add('unrotate');
   } else{
      target.classList.remove('unrotate');
      target.classList.add('rotate');
   }
};

const toggleTranslate = () => {
   sidebar.classList.toggle('translate-x-full');
   sidebarIsOpen ? sidebarIsOpen = false : sidebarIsOpen = true;
}

const disableButton = () => {
   controlButton.classList.toggle('disabled');
   controlButton.disabled === false ? controlButton.disabled = true : controlButton.disabled = false;
}

const handlePomodoroButton = () => {
   switch(controlButton.innerText){
      case 'START':
         break;
      case 'PAUSE':
         pomodoroEngine('PAUSE')
         break;
      case 'RESTART':
         !sidebarIsOpen && pomodoroEngine('RESTART')
         //Prevents pomodoro from restarting when user had paused it before opening configs, and having the time reunning while user was in configs
         break;
   }
}

[inputFocus, inputShortBreak, inputLongBreak].forEach(input =>
    input.addEventListener("keyup", (e) =>{      
      e.target.value = allowOnlyNumbers(e.target.value);
   })
);

const allowOnlyNumbers = value => value.replace(/[^0-9]+/, '');

saveButton.addEventListener('click', e => {
   e.preventDefault();
   setDurations();
   controlButton.innerText==="RESTART" && cycleCount--; //if configs ae saved during a cycle, decreases cycle count before increasing in pomodoroEngine
   handleSidebar(gear);
   pomodoroEngine('START');
});

const setDurations = () => {
   pomodoroMs = minutesToMilliseconds(inputFocus.value);
   shortRestMs = minutesToMilliseconds(inputShortBreak.value);
   longRestMs = minutesToMilliseconds(inputLongBreak.value);
   updateLocalstorage();   
}

const updateLocalstorage = () => {
   localStorage.setItem('pomodoroMs', inputFocus.value);
   localStorage.setItem('shortRestMs', inputShortBreak.value);
   localStorage.setItem('longRestMs', inputLongBreak.value);
}

controlButton.addEventListener("click", (e) => pomodoroEngine(e.target.innerText));

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
         playAudio(audioFocus);
         decreasesSeconds(periodSeconds, directionBg, intervalChange);
         setsCountdown(periodSeconds, messageAfterCountdown, buttonTextAfterCountdown);
      }
   },
   {
      stage: 'REST',
      noticeToUser: 'Relax a bit',
      buttonText: 'skip rest',
      action: function(){
         periodMilliseconds = cycleCount % 4 === 0 ? longRestMs : shortRestMs;
         messageAfterCountdown = 'Time to work. Start another focus';
         buttonTextAfterCountdown = 'start';    
         periodSeconds = periodMilliseconds / 1000;
         renderTime(periodSeconds);
         const directionBg = 'backward';
         const intervalChange = 120;
         playAudio(audioBreak);
         decreasesSeconds(periodSeconds, directionBg, intervalChange);
         setsCountdown(periodSeconds, messageAfterCountdown, buttonTextAfterCountdown);
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
         playAudio(audioFocus);
         decreasesSeconds(periodSeconds, directionBg, intervalChange);
         setsCountdown(periodSeconds, messageAfterCountdown, buttonTextAfterCountdown);
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
            playAudio(audioFocus);
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

function setsCountdown(seconds, message, buttonText){
   timeOut = setTimeout(() =>
      {
         clearInterval(counter);
         noticeToUser.innerText = message;
         controlButton.innerText = buttonText;
      }, seconds * 1000);
}

function handleCycle(){
   cycleCount++;
   cycles.innerText = cycleCount;
}

function pomodoroEngine(buttonContent){
   const currentStage = pomodoroStages.filter(stage => stage.stage === buttonContent)[0];
   noticeToUser.innerText = currentStage.noticeToUser;
   controlButton.innerText = currentStage.buttonText;
   clearInterval(counter);
   clearTimeout(timeOut);
   currentStage.action();
};

const playAudio = (audio) => audio.play();

/* let gravador;
let audio;
const getAudio = () => {   
   navigator.mediaDevices.getUserMedia({audio: true})
      .then(response => gravador = response)
      .then(gravador => audio = new MediaRecorder(gravador))
      .then(() => audio.start())
}

const stopAudio = async (audio) => {
   let resposta = await audio;
   console.log(resposta);
   audio.stop();
   console.log(gravador);

}  */