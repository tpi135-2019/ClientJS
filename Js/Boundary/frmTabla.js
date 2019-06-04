import MetodsT from '../Control/MetodsT.js';

const controlador = new MetodsT();

let tabla = document.querySelector("#idtabla");
let first = tabla.getAttribute("first");
let pageSize = tabla.getAttribute("pagesize");

controlador.find(`diagnostico?first=${first}&pagesize=${pageSize}`).then((data) => {
    let tabla = document.querySelector("#idtabla");
    console.log(data)
    let nuevoJson = data.map(diagnostico => {
        return {
            "diagnostico": diagnostico.diagnostico,
            "fecha": diagnostico.fecha,
            "idDiagnostico": diagnostico.idDiagnostico,
            "idVehiculo": diagnostico.idVehiculo.idVehiculo
        }
    })
    console.log(nuevoJson)

    tabla.setAttribute("datos", JSON.stringify(nuevoJson));
});

document.addEventListener("Click_btn", e => {
    llenado();
});

document.addEventListener('cambio-opcion', evt => {
    llenado();
});


function llenado() {
    let first = tabla.getAttribute("first");
    let pageSize = tabla.getAttribute("pagesize");
    controlador.find(`marca?first=${first}&pagesize=${pageSize}`).then((data) => {

        let tabla = document.querySelector("#idtabla");
        tabla.setAttribute("datos", JSON.stringify(data));
    });
}


/*let section = document.querySelector("#multi");
section.addEventListener('eventfilter', e => {
    let filtro = e.detail.filtro;
    controlador.find(`proceso/1/pasos?paso=${filtro}`).then(data => {
        let mapaPasos = new Map();
        if (data !== null) {
            data.forEach(dato => {
                mapaPasos.set(dato.idPasoProceso, dato.idPaso.nombre);
            })
        }
        const evento = new CustomEvent("datachange", { composed: true, detail: { response: mapaPasos }, bubbles: true });
        e.target.dispatchEvent(evento);

    });
});*/