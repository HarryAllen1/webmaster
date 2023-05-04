import { reactive, Toastify } from '../deps.js';

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
	/** @type {HTMLDivElement | null} */
	const main = document.querySelector('#main');
	if (main) {
		main.innerHTML = newPage.querySelector('#main')?.innerHTML ??
			'No page found! Try refreshing the page.';
	}
	document.title = newPage.title;

	initRouter(document.querySelector('#main') ?? newPage);
	document.dispatchEvent(new CustomEvent('page-change', { detail: newPage }));
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
		el.addEventListener('click', (e) => {
			e.preventDefault();
			goto(el.href);
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

/**
 * Programmatically navigates to a page
 *
 * @param {string} route
 */
export const goto = (route) => {
	const { href } = new URL(route, location.origin);
	document
		.querySelector('#main')
		?.animate(
			[
				{
					opacity: 1,
				},
				{
					opacity: 0,
				},
			],
			{
				duration: 350,
				easing: 'ease-in-out',
			},
		)
		.addEventListener('finish', async () => {
			if (
				new URL(href).pathname.replaceAll('/', '') ===
					new URL(location.href).pathname.replaceAll('/', '')
			) {
				return;
			}

			if (cachedPages.has(href)) {
				updatePage(
					// @ts-ignore: we checked it exists
					cachedPages.get(href),
				);
			} else {
				const res = await fetch(href).catch((e) => {
					Toastify({
						text:
							'An error occurred when fetching that page. Falling back to reload-based navigation.',
						gravity: 'bottom',
						position: 'center',
					}).showToast();
					location.href = href;
					throw new Error(`Couldn't fetch ${href}`, { cause: e });
				});
				const html = await res.text();
				const parser = new DOMParser();
				const newPage = parser.parseFromString(html, 'text/html');
				cachedPages.set(href, newPage);
				updatePage(newPage);
			}
			const path = new URL(href).pathname;
			history.pushState({}, '', href);
			window.scrollTo(0, 0);
			import(
				`../${location.pathname.replaceAll('/', '')}/index.mjs?${Date.now()}`
					.replaceAll('index.html', '')
					.replaceAll('//', '/')
			);
			pageStore.updatePage(path);
			document.querySelector('#main')?.animate(
				[
					{
						opacity: 0,
					},
					{
						opacity: 1,
					},
				],
				{
					duration: 350,
					easing: 'ease-in-out',
				},
			);
		});
};
