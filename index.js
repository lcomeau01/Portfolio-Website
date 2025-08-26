const screen = document.getElementById("screen"); 

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

const documents = document.getElementById("document-previews"); 
const documentNames = ["Resume", "User Guide"]; 

documentNames.forEach((elem) => { 
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

    documents.appendChild(newDocument);   

}); 


const menuItems = document.getElementsByClassName("toolBarMenuItems"); 
const menuContents = {"apple": ["About the Developer...", "Alarm Clock", "Calculator", "Tile Puzzle", "NotePad", "MacPaint 1.0"]}; 

Array.from(menuItems).forEach((elem) => { 
    elem.addEventListener('mousedown', menuItemClicked); 
    elem.addEventListener('mouseup', menuItemUnclicked); 
}); 

const apple = document.getElementById("apple"); 
const appleX = apple.offsetLeft
const appleY = apple.offsetTop; 
const appleMenu = document.createElement("div"); 
menuContents.apple.forEach((elem, i) => { 
    let newMenuItem = document.createElement("button"); 
    newMenuItem.innerText = elem; 
    newMenuItem.id = "appleMenuItem" + i; 
    newMenuItem.className = "appleMenuItem"; 

    appleMenu.appendChild(newMenuItem); 
}); 

appleMenu.id = "appleMenu"; 
appleMenu.style.top = appleY + 5 + "px"; 
appleMenu.style.left = appleX - 2+ "px"; 
appleMenu.style.display = 'none'; 
screen.appendChild(appleMenu); 

function menuItemClicked(event)
{ 
    let item = event.currentTarget; 
    item.addEventListener('mouseleave', menuItemUnclicked); 
    item.style.backgroundColor = 'black'; 
    item.style.color = 'white'; 
    if(item.id == "apple") appleMenu.style.display = 'flex'; 
}

function menuItemUnclicked(event)
{ 
    let item = event.currentTarget; 
    item.style.backgroundColor = 'white'; 
    item.style.color = 'black'; 
    if(item.id == "apple") appleMenu.style.display = 'none'; 
}