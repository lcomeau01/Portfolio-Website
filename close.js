export function closeWidget(parent)
{ 
    const exit = document.getElementById("exit-box"); 
    exit.onclick = function() 
    { 
        parent.style.display = "none"; 
    }

    exit.addEventListener("mouseover", addX); 
    exit.addEventListener("mouseleave", subX)

    function addX()
    { 
        exit.innerHTML = '&#x2715'; 
    }
    function subX()
    { 
        exit.innerHTML = ''; 
    }
}