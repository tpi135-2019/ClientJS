const template = document.createElement('template');
template.innerHTML = `
<input list="opciones">
    <datalist id="opciones">
    </datalist>
</input>
        <style>
        input {
        background-color: #EFEFEF;
    padding: .5rem;
    margin: .5rem 0;
    border: none;
    border-bottom: solid #C8C8C8 .2rem;
    transition: all .5s;
        }
    input:focus {
    border-bottom: solid #F39B53 .2rem;
}

    </style>
     
`;

class TPIAutocomplete extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});

        this.root.appendChild(template.content.cloneNode(true));
        this.input = this.root.querySelector('input');
        this.datalist = this.root.querySelector('datalist');

        this.input.addEventListener('input', e => {
            const evento = new CustomEvent("eventofiltrar", {
                composed: true,
                detail: {filtro: this.input.value},
                bubbles: true
            });
            this.root.dispatchEvent(evento);
        });

        this.addEventListener("datachange", e => {
            this.renderizarOpciones();
        })
    }

    renderizarOpciones() {
        this.datalist.innerHTML = '';
        let data = this.auto.split(",");
        data.forEach(coincidencias => {
            let option = document.createElement('option');
            option.value = coincidencias.toUpperCase();
            this.datalist.appendChild(option);
        });
    }

    static get observedAttributes() {
        return ["placeholder", "auto", "identificador"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(newValue);
    }

    connectedCallback() {
        console.log('se conecto');
    }

    get opciones() {
        return this._opciones;
    }

    set opciones(json) {
        this._opciones = json;
    }

    get placeholder() {
        return this.getAttribute("placeholder");
    }

    get identificador() {
        return this.getAttribute("identificador");
    }

    get auto() {
        return this.getAttribute("auto");
    }

}

customElements.define("tpi-complete", TPIAutocomplete);

export default TPIAutocomplete