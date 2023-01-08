const body = document.querySelector("body");
const startButton = document.querySelector("#start");
const timer = document.querySelector("#timer");
const cycles = document.querySelector("#cycles");
const endNotice = document.querySelector('#end-notice');
let totalTime = 10000;
let restTime = 5000;
let longerRestTime = 8000;
let timeLeft = totalTime/1000;

let cycleCount = 0;
let counter;
let timeOut;
let bodyHue = 0;
let rate = 120/(totalTime/1000);

startButton.addEventListener("click", timeCount)

function timeCount(){
   if(startButton.innerText==='START'){
      endNotice.innerText = "";
      startButton.innerText = 'pause';
      timer.innerText = formatTime(timeLeft);
      cycleCount++;
      cycles.innerText = cycleCount;
      clearInterval(counter);
      clearTimeout(timeOut);
      counter = setInterval(() => {      
         //let percentageOfInterval = 100 - (((timeLeft*1000) / totalTime) * 100);
         //bodyHue = percentageOfInterval *1.2; 
         //Forma anterior que fiz. So funcionava pq partia do zero. Usando rate fica melhor
         
         bodyHue += rate;
         body.style.backgroundColor = `hsl(${bodyHue}, 54%, 54%)`;      
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
         bodyHue += rate;
         body.style.backgroundColor = `hsl(${bodyHue}, 54%, 54%)`;  
         timeLeft--;
         timer.innerText = formatTime(timeLeft); 
      }, "1000");

      setSetTimeout();
   
   } else if(startButton.innerText==='REST'){
      endNotice.innerText = "Começou seu descanso";
      startButton.innerText = 'start';
      let totalRestTime = cycleCount % 4 === 0 ? longerRestTime : restTime;
      let restTimeLeft = totalRestTime / 1000;
      timer.innerText = formatTime(restTimeLeft);
      counter = setInterval(() => {
         let restRate = 120/(totalRestTime/1000);
         bodyHue -= restRate;
         body.style.backgroundColor = `hsl(${bodyHue}, 54%, 54%)`;  
         //bodyHue = percentageOfInterval *1.2;
         //body.style.backgroundColor = `hsl(${bodyHue}, 54%, 54%)`; 
         restTimeLeft--;
         timer.innerText = formatTime(restTimeLeft); 
      }, "1000");

      timeOut = setTimeout(() => {      
         console.log("Acabou o Descanso!");
         clearInterval(counter);
         endNotice.innerText = "Seu Descanso acabou. Comece mais um foco"
      }, restTimeLeft * 1000);
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
