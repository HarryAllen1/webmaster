import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import flowbite from 'flowbite/plugin';
import preline from 'preline/plugin';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
	content: [
		'./**/*.{html,js,mjs,wm-component}',
		'!./node_modules/**/*',
		'./index.html',
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
		typography,
		forms,
		preline,
		flowbite,
		plugin(function ({ addComponents }) {
			addComponents({
				'.astrotours': {
					animation: 'background-pan 5s linear infinite',
					backgroundSize: '200%',
					'@apply bg-clip-text text-transparent font-bold bg-gradient-to-r from-gray-200 via-slate-500 to-gray-200':
						{},
				},
			});
		}),
	],
	blocklist: ['[a-zA-Z-:#]', "content-['this-is-also-valid]-weirdly-enough']"],
};

export default config;
