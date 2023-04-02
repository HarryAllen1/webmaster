import { createApp } from 'https://esm.sh/petite-vue@0.4.1';

const app = createApp({
	faqs: [
		[
			'Is AstroTours currently seeking new positions?',
			'Yes, AstroTours invites anyone willing to take the next step into joining our team and helping our cause and interest in space.',
		],
		[
			'What is AstroTours commitment to sustainability?',
			'AstroTours heavily commits to multiple initiatives to achieve sustainability in the rocket industry. AstroTours has revolutionized the development of rocket engine fuel with the ABE-2 and carried initiatives to reuse rockets to reduce rocket costs. In addition, each vehicle is made of environmentally friendly metallic titanium.',
		],
		[
			'I want to join the AstroTours family. How do I join?',
			"Purchase our most expensive plan. The more money you give us, the more benefits you'll get, and the more we'll make you feel like family.",
		],
		[
			'Who can participate in AstroTours space tourism experiences?',
			'Anyone! If they can participate in our training programs without problematic issues, they are free to go on board!',
		],
		[
			'What is the return policy on space expenditures?',
			'AstroTours follows a policy of a full refund 3 months from the launch, a half-refund 2 months before. No refund is offered between 2 months and the launch date.',
		],
		[
			'What is the waitlist policy?',
			'AstroTours will place your submission and will notify you through email whether you are entered or not.',
		],
		[
			'What are the necessary requirements to enter the AstroTours space flights?',
			'You must be 12 or older for our Suborbital and Orbital flights, and 18 or over for our Ultimate plan.',
		],
	],
});
app.mount('#main');
document.addEventListener('page-change', () => {
	app.unmount();
});
