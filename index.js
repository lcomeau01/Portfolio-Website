const screen = document.getElementById("screen"); 
const vw = window.innerWidth / 100;

const folders = document.getElementById("folder-previews"); 
const folderNames = ["projects", "Contact Me", "About Me", "ScreenShots"]; 

folderNames.forEach((elem) => { 
    let newFolder = document.createElement("button"); 
    newFolder.id = elem;  
    newFolder.className = "folder"; 

    let newFolderIcon = document.createElement("img"); 
    newFolderIcon.src = "images/folder.png"; 
    newFolderIcon.className = "folderIcon"; 

    let newFolderLabel = document.createElement("p"); 
    newFolderLabel.innerText = elem; 
    newFolderLabel.className = "folderLabel"; 

    newFolder.appendChild(newFolderIcon); 
    newFolder.appendChild(newFolderLabel); 

    folders.appendChild(newFolder); 
}); 

const desktopDocuments = document.getElementById("document-previews"); 
const desktopDocumentNames = ["Resume", "User Guide"]; 

desktopDocumentNames.forEach((elem) => { 
    let newDocument = document.createElement("button"); 
    newDocument.id = elem;  
    newDocument.className = "document"; 

    let newDocumentIcon = document.createElement("img"); 
    newDocumentIcon.src = "images/file.png"; 
    newDocumentIcon.className = "documentIcon"; 

    let newDocumentLabel = document.createElement("p"); 
    newDocumentLabel.innerText = elem; 
    newDocumentLabel.className = "documentLabel"; 

    newDocument.appendChild(newDocumentIcon); 
    newDocument.appendChild(newDocumentLabel); 

    desktopDocuments.appendChild(newDocument);   

}); 


const toolBarItems = document.querySelectorAll("button.toolBarMenuItems"); 
console.log(toolBarItems); 
const menuContents = {"apple": ["About the Developer...", "Alarm Clock", "Calculator", "Tile Puzzle", "NotePad", "MacPaint"], 
                      "file": ["hi there", "good morning", "sort", "copy", "duplicate"], 
                      "edit": ["copy", "paste", "cut", "edject", "trim", "L"]
};
const menus = {}; 

toolBarItems.forEach((item) => { 
    let id = item.id; 

    if (!menus[id]) createMenu(id); 

    item.addEventListener("mousedown", handleMenuPress); 
    item.addEventListener("mouseleave", handleMenuMove); 
    item.addEventListener("mouseup", handleMenuUp); 
}); 

function createMenu(itemId)
{ 
    let item = document.getElementById(itemId); 

    const menu = document.createElement("div"); 
    menu.id = itemId + "Menu"; 

    menu.style.left = (item.offsetLeft + 3) + "px";
    menu.style.top = item.offsetTop + item.offsetHeight + "px"; 
    menu.style.display = "none"; 

    if(menuContents[itemId])
    { 
        menuContents[itemId].forEach((elem) => { 
            let newMenuItem = document.createElement("button"); 
            newMenuItem.innerText = elem; 
            newMenuItem.id = elem.replaceAll(' ', '').replaceAll('.', '');
            newMenuItem.className = "menuItem"; 

            newMenuItem.addEventListener("mouseup", () => console.log("selected app:", elem)); 

            menu.appendChild(newMenuItem); 
        }); 
    }

    screen.appendChild(menu); 
    menus[itemId] = menu;
}

function handleMenuPress(event)
{ 
    let toolBarItem = event.currentTarget; 

    toolBarItem.style.backgroundColor = "black";
    toolBarItem.style.color = "white"; 

    let toolBarMenu = document.getElementById(toolBarItem.id + "Menu"); 
    toolBarMenu.style.display = "flex"; 
}

function handleMenuUp(event)
{ 
    let toolBarItem = event.currentTarget; 
    hideMenu(toolBarItem);
}

function handleMenuMove(event)
{ 
    console.log(event.currentTarget); 
    let toolBarItem = event.currentTarget; 
    let toolBarMenu = document.getElementById(toolBarItem.id + "Menu"); 

    if(!toolBarMenu.contains(event.relatedTarget)) hideMenu(toolBarItem); 
    else 
    { 
        toolBarMenu.addEventListener('mouseleave', () => hideMenu(toolBarItem)); 
        toolBarMenu.addEventListener('mouseup', () => hideMenu(toolBarItem)); 
    }
}

function hideMenu(item)
{ 
    item.style.backgroundColor = "white";
    item.style.color = "black"; 

    let menu = document.getElementById(item.id + "Menu"); 
    menu.style.display = "none"; 
}