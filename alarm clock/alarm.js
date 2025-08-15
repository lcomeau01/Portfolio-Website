// imported functions 
import{ dragElement } from "../drag.js"; 
import { closeWidget } from "../close.js"

// const global variables 
const alarm = document.getElementById("alarm-widget"); 
const buttons = ['time', 'date', 'alarm']; 

// default (global) values when the widget is first opened 
var currentActive = document.getElementById('time'); 
var display = document.getElementById("display-time"); 

// actions to be performed on the widget 
dragElement(alarm); 
closeWidget(alarm);

// display functions / information 
startClock(document.getElementById("display-time")); 
startCalendar(document.getElementById("date")); 
startAlarm(); 


buttons.forEach(function (elem) { 
    let currButton = document.getElementById(elem); 
    currButton.addEventListener("click", selectionChosen); 
}); 

function selectionChosen(event)
{ 
    // remove the active class from the last selection that had it 
    currentActive.classList.remove('active'); 
    display.classList.remove('active'); 

    // add the active class to the new selection 
    currentActive = event.currentTarget; 
    display = document.getElementById("display-" + currentActive.id);
    currentActive.classList.add('active'); 
    display.classList.add('active'); 
}

/******* DISPLAY FUNCTIONS **********/

function startClock(elem) {
    
    function updateTime() {
        const currTime = new Date();
        let hours = currTime.getHours();
        const minutes = currTime.getMinutes().toString().padStart(2, "0");
        const seconds = currTime.getSeconds().toString().padStart(2, "0");
        const meridiem = hours >= 12 ? "PM" : "AM";

        hours = hours % 12;
        if (hours == 0) hours = 12;

         elem.innerText = hours + ":" + minutes + ":" + seconds + " " + meridiem; 
    }

    updateTime(); // update immediately
    return setInterval(updateTime, 1000); // update every second
}

function startCalendar(button)
{ 
    button.addEventListener("click", 
                            getDate(document.getElementById("display-" + button.id))); 
    
    function getDate(elem)
    { 
        const currTime = new Date(); 
        let day = currTime.getDate(); 
        let month = currTime.getMonth() + 1; 
        let year = currTime.getFullYear(); 

        // console.log(currentTarget); 

        elem.innerText = month + "/" + day + "/" + year; 
    }
}

function startAlarm()
{ 
    const alarmCheckbox = document.getElementById("alarm-switch"); 
    const alarmIcon = document.getElementById("alarm"); 
    var alarmTimer, hour, minute, second, meridiem; 

    alarmCheckbox.addEventListener("click", alarmStateChanged); 

    function alarmStateChanged()
    { 
        // also set alarm 
        // and then unset alarm via clearTimeout 
        if(alarmCheckbox.checked) alarmIcon.classList.add("alarm-on"); 
        else alarmIcon.classList.remove("alarm-on"); 
    }
}





