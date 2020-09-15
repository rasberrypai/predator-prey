const PreyBaseHealth = 0;
let PreyReproductionThreshold = 5;
let PreyRunPenalty = -0.5;
let PreyHealthDerivative = 1;
const PredatorBaseHealth = 10;
let PredatorHealthDerivative = -1.5;
let PredatorCompetitionPenalty = -0.5;

class Prey {
  constructor(x,y,updateTurn) {
      this.health = PreyBaseHealth;
      this.updateTurn = updateTurn;
  }
  update(x, y) {
      if(this.updateTurn !== turnCounter) return;
      this.updateTurn++;
      let targetY = y + floor(random(3))-1;
      let targetX = x + floor(random(3))-1;
      if(!inBounds(targetX,targetY)) return;
      let targetCell = grid[targetY][targetX];
      if(targetCell instanceof Empty){
          if(this.health >= PreyReproductionThreshold)
            this.reproduce(targetX,targetY);
          else
            this.move(x,y,targetX,targetY)
      } else if(targetCell instanceof Predator)
          this.health += PreyRunPenalty;

      this.health += PreyHealthDerivative;
  }
  move(x, y, targetX, targetY) {
      grid[targetY][targetX] = this;
      grid[y][x] = new Empty(x,y);
  }
  reproduce(x,y) {
      grid[y][x] = new Prey(x,y,turnCounter+1);
      this.health = 0;
  }
}
class Predator {
  constructor(x,y,updateTurn) {
    this.health = PredatorBaseHealth;
    this.updateTurn = updateTurn;
  }
  update(x, y) {
    if(this.updateTurn !== turnCounter) return;
    this.updateTurn++;
    if (this.health <= 0)
      grid[y][x] = new Empty();
    else {
      let targetY = y + floor(random(3))-1;
      let targetX = x + floor(random(3))-1;
      if(!inBounds(targetX,targetY)) return;
      let targetCell = grid[targetY][targetX];
      if(targetCell instanceof Prey){
        this.health += targetCell.health;
        this.reproduce(targetX,targetY);
      } else if(targetCell instanceof Empty)
        this.move(x,y,targetX,targetY);
      else if(targetCell instanceof Predator)
        this.health += PredatorCompetitionPenalty;

      this.health += PredatorHealthDerivative;
    }
  }

  move(x, y, targetX, targetY) {
      grid[targetY][targetX] = this;
      grid[y][x] = new Empty(x,y);
  }

  reproduce(x, y) {
      grid[y][x] = new Predator(x,y,turnCounter+1);
  }
}
class Empty {
  update(x, y) {

  }
}

function inBounds(x,y){
  return y > -1 && x > -1 && y < grid.length && x < grid[y].length;
}

function ChangePredatorHunger(){
    let percentage = parseInt(document.getElementById("predator-hunger").value)/100;
    PredatorHealthDerivative = PredatorBaseHealth * percentage * -1;
}
function ChangePredatorCompetition(){
    let percentage = parseInt(document.getElementById("predator-competition").value)/100;
    PredatorCompetitionPenalty = PredatorBaseHealth * percentage * -1;
}
function ChangePreyNutrition(){
  let percentage = parseInt(document.getElementById("predator-nutrition").value)/100;
  PreyHealthDerivative = PredatorBaseHealth * percentage;
}
function ChangePreyReproduction(){
  let percentage = parseInt(document.getElementById("prey-reproduction-rate").value)/100;
  PreyReproductionThreshold = PreyHealthDerivative / percentage;
}
function ChangePreyRunPenalty(){
  let percentage = parseInt(document.getElementById("prey-run-penalty").value)/100;
  PreyRunPenalty = PreyReproductionThreshold * percentage * -1;
}
