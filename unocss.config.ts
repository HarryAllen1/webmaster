import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetUno,
	transformerDirectives,
} from 'unocss';
import { usePages } from './composables/usePages';

export default defineConfig({
	presets: [
		presetIcons({
			extraProperties: {
				display: 'inline-block',
				height: '1.2em',
				width: '1.2em',
				'vertical-align': 'text-bottom',
			},
		}),
		presetUno(),
		presetAttributify(),
		presetTypography(),
	],
	transformers: [transformerDirectives()],
	safelist: [
		`mb-[${usePages().length * 2 + 2}rem]`,
		`-top-[${usePages().length * 2 + 2 + 4}rem]`,
	],
});
