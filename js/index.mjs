import { createApp, reactive } from '../deps.js';
import { CART_KEY } from './constants.mjs';
import { pages } from './pages.mjs';
import { cachedPages, initRouter, pageStore, updatePage } from './router.mjs';
import './scroll_animation.mjs';
import { sleep } from './utils.mjs';
import 'https://esm.sh/preline@1.8.0?bundle';
import { initFlowbite } from 'https://esm.sh/flowbite@1.6.5?bundle';

import(
	// hack to allow pages to be visited more than once
	`../${location.pathname.replaceAll('/', '')}/index.mjs?${Date.now()}`
		.replaceAll('index.html', '')
		.replaceAll('//', '/')
);

initFlowbite();

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
	initFlowbite();
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
			const res = await fetch('/components/navbar.wm-component');
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
			const visible = reactive({
				value: true,
			});

			createApp({
				pages,
				pageStore,
				itemsCount,
				visible,
			}).mount(this);

			let lastScroll = 0;
			setTimeout(() => {
				globalThis.addEventListener('scroll', () => {
					const scroll = window.pageYOffset;
					visible.value = scroll < 50 || scroll < lastScroll;

					lastScroll = scroll;
				});
			}, 250);
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
			const res = await fetch('/components/footer.wm-component');
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
	scrollTo({
		left: 0,
		top: 0,
		// @ts-ignore: https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
		behavior: 'instant',
	});
	loader.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200 });
	await sleep(200);
	loader.remove();
});

document.querySelector('#main')?.addEventListener('click', () => {
	/** @type {HTMLButtonElement | null} */
	const toggler = document.querySelector('#toggler');
	if (toggler?.classList.contains('open')) {
		toggler?.click();
	}
});
