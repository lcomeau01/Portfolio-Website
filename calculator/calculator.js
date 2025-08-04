import { dragElement } from "../drag.js";
// calculator operation 

const buttons = document.getElementsByClassName("button"); 
console.log(buttons); 
const calcWindow = document.getElementById("total"); 
var display = ""; 
var currentTotal = 0; 
var currentEquation = ""; 
let operation = false; 
let clear = false; 

Array.from(buttons).forEach(button => {
    button.onclick = function() { 
        let value = button.innerText; 
        let classes = Array.from(button.classList); 
        
        if(classes.includes('number')) 
        { 
            if(display == "0") display = value; 
            else if (clear == true)
            { 
                display = value; 
                currentEquation = ""; 
                clear = false; 
            }
            else display += value; 

            currentEquation += value;
        }
        else if (classes.includes('action')) { 
            let type = button.getAttribute('id'); 
            if(type == 'clear') { 
                currentTotal = 0; 
                display = "0"; 
                currentEquation = ""; 
            } 
            else if (type == 'scientific-notation') 
            { 
                if(display == "0") display = "1" + value; 
                else display += value; 

                currentEquation += "1" + value;
            } 
            else if(type == 'equals')
            {
                operation = true;
                clear = true;  
                currentTotal = eval(currentEquation); 
                currentEquation = currentTotal; 
                display = currentTotal; 
            }
        }
        else 
        { 
            operation = true; 
            if(clear == true) clear = false; 
            currentTotal = eval(currentEquation); 
            currentEquation = currentTotal + value; 
            display = currentTotal; 
        }

        if(display == ".") calcWindow.innerText = "0."; 
        else calcWindow.innerText = parseFloat(parseFloat(display).toPrecision(8)).toString(); 
        
        if(operation)
        { 
            display = ""; 
            operation = false; 
        } 
    }
});

// TODO: opening and closing the calculator 

// TODO: moving the calculator around the screen 
dragElement(document.getElementById("calculator-widget")); 






