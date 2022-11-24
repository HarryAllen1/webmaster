// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@unocss/nuxt', '@nuxt/image-edge'],
	css: ['@unocss/reset/tailwind.css'],
	experimental: {
		reactivityTransform: true,
		inlineSSRStyles: true,
	},
});
