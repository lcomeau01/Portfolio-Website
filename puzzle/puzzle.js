import { closeWidget } from "../close.js";
import { dragElement } from "../drag.js";


const puzzle = document.getElementById("TilePuzzle-widget"); 
let possibleTileValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const winCondition = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]; 
const beep =  new Audio('../beep.mp3');

let tileValues = [];
let possibleMoves = [];
let emptyIndex = 0; 


dragElement(puzzle);
closeWidget(puzzle); 

getRandomPuzzle(); 

function getRandomPuzzle()
{ 
    for(let i = 1; i < 17; i++)
    { 
        let index = Math.floor(Math.random() * possibleTileValues.length); 

        let value = possibleTileValues[index]; 
        possibleTileValues.splice(index, 1); 

        tileValues.push(value); 
    }
    // tileValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15];
    populateTiles(); 
}


const grid = document.getElementById("tiles-container"); 
let gridDimensions = grid.getBoundingClientRect(); 
const tileWidth = document.getElementById("tile-1").offsetWidth; 

grid.addEventListener("click", tileClicked); 

function tileClicked(event)
{ 
    let { tileX, tileY } = getRowCol(event);
    let arrIndex = tileToArr(tileX, tileY); 

    if(possibleMoves.includes(arrIndex)) swapSpots(arrIndex); 
}

function getRowCol(event)
{ 
    gridDimensions = grid.getBoundingClientRect();  // in case window was moved
    
    let mouseX = event.clientX - gridDimensions.left; 
    let mouseY =  event.clientY - gridDimensions.top; 

    let tileX = Math.floor(mouseX/tileWidth); 
    let tileY = Math.floor(mouseY/tileWidth); 

    return {tileX, tileY}; 
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
            currTile.innerText = ""; 
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
    tileValues[emptyIndex] = tileValues[newEmpty]; 
    tileValues[newEmpty] = 0; 
    checkWin(); 
    populateTiles(); 
}

function checkWin()
{ 
    for(let i = 0; i < 16; i++)
    { 
        if(tileValues[i] != winCondition[i]) return false; 
    }

    beep.play(); 
    grid.removeEventListener('click', tileClicked); 
}