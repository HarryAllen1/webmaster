import { createApp } from 'https://esm.sh/petite-vue@0.4.1';

createApp({
	commits: (await import('./work-log.mjs')).default,
}).mount('#main');
