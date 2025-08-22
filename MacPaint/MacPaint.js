import { dragElement } from "../drag.js"; 
import { closeWidget } from "../close.js"; 

const paintWidget = document.getElementById("MacPaint-widget"); 
dragElement(paintWidget); 
closeWidget(paintWidget);



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


/********************** different selections set up ************************/
function toolBar() 
{ 
    // clear any previous toolBar drawn 
    toolsContainer.innerHTML = ""; 
    
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
    document.getElementById(selectedTool).classList.remove("selected"); 
    selectedTool = event.currentTarget.id; 
    document.getElementById(selectedTool).classList.add("selected"); 
}

function strokeSelected(event)
{ 
    document.getElementById(selectedStroke).classList.remove("selected"); 
    selectedStroke = event.currentTarget.id; 
    document.getElementById(selectedStroke).classList.add("selected"); 
}

function colorSelected(event)
{ 
    selectedColor = event.currentTarget.id; 
    selectedColorWindow.style.backgroundColor = selectedColor; 
}