var turnCounter;
let predatorSpawnRate = 20;
let preySpawnRate = 20;

function populate(){
  turnCounter = 0;
  grid = [];
  data = [];
  let predators = 0;
  let prey = 0;
  for(let y = 0; y < floor(canvasHeight/squareSize); y++){
    let row = [];
    for(let x = 0; x < floor(canvasWidth/squareSize); x++){
      let state = random(100);
      if(state < predatorSpawnRate){
        predators++;
        row.push(new Predator(x,y,1));
      }
      else if(state < predatorSpawnRate + preySpawnRate){
        prey++;
        row.push(new Prey(x,y,1));
      } else
        row.push(new Empty(x,y,1));
    }
    grid.push(row);
  }
  //starting data
  data.push([predators]);
  data.push([prey]);
}

function update(){
  turnCounter++;
  let predators = 0;
  let prey = 0;
  for(let y = 0; y < grid.length; y++){
    for(let x = 0; x < grid[y].length; x++){
      if(grid[y][x] instanceof Predator)
        predators++;
      else if(grid[y][x] instanceof Prey)
        prey++;
      grid[y][x].update(x,y);
    }
  }
  if(prey === grid.length*grid[0].length || (prey == 0 && predators == 0)){
    noLoop();
    done = true;
  }
  data[0].push(predators);
  data[1].push(prey);
}

function drawGrid(){
  for(let y = 0; y < grid.length; y++){
    for(let x = 0; x < grid[y].length; x++){
      stroke(255);
      strokeWeight(0.5);
      if(grid[y][x] instanceof Predator)
        fill(color("red"));
      else if(grid[y][x] instanceof Prey)
        fill(color("green"));
      else {
        noStroke();
        fill(255);
      }
      rect(x*squareSize,y*squareSize,squareSize,squareSize);
    }
  }
}

function TrimSpawnRates(){
  if(parseInt(document.getElementById("predator-spawn-rate").value) > 100)
    document.getElementById("predator-spawn-rate").value = 100;
  if(parseInt(document.getElementById("prey-spawn-rate").value) > 100)
    document.getElementById("prey-spawn-rate").value = 100;
  if(parseInt(document.getElementById("predator-spawn-rate").value) < 0)
    document.getElementById("predator-spawn-rate").value = 0;
  if(parseInt(document.getElementById("prey-spawn-rate").value) < 0)
    document.getElementById("prey-spawn-rate").value = 0;
}

function  ChangePredatorSpawnRate(){
  TrimSpawnRates();
  predatorSpawnRate = parseInt(document.getElementById("predator-spawn-rate").value);
  preySpawnRate = parseInt(document.getElementById("prey-spawn-rate").value);
  if(predatorSpawnRate + preySpawnRate > 100){
    document.getElementById("prey-spawn-rate").value = 100 - predatorSpawnRate;
    preySpawnRate = 100 - predatorSpawnRate;
  }
}

function  ChangePreySpawnRate(){
  TrimSpawnRates();
  predatorSpawnRate = parseInt(document.getElementById("predator-spawn-rate").value);
  preySpawnRate = parseInt(document.getElementById("prey-spawn-rate").value);
  if(predatorSpawnRate + preySpawnRate > 100){
    document.getElementById("predator-spawn-rate").value = 100 - preySpawnRate;
    predatorSpawnRate = 100 - preySpawnRate;
  }
}
