import MetodsT from '../Control/MetodsT.js';
import './Componentes/TPIAutocomplete.js'


const controller= new MetodsT();

/*
let auto=document.querySelector("#dui_");
	auto.addEventListener('eventofiltrar', e => {
	let filtro = e.detail.filtro;
	console.log(e);
	controller.find(`diagnostico?id=${filtro}`).then(data => {
		let lista = [];
		if (data !== null) {
			data.forEach(dato => {
				lista.push(dato.nombre);
			})
		}

		const evento = new CustomEvent("datachange", {composed: true, detail: {response: lista}, bubbles: true});
		e.target.dispatchEvent(evento);
	});
});


 */

function buscarData(){

	const grid = document.querySelector('vaadin-grid');
	controller.find(`propietario/1/vehiculos`)
		.then(res => res.json())
		.then(json => grid.items = json); //llenando el grid con la data


//para navegar entre el json obtenido, separado por coma
	document.querySelector('#id').renderer = (root, grid, rowData) => {
		root.textContent = `${rowData.item.idPropietario.idPropietario}`;
	};

	document.querySelector('#model').renderer = (root, grid, rowData) => {
		root.textContent = `${rowData.item.idModelo.nombre},${rowData.item.idModelo.idMarca.nombre},${rowData.item.idModelo.idTipoVehiculo.nombre}`;
	};
}



