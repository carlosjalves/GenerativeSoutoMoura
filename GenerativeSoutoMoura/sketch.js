const gridSize = 3; // Size of the grid
const cubeSize = 30; // Size of each cube

// Grid Cells -> Empty
let grid = [];
let rotY;

//selected models
var model1_name = localStorage.getItem("model1");
var model1_numObj = localStorage.getItem("model1_numObj");
var model2_name = localStorage.getItem("model2");
var model2_numObj = localStorage.getItem("model2_numObj");
var model3_name = localStorage.getItem("model3");
var model3_numObj = localStorage.getItem("model3_numObj");

var model1 = []; // Array of 3D models
var model2 = []; // Array of 3D models
var model3 = []; // Array of 3D models

let colorR, colorG, colorB;

//tiles
var tiles = [];
//module timer counter - building...
let counter = 0;

function preload() {
  // Load the 3D models
//console.log(model1_name, model1_numObj);
  for (let i = 0; i < model1_numObj; i++) {
    model1[i] = loadModel('Modules/'+model1_name+'/A'+(i+1)+'.obj');
}
for (let i = 0; i < model2_numObj; i++) {
    model2[i] = loadModel('Modules/'+model2_name+'/A'+(i+1)+'.obj');
}
for (let i = 0; i < model3_numObj; i++) {
    model3[i] = loadModel('Modules/'+model3_name+'/A'+(i+1)+'.obj');
}
}

function setup() {
    createCanvas(1280, 720, WEBGL);

    console.log(model1);
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

        colorR = random(150,255);
        colorG = random(150,255);
        colorB = random(150,255);

        //frameRate(5);
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

//create grid 3x3 cube
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
  
  //for each cell, if not full - select module
  while(counter < grid.length){
    if(!grid[counter].filled) setTimeout(selectModules(counter),1000);
}
//filled grid result
console.log(grid);
}

/* scan each grid module
create funcion select random from allmodules
for each cell check if they can be placed otherwise run function select random again
for 1st select only
2nd check left...
until all 27cells are filled
might take longer but it can produce better results */

function selectModules(i){
  //select random tile
  let random_index = round(random(tiles.length));
    //neighbour validation check
    let z_check = true;
    let x_check = true;
    let y_check = true;
    //if has cell to left compare
    if(grid[i].x > 0){
        x_check = compareEdges("left", random_index, i);
    }
    //if has cell to back compare
    else if(grid[i].y > 0){
        y_check = compareEdges("back", random_index, i);
    }
    //if has cell to down compare    
    else if(grid[i].z > 0){
        z_check = compareEdges("down", random_index, i);
    }
    //if all neighbours are compatible add to grid
    if(z_check && y_check && x_check){
        //check filled cell
        grid[i].filled = true;
        //add cell to grid
        grid[i].module_index = random_index; 
        //advance to next cell
        counter++;
      }
    //else select random again...  
    }

//compare tile edges -> direction (left, bottom, back -> scans in order of grid so no need to check to front)
//tile_index -> random tile index + cell -> current cell to place tile[random index]
function compareEdges(direction, tile_index, cell){
  if(direction == "left"){ //x
    //check if y and z are same size
    if(tiles[grid[cell-1].module_index].y_size == tiles[tile_index].y_size && tiles[grid[cell-1].module_index].z_size == tiles[tile_index].z_size) return true;
    else return false;
  }  
    else if(direction == "down"){ //y
      //check if z and x are same size
      if(tiles[grid[cell-9].module_index].x_size == tiles[tile_index].x_size && tiles[grid[cell-9].module_index].z_size == tiles[tile_index].z_size) return true;
      else return false;
    }
    else if(direction == "back"){ //z
      //check if y and x are same size
      if(tiles[grid[cell-3].module_index].y_size == tiles[tile_index].y_size && tiles[grid[cell-3].module_index].x_size == tiles[tile_index].x_size) return true;
      else return false;
}
}

function draw() {
    background(colorR,colorG,colorB);

    //lights();
    pointLight(100,0,0,-800,0,0);
    pointLight(0,0,100,800,0,0);
    directionalLight(colorR,colorG,colorB,0,0,-1);
    ambientMaterial(255);

    scale(2);

    rotY = frameCount * 0.01;
    translate(0,-20);
    rotateY(rotY); // Rotate the grid
  

   for(let i=0; i<grid.length; i++){
      //determine place according to grid
      const xPos = grid[i].x * cubeSize;
      const yPos = grid[i].y * cubeSize;
      const zPos = grid[i].z * cubeSize;
      //if module is selected draw in position           
      if(grid[i].filled){
          //drawModule(xPos, yPos, zPos, tiles[grid[i].module_index].obj,1); //stroke
          drawModule(xPos, yPos, zPos, tiles[grid[i].module_index].obj,2); //w/o stroke
          //drawCube(xPos, yPos, zPos); //grid limits
        }
      }

/*
   // Save
    save( "myproject-frame-" + frameCount + ".jpg")

    if(frameCount === 629){
        noLoop();
    }
*/
 }

//draw modules
function drawModule(xP,yP,zP,mod, type){
    // Draw the model
    if(type === 1){ //1st object with stroke
      push();
      translate(xP, yP, zP);
      //fill(-255);
      noFill();
      stroke(200);
        //noStroke();
      rotateX(-PI);
      rotateY(-PI);
      //rotateZ(PI/2);
      translate(0,-15);
      scale(1.5);
      model(mod);
      pop();
    } else if(type === 2){ //2nd object w/o stroke
      push();
      translate(xP, yP, zP);
      noStroke();
      //fill(colorR, colorG, colorB);
      rotateX(-PI);
      rotateY(-PI);
      //rotateZ(PI/2);
      translate(0,-15);
      scale(1.5);
      //translate(0.3, 0, 0.3);
      model(mod);
      pop();
    }
    
}