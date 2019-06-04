const template = document.createElement('template');
template.innerHTML = /*html*/ `

<a href="#" >
<label class="container">
<span id="label"></span>
<input type="checkbox" >
<span class="checkmark"></span>
</label></a>

<style>

#label{
  margin-left: 10px;
}

a:hover {background-color: #ddd;}

a { color: black;
    text-decoration: none;
    display: block;
  }

.container {
    display: block;
    position: relative;
    padding: 10px 10px 10px 35px;

    cursor: pointer;
    font-size: 90%;
    height: 25px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  /* Hide the browser's default checkbox */
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  
  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    margin: 10px;

  }
  
  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: #ccc;
  }
  
  /* When the checkbox is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: #2196F3;
  }
  
  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  
  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }
  
  /* Style the checkmark/indicator */
  .container .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
</style>
`;

export default class TPICheckbox extends HTMLElement {

	constructor() {
		super();
		this.root = this.attachShadow({mode: 'open'});
		this.root.appendChild(template.content.cloneNode(true));
		this.label = this.root.querySelector('#label');
		this.checkbox = this.root.querySelector('input');
		this.checkbox.addEventListener('click', (e) => {
			this.dispatchEvent(new CustomEvent('onToggle', {detail: this.getAttribute('id')}));
		});

	}

	static get observedAttributes() {
		return ["label"]
	};

	get checked() {
		return this.checkbox.checked;
	}

	connectedCallback() {
		console.log('se conecto cehckbox');
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this._label = newValue;
		this.label.innerText = this._label;
	}
}

customElements.define("tpi-checkbox", TPICheckbox);