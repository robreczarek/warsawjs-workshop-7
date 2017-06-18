let $container = document.querySelector('#container');

class TemplatePic extends HTMLElement {
  constructor() {
    super();
    console.log('Woof constructed.');
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    console.log('Ready to woof!');
    // Template handling
    this.$template_selector = document.querySelector('#template-pic');
    this.$template = this.$template_selector.innerHTML;
    this.shadow.innerHTML = this.$template;

    // Inject passed template parameters
    this.shadow.querySelector('h1').innerHTML = this.attributes.caption.value;
    this.shadow.querySelector('img').src = this.attributes.img.value;
  }
}

window.customElements.define('template-pic', TemplatePic);
