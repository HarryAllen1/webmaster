import { createApp } from '../deps.js';

const app = createApp({});
app.mount('#main');
document.addEventListener('page-change', () => {
	app.unmount();
});
