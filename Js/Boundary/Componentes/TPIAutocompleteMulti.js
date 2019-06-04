import TPICheckbox from './TPICheckbox.js';

const template = document.createElement('template');
template.innerHTML = /*html*/ `
<div class="dropdown">
  <button  class="dropbtn"></button>
  <div id="myDropdown" class="dropdown-content ">
  <input type="text" placeholder="Search.." id="input" autocomplete="off">
    <span id="contenido"></span>
  </div>
</div>

<style>
  .dropbtn {
    background-color: #4CAF50;
    color: white;
    height: 20%;
    width: 40%;
    padding: 2%;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }

  .dropbtn:hover,
  .dropbtn:focus {
    background-color: #3e8e41;
  }

  #input {
    border-box: box-sizing;
    background-image: url('searchicon.png');
    background-position: 14px 12px;
    background-repeat: no-repeat;
    font-size: 16px;
    padding: 14px 20px 12px 45px;
    border: none;
    border-bottom: 1px solid #ddd;
  }

  #myInput:focus {
    outline: 3px solid #ddd;
  }

  .dropdown {
    width: 50%;
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 35%;
    overflow: auto;
    height: 300px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .show {
    display: block;
  }
</style>
  `;

class TPIAutocompleteMulti extends HTMLElement {

    constructor() {
        super();

        this.root = this.attachShadow({ mode: 'open' });
        this.root.appendChild(template.content.cloneNode(true));
        this.dropdown = this.root.querySelector("#myDropdown");
        this.contenido = this.root.querySelector("#contenido");
        this.input = this.root.querySelector("input");
        this.button = this.root.querySelector("button");
        this.button.addEventListener('click', () => {
            this.dropdown.classList.toggle("show");
        });
        this.input.addEventListener('input', e => {
            const evento = new CustomEvent("eventfilter", { composed: true, detail: { filtro: this.input.value }, bubbles: true });
            this.root.dispatchEvent(evento);
        });
        this.addEventListener('datachange', e => {
            this.opciones = e.detail.response;
            this.renderizarOpciones();
        })
        this.seleccionados = new Map();
    }

    renderizarOpciones() {
        /*let hijos = Array.from(this.contenido.children);
        console.log(this.opciones)
        let opcionesFiltradas = Array.from(this.opciones, ([key, value]) => {
            hijos.forEach(child => {
                if (key == child.getAttribute('id')) {
                    this.opciones.delete(key);
                }
            });
        });
        console.log(this.opciones)*/
        this.contenido.innerHTML = '';
        this.opciones.forEach((opcion, id) => {
            let option = document.createElement('tpi-checkbox');
            option.setAttribute('label', opcion);
            option.setAttribute('id', id);

            option.addEventListener('onToggle', e => {
                if (option.checked && !Array.from(this.seleccionados).some((value, id) => id == e.detail)) {
                    this.seleccionados.set(e.detail, e.detail);
                } else if (!option.checked) {
                    this.seleccionados.delete(e.detail);
                }
                console.log(this.seleccionados);
            });
            this.contenido.appendChild(option);
        });
    }

    connectedCallback() {
        console.log('se conecto');
    }

    static get observedAttributes() { return ["btnlabel"] };

    attributeChangedCallback(name, oldValue, newValue) {
        this._btnlabel = newValue;
        if (this.hasAttribute('btnlabel')) {
            this.button.innerText = this._btnlabel;
        }
    }

    get opciones() {
        return this._opciones;
    }

    set opciones(datos) {
        this._opciones = datos;
    }

    get identificadores() {
        return this._identificadores;
    }

}

customElements.define("tpi-multi", TPIAutocompleteMulti);

export default TPIAutocompleteMulti