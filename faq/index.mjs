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
			'Follow our GitHub by clicking on the button in the top right corner!',
		],
		[
			'Who can participate in AstroTours space tourism experiences?',
			'Anyone! If they can participate in our training programs without problematic issues, they are free to go on board!',
		],
		[
			'What is the return policy on space expenditures?',
			'AstroTours follows a policy of a full refund 3 months from the launch, a half-refund 2 months before and a quarter-refund 1 month before launch.',
		],
		['What is the waitlist policy?', 'AstroTours will place your submission and will notify you through email whether you entered or did not.'],
		[
			'What are the necessary requirements to enter the AstroTours space flights?',
			'asdfasdf alksdjfl asdlk',
		],
	],
});
app.mount('#main');
document.addEventListener('page-change', () => {
	app.unmount();
});
