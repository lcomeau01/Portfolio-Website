export function dragElement(elmnt)
{ 
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0; 

    const header =   document.getElementById(elmnt.id + "-header"); 

    header.onmousedown = dragMouseDown; 
    const viewportWidth = window.innerWidth * .97; 
    const viewportHeight = window.innerHeight * .97; 

    function dragMouseDown(e) 
    { 
        e = e || window.event; 
        e.preventDefault(); 

        // get the mouse cursor position at startup 
        pos3 = e.clientX; 
        pos4 = e.clientY; 
        document.onmouseup = closeDragElement; 

        // change the mouse to show the user that it is holding the header 
        header.style.cursor = "grabbing"; 

        // call a function when the cursor moves (when it is selecting the header)
        document.onmousemove = elementDrag; 
    }

    function elementDrag(e)
    { 

        e = e || window.event; 
        e.preventDefault(); 

        // calculate the new cursor position 
        pos1 = pos3 - e.clientX; 
        pos2 = pos4 - e.clientY; 

        // the new cursor position for next calculation 
        pos3 = e.clientX; 
        pos4 = e.clientY; 

        // set the elements new position
        // make sure it stays within the bounds of the webpage 
        var newTop = (elmnt.offsetTop - pos2); 
        if(newTop < 0) newTop = 0; 
        else if(newTop + elmnt.offsetHeight > viewportHeight) newTop = viewportHeight - elmnt.offsetHeight; 

        var newLeft = elmnt.offsetLeft - pos1; 
        if (newLeft < 0) newLeft = 0; 
        else if (newLeft + elmnt.offsetWidth > viewportWidth) newLeft = viewportWidth - elmnt.offsetWidth; 
        
        elmnt.style.top = newTop + "px"; 
        elmnt.style.left = newLeft + "px"; 

        elmnt.style.zIndex = new Date().getTime; 
    }

    function closeDragElement()
    { 
        header.style.cursor = "grab"; 
        document.onmouseup = null; 
        document.onmousemove = null;
    }
}