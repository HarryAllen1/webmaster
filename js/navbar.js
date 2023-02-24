const NAVBAR_TEMPLATE = `
<nav class="navbar navbar-expand-lg bg-primary">
  <div class="container-fluid">
    <a href="/" class="navbar-brand text-bold">Webmaster</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/about">About</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
`;

customElements.define(
  'wm-navbar',
  class extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = NAVBAR_TEMPLATE;
    }
  }
);
