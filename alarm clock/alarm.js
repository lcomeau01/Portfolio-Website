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
    var alarmTimer, alarmInputs, hour, minute, second, meridiem, focusedTime; 

    alarmCheckbox.addEventListener("click", alarmStateChanged); 
    alarmInputs = document.getElementsByClassName('alarmTime'); 

    Array.from(alarmInputs).forEach( (elem) => {
        elem.addEventListener("focusin", changeAlarmFocus); 
        elem.addEventListener("keydown", enteringTime); 
        elem.addEventListener("focusout", verifyTime); 
    }); 

    function alarmStateChanged()
    { 
        // also set alarm 
        // and then unset alarm via clearTimeout 
        if(alarmCheckbox.checked) alarmIcon.classList.add("alarm-on"); 
        else alarmIcon.classList.remove("alarm-on"); 
    }

    function changeAlarmFocus(event)
    { 
        if (focusedTime != null) 
        { 
            focusedTime.classList.remove('active'); 

            if(focusedTime.id == event.currentTarget.id) 
            { 
                focusedTime = null; 
                return; 
            }
        }

        focusedTime = event.currentTarget; 
        focusedTime.classList.add("active"); 
    
    }

    function enteringTime(event)
    { 
        if(focusedTime == null) return; 
        console.log(event.key); 
        let currTime = focusedTime.value; 
        let key = event.key;

        if(key == "Backspace") currTime = currTime.slice(0, -1);
        else if (focusedTime.id == 'meridiem')
        { 
            if(key.toUpperCase() == "P" || key == "ArrowDown") focusedTime.value = "PM"; 
            else if (key.toUpperCase() == "A" || key == "ArrowUp") focusedTime.value = "AM"; 
            
            return; 
        }
        else if (key == "ArrowUp")
        { 
            currTime = parseInt(currTime) + 1; 
            currTime = currTime.toString(); 
        }
        else if (key == "ArrowDown")
        { 
            currTime = parseInt(currTime) - 1; 

            if (currTime < 0) currTime = "0"
            else currTime = currTime.toString();
        }
        else 
        { 
            key = parseInt(key); 
            if(!Number.isInteger(key)) return; 
            else currTime = currTime + key; 
            currTime = currTime.slice(1, currTime.length); 
        }

        focusedTime.value = currTime.padStart(2, "0"); 
    }``


    function verifyTime(event)
    {  
        console.log(event.target); 
        let currTime = parseInt(focusedTime.value); 
        
        // making sure that it fits to the perameters of min, sec, hour 
        // aka they have to be between 0 and 60 or 0 and 12
        if(focusedTime.id == "meridiem") 
        { 
            changeAlarmFocus(event); 
            return; 
        }
        else if(focusedTime.id != "hour")
        { 
            currTime = currTime % 60; 
        }
        else 
        { 
            currTime = currTime % 12; 
            if(currTime == 0) currTime = 12; 
        }

        // what the value of the focused part of the clock will be 
        // when it leaves focus 
        focusedTime.value = currTime.toString().padStart(2, "0"); 

        // we don't want the part of the alarm to be active anymore
        // since it is going out of focus
        changeAlarmFocus(event); 
    }
}





