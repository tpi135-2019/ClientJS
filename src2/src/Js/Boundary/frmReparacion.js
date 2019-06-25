import MetodsT from "../Control/MetodsT.js"
const control = new MetodsT();


    let txt=document.querySelector("#txtR");
    const button = document.querySelector("#page > main > vaadin-button");
    button.addEventListener('click', function() {
        //llenadarGrid();
        llenarAcordeon(txt);
    });

function llenadarGrid() {
    const grid = document.querySelector("#grid");
    control.find(`reparacion/${txt.value}`).then(resp=>resp.json())
        .then(json =>{
            grid.items=json;
        }).catch(e => {
            const notification = document.querySelector('vaadin-notification');
            notification.open();
            notification.renderer = function (root) {
                root.textContent = `No se encontro la información solicitada ${e}`;
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
    let repa=document.querySelector("#repa");

    control.find(`reparacion/${txt.value}`).then(response=>response.json()).then(data=>{
        repa.innerHTML='';
            repa.innerHTML +=`<li> Identificador:  ${data.idReparacion}</li>
                                    <li>Diagnostico:  ${data.idDiagnostico.diagnostico}</li>
                                    <li>Propietario:  ${data.idDiagnostico.idVehiculo.idPropietario.nombre} ${data.idDiagnostico.idVehiculo.idPropietario.apellido}</li>
                                    <li>Placa:  ${data.idDiagnostico.idVehiculo.idVehiculo}</li>
                                    <li>Observacion:  ${data.observacion}</li>
                                    <li>Fecha:  ${data.fecha}</li>`

    }).catch(e=>{
        const notification = document.querySelector('vaadin-notification');
        notification.open();
        notification.renderer = function(root) {
            root.textContent = `No se encontro la información solicitada`;
        };
    });


    control.find(`reparacion/${txt.value}/personal`).then(response=>response.json()).then(data=>{
    personal.innerHTML='';
    for(let valor of data){
        personal.innerHTML +=`<li>${valor.nombre} ${valor.apellido}</li>`
    }
    });
    control.find(`reparacion/${txt.value}/pieza`).then(resp=>resp.json()).then(data=>{
        pieza.innerHTML='';
        for(let valor of data){
            pieza.innerHTML +=`<li>${valor.nombre}</li>`
        }
        });

    control.find(`reparacion/${txt.value}/paso`).then(resp=>resp.json()).then(data=>{
        paso.innerHTML='';
        for(let valor of data){
            paso.innerHTML +=`<li>${valor.nombre}</li>`
        }
    });
}



