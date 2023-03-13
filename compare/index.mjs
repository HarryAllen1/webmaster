import { createApp } from 'https://esm.sh/petite-vue@0.4.1';

/** @type {import('./types.d.ts').Product[]} */
const products = [];

const app = createApp({
	products,
});
app.mount('#main');
document.addEventListener('page-change', () => {
	app.unmount();
});
