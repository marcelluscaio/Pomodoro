const startButton = document.querySelector("#start");
let totalTime = 4000
let timeLeft = totalTime/1000

startButton.addEventListener("click", timer);

function timer(){
   console.log("Começou Pomodoro!"); 
   counter = setInterval(() => {      
      timeLeft--
      console.log(timeLeft);   
   }, "1000");
   setTimeout(() => {      
      console.log("Acabou o Pomodoro!");
      clearInterval(counter);
   }, totalTime);
};

/* let minutos = 0;
let segundos = 3;
let milisegundosPomodoro = 1000*segundos; */