window.__unocss = {
	theme: {
		primary: 'var(--primary)',
	},
};

import { createApp, reactive } from 'https://esm.sh/petite-vue@0.4.1';
import { pages } from './pages.mjs';
import { sleep } from './utils.mjs';
// @deno-types="npm:@unocss/runtime"
import 'https://cdn.jsdelivr.net/npm/@unocss/runtime/uno.global.js';
// @deno-types="npm:@types/bootstrap"
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js';
import './scroll-animation.mjs';

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
	document.dispatchEvent(new CustomEvent('page-change', { detail: newPage }));
	/** @type {HTMLDivElement | null} */
	const main = document.querySelector('#main');
	if (main) {
		main.innerHTML =
			newPage.querySelector('#main')?.innerHTML ??
			'No page found! Try refreshing the page.';
	}
	document.title = newPage.title;

	initRouter(document.querySelector('#main') ?? newPage);
};

import(`../${location.pathname.replaceAll('/', '')}/index.mjs?${Date.now()}`);

globalThis.addEventListener('popstate', async () => {
	const path = location.pathname;
	pageStore.updatePage(path);
	const newPage =
		cachedPages.get(location.href) ??
		new DOMParser().parseFromString(
			await (await fetch(location.href)).text(),
			'text/html'
		);
	updatePage(newPage);
	console.log('popstate');
	import(`../${location.pathname.replaceAll('/', '')}/index.mjs?${Date.now()}`);
});

/**
 * @param {Document | Element} scope
 */
const initRouter = (scope) => {
	scope.querySelectorAll('a').forEach((el) => {
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

				if (cachedPages.has(el.href)) {
					updatePage(
						// @ts-ignore: we checked it exists
						cachedPages.get(el.href)
					);
				} else {
					const res = await fetch(el.href);
					const html = await res.text();
					const parser = new DOMParser();
					const newPage = parser.parseFromString(html, 'text/html');
					cachedPages.set(el.href, newPage);
					updatePage(newPage);
				}
				const path = new URL(el.href).pathname;
				history.pushState({}, '', el.href);
				import(
					`../${location.pathname.replaceAll('/', '')}/index.mjs?${Date.now()}`
				);
				pageStore.updatePage(path);
			});
		}
	});
};

let loaded = 0;

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
			const itemsCount = reactive({
				count: JSON.parse(localStorage.getItem('cart') ?? '[]').length,
				/**
				 * @param {number} count
				 */
				setCount(count) {
					this.count = count;
				},
			});
			document.addEventListener('add-to-cart', (e) => {
				/** @type {any} */
				const event = e;
				itemsCount.setCount(event.detail.count);
			});
			createApp({
				pages,
				pageStore,
				itemsCount,
			}).mount(this);
			if (loaded === 1) initRouter(document);
			else loaded++;
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
			if (loaded === 1) initRouter(document);
			else loaded++;
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
	scrollTo(0, 0);
});
