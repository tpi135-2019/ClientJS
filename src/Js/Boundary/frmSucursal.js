import MetodsT from "../Control/MetodsT.js"
import './Componentes/TPIAutocomplete.js'
const control = new MetodsT();

window.onload = function() {
buscarData();
};

function buscarData(){

	const grid = document.querySelector("#page > main > vaadin-grid");
	control.find(`sucursal/`)
		.then(res =>res)
		.then(json => grid.items = json).catch(e=>{
			const notification = document.querySelector('vaadin-notification');
			notification.open();
			notification.renderer = function(root) {
				root.textContent = `No se encontro la información solicitada ${e}`;
			};
		});
	document.querySelector('#activo').renderer = (root, grid, rowData) => {
		root.textContent = `${rowData.item.activo?"ACTIVO":"INACTIVO"}`;
	};
}