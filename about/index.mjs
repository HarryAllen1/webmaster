import { createApp } from 'https://esm.sh/petite-vue@0.4.1';

console.log('asdf');

createApp({
	commits: (await import('./work-log.mjs')).default,
}).mount('#main');
