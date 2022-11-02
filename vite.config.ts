import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import { presetUno, presetIcons, presetTypography, extractorSvelte } from 'unocss';

const config: UserConfig = {
	plugins: [
		UnoCSS({
			extractors: [extractorSvelte],
			presets: [presetUno(), presetTypography(), presetIcons()],
		}),
		sveltekit(),
	],
};

export default config;
