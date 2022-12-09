const startButton = document.querySelector("#start");
const timer = document.querySelector("#timer");
const totalTime = 4000;
const endNotice = document.querySelector('#end-notice');
let timeLeft = totalTime/1000;

startButton.addEventListener("click", timeCount)

let teste;
let counter;

function timeCount(){
   if(startButton.innerText==='START'){
      teste = setInterval(
         () => {
            console.log('aqui')
         }, 1000);
      endNotice.innerText = "";
      timer.innerText = formatTime(timeLeft);
      console.log("Começou Pomodoro!"); 
      startButton.innerText = 'pause';
      counter = setInterval(() => {      
         timeLeft--;
         timer.innerText = formatTime(timeLeft); 
      }, "1000");


      const timeOut = setTimeout(() => {      
         console.log("Acabou o Pomodoro!");
         clearInterval(counter);
         timeLeft = totalTime/1000;
         endNotice.innerText = "Seu Pomodoro acabou. Descanse um pouco"
         }, totalTime);
   } else if(startButton.innerText==='PAUSE'){
      clearInterval(teste);
      clearInterval(counter)
   }

};

function formatTime(time){
   let minutes = Math.floor(time / 60);
   let seconds = time % 60;
   return `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`
}
