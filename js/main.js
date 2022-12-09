const startButton = document.querySelector("#start");
const timer = document.querySelector("#timer");
const totalTime = 10000;
const endNotice = document.querySelector('#end-notice');
let timeLeft = totalTime/1000;

startButton.addEventListener("click", timeCount)

let counter;
let timeOut;

function timeCount(){
   if(startButton.innerText==='START'){
      endNotice.innerText = "";
      console.log("Começou Pomodoro!"); 
      startButton.innerText = 'pause';
      timer.innerText = formatTime(timeLeft);
      counter = setInterval(() => {      
         timeLeft--;
         timer.innerText = formatTime(timeLeft); 
      }, "1000");

      timeOut = setTimeout(() => {      
         console.log("Acabou o Pomodoro!");
         clearInterval(counter);
         endNotice.innerText = "Seu Pomodoro acabou. Descanse um pouco"
         timeLeft = totalTime/1000; //Zera contador. Vai virar a mudanca de estado
         }, totalTime); //da pra usar o time left?
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

      timeOut = setTimeout(() => {      
         console.log("Acabou o Pomodoro!");
         clearInterval(counter);
         endNotice.innerText = "Seu Pomodoro acabou. Descanse um pouco"
         timeLeft = totalTime/1000;
         }, (timeLeft * 1000));
   
   }

};

function formatTime(time){
   let minutes = Math.floor(time / 60);
   let seconds = time % 60;
   return `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`
}
