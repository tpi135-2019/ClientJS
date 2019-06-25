import MetodsT from '../Control/MetodsT.js'
import './Componentes/TPIAutocomplete.js'


var controlador = new MetodsT();

let marc = document.querySelector("#idMarca");
var pathModel;
marc.addEventListener('eventofiltrar', e => {
	let filtro = e.detail.filtro;
	controlador.find(`marca/search?nombre=${filtro}`).then(data => {
		let lista = [];
		let ide = [];
		if (data !== null) {
			data.forEach(dato => {
				lista.push(dato.nombre);
				ide.push(dato.idMarca);
			})
		}
		marc.setAttribute("auto", lista.toString());
		marc.setAttribute("identificador", ide.toString());
		pathModel = `marca/${ide.toString()}/modelos`;
		const evento = new CustomEvent("datachange", {composed: true, bubbles: true});
		e.target.dispatchEvent(evento);
	});
});

let div = document.querySelector('#test');
div.addEventListener('eventofiltrar', e => {
	let filtro = e.detail.filtro;
	controlador.find(`${pathModel}?modelo=${filtro}`).then(data => {
		let lista = [];
		let id = [];
		if (data !== null) {
			data.forEach(dato => {
				lista.push(dato.nombre);
				id.push(dato.idModelo);
			})
		}
		div.setAttribute("auto", lista.toString());
		div.setAttribute("identificador", id.toString());
		const evento = new CustomEvent("datachange", {composed: true, bubbles: true});
		e.target.dispatchEvent(evento);
	});
});


let pro = document.querySelector('#test2');

pro.addEventListener('eventofiltrar', e => {
	let filtro = e.detail.filtro;
	controlador.find(`propietario/search?dui=${filtro}`).then(data => {
		let lista = [];
		if (data !== null) {
			data.forEach(dato => {
				lista.push(dato.idPropietario);
			})
		}
		pro.setAttribute("auto", lista.toString());
		const evento = new CustomEvent("datachange", {composed: true, bubbles: true});
		e.target.dispatchEvent(evento);
	});
});

let idpro, chasis, vin, placa, model, colur, numMotor;

numMotor = document.getElementById('numMotor');
idpro = document.getElementById('test2');
colur = document.getElementById('colorr');
chasis = document.getElementById('numChass');
vin = document.getElementById('numvim');
placa = document.getElementById('idPlaca');
model = document.getElementById('test');


document.getElementById("frmRegistro").addEventListener("submit", function (e) {
	e.preventDefault();
	let entity = {
		idPropietario: {
			idPropietario: idpro.getAttribute('auto')
		},
		color: colur.value,
		vin: vin.value,
		numeroChasis: chasis.value,
		numeroMotor: numMotor.value,
		idModelo: {
			idModelo: model.getAttribute('identificador')
		},
		idVehiculo: placa.value
	};
	console.log(entity);
	controlador.create('vehiculo/', entity);
	document.getElementById("frmRegistro").reset();
});

document.getElementById("btnMarca").addEventListener("click", () => {
	abrirMarca();
});
document.getElementById("cerrar").addEventListener("click", () => {
	cerrarMarca();
});

function abrirMarca() {
	document.getElementById("vent").style.display = "block";
}

function cerrarMarca() {
	document.getElementById("vent").style.display = "none";
}

let nameMarca, ckActivo, descripcionMarca;
nameMarca = document.getElementById("nombreMarca");
ckActivo = document.getElementById("activo_");
descripcionMarca = document.getElementById("descripcion_");

document.getElementById("registroMarca").addEventListener("submit", (e) => {
	e.preventDefault();
	let entity = {
		nombre: nameMarca.value,
		activo: ckActivo.checked,
		descripcion: descripcionMarca.value
	};
	controlador.create('marca/', entity);
	document.getElementById("registroMarca").reset();
});

function abrirModelo() {
	document.getElementById("ventanaModelo").style.display = "block";
}

function cerrarModelo() {
	document.getElementById("ventanaModelo").style.display = "none";
}

document.getElementById("btnModelo").addEventListener("click", () => {
	abrirModelo();
});
document.getElementById("closeModelo").addEventListener("click", () => {
	cerrarModelo();
});

let tpv = document.querySelector("#selectTPV");
tpv.addEventListener('eventofiltrar', e => {
	let filtro = e.detail.filtro;
	controlador.find(`tipovehiculo/search?nombre=${filtro}`).then(data => {
		let lista = [];
		let ide = [];
		if (data !== null) {
			data.forEach(dato => {
				lista.push(dato.nombre);
				ide.push(dato.idTipoVehiculo);
			})
		}
		tpv.setAttribute("auto", lista.toString());
		tpv.setAttribute("identificador", ide.toString());
		const evento = new CustomEvent("datachange", {composed: true, bubbles: true});
		e.target.dispatchEvent(evento);
	});
});

let completeMarca = document.querySelector("#selectMarca");
completeMarca.addEventListener('eventofiltrar', e => {
	let filtro = e.detail.filtro;
	controlador.find(`marca?nombre=${filtro}`).then(data => {
		let lista = [];
		let ide = [];
		if (data !== null) {
			data.forEach(dato => {
				lista.push(dato.nombre);
				ide.push(dato.idMarca);
			})
		}
		completeMarca.setAttribute("auto", lista.toString());
		completeMarca.setAttribute("identificador", ide.toString());
		const evento = new CustomEvent("datachange", {composed: true, bubbles: true, detail: {data: lista}});
		e.target.dispatchEvent(evento);

	});
});

let nombremodeloM, aniomodeloM, marcaM, tipovehiculoM;
nombremodeloM = document.getElementById("nombreModelo");
aniomodeloM = document.getElementById("anio");
marcaM = document.getElementById("selectMarca");
tipovehiculoM = document.getElementById("selectTPV");

document.getElementById("registroModelo").addEventListener("submit", (e) => {
	e.preventDefault();

	let entity = {
		anyo: aniomodeloM.value,
		idMarca: {
			idMarca: marcaM.getAttribute("identificador")
		},
		idTipoVehiculo: {
			idTipoVehiculo: tipovehiculoM.getAttribute("identificador")
		},
		nombre: nombremodeloM.value
	};

	controlador.create('modelo/', entity);
	document.getElementById("registroModelo").reset();
});

function abrirPropietario() {
	document.getElementById("ventanaPropietario").style.display = "block";
}

function cerrarPropietario() {
	document.getElementById("ventanaPropietario").style.display = "none";
}

document.getElementById("btnPropietario").addEventListener("click", () => {
	abrirPropietario();
});

document.getElementById("closePropietario").addEventListener("click", () => {
	cerrarPropietario();
});

let duiP, nombreP, apellidoP, direccionP, celP;
duiP = document.getElementById("idPropietario");
nombreP = document.getElementById("nombrePropietario");
apellidoP = document.getElementById("apellidoPropietario");
direccionP = document.getElementById("direccion");
celP = document.getElementById("telefono");

document.getElementById("registroPropietario").addEventListener("submit", (evt) => {
	evt.preventDefault();

	let entity = {
		apellido: apellidoP.value,
		direccion: direccionP.value,
		idPropietario: duiP.value,
		nombre: nombreP.value,
		telefono: celP.value
	};
	controlador.create('propietario/', entity);
	document.getElementById("registroPropietario").reset();
});

