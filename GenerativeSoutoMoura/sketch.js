const gridSize = 3; // Size of the grid
const cubeSize = 120; // Size of each cube
const modelA = []; // Array of 3D models
const modelB = []; // Array of 3D models
const modelC = []; // Array of 3D models

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