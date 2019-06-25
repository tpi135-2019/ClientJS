import MetodsT from "../Control/MetodsT.js"
const control = new MetodsT();

var contar=0,pag=1;
window.onload = function() {
	buscarData(`proceso?first=${contar}&pagesize=${pag}`);
};

function buscarData(path){
	const grid = document.querySelector("#page > main > vaadin-grid");
	control.find(path).then(res=>res.json()).then(json => grid.items = json).catch(e=>{
		const notification = document.querySelector('vaadin-notification');
		notification.open();
		notification.renderer = function(root) {
			root.textContent = `No se encontro la información solicitada`;
		};
	});
	document.querySelector('#activo').renderer = (root, grid, rowData) => {
		root.textContent = `${rowData.item.activo?"Activo":"Inactivo"}`;
	};
	document.querySelector('#especialidad').renderer = (root, grid, rowData) => {
		root.textContent = `${rowData.item.idEspecialidad.nombre}`;
	};

}

const txtPro = document.querySelector("#txtR");
var filtro;
txtPro.addEventListener('eventofiltrar', e => {
	 filtro = e.detail.filtro;
	console.log(e);
	control.find(`proceso?proceso=${filtro}`).then(resp=>resp.json()).then(data => {
		let lista= llenado(data);
		let ide=ids(data);
		txtPro.setAttribute("identificador", ide.toString());
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
function ids(data){
	let lista = [];
	if (data !== null) {
		data.forEach(dato => {
			lista.push(dato.idProceso);
		})
	}
	return lista;
}


let btn =document.querySelector("#buscar");
btn.addEventListener('click',()=>{
	llenarAcordeon(txtPro);
	buscarData(`proceso?proceso=${filtro}`);
});

function llenarAcordeon(txt){
	let personal=document.querySelector("#worker");
	let pieza=document.querySelector("#piezas");
	let paso=document.querySelector("#pasos");
	control.find(`proceso/${txt.getAttribute("identificador")}/personal`).then(response=>response.json()).then(data=>{
		personal.innerHTML='';
		for(let valor of data){
			personal.innerHTML +=`<li>${valor.nombre} ${valor.apellido} </li>`
		}
	});
	control.find(`proceso/${txt.getAttribute("identificador")}/sucursal`).then(resp=>resp.json()).then(data=>{
		pieza.innerHTML='';
		for(let valor of data){
			pieza.innerHTML +=`<li>${valor.nombre}</li>`
		}
	});


	control.find(`proceso/${txt.getAttribute("identificador")}/paso`).then(resp=>resp.json()).then(data=>{
		paso.innerHTML='';
		for(let valor of data){
			paso.innerHTML +=`<li value="*">${valor.idPaso.nombre}</li>`
		}
	});
}






/*
paginado chafa xd
 */
let back=document.querySelector("#back");
let next=document.querySelector("#next");
back.addEventListener('click',()=>{
	contar=contar-pag;
	if(contar<1){
		contar=0;
	}
	buscarData(`proceso?first=${contar}&pagesize=${pag}`);
});
next.addEventListener('click',()=>{
	contar=contar+pag;
	buscarData(`proceso?first=${contar}&pagesize=${pag}`);
});
