import { dragElement } from "../drag.js";
import { closeWidget } from "../close.js"; 
// calculator operation 
const calculator = document.getElementById('calculator-widget'); 
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
                if(display == "0" || display == "") 
                { 
                    display = "1" + value; 
                    clear = false; 
                    currentEquation = "1" + value;
                }
                else 
                { 
                        display += value; 
                        currentEquation += value;
                }
            } 
            else if(type == 'equals')
            {
                operation = true;
                clear = true;  
                currentTotal = eval(currentEquation); 
                currentEquation = currentTotal; 
                display =  parseFloat(currentTotal.toPrecision(8)).toString(); 
            }
        }
        else 
        { 
            operation = true; 
            if(clear == true) clear = false; 
            currentTotal = eval(currentEquation); 
            currentEquation = currentTotal + value; 
            display = parseFloat(currentTotal.toPrecision(8)).toString(); 
        }

        if(display == ".") calcWindow.innerText = "0."; 
        else calcWindow.innerText = display; 
        
        if(operation)
        { 
            display = ""; 
            operation = false; 
        } 
    }
});

// opening and closing the calculator 
closeWidget(calculator); 



// moving the calculator around the screen 
dragElement(calculator); 







