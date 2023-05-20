const gridSize = 3; // Size of the grid
const cubeSize = 30; // Size of each cube

const modelA = []; // Array of 3D models
const modelB = []; // Array of 3D models
const modelC = []; // Array of 3D models
const modelD = []; // Array of 3D models
const modelE = []; // Array of 3D models
const modelF = []; // Array of 3D models
const modelG = []; // Array of 3D models
const modelH = []; // Array of 3D models
const modelI = []; // Array of 3D models
const modelJ = []; // Array of 3D models

// Grid Cells -> Empty
let grid = [];

//selected models
var model1 = []; // Array of 3D models
var model2 = []; // Array of 3D models
var model3 = []; // Array of 3D models

//tiles
var tiles = [];
let counter = 0;

function preload() {
  // Load the 3D models
  for (let i = 0; i < 18; i++) {
      modelA[i] = loadModel('Modules/Arrabida/A'+(i+1)+'.obj');
      modelI[i] = loadModel('Modules/Quinta_Lago/A'+(i+1)+'.obj');
  }
  for (let i = 0; i < 22; i++) {
      modelB[i] = loadModel('Modules/Bom_Jesus/A'+(i+1)+'.obj');
  }
  for (let i = 0; i < 27; i++) {
      modelC[i] = loadModel('Modules/Cantareira/A'+(i+1)+'.obj');
      modelF[i] = loadModel('Modules/Cubos/A'+(i+1)+'.obj');
      modelG[i] = loadModel('Modules/Estadio_Braga/A'+(i+1)+'.obj');
  }
  for (let i = 0; i < 19; i++) {
      modelD[i] = loadModel('Modules/Cascais/A'+(i+1)+'.obj');
  }
  for (let i = 0; i < 21; i++) {
      modelE[i] = loadModel('Modules/Cinema/A'+(i+1)+'.obj');
  }
  for (let i = 0; i < 16; i++) {
      modelH[i] = loadModel('Modules/Paula_Rego/A'+(i+1)+'.obj');
  }
  for (let i = 0; i < 13; i++) {
      modelJ[i] = loadModel('Modules/Sete_Cidades/A'+(i+1)+'.obj');
  }
}

function setup() {
    createCanvas(800, 800, WEBGL);

    //select models
    model1 = modelC;
    model2 = modelA;
    model3 = modelB;
    
    //load modules of A building + CREATE TILES
    for(let h=0; h < model1.length; h++){
        //module limits evaluation
        var min_x = 30;
        var max_x = -30;
        var min_y = 30;
        var max_y = -30;
        var min_z = 30;
        var max_z = -30;

        //set bounding box
        for(let i = 0; i<model1[h].vertices.length; i++){
            if(round(model1[h].vertices[i].x) > max_x) max_x = int(model1[h].vertices[i].x);
            if(round(model1[h].vertices[i].x) < min_x) min_x = int(model1[h].vertices[i].x); 
            
            if(round(model1[h].vertices[i].y) > max_y) max_y = int(model1[h].vertices[i].y);
            if(round(model1[h].vertices[i].y) < min_y) min_y = int(model1[h].vertices[i].y); 
            
            if(round(model1[h].vertices[i].z) > max_z) max_z = int(model1[h].vertices[i].z);
            if(round(model1[h].vertices[i].z) < min_z) min_z = int(model1[h].vertices[i].z); 
            }
            tiles[h] = new Tile(model1[h], max_x-min_x, max_y-min_y, max_z-min_z);   
    }

    //load modules of B building + CREATE TILES
    for(let h=0; h < model2.length; h++){
      //module limits evaluation
      var min_x = 30;
      var max_x = -30;
      var min_y = 30;
      var max_y = -30;
      var min_z = 30;
      var max_z = -30;

      //set bounding box
      for(let i = 0; i<model2[h].vertices.length; i++){
          if(round(model2[h].vertices[i].x) > max_x) max_x = int(model2[h].vertices[i].x);
          if(round(model2[h].vertices[i].x) < min_x) min_x = int(model2[h].vertices[i].x); 
          
          if(round(model2[h].vertices[i].y) > max_y) max_y = int(model2[h].vertices[i].y);
          if(round(model2[h].vertices[i].y) < min_y) min_y = int(model2[h].vertices[i].y); 
          
          if(round(model2[h].vertices[i].z) > max_z) max_z = int(model2[h].vertices[i].z);
          if(round(model2[h].vertices[i].z) < min_z) min_z = int(model2[h].vertices[i].z); 
          }  
    
      tiles[h+(model1.length)] = new Tile(model2[h], max_x-min_x, max_y-min_y, max_z-min_z);
  }

   //load modules of C building + CREATE TILES
   for(let h=0; h < model3.length; h++){
    //module limits evaluation
    var min_x = 30;
    var max_x = -30;
    var min_y = 30;
    var max_y = -30;
    var min_z = 30;
    var max_z = -30;

    //set bounding box
    for(let i = 0; i<model3[h].vertices.length; i++){
        if(round(model3[h].vertices[i].x) > max_x) max_x = int(model3[h].vertices[i].x);
        if(round(model3[h].vertices[i].x) < min_x) min_x = int(model3[h].vertices[i].x); 
        
        if(round(model3[h].vertices[i].y) > max_y) max_y = int(model3[h].vertices[i].y);
        if(round(model3[h].vertices[i].y) < min_y) min_y = int(model3[h].vertices[i].y); 
        
        if(round(model3[h].vertices[i].z) > max_z) max_z = int(model3[h].vertices[i].z);
        if(round(model3[h].vertices[i].z) < min_z) min_z = int(model3[h].vertices[i].z); 
        }
        
        tiles[h + (model1.length+model2.length) ] = new Tile(model3[h], max_x-min_x, max_y-min_y, max_z-min_z); 
}

  for(let i = 0; i < gridSize*gridSize*gridSize; i++){
    if(i < 9){
      if(i < 3) grid[i] = new Cell(i,0,0);
      else if(i < 6) grid[i] = new Cell(i-3,1,0);
      else grid[i] = new Cell(i-6,2,0);
    }
    if(i >= 9 && i < 18){
      if(i < 12) grid[i] = new Cell(i-9,0,1);
      else if(i < 15) grid[i] = new Cell(i-12,1,1);
      else grid[i] = new Cell(i-15,2,1);
    }
    if(i >= 18 && i < 27){
      if(i < 21) grid[i] = new Cell(i-18,0,2);
      else if(i < 24) grid[i] = new Cell(i-21,1,2);
      else grid[i] = new Cell(i-24,2,2);
    }
  }
  
  //console.log(grid);
  while(counter < grid.length){
    if(!grid[counter].filled) setTimeout(selectModules(counter),1000);
}
}

function selectModules(i){
  let random_index = round(random(tiles.length));
    let z_check = true;
    let x_check = true;
    let y_check = true;
    if(grid[i].x > 0){
        x_check = compareEdges("left", random_index, i);
    }
      else if(grid[i].y > 0){
        y_check = compareEdges("back", random_index, i);
      }
      else if(grid[i].z > 0){
        z_check = compareEdges("down", random_index, i);
      }
      if(z_check && y_check && x_check){
        grid[i].filled = true;
        grid[i].module_index = random_index; 
        counter++;
      }
    }

//compare tile edges -> tile 1 in grid + tile 2 to add
function compareEdges(direction, tile_index, cell){
  if(direction == "left"){
    if(tiles[grid[cell-1].module_index].y_size == tiles[tile_index].y_size && tiles[grid[cell-1].module_index].z_size == tiles[tile_index].z_size) return true;
    else return false;
  }  
    else if(direction == "down"){
      if(tiles[grid[cell-9].module_index].y_size == tiles[tile_index].y_size && tiles[grid[cell-9].module_index].z_size == tiles[tile_index].z_size) return true;
      else return false;
    }
    else if(direction == "back"){
      if(tiles[grid[cell-3].module_index].y_size == tiles[tile_index].y_size && tiles[grid[cell-3].module_index].z_size == tiles[tile_index].z_size) return true;
      else return false;
}
}



function startOver() {
  // Create cell for each spot on the grid
  for (let i = 0; i < gridSize*gridSize*gridSize; i++) {
    grid[i] = new Cell(tiles.length);
  }
}

function checkValid(arr, valid) {
  for (let i = arr.length - 1; i >= 0; i--) {
    let element = arr[i];
    if (!valid.includes(element)) {
      arr.splice(i, 1);
    }
  }
}

/* scan each grid module
create funcion select random from allmodules
for each cell check if they can be placed otherwise run function select random again
for 1st select only
2nd check left...
until all 27cells are filled
might take longer but it can produce better results */

function draw() {
    background(220);
    lights();
    rotateY(frameCount * 0.01); // Rotate the grid
                //console.log(cell);
  

                for(let i=0; i<grid.length; i++){
                  const xPos = grid[i].x * cubeSize;
                  const yPos = grid[i].y * cubeSize;
                  const zPos = grid[i].z * cubeSize;
                  if(grid[i].filled){
                    drawModule(xPos, yPos, zPos, tiles[grid[i].module_index].obj);
                  }
                }
              
            }


function drawCube(xP,yP,zP){
      push();
      translate(xP, yP, zP);
      scale(4); // Scale the model if needed
      //noStroke();
      //fill(30);
      noFill();
      stroke(0,255,0);
      rotateX(-PI);
      rotateY(-PI);
      //rotateZ(PI/2);
      translate(0,-15);
      box(cubeSize);
      pop();
}


function drawModule(xP,yP,zP,mod){
    // Set the model for the last row
    // Draw the model
    push();
    translate(xP, yP, zP);
    scale(4); // Scale the model if needed
    noStroke();
    fill(180);
    rotateX(-PI);
    rotateY(-PI);
    //rotateZ(PI/2);
    translate(0,-15);
    model(mod);
    pop();
}



/* function drawRow(x,z,xP,yP,zP,models){
    // Set the model for the last row
    const modelIndex = x * gridSize + z;
    // Draw the model
    push();
    translate(xP, yP, zP);
    scale(4); // Scale the model if needed
    noStroke();
    fill(180);
    rotateX(-PI);
    rotateY(-PI);
    //rotateZ(PI/2);
    translate(0,-15);
    model(models[modelIndex]);
    pop();
} */

function wfc(){
// Make a copy of grid
let gridCopy = grid.slice();
// Remove any collapsed cells
gridCopy = gridCopy.filter((a) => !a.collapsed);

// The algorithm has completed if everything is collapsed
if (grid.length == 0) {
  return;
}


// Pick a cell with least entropy
// Sort by entropy
/* gridCopy.sort((a, b) => {
  return a.options.length - b.options.length;
}); */
console.log(gridCopy);

/* // Keep only the lowest entropy cells
let len = gridCopy[0].options.length;
let stopIndex = 0;
for (let i = 1; i < gridCopy.length; i++) {
  if (gridCopy[i].options.length > len) {
    stopIndex = i;
    break;
  }
}
if (stopIndex > 0) gridCopy.splice(stopIndex); */

// Collapse a cell
const cell = random(gridCopy);
cell.collapsed = true;
const pick = random(cell.options);
if (pick === undefined) {
  startOver();
  return;
}
else cell.options = [pick];

//Calculate Entropy
const nextGrid = [];
for (let j = 0; j < gridSize; j++) { //X
  for (let i = 0; i < gridSize; i++) { // Y
    for(let h = 0; h < gridSize; h++){ // Z
      let index = ((h * gridSize + i) * gridSize) + j;
       if (grid[index].collapsed) {
          nextGrid[index] = grid[index];
      } else {
        let options = new Array(tiles.length).fill(0).map((x, i) => i);
      // Look RIGHT
      if (j < gridSize - 1) {
        let right = grid[((h * gridSize + i) * gridSize) + j + 1];
        let validOptions = [];
        for (let option of right.options) {
          let valid = tiles[option].left;
          validOptions = validOptions.concat(valid);
        }
        checkValid(options, validOptions);
      }
      // Look UP
      if (h < gridSize - 1) {
        let up = grid[(((h+1) * gridSize + i) * gridSize) + j];
        let validOptions = [];
        for (let option of up.options) {
          let valid = tiles[option].down;
          validOptions = validOptions.concat(valid);
        }
        checkValid(options, validOptions);
      }
      // Look DOWN
      if (h > 0) {
        let down = grid[(((h-1) * gridSize + i) * gridSize) + j];
        let validOptions = [];
        for (let option of down.options) {
          let valid = tiles[option].up;
          validOptions = validOptions.concat(valid);
        }
        checkValid(options, validOptions);
      }
      // Look LEFT
      if (j > 0) {
        let left = grid[((h * gridSize + i) * gridSize) + j - 1];
        let validOptions = [];
        for (let option of left.options) {
          let valid = tiles[option].right;
          validOptions = validOptions.concat(valid);
        }
        checkValid(options, validOptions);
      }
      // Look FRONT
      if (i < gridSize - 1) {
        let front = grid[((h * gridSize + (i+1)) * gridSize) + j];
        let validOptions = [];
        for (let option of front.options) {
          let valid = tiles[option].back;
          validOptions = validOptions.concat(valid);
        }
        checkValid(options, validOptions);
      }
      // Look BACK
      if (i > 0) {
        let back = grid[((h * gridSize + (i-1)) * gridSize) + j];
        let validOptions = [];
        for (let option of back.options) {
          let valid = tiles[option].front;
          validOptions = validOptions.concat(valid);
        }
        checkValid(options, validOptions);
      }
        // I could immediately collapse if only one option left?
        nextGrid[index] = new Cell(options);
    }

    }
   
  }
}
grid = nextGrid;
}