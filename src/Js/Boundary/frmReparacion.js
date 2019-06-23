import MetodsT from "../Control/MetodsT.js"
import './Componentes/TPIAutocomplete.js'
const control = new MetodsT();


customElements.whenDefined('vaadin-button').then(function() {
    let txt=document.querySelector("#txtR");

    const button = document.querySelector('vaadin-button');
    button.addEventListener('click', function() {
        buscarData(txt);
        llenarAcordeon(txt);
    });
});

function buscarData(txt){

    const grid = document.querySelector('vaadin-grid');
    control.find(`reparacion/${txt.value}`)
        .then(res => {
            console.log(res);
        })
        .then(json => grid.items = json).catch(e=>{
        const notification = document.querySelector('vaadin-notification');
        notification.open();
        notification.renderer = function(root) {
            root.textContent = 'No se encontro la información solicitada';
        };
        }
    );

    document.querySelector('#id').renderer = (root, grid, rowData) => {
        root.textContent = `${rowData.item.idDiagnostico.diagnostico}`;
    };
}

function llenarAcordeon(txt){
    let personal=document.querySelector("#worker");
    let pieza=document.querySelector("#piezas");
    let paso=document.querySelector("#pasos");
    control.find(`reparacion/${txt.value}/personal`).then(response=>response).then(data=>{
    personal.innerHTML='';
    for(let valor of data){
        personal.innerHTML +=`<li>${valor.nombre} ${valor.apellido}</li>`
    }
    });
    control.find(`reparacion/${txt.value}/pieza`).then(resp=>resp).then(data=>{
        pieza.innerHTML='';
        for(let valor of data){
            pieza.innerHTML +=`<li>${valor.nombre}</li>`
        }
        });

    control.find(`reparacion/${txt.value}/paso`).then(resp=>resp).then(data=>{
        paso.innerHTML='';
        for(let valor of data){
            paso.innerHTML +=`<li>${valor.nombre}</li>`
        }
    });
}



