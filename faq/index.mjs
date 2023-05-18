import { createApp } from '../deps.mjs';

const app = createApp({
	faqs: [
		[
			'Is AstroTours currently seeking new positions?',
			'Yes, AstroTours invites anyone willing to take the next step into joining our team and helping our cause and interest in space.',
		],
		[
			'What is AstroTours commitment to sustainability?',
			'AstroTours commits to achieve sustainability in the rocket industry by implementing environmental-friendly titanium bioengine fuel to the rocket. Both are very long-lasting and serves beneficial to the environment. We also plan to reuse rockets to reduce unneccessary created debt from space junk.',
		],
		[
			'I want to join the AstroTours family. How do I join?',
			"Purchase our most expensive plan. The more money you give us, the more benefits you'll get, and the more we'll make you feel like family.",
		],
		[
			'Who can participate in AstroTours space tourism experiences?',
			'Anyone can participate in our training programs as long as they do not have any impaired disabilities. We hope to prioritize safety to all customers, even it means cancelling the rocket launch.',
		],
		[
			'What is the return policy on space expenditures?',
			'AstroTours follows a policy of a full refund 3 months from the launch, a half-refund 2 months before. No refund is offered between 2 months and the launch date.',
		],
		[
			'What is the waitlist policy?',
			'AstroTours will put you on an imaginary waitlist since you will never actually get the spot because we are just too popular. Just get faster next time.',
		],
		[
			'What are the necessary requirements to enter the AstroTours space flights?',
			'You must be 12 or older for our Suborbital and Orbital flights, and 18 or over for our Ultimate plan.',
		],
	],
});
app.mount('#main');
document.addEventListener('page-change', app.unmount);
