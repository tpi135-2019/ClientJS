import MetodsT from "../Control/MetodsT.js"
const control = new MetodsT();

var contar=0,pag=1;
window.onload = function() {
	buscarData(`proceso?first=${contar}&pagesize=${pag}`);
};

function buscarData(path){
	const grid = document.querySelector("#page > main > vaadin-grid");
	control.find(path)
		.then(res=>{
			return res.json();
		}).then(json => grid.items = json).catch(e=>{
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

const filtro = document.querySelector("#txtR");
let btn =document.querySelector("#page > main > vaadin-button");
btn.addEventListener('click',()=>{
	contar=filtro.value-1;
	llenarAcordeon(filtro);
	buscarData(`proceso?first=${contar}&pagesize=1`);
});




function llenarAcordeon(txt){
	let personal=document.querySelector("#worker");
	let pieza=document.querySelector("#piezas");
	let paso=document.querySelector("#pasos");
	control.find(`proceso/${txt.value}/personal`).then(response=>response.json()).then(data=>{
		personal.innerHTML='';
		for(let valor of data){
			personal.innerHTML +=`<li>${valor.nombre} ${valor.apellido} </li>`
		}
	});
	control.find(`proceso/${txt.value}/sucursal`).then(resp=>resp.json()).then(data=>{
		pieza.innerHTML='';
		for(let valor of data){
			pieza.innerHTML +=`<li>${valor.nombre}</li>`
		}
	});

	// nosse si poner los pasos ¿? esta raro el recurso
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
