import { Carousel, createApp } from './deps.mjs';
import { angle } from './js/maths.mjs';

const heroText = document.querySelector('#hero-text');
if (!heroText || !(heroText instanceof HTMLElement))
	throw new Error('hero text not found');
const rekt = heroText.getBoundingClientRect();
const aX = rekt.left + rekt.width / 2;
const aY = rekt.top + rekt.height / 2;
globalThis.addEventListener('mousemove', (e) => {
	const mouseX = e.clientX;
	const mouseY = e.clientY;

	const an = angle(mouseX, mouseY, aX, aY);
	heroText.style.setProperty('--angle', `${an}rad`);
});

const app = createApp({
	reviews: [
		[
			'Sam Liyanage',
			4,
			'I ate before the flight because nowhere did it tell me not to. I ended up vomiting all over my crush. 4/5 view was nice.',
		],
		['Jean Rousseau', 5, 'Best experience ever.'],
		['Anne Pluto', 5, 'What more to say? It&#39;s the greatest space tour you&#39;ll ever have. 100% absolutely recommend.'],
		['Luke Rene', 5, 'I&#39;m a simple man. I like to look up at the stars. This allowed me to look up at the stars. So 5/5.'],
		['Nickel Herbert', 4, 'I would give it a 5/5, but Luke Rene already did.']
	],
	retreatCarousel() {
		carousel.prev();
	},
	advanceCarousel() {
		carousel.next();
	},
	pauseCarousel() {
		carousel.pause();
	},
	playCarousel() {
		carousel.cycle();
	},
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
