# Pomodoro

Ferramenta para auxiliar na aplicação do método Pomodoro. Controle seus ciclos de foco e descanso e aumente sua produtividade. 

## Objetivo

O objetivo deste projeto foi desenvolver um sistema do Pomodoro e equipe durante o evento Live CoDe.


## Construído com:

![html5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
 ![css3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) 

## Funcionalidades

:hammer_and_wrench: ...; <br>
:iphone: ...; <br>
:fountain_pen: ...

Aprendizados
Empty item keeps its space: whitespace-pre-wrap

Diferenca entre funcao normal e arrow : this.
Action do pomodoroStages não funcionava
https://gomakethings.com/arrow-functions-in-vanilla-js/
https://www.section.io/engineering-education/how-to-use-javascript-arrow-functions-and-this-keyword/#:~:text=Remember%20what%20we%20said%20about,scope%20whenever%20you%20call%20this%20.

## Acesse

<a href="#">Inserir quando houver deploy</a>.


## Próximos passos

- [x] Create timeout;
- [x] Create Pomodoro activator;
- [X] Conect through Pomodoro activator through JS;
- [x] Create total time controler;
- [x] Create countdown per second;
- [x] Calculate remaining time
- [x] Create timer element on screen
- [X] Make timer change according to countdown
- [X] Control time, and after 25 minutes let user know time is out
- [X] Button to pause and get back
- [X] Button for interval
- [X] Show count of cycles
- [X] After 4, long pause
- [X] Change bg color according to mode
- [X] Change happens gradually
- [X] Style with Tailwind
- [X] Fazer esilizacao do cycle e mensagem
- [X] Create Pomodoro Engine using  OOP
- [X] Gear icon to open modal to setting 
- [X] Animate gear
- [X] Style form as sidebar
- [X] Style input in form
- [X] Set time with input
- [X] When hit save sidebar goes away
- [X] When hit save pomodoro restarts
- [X] When engine is hit, pomodoro pauses
- [X] Update tab title with timer
- [X] Setting fluid typography
- [X] Disable button when sidebaer shows
- [X] Restart cycle when hitting save
- [X] Prevent pomodoro from restarting when user had paused it before opening configs
- [X] Save setting to local Storage
- [ ] Sound of start and end (Fazer meus 4 audios)
- [ ] JS Organization
- [ ] CSS Organization

Sugestoes Jean:
Colocar na aba do chrome os tempo atual
Gitignore node modules


## Screenshots
<p align="middle">
<img src="#" width="100%" height="100%">
</p>


Isso
//let percentageOfInterval = 100 - (((timeLeft*1000) / totalTime) * 100);
//bodyHue = percentageOfInterval *1.2; 
//Forma anterior que fiz. So funcionava pq partia do zero. Usando rate fica melhor


virou
let bodyHue = 0;
let rate = 120/(totalTime/1000);

bodyHue += rate;
body.style.backgroundColor = `hsl(${bodyHue}, 50%, 25%)`;
startButton.style.backgroundColor = `hsl(${bodyHue}, 50%, 25%)`;    
timeLeft--;
timer.innerText = formatTime(timeLeft);




Isso



   
   
   /* if(controlButton.innerText==='START'){
      noticeToUser.innerText = "Concentre-se";
      controlButton.innerText = 'pause';
      timer.innerText = formatTime(timeLeft);
      cycleCount++;
      cycles.innerText = cycleCount;
      clearInterval(counter);
      clearTimeout(timeOut);
      counter = setInterval(() => {      
         
         
         bodyHue += rate;
         body.style.backgroundColor = `hsl(${bodyHue}, 50%, 25%)`;
         controlButton.style.backgroundColor = `hsl(${bodyHue}, 50%, 25%)`;    
         timeLeft--;
         timer.innerText = formatTime(timeLeft);
      }, "1000");

      setsCountdown();

   } else if(controlButton.innerText==='PAUSE'){
      noticeToUser.innerText = "Tempo pausado";
      controlButton.innerText = 'restart';      
      clearInterval(counter);
      clearTimeout(timeOut);

   } else if(controlButton.innerText==='RESTART'){
      noticeToUser.innerText = "Concentre-se";
      controlButton.innerText = 'pause';      

      counter = setInterval(() => {      
         bodyHue += rate;
         body.style.backgroundColor = `hsl(${bodyHue}, 50%, 25%)`;
         controlButton.style.backgroundColor = `hsl(${bodyHue}, 50%, 25%)`;   
         timeLeft--;
         timer.innerText = formatTime(timeLeft); 
      }, "1000");

      setsCountdown();
   
   } else if(controlButton.innerText==='REST'){
      noticeToUser.innerText = "Começou seu descanso";
      controlButton.innerText = 'start';
      let totalRestTime = cycleCount % 4 === 0 ? longerRestTime : restTime;
      let restTimeLeft = totalRestTime / 1000;
      timer.innerText = formatTime(restTimeLeft);
      counter = setInterval(() => {
         let restRate = 120/(totalRestTime/1000);
         bodyHue -= restRate;
         body.style.backgroundColor = `hsl(${bodyHue}, 50%, 25%)`;
         controlButton.style.backgroundColor = `hsl(${bodyHue}, 50%, 25%)`; 
         restTimeLeft--;
         timer.innerText = formatTime(restTimeLeft); 
      }, "1000");

      timeOut = setTimeout(() => {      
         console.log("Acabou o Descanso!");
         clearInterval(counter);
         noticeToUser.innerText = "Seu descanso acabou. Comece mais um foco"
      }, restTimeLeft * 1000);
   } */
/* 
function setsCountdown(){
   timeOut = setTimeout(() =>
      {
         clearInterval(counter);
         noticeToUser.innerText = "Seu Pomodoro acabou. Descanse um pouco";
         controlButton.innerText = 'rest';
         timeLeft = totalTime / 1000;
      }, timeLeft * 1000);
} 
*/





Isso 
//outra forma de checar se é letra
//const isLetter = (character) => character.toLowerCase() != character.toUpperCase();

Vira
[inputFocus, inputShortBreak, inputLongBreak].forEach(input =>
    input.addEventListener("keyup", (e) =>{
      
      e.target.value = allowOnlyNumbers(e.target.value);
   })
)

const allowOnlyNumbers = value => value.replace(/[^0-9]+/, '');



Atenção:

case 'RESTART':
         !sidebarIsOpen && pomodoroEngine('RESTART')
         //Prevents pomodoro from restarting when user had paused it before opening configs, and having the time reunning while user was in configs
         break;