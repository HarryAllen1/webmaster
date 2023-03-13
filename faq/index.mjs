import { createApp } from 'https://esm.sh/petite-vue@0.4.1';

const app = createApp({
	faqs: [
		[
			'Is AstroTours currently seeking new positions?',
			'put answer here someone please please please ',
		],
		[
			'What is AstroTours commitment to sustainability?',
			'put  more sutff herefdsadsf',
		],
		[
			'I want to join the AstroTours family. How do I join?',
			'asdfdafsjsdlkf jsalkd fjlkas dfjkl',
		],
		[
			'Who can participate in AstroTours space tourism experiences?',
			'asdfasdfas df lasdfj lskadjflksjflk',
		],
		[
			'What is the return policy on space expenditures?',
			'asdf ajskldf jlkas djklf laj',
		],
		['What is the waitlist policy?', 'asdf flksd fjkl'],
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
