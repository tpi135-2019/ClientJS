import MetodsT from '../Control/MetodsT.js'
import './Componentes/TPIAutocomplete.js'

let rest = new MetodsT("subparte/1/piezas");

let div = document.querySelector('#dui_');
div.addEventListener('eventofiltrar', e => {
	let filtro = e.detail.filtro;
	console.log(e);
	rest.find(`proceso?proceso=${filtro}`).then(resp=>resp.json()).then(data => {
		let lista= llenado(data);
		//div.setAttribute("auto", lista.toString());
		const evento = new CustomEvent("datachange", {composed: true, detail: {response: lista}, bubbles: true});
		e.target.dispatchEvent(evento);
	});
});

function  llenado(data) {
	let lista = [];
	if (data !== null) {
		data.forEach(dato => {
			lista.push(dato.nombre);
		})
	}
	return lista;
}