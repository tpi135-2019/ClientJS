import MetodsT from '../Control/MetodsT.js'
import './Componentes/TPIAutocomplete.js'

let rest = new MetodsT("subparte/1/piezas");

let div = document.querySelector('#test');

div.addEventListener('eventofiltrar', e => {
    let filtro = e.detail.filtro;
    console.log(e);
    rest.findRange(`?pieza=${filtro}`).
    then(data => {
        //console.log(data);
        const evento = new CustomEvent("datachange", { composed: true, detail: { response: data }, bubbles: true });
        e.target.dispatchEvent(evento);
    });
});