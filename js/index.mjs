window.__unocss = {
	theme: {
		primary: 'var(--primary)',
	},
};

import { createApp, reactive } from 'https://esm.sh/petite-vue@0.4.1';
import { sleep } from './utils.mjs';
// @deno-types="npm:@unocss/runtime"
import 'https://cdn.jsdelivr.net/npm/@unocss/runtime/uno.global.js';
// @deno-types="npm:@types/bootstrap"
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js';

const pages = [
	['Home', '/'],
	['Book', '/book'],
	['Models', '/models'],
	['About', '/about'],
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

const initPetiteVue = async () =>
	createApp({
		commits: (await import('../about/work-log.mjs')).default,
		toastMessage: '',
		/**
		 * @param {PointerEvent} e
		 */
		addToCart(e) {
			const currentCart = JSON.parse(localStorage.getItem('cart') ?? '[]');
			// currentCart.push(e.target);
			/**
			 * @type {HTMLButtonElement}
			 */
			// @ts-ignore: we know what it is
			const target = e.target;
			this.toastMessage = `Added 1 ${
				target.parentElement?.querySelector('#name')?.textContent
			} flight to cart for ${
				target.parentElement?.querySelector('#price')?.textContent
			}`;
			localStorage.setItem('cart', JSON.stringify(currentCart));
			new globalThis.bootstrap.Toast('#addToCartToast').show();
		},
	}).mount('#main');
initPetiteVue();

if (location.href.includes('models')) {
	await import('../models/renderer.mjs');
}

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
	if (main) {
		main.innerHTML =
			newPage.querySelector('#main')?.innerHTML ??
			'No page found! Try refreshing the page.';
	}
	document.title = newPage.title;
	initPetiteVue();
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
				if (
					new URL(el.href).pathname.replaceAll('/', '') ===
					new URL(location.href).pathname.replaceAll('/', '')
				) {
					return;
				}

				if (el.href.includes('models')) {
					await import('../models/renderer.mjs');
				}
				if (cachedPages.has(el.href)) {
					updatePage(
						// @ts-ignore: we checked it exists
						cachedPages.get(el.href)
					);
					history.pushState({}, '', el.href);
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

customElements.define(
	'wm-footer',
	class extends HTMLElement {
		constructor() {
			super();
			this._render();
		}
		async _render() {
			const res = await fetch('/components/footer.html');
			const html = await res.text();
			this.innerHTML = html;
			createApp({
				pages,
			}).mount(this);
		}
	}
);

globalThis.addEventListener('load', async () => {
	await sleep(50);
	/** @type {HTMLDivElement | null} */
	const loader = document.querySelector('#loader');
	if (!loader) return;
	loader.style.animationDuration = '0.2s';
	loader.classList.add('animate-fade-in', 'animate-reverse');
	await sleep(200);
	document.body.style.overflow = 'auto';
	loader.remove();
});
