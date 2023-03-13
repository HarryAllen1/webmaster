import { createApp } from 'https://esm.sh/petite-vue@0.4.1';

const app = createApp({
	commits: (await import('./work-log.mjs')).default,
});
app.mount('#main');
document.addEventListener('page-change', () => {
	app.unmount();
});