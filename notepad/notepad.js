import { closeWidget } from "../close.js";
import { dragElement } from "../drag.js";

const notepad = document.getElementById('notepad-widget'); 

dragElement(notepad); 
closeWidget(notepad); 

