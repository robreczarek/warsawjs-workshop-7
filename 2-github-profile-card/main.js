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

    //let repo_link = './2-github-profile-card/data.json';
    let repo_link = './2-github-profile-card/repos.json';

    fetch(profile_link, myInit)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.updateProfile(data);
      });

    fetch(repo_link, myInit)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.updateRepos(data);
      });
  }

  updateProfile(p) {
    this.shadow.querySelector('#description h1').innerHTML = p['name'];
    this.shadow.querySelector('#description h4').innerHTML = `${p['login']}: ${p['location']}`;
    this.shadow.querySelector('#description p').innerHTML = p['bio'];
    this.shadow.querySelector('#pic img').src = p['avatar_url'];
  }

  updateRepos(r) {
    let repos = r.sort(function(a,b){
        var x = a.stargazers_count < b.stargazers_count? 1:-1;
        return x;
    });
    repos.slice(0,6).map((repo) => {
      let node = document.createElement('div');
      node.innerHTML = `<i class="fa fa-star" aria-hidden="true"></i> ${repo['stargazers_count']} - ${repo['name']}`;
      this.shadow.querySelector('#repositories').appendChild(node);
    });

  }

}

window.customElements.define('template-github-card', TemplateGithub);
