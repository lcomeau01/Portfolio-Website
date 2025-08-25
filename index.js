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