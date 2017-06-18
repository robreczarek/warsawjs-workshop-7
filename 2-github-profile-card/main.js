class TemplateGithub extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Template handling
    this.$template_selector = document.currentScript.ownerDocument.querySelector('#template-github-card');
    this.$template = this.$template_selector.innerHTML;
    this.shadow.innerHTML = this.$template;

    let myHeaders = new Headers();
    let myInit = {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default'
    };
    //let profile_link = this.attributes.profile.value;
    let profile_link = './2-github-profile-card/data.json';

    fetch(profile_link, myInit)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.updateProfile(data);
      });
  }

  updateProfile(p) {
    this.shadow.querySelector('#description h1').innerHTML = p['name'];
    this.shadow.querySelector('#description h4').innerHTML = `${p['login']}: ${p['location']}`;
    this.shadow.querySelector('#description p').innerHTML = p['bio'];
    this.shadow.querySelector('#pic img').src = p['avatar_url'];
  }

}

window.customElements.define('template-github-card', TemplateGithub);
