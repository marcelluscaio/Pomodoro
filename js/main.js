const startButton = document.querySelector("#start");
const timer = document.querySelector("#timer");
const totalTime = 10000;
let timeLeft = totalTime/1000;
let restTime = 5000;
const endNotice = document.querySelector('#end-notice');

startButton.addEventListener("click", timeCount)

let counter;
let timeOut;

function timeCount(){
   if(startButton.innerText==='START'){
      endNotice.innerText = "";
      console.log("Começou Pomodoro!"); 
      startButton.innerText = 'pause';
      timer.innerText = formatTime(timeLeft);
      clearInterval(counter);
      clearTimeout(timeOut);
      counter = setInterval(() => {      
         timeLeft--;
         timer.innerText = formatTime(timeLeft); 
      }, "1000");

      setSetTimeout();

   } else if(startButton.innerText==='PAUSE'){
      endNotice.innerText = "Tempo pausado";
      startButton.innerText = 'restart';      
      clearInterval(counter);
      clearTimeout(timeOut);

   } else if(startButton.innerText==='RESTART'){
      endNotice.innerText = "";
      startButton.innerText = 'pause';      

      counter = setInterval(() => {      
         timeLeft--;
         timer.innerText = formatTime(timeLeft); 
      }, "1000");

      setSetTimeout();
   
   } else if(startButton.innerText==='REST'){
      endNotice.innerText = "Começou seu descanso";
      startButton.innerText = 'start';
      let restTimeLeft = restTime / 1000;
      timer.innerText = formatTime(restTimeLeft);
      counter = setInterval(() => {      
         restTimeLeft--;
         timer.innerText = formatTime(restTimeLeft); 
      }, "1000");

      timeOut = setTimeout(() => {      
         console.log("Acabou o Descanso!");
         clearInterval(counter);
         endNotice.innerText = "Seu Descanso acabou. Comece mais um foco"
      }, restTime);
   }
};

function setSetTimeout(){
   timeOut = setTimeout(() => {
               clearInterval(counter);
               endNotice.innerText = "Seu Pomodoro acabou. Descanse um pouco";
               startButton.innerText = 'rest';
               timeLeft = totalTime / 1000;
            }, timeLeft * 1000);
}

function formatTime(time){
   let minutes = Math.floor(time / 60);
   let seconds = time % 60;
   return `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`
}
