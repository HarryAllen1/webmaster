import { reactive } from 'https://esm.sh/petite-vue@0.4.1';
import Toastify from 'https://esm.sh/toastify-js@1.12.0';

export const pageStore = reactive({
	current: location.pathname.replaceAll('/', ''),
	/**
	 * @param {string} pathname
	 */
	updatePage(pathname) {
		this.current = pathname.replaceAll('/', '') ??
			location.pathname.replaceAll('/', '');
	},
});

/**
 * @type {Map<string, Document>}
 */
export const cachedPages = new Map();

/**
 * Replaces the current page with the new page
 *
 * @param {Document} newPage
 */
export const updatePage = (newPage) => {
	document.dispatchEvent(new CustomEvent('page-change', { detail: newPage }));
	/** @type {HTMLDivElement | null} */
	const main = document.querySelector('#main');
	if (main) {
		main.innerHTML = newPage.querySelector('#main')?.innerHTML ??
			'No page found! Try refreshing the page.';
	}
	document.title = newPage.title;

	initRouter(document.querySelector('#main') ?? newPage);
};

/**
 * Attaches the router to a given anchor element
 *
 * @param {HTMLAnchorElement} el
 */
export const routerLink = (el) => {
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
					cachedPages.get(el.href),
				);
			} else {
				const res = await fetch(el.href).catch((e) => {
					Toastify({
						text:
							'An error occurred when fetching that page. Falling back to reload-based navigation.',
						gravity: 'bottom',
						position: 'center',
					}).showToast();
					location.href = el.href;
					throw new Error(`Couldn't fetch ${el.href}`, { cause: e });
				});
				const html = await res.text();
				const parser = new DOMParser();
				const newPage = parser.parseFromString(html, 'text/html');
				cachedPages.set(el.href, newPage);
				updatePage(newPage);
			}
			const path = new URL(el.href).pathname;
			history.pushState({}, '', el.href);
			window.scrollTo(0, 0);
			import(
				`../${location.pathname.replaceAll('/', '')}/index.mjs?${Date.now()}`
					.replaceAll('index.html', '').replaceAll('//', '/')
			);
			pageStore.updatePage(path);
		});
	}
};

/**
 * @param {Document | Element} scope
 */
export const initRouter = (scope) => {
	scope.querySelectorAll('a').forEach((el) => {
		routerLink(el);
	});
};
