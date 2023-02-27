import { createApp, reactive } from 'https://unpkg.com/petite-vue?module';

const pages = [
  ['Home', '/'],
  ['About', '/about'],
  ['Models', '/models'],
];

const pageStore = reactive({
  current: location.pathname.replaceAll('/', ''),
  /**
   * @param {string} pathname
   */
  updatePage(pathname) {
    this.current =
      pathname.replaceAll('/', '') ?? location.pathname.replaceAll('/', '');
  },
});

createApp({}).mount('#main');

/**
 * @type {Map<string, Document>}
 */
const cachedPages = new Map();

/**
 * Replaces the current page with the new page
 *
 * @param {Document} newPage
 */
const updatePage = (newPage) => {
  /** @type {HTMLDivElement | null} */
  const main = document.querySelector('#main');
  if (main)
    main.innerHTML =
      newPage.querySelector('#main')?.innerHTML ??
      'No page found! Try refreshing the page.';
  document.title = newPage.title;
};

const initRouter = () => {
  document.querySelectorAll('a').forEach((el) => {
    if (el.href.startsWith(location.origin)) {
      el.addEventListener('pointerover', async (e) => {
        e.preventDefault();
        if (cachedPages.has(el.href)) {
          return;
        }
        const res = await fetch(el.href);
        const html = await res.text();
        const parser = new DOMParser();
        const newPage = parser.parseFromString(html, 'text/html');
        cachedPages.set(el.href, newPage);
      });
      el.addEventListener('click', async (e) => {
        e.preventDefault();
        if (cachedPages.has(el.href)) {
          updatePage(
            // @ts-ignore
            cachedPages.get(el.href)
          );
          return pageStore.updatePage(new URL(el.href).pathname);
        }
        const res = await fetch(el.href);
        const html = await res.text();
        const parser = new DOMParser();
        const newPage = parser.parseFromString(html, 'text/html');
        cachedPages.set(el.href, newPage);
        history.pushState({}, '', el.href);
        updatePage(newPage);
        pageStore.updatePage(new URL(el.href).pathname);
      });
    }
  });
};

customElements.define(
  'wm-navbar',
  class extends HTMLElement {
    constructor() {
      super();
      this._render();
    }
    async _render() {
      const res = await fetch('/components/navbar.html');
      const html = await res.text();
      this.innerHTML = html;
      createApp({
        pages,
        pageStore,
      }).mount(this);
      initRouter();
    }
  }
);