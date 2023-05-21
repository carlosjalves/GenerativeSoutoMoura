const menu1 = document.getElementById("menu1");
const menu2 = document.getElementById("menu2");
const menu3 = document.getElementById("menu3");
const submitBtn = document.getElementById("submitBtn");

let selectedOptions = 0;

let selectedNames = [];
let models = [];
let numObj = [];

let colorR, colorG, colorB;

let isLoadCalled = false;

const checkboxes = document.querySelectorAll(".nameCheckbox");
checkboxes.forEach((checkbox) => checkbox.changed(handleCheckboxChange));

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

if(menu1 || menu2 || menu3){
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

}



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
    localStorage.setItem("model1", models[0]);
    localStorage.setItem("model1_numObj", numObj[0]);
    localStorage.setItem("model2", models[1]);
    localStorage.setItem("model2_numObj", numObj[1]);
    localStorage.setItem("model3", models[2]);
    localStorage.setItem("model3_numObj", numObj[2]);
    window.location.replace(window.location.href + "sketch.html");
}
