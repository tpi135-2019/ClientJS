class TPITabla extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.estilo();
    }

    // getters  de atributos
    get cabeceras() {
        return this.getAttribute("cabeceras");
    }

    get first() {
        return this.getAttribute("first");
    }

    get pagesize() {
        return this.getAttribute("pagesize");
    }

    get datos() {
        return this.getAttribute("datos");
    }

    connectedCallback() {
        //creacion de elementos para tabla
        let tabla = document.createElement("table");
        let cabecerasList = this.cabeceras.split(",");
        let select = document.createElement("select");
        let opcion = document.createElement("option");
        opcion.setAttribute("value",2);
        opcion.appendChild(document.createTextNode("2"));
        let opcion2 = document.createElement("option");
        opcion2.setAttribute("value",5);
        opcion2.appendChild(document.createTextNode("5"));
        select.appendChild(opcion);
        select.appendChild(opcion2);

        // creando botones

        let btns = document.createElement("button");
        btns.setAttribute("class","button-rigth");
        let span1 = document.createElement("span");
        span1.innerText = "Next";
        btns.appendChild(span1);
        this.appendChild(btns);

        let btna = document.createElement("button");
        btna.setAttribute("class","button-left");
        let span2 = document.createElement("span");
        span2.innerText = "Back";
        btna.appendChild(span2);
        this.appendChild(btna);
        /*
            DIBUJANDO LA TABLA
        */
        let tr0 = document.createElement("tr");
        tabla.appendChild(tr0);


        this.tr0 = tr0;
        this.tabla = tabla;
        this.cabecerasList = cabecerasList;


        select.s = this;
        btns.s = this;
        btna.s = this;
        select.onchange=this.renderizarTamanioP;
        btns.onclick = this.siguiente;
        btna.onclick = this.anterior;
        this.root.appendChild(tabla);
        this.root.appendChild(btna);
        this.root.appendChild(select);
        this.root.appendChild(btns);
    }


    //FUNCIONABILIDAD DE BOTONES
    anterior(){
        let comp = this.s;
        this.s.tabla.innerHTML="";
        this.s.tabla.appendChild(this.s.tr0);
        let frs = comp.getAttribute("first");
        let ps = comp.getAttribute("pagesize");
        if((parseInt(frs)-parseInt(ps))<0){ //evaluando el valor del primer registro a mostrar
            comp.setAttribute("first",0);
        }else{
            comp.setAttribute("first",(parseInt(frs)-parseInt(ps)));
        }

        this.dispatchEvent(new CustomEvent("Click_btn", { composed: true, bubbles: true }));
    }

    siguiente(){
        let comp = this.s;
        comp.tabla.innerHTML="";
        comp.tabla.appendChild(this.s.tr0);
        let frs = comp.getAttribute("first");
        let pa = comp.getAttribute("pagesize");
        comp.setAttribute("first",(parseInt(frs)+parseInt(pa)));
        this.dispatchEvent(new CustomEvent("Click_btn", { composed: true, bubbles: true }));
    }

    renderizarTamanioP(){
        console.log(this.value);
        let comp = this.s;
        this.s.tabla.innerHTML="";
        this.s.tabla.appendChild(this.s.tr0);
        comp.setAttribute("pagesize",this.value);  //   //agregar de nuevo tamaño de paginacion
        this.dispatchEvent(new CustomEvent('cambio-opcion',{composed:true,bubbles:true}));
    }

    //HACIENDO VISIBLES LOS ATRIBUTOS EDITABLES
    static get observedAttributes() {
        return ["first", "pagesize", "datos", "cabeceras"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.crearFilas();
    }

    crearFilas() {
        let tr0 = this.tr0;
        let tabla = this.tabla;
        let cabecerasList = this.cabeceras.split(",");
        if (this.datos !== undefined && this.datos !== "" && this.cabecerasList !== undefined) {
            tr0.innerHTML =""; // finalizar encabezados
            cabecerasList.forEach( (element)=> {
                let th = document.createElement("th"); // creando elemento th para encabezados
                th.innerText = element.toUpperCase(); // colocando encabezados ha la tabla
                tr0.appendChild(th);
            });
            tabla.innerHTML=""; //limpiando tabla
            tabla.appendChild(tr0);
            let dd= this.getAttribute("datos");
           let dta=JSON.parse(dd);
          this.rangoDatos(dta).forEach( (element)=> {
                let tr = document.createElement("tr");
                //llenado del contenido
                cabecerasList.forEach( (atri)=> {
                    let td = document.createElement("td");
                    td.innerText = element[atri];
                    tr.appendChild(td);
                });
                tabla.appendChild(tr);
            });
        }

    }

    //listando la data obtenida
    rangoDatos(objeto){
        let lista = [];
        //console.log(objeto);
        if(objeto==null){
            return lista;
        }
        for(let i = 0; i<objeto.length; i++){

            lista.push(objeto[i]);
        }
        return lista;
    }
//agregar css al componente
    estilo(){
        this.root.innerHTML=`
        <style>
        table {
        width: 100%;
        text-align: left;
        border-collapse: collapse;
        margin: 0 0 1em 0;
        caption-side: top;
    }
        caption, td, th {
        padding: 0.3em;
    }
        th, td {
        border-bottom: 1px solid #000;
        border-right: 1px solid #000;
        background-color: #eef8ff;
    }   

        th.last, td.last {
        border-right: 0;
    }
        tfoot th, tfoot td {
        border-bottom: 0;
        text-align: center;
    }
      th {
    background-color: #b6b6ff;
    width: 25%;
    }

     button {
              position:relative;
              left:25%;
              background-color: #2269ff; /* Green */
              border: none;
              margin-top: 1vw;
              margin-left: 5vw;
              margin-right: 5vw;
              color: white;
              padding: 1vw 2.5vw;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 16px;
            }

            button span {                
                cursor: pointer;
                display: inline-block;
                position: relative;
                transition: 0.5s;
            }
            
             select {
              position: relative;
              left:25%;
              padding: 0.5vw 1.5vw;
            }

</style>
     `
    }
}
customElements.define("tpi-tabla", TPITabla);
export default  TPITabla