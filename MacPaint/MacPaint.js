import { dragElement } from "../drag.js"; 
import { closeWidget } from "../close.js"; 

const paintWidget = document.getElementById("MacPaint-widget"); 
dragElement(paintWidget); 
closeWidget(paintWidget);


let canvas = document.getElementById("untilted-painting"); 
canvas.width = canvas.offsetWidth; 
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext('2d'); 

let canvasDimensions = canvas.getBoundingClientRect(); 
let lastX = 0, lastY = 0, currX = 0, currY = 0; 
let drawing = false; 
let color = "#ffffff"; 


// Tool Selection Global Variables 
const toolsContainer = document.getElementById("tools-container"); 
const tools = ["text", "pen", "emptySquare", "filledSquare", "emptyCircle", "filledCircle", "eraser", "line"]; 
const toolIcons = {"text": '<i class="fa-solid fa-a"></i>', "pen": '<i class="fa-solid fa-pen"></i>',
                    "eraser": '<i class="fa-solid fa-eraser"></i>'}; 
let selectedTool = "pen"; // default selected too 

// Stroke Selection Global Variables 
const strokesContainer = document.getElementById("strokes-container"); 
const strokes = ["dashed", "solid1", "solid2", "solid3", "solid4"]; 
const strokeWidths = {"dashed": 1, "solid1": 1, "solid2": 3, "solid3": 5, "solid4": 10}; 
const strokeSelectedIcon = '<i class="fa-solid fa-check"></i>'; 
let selectedStroke = "solid2"; // default selected stroke 
let selectedStrokeStyle = "solid"; 
let erasing = false; 

// Color Selection Global Variables 
const colorsContainer = document.getElementById("colors-container"); 
const colors = ["#FFFFFF", "#E3E3E3", "#C7C7C7", "#AAAAAA", "#8E8E8E", 
                "#717171", "#555555", "#383838", "#1C1C1C", "#000000"]; 
const selectedColorWindow = document.getElementById("selected-color-window"); 
let selectedColor = "#555555"; //default selected color

// original set up of the widget 
toolBar(); 
strokeWidth(); 
colorPallete(); 
setTool(); 


/********************** different selections set up ************************/
function toolBar() 
{ 
    // now create a new one 
    tools.forEach((elem) => {
        const toolButton = document.createElement("button"); 
        toolButton.id = elem;

        if(toolIcons[elem]) toolButton.innerHTML = toolIcons[elem]; 
        else 
        { 
            const icon = document.createElement("div"); 
            icon.id = elem + "-icon"; 
            toolButton.appendChild(icon); 
        }

        if(selectedTool == elem)
        { 
            toolButton.classList.add("selected");
        }

        toolButton.onclick = toolSelected;  
        toolsContainer.appendChild(toolButton)
    }); 
}


function strokeWidth()
{ 
    strokes.forEach((elem) => {
        const strokesButton = document.createElement("button");

        const strokesIcon = document.createElement("div"); 
        strokesIcon.className = "strokes-icon";
        strokesIcon.style.borderWidth = strokeWidths[elem] + "px"; 
        
        if(elem == "dashed") strokesIcon.style.borderStyle = "dashed"; 

        strokesButton.innerHTML = strokeSelectedIcon; 

        if (selectedStroke == elem) 
        { 
            strokesButton.classList.add("selected"); 
        }

        strokesButton.id = elem; 
        strokesButton.appendChild(strokesIcon); 
        strokesButton.onclick = strokeSelected; 
        strokesContainer.appendChild(strokesButton);
    });
}


function colorPallete()
{ 
    colors.forEach((elem) => {
        const colorButton = document.createElement("button"); 
        colorButton.className = "color-icon"; 
        colorButton.id = elem; 
        colorButton.style.backgroundColor = elem; 

        if(elem == selectedColor) selectedColorWindow.style.backgroundColor = elem; 

        colorButton.onclick = colorSelected; 
        colorsContainer.appendChild(colorButton); 
    }); 
}

/********************** different selections set up ************************/


/************* event listeners for each selection user can make *************/

function toolSelected(event)
{ 
    // unset all drawing functions and event listeners related to the former tool choice 
    unsetTool(); 

    document.getElementById(selectedTool).classList.remove("selected"); 
    selectedTool = event.currentTarget.id; 
    document.getElementById(selectedTool).classList.add("selected"); 

    // set all drawing functions and event listeners related to current tool choice 
    setTool();  
}

function strokeSelected(event)
{ 
    document.getElementById(selectedStroke).classList.remove("selected"); 
    selectedStroke = event.currentTarget.id; 
    selectedStrokeStyle = (selectedStroke  == "dashed") ? "dashed" : "solid"; 
    document.getElementById(selectedStroke).classList.add("selected"); 
}

function colorSelected(event)
{ 
    selectedColor = event.currentTarget.id; 
    selectedColorWindow.style.backgroundColor = selectedColor; 
}

/************* event listeners for each selection user can make *************/


/************* drawing functions for each drawing tool *************/
function setTool()
{ 
    if(selectedTool == 'pen') startDrawing(); 
    else if (selectedTool == 'eraser') startErasing(); 
    else if (selectedTool == 'emptySquare') startRectangle(false); 
    else if (selectedTool == 'filledSquare') startRectangle(true); 
    else if (selectedTool == 'emptyCircle') startCircle(false); 
    else if (selectedTool == 'filledCircle') startCircle(true); 
    else if (selectedTool == 'line') startLine(); 
    else startText(); 
}

function unsetTool()
{ 
    if (selectedTool == 'pen') stopDrawing(); 
    else if (selectedTool == 'eraser') stopErasing(); 
    else if (selectedTool == 'emptySquare') stopRect(); 
    else if (selectedTool == 'filledSquare') stopRect(); 
    else if (selectedTool == 'emptyCircle') stopCircle();  
    else if (selectedTool == 'filledCircle') stopCircle(); 
    else if (selectedTool =='line') stopLine(); 
    else stopText(); 
}


/************** PEN AND ERASER FUNCTIONS *************/

function startDrawing()
{ 
    color = erasing ? "#ffffff" : selectedColor; 
    erasing ? console.log("eraser picked") : console.log("pen picked"); 

    canvas.addEventListener('mousedown', penDown); 
    canvas.addEventListener('mousemove', penMove); 
    canvas.addEventListener('mouseup', penUp); 
}

function penDown(event)
{ 

    color = erasing ? "#ffffff" : selectedColor; 
    canvasDimensions = canvas.getBoundingClientRect();  // the window may have moved since last time drawn 


    lastX = event.clientX - canvasDimensions.left; 
    lastY = event.clientY - canvasDimensions.top;  
    drawing = true; 
}

function penMove(event)
{ 
    if(!drawing) return; 

    currX = event.clientX - canvasDimensions.left; 
    currY = event.clientY - canvasDimensions.top; 

    ctx.beginPath(); 
    ctx.moveTo(lastX, lastY); 
    ctx.lineTo(currX, currY); 
    ctx.strokeStyle = color; 
    ctx.lineWidth = strokeWidths[selectedStroke]; 
    if(selectedStrokeStyle == "dashed") ctx.setLineDash([5, 5]); 
    else ctx.setLineDash([]); 
    ctx.lineCap = 'round'; 
    ctx.stroke(); 

    lastX = currX; 
    lastY = currY; 
}

function penUp(event)
{ 
    drawing = false; 
}

function stopDrawing()
{ 
    canvas.removeEventListener('mousedown', penDown); 
    canvas.removeEventListener('mousemove', penMove); 
    canvas.removeEventListener('mouseup', penUp); 
}

function startErasing()
{ 
    erasing = true; 
    startDrawing(); 
}

function stopErasing()
{ 
    erasing = false; 
    stopDrawing(); 
}

/************** PEN AND ERASER FUNCTIONS *************/

/*********************** RECTANGLE FUNCTIONS ***********************/
let filled; 
let width, height; 

function startRectangle(rectType)
{ 
    filled = rectType; 
    canvas.addEventListener('mousedown', rectDown); 
    canvas.addEventListener('mousemove', rectMove); 
    canvas.addEventListener('mouseup', rectUp); 
}

function rectDown(event)
{ 
    canvasDimensions = canvas.getBoundingClientRect();  // the window may have moved since last time drawn 
    color = selectedColor; 

    lastX = event.clientX - canvasDimensions.left; 
    lastY = event.clientY - canvasDimensions.top;  
    width = 0; 
    height = 0; 
    drawing = true; 
}

function rectMove(event)
{ 
    if(!drawing) return; 

    ctx.clearRect(lastX - 1, lastY - 1, width + 2, height + 2); 

    currX = event.clientX - canvasDimensions.left; 
    currY = event.clientY - canvasDimensions.top; 
    width = currX - lastX; 
    height = currY - lastY; 

    ctx.strokeStyle = color; 
    if(filled) ctx.fillStyle = color; 

    if(filled) ctx.fillRect(lastX, lastY, width, height); 
    else 
    { 
        ctx.beginPath(); 
        ctx.rect(lastX, lastY, width, height); 
        ctx.stroke(); 
    }

}

function rectUp(event)
{  
    drawing = false; 
}

function stopRect()
{ 
    canvas.removeEventListener('mousedown', rectDown); 
    canvas.removeEventListener('mousemove', rectMove); 
    canvas.removeEventListener('mouseup', rectUp); 
}

/*********************** RECTANGLE FUNCTIONS ***********************/



/*********************** CIRCLE FUNCTIONS **************************/
let centerX, centerY; 
function startCircle(circleType)
{ 
    filled = circleType; 
    canvas.addEventListener('mousedown', circleDown); 
    canvas.addEventListener('mousemove', circleMove); 
    canvas.addEventListener('mouseup', circleUp); 
}

function circleDown(event)
{ 
    canvasDimensions = canvas.getBoundingClientRect();  // the window may have moved since last time drawn 
    color = selectedColor; 

    lastX = event.clientX - canvasDimensions.left; 
    lastY = event.clientY - canvasDimensions.top;  
    centerX = lastX; 
    centerY = lastY; 
    width = 0; 
    drawing = true; 
}

function circleMove(event)
{ 
    if(!drawing) return; 

    ctx.fillStyle = '#ffffff'; 
    ctx.beginPath(); 
    ctx.arc(centerX, centerY, width + 2, 0, Math.PI * 2); 
    ctx.fill(); 

    currX = event.clientX - canvasDimensions.left; 
    currY = event.clientY - canvasDimensions.top; 
    width = currX - lastX; 

    ctx.strokeStyle = color; 
    if(filled) ctx.fillStyle = color; 
    else ctx.fillStyle = '#ffffff'; 

    ctx.beginPath(); 
    ctx.arc(centerX, centerY, width, 0, 2 * Math.PI); 
    if (!filled) ctx.stroke();  
    else ctx.fill(); 
}

function circleUp(event)
{  
    drawing = false; 
}

function stopCircle()
{ 
    canvas.removeEventListener('mousedown', circleDown); 
    canvas.removeEventListener('mousemove', circleMove); 
    canvas.removeEventListener('mouseup', circleUp); 
}
/*********************** CIRCLE FUNCTIONS **************************/




/************** LINE FUNCTIONS *************/

function startLine()
{ 
    color = erasing ? "#ffffff" : selectedColor; 

    canvas.addEventListener('mousedown', lineDown); 
    canvas.addEventListener('mousemove', lineMove); 
    canvas.addEventListener('mouseup', lineUp); 
}

function lineDown(event)
{ 

    color = selectedColor; 
    canvasDimensions = canvas.getBoundingClientRect();  // the window may have moved since last time drawn 


    lastX = event.clientX - canvasDimensions.left; 
    lastY = event.clientY - canvasDimensions.top;  
    currX = lastX; 
    currY = lastY; 
    drawing = true; 
}

function lineMove(event)
{ 
    if(!drawing) return; 

    ctx.beginPath(); 
    ctx.moveTo(lastX, lastY); 
    ctx.lineTo(currX, currY); 
    ctx.strokeStyle = "#ffffff"; 
    ctx.lineWidth = strokeWidths[selectedStroke] + 2; 
    ctx.setLineDash([]); 
    ctx.stroke(); 

    currX = event.clientX - canvasDimensions.left; 
    currY = event.clientY - canvasDimensions.top; 

    ctx.beginPath(); 
    ctx.moveTo(lastX, lastY); 
    ctx.lineTo(currX, currY); 
    ctx.strokeStyle = color; 
    ctx.lineWidth = strokeWidths[selectedStroke]; 
    if(selectedStrokeStyle == "dashed") ctx.setLineDash([5, 5]); 
    else ctx.setLineDash([]); 

    ctx.stroke(); 
}

function lineUp(event)
{ 
    drawing = false; 
}

function stopLine()
{ 
    canvas.removeEventListener('mousedown', lineDown); 
    canvas.removeEventListener('mousemove', lineMove); 
    canvas.removeEventListener('mouseup', lineUp); 
}

/************** LINE FUNCTIONS *************/



/*********************** TEXT FUNCTIONS ***********************/
let currText; 

function startText()
{ 
    canvas.addEventListener('mousedown', textDown); 
    document.addEventListener('keydown', textType); 
}

function textDown(event)
{ 
    canvasDimensions = canvas.getBoundingClientRect();  // the window may have moved since last time drawn 
    color = '#000000'; 
    currText = ""; 

    currX = lastX = event.clientX - canvasDimensions.left; 
    currY = lastY = event.clientY - canvasDimensions.top;  
    width = 0; 
    drawing = true; 
}

function textType(event)
{ 
    if(!drawing) return; 

    ctx.clearRect(lastX - 10, lastY - 25, width + 10, 30); 
 
    if(event.key.length == 1) currText += event.key; 
    else if (event.key == "Backspace" && currText.length > 0) currText = currText.slice(0, -1);
    width = ctx.measureText(currText).width + 20; 
    ctx.font = "20px DePixel"; 
    ctx.fillStyle = color; 
    ctx.fillText(currText, lastX, lastY);

}

function stopText()
{ 
    drawing = false; 
    canvas.removeEventListener('mousedown', textDown); 
    document.removeEventListener('mousemove', textType);  
}

/*********************** TEXT FUNCTIONS ***********************/