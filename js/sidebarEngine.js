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

const allowOnlyNumbers = value => value.replace(/[^0-9]+/, '');

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

gear.addEventListener('click', e => {
   handleSidebar(e.target)
});

[inputFocus, inputShortBreak, inputLongBreak].forEach(input =>
    input.addEventListener("keyup", (e) =>{      
      e.target.value = allowOnlyNumbers(e.target.value);
   })
);

saveButton.addEventListener('click', e => {
   e.preventDefault();
   setDurations();
   controlButton.innerText==="RESTART" && cycleCount--; //if configs ae saved during a cycle, decreases cycle count before increasing in pomodoroEngine
   handleSidebar(gear);
   pomodoroEngine('START');
});