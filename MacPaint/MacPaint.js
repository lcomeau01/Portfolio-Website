import { dragElement } from "../drag.js"; 
import { closeWidget } from "../close.js"; 

const paintWidget = document.getElementById("MacPaint-widget"); 
dragElement(paintWidget); 
closeWidget(paintWidget);

// Tool Selection Setup
const toolsContainer = document.getElementById("tools-container"); 
const tools = ["text", "pen", "emptySquare", "filledSquare", "emptyCircle", "filledCircle", "eraser", "line"]; 
const toolIcons = {"text": '<i class="fa-solid fa-a"></i>', "pen": '<i class="fa-solid fa-pen"></i>',
                    "eraser": '<i class="fa-solid fa-eraser"></i>'}; 

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

    toolsContainer.appendChild(toolButton)
}); 


// Stroke Selection Setup 
const strokesContainer = document.getElementById("strokes-container"); 
const strokes = ["dashed", "solid1", "solid2", "solid3", "solid4"]; 
const strokeWidths = {"dashed": 1, "solid1": 1, "solid2": 3, "solid3": 5, "solid4": 10}; 
const strokeSelectedIcon = '<i class="fa-solid fa-check"></i>'; 
let strokeSelected = "solid2"; 

strokes.forEach((elem) => {
    const strokesButton = document.createElement("button");

    const strokesIcon = document.createElement("div"); 
    strokesIcon.className = "strokes-icon";
    strokesIcon.id = elem;
    strokesIcon.style.borderWidth = strokeWidths[elem] + "px"; 

    strokesButton.innerHTML = strokeSelectedIcon; 

    if (strokeSelected == elem) 
    { 
        strokesButton.classList.add("selected"); 
    }

    strokesButton.appendChild(strokesIcon); 
    strokesContainer.appendChild(strokesButton);
});


// Color Selection Setup
const colorsContainer = document.getElementById("colors-container"); 
const colors = ["#FFFFFF", "#E3E3E3", "#C7C7C7", "#AAAAAA", "#8E8E8E", 
                "#717171", "#555555", "#383838", "#1C1C1C", "#000000"]; 
const selectedColorWindow = document.getElementById("selected-color-window"); 
let selectedColor = "#555555"; 

colors.forEach((elem) => {
    const colorButton = document.createElement("button"); 
    colorButton.className = "color-icon"; 
    colorButton.id = elem; 
    colorButton.style.backgroundColor = elem; 

    if(elem == selectedColor) selectedColorWindow.style.backgroundColor = elem; 

    colorsContainer.appendChild(colorButton); 
}); 