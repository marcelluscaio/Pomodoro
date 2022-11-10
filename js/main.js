const startButton = document.querySelector("#start");

startButton.addEventListener("click", timer)
   

let minutos = 0;
let segundos = 3;

let milisegundosPomodoro = 1000*segundos;

function timer(){
   setTimeout(() => {
      console.log("Pomodoro!");   
   }, "3000")
}