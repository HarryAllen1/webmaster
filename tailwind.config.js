/** @type {import('npm:tailwindcss').Config} */
export default {
	content: ['./**/*.{html,js,mjs}', 'node_modules/preline/dist/*.js'],
	theme: {
		extend: {
			colors: {
				primary: 'var(--primary)',
			},
		},
	},
	plugins: [require('@tailwindcss/typography'), require('preline/plugin')],
};
