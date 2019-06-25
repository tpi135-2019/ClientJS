import MetodsT from "../Control/MetodsT.js"
const control = new MetodsT();

var contar=0,pag=1;
window.onload = function() {
buscarData(`sucursal?first=${contar}&pagesize=${pag}`);
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
}

const filtro = document.querySelector("#txtR");
let btn =document.querySelector("#page > main > vaadin-button");
btn.addEventListener('click',()=>{
	listarProcesos();
	listarPersonal();
	contar=filtro.value-1;
	buscarData(`sucursal?first=${contar}&pagesize=1`);
});

function listarProcesos(){
	let procesos=document.querySelector("#procesos");
	control.find(`sucursal/${filtro.value}/proceso`).then(response=>response.json()).then(data=>{
		procesos.innerHTML='';
		for(let valor of data){
			procesos.innerHTML +=`<li>${valor.nombre}</li>`
		}
	});

	///listar personal?
}

function listarPersonal(){
	let personal=document.querySelector("#personal");
	control.find(`sucursal/${filtro.value}/personal`).then(response=>response.json()).then(data=>{
		personal.innerHTML='';
		for (let valor of data){
			personal.innerHTML +=`<li>${valor.nombre} ${valor.apellido}</li>`
		}
	})
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
	buscarData(`sucursal?first=${contar}&pagesize=${pag}`);
});
next.addEventListener('click',()=>{
	contar=contar+pag;
	buscarData(`sucursal?first=${contar}&pagesize=${pag}`);
});
