const PreyBaseHealth = 0;
const PreyReproductionThreshold = 10;
const PreyRunPenalty = -1;
const PreyHealthDerivative = 2;
const PredatorBaseHealth = 20;
const PredatorHealthDerivative = -3;
const PredatorCompetitionPenalty = -1;

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

}

function inBounds(x,y){
  return y > -1 && x > -1 && y < grid.length && x < grid[y].length;
}
