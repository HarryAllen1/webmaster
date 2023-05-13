/**
 * @typedef {{ env?: string; cwd: string; options: {map: {inline: boolean}; }; file: { dirname: string; basename: string; extname: string }}} PostCSSContext
 */
/**
 *
 * @param {PostCSSContext} ctx
 */
module.exports = (ctx) => ({
	plugins: {
		'postcss-import': ctx.env === 'production' ? {} : false,
		tailwindcss: {},
		autoprefixer: ctx.env === 'production' ? {} : false,
		'postcss-import-url': ctx.env === 'production' ? {} : false,
		cssnano:
			ctx.env === 'production'
				? {
						preset: 'advanced',
				  }
				: false,
	},
});
