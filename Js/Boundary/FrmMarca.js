import MetodsT from '../Control/MetodsT.js'
import './Componentes/TPIAutocomplete.js'

let rest = new MetodsT("subparte/1/piezas");

let div = document.querySelector('#test');
div.addEventListener('eventofiltrar', e => {
    let filtro = e.detail.filtro;
    console.log(e);
    rest.findRange(`?pieza=${filtro}`).
    then(data => {
        let lista=[];
        if(data!==null){
         data.forEach(dato=>{
             lista.push(dato.nombre);
         })
        }
        div.setAttribute("auto",lista.toString());
        const evento = new CustomEvent("datachange", { composed: true, detail: { response: data }, bubbles: true });
        e.target.dispatchEvent(evento);

    });
});

