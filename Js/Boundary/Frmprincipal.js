import MetodsT from '../Control/MetodsT.js';
const controlador = new MetodsT();

let placa=document.getElementById('idplaca');

document.getElementById('btnD').addEventListener("click",ev => {
	controlador.find(`diagnostico?${placa}/diagnosticos`).then((data) => {
		let tabla = document.querySelector("#tblReparacion");
		let nuevoJson = data.map(diagnostico => {
			return {
				"diagnostico": diagnostico.diagnostico,
				"fecha": diagnostico.fecha,
				"idDiagnostico": diagnostico.idDiagnostico,
				"idVehiculo": diagnostico.idVehiculo.idVehiculo
			}
		});
		console.log(nuevoJson);

		tabla.setAttribute("datos", JSON.stringify(nuevoJson));
	});
});

document.addEventListener("Click_btn", e => {
	llenado();
});

document.addEventListener('cambio-opcion', evt => {
	llenado();
});

function llenado() {

	controlador.find(`diagnostico?${placa}/diagnosticos`).then((data) => {
		let tabla = document.querySelector("#tblReparacion");

		let nuevoJson = data.map(diagnostico => {
			return {
				"diagnostico": diagnostico.diagnostico,
				"fecha": diagnostico.fecha,
				"idDiagnostico": diagnostico.idDiagnostico,
				"idVehiculo": diagnostico.idVehiculo.idVehiculo
			}
		});
		console.log(nuevoJson);

		tabla.setAttribute("datos", JSON.stringify(nuevoJson));
	});
}
