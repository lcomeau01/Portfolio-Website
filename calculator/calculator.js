

const buttons = document.getElementsByClassName("button"); 
console.log(buttons); 
const calcWindow = document.getElementById("total"); 
var currentPrev = ""; 
var currentTotal = 0; 
var currOperation = null; 

Array.from(buttons).forEach(button => {
    button.onclick = function() { 
        let value = button.innerText; 
        let classes = Array.from(button.classList); 
        console.log(button.classList); 
        if(classes.includes('number')) 
        { 
            currentPrev += value; 
            currentTotal = parseFloat(currentPrev);
        }
        else if (classes.includes('action')) { 
            let type = button.getAttribute('id'); 
            if(type == 'clear') { 
                currentTotal = 0; 
                currentPrev = ""; 
            } 
            else if (type == 'scientific-notation') currentPrev += value; 
            else if(type == 'equals')
            { 
                currentPrev = currentTotal; 
            }
        }
        else 
        { 
            let type = button.getAttribute('id'); 
            currOperation = type; 
        }


        if (currentPrev == "") calcWindow.innerText = "0"; 
        else calcWindow.innerText = currentPrev; 
    }
});