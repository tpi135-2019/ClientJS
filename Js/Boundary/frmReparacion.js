import MetodsT from "../Control/MetodsT.js"
import './Componentes/TPIAutocomplete.js'


const control = new MetodsT();

let seleccionDiagnostico = document.querySelector("#idDiagnostico");

seleccionDiagnostico.addEventListener('eventofiltrar', e => {
    let filtro = e.detail.filtro;
    control.find(`diagnostico/search?id=${filtro}`).then(data => {
        let lista = [];
        if (data !== null) {
            data.forEach(dato => {
                lista.push(dato.idDiagnostico);
            })
        }
        seleccionDiagnostico.setAttribute("auto", lista.toString());
        const evento = new CustomEvent("datachange", { composed: true, bubbles: true });
        e.target.dispatchEvent(evento);
    });
});

let personal = document.querySelector("#personal");
personal.addEventListener('eventfilter', e => {
    let filtro = e.detail.filtro;
    control.find(`sucursal/2/personal?nombre=${filtro}`).
    then(data => {
        let mapaPersonal = new Map();
        if (data !== null) {
            data.forEach(dato => {
                mapaPersonal.set(dato.idMecanico, dato.nombre + dato.apellido);
            })
        }
        const evento = new CustomEvent("datachange", { composed: true, detail: { response: mapaPersonal }, bubbles: true });
        e.target.dispatchEvent(evento);

    });
});

let piezas = document.querySelector("#piezas");
piezas.addEventListener('eventfilter', e => {
    let filtro = e.detail.filtro;
    control.find(`subparte/1/piezas?pieza=${filtro}`).
    then(data => {
        let mapaPiezas = new Map();
        if (data !== null) {
            data.forEach(dato => {
                mapaPiezas.set(dato.idPieza, dato.nombre);
            })
        }
        const evento = new CustomEvent("datachange", { composed: true, detail: { response: mapaPiezas }, bubbles: true });
        e.target.dispatchEvent(evento);

    });
});

let pasos = document.querySelector("#pasos");
pasos.addEventListener('eventfilter', e => {
    let filtro = e.detail.filtro;
    control.find(`proceso/1/pasos?paso=${filtro}`).
    then(data => {
        let mapaPasos = new Map();
        if (data !== null) {
            data.forEach(dato => {
                mapaPasos.set(dato.idPasoProceso, dato.idPaso.nombre);
            })
        }
        const evento = new CustomEvent("datachange", { composed: true, detail: { response: mapaPasos }, bubbles: true });
        e.target.dispatchEvent(evento);

    });
});


let fecha = document.querySelector('#dater');
let observacion = document.querySelector('#observaciones');

document.getElementById("frmRegistro").addEventListener("submit", function(e) {
    e.preventDefault();

    let listaPasos = [];
    if (pasos.identificadores !== null && pasos.identificadores !== undefined) {
        pasos.identificadores.forEach((val, id) => {
            let pasoProceso = { idPasoProceso: id };
            listaPasos.push(pasoProceso);
        });
    }

    let listaPiezas = [];
    if (piezas.identificadores !== null && piezas.identificadores !== undefined) {
        piezas.identificadores.forEach((val, id) => {
            let pieza = { idPieza: id };
            listaPiezas.push(pieza);
        });
    }

    let listaPersonal = [];
    if (personal.identificadores !== null && personal.identificadores !== undefined) {
        personal.identificadores.forEach((val, id) => {
            let mecanico = { idMecanico: id };
            listaPersonal.push(mecanico);
        });
    }

    let entity = {
        "fecha": new Date(fecha.value).toISOString(),
        "idDiagnostico": { idDiagnostico: seleccionDiagnostico.getAttribute("auto") },
        "observacion": observacion.value,
        "pasoProcesoCollection": listaPasos,
        "personalCollection": listaPersonal,
        "piezaCollection": listaPiezas
    };

    control.create('reparacion/', entity)
    console.log(entity)
    document.getElementById("frmRegistro").reset();
});