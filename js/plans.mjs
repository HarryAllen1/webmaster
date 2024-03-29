/** @type {import('./types.d.ts').Product[]} */
export const plans = [
	{
		name: 'Suborbital',
		altitude: '100km',
		price: 5000,
		duration: '20 minutes',
		maxPeople: 6,
		meals: 'None',
		moonExperience: 'None',
		orbitExperience: 'None',
		rocket: 'Andante',
		tagline: 'The glance of our planet',
		trainingRequired: false,
	},
	{
		name: 'Orbital',
		altitude: '200km',
		duration: '2 hours',
		maxPeople: 10,
		meals: '1 meal included',
		moonExperience: 'None',
		orbitExperience: 'Yes',
		price: 10000,
		rocket: 'Tempo',
		tagline: 'The view of our world',
		trainingRequired: false,
	},
	{
		name: 'Ultimate',
		altitude: '238,900km',
		duration: '5 days',
		maxPeople: 15,
		meals: 'Infinite meals',
		moonExperience: 'Stay at the moon, ride a moon buggy',
		orbitExperience: 'Yes',
		price: 20000,
		rocket: 'Allegro',
		tagline: 'The roadway to the moon',
		trainingRequired: true,
	},
];
