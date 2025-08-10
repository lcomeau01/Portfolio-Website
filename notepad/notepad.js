
import { closeWidget } from "../close.js";
import { dragElement } from "../drag.js";

const notepad = document.getElementById('notepad-widget'); 
const canvas = document.getElementById('next-back-buttons'); 
var currentPage = 1; 
canvas.height = canvas.offsetHeight;
console.log(canvas.height); 
canvas.width = canvas.offsetWidth;
const ctx = canvas.getContext("2d"); 
const pageNumber = document.getElementById('page-number'); 

dragElement(notepad); 
closeWidget(notepad); 
pageNumber.innerText = currentPage; 

/********* DRAWING THE TRIANGLES ON THE CANVAS **********/
ctx.beginPath();
ctx.moveTo(-6, 0);                 // top-left
ctx.lineTo(canvas.width, 0);      // top-right
ctx.lineTo(canvas.width, canvas.height - 10);     // bottom-left
ctx.closePath();

ctx.lineWidth = 7;
ctx.fillStyle = "white";
ctx.fill();
ctx.stroke();


ctx.beginPath(); 
ctx.moveTo(-6, 0); 
ctx.lineTo(0, canvas.height - 10); 
ctx.lineTo(canvas.width, canvas.height - 10); 
ctx.closePath(); 

ctx.lineWidth = 0.5; 
ctx.strokeStyle = "white"; 
ctx.fillStyle = "white";
ctx.fill();
ctx.stroke(); 
/********** DRAWING THE TRIANGLES ON THE CANVAS ***********/


canvas.addEventListener("click", nextOrBack); 


function nextOrBack(event)
{ 
    const button = canvas.getBoundingClientRect(); 
    const x = event.clientX - button.left; 
    const y =  event.clientY - button.top; 
    console.log(event.clientX - button.left, event.clientY - button.top); 

    if(y < x) console.log("UPPER HALF"); 
    else console.log("LOWER HALF"); 

    if(y < x) changePage("prev"); 
    else changePage("next"); 
}

function changePage(direction)
{ 
    // get the id of the current notepage 
    let currID = "notepage-" + currentPage; 

    // get the next page number 
    if(direction == "prev")
    { 
        if(currentPage == 1) currentPage = 8; 
        else currentPage--; 
    }
    else
    { 
        if(currentPage == 8) currentPage = 1; 
        else currentPage++; 
    }

    // get the ID of the new notepage 
    let nextID = "notepage-" + currentPage; 

    // change which textArea is currently visable 
    document.getElementById(currID).classList.remove("active-page"); 
    document.getElementById(nextID).classList.add("active-page"); 
    pageNumber.innerText = currentPage; 
}

