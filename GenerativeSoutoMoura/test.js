const gridSize = 3; // Size of the grid
const cubeSize = 120; // Size of each cube

const menu1 = document.getElementById("menu1");
const menu2 = document.getElementById("menu2");
const menu3 = document.getElementById("menu3");
const submitBtn = document.getElementById("submitBtn");

let selectedOptions = 0;

let selectedNames = [];
let models = [];
let numObj = [];

const modelA = []; // Array of 3D models
const modelB = []; // Array of 3D models
const modelC = []; // Array of 3D models

let colorR, colorG, colorB;

let isLoadCalled = false;
let isDrawCalled = false;

function setup() {
    createCanvas(800, 800, WEBGL);

    const checkboxes = selectAll(".nameCheckbox");
    checkboxes.forEach((checkbox) => checkbox.changed(handleCheckboxChange));

    colorR = random(255);
    colorG = random(255);
    colorB = random(255);
}

function draw() {
    background(255);
    lights();
    //ambientLight(colorR,colorG,colorB); // white light
    ambientMaterial(150);
    rotateY(frameCount * 0.01); // Rotate the grid

    if (isLoadCalled) {
        loadModels();
        isLoadCalled = false;
        isDrawCalled = true;
    }

    if (isDrawCalled) {
        drawModel();
    }
}

function drawModel(){
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
    fill(colorR, colorG, colorB);
    rotateX(-PI);
    rotateY(-PI);
    //rotateZ(PI/2);
    translate(0,-15);
    model(models[modelIndex]);
    pop();
}

function handleSelect() {
        if (menu1.value !== "" && menu2.value !== "" && menu3.value !== "") {
            submitBtn.style.display = "block";
        } else {
            submitBtn.style.display = "none";
        }
}

function disableSelect() {
    let options = document.getElementsByTagName("option");

    for ( let i=0; i<options.length; i++)
    {
        if(options[i].value===menu1.value || options[i].value===menu2.value || options[i].value===menu3.value) options[i].setAttribute('disabled','');
    }
}

menu1.addEventListener("change", () => {
    selectedOptions = menu1.value === "" ? selectedOptions - 1 : selectedOptions + 1;
    disableSelect();
    handleSelect();
});

menu2.addEventListener("change", () => {
    selectedOptions = menu2.value === "" ? selectedOptions - 1 : selectedOptions + 1;
    disableSelect();
    handleSelect();

});

menu3.addEventListener("change", () => {
    selectedOptions = menu3.value === "" ? selectedOptions - 1 : selectedOptions + 1;
    disableSelect();
    handleSelect();
});

submitBtn.addEventListener("click", () => {
    selectedNames = [
        menu1.value,
        menu2.value,
        menu3.value
    ];

    console.log("Selected names:", selectedNames);
    setModels();
});

function setModels() {
    // Carrega os modelos com base nas respostas selecionadas
    // Implemente a lógica para carregar os modelos corretos aqui
    // por exemplo, utilizando os valores de selectedNames
    for(let i = 0; i < 3; i++){
        if (selectedNames[i] === 'Criativa' || selectedNames[i] === 'Enérgica' || selectedNames[i] === 'Divertida') {
            models.push('Paula_Rego');
            numObj.push(16);
        }else if(selectedNames[i] === 'Lógica' || selectedNames[i] === 'Desafiante' || selectedNames[i] === 'Observadora'){
            models.push('Estadio_Braga');
            numObj.push(27);
        }else if(selectedNames[i] === 'Organizada' || selectedNames[i] === 'Perfecionista' || selectedNames[i] === 'Discreta'){
            models.push('Cascais');
            numObj.push(19);
        }else if(selectedNames[i] === 'Reservada' || selectedNames[i] === 'Desajustada' || selectedNames[i] === 'Monótona'){
            models.push('Sete_Cidades');
            numObj.push(13);
        }else if(selectedNames[i] === 'Gentil' || selectedNames[i] === 'Ingénua' || selectedNames[i] === 'Original'){
            models.push('Quinta_Lago');
            numObj.push(18);
        }else if(selectedNames[i] === 'Paciente' || selectedNames[i] === 'Ponderada' || selectedNames[i] === 'Fria'){
            models.push('Bom_Jesus');
            numObj.push(22);
        }else if(selectedNames[i] === 'Extrovertida' || selectedNames[i] === 'Orgulhosa' || selectedNames[i] === 'Arrogante'){
            models.push('Cubos');
            numObj.push(27);
        }else if(selectedNames[i] === 'Determinada' || selectedNames[i] === 'Diferente' || selectedNames[i] === 'Confiante'){
            models.push('Cinema');
            numObj.push(21);
        }else if(selectedNames[i] === 'Relaxada' || selectedNames[i] === 'Artística' || selectedNames[i] === 'Harmoniosa'){
            models.push('Arrabida');
            numObj.push(18);
        }else if(selectedNames[i] === 'Otimista' || selectedNames[i] === 'Chamativa' || selectedNames[i] === 'Aventureira'){
            models.push('Cantareira');
            numObj.push(27);
        }else{
            console.log("Error");
        }
    }
    isLoadCalled = true;
}

function loadModels() {
    for (let i = 0; i < numObj[0]; i++) {
        modelA[i] = loadModel('Modules/'+models[0]+'/A'+(i+1)+'.obj');
    }
    for (let i = 0; i < numObj[1]; i++) {
        modelB[i] = loadModel('Modules/'+models[1]+'/A'+(i+1)+'.obj');
    }
    for (let i = 0; i < numObj[2]; i++) {
        modelC[i] = loadModel('Modules/'+models[2]+'/A'+(i+1)+'.obj');
    }
}