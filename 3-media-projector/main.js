class TemplateProjector extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.pics = [];
    this.current_pic = 0;

  }

  connectedCallback() {
    // Template handling
    this.$template_selector = document.currentScript.ownerDocument.querySelector('#template-projector');
    this.$template = this.$template_selector.innerHTML;
    this.shadow.innerHTML = this.$template;

    this.pics = this.attributes.pics.value.split(',');
    this.current_pic = this.pics.length-1;
    this.updateSlide.bind(this);
    let intervalID = window.setInterval(this.updateSlide.bind(this), 2000);
  }

  updateSlide() {
    if (this.current_pic === this.pics.length-1) {
      this.current_pic = 0;
    } else {
      this.current_pic += 1;
    }
    this.shadow.querySelector('#slide').src = this.pics[this.current_pic];
  }
}

window.customElements.define('template-projector', TemplateProjector);
