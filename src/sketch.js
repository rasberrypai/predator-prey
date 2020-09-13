let canvasWidth = 600;
let canvasHeight = 600;

let graphHeight = 285;

let squareSize = 15;

var grid = [];
var data = [];

let start = false;
var turnCounter = 0;

function setup(){
  frameRate(15);
  createCanvas(canvasWidth,canvasHeight);
  background(255);
  populate();
}

function draw(){
  background(255);
  drawGrid();
  if(start){
    update();
  }
  drawGraph();
}

function populate(){
  let states = [Predator,Prey,Empty,Empty,Empty,Empty];
  for(let y = 0; y < (canvasHeight-graphHeight)/squareSize; y++){
    let row = [];
    for(let x = 0; x < canvasWidth/squareSize; x++){
      let state = floor(random(states.length));
      row.push(new states[state](x,y,1));
    }
    grid.push(row);
  }
  data.push([]);
  data.push([]);
}

function drawGrid(){
  let predators = 0;
  let prey = 0;
  let alive = false;
  stroke(175);
  for(let y = 0; y < grid.length; y++){
    for(let x = 0; x < grid[y].length; x++){
      if(grid[y][x] instanceof Predator){
        fill(color("red"));
        alive = true;
        predators++;
      }
      else if(grid[y][x] instanceof Prey){
        fill(color("green"));
        alive = true;
        prey++;
      } else
        fill(color("white"));
      rect(x*squareSize,y*squareSize,squareSize,squareSize);
    }
  }
  if(start){
    data[0].push(predators);
    data[1].push(prey);
  }
  if(!alive)
    start = false;
}

function drawGraph(){
  let visibleDataPoints = 50;
  let maxValue = 0;
  for(let i = 0; i < visibleDataPoints && i < data[0].length; i++){
    let a = data[0].length > visibleDataPoints ? i + data[0].length - visibleDataPoints : i;
    if(data[0][a] > maxValue)
      maxValue = data[0][a];
    if(data[1][a] > maxValue)
      maxValue = data[1][a];
  }
  let widthIncrement = canvasWidth/visibleDataPoints;
  let heightIncrement = (graphHeight-5)/maxValue;
  strokeWeight(2);
  for(let i = 0; i < visibleDataPoints && i < data[0].length-1; i++){
    stroke(color("red"));
    let x1 = i * widthIncrement;
    let x2 = (i+1) * widthIncrement;
    let a = data[0].length > visibleDataPoints ? i + data[0].length - visibleDataPoints - 1 : i;

    let y1 = data[0][a]*heightIncrement;
    let y2 = data[0][a+1]*heightIncrement;
    line(x1,canvasHeight-y1,x2,canvasHeight-y2);

    fill(color("red"));
    if(a == data[0].length-2){
      ellipse(x2,canvasHeight-y2,4,4);
    }

    stroke(color("green"));
    y1 = data[1][a]*heightIncrement;
    y2 = data[1][a+1]*heightIncrement;
    line(x1,canvasHeight-y1,x2,canvasHeight-y2);

    fill(color("green"));
    if(a == data[1].length-2)
      ellipse(x2,canvasHeight-y2,4,4);
  }
}

function update(){
  turnCounter++;
  let predators = 0;
  let prey = 0;
  for(let y = 0; y < grid.length; y++){
    for(let x = 0; x < grid[y].length; x++){
      if(grid[y][x] instanceof Predator || grid[y][x] instanceof Prey)
        grid[y][x].update(x,y);
    }
  }
}

function keyPressed(){
  if(keyCode == 32) //Space
    start = !start;
}
