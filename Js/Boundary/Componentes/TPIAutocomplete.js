const template = document.createElement('template');
template.innerHTML = `
<input list="opciones">
    <datalist id="opciones">
    </datalist
</input>
`;

class TPIAutocomplete extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.root.appendChild(template.content.cloneNode(true));
        this.input = this.root.querySelector('input');
        this.datalist = this.root.querySelector('datalist');

        this.input.addEventListener('input', e => {
            const evento = new CustomEvent("eventofiltrar", { composed: true, detail: { filtro: this.input.value }, bubbles: true });
            this.root.dispatchEvent(evento);
        });

        this.addEventListener("datachange", e => {
            this.opciones = e.detail.response;
            console.log(this.opciones);
            this.renderizarOpciones();
        })
    }

    renderizarOpciones() {
        this.datalist.innerHTML = '';
        this.opciones.forEach(opcion => {
            // this.datalist.innerHTML = `<option value="${opcion.nombre}">`;

            let option = document.createElement('option');
            option.value = opcion.nombre;
            this.datalist.appendChild(option);
        });
    }

    static get observedAttributes() { return ["placeholder"]; }

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


}
customElements.define("tpi-complete", TPIAutocomplete);

export default TPIAutocomplete