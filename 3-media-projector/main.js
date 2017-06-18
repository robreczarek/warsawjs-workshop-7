class TemplateProjector extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Template handling
    this.$template_selector = document.currentScript.ownerDocument.querySelector('#template-projector');
    this.$template = this.$template_selector.innerHTML;
    this.shadow.innerHTML = this.$template;

    // Inject passed template parameters
    //this.shadow.querySelector('h1').innerHTML = this.attributes.caption.value;
    //this.shadow.querySelector('img').src = this.attributes.img.value;
  }
}

window.customElements.define('template-projector', TemplateProjector);
