import { dragElement } from "../drag.js"; 
import { closeWidget } from "../close.js"; 

const paintWidget = document.getElementById("MacPaint-widget"); 

dragElement(paintWidget); 
closeWidget(paintWidget);
