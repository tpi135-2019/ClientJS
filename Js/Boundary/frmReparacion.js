import MetodsT from "../Control/MetodsT.js"
import './Componentes/TPIAutocomplete.js'


const control= new MetodsT();

let seleccionDiagnostico=document.querySelector("#idDiagnostico");

seleccionDiagnostico.addEventListener('eventofiltrar', e => {
    let filtro = e.detail.filtro;
    control.find(`diagnostico/search?id=${filtro}`).
    then(data => {
        let lista=[];
        if(data!==null){
            data.forEach(dato=>{
                lista.push(dato.idDiagnostico);
            })
        }
        seleccionDiagnostico.setAttribute("auto",lista.toString());
        const evento = new CustomEvent("datachange", { composed: true, bubbles: true });
        e.target.dispatchEvent(evento);
    });
});



document.getElementById("frmRegistro").addEventListener("submit",function(e) {
    e.preventDefault();

    let entity={

    };

control.create('reparacion/',entity);
document.getElementById("frmRegistro").reset();
});
