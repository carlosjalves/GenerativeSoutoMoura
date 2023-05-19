const gridSize = 3; // Size of the grid

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

const cubeSize = 30; // Size of each cube

// Current state of the grid
let grid = [];

//selected models
var model1 = []; // Array of 3D models
var model2 = []; // Array of 3D models
var model3 = []; // Array of 3D models

//tiles
var tiles = [];

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
    model1 = modelA;
    model2 = modelG;
    model3 = modelA;
    
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

  // Generate the adjacency rules based on edges
    for (let i = 0; i < tiles.length; i++) {
      const tile = tiles[i];
      tile.analyze(tiles);
    }

  // Start over
  startOver();
  wfc();
  console.log(tiles);
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


function draw() {
    background(220);
    lights();
    rotateY(frameCount * 0.01); // Rotate the grid
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            for (let z = 0; z < gridSize; z++) {
                let cell = grid[((z * gridSize + y) * gridSize) + x];
                //console.log(cell);
                // Calculate the position of the cube
                const xPos = (x - 1) * cubeSize;
                const yPos = (y - 1) * cubeSize;
                const zPos = (z - 1) * cubeSize;

                if(!cell.collapsed){
                  let index = cell.options[0];
                  drawModule(x,y,z, xPos, yPos, zPos, tiles[index].obj);
                }
                else{
                  //drawCube(xPos,yPos,zPos);
                }
                /* 
                // Check the row
                if (y === gridSize - 1) {
                    drawRow(x,z,xPos,yPos,zPos,modelA);
                }else if(y === gridSize - 2){
                    drawRow(x,z,xPos,yPos,zPos,modelB);
                } else {
                    drawRow(x,z,xPos,yPos,zPos,modelC);
                } */
            }
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


function drawModule(x,y,z,xP,yP,zP,mod){
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