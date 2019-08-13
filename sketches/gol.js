var grid;
var timer;
var gen;
var paused;
var speed;

function setup () {
  createCanvas(600, 600);
  print("the most challenging part of customizing was figuring out how to use functions for mousePressed.");
  print("Not too much out of my comfort, yet,  intend to keep working on it.");
  print("Happy, this was a combination of all i have learned in my coding experience.");
  grid = new Grid(20);
  grid.randomize();
  timer=0;
  gen=0;
  paused=false;
  speed=5;
}

function draw () {
  background(250);
  grid.draw();
  if(!paused){
  if(timer%speed===0){
   grid.updateNeighborCounts();
   grid.updatePopulation();
   gen++;
  } 
  timer++;
  }
  
}

class Grid {
  constructor (cellSize) {
    // update the contructor to take cellSize as a parameter
    // use cellSize to calculate and assign values for numberOfColumns and numberOfRows
    this.numberOfColumns=width/cellSize;
    this.numberOfRows=height/cellSize;
    this.cellSize=cellSize;
    
    var x = this.numberOfColumns; // how big the first array should be
var y = this.numberOfRows; // how big each array inside of the first array should be
var cells = new Array(x);
for (var i = 0; i < cells.length; i ++) {
  cells[i] = new Array(y);
}
    
    for (var column = 0; column < this.numberOfColumns; column ++) {
  for (var row = 0; row < this.numberOfRows; row++) {
    cells[column][row] = new Cell(column, row, this.cellSize);
  }
}
this.cells=cells;
    
}

currentValues(){
  var count=0;
  for (var column = 0; column < this.numberOfColumns; column ++) {
    for (var row = 0; row < this.numberOfRows; row++) {
      if(this.cells[column][row].isAlive)
        count++;
  }}
  fill(0)
  textSize(20);
  text("Alive: " + count, width-100, 80);
  text("Gen: " + gen, width-100, 60);
}

buttons(){
  textSize(15);
  text("Pause", width-90, 20);
  text("Speed", width-100, 40);
  text("Reset", width-90, 99);
  textSize(12);
  text("+", width-54, 40);
  text("-", width-33, 39);
  stroke(0);
  strokeWeight(2);
  noFill();
  rect(width-100, 5, 80, 20);
  rect(width-100, 85, 80, 17);
  strokeWeight(1);
  rect(width-55, 30, 10, 10);
  rect(width-35, 30, 10, 10);
  noStroke();
  
}

randomize(){
   for (var column = 0; column < this.numberOfColumns; column ++) {
  for (var row = 0; row < this.numberOfRows; row++) {
    this.cells[column][row].setIsAlive(floor(random(2)));
  }}
}

  draw () {
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row].draw();
      }
    }
    grid.currentValues();
    grid.buttons();
  }
  
  updatePopulation(){
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row].liveOrDie();
      }
    }
  }
  
 getNeighbors(currentCell) {
  var neighbors = [];

  // add logic to get neighbors and add them to the array
    for (var xOffset = -1; xOffset <= 1; xOffset++) {
  for (var yOffset = -1; yOffset <= 1; yOffset++) {
    var neighborColumn = currentCell.column + xOffset;
    var neighborRow = currentCell.row + yOffset;
    if(grid.isValidPosition(neighborColumn, neighborRow) && !(xOffset===0 && yOffset===0) && this.cells[neighborColumn][neighborRow].isAlive)
      neighbors.push(this.cells[neighborColumn][neighborRow]);
    else;
      
  }
}
  return neighbors;
  }
  
  updateNeighborCounts () {
  // for each cell in the grid
   for (var column = 0; column < this.numberOfColumns-1; column ++) {
      for (var row = 0; row < this.numberOfRows-1; row++) {
        this.cells[column][row].liveNeighborCount=0;
        this.cells[column][row].liveNeighborCount=grid.getNeighbors(this.cells[column][row]).length;
      }
    }
    // reset it's neighbor count to 0
    // get the cell's neighbors
    // increase liveNeighborCount by 1 for each neighbor that is alive
}
  
  isValidPosition (column, row) {
  // add logic that checks if the column and row exist in the grid
  if(column > width || column < 0 || row > height || row < 0)
    return false;
  else
    return true;
  // return true if they are valid and false if they are not
}

}
class Cell{
  constructor(column, row, size){
    this.column=column;
    this.row=row;
    this.size=size;
    this.isAlive=false;
    this.liveNeighborCount=0;
  }
  
  draw(){
      if(!this.isAlive)
        fill(240);
      else
        fill(0,200,0);
        noStroke();
        rect(this.column * this.size + 1, this.row * this.size + 1, this.size - 1, this.size - 1);
  }
  
  setIsAlive(value){
    if(!value)
      this.isAlive=true;
    else  
      this.isAlive=false;
  }
  
  liveOrDie(){
    if(this.isAlive && this.liveNeighborCount>3)
      this.isAlive=false;
    else if(this.isAlive && this.liveNeighborCount<2)
      this.isAlive=false;
    else if(!this.isAlive && this.liveNeighborCount===3)
      this.isAlive=true;
    else;
  }
}

function mousePressed(){
  checkPause();
  checkSpeed();
  checkReset();
}

function checkPause(){
   if((mouseX>=width-100 && mouseX<=width-20) && (mouseY>= 5 && mouseY<=25))
    paused=!paused;
}
function checkSpeed(){
  if((mouseX>=width-35 && mouseX<=width-25) && (mouseY>= 30 && mouseY<=45))
    speed++;
  else if((mouseX>=width-55 && mouseX<=width-45) && (mouseY>= 30 && mouseY<=45))
    speed--;
}
function checkReset(){
  if((mouseX>=width-100 && mouseX<=width-20) && (mouseY>=85  && mouseY<=102)){
    grid = new Grid(20);
    grid.randomize();
    timer=0;
    gen=0;
  }
  rect(width-100, 85, 80, 17);
}
