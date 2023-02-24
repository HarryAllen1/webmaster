const navbarTemplate = await (await fetch('/templates/navbar.html')).text();

customElements.define(
  'wm-navbar',
  class extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = navbarTemplate;
    }
  }
);
