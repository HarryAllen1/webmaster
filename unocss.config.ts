import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetUno,
	transformerDirectives,
} from 'unocss';

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
});
