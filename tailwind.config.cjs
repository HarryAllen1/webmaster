/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
	},
	plugins: [require('@tailwindcss/typography')],
	safelist: ['w-[900px]', 'h-[900px]', 'w-[500px]', 'h-[500px]'],
};
