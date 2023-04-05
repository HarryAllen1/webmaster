import { createApp } from 'https://esm.sh/petite-vue@0.4.1?bundle';

const app = createApp({});
app.mount('#main');
document.addEventListener('page-change', () => {
	app.unmount();
});
