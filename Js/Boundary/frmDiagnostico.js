import MetodsT from '../Control/MetodsT.js'
import './Componentes/TPIAutocomplete.js'

const controlador = new MetodsT();

let seleccionPlaca = document.querySelector("#idplaca");

seleccionPlaca.addEventListener('eventofiltrar', e => {
	let filtro = e.detail.filtro;
	controlador.find(`vehiculo/search?id=${filtro}`).then(data => {
		let lista = [];
		if (data !== null) {
			data.forEach(dato => {
				lista.push(dato.idVehiculo);
			})
		}
		seleccionPlaca.setAttribute("auto", lista.toString());
		const evento = new CustomEvent("datachange", {composed: true, bubbles: true});
		e.target.dispatchEvent(evento);
	});
});

let placa, diagnos, fechaV;
placa = document.getElementById('idplaca');
diagnos = document.getElementById('obs');
fechaV = document.getElementById('dater');

document.getElementById("frmRegistroD").addEventListener("submit", function (e) {
	e.preventDefault();

	let entity = {
		diagnostico: diagnos.value,
		fecha: new Date(fechaV.value).toISOString(),
		idVehiculo: {
			idVehiculo: placa.getAttribute("auto")
		}
	};

	controlador.create('diagnostico/', entity);
	document.getElementById("frmRegistroD").reset();
});
