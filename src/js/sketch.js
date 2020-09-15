let canvasWidth;
let canvasHeight;

let squareSize = 15;

var grid;
var data;

var done = false;

let drawState = 0;

function setup(){
  frameRate(16);
  initCanvas();
  populate();
  noLoop();
}

function initCanvas(){
  let canvasContainer = document.getElementById("predator-prey-canvas");
  canvasWidth = parseInt(getComputedStyle(canvasContainer).width,10);
  canvasHeight = parseInt(getComputedStyle(canvasContainer).height,10);
  let renderer = createCanvas(canvasWidth,canvasHeight);
  renderer.parent(canvasContainer);
}

function draw(){
  clear();
  switch(drawState){
    case 0:
      drawGrid();
      break;
    case 1:
      drawGraph();
      break;
    case 2:
      //drawSettings();
      break;
    default:
      break;
  }
  if(isLooping())
    update();
}

function Play(){
  if(done)
    Reset();
  loop();
}
function Pause(){
  noLoop();
}
function Reset(){
  populate();
  if(!isLooping() && !done)
    draw();
  done = false;
}
function ChangeSize(){
  squareSize = parseInt(document.getElementById("size-slider").value);
  squareSize*=-1;
  Reset();
}
function ChangeSpeed(){
  setFrameRate(parseInt(document.getElementById("speed-slider").value));
}
function SimulationSwitch(){
  ClearStyling();
  highlightNavButton(document.getElementById("simulation-button"));
  drawState = 0;
  if(!isLooping())
    draw();
}
function GraphSwitch(){
  ClearStyling();
  highlightNavButton(document.getElementById("graph-button"));
  drawState = 1;
  if(!isLooping())
    draw();
}
function SettingsSwitch(){
  ClearStyling();
  highlightNavButton(document.getElementById("settings-button"));
  drawState = 2;
  if(!isLooping())
    draw();

  document.getElementById("predator-prey-settings").style.display = "flex";
  document.getElementById("defaultCanvas0").style.display = "none";
}
function ClearStyling(){
  for(let button of document.getElementsByClassName("predator-prey-nav-button")){
    button.style.background = null;
    button.style.color = null;
  }
  document.getElementById("predator-prey-settings").style.display = "none";
  document.getElementById("defaultCanvas0").style.display = null;
}
function highlightNavButton(button){
  button.style.background = "#008CBA";
  button.style.color = "white";
}
