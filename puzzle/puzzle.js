import { closeWidget } from "../close.js";
import { dragElement } from "../drag.js";


const puzzle = document.getElementById("puzzle-widget"); 
let tileNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; 
let tileValues = [];
let possibleMoves = [];
let emptyIndex = 0; 

dragElement(puzzle);
closeWidget(puzzle); 

for(let i = 1; i < 17; i++)
{ 
    let index = Math.floor(Math.random() * tileNumbers.length); 

    let value = tileNumbers[index]; 
    tileNumbers.splice(index, 1); 

    tileValues.push(value); 
}
populateTiles(); 

const grid = document.getElementById("tiles-container"); 
const gridDimensions = grid.getBoundingClientRect(); 
const tileWidth = document.getElementById("tile-1").offsetWidth; 

grid.addEventListener("click", getRowCol); 

function getRowCol(event)
{ 
    let mouseX = event.clientX - gridDimensions.left; 
    let mouseY =  event.clientY - gridDimensions.top; 

    let tileX = Math.floor(mouseX/tileWidth); 
    let tileY = Math.floor(mouseY/tileWidth); 

    console.log("(" + tileX + ", " +  tileY + ")"); 
}

function populateTiles()
{ 
    tileValues.forEach((value, index) => { 
        let currTile = document.getElementById("tile-" + index ); 
        if(value == 0) 
        { 
            currTile.classList.add("missing-tile");
            populatePossibleMoves(index); 
            emptyIndex = index; 
        }
        else 
        { 
            if (currTile.classList.contains("missing-tile")) currTile.classList.remove("missing-tile"); 
            currTile.innerText = value; 
        }
    }); 
}

function populatePossibleMoves(arrIndex)
{ 
    // empty previous possible moves 
    possibleMoves.length = 0; 

    let { tileX, tileY } = arrToTile(arrIndex);
    
    let down = tileY < 3;
    let up = tileY > 0;
    let left = tileX > 0;
    let right = tileX < 3;

    if (down)  possibleMoves.push(tileToArr(tileX, tileY + 1));
    if (up)    possibleMoves.push(tileToArr(tileX, tileY - 1));
    if (left)  possibleMoves.push(tileToArr(tileX - 1, tileY));
    if (right) possibleMoves.push(tileToArr(tileX + 1, tileY));

    console.log(possibleMoves); 
}

function arrToTile(arrIndex)
{ 
    let tileX = arrIndex % 4; 
    let tileY = Math.floor(arrIndex / 4); 

    return {tileX, tileY}; 
}

function tileToArr(tileX, tileY)
{ 
    return (4 * tileY) + tileX; 
}

function swapSpots(newEmpty)
{ 
    return true; 
}