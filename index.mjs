import { createApp } from './deps.mjs';

const app = createApp({
	reviews: [
		[
			'Sam Liyanage',
			4,
			'I ate before the flight because nowhere did it tell me not to. I ended up vomiting all over my crush. 4/5 view was nice.',
		],
		['Jean Rousseau', 5, 'Best experience ever.'],
	],
});
app.mount('#main');
document.addEventListener('page-change', app.unmount);
