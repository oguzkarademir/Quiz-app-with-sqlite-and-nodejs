import { answerHandler } from "./answer-handler.js";
import { displayHandler } from "./display-handler.js"

document.getElementById('start-btn')
  .addEventListener('click', displayHandler); 

document.getElementById('next-btn')
  .addEventListener('click', displayHandler);
  
document.getElementById('answer-buttons')
  .addEventListener('click', answerHandler);