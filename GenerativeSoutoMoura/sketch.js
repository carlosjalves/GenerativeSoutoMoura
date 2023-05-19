const gridSize = 3; // Size of the grid
const cubeSize = 120; // Size of each cube
const modelA = []; // Array of 3D models
const modelB = []; // Array of 3D models
const modelC = []; // Array of 3D models
var tilesA = []; //modules A row


function preload() {
    // Load the 3D models
    for (let i = 0; i < 9; i++) {
        modelA[i] = loadModel('Estadio_Braga/A'+(i+1)+'.obj');
        modelB[i] = loadModel('Estadio_Braga/B'+(i+1)+'.obj');
        modelC[i] = loadModel('Estadio_Braga/C'+(i+1)+'.obj');
    }
}

function setup() {
    createCanvas(800, 800, WEBGL);

    //load modules of A building
    for(let h=0; h < 9; h++){
        //module limits evaluation
        var min_x = 30;
        var max_x = -30;
        var min_y = 30;
        var max_y = -30;
        var min_z = 30;
        var max_z = -30;

        //set bounding box
        for(let i = 0; i<modelA[h].computeFaces().vertices.length; i++){
            if(round(modelA[h].computeFaces().vertices[i].x) > max_x) max_x = int(modelA[h].computeFaces().vertices[i].x);
            if(round(modelA[h].computeFaces().vertices[i].x) < min_x) min_x = int(modelA[h].computeFaces().vertices[i].x); 
            
            if(round(modelA[h].computeFaces().vertices[i].y) > max_y) max_y = int(modelA[h].computeFaces().vertices[i].y);
            if(round(modelA[h].computeFaces().vertices[i].y) < min_y) min_y = int(modelA[h].computeFaces().vertices[i].y); 
            
            if(round(modelA[h].computeFaces().vertices[i].z) > max_z) max_z = int(modelA[h].computeFaces().vertices[i].z);
            if(round(modelA[h].computeFaces().vertices[i].z) < min_z) min_z = int(modelA[h].computeFaces().vertices[i].z); 
            }
        
        tilesA[h] = [modelA[h], min_x, max_x, min_y, max_y, min_z, max_z];    
        //console.log(tilesA);
    } 

    //console.log(tilesA);
    generateRules(tilesA);
}

function draw() {
    background(220);
    lights();
    rotateY(frameCount * 0.01); // Rotate the grid

    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            for (let z = 0; z < gridSize; z++) {
                // Calculate the position of the cube
                const xPos = (x - 1) * cubeSize;
                const yPos = (y - 1) * cubeSize;
                const zPos = (z - 1) * cubeSize;

                // Check the row
                if (y === gridSize - 1) {
                    drawRow(x,z,xPos,yPos,zPos,modelA);
                }else if(y === gridSize - 2){
                    drawRow(x,z,xPos,yPos,zPos,modelB);
                } else {
                    drawRow(x,z,xPos,yPos,zPos,modelC);
                }
            }
        }
    }
}

function drawRow(x,z,xP,yP,zP,models){
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
}

function generateRules(tiles){
    var rules = []
    //evaluate rules
    for (var i = 0; i < tiles.length-1; i++){
      for (var j = i + 1; j < tiles.length; j++){
        if (fit("x",tiles[i],tiles[j])){
          rules.push(['x',i,j])
        }
        if (fit("y",tiles[i],tiles[j])){
          rules.push(['y',i,j])
        }
        if (fit("z",tiles[i],tiles[j])){
          rules.push(['z',i,j])
        }
      }
    }
    console.log(rules);
    return {rules}
  }

  function fit(axis,a,b){
    //check if sizes are the same
    if (axis == "x"){
      for (var i = 0; i < a.length-1; i++){
        for (var j = i+1; j < b.length; j++){
          if (a[2] - a[1] != b[2] - b[1]){
            return false;
          }
        }
      }
    }else if (axis == "y"){
      for (var i = 0; i < a.length-1; i++){
        for (var j = i+1; j < b.length; j++){
          if (a[4] - a[3] != b[4] - b[3]){
            return false;
          }
        }
      }
    }else if (axis == "z"){
      for (var i = 0; i < a.length-1; i++){
        for (var j = i+1; j < b.length; j++){
          if (a[6] - a[5] != b[6] - b[5]){
            return false;
          }
        }
      }      
    }
    return true;
  }
