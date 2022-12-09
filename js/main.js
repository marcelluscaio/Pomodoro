const startButton = document.querySelector("#start");
const timer = document.querySelector("#timer");
const totalTime = 4000;
let timeLeft = totalTime/1000;

startButton.addEventListener("click", timeCount);

function timeCount(){
   console.log("Começou Pomodoro!"); 
   timer.innerText = formatTime(timeLeft); 
   const counter = setInterval(() => {      
      timeLeft--;
      timer.innerText = formatTime(timeLeft); 
   }, "1000");
   setTimeout(() => {      
      console.log("Acabou o Pomodoro!");
      clearInterval(counter);
      timeLeft = totalTime/1000;
   }, totalTime);
};

function formatTime(time){
   let minutes = Math.floor(time / 60);
   let seconds = time % 60;
   return `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`
}