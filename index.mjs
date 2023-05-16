import { createApp } from './deps.mjs';
import { Carousel } from 'https://esm.sh/flowbite@1.6.5?bundle';

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
/** @type {HTMLElement[]} */
const els = Array.from(document.querySelectorAll('.home-review-carousel-item'));
const carousel = new Carousel(
	els.map((el, i) => ({ el, position: i })),
	{
		interval: 6000,
	}
);
carousel.cycle();
document.addEventListener('page-change', app.unmount);
