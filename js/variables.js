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