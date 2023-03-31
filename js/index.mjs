import { createApp, reactive } from 'https://esm.sh/petite-vue@0.4.1';
import { pages } from './pages.mjs';
import { sleep } from './utils.mjs';
import initUnoCSS from 'https://esm.sh/@unocss/runtime@0.50.6';
import presetUno from 'https://esm.sh/@unocss/preset-uno@0.50.6';
import 'https://esm.sh/bootstrap@5.3.0-alpha2/dist/js/bootstrap.bundle.min.js';
import './scroll-animation.mjs';
import { CART_KEY } from './constants.mjs';
import { cachedPages, initRouter, pageStore, updatePage } from './router.mjs';
import { initBlob } from './blob.mjs';

initUnoCSS({
	defaults: {
		presets: [presetUno()],
		theme: {
			colors: {
				primary: 'var(--primary)',
			},
		},
	},
});

import(
	// hack to allow pages to be visited more than once
	`../${location.pathname.replaceAll('/', '')}/index.mjs?${Date.now()}`
		.replaceAll('index.html', '')
		.replaceAll('//', '/')
);

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
	import(
		`../${location.pathname.replaceAll('/', '')}/index.mjs?${Date.now()}`
			.replaceAll('index.html', '')
			.replaceAll('//', '/')
	);
});

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
			/** @type {[string, number][]} */
			const cart = JSON.parse(localStorage.getItem(CART_KEY) ?? '[]');
			const itemsCount = reactive({
				count: cart.reduce((acc, v) => acc + v[1], 0),
				/**
				 * @param {number} count
				 */
				setCount(count) {
					this.count = count;
				},
			});
			document.addEventListener(
				'add-to-cart',
				/** @param {any} e */
				(e) => {
					/** @type {CustomEvent<{ count: number }>} */
					const event = e;
					itemsCount.setCount(event.detail.count);
				}
			);
			createApp({
				pages,
				pageStore,
				itemsCount,
			}).mount(this);
			if (loaded === 1) initRouter(document);
			else loaded++;
			this.querySelectorAll('a.nav-link').forEach((el) => {
				el.addEventListener('click', () => {
					/** @type {HTMLButtonElement | null} */
					const toggler = document.querySelector('.navbar-toggler');
					if (toggler?.ariaExpanded === 'true') {
						toggler?.click();
					}
				});
			});
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
	initBlob();
});

document.querySelector('#main')?.addEventListener('click', () => {
	/** @type {HTMLButtonElement | null} */
	const toggler = document.querySelector('.navbar-toggler');
	if (toggler?.ariaExpanded === 'true') {
		toggler?.click();
	}
});
