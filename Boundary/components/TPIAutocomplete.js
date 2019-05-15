class TPIAutocomplete extends HTMLElement{

    constructor(){
        super();
        this.root = this.attachShadow({mode:'open'});

    }

    connectedCallback(){
        let txtInput=document.createElement("input");
        let outputText=document.createElement("output");
        txtInput.placeholder="Buscar partes";
        txtInput.type="text";
        txtInput.id="id";
        txtInput.addEventListener("input",ev => {
           /* document.querySelector("#hola").innerHTML="adios bye :v";
      console.log("algo cambio");
      */

           console.log(ev)
        });

        this.root.appendChild(txtInput);
    }
}
customElements.define("tpi-complete",TPIAutocomplete);