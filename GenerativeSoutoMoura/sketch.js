const gridSize = 3; // Size of the grid
const cubeSize = 120; // Size of each cube
const modelA = []; // Array of 3D models
const modelB = []; // Array of 3D models
const modelC = []; // Array of 3D models
const modelD = []; // Array of 3D models
const modelE = []; // Array of 3D models
const modelF = []; // Array of 3D models
const modelG = []; // Array of 3D models
const modelH = []; // Array of 3D models
const modelI = []; // Array of 3D models
var tilesA = []; //modules A row
const cubeSize = 30; // Size of each cube

// Current state of the grid
let grid = [];

//models
const model1 = [];
const model2 = [];
const model3 = [];
const model4 = [];
const model5 = [];
const model6 = [];
const model7 = [];
const model8 = [];
const model9 = [];
const model10 = [];

//selected models
var modelA = []; // Array of 3D models
var modelB = []; // Array of 3D models
var modelC = []; // Array of 3D models

//tiles
var tiles = [];

function preload() {
    // Load the 3D models
    for (let i = 0; i < 9; i++) {
        model1[i] = loadModel('Estadio_Braga/A'+(i+1)+'.obj');
        model2[i] = loadModel('Estadio_Braga/B'+(i+1)+'.obj');
        model3[i] = loadModel('Estadio_Braga/C'+(i+1)+'.obj');
    }
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
    modelA = model1;
    modelB = model2;
    modelC = model3;
    
    //load modules of A building + CREATE TILES
    for(let h=0; h < modelA.length; h++){
        //module limits evaluation
        var min_x = 30;
        var max_x = -30;
        var min_y = 30;
        var max_y = -30;
        var min_z = 30;
        var max_z = -30;

        //set bounding box
        for(let i = 0; i<modelA[h].vertices.length; i++){
            if(round(modelA[h].vertices[i].x) > max_x) max_x = int(modelA[h].vertices[i].x);
            if(round(modelA[h].vertices[i].x) < min_x) min_x = int(modelA[h].vertices[i].x); 
            
            if(round(modelA[h].vertices[i].y) > max_y) max_y = int(modelA[h].vertices[i].y);
            if(round(modelA[h].vertices[i].y) < min_y) min_y = int(modelA[h].vertices[i].y); 
            
            if(round(modelA[h].vertices[i].z) > max_z) max_z = int(modelA[h].vertices[i].z);
            if(round(modelA[h].vertices[i].z) < min_z) min_z = int(modelA[h].vertices[i].z); 
            }
            tiles[h] = new Tile(modelA[h], max_x-min_x, max_y-min_y, max_z-min_z);   
    }

    //load modules of B building + CREATE TILES
    for(let h=0; h < modelB.length; h++){
      //module limits evaluation
      var min_x = 30;
      var max_x = -30;
      var min_y = 30;
      var max_y = -30;
      var min_z = 30;
      var max_z = -30;

      //set bounding box
      for(let i = 0; i<modelB[h].vertices.length; i++){
          if(round(modelB[h].vertices[i].x) > max_x) max_x = int(modelB[h].vertices[i].x);
          if(round(modelB[h].vertices[i].x) < min_x) min_x = int(modelB[h].vertices[i].x); 
          
          if(round(modelB[h].vertices[i].y) > max_y) max_y = int(modelB[h].vertices[i].y);
          if(round(modelB[h].vertices[i].y) < min_y) min_y = int(modelB[h].vertices[i].y); 
          
          if(round(modelB[h].vertices[i].z) > max_z) max_z = int(modelB[h].vertices[i].z);
          if(round(modelB[h].vertices[i].z) < min_z) min_z = int(modelB[h].vertices[i].z); 
          }    
      tiles[h+(modelA.length-1)] = new Tile(modelB[h], max_x-min_x, max_y-min_y, max_z-min_z);
  }

   //load modules of C building + CREATE TILES
   for(let h=0; h < modelC.length; h++){
    //module limits evaluation
    var min_x = 30;
    var max_x = -30;
    var min_y = 30;
    var max_y = -30;
    var min_z = 30;
    var max_z = -30;

    //set bounding box
    for(let i = 0; i<modelC[h].vertices.length; i++){
        if(round(modelC[h].vertices[i].x) > max_x) max_x = int(modelC[h].vertices[i].x);
        if(round(modelC[h].vertices[i].x) < min_x) min_x = int(modelC[h].vertices[i].x); 
        
        if(round(modelC[h].vertices[i].y) > max_y) max_y = int(modelC[h].vertices[i].y);
        if(round(modelC[h].vertices[i].y) < min_y) min_y = int(modelC[h].vertices[i].y); 
        
        if(round(modelC[h].vertices[i].z) > max_z) max_z = int(modelC[h].vertices[i].z);
        if(round(modelC[h].vertices[i].z) < min_z) min_z = int(modelC[h].vertices[i].z); 
        }
        tiles[h + (modelA.length+modelB.length-1) ] = new Tile(modelC[h], max_x-min_x, max_y-min_y, max_z-min_z);  
}

  // Generate the adjacency rules based on edges
    for (let i = 0; i < tiles.length; i++) {
      const tile = tiles[i];
      tile.analyze(tiles);
    }

  // Start over
  startOver();
  wfc();
}

function startOver() {
  // Create cell for each spot on the grid
  for (let i = 0; i < cubeSize*cubeSize*cubeSize; i++) {
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
                  drawCube(xPos,yPos,zPos);
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
      noStroke();
      //fill(30);
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
gridCopy.sort((a, b) => {
  return a.options.length - b.options.length;
});

// Keep only the lowest entropy cells
let len = gridCopy[0].options.length;
let stopIndex = 0;
for (let i = 1; i < gridCopy.length; i++) {
  if (gridCopy[i].options.length > len) {
    stopIndex = i;
    break;
  }
}
if (stopIndex > 0) gridCopy.splice(stopIndex);

// Collapse a cell
const cell = random(gridCopy);
cell.collapsed = true;
const pick = random(cell.options);
if (pick === undefined) {
  startOver();
  return;
}
cell.options = [pick];

//Calculate Entropy
const nextGrid = [];
for (let j = 0; j < cubeSize; j++) { //X
  for (let i = 0; i < cubeSize; i++) { // Y
    for(let h = 0; h < cubeSize; h++){ // Z
      let index = ((h * gridSize + i) * gridSize) + j;
       if (grid[index].collapsed) {
          nextGrid[index] = grid[index];
      } else {
        let options = new Array(tiles.length).fill(0).map((x, i) => i);
      // Look RIGHT
      if (j < cubeSize - 1) {
        let right = grid[((h * gridSize + i) * gridSize) + j + 1];
        let validOptions = [];
        for (let option of right.options) {
          let valid = tiles[option].left;
          validOptions = validOptions.concat(valid);
        }
        checkValid(options, validOptions);
      }
      // Look UP
      if (h < cubeSize - 1) {
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
      if (i < cubeSize - 1) {
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