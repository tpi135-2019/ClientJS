import MetodsT from '../Control/MetodsT.js';

const controlador = new MetodsT();

let tabla = document.querySelector("#idtabla");
let first= tabla.getAttribute("first");
let pageSize= tabla.getAttribute("pagesize");

controlador.find(`marca?first=${first}&pagesize=${pageSize}`).then((data)=> {
    let tabla = document.querySelector("#idtabla");
    tabla.setAttribute("datos",JSON.stringify(data));
});

document.addEventListener("Click_btn", e=> {
    llenado();
});

document.addEventListener('cambio-opcion',evt => {
    llenado();
});

function llenado(){
    let first= tabla.getAttribute("first");
    let pageSize= tabla.getAttribute("pagesize");
      controlador.find(`marca?first=${first}&pagesize=${pageSize}`).then((data)=> {
        let tabla = document.querySelector("#idtabla");
        tabla.setAttribute("datos",JSON.stringify(data));
    });
}