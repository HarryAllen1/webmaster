import 'https://esm.sh/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js?no-dts';
import { createApp, initUnoCSS, reactive, unoCSSPresetUno } from '../deps.js';
import { CART_KEY } from './constants.mjs';
import { pages } from './pages.mjs';
import { cachedPages, initRouter, pageStore, updatePage } from './router.mjs';
import './scroll_animation.mjs';
import { sleep } from './utils.mjs';

initUnoCSS({
	defaults: {
		presets: [unoCSSPresetUno()],
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
			const visible = reactive({
				value: true,
			});

			createApp({
				pages,
				pageStore,
				itemsCount,
				visible,
				toggler: document.querySelector('.navbar-toggler'),
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
	scrollTo({
		left: 0,
		top: 0,
		// @ts-ignore: https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
		behavior: 'instant',
	});
	await sleep(200);
	loader.remove();
});

document.querySelector('#main')?.addEventListener('click', () => {
	/** @type {HTMLButtonElement | null} */
	const toggler = document.querySelector('.navbar-toggler');
	if (toggler?.ariaExpanded === 'true') {
		toggler?.click();
	}
});
