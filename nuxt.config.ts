import transformerDirectives from '@unocss/transformer-directives';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@unocss/nuxt', '@nuxt/image-edge'],
	unocss: {
		uno: true,
		typography: true,
		attributify: true,
		transformers: [transformerDirectives()],
	},
	experimental: {
		reactivityTransform: true,
	},
});
