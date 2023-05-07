/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./**/*.{html,js}', 'node_modules/preline/dist/*.js'],
	theme: {
		extend: {
			colors: {
				primary: 'var(--primary)',
			},
		},
	},
	plugins: [require('@tailwindcss/typography'), require('preline/plugin')],
};
