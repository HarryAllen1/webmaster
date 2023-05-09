/** @type {import('npm:tailwindcss').Config} */
export default {
	content: [
		'./**/*.{html,js,mjs}',
		'node_modules/preline/dist/*.js',
		'node_modules/flowbite/**/*.js',
	],
	theme: {
		extend: {
			colors: {
				primary: 'var(--primary)',
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('preline/plugin'),
		require('flowbite/plugin'),
	],
};
